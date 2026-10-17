#!/usr/bin/env bash
# Convert screenshots into the web-ready files the site expects.
#
#   scripts/optimize-media.sh <project-id> <image> [image...]
#
# Example — add two new Mage AI Media screenshots:
#   scripts/optimize-media.sh mage-ai-media ~/Desktop/home.png ~/Desktop/editor.png
#
# Files are numbered after whatever is already in public/media/<project-id>/
# (01.webp + 01-sm.webp, 02.webp + 02-sm.webp, ...). Append the printed names
# to that project's `gallery` array in src/data/projects.ts. Requires ffmpeg.
set -euo pipefail

if [ $# -lt 2 ]; then
    sed -n '2,12p' "$0"
    exit 1
fi

id=$1; shift
out="$(dirname "$0")/../public/media/$id"
mkdir -p "$out"

n=$(find "$out" -maxdepth 1 -name '[0-9][0-9].webp' | wc -l)
names=()
for src in "$@"; do
    n=$((n + 1))
    name=$(printf '%02d' "$n")
    ffmpeg -loglevel error -y -i "$src" -vf "scale='min(1920,iw)':-2" -c:v libwebp -quality 80 "$out/$name.webp"
    ffmpeg -loglevel error -y -i "$src" -vf "scale='min(880,iw)':-2" -c:v libwebp -quality 76 "$out/$name-sm.webp"
    names+=("'$name'")
done

echo "Done. Add to gallery for '$id': ${names[*]}"
