# New Cake Addition Instructions

## Overview
A new cake has been added to the cake gallery (cake14). Currently, it uses a placeholder image.

## How to Replace the Placeholder Image

1. **Locate the placeholder file:**
   - Path: `src/assets/cakes/cake14-placeholder.jpg`

2. **Replace with your actual cake image:**
   - Rename your cake image to `cake14.jpg` (or keep it as `cake14-placeholder.jpg`)
   - Copy your image to: `src/assets/cakes/`
   - Recommended image specifications:
     - Format: JPG or JPEG
     - Maximum size: 500KB for optimal loading
     - Recommended dimensions: 800x600 pixels or similar aspect ratio

3. **Update the import (optional):**
   - If you rename the file to something other than `cake14-placeholder.jpg`, update line 35 in `src/components/CakesEvents.tsx`:
   ```typescript
   import cake14 from '../assets/cakes/YOUR_NEW_FILENAME.jpg'
   ```

4. **Update the alt text (optional):**
   - To customize the description, update line 90 in `src/components/CakesEvents.tsx`:
   ```typescript
   { id: 15, src: cake14, alt: "Your custom cake description here" },
   ```

## Current Gallery Status
- **Total cakes in gallery:** 17 (including 2 special featured cakes)
- **New cake position:** 15th in the grid
- **Current alt text:** "Custom Designer Celebration Cake"

## Build and Test
After replacing the image:
```bash
npm run build
npm run dev
```

Then navigate to the "Cakes & Events" section to verify your changes.

## Original Issue
The image was requested via GitHub attachment URL which could not be accessed directly:
https://github.com/user-attachments/assets/1c9dd9c4-95a4-43f0-be28-b25969ad3001

Please provide the actual image file or upload it directly to the repository.
