import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import matter from 'gray-matter';

const rootDir = process.cwd();
const config = {
  postsDir: path.join(rootDir, 'posts'),
  ogpDir: path.join(rootDir, 'public/ogp'),
  postOgpDir: path.join(rootDir, 'public/ogp/posts'),
  defaultTitle: 'tionblog',
};

const iconBg = 'm4.5630022 4.5605012v51.4687528h51.4625028v-51.4687528z';
const iconMark =
  'm27.150503 51.406754 4.625 4.63375h-5.6l-6.05-5.985h3.6125c1.2875 0 2.5125.515 3.4125 1.35125zm-1.6125-40.92625c1.9875 0 3.6625 1.67375 3.6625 3.6675 0 1.995-1.675 3.60375-3.6625 3.60375-2 0-3.6-1.60875-3.6-3.60375 0-1.99375 1.6-3.6675 3.6-3.6675zm24.0625 33.26875-1.2875-3.41c-.575-1.41625-1.8625-2.38125-3.475-2.38125h-.575v-29.4074998h-27.925v16.2799998h3.6625l4.1875-5.2125c.8375-.965 2.125-1.60875 3.5375-1.60875h8.95c1.4125 0 2.6375.77125 3.275 1.995l2.6375 5.01875c.1375.19375.2.45125.2.7725 0 .90125-.775 1.67375-1.675 1.67375-.7125 0-1.225-.3225-1.55-.90125l-2.375-4.56875h-3.8625l2.9625 7.4.9 9.46h7.65c1.225 0 2.1875.77125 2.6375 1.80125l.8375 2.18875h-13.125c-.9625 0-1.8-.70875-1.8625-1.67375l-.9-8.30125-7.0875 14.67125c-.375.8375-1.275 1.41625-2.3125 1.41625h-3.4125l8.6875-17.95375-2.7-6.75625-2.575 3.1525c-.6375.8375-1.7375 1.41625-2.9 1.41625h-3.7875v21.235l6.05 5.985h-17.8249998v-51.4799998h51.4749998v51.4799998h-5.7875l-5.9875-5.985v-6.30625z';

const parseArgs = (args) => {
  const options = { id: null, help: false };

  for (let index = 0; index < args.length; index += 1) {
    const arg = args[index];
    if (arg === '--help' || arg === '-h') {
      options.help = true;
      continue;
    }
    if (arg === '--id') {
      options.id = args[index + 1];
      index += 1;
      continue;
    }
    if (arg.startsWith('--id=')) {
      options.id = arg.slice('--id='.length);
      continue;
    }

    throw new Error(`Unknown option: ${arg}`);
  }

  return options;
};

const printHelp = () => {
  console.log(`
Usage:
  bun run ogp:generate
  bun run ogp:generate -- --id look-back-2025

Options:
  --id <postId>  Generate only one post OGP image.
  --help         Show this help.
`);
};

const findRsvgConvert = () => {
  if (process.env.RSVG_CONVERT) return process.env.RSVG_CONVERT;

  const candidates = ['/usr/local/bin/rsvg-convert', '/opt/homebrew/bin/rsvg-convert', '/usr/bin/rsvg-convert'];
  const foundCandidate = candidates.find((candidate) => fs.existsSync(candidate));
  if (foundCandidate) return foundCandidate;

  try {
    return execFileSync('which', ['rsvg-convert'], { encoding: 'utf-8' }).trim();
  } catch {
    throw new Error('rsvg-convert was not found. Install librsvg or set RSVG_CONVERT=/path/to/rsvg-convert.');
  }
};

const escapeXml = (value) =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');

const charWidth = (char) => {
  if (/\s/.test(char)) return 0.36;
  if (/[._:-]/.test(char)) return 0.36;
  if (/[\x00-\x7F]/.test(char)) return 0.72;
  return 1;
};

const measure = (text) => Array.from(text).reduce((sum, char) => sum + charWidth(char), 0);
const normalizeLine = (tokens) => tokens.join('').trim();

