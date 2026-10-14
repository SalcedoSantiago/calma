#!/usr/bin/env sh
# Arma el sitio estático y lo publica en GitHub Pages (rama gh-pages).
set -e
rm -rf out
MSYS_NO_PATHCONV=1 PAGES_BASE_PATH=/calma npm run build
cd out
touch .nojekyll # sin esto, Pages ignora la carpeta _next
git init -q -b gh-pages
git add -A
git commit -q -m "Publicar sitio"
git push -f https://github.com/SalcedoSantiago/calma.git gh-pages
rm -rf .git
echo "Listo: https://salcedosantiago.github.io/calma/"
