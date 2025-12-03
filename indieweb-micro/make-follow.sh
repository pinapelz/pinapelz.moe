#!/bin/bash

# Get today's date in the required format
today=$(date '+%Y-%m-%d')

# Check if URL is provided as argument
if [ $# -eq 0 ]; then
    echo "Usage: $0 <url> [markdown_file]"
    echo "Example: $0 https://sakurajima.moe/@sakurajima"
    echo "Example: $0 @user@site.com content/indie/follows.md"
    exit 1
fi

url="$1"
markdown_file="${2:-content/indie/follows.md}"

# Handle @user@site.com format by remapping to https://site.com/@user
if [[ $url =~ ^@([^@]+)@(.+)$ ]]; then
    username="${BASH_REMATCH[1]}"
    domain="${BASH_REMATCH[2]}"
    url="https://$domain/@$username"
fi

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

# Determine the category based on URL
if [[ $url =~ ^https://bsky\.app/ ]]; then
    category="Bluesky"
elif [[ $url =~ ^https://[^/]+/@[^/]+$ ]]; then
    category="Fediverse"
else
    category="Indieweb"
fi

# Generate the follow shortcode
follow_line="{{< follow \"$url\" \"$today\" >}}"

# If markdown file is provided, append to the appropriate section
if [ "$2" != "" ] || [ -f "$markdown_file" ]; then
    if [ ! -f "$markdown_file" ]; then
        echo "Error: Markdown file '$markdown_file' not found"
        exit 1
    fi

    # Find the line number of the category section
    section_line=$(grep -n "^## $category" "$markdown_file" | cut -d: -f1)

    if [ -z "$section_line" ]; then
        echo "Error: Section '## $category' not found in $markdown_file"
        exit 1
    fi

    # Find the end of the section (next ## header or end of file)
    next_section_line=$(tail -n +"$((section_line + 1))" "$markdown_file" | grep -n "^## " | head -1 | cut -d: -f1)
    
    if [ -z "$next_section_line" ]; then
        # No next section found, append at end of file
        end_line=$(wc -l < "$markdown_file")
    else
        # Calculate actual line number of next section
        end_line=$((section_line + next_section_line - 1))
    fi

    # Create a temporary file with the new follow added at the end of the section
    temp_file=$(mktemp)
    head -n "$((end_line - 1))" "$markdown_file" > "$temp_file"
    echo "$follow_line" >> "$temp_file"
    tail -n +"$end_line" "$markdown_file" >> "$temp_file"

    # Replace the original file
    mv "$temp_file" "$markdown_file"

    echo "Added follow to $category section in $markdown_file:"
else
    echo "Follow shortcode (not added to file):"
fi

echo "$follow_line"
