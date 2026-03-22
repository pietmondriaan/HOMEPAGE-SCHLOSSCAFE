#!/bin/bash
# Download script for cafemitherz.at images
# Run with: bash download_images.sh

BASE="$(cd "$(dirname "$0")" && pwd)/fotos"
UA="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"

mkdir -p "$BASE/torten" "$BASE/veranstaltungen" "$BASE/logo"

echo "=== Downloading LOGO images (5) ==="
curl -s -L -A "$UA" -o "$BASE/logo/schlosscafe-logo-2023-1.png" "https://www.cafemitherz.at/wp-content/uploads/2024/03/schlosscafe-logo-2023-1.png" && echo "  OK: schlosscafe-logo-2023-1.png"
curl -s -L -A "$UA" -o "$BASE/logo/schlosscafe-logo-2023-1-2048x556.png" "https://www.cafemitherz.at/wp-content/uploads/2024/03/schlosscafe-logo-2023-1-2048x556.png" && echo "  OK: schlosscafe-logo-2023-1-2048x556.png"
curl -s -L -A "$UA" -o "$BASE/logo/Cafe-Reinhart.png" "https://www.cafemitherz.at/wp-content/uploads/2021/09/Cafe-Reinhart.png" && echo "  OK: Cafe-Reinhart.png"
curl -s -L -A "$UA" -o "$BASE/logo/Logo-2.png" "https://www.cafemitherz.at/wp-content/uploads/2021/09/Logo-2.png" && echo "  OK: Logo-2.png"
curl -s -L -A "$UA" -o "$BASE/logo/Schlossquadrat.png" "https://www.cafemitherz.at/wp-content/uploads/2021/09/Schlossquadrat.png" && echo "  OK: Schlossquadrat.png"

echo ""
echo "=== Downloading TORTEN images (3) ==="
curl -s -L -A "$UA" -o "$BASE/torten/Tortenvitrine3-Reinhart.jpg" "https://www.cafemitherz.at/wp-content/uploads/2021/09/Tortenvitrine3-Reinhart.jpg" && echo "  OK: Tortenvitrine3-Reinhart.jpg"
curl -s -L -A "$UA" -o "$BASE/torten/Tortenvitrine5-Reinhart.jpg" "https://www.cafemitherz.at/wp-content/uploads/2021/09/Tortenvitrine5-Reinhart.jpg" && echo "  OK: Tortenvitrine5-Reinhart.jpg"
curl -s -L -A "$UA" -o "$BASE/torten/Tortenvitrine7-Reinhart.jpg" "https://www.cafemitherz.at/wp-content/uploads/2021/09/Tortenvitrine7-Reinhart.jpg" && echo "  OK: Tortenvitrine7-Reinhart.jpg"

echo ""
echo "=== Downloading STANDALONE images (5) ==="
curl -s -L -A "$UA" -o "$BASE/Eberndorf.jpg" "https://www.cafemitherz.at/wp-content/uploads/2021/09/Eberndorf.jpg" && echo "  OK: Eberndorf.jpg"
curl -s -L -A "$UA" -o "$BASE/Img-01.jpg" "https://www.cafemitherz.at/wp-content/uploads/2021/09/Img-01.jpg" && echo "  OK: Img-01.jpg"
curl -s -L -A "$UA" -o "$BASE/Cafe-Reinhart.jpg" "https://www.cafemitherz.at/wp-content/uploads/2021/09/Cafe-Reinhart.jpg" && echo "  OK: Cafe-Reinhart.jpg"
curl -s -L -A "$UA" -o "$BASE/Img-03.jpg" "https://www.cafemitherz.at/wp-content/uploads/2021/09/Img-03.jpg" && echo "  OK: Img-03.jpg"
curl -s -L -A "$UA" -o "$BASE/Restaurant-Guru.jpg" "https://www.cafemitherz.at/wp-content/uploads/2023/08/Restaurant-Guru-723x1024.jpg" && echo "  OK: Restaurant-Guru.jpg"

echo ""
echo "=== Downloading CAFE INTERIOR images (6) ==="
for f in Cafe-01-scaled.jpg Cafe-02-scaled.jpg Cafe-03.jpg Cafe-04.jpg Cafe-05-rotated.jpg Cafe-06.jpg; do
  curl -s -L -A "$UA" -o "$BASE/$f" "https://www.cafemitherz.at/wp-content/uploads/2021/09/$f" && echo "  OK: $f"
done

echo ""
echo "=== Downloading GALERIE images (42) ==="
for i in $(seq -w 1 42); do
  curl -s -L -A "$UA" -o "$BASE/Galerie-$i.jpg" "https://www.cafemitherz.at/wp-content/uploads/2021/09/Galerie-$i.jpg" && echo "  OK: Galerie-$i.jpg"
done

echo ""
echo "========================================="
echo "DOWNLOAD COMPLETE!"
echo "========================================="
echo ""
echo "Summary:"
echo "  Logo:      5 files -> $BASE/logo/"
echo "  Torten:    3 files -> $BASE/torten/"
echo "  Interior:  6 files -> $BASE/"
echo "  Standalone: 5 files -> $BASE/"
echo "  Galerie:  42 files -> $BASE/"
echo "  TOTAL:    61 files"
echo ""
ls -lhR "$BASE" 2>/dev/null | tail -80
