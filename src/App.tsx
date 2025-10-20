import { useState, useEffect } from 'react'
import { List, InstagramLogo, WhatsappLogo } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import CakesEvents from '@/components/CakesEvents'

// Import images from assets
import ganeshjiPic from './assets/art-auction/pic.jpeg'
import dimensionsImage from './assets/art-auction/dimensions.jpeg'
import videoFile from './assets/art-auction/video.mp4'
import artistPic from './assets/artist/artist-pic.jpeg'
import businessLogo from './assets/artist/logo.jpeg'

// Import featured art images
import featured1 from './assets/featured-art/featured1.webp'
import featured2 from './assets/featured-art/featured2.webp'
import featured3 from './assets/featured-art/featured3.webp'
import featured4 from './assets/featured-art/featured4.webp'
import featured5 from './assets/featured-art/featured5.webp'
import featured6 from './assets/featured-art/featured6.jpeg'
import featured7 from './assets/featured-art/featured7.webp'
import featured8 from './assets/featured-art/featured8.webp'
import featured9 from './assets/featured-art/featured9.webp'
import featured10 from './assets/featured-art/featured10.jpeg'
import featured11 from './assets/featured-art/featured11.jpeg'
import featured12 from './assets/featured-art/featured12.jpeg'
import featured13 from './assets/featured-art/featured13.jpeg'

// Add CSS protection for all artwork images and diya animation
const protectedImageStyles = `
  .protected-image, .protected-artwork, .protected-featured {
    -webkit-user-select: none !important;
    -moz-user-select: none !important;
    -ms-user-select: none !important;
    user-select: none !important;
    -webkit-user-drag: none !important;
    -khtml-user-drag: none !important;
    -moz-user-drag: none !important;
    -o-user-drag: none !important;
    user-drag: none !important;
    -webkit-touch-callout: none !important;
    pointer-events: none !important;
  }
  
  .protected-image::selection, .protected-artwork::selection, .protected-featured::selection {
    background: transparent !important;
  }
  
  .protected-image::-moz-selection, .protected-artwork::-moz-selection, .protected-featured::-moz-selection {
    background: transparent !important;
  }

  /* Additional protection for thumbnails */
  .protected-thumbnail {
    -webkit-user-select: none !important;
    -moz-user-select: none !important;
    -ms-user-select: none !important;
    user-select: none !important;
    -webkit-user-drag: none !important;
    -khtml-user-drag: none !important;
    -moz-user-drag: none !important;
    -o-user-drag: none !important;
    user-drag: none !important;
    -webkit-touch-callout: none !important;
  }

  /* Burning Diya Animation */
  @keyframes diya-flicker {
    0%, 100% { 
      transform: scale(1);
      filter: drop-shadow(0 0 5px #ff6b35) drop-shadow(0 0 10px #ff8c42) drop-shadow(0 0 15px #ffd23f);
    }
    25% { 
      transform: scale(1.05);
      filter: drop-shadow(0 0 8px #ff6b35) drop-shadow(0 0 15px #ff8c42) drop-shadow(0 0 20px #ffd23f);
    }
    50% { 
      transform: scale(0.98);
      filter: drop-shadow(0 0 3px #ff6b35) drop-shadow(0 0 8px #ff8c42) drop-shadow(0 0 12px #ffd23f);
    }
    75% { 
      transform: scale(1.03);
      filter: drop-shadow(0 0 6px #ff6b35) drop-shadow(0 0 12px #ff8c42) drop-shadow(0 0 18px #ffd23f);
    }
  }

  .burning-diya {
    display: inline-block;
    animation: diya-flicker 2s ease-in-out infinite;
    margin-right: 4px;
  }
`

// Inject styles
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style')
  styleSheet.textContent = protectedImageStyles
  document.head.appendChild(styleSheet)
}

