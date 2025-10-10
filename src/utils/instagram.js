// Instagram Integration Helper
// Add this to your App.tsx or create a separate file

// Instagram Basic Display API Integration
const INSTAGRAM_CONFIG = {
  clientId: 'YOUR_INSTAGRAM_APP_ID', // Replace with your Instagram App ID
  redirectUri: 'http://localhost:5000/auth/instagram/callback',
  scope: 'user_profile,user_media'
}

// Step 1: Redirect user to Instagram authorization
export const authenticateInstagram = () => {
  const authUrl = `https://api.instagram.com/oauth/authorize?client_id=${INSTAGRAM_CONFIG.clientId}&redirect_uri=${INSTAGRAM_CONFIG.redirectUri}&scope=${INSTAGRAM_CONFIG.scope}&response_type=code`
  window.location.href = authUrl
}

// Step 2: Exchange code for access token (this needs to be done on a backend)
export const exchangeCodeForToken = async (code) => {
  // This MUST be done on your backend for security
  // Frontend can't securely store client secret
  const response = await fetch('/api/instagram/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code })
  })
  return response.json()
}

// Step 3: Fetch Instagram posts
export const fetchInstagramPosts = async (accessToken) => {
  try {
    const response = await fetch(`https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,permalink,thumbnail_url,timestamp&access_token=${accessToken}`)
    const data = await response.json()
    
    if (data.data) {
      return data.data
        .filter(item => item.media_type === 'IMAGE')
        .slice(0, 12)
        .map(item => ({
          id: item.id,
          title: item.caption ? item.caption.split('.')[0] : 'Untitled',
          description: item.caption || 'No description available',
          imageUrl: item.media_url,
          instagramUrl: item.permalink,
          likes: Math.floor(Math.random() * 500) + 50, // API doesn't provide likes
          timestamp: item.timestamp.split('T')[0]
        }))
    }
  } catch (error) {
    console.error('Failed to fetch Instagram posts:', error)
    return null
  }
}

// Simple Instagram oEmbed integration (no auth required)
export const fetchInstagramEmbed = async (postUrl) => {
  try {
    const response = await fetch(`https://api.instagram.com/oembed/?url=${postUrl}`)
    return response.json()
  } catch (error) {
    console.error('Failed to fetch Instagram embed:', error)
    return null
  }
}

// Example usage in your component:
/*
// Add Instagram auth button
<Button onClick={authenticateInstagram}>
  Connect Instagram Account
</Button>

// Or use manual post URLs
const manualPosts = [
  'https://www.instagram.com/p/YOUR_POST_ID/',
  'https://www.instagram.com/p/ANOTHER_POST_ID/'
]

const loadManualPosts = async () => {
  const embedPromises = manualPosts.map(url => fetchInstagramEmbed(url))
  const embeds = await Promise.all(embedPromises)
  // Process embeds into your post format
}
*/