# Instagram Integration Guide

## Quick Setup Options

### Option 1: Instagram Basic Display API (Recommended for Personal Use)

#### Step 1: Create Facebook App
1. Go to [developers.facebook.com](https://developers.facebook.com)
2. Click "Create App"
3. Choose "Consumer" as app type
4. Enter app name: "Art Studio Portfolio"
5. Enter your email

#### Step 2: Add Instagram Basic Display
1. In your app dashboard, click "+ Add Product"
2. Find "Instagram Basic Display" and click "Set Up"
3. Click "Create New App" in the Instagram Basic Display section

#### Step 3: Configure Basic Display
1. Go to Instagram Basic Display > Basic Display
2. Add Instagram Tester: Enter your Instagram username
3. Set Valid OAuth Redirect URIs:
   ```
   http://localhost:5000/auth/instagram/callback
   https://yourdomain.com/auth/instagram/callback
   ```

#### Step 4: Get Your App Credentials
Copy these values (you'll need them):
- Instagram App ID
- Instagram App Secret
- Client OAuth URI

#### Step 5: Accept Tester Invitation
1. Open Instagram app on your phone
2. Go to Settings > Privacy > Website Permissions
3. Accept the tester invitation from your app

### Option 2: Instagram Embed API (Easiest - No Authentication)

For public posts only, you can use Instagram's oEmbed API:

```javascript
// Get Instagram embed data
const getInstagramEmbed = async (postUrl) => {
  const response = await fetch(`https://api.instagram.com/oembed/?url=${postUrl}`)
  return response.json()
}
```

### Option 3: Manual Content Management (Current Implementation)

Your app currently generates realistic Instagram-style content using AI. This works perfectly for:
- Showcasing your portfolio design
- Testing functionality
- Professional presentation without API complexity

## Implementation

I'll show you how to implement each option in your app.