#!/usr/bin/env sh

set -o errexit
set -e


password="$(echo "$REDIS_ARGS" | cut -d ' ' -f 2-)";
ping="$(redis-cli --pass "$password" ping)";

if $ping && [ "$ping" = 'PONG' ]; then
	exit 0
fi

exit 1