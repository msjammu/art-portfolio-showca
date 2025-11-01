# Development Environment Setup

## Quick Start

1. **Run the setup script:**
   ```powershell
   .\setup-dev.ps1
   ```
   This will automatically:
   - Set up Node.js PATH
   - Install dependencies
   - Fix security vulnerabilities
   - Start the development server

2. **Manual setup (if needed):**
   ```powershell
   # Add Node.js to PATH
   $env:PATH += ";C:\Program Files\nodejs"
   
   # Set execution policy
   Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
   
   # Install dependencies
   npm install
   
   # Start development server
   npm run dev
   ```

## Available Scripts

- `npm run dev` - Start development server (http://localhost:5000)
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint (currently needs config update)

## Project Status

✅ **Auction functionality removed** - Clean navigation without auction pages
✅ **Dependencies installed** - All packages ready
✅ **Development server working** - Running on port 5000
✅ **Production build working** - Successfully builds assets
⚠️ **ESLint config** - Needs migration to v9 format (non-critical)

## Features Available for Testing

- **Home Page** - Hero section with featured artwork rotation
- **About Page** - Artist information and studio details
- **Art Gallery** - 13 featured resin artworks with modal viewing
- **Cakes & Events** - Custom cake pricing and kids art events
- **Contact Page** - WhatsApp integration and studio information

## Image Protection

All artwork images include:
- Right-click protection
- Drag & drop disabled
- Watermarks on images
- Keyboard shortcut blocking (Ctrl+S, F12, etc.)

## Notes

- The app uses React 19 with TypeScript
- Tailwind CSS for styling
- Phosphor Icons for UI elements
- Protected phone numbers (base64 encoded)
- Responsive design for mobile/desktop