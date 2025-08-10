#!/bin/bash

# Simple script to fix all persona pages

for file in personas/*.html; do
    echo "Fixing $file..."
    
    # Add Material Icons link
    sed -i '' '/<link href="https:\/\/fonts\.googleapis\.com\/css2?family=Cinzel:wght@400;700&family=Open+Sans:wght@400;600&display=swap" rel="stylesheet">/a\
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">' "$file"
    
    # Replace old header with placeholder
    sed -i '' '/<header>/,/<\/header>/c\
    <header></header>' "$file"
    
    # Add navigation.js script
    sed -i '' 's|</body>|    <script src="../navigation.js"></script>\n</body>|' "$file"
    
done

echo "All persona pages updated!"