function App() {
  // Initialize view from URL hash or default to 'home'
  const getInitialView = () => {
    const hash = window.location.hash.slice(1) // Remove the #
    const validViews = ['home', 'about', 'gallery', 'contact', 'auction', 'cakes']
    return validViews.includes(hash as any) ? hash as 'home' | 'about' | 'gallery' | 'contact' | 'auction' | 'cakes' : 'home'
  }
  
  const [currentView, setCurrentView] = useState<'home' | 'about' | 'gallery' | 'contact' | 'auction' | 'cakes'>(getInitialView())
  
  // Function to navigate and update URL
  const navigateTo = (view: 'home' | 'about' | 'gallery' | 'contact' | 'auction' | 'cakes') => {
    setCurrentView(view)
    window.location.hash = view === 'home' ? '' : view
  }
  
  const [currentBid, setCurrentBid] = useState(0) // Start with 0 instead of stale 200
  const [auctionAmount, setAuctionAmount] = useState('')
  const [auctionCount, setAuctionCount] = useState(0)
  const [selectedMedia, setSelectedMedia] = useState<'main' | 'dimensions' | 'video'>('main')
  const [showAuctionForm, setShowAuctionForm] = useState(false)
  const [currentFeaturedIndex, setCurrentFeaturedIndex] = useState(0)
  const [isLoadingAuctionData, setIsLoadingAuctionData] = useState(true) // Start as loading
  const [hasRealAuctionData, setHasRealAuctionData] = useState(false) // Track if we have real backend data
  const [auctioneerInfo, setAuctioneerInfo] = useState({
    fullName: '',
    email: '',
    phone: ''
  })
  const [isSubmittingOffer, setIsSubmittingOffer] = useState(false)

  // Add keyboard protection for image saving on all artwork pages
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Disable common image saving shortcuts when viewing artwork (about, home, auction pages)
      if (currentView === 'about' || currentView === 'home' || currentView === 'gallery' || currentView === 'auction' || currentView === 'cakes') {
        // Disable Ctrl+S (Save), Ctrl+Shift+S (Save As), F12 (DevTools), Ctrl+U (View Source)
        if ((e.ctrlKey && e.key === 's') || 
            (e.ctrlKey && e.shiftKey && e.key === 'S') || 
            e.key === 'F12' || 
            (e.ctrlKey && e.key === 'u') ||
            (e.ctrlKey && e.shiftKey && e.key === 'I')) {
          e.preventDefault()
          return false
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [currentView])

  // Listen for browser back/forward navigation
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1)
      const validViews = ['home', 'about', 'gallery', 'contact', 'auction', 'cakes']
      if (validViews.includes(hash as any)) {
        setCurrentView(hash as 'home' | 'about' | 'gallery' | 'contact' | 'auction' | 'cakes')
      } else if (hash === '') {
        setCurrentView('home')
      }
    }

    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  // Protected Image Component for reusability
  const ProtectedImage = ({ 
    src, 
    alt, 
    className = "", 
    showWatermark = true, 
    watermarkText = "© Art Studio by Akash",
    onError,
    style = {}
  }: {
    src: string
    alt: string
    className?: string
    showWatermark?: boolean
    watermarkText?: string
    onError?: (e: React.SyntheticEvent<HTMLImageElement, Event>) => void
    style?: React.CSSProperties
  }) => (
    <div className="relative">
      <div className="relative overflow-hidden">
        <img 
          src={src} 
          alt={alt} 
          className={`protected-artwork select-none pointer-events-none ${className}`}
          style={{
            userSelect: 'none',
            WebkitUserSelect: 'none',
            MozUserSelect: 'none',
            msUserSelect: 'none',
            WebkitTouchCallout: 'none',
            WebkitUserDrag: 'none',
            KhtmlUserDrag: 'none',
            MozUserDrag: 'none',
            OUserDrag: 'none',
            ...style
          } as React.CSSProperties}
          onError={onError}
          onContextMenu={(e) => e.preventDefault()}
          onDragStart={(e) => e.preventDefault()}
          draggable={false}
        />
        {/* Invisible overlay to prevent interactions */}
        <div 
          className="absolute inset-0 bg-transparent"
          onContextMenu={(e) => e.preventDefault()}
          onDragStart={(e) => e.preventDefault()}
          style={{ 
            userSelect: 'none',
            WebkitUserSelect: 'none',
            pointerEvents: 'auto',
            cursor: 'default'
          } as React.CSSProperties}
        ></div>
      </div>
      
      {showWatermark && (
        <div className="absolute bottom-1 right-1 bg-black/60 text-white text-xs px-2 py-1 rounded backdrop-blur-sm">
          <div className="flex items-center gap-1">
            <svg className="w-2 h-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
            <span>{watermarkText}</span>
          </div>
        </div>
      )}
    </div>
  )

  // Featured artworks array
  const featuredArtworks = [
    { 
      image: featured1, 
      title: "Ethereal Flow", 
      description: "Delicate swirls of translucent resin showcase organic flowing patterns with metallic gold veining. The glossy finish reflects light beautifully, creating depth and movement across the surface with natural cell formations and flowing lines.",
      dimensions: "Custom sizes available",
      medium: "Epoxy Resin, Gold Leaf, Metallic Pigments",
      price: "$285",
      availability: "Made to order in your preferred size"
    },
    { 
      image: featured2, 
      title: "Ocean Dreams", 
      description: "Multiple layers of blue and white resin create wave-like patterns with pearl accents. The piece features natural lacing effects and foam-like textures that mimic ocean movement with stunning depth variations.",
      dimensions: "Custom sizes available",
      medium: "Epoxy Resin, Pearl Powder, Ocean Blue Pigments",
      price: "$350",
      availability: "Made to order in your preferred size"
    },
    { 
      image: featured3, 
      title: "Golden Sunset", 
      description: "Warm amber tones blend seamlessly with gold metallic accents creating graduated color transitions. The resin's natural flow patterns capture the essence of sunset clouds with rich orange and yellow gradients.",
      dimensions: "Custom sizes available",
      medium: "Epoxy Resin, Amber Pigments, Gold Metallic",
      price: "$265",
      availability: "Made to order in your preferred size"
    },
    { 
      image: featured4, 
      title: "Marble Elegance", 
      description: "Sophisticated white base with realistic charcoal veining that mimics natural marble stone. The resin's high-gloss finish enhances the organic vein patterns while maintaining clean, contemporary appeal.",
      dimensions: "Custom sizes available",
      medium: "Epoxy Resin, Marble Powder, Charcoal Pigments",
      price: "$325",
      availability: "Made to order in your preferred size"
    },
    { 
      image: featured5, 
      title: "Forest Whispers", 
      description: "Rich forest green base with natural earth-tone accents and organic cell patterns. The layered composition creates texture reminiscent of moss-covered forest floors with subtle metallic highlights.",
      dimensions: "Custom sizes available",
      medium: "Epoxy Resin, Natural Earth Pigments, Forest Green",
      price: "$295",
      availability: "Made to order in your preferred size"
    },
    { 
      image: featured6, 
      title: "Rose Quartz", 
      description: "Soft blush pink tones with pearl shimmer effects throughout the surface. The gentle color gradations and subtle lacing patterns create an ethereal, crystal-like appearance with delicate light reflection.",
      dimensions: "Custom sizes available",
      medium: "Epoxy Resin, Pearl Powder, Rose Quartz Pigments",
      price: "$245",
      availability: "Made to order in your preferred size"
    },
    { 
      image: featured7, 
      title: "Midnight Galaxy", 
      description: "Deep navy and black base with scattered metallic silver and gold accents resembling stars. The dark background creates dramatic contrast with bright metallic elements that catch and reflect light.",
      dimensions: "Custom sizes available",
      medium: "Epoxy Resin, Metallic Stars, Deep Space Pigments",
      price: "$395",
      availability: "Made to order in your preferred size"
    },
    { 
      image: featured8, 
      title: "Autumn Leaves", 
      description: "Warm copper and bronze tones with natural flowing patterns that suggest falling leaves. The metallic copper leaf creates texture and depth with beautiful oxidized color variations.",
      dimensions: "Custom sizes available",
      medium: "Epoxy Resin, Copper Leaf, Autumn Pigments",
      price: "$305",
      availability: "Made to order in your preferred size"
    },
    { 
      image: featured9, 
      title: "Crystal Clear", 
      description: "Pure transparent resin with embedded glass elements creating prismatic light effects. The clear composition showcases the resin's natural clarity while glass pieces add sparkle and dimension.",
      dimensions: "Custom sizes available",
      medium: "Clear Epoxy Resin, Glass Elements, Crystal Pigments",
      price: "$275",
      availability: "Made to order in your preferred size"
    },
    { 
      image: featured10, 
      title: "Crimson Cascade", 
      description: "Bold red pigments create dramatic flowing patterns with burgundy depth variations. The high-contrast design features natural lacing effects and metallic accents that enhance the dynamic movement.",
      dimensions: "Custom sizes available",
      medium: "Epoxy Resin, Crimson Pigments, Metallic Accents",
      price: "$320",
      availability: "Made to order in your preferred size"
    },
    { 
      image: featured11, 
      title: "Sapphire Dreams", 
      description: "Deep royal blue with pearl finish creates luxurious gem-like appearance. The rich color saturation combined with subtle shimmer effects mimics the depth and brilliance of precious sapphires.",
      dimensions: "Custom sizes available",
      medium: "Epoxy Resin, Sapphire Blue Pigments, Pearl Finish",
      price: "$340",
      availability: "Made to order in your preferred size"
    },
    { 
      image: featured12, 
      title: "Ivory Elegance", 
      description: "Creamy ivory base with subtle shimmer throughout creates understated luxury. The neutral palette features gentle color variations and soft luminescence perfect for sophisticated interiors.",
      dimensions: "Custom sizes available",
      medium: "Epoxy Resin, Ivory Pigments, Subtle Shimmer",
      price: "$290",
      availability: "Made to order in your preferred size"
    },
    { 
      image: featured13, 
      title: "Emerald Forest", 
      description: "Vibrant emerald green with natural texture elements creating organic forest-like patterns. The rich color depth combined with textural components gives the piece an earthy, natural appeal.",
      dimensions: "Custom sizes available",
      medium: "Epoxy Resin, Emerald Pigments, Natural Textures",
      price: "$315",
      availability: "Made to order in your preferred size"
    }
  ]

  // Auto-rotate featured artwork every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeaturedIndex((prev) => (prev + 1) % featuredArtworks.length)
    }, 4000)
    
    return () => clearInterval(interval)
  }, [featuredArtworks.length])

  // Fetch real auction data from Google Sheets
  const fetchAuctionData = async () => {
    try {
      setIsLoadingAuctionData(true)
      console.log('Fetching bid data from Google Sheets...')
      
      // Method 1: Try the enhanced Google Apps Script with read support
      try {
        const READ_URL = 'https://script.google.com/macros/s/AKfycbzJXVopqkMUnrlbb79ZLDNFH5SB7M1y6A9cU2iPKUE4Gga2tNkqgk_PKcUcpISKEu1z/exec?action=read'
        
        const response = await fetch(READ_URL, {
          method: 'GET',
          mode: 'no-cors', // Changed to no-cors to avoid CORS issues during development
          headers: {
            'Content-Type': 'application/json',
          }
        })
        
        console.log('Google Apps Script response status:', response.status, response.type)
        
        // Note: With no-cors mode, we can't read the response, so we'll assume success if no error
        if (response.type === 'opaque') {
          console.log('✅ Google Apps Script called successfully (no-cors mode)')
          // Since we can't read the response in no-cors mode, we'll try again with CORS after a delay
          setTimeout(() => {
            fetch(READ_URL, { method: 'GET', mode: 'cors' })
              .then(res => res.json())
              .then(data => {
                if (data.success && data.summary) {
                  setCurrentBid(data.summary.highestBid)
                  setAuctionCount(data.summary.totalBids)
                  setHasRealAuctionData(true)
                  setIsLoadingAuctionData(false) // Clear loading only when we get real data
                  console.log(`✅ Delayed fetch success - Highest bid: $${data.summary.highestBid}, Total bids: ${data.summary.totalBids}`)
                }
              })
              .catch(err => {
                console.log('Delayed CORS fetch failed:', err)
                setIsLoadingAuctionData(false) // Clear loading even if delayed fetch fails
              })
          }, 2000)
        }
      } catch (scriptError) {
        console.log('Google Apps Script method failed:', scriptError)
      }
      
      // Method 2: Try CSV export (fallback) - Use the correct Sheet ID
      try {
        const SHEET_ID = '1GIde3V2SsXTLolnZhoblAJtvLUgrU8Vm-OxSoIPQwh8' // Use the correct Sheet ID
        const CSV_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv&gid=0`
        
        console.log('Trying CSV export from:', CSV_URL)
        
        const response = await fetch(CSV_URL, {
          method: 'GET',
          mode: 'no-cors'
        })
        
        console.log('CSV response status:', response.status, response.type)
        
        if (response.type === 'opaque') {
          console.log('✅ CSV export accessed (no-cors mode)')
        }
      } catch (csvError) {
        console.log('CSV method failed:', csvError)
      }
      
      // Method 3: Development mock data (temporary) - DISABLED to see real data
      // if (window.location.hostname === 'localhost' && !hasRealAuctionData) {
      //   console.log('🔧 Mock data disabled - attempting to fetch real data only')
      // }
      
      // Method 4: Log that all methods failed - keep loading until real data
      console.log('⚠️ All data fetching methods failed')
      console.log('Current bid in state:', currentBid)
      console.log('Keeping loading state active until real auction data is available')
      
      // Do NOT clear loading state - keep showing loading until real data comes
      // This ensures we never show $0 or fake prices
      
      console.log('')
      console.log('🚀 DEPLOYMENT REQUIRED:')
      console.log('1. Go to https://script.google.com/')
      console.log('2. Create new project and paste code from enhanced-google-apps-script-with-cors.js')
      console.log('3. Deploy as Web app (Execute as: Me, Access: Anyone)')
      console.log('4. Update script URLs in App.tsx with new deployment URL')
      console.log('')
      console.log('📋 Current script URL: https://script.google.com/macros/s/AKfycbzJXVopqkMUnrlbb79ZLDNFH5SB7M1y6A9cU2iPKUE4Gga2tNkqgk_PKcUcpISKEu1z/exec')
      console.log('📋 Make sure the script URL is correct and has proper CORS headers')
      console.log('📋 Check URGENT-DEPLOYMENT-NEEDED.md for detailed steps')
            
    } catch (error) {
      console.log('❌ Error fetching bid data:', error)
      console.log('Keeping loading state active - no fake prices will be shown')
      
      // Do NOT clear loading state or set fake prices
      // Keep loading until real data is available
    }
  }

  // Fetch bid data when component mounts
  useEffect(() => {
    fetchAuctionData() // Fetch immediately on mount
  }, [])

  // Refresh auction data when viewing auction page
  useEffect(() => {
    if (currentView === 'auction') {
      fetchAuctionData() // Fetch when entering auction page
      // Refresh auction data every 30 seconds when on auction page
      const interval = setInterval(fetchAuctionData, 30000)
      return () => clearInterval(interval)
    }
  }, [currentView])

  const handleOfferSubmit = () => {
    const offer = parseInt(auctionAmount)
    const minimumBid = currentBid + 5
    
    if (!offer || offer < minimumBid) {
      alert(`Please enter an offer of at least $${minimumBid}`)
      return
    }
    
    setShowAuctionForm(true)
  }

  const submitOffer = async () => {
    if (!auctioneerInfo.fullName || !auctioneerInfo.email || !auctioneerInfo.phone) {
      alert('Please fill in all required fields (Name, Email, Phone)')
      return
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(auctioneerInfo.email)) {
      alert('Please enter a valid email address')
      return
    }
    
    // Phone validation (basic)
    const phoneRegex = /^[\d\s\-\+\(\)]+$/
    if (!phoneRegex.test(auctioneerInfo.phone) || auctioneerInfo.phone.length < 10) {
      alert('Please enter a valid phone number')
      return
    }
    
    const offer = parseInt(auctionAmount)
    const bidData = {
      timestamp: new Date().toLocaleString(),
      fullName: auctioneerInfo.fullName,
      email: auctioneerInfo.email,
      phone: auctioneerInfo.phone,
      auctionAmount: offer,
      previousBid: currentBid,
      item: 'Ganeshji Resin Art - Diwali Special',
      charity: 'UTSAV USA'
    }
    
    // Start loading state immediately
    setIsSubmittingOffer(true)
    
    try {
      // Optimistically update the UI FIRST for instant feedback
      if (offer > currentBid) {
        setCurrentBid(offer)
        setAuctionCount(prevCount => prevCount + 1)
        setHasRealAuctionData(true)
        console.log(`🎯 Optimistically updated current bid to $${offer}`)
      }
      
      // Clear the form immediately to show success
      const userInfo = { ...auctioneerInfo } // Save for success message
      setAuctionAmount('')
      setAuctioneerInfo({ fullName: '', email: '', phone: '' })
      setShowAuctionForm(false)
      setIsSubmittingOffer(false)
      
      // Show immediate success feedback
      alert(`🎉 Your Sacred Offering Has Been Received with Gratitude!

Your loving contribution of $${offer} brings us together in community! 

Blessed Connection Details:
• Name: ${userInfo.fullName}
• Email: ${userInfo.email}
• Phone: ${userInfo.phone}

🙏 Your offering is flowing through our hearts to UTSAV USA
✨ We'll reach out with joy if this divine piece chooses your home
🌟 Thank you for illuminating lives through sacred art and compassion!`)
      
      // Save to Google Sheets in the background (no await to block UI)
      saveToGoogleSheets(bidData).then(() => {
        console.log('✅ Bid successfully saved to Google Sheets')
        // Refresh data from backend after a short delay
        setTimeout(() => {
          fetchAuctionData()
        }, 1000) // Reduced delay from 2s to 1s
      }).catch(error => {
        console.error('⚠️ Error saving to Google Sheets (but UI already updated):', error)
        // Don't show error to user since UI is already updated optimistically
        // In a production app, you might want to implement retry logic here
      })
      
    } catch (error) {
      // Reset optimistic updates if there's an immediate error
      setIsSubmittingOffer(false)
      console.error('Error in bid submission:', error)
      alert('There was an error processing your offer. Please try again or contact us directly.')
    }
  }

  // Function to create WhatsApp links with protected phone numbers
  const createWhatsAppLink = (message: string) => {
    const encodedMessage = encodeURIComponent(message)
    // Use base64 encoded number that gets decoded only when clicked
    const phone = atob('MTQyNTY5ODk5OTA=') 
    return `https://wa.me/${phone}?text=${encodedMessage}`
  }

  // Function to save data to Google Sheets
  const saveToGoogleSheets = async (bidData: any) => {
    // Using the same script URL as the read function for consistency
    const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzJXVopqkMUnrlbb79ZLDNFH5SB7M1y6A9cU2iPKUE4Gga2tNkqgk_PKcUcpISKEu1z/exec'
    
    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bidData),
      mode: 'no-cors' // Required for Google Apps Script
    })
    
    // Note: no-cors mode means we can't read the response, but the data will still be sent
    return response
  }

  const NavMenu = ({ mobile = false }) => {
    const NavButton = ({ view, children }: { view: 'home' | 'about' | 'gallery' | 'contact' | 'auction' | 'cakes', children: React.ReactNode }) => {
      const button = (
        <button
          onClick={() => navigateTo(view)}
          className={`font-body ${mobile ? 'text-base py-2 px-4 w-full' : 'text-sm'} transition-colors ${
            currentView === view ? 'text-accent' : 'text-foreground hover:text-accent'
          }`}
        >
          {children}
        </button>
      )
      
      return mobile ? <SheetClose asChild>{button}</SheetClose> : button
    }

    return (
      <nav className={`${mobile ? 'flex flex-col space-y-4 items-center text-center' : 'hidden md:flex space-x-8'}`}>
        <NavButton view="home">Home</NavButton>
        <NavButton view="about">About</NavButton>
        <NavButton view="gallery">🎨 Art Gallery</NavButton>
        <NavButton view="auction"><span className="burning-diya">🪔</span>Art Auction</NavButton>
        <NavButton view="cakes">Cakes & Events</NavButton>
        <NavButton view="contact">Contact</NavButton>
      </nav>
    )
  }

  return (
    <div className="min-h-screen bg-background font-body">
      {/* Header */}
      <header className="border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ProtectedImage 
              src={businessLogo} 
              alt="Art Studio by Akash Logo" 
              className="h-10 w-10 rounded-full object-cover"
              showWatermark={false}
              onError={(e) => {
                e.currentTarget.style.display = 'none'
              }}
            />
            <h1 className="font-display text-2xl font-bold text-foreground">
              Art Studio by Akash
            </h1>
          </div>
          
          <div className="flex items-center gap-4">
            <NavMenu />
            
            {/* Instagram link */}
            <a
              href="https://www.instagram.com/artstudiobyakash/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-accent hover:bg-accent/90 text-accent-foreground transition-colors"
              aria-label="Follow us on Instagram"
            >
              <InstagramLogo size={20} />
            </a>
          </div>
          
          {/* Mobile menu */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <List size={24} />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <div className="mt-8">
                {/* Mobile Logo */}
                <div className="flex items-center justify-center gap-3 mb-6 pb-4 border-b border-border">
                  <ProtectedImage 
                    src={businessLogo} 
                    alt="Art Studio by Akash Logo" 
                    className="h-8 w-8 rounded-full object-cover"
                    showWatermark={false}
                    onError={(e) => {
                      e.currentTarget.style.display = 'none'
                    }}
                  />
                  <span className="font-display text-lg font-bold text-foreground">
                    Art Studio by Akash
                  </span>
                </div>
                
                <NavMenu mobile />
                
                {/* Instagram link for mobile */}
                <div className="mt-8 pt-8 border-t border-border flex justify-center">
                  <a
                    href="https://www.instagram.com/artstudiobyakash/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-foreground hover:text-accent transition-colors py-2 px-4"
                  >
                    <InstagramLogo size={20} />
                    <span className="font-body text-base">Follow on Instagram</span>
                  </a>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        {currentView === 'home' && (
          <div className="animate-fade-in">
            {/* Compact Hero Section */}
            <div className="relative overflow-hidden bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800 -mx-6 px-6 py-10 mb-10">
              <div className="relative text-center max-w-4xl mx-auto">
                <span className="inline-block px-3 py-1 bg-amber-100 text-amber-800 text-sm font-medium rounded-full mb-4">
                  Fine Contemporary Resin Art
                </span>
                <h1 className="font-display text-4xl md:text-6xl font-light text-foreground mb-4 tracking-tight">
                  Art Studio <span className="font-medium text-accent">by Akash</span>
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground mb-6 max-w-2xl mx-auto">
                  Exquisite resin, plaster, and acrylic artworks meticulously handcrafted in our Bothell atelier
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                  <Button 
                    onClick={() => navigateTo('about')}
                    className="bg-slate-900 hover:bg-slate-700 text-white px-6 py-2 rounded-full text-sm"
                  >
                    Meet the Artist
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => navigateTo('contact')}
                    className="border-slate-300 text-slate-700 hover:bg-slate-50 px-6 py-2 rounded-full text-sm"
                  >
                    Commission Art
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => window.open(createWhatsAppLink(
                      "Hello! I discovered your beautiful art studio and I'm interested in your resin art collection. Could we chat about your available pieces and custom work? 🎨✨"
                    ), '_blank')}
                    className="border-green-300 text-green-700 hover:bg-green-50 px-6 py-2 rounded-full text-sm flex items-center gap-2"
                  >
                    <WhatsappLogo size={14} />
                    Quick Chat
                  </Button>
                </div>
              </div>
            </div>

            {/* Main Content Grid - Better Real Estate Usage */}
            <div className="grid lg:grid-cols-3 gap-8 mb-12">
              {/* Featured Artwork - Takes 2/3 width on large screens */}
              <div className="lg:col-span-2">
                <h2 className="font-display text-2xl md:text-3xl font-light text-foreground mb-6">
                  Featured <span className="font-medium text-accent">Masterpiece</span>
                </h2>
                <div className="relative">
                  <div className="aspect-[4/3] bg-gradient-to-br from-slate-100 to-slate-200 rounded-xl overflow-hidden shadow-xl group">
                    <ProtectedImage 
                      src={featuredArtworks[currentFeaturedIndex].image}
                      alt={featuredArtworks[currentFeaturedIndex].title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      showWatermark={true}
                      watermarkText="© Art Studio by Akash"
                      onError={(e) => {
                        e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'%3E%3Cg fill='%23f1f5f9'%3E%3Crect width='400' height='400' fill='%23f8fafc'/%3E%3Cpath d='M200 150c-27.6 0-50 22.4-50 50s22.4 50 50 50 50-22.4 50-50-22.4-50-50-50zm0 75c-13.8 0-25-11.2-25-25s11.2-25 25-25 25 11.2 25 25-11.2 25-25 25z'/%3E%3Cpath d='M350 100H50c-13.8 0-25 11.2-25 25v150c0 13.8 11.2 25 25 25h300c13.8 0 25-11.2 25-25V125c0-13.8-11.2-25-25-25zm0 175H50V125h300v150z'/%3E%3C/g%3E%3C/svg%3E"
                      }}
                    />
                    {/* Always visible additional watermark overlay for home page */}
                    <div className="absolute inset-0 pointer-events-none">
                      <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-3 py-1.5 rounded-md backdrop-blur-sm border border-white/20">
                        <div className="flex items-center gap-1.5">
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                          </svg>
                          <span className="font-medium">© Art Studio by Akash</span>
                        </div>
                      </div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-4 left-4 right-4 text-white">
                        <h4 className="font-display text-lg font-medium mb-1">
                          {featuredArtworks[currentFeaturedIndex].title}
                        </h4>
                        <p className="text-sm opacity-90">
                          {featuredArtworks[currentFeaturedIndex].description}
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* Compact Navigation */}
                  <div className="flex justify-center gap-2 mt-4">
                    {featuredArtworks.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentFeaturedIndex(index)}
                        className={`w-2 h-2 rounded-full transition-all duration-200 ${
                          index === currentFeaturedIndex 
                            ? 'bg-accent w-6' 
                            : 'bg-slate-300 hover:bg-slate-400'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar Content - 1/3 width */}
              <div className="space-y-6">
                <div>
                  <h3 className="font-display text-xl font-medium text-foreground mb-4">The Art of Transformation</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                    Each piece begins as liquid potential—resin flowing into forms that capture light, emotion, and eternal beauty.
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <h4 className="font-medium text-foreground text-sm mb-1">Premium Materials</h4>
                        <p className="text-muted-foreground text-xs">Museum-quality epoxy resins and archival pigments</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <h4 className="font-medium text-foreground text-sm mb-1">Meticulous Process</h4>
                        <p className="text-muted-foreground text-xs">Each layer carefully applied and cured for optimal clarity</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <h4 className="font-medium text-foreground text-sm mb-1">Timeless Design</h4>
                        <p className="text-muted-foreground text-xs">Contemporary aesthetics with enduring appeal</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-gradient-to-br from-slate-50 to-white rounded-xl p-4 border border-slate-100">
                  <h4 className="font-medium text-foreground mb-3 text-sm">Start Your Journey</h4>
                  <div className="space-y-2">
                    <Button 
                      onClick={() => navigateTo('gallery')}
                      variant="ghost"
                      className="w-full justify-start text-left p-2 h-auto text-sm"
                    >
                      🎨 Browse Art Gallery
                    </Button>
                    <Button 
                      onClick={() => navigateTo('about')}
                      variant="ghost"
                      className="w-full justify-start text-left p-2 h-auto text-sm"
                    >
                      👨‍🎨 Meet the Artist
                    </Button>
                    <Button 
                      onClick={() => navigateTo('contact')}
                      variant="ghost"
                      className="w-full justify-start text-left p-2 h-auto text-sm"
                    >
                      ✨ Commission Custom Art
                    </Button>
                    <Button 
                      onClick={() => navigateTo('cakes')}
                      variant="ghost"
                      className="w-full justify-start text-left p-2 h-auto text-sm"
                    >
                      🧁 Custom Cakes & Events
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Compact Services Overview */}
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <div className="group bg-gradient-to-br from-slate-50 to-white rounded-xl p-6 border border-slate-100 hover:shadow-lg transition-all duration-300">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-accent text-lg">👨‍🎨</span>
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-medium text-foreground mb-2">The Artisan</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      Years of dedication to resin art, creating bespoke pieces that blend traditional techniques with contemporary vision.
                    </p>
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  onClick={() => navigateTo('about')}
                  className="text-accent hover:bg-accent/10 text-sm p-0 h-auto"
                >
                  Learn More →
                </Button>
              </div>
              
              <div className="group bg-gradient-to-br from-slate-50 to-white rounded-xl p-6 border border-slate-100 hover:shadow-lg transition-all duration-300">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-accent text-lg">⚗️</span>
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-medium text-foreground mb-2">The Process</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      Meticulous multi-stage process, from initial concept sketches to final curing—ensuring exceptional quality.
                    </p>
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  onClick={() => navigateTo('contact')}
                  className="text-accent hover:bg-accent/10 text-sm p-0 h-auto"
                >
                  See Process →
                </Button>
              </div>
              
              <div className="group bg-gradient-to-br from-accent/5 to-accent/10 rounded-xl p-6 border border-accent/20 hover:shadow-lg transition-all duration-300">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-10 h-10 bg-accent/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-accent text-lg">✨</span>
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-medium text-foreground mb-2">Custom Work</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      Transform your vision into tangible beauty with bespoke pieces tailored to your space and aesthetic.
                    </p>
                  </div>
                </div>
                <Button 
                  onClick={() => navigateTo('contact')}
                  className="bg-accent text-accent-foreground hover:bg-accent/90 text-sm px-4 py-2"
                >
                  Commission Now
                </Button>
              </div>
            </div>

          </div>
        )}

        {currentView === 'about' && (
          <div className="animate-fade-in max-w-3xl mx-auto">
            <h2 className="font-display text-3xl font-bold text-foreground mb-8">
              About the Artist
            </h2>
            
            {/* Artist Photo - Protected */}
            <div className="flex flex-col md:flex-row gap-8 mb-8">
              <div className="md:w-1/3">
                <div className="relative w-28 mx-auto">
                  {/* Protected Image Container */}
                  <div className="relative overflow-hidden rounded-lg shadow-lg">
                    <img 
                      src={artistPic} 
                      alt="Akash - Artist" 
                      className="w-full object-cover select-none pointer-events-none protected-image"
                      style={{
                        userSelect: 'none',
                        WebkitUserSelect: 'none',
                        MozUserSelect: 'none',
                        msUserSelect: 'none',
                        WebkitTouchCallout: 'none',
                        WebkitUserDrag: 'none',
                        KhtmlUserDrag: 'none',
                        MozUserDrag: 'none',
                        OUserDrag: 'none'
                      } as React.CSSProperties}
                      onError={(e) => {
                        e.currentTarget.src = "https://via.placeholder.com/300x400/e2e8f0/64748b?text=Artist+Photo"
                      }}
                      onContextMenu={(e) => e.preventDefault()}
                      onDragStart={(e) => e.preventDefault()}
                      draggable={false}
                    />
                    {/* Invisible overlay to prevent interactions */}
                    <div 
                      className="absolute inset-0 bg-transparent"
                      onContextMenu={(e) => e.preventDefault()}
                      onDragStart={(e) => e.preventDefault()}
                      style={{ 
                        userSelect: 'none',
                        WebkitUserSelect: 'none',
                        pointerEvents: 'auto',
                        cursor: 'default'
                      } as React.CSSProperties}
                    ></div>
                  </div>
                </div>
                <p className="text-center text-sm text-muted-foreground mt-3 italic select-none">
                  Artist and Small Business Owner
                </p>
              </div>
              
              <div className="md:w-2/3">
            <div className="prose prose-gray max-w-none">
              <p className="font-body text-foreground text-lg leading-relaxed mb-6">
                Akash is a contemporary resin, plaster, and acrylic artist based in Seattle, Washington, who has expanded her creative passion into a full-service family business. Her artistic journey began in childhood, where a love for color and creativity has blossomed into a comprehensive studio offering custom art, artisan baking, and memorable family celebrations.
              </p>
              
              {/* Multi-Service Business Highlight */}
              <div className="grid md:grid-cols-3 gap-4 mb-6">
                {/* Custom Art Service */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-200">
                  <h4 className="font-display text-lg font-bold text-blue-800 mb-2 flex items-center gap-2">
                    🎨 Custom Art
                  </h4>
                  <p className="font-body text-blue-800 text-sm leading-relaxed">
                    Handmade resin, plaster & acrylic artworks. Each piece is completely custom and crafted in our Bothell studio.
                  </p>
                </div>
                
                {/* Custom Cakes Service */}
                <div className="bg-gradient-to-r from-pink-50 to-rose-50 p-4 rounded-lg border border-pink-200">
                  <h4 className="font-display text-lg font-bold text-pink-800 mb-2 flex items-center gap-2">
                    🧁 Custom Cakes
                  </h4>
                  <p className="font-body text-pink-800 text-sm leading-relaxed">
                    Handcrafted whole wheat, eggless cakes with custom designs. Perfect for celebrations.
                  </p>
                </div>
                
                {/* Kids Events Service */}
                <div className="bg-gradient-to-r from-purple-50 to-violet-50 p-4 rounded-lg border border-purple-200">
                  <h4 className="font-display text-lg font-bold text-purple-800 mb-2 flex items-center gap-2">
                    🎈 Party Services
                  </h4>
                  <p className="font-body text-purple-800 text-sm leading-relaxed">
                    Kids art events, party decorations, and complete celebration planning for memorable family gatherings.
                  </p>
                </div>
              </div>
              
              <p className="font-body text-foreground leading-relaxed mb-6">
                For Akash, creativity flows through every aspect of her work—from the fluid elegance of resin art to the delicate craft of artisan baking. She masterfully blends artistic vision with family-centered service, creating beautiful experiences that bring people together through art, food, and celebration.
              </p>
              <p className="font-body text-foreground leading-relaxed mb-6">
                Through Art Studio by Akash, she has built a comprehensive creative business that serves families across the Pacific Northwest. Whether crafting a custom resin masterpiece, designing a custom birthday cake, or organizing an engaging kids art party, every service reflects her commitment to quality, creativity, and making life's special moments truly memorable.
              </p>
              <p className="font-body text-foreground leading-relaxed mb-6 text-center italic text-xl">
                Art Studio by Akash – Turning Dreams into Art.
              </p>
              <p className="font-body text-foreground leading-relaxed">
                Follow the latest works and creative process on Instagram{' '}
                <a 
                  href="https://www.instagram.com/artstudiobyakash/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-accent hover:text-accent/80 transition-colors"
                >
                  @artstudiobyakash
                </a>, where behind-the-scenes content and new pieces come to life.
              </p>
            </div>
              </div>
            </div>
          </div>
        )}

        {currentView === 'gallery' && (
          <div className="animate-fade-in max-w-6xl mx-auto">
            {/* Gallery Header */}
            <div className="text-center mb-12">
              <h1 className="font-display text-4xl md:text-5xl font-light text-foreground mb-4">
                Art <span className="font-medium text-accent">Gallery</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Explore our complete collection of handcrafted resin artworks. Each design can be created in your preferred size and is meticulously crafted in our Bothell studio with love and attention to detail.
              </p>
            </div>

            {/* Gallery Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {featuredArtworks.map((artwork, index) => (
                <Card key={index} className="overflow-hidden hover:shadow-xl transition-all duration-300 group">
                  <Dialog>
                    <DialogTrigger asChild>
                      <div className="relative aspect-[4/3] overflow-hidden cursor-pointer">
                        <ProtectedImage 
                          src={artwork.image}
                          alt={artwork.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          showWatermark={true}
                          watermarkText="© Art Studio by Akash"
                          onError={(e) => {
                            e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'%3E%3Cg fill='%23f1f5f9'%3E%3Crect width='400' height='300' fill='%23f8fafc'/%3E%3Cpath d='M200 100c-27.6 0-50 22.4-50 50s22.4 50 50 50 50-22.4 50-50-22.4-50-50-50zm0 75c-13.8 0-25-11.2-25-25s11.2-25 25-25 25 11.2 25 25-11.2 25-25 25z'/%3E%3Cpath d='M350 80H50c-13.8 0-25 11.2-25 25v110c0 13.8 11.2 25 25 25h300c13.8 0 25-11.2 25-25V105c0-13.8-11.2-25-25-25zm0 135H50V105h300v110z'/%3E%3C/g%3E%3C/svg%3E"
                          }}
                        />
                        {/* Click indicator overlay */}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 flex items-center justify-center">
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 rounded-full p-3">
                            <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </DialogTrigger>
                    
                    <DialogContent className="max-w-4xl w-[95vw] max-h-[90vh] p-0 overflow-hidden">
                      <div className="relative">
                        {/* Full size image */}
                        <div className="aspect-auto max-h-[80vh] overflow-hidden">
                          <ProtectedImage 
                            src={artwork.image}
                            alt={artwork.title}
                            className="w-full h-full object-contain"
                            showWatermark={true}
                            watermarkText="© Art Studio by Akash"
                            onError={(e) => {
                              e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'%3E%3Cg fill='%23f1f5f9'%3E%3Crect width='400' height='300' fill='%23f8fafc'/%3E%3Cpath d='M200 100c-27.6 0-50 22.4-50 50s22.4 50 50 50 50-22.4 50-50-22.4-50-50-50zm0 75c-13.8 0-25-11.2-25-25s11.2-25 25-25 25 11.2 25 25-11.2 25-25 25z'/%3E%3Cpath d='M350 80H50c-13.8 0-25 11.2-25 25v110c0 13.8 11.2 25 25 25h300c13.8 0 25-11.2 25-25V105c0-13.8-11.2-25-25-25zm0 135H50V105h300v110z'/%3E%3C/g%3E%3C/svg%3E"
                            }}
                          />
                        </div>
                        
                        {/* Image details overlay */}
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                          <h3 className="font-display text-2xl font-semibold text-white mb-2">
                            {artwork.title}
                          </h3>
                          <p className="text-white/90 text-sm mb-3">
                            {artwork.description}
                          </p>
                          <div className="flex flex-wrap gap-4 text-sm text-white/80">
                            <span><strong>Medium:</strong> {artwork.medium}</span>
                            <span><strong>Dimensions:</strong> {artwork.dimensions}</span>
                          </div>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                  
                  <CardContent className="p-6">
                    <div className="mb-4">
                      <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                        {artwork.title}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed mb-3">
                        {artwork.description}
                      </p>
                    </div>

                    {/* Artwork Details */}
                    <div className="space-y-2 mb-6 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Dimensions:</span>
                        <span className="font-medium text-foreground">{artwork.dimensions}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Medium:</span>
                        <span className="font-medium text-foreground">{artwork.medium}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Status:</span>
                        <span className="text-green-600 font-medium">{artwork.availability}</span>
                      </div>
                    </div>

                    {/* Order Button */}
                    <div className="w-full">
                      <Button 
                        onClick={() => window.open(createWhatsAppLink(
                          `Hi! I'm interested in "${artwork.title}" from your gallery. 

🎨 Artwork: ${artwork.title}
📏 Dimensions: I'd like to discuss custom sizing options
🖼️ Medium: ${artwork.medium}

Could we discuss the available sizes, pricing, and delivery timeline? I'd love to have this beautiful piece created for my space! ✨`
                        ), '_blank')}
                        className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1"
                      >
                        <WhatsappLogo size={18} className="mr-2" />
                        Order Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Custom Commission Call-to-Action */}
            <div className="text-center bg-gradient-to-r from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-900/50 rounded-2xl p-8 border border-slate-200 dark:border-slate-700">
              <h3 className="font-display text-2xl font-semibold text-foreground mb-4">
                Don't See What You're Looking For?
              </h3>
              <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
                Every piece in our gallery can be customized, or we can create something completely unique just for you. 
                Let's bring your vision to life with a custom commission!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  onClick={() => navigateTo('contact')}
                  className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1"
                >
                  <span className="mr-2">🎨</span>
                  Commission Custom Art
                </Button>
                
                <Button 
                  variant="outline"
                  onClick={() => window.open(createWhatsAppLink(
                    `Hi! I'm interested in commissioning a custom resin artwork. I'd love to discuss my ideas, dimensions, color preferences, and get a quote for a personalized piece. Could we chat about the possibilities? 🎨✨`
                  ), '_blank')}
                  className="border-2 border-green-300 text-green-700 hover:bg-green-50 px-8 py-4 rounded-full shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1"
                >
                  <WhatsappLogo size={20} className="mr-2" />
                  Discuss Custom Ideas
                </Button>
              </div>
            </div>
          </div>
        )}

        {currentView === 'auction' && (
          <div className="animate-fade-in max-w-4xl mx-auto">
            {/* Clean Simple Header */}
            <div className="text-center mb-8">
              <h2 className="font-display text-3xl font-bold text-foreground mb-2">
                Ganeshji Resin Art
              </h2>
              <p className="text-green-600 font-medium">
                Sale benefits <a href="https://utsavusa.org/" target="_blank" rel="noopener noreferrer" className="hover:underline">UTSAV USA</a> • Ends October 17
              </p>
            </div>
            
            {/* Auction Item */}
            <Card className="overflow-hidden">
              <div className="md:flex">
                {/* Interactive Media Gallery */}
                <div className="md:w-1/2">
                  <div className="relative">
                    {/* Main Media Display */}
                    {selectedMedia === 'main' && (
                      <ProtectedImage 
                        src={ganeshjiPic} 
                        alt="Ganeshji Resin Art - Main View" 
                        className="w-full h-80 md:h-96 object-cover"
                        watermarkText="© Diwali Collection"
                        onError={(e) => {
                          e.currentTarget.src = "https://via.placeholder.com/400x300/e2e8f0/64748b?text=Ganeshji+Resin+Art"
                        }}
                      />
                    )}
                    {selectedMedia === 'dimensions' && (
                      <ProtectedImage 
                        src={dimensionsImage} 
                        alt="Ganeshji Resin Art - Dimensions" 
                        className="w-full h-80 md:h-96 object-cover"
                        watermarkText="© Dimensions Guide"
                        onError={(e) => {
                          e.currentTarget.src = "https://via.placeholder.com/400x300/e2e8f0/64748b?text=Dimensions"
                        }}
                      />
                    )}
                    {selectedMedia === 'video' && (
                      <div className="relative">
                        <video 
                          src={videoFile}
                          controls 
                          controlsList="nodownload"
                          className="w-full h-80 md:h-96 object-cover"
                          onContextMenu={(e) => e.preventDefault()}
                          onError={(e) => {
                            e.currentTarget.style.display = 'none'
                          }}
                        >
                          Your browser does not support the video tag.
                        </video>
                        {/* Video watermark */}
                        <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded backdrop-blur-sm pointer-events-none">
                          © Art Studio by Akash
                        </div>
                      </div>
                    )}
                    <div className="absolute top-4 left-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg">
                      🪔 Diwali Special 🪔
                    </div>
                  </div>
                  
                  {/* Media Thumbnails */}
                  <div className="p-4 flex gap-2">
                    <button
                      onClick={() => setSelectedMedia('main')}
                      className={`w-20 h-20 rounded overflow-hidden cursor-pointer transition-all ${
                        selectedMedia === 'main' ? 'ring-2 ring-accent' : 'hover:opacity-80'
                      }`}
                    >
                      <ProtectedImage 
                        src={ganeshjiPic} 
                        alt="Main View" 
                        className="w-full h-full object-cover protected-thumbnail"
                        showWatermark={false}
                        onError={(e) => {
                          e.currentTarget.src = "https://via.placeholder.com/80x80/e2e8f0/64748b?text=Main"
                        }}
                      />
                    </button>
                    <button
                      onClick={() => setSelectedMedia('dimensions')}
                      className={`w-20 h-20 rounded overflow-hidden cursor-pointer transition-all ${
                        selectedMedia === 'dimensions' ? 'ring-2 ring-accent' : 'hover:opacity-80'
                      }`}
                    >
                      <ProtectedImage 
                        src={dimensionsImage} 
                        alt="Dimensions" 
                        className="w-full h-full object-cover protected-thumbnail"
                        showWatermark={false}
                        onError={(e) => {
                          e.currentTarget.src = "https://via.placeholder.com/80x80/e2e8f0/64748b?text=Dims"
                        }}
                      />
                    </button>
                    <button
                      onClick={() => setSelectedMedia('video')}
                      className={`w-20 h-20 bg-muted rounded flex items-center justify-center cursor-pointer transition-all ${
                        selectedMedia === 'video' ? 'ring-2 ring-accent bg-accent/10' : 'hover:bg-muted/80'
                      }`}
                    >
                      <span className="text-xs text-muted-foreground">Video</span>
                    </button>
                  </div>
                </div>
                
                {/* Auction Details */}
                <div className="md:w-1/2 p-6">
                  <div className="mb-6">
                    <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                      Handcrafted Diwali Art
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Beautiful resin artwork perfect for Diwali celebrations and home décor.
                    </p>
                  </div>
                  
                  {/* Price Info */}
                  <div className="text-center mb-6">
                    <div className="font-display text-2xl font-bold text-gray-800 mb-1">
                      {isLoadingAuctionData && !hasRealAuctionData ? (
                        <span className="text-lg text-gray-600 animate-pulse">Loading...</span>
                      ) : (
                        `$${currentBid}`
                      )}
                    </div>
                    <p className="text-sm text-gray-500 mb-3">
                      {isLoadingAuctionData && !hasRealAuctionData ? (
                        <span className="animate-pulse">Connecting to live auction...</span>
                      ) : (
                        `${hasRealAuctionData ? `${auctionCount} offers received` : 'Starting price'} • Ends Oct 17`
                      )}
                    </p>
                    <p className="text-xs text-green-600">
                      Proceeds benefit <a href="https://utsavusa.org" target="_blank" className="underline">UTSAV USA</a>
                    </p>
                  </div>
                  
  {/* Auction Actions */}
                  <div className="space-y-3">
                    {!showAuctionForm ? (
                      <>
                        {/* Quick Offer Buttons */}
                        <div className="space-y-3">
                          <div className="text-center">
                            <p className="text-sm font-medium text-gray-700 mb-2">
                              {isLoadingAuctionData && !hasRealAuctionData ? 
                                "Please wait - fetching live auction price..." : 
                                `Make an offer - Add to the current price of $${currentBid}`
                              }
                            </p>
                            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                              {[5, 10, 25, 50, 100].map((increment) => {
                                const bidValue = currentBid + increment
                                const isSelected = auctionAmount === bidValue.toString()
                                return (
                                  <Button
                                    key={increment}
                                    onClick={() => setAuctionAmount(bidValue.toString())}
                                    variant="outline"
                                    disabled={isSubmittingOffer || (isLoadingAuctionData && !hasRealAuctionData)}
                                    className={`h-12 text-sm font-semibold border-2 transition-all duration-200 ${
                                      isSelected 
                                        ? 'border-amber-500 bg-amber-100 text-amber-800 ring-2 ring-amber-300' 
                                        : 'border-amber-300 text-amber-700 hover:bg-amber-100 hover:border-amber-400'
                                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                                  >
                                    <div className="text-center">
                                      <div className="text-xs text-gray-500">+${increment}</div>
                                      <div className="font-bold">${bidValue}</div>
                                    </div>
                                  </Button>
                                )
                              })}
                            </div>
                          </div>
                          
                          {/* Custom Offer Input */}
                          <div className="space-y-2">
                            <p className="text-sm text-gray-600 text-center">Or enter your offer:</p>
                            <div className="flex gap-2">
                              <input 
                                type="number" 
                                placeholder={isLoadingAuctionData && !hasRealAuctionData ? "Loading..." : `Min: $${currentBid + 5}`}
                                value={auctionAmount}
                                onChange={(e) => setAuctionAmount(e.target.value)}
                                disabled={isSubmittingOffer || (isLoadingAuctionData && !hasRealAuctionData)}
                                className="flex-1 px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-accent text-center font-semibold disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-100"
                                min={currentBid + 5}
                                onFocus={() => {
                                  // Clear the field when user starts typing custom amount
                                  if (auctionAmount && [5, 10, 25, 50, 100].some(inc => auctionAmount === (currentBid + inc).toString())) {
                                    setAuctionAmount('')
                                  }
                                }}
                              />
                              <Button 
                                onClick={handleOfferSubmit}
                                disabled={!auctionAmount || parseInt(auctionAmount) <= currentBid + 4 || isSubmittingOffer || (isLoadingAuctionData && !hasRealAuctionData)}
                                className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                {isSubmittingOffer ? (
                                  <span className="flex items-center gap-2">
                                    <span className="animate-spin">⏳</span>
                                    Processing...
                                  </span>
                                ) : (isLoadingAuctionData && !hasRealAuctionData) ? (
                                  <span className="flex items-center gap-2">
                                    <span className="animate-pulse">⏳</span>
                                    Loading Price...
                                  </span>
                                ) : (
                                  "Make Offer"
                                )}
                              </Button>
                            </div>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <p className="text-xs text-amber-700 bg-amber-50 px-3 py-2 rounded border border-amber-200 text-center">
                            {isLoadingAuctionData && !hasRealAuctionData ? 
                              "Minimum offer: Loading current price..." : 
                              `Minimum offer: $${currentBid + 5}`
                            }
                          </p>
                          {!hasRealAuctionData && (
                            <p className="text-xs text-blue-600 bg-blue-50 px-3 py-2 rounded border border-blue-200 text-center">
                              ⏳ Connecting to live auction system - please wait...
                            </p>
                          )}
                          {hasRealAuctionData && auctionCount > 100 && (
                            <p className="text-xs text-red-600 bg-red-50 px-3 py-2 rounded border border-red-200 text-center">
                              🌟 Popular item! {auctionCount} offers received
                            </p>
                          )}
                        </div>
                      </>
                    ) : (
                      <>
                        {/* Bidder Information Form */}
                        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-200">
                          <h4 className="font-semibold text-blue-800 mb-3 flex items-center gap-2">
                            🙏 Share Your Details for This Sacred Journey
                          </h4>
                          <p className="text-sm text-blue-700 mb-4">
                            Your offer of <strong>${auctionAmount}</strong> looks great! We'll contact you if accepted.
                          </p>
                          
                          <div className="space-y-3">
                            <div>
                              <label className="block text-sm font-medium text-blue-800 mb-1">
                                Full Name *
                              </label>
                              <input 
                                type="text" 
                                placeholder="Enter your full name"
                                value={auctioneerInfo.fullName}
                                onChange={(e) => setAuctioneerInfo({...auctioneerInfo, fullName: e.target.value})}
                                disabled={isSubmittingOffer}
                                className="w-full px-3 py-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-100"
                                required
                              />
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium text-blue-800 mb-1">
                                Email Address *
                              </label>
                              <input 
                                type="email" 
                                placeholder="your.email@example.com"
                                value={auctioneerInfo.email}
                                onChange={(e) => setAuctioneerInfo({...auctioneerInfo, email: e.target.value})}
                                disabled={isSubmittingOffer}
                                className="w-full px-3 py-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-100"
                                required
                              />
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium text-blue-800 mb-1">
                                Phone Number *
                              </label>
                              <input 
                                type="tel" 
                                placeholder="(555) 123-4567"
                                value={auctioneerInfo.phone}
                                onChange={(e) => setAuctioneerInfo({...auctioneerInfo, phone: e.target.value})}
                                disabled={isSubmittingOffer}
                                className="w-full px-3 py-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-100"
                                required
                              />
                            </div>
                          </div>
                          
                          <div className="flex gap-2 mt-4">
                            <Button 
                              onClick={submitOffer}
                              disabled={isSubmittingOffer}
                              className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              {isSubmittingOffer ? (
                                <span className="flex items-center gap-2">
                                  <span className="animate-spin">⏳</span>
                                  Submitting offer...
                                </span>
                              ) : (
                                `Submit Offer - $${auctionAmount}`
                              )}
                            </Button>
                            <Button 
                              variant="outline"
                              onClick={() => {
                                setShowAuctionForm(false)
                                setAuctioneerInfo({ fullName: '', email: '', phone: '' })
                              }}
                              disabled={isSubmittingOffer}
                              className="border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              Cancel
                            </Button>
                          </div>
                          
                          <div className="mt-3 p-2 bg-blue-100 rounded text-xs text-blue-700">
                            <p><strong>📞 How it works:</strong></p>
                            <p>• We'll contact you if your offer is accepted</p>
                            <p>• Simple payment and pickup options available</p>
                            <p>• 100% of proceeds support <a href="https://utsavusa.org/" target="_blank" rel="noopener noreferrer" className="hover:underline">UTSAV USA</a> programs</p>
                          </div>
                        </div>
                      </>
                    )}
                    
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        className="flex-1 border-green-300 text-green-700 hover:bg-green-50"
                        onClick={() => window.open(createWhatsAppLink(
                          "Hi! I'm interested in your beautiful Ganeshji artwork and would love to learn more about this piece! 🪔✨"
                        ), '_blank')}
                      >
                        <WhatsappLogo size={16} className="mr-2" />
                        💬 Questions
                      </Button>
                      <Button 
                        variant="outline" 
                        className="flex-1 border-amber-300 text-amber-700 hover:bg-amber-50"
                        onClick={() => window.open('https://www.instagram.com/artstudiobyakash/', '_blank')}
                      >
                        <InstagramLogo size={16} className="mr-2" />
                        View Collection
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
            
            {/* Simple Info */}
            <div className="mt-8 text-center text-sm text-gray-500 space-y-2">
              <p>We'll contact you within 24 hours if your offer is accepted.</p>
              <p>Local pickup in Bothell, WA or mail payment available.</p>
            </div>
          </div>
        )}

        {currentView === 'cakes' && (
          <CakesEvents />
        )}

        {currentView === 'contact' && (
          <div className="animate-fade-in max-w-4xl mx-auto">
            {/* Beautiful Header Section */}
            <div className="text-center mb-12">
              <h2 className="font-display text-5xl md:text-6xl font-light text-foreground mb-4">
                Let's Create
                <span className="block font-medium text-accent">Together</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Every masterpiece begins with a conversation. Whether you're seeking a unique piece 
                for your collection or envisioning a custom creation, I'm here to bring your artistic dreams to life.
              </p>
            </div>

            {/* Contact Cards Grid */}
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              
              {/* Primary Contact Card */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl p-8 border border-green-200 dark:border-green-800 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-green-100 dark:bg-green-800 rounded-full">
                    <WhatsappLogo size={24} weight="fill" className="text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-semibold text-foreground">WhatsApp Chat</h3>
                    <p className="text-sm text-green-600 dark:text-green-400">Instant response</p>
                  </div>
                </div>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Get instant responses and discuss your art vision in real-time. Perfect for quick questions and project consultations.
                </p>
                <a 
                  href={createWhatsAppLink(
                    "Hello! I'm interested in your resin art collection! I saw your beautiful Diwali Ganeshji piece and would love to learn more about your artwork and custom pieces. Could we discuss pricing and availability? 🎨✨"
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full font-medium transition-all duration-200 hover:shadow-md transform hover:-translate-y-0.5"
                >
                  <WhatsappLogo size={18} weight="fill" />
                  Start Conversation
                </a>
              </div>

              {/* Instagram Card */}
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl p-8 border border-purple-200 dark:border-purple-800 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-800 dark:to-pink-800 rounded-full">
                    <InstagramLogo size={24} weight="fill" className="text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-semibold text-foreground">Instagram</h3>
                    <p className="text-sm text-purple-600 dark:text-purple-400">Daily inspiration</p>
                  </div>
                </div>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Follow my artistic journey and see the latest creations. Get inspired by behind-the-scenes content and process videos.
                </p>
                <a 
                  href="https://www.instagram.com/artstudiobyakash/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-3 rounded-full font-medium transition-all duration-200 hover:shadow-md transform hover:-translate-y-0.5"
                >
                  <InstagramLogo size={18} weight="fill" />
                  @artstudiobyakash
                </a>
              </div>
            </div>

            {/* Studio Information Card */}
            <div className="bg-gradient-to-r from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-900/50 rounded-2xl p-8 border border-slate-200 dark:border-slate-700 shadow-lg mb-12">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-slate-200 dark:bg-slate-700 rounded-lg mt-1">
                      <svg className="w-5 h-5 text-slate-600 dark:text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">Studio Location</h4>
                      <p className="text-muted-foreground">Bothell, Washington</p>
                      <p className="text-sm text-accent font-medium mt-1">
                        🎨 All artwork custom handmade on-site
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-slate-200 dark:bg-slate-700 rounded-lg mt-1">
                      <svg className="w-5 h-5 text-slate-600 dark:text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">Studio Hours</h4>
                      <p className="text-muted-foreground">By appointment only</p>
                      <p className="text-sm text-blue-600 dark:text-blue-400 mt-1">
                        ✨ Private consultations available
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold text-foreground mb-3">What to Expect</h4>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-accent rounded-full"></div>
                      <span className="text-sm text-muted-foreground">View completed artworks in person</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-accent rounded-full"></div>
                      <span className="text-sm text-muted-foreground">Discuss custom commission ideas</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-accent rounded-full"></div>
                      <span className="text-sm text-muted-foreground">See the creative process demonstration</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-accent rounded-full"></div>
                      <span className="text-sm text-muted-foreground">Learn about materials and techniques</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="text-center">
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button 
                  size="lg"
                  className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1"
                  onClick={() => window.open(createWhatsAppLink(
                    "Hello! I'd love to schedule a visit to your art studio in Bothell, WA. I'm interested in seeing your resin art collection in person and discussing custom pieces. When would be a good time? 🎨"
                  ), '_blank')}
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Schedule Studio Visit
                </Button>
                
                <Button 
                  variant="outline"
                  size="lg"
                  className="border-2 border-green-300 text-green-700 hover:bg-green-50 px-8 py-4 rounded-full shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1"
                  onClick={() => window.open(createWhatsAppLink(
                    "Hi! I'm interested in commissioning a custom resin art piece. Could we discuss my ideas, pricing, and timeline? I'd love to create something unique! ✨🎨"
                  ), '_blank')}
                >
                  <WhatsappLogo size={20} className="mr-2" />
                  Custom Commission
                </Button>
              </div>
              
              <p className="text-sm text-muted-foreground mt-6 italic">
                "Every conversation is the beginning of a beautiful collaboration" ✨
              </p>
            </div>
          </div>
        )}
      </main>
      
      {/* Professional Footer */}
      <footer className="bg-background border-t border-border py-6">
        <div className="container mx-auto px-6">
          {/* Business Info */}
          <div className="text-center mb-4">
            <p className="text-sm text-muted-foreground font-medium mb-2">
              🎨 <strong>Art Studio by Akash</strong> 🧁
            </p>
            <p className="text-xs text-muted-foreground">
              Licensed Family-Friendly Art Studio & Bakery<br/>
              Custom Artwork • Handcrafted Cakes • Kids Art Events • Party Planning
            </p>
          </div>
          
          {/* Legal Links */}
          <div className="text-center mb-4">
            <div className="flex justify-center gap-4 text-xs">
              <a 
                href="/privacy-policy.html" 
                className="text-muted-foreground hover:text-accent transition-colors"
              >
                Privacy Policy
              </a>
              <span className="text-muted-foreground">|</span>
              <a 
                href="/terms-of-service.html" 
                className="text-muted-foreground hover:text-accent transition-colors"
              >
                Terms of Service
              </a>
              <span className="text-muted-foreground">|</span>
              <span className="text-muted-foreground">Family Safe ✅</span>
            </div>
          </div>
          
          {/* Designer Credit */}
          <div className="text-center">
            <p className="text-xs text-muted-foreground">
              Designed with <span className="text-red-500">♥</span> by{' '}
              <a 
                href="https://github.com/msjammu" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-accent hover:text-accent/80 transition-colors font-medium"
              >
                MSJ
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App










