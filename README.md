# Recipe Organizer

A mobile-friendly web application for organizing and following recipe instructions step by step.

## Features

- 📱 **Mobile Optimized**: Works perfectly on phones and tablets
- 🖥️ **Desktop Compatible**: Also works great on computers
- 📁 **File Upload**: Upload recipe files from your device
- 🗂️ **Built-in Recipes**: Access recipe files stored in the repository
- ✅ **Step Tracking**: Mark steps as completed with checkmarks
- 🔔 **Notifications**: Get notified when recipe is completed

## How to Use

### Local Development
1. Clone this repository
2. Run a local server: `python3 -m http.server 8000`
3. Open `http://localhost:8000` in your browser

### GitHub Pages (Recommended for Mobile)
1. Go to your repository settings on GitHub
2. Scroll down to "GitHub Pages" section
3. Select "Deploy from a branch"
4. Choose "main" branch and "/ (root)" folder
5. Click "Save"
6. Your app will be available at: `https://yourusername.github.io/your-repo-name`

## Recipe File Format

Recipe files should be in CSV format with:
- First line: Ingredients (comma-separated)
- Following lines: Cooking steps (one step per line)

Example:
```
flour,sugar,eggs,milk
Mix flour and sugar
Add eggs and milk
Bake at 350°F for 30 minutes
```

## Adding New Recipes

1. Create a new text file with your recipe
2. Follow the CSV format above
3. Add the filename to `files.json`
4. Commit and push to GitHub

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