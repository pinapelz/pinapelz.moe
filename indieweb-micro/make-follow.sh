#!/bin/bash

# Get today's date in the required format
today=$(date '+%Y-%m-%d')

# Check if URL is provided as argument
if [ $# -eq 0 ]; then
    echo "Usage: $0 <url>"
    echo "Example: $0 https://sakurajima.moe/@sakurajima"
    exit 1
fi

url="$1"

# Append https if not present
if [[ ! $url =~ ^https?:// ]]; then
    url="https://$url"
fi

# Check if URL matches the pattern https://domain/@user@remote.domain
if [[ $url =~ ^https://[^/]+/@[^@]+@([^/]+)$ ]]; then
    # Extract the username and remote domain
    username=$(echo "$url" | sed 's/.*\/@\([^@]*\)@.*/\1/')
    remote_domain="${BASH_REMATCH[1]}"
    # Remap to https://remote.domain/@username
    url="https://$remote_domain/@$username"
fi

# Generate the follow shortcode
echo "{{< follow \"$url\" \"$today\" >}}"
