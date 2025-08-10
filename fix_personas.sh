#!/bin/bash

# Fix all persona pages to use the new navigation system

for file in personas/*.html; do
    echo "Fixing $file..."
    
    # Remove duplicate Material Icons links
    sed -i '' '/<link href="https:\/\/fonts\.googleapis\.com\/icon?family=Material+Icons" rel="stylesheet">/d' "$file"
    
    # Add Material Icons link after the font link
    sed -i '' '/<link href="https:\/\/fonts\.googleapis\.com\/css2?family=Cinzel:wght@400;700&family=Open+Sans:wght@400;600&display=swap" rel="stylesheet">/a\
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">' "$file"
    
    # Remove old header content and replace with placeholder
    sed -i '' '/<header>/,/<\/header>/c\
    <header></header>' "$file"
    
    # Remove duplicate navigation.js scripts
    sed -i '' '/<script src="\.\.\/navigation\.js"><\/script>/d' "$file"
    
    # Add navigation.js script before closing body tag
    sed -i '' 's|</body>|    <script src="../navigation.js"></script>\n</body>|' "$file"
    
    # Fix any missing closing head tag
    sed -i '' 's|<link href="https:\/\/fonts\.googleapis\.com\/icon?family=Material+Icons" rel="stylesheet"></head>|<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">\n</head>|' "$file"
    
done

echo "All persona pages updated!"

