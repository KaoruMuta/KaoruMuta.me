---
title: GoogleService-info.plistをgitignoreしている時に，GitHubActionsでCIを通す
date: 2020-12-18 23:50
categories: 技術 CI iOS GitHubActions
---

# はじめに

ずっと前の自分：「`GoogleService-info.plist`を gitignore してるから永遠 GitHubActions での CI のビルドが通らない！！！！！！どうしよう！！！」
何もわからん状態だった自分を救ってくれたのは，Android で同じようなことをしている[記事](https://qiita.com/sudo5in5k/items/5b6da5dbba3fc2514319)でした．
その記事は

1. `google-services.json`を base64 に変換
2. GitHub Secrets に記入
3. GitHubActions の yaml ファイルから Secrets 読み込み
4. decode して正しい位置に配置

という手順で CI を通していました．

ならば，これを iOS でも同じようにすればいいじゃないか！となりますよね．やりましょう．

# 手順

1. `GoogleService-info.plist`を json に変換
2. 生成した json ファイルを base64 の形にし，secrets に記述
3. secrets から json ファイルを生成し，その json ファイルを plist ファイルに変換（`GoogleService-info.plist`という名前として適切な位置におく）
4. 生成した json ファイルを削除

### 1. `GoogleService-info.plist`を json に変換

[記事](https://www.ecoop.net/memo/archives/convert_plist_to_or_from_json.html)を参考に変換しました．
（下の`/path/to/dir`は GoogleService-info.plist が存在するディレクトリまでのパス．）

```sh plist
cd /path/to/dir
plutil -convert json GoogleService-info.plist -r -o output.json
```

### 2. 生成した json ファイルを base64 の形にし，secrets に記述

cat で出力した結果（[記事](https://qiita.com/sudo5in5k/items/5b6da5dbba3fc2514319)参考）をそのまま Secrets に貼り付けます

```sh
cat output.json | base64
```

### 3, 4. secrets から json ファイルを生成し，その json ファイルを plist ファイルに変換+生成した json ファイルを削除

流れは以下の通り．

```yaml
# Generate GoogleService-info.plist (Step 3)
- name: Translate secrets of base64 into json
  env:
    GOOGLE_SERVICE: ${{ secrets.GOOGLE_SERVICE_INFO_PLIST }}
  run: echo $GOOGLE_SERVICE | base64 --decode > ./OgiriBattle_Swift/Common/Resources/output.json
- name: Translate json into plist and generate GoogleService-info.plist
  run: plutil -convert xml1 ./OgiriBattle_Swift/Common/Resources/output.json -o ./OgiriBattle_Swift/Common/Resources/GoogleService-info.plist
- name: Remove json file (Step 4)
  run: rm OgiriBattle_Swift/Common/Resources/output.json
```

`GOOGLE_SERVICE`という名前で secrets に記述されている base64 を取得 →json に decode→json から plist に変換という流れ．
（`OgiriBattle_Swift/Common/Resources/`のパスは例です）

# 最後に

いい記事を残してくれた先人の方々に感謝を込めて，自分もいい記事を書こうとなりました．
間違い等あれば指摘してください．お願いします！
また，いい記事だと思った方はグッドボタンと Twitter のフォローをね，よかったらお願いします！（どこぞの Youtuber みたいだな）

# 救世主となったサイト

1. https://qiita.com/sudo5in5k/items/5b6da5dbba3fc2514319
2. https://qiita.com/hohohoris/items/f934beb4ea0b432af488
3. https://linuxjm.osdn.jp/html/GNU_coreutils/man1/base64.1.html
4. https://www.ecoop.net/memo/archives/convert_plist_to_or_from_json.html
