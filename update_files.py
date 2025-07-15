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
    existing_files = []
    if os.path.exists('files.json'):
        try:
            with open('files.json', 'r', encoding='utf-8') as f:
                data = json.load(f)
                existing_files = [item['name'] for item in data if 'name' in item]
        except (json.JSONDecodeError, FileNotFoundError):
            existing_files = []
    
    # Check if files have changed
    if current_files == existing_files:
        print("No changes detected in recipe files. files.json is up to date.")
        return False
    
    # Update files.json with new list
    with open('files.json', 'w', encoding='utf-8') as f:
        json.dump(current_files, f, ensure_ascii=False, indent=2)
    
    print(f"Updated files.json with {len(current_files)} recipe files:")
    for file in current_files:
        print(f"  - {file}")
    
    # Show what changed
    added = set(current_files) - set(existing_files)
    removed = set(existing_files) - set(current_files)
    
    if added:
        print(f"\nAdded files: {', '.join(added)}")
    if removed:
        print(f"Removed files: {', '.join(removed)}")
    
    return True

if __name__ == "__main__":
    update_files_json() 