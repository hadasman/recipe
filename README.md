# Recipe Organizer

A mobile-friendly web application for organizing and following recipe instructions step by step. Perfect for cooking with your phone or tablet!

## Features

- 📱 **Mobile Optimized**: Works perfectly on phones and tablets
- 🖥️ **Desktop Compatible**: Also works great on computers
- 📁 **File Upload**: Upload recipe files from your device
- 🗂️ **Built-in Recipes**: Access recipe files stored in the repository with custom icons
- 🎨 **Recipe Icons**: Each recipe has a unique icon for easy identification
- ✅ **Step Tracking**: Mark steps as completed with checkmarks
- 🔔 **Notifications**: Get notified when recipe is completed
- 🌐 **GitHub Pages Ready**: Easy deployment to GitHub Pages
- 🤖 **Automated Updates**: GitHub Actions automatically update recipe lists

## How to Use

### Local Development
1. Clone this repository
2. Run a local server: `python3 -m http.server 8000`
3. Open `http://localhost:8000` in your browser

### GitHub Pages (Recommended for Mobile)
1. Go to your repository settings on GitHub
2. Scroll down to "GitHub Pages" section
3. Select "Deploy from a branch"
4. Choose "gh-pages" branch and "/ (root)" folder
5. Click "Save"
6. Your app will be available at: `https://yourusername.github.io/your-repo-name`

## Recipe File Format

Recipe files use a simple custom format:
- **First line**: Ingredients (comma-separated)
- **Following lines**: Cooking steps (one step per line, no commas)

Example:
```
flour,sugar,eggs,milk
Mix flour and sugar
Add eggs and milk
Bake at 350°F for 30 minutes
```

**Note**: This is not standard CSV format since only the first line uses commas.

## Adding New Recipes

### Method 1: Manual (Recommended)
1. Create a new text file with your recipe following the format above
2. Add the recipe to `files.json` with an optional icon:
   ```json
   {
     "name": "your-recipe.txt",
     "icon": "🍰"
   }
   ```
3. If no icon is specified, a default 🥘 icon will be used
4. Commit and push to GitHub

### Method 2: Automated
1. Add your recipe file to the repository
2. Push to the `main` branch
3. GitHub Actions will automatically update `files.json` (without icons)
4. Manually add icons to `files.json` if desired

## Recipe Icons

Each recipe can have a custom icon defined in `files.json`. If no icon is provided, the app will use a default 🥘 icon. Icons are displayed in the dropdown menu for easy recipe identification.

## Automation

### GitHub Actions
- **Auto-update workflow**: Automatically updates `files.json` when new recipe files are added to the `main` branch
- **Triggered on**: Push to main branch or manual dispatch
- **What it does**: Scans for recipe files and updates the list

### Local Scripts
- `update_files.py`: Updates `files.json` with current recipe files
- `generate_html.py`: Generates static HTML with hardcoded dropdown (legacy)

## Supported File Types

- Text files (.txt)
- Any file format that can be read as text
- Files with Hebrew characters are supported

## Browser Compatibility

- Chrome (recommended)
- Safari
- Firefox
- Edge
- Mobile browsers (iOS Safari, Chrome Mobile)

## Project Structure

```
recipe/
├── index.html              # Main HTML file
├── recipe.css              # Styles
├── recipe.js               # JavaScript functionality
├── files.json              # Recipe definitions with icons
├── update_files.py         # Script to update files.json
├── generate_html.py        # Legacy HTML generator
├── index_template.html     # Template for HTML generation
├── .github/workflows/      # GitHub Actions
│   └── update-files.yml    # Auto-update workflow
├── _config.yml             # Jekyll theme config
└── recipe files/           # Individual recipe text files
    ├── אורז
    ├── מרק בצל
    ├── עוגת בננה.txt
    └── ...
```

## Development Notes

- The app uses a simple file-based approach for recipe storage
- Icons are defined in `files.json` and fall back to 🥘 if not specified
- The interface is optimized for mobile use with touch-friendly buttons
- Step completion is tracked visually with checkmarks
- File upload supports any text-based recipe format 