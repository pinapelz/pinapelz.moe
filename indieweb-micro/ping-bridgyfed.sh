#!/usr/bin/env bash

# Usage:
#   ./ping-bridgyfed.sh https://yoursite.com/posts/foo/

SOURCE_URL="$1"

if [ -z "$SOURCE_URL" ]; then
  echo "Error: No source URL provided."
  echo "Usage: $0 <source-url>"
  exit 1
fi

curl -i https://fed.brid.gy/webmention \
  -d "source=$SOURCE_URL" \
  -d "target=https://fed.brid.gy"
