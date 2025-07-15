#!/usr/bin/env python3
"""
Script to automatically detect recipe files and update files.json
Only updates if there are changes to avoid unnecessary commits
"""

import os
import json

def get_recipe_files():
    """Get all recipe files from the current directory"""
    recipe_files = []
    
    for file_path in os.listdir('.'):            
        if _is_not_relevant_file(file_path):
            continue         
        recipe_files.append(file_path)
    
    return sorted(recipe_files)

def _is_not_relevant_file(file_path):
    return _is_directory(file_path) or _is_system_file(file_path) or _is_code_file(file_path)

def _is_directory(file_path):
    return os.path.isdir(file_path)

def _is_system_file(file_path):
    return file_path.startswith('.')

def _is_code_file(file_path):
    return file_path.endswith(('.py', '.git', '.DS_Store', '.css', '.js', '.html', '.json', '.md', '.yml', '.png'))

def update_files_json():
    """Update the files.json with current recipe files only if changed"""
    current_files = get_recipe_files()
    
    # Read existing files.json if it exists
    existing_icons = {}
    if os.path.exists('files.json'):
        try:
            with open('files.json', 'r', encoding='utf-8') as f:
                data = json.load(f)
                if isinstance(data, list) and data and isinstance(data[0], dict):
                    for item in data:
                        if 'name' in item and 'icon' in item:
                            existing_icons[item['name']] = item['icon']
        except (json.JSONDecodeError, FileNotFoundError):
            existing_icons = {}

    # Build new list of dicts with name and icon
    DEFAULT_ICON = '🥘'
    new_files = []
    for file in current_files:
        icon = existing_icons.get(file, DEFAULT_ICON)
        new_files.append({'name': file, 'icon': icon})

    # Check if files have changed (by names only)
    existing_names = set(existing_icons.keys())
    current_names = set(current_files)
    if current_names == existing_names:
        print("No changes detected in recipe files. files.json is up to date.")
        return False

    # Update files.json with new list of dicts
    with open('files.json', 'w', encoding='utf-8') as f:
        json.dump(new_files, f, ensure_ascii=False, indent=2)

    print(f"Updated files.json with {len(new_files)} recipe files:")
    for file in new_files:
        print(f"  - {file['name']}")

    # Show what changed
    added = current_names - existing_names
    removed = existing_names - current_names

    if added:
        print(f"\nAdded files: {', '.join(added)}")
    if removed:
        print(f"Removed files: {', '.join(removed)}")

    return True

if __name__ == "__main__":
    update_files_json() 