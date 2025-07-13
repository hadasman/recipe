#!/usr/bin/env python3
import os
import json

def get_recipe_files():
    """Get list of recipe files from the directory"""
    recipe_files = []
    for filename in os.listdir('.'):
        # Skip directories and non-recipe files
        if os.path.isdir(filename) or filename.startswith('.') or filename in ['index.html', 'index_template.html', 'recipe.css', 'recipe.js', 'files.json', 'update_files.py', 'generate_html.py', 'README.md', '_config.yml', '.DS_Store']:
            continue
        recipe_files.append(filename)
    return sorted(recipe_files)

def generate_html():
    """Generate the HTML file with hardcoded dropdown options"""
    recipe_files = get_recipe_files()
    
    # Generate the dropdown options HTML
    dropdown_options = '<option value="">Choose a recipe...</option>'
    for filename in recipe_files:
        dropdown_options += f'<option value="{filename}">{filename}</option>'
    
    # Read the current HTML template
    with open('index_template.html', 'r', encoding='utf-8') as f:
        html_template = f.read()
    
    # Replace the placeholder with the actual options
    html_content = html_template.replace('{{DROPDOWN_OPTIONS}}', dropdown_options)
    
    # Write the generated HTML
    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(html_content)
    
    print(f"Generated index.html with {len(recipe_files)} recipe files")
    print("Recipe files:", recipe_files)

if __name__ == "__main__":
    generate_html() 