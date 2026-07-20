#!/bin/sh
set -eu

# Vercel's ignoreCommand has inverted exit-code semantics:
#   exit 0 -> skip this build
#   exit 1 -> continue with this build
# The helpers below exist so callers below read as intent, not raw exit codes.
skip_build() { exit 0; }
continue_build() { exit 1; }

if [ "$VERCEL_ENV" != "production" ]; then
  continue_build
fi

case "$VERCEL_GIT_COMMIT_MESSAGE" in
  *tagpr-from-*) continue_build ;;
  *) skip_build ;;
esac
