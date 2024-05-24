#!/usr/bin/env sh

set -o errexit
set -e


ping="$(\
  pg_isready \
  --dbname "$POSTGRES_DB" \
  --username "$POSTGRES_USER" \
  | grep 'accepting' | grep -q 'connection'\
)"

if $ping; then
  exit 0;
fi

exit 1;