const tokenizeTitle = (title) => {
  const tokens = [];
  const chars = Array.from(title.replace(/\s+/g, ' ').trim());
  let index = 0;

  while (index < chars.length) {
    const char = chars[index];

    if (char === ' ') {
      tokens.push(char);
      index += 1;
      continue;
    }

    if (/[A-Za-z0-9+/#._:-]/.test(char)) {
      let word = char;
      index += 1;
      while (index < chars.length && /[A-Za-z0-9+/#._:-]/.test(chars[index])) {
        word += chars[index];
        index += 1;
      }
      tokens.push(word);
      continue;
    }

    if ('、。，．！？!?）)]｝}】』」…'.includes(char) && tokens.length > 0) {
      tokens[tokens.length - 1] += char;
      index += 1;
      continue;
    }

    if ('（([｛{【『「'.includes(char) && index + 1 < chars.length) {
      tokens.push(`${char}${chars[index + 1]}`);
      index += 2;
      continue;
    }

    tokens.push(char);
    index += 1;
  }

  return tokens;
};

const splitOversizedToken = (token, maxWidth) => {
  if (measure(token) <= maxWidth) return [token];

  const chunks = [];
  let current = '';
  for (const char of Array.from(token)) {
    const next = `${current}${char}`;
    if (current && measure(next) > maxWidth) {
      chunks.push(current);
      current = char;
    } else {
      current = next;
    }
  }
  if (current) chunks.push(current);
  return chunks;
};

const wrapTokens = (tokens, { maxWidth, maxLines, splitLongTokens = false }) => {
  if (!splitLongTokens && tokens.some((token) => measure(token) > maxWidth)) return null;

  const safeTokens = splitLongTokens ? tokens.flatMap((token) => splitOversizedToken(token, maxWidth)) : tokens;
  const n = safeTokens.length;
  let best = null;

  const lineWidth = (start, end) => measure(normalizeLine(safeTokens.slice(start, end)));

  for (let lineCount = 1; lineCount <= maxLines; lineCount += 1) {
    const dp = Array.from({ length: lineCount + 1 }, () => Array(n + 1).fill(null));
    dp[0][0] = { cost: 0, breaks: [] };

    for (let line = 1; line <= lineCount; line += 1) {
      for (let end = line; end <= n; end += 1) {
        for (let start = line - 1; start < end; start += 1) {
          const previous = dp[line - 1][start];
          if (!previous) continue;

          const width = lineWidth(start, end);
          if (width > maxWidth) continue;

          const isLast = line === lineCount;
          const slack = maxWidth - width;
          const openingPenalty = /[（([｛{【『「]$/.test(safeTokens[end - 1]) ? 80 : 0;
          const singleTokenPenalty = end - start === 1 && n > lineCount ? 18 : 0;
          const cost = previous.cost + (isLast ? slack * slack * 0.12 : slack * slack) + openingPenalty + singleTokenPenalty;

          if (!dp[line][end] || cost < dp[line][end].cost) {
            dp[line][end] = {
              cost,
              breaks: [...previous.breaks, [start, end]],
            };
          }
        }
      }
    }

    const candidate = dp[lineCount][n];
    if (candidate && (!best || candidate.cost < best.cost)) {
      best = candidate;
    }
  }

  return best?.breaks.map(([start, end]) => normalizeLine(safeTokens.slice(start, end))).filter(Boolean) ?? null;
};

const wrapTitle = (title, maxLines = 4) => {
  const tokens = tokenizeTitle(title);
  const candidates = [
    { fontSize: 70, lineHeight: 84, maxWidth: 13.2, maxLines: 3 },
    { fontSize: 58, lineHeight: 70, maxWidth: 16.2, maxLines: 4 },
    { fontSize: 47, lineHeight: 58, maxWidth: 19.6, maxLines },
  ];

  for (const candidate of candidates) {
    const lines = wrapTokens(tokens, candidate);
    if (lines && lines.length <= candidate.maxLines) return { ...candidate, lines };
  }

  const fallback = candidates.at(-1);
  const wrappedFallback = wrapTokens(tokens, { ...fallback, maxLines: 8, splitLongTokens: true }) ?? [tokens.join('')];
  const lines = wrappedFallback.slice(0, maxLines);
  while (lines.length > maxLines) lines.pop();

  const lastLine = lines.at(-1) ?? '';
  if (wrappedFallback.length > maxLines) {
    let truncated = '';
    for (const char of Array.from(lastLine)) {
      const next = `${truncated}${char}`;
      if (measure(`${next}...`) > fallback.maxWidth) break;
      truncated = next;
    }
    lines[lines.length - 1] = `${truncated}...`;
  }

  return { ...fallback, lines };
};

const titleBlock = (title) => {
  const { lines, fontSize, lineHeight } = wrapTitle(title);
  const labelHeight = 24;
  const titleGap = 28;
  const blockHeight = labelHeight + titleGap + lines.length * lineHeight;
  const top = Math.round((630 - blockHeight) / 2);
  const firstTitleBaseline = labelHeight + titleGap + fontSize;
  const tspans = lines
    .map((line, index) => {
      const dy = index === 0 ? 0 : lineHeight;
      return `<tspan x="0" dy="${dy}">${escapeXml(line)}</tspan>`;
    })
    .join('');

  return `
  <g transform="translate(92 ${top})">
    <line x1="0" y1="14" x2="40" y2="14" stroke="#2b6e3d" stroke-width="4" stroke-linecap="round"/>
    <text x="52" y="24" fill="#2b6e3d" font-size="24" font-weight="700">tionblog</text>
    <text x="0" y="${firstTitleBaseline}" fill="#15221b" font-size="${fontSize}" font-weight="800">${tspans}</text>
  </g>
`;
};

const brand = `
  <g transform="translate(826 533)" filter="url(#softShadow)">
    <text x="22" y="52" fill="#15221b" font-size="27" font-weight="800">kaorumuta.me</text>
    <g transform="translate(278 14) scale(0.933333)">
      <path d="${iconBg}" fill="#fff"/>
      <path d="${iconMark}" fill="#096d31"/>
    </g>
  </g>
`;

const svgForTitle = (title) => `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <style>
    text {
      font-family: "Hiragino Sans", "Yu Gothic", "Noto Sans CJK JP", "Helvetica Neue", Arial, sans-serif;
      letter-spacing: 0;
    }
  </style>
  <defs>
    <pattern id="grid" width="64" height="64" patternUnits="userSpaceOnUse">
      <path d="M64 0H0V64" fill="none" stroke="#096d31" stroke-opacity="0.14" stroke-width="1"/>
      <path d="M18 0L0 64M50 0L32 64M82 0L64 64" stroke="#101414" stroke-opacity="0.045" stroke-width="1"/>
    </pattern>
    <radialGradient id="warm" cx="84%" cy="18%" r="36%">
      <stop offset="0" stop-color="#e0503e" stop-opacity="0.22"/>
      <stop offset="1" stop-color="#e0503e" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="paper" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#fbfaf5"/>
      <stop offset="1" stop-color="#ebe7d8"/>
    </linearGradient>
    <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="2" stdDeviation="1.5" flood-color="#ffffff" flood-opacity="0.72"/>
    </filter>
  </defs>
  <rect width="1200" height="630" fill="url(#paper)"/>
  <rect width="1200" height="630" fill="url(#grid)"/>
  <rect width="1200" height="630" fill="url(#warm)"/>
  ${titleBlock(title)}
  ${brand}
</svg>
`;

const renderImage = ({ title, outputPath, tempDir, rsvgConvert }) => {
  const svgPath = path.join(tempDir, `${path.basename(outputPath, '.png')}.svg`);
  fs.writeFileSync(svgPath, svgForTitle(title));
  execFileSync(rsvgConvert, [
    '--format',
    'png',
    '--width',
    '1200',
    '--height',
    '630',
    '--output',
    outputPath,
    svgPath,
  ]);
};

const loadPostFiles = (directory) =>
  fs
    .readdirSync(directory, { encoding: 'utf-8', recursive: true })
    .filter((filePath) => filePath.endsWith('.md'))
    .sort((a, b) => a.localeCompare(b));

const getPostId = (filePath) => path.basename(filePath).replace(/^[0-9]{8,}-(.*)\.md$/, '$1');

const loadPosts = () =>
  loadPostFiles(config.postsDir).map((filePath) => {
    const fullPath = path.join(config.postsDir, filePath);
    const postContents = fs.readFileSync(fullPath, 'utf-8');
    const matterResult = matter(postContents);
    return {
      id: getPostId(filePath),
      title: String(matterResult.data.title),
      filePath,
    };
  });

const main = () => {
  const options = parseArgs(process.argv.slice(2));
  if (options.help) {
    printHelp();
    return;
  }

  const rsvgConvert = findRsvgConvert();
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'kaorumuta-ogp-'));
  fs.mkdirSync(config.postOgpDir, { recursive: true });

  try {
    const posts = loadPosts();
    const targetPosts = options.id ? posts.filter((post) => post.id === options.id) : posts;
    if (options.id && targetPosts.length === 0) {
      throw new Error(`Post not found: ${options.id}`);
    }

    if (!options.id) {
      renderImage({
        title: config.defaultTitle,
        outputPath: path.join(config.ogpDir, 'default.png'),
        tempDir,
        rsvgConvert,
      });
    }

    for (const post of targetPosts) {
      renderImage({
        title: post.title,
        outputPath: path.join(config.postOgpDir, `${post.id}.png`),
        tempDir,
        rsvgConvert,
      });
    }

    const target = options.id ? options.id : `${targetPosts.length} posts + default`;
    console.log(`Generated OGP images for ${target}`);
  } finally {
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
};

main();
