#!/usr/bin/env bash

# Usage:
#   ./overwrite-to-webp.sh /path/to/folder jpg
#
# Arguments:
#   1 = folder containing images
#   2 = file extension to convert (jpg, jpeg, png, etc.)

SRC_DIR="$1"
EXT="$2"

if [ -z "$SRC_DIR" ] || [ -z "$EXT" ]; then
    echo "Usage: $0 <folder> <extension>"
    echo "Example: ./overwrite-to-webp.sh ./photos jpg"
    exit 1
fi

for file in "$SRC_DIR"/*."$EXT"; do
    [ -e "$file" ] || continue

    filename=$(basename "$file")
    name="${filename%.*}"
    newfile="$SRC_DIR/$name.webp"

    echo "Converting: $filename → $name.webp"

    # Convert to WebP (lossy quality ~80)
    ffmpeg -i "$file" \
        -compression_level 6 \
        -quality 80 \
        "$newfile" -y

    # Delete original file
    rm -f "$file"
done

echo "Done! All .$EXT files have been replaced with .webp"
