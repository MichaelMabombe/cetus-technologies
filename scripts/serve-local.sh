#!/bin/zsh
set -eu

readonly PORT=8080
readonly BASE_URL="http://127.0.0.1:${PORT}"

# Reuse the local preview if it is already serving this project. This prevents
# a second Python process from failing with "Address already in use".
if curl --silent --fail --max-time 2 "${BASE_URL}/index.html" >/dev/null; then
  print "Serving HTTP on 127.0.0.1 port ${PORT} (already running)"
  while true; do sleep 3600; done
fi

exec python3 -u -m http.server "${PORT}" --bind 127.0.0.1
