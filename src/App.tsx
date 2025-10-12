import { useState, useEffect } from 'react'
import { List, InstagramLogo, WhatsappLogo } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet'
import CakesEvents from '@/components/CakesEvents'

// Import images from assets
import ganeshjiPic from './assets/bid1/pic.jpeg'
import dimensionsImage from './assets/bid1/dimensions.jpeg'
import videoFile from './assets/bid1/video.mp4'
import artistPic from './assets/artist/artist-pic.jpeg'
import businessLogo from './assets/artist/logo.jpeg'

// Import featured art images
import featured1 from './assets/featured-art/featured1.webp'
import featured2 from './assets/featured-art/featured2.webp'
import featured3 from './assets/featured-art/featured3.webp'
import featured4 from './assets/featured-art/featured4.webp'
import featured5 from './assets/featured-art/featured5.webp'
import featured6 from './assets/featured-art/featurd6.jpeg'
import featured7 from './assets/featured-art/featured7.webp'
import featured8 from './assets/featured-art/featured8.webp'
import featured9 from './assets/featured-art/featured9.webp'

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
  const [currentView, setCurrentView] = useState<'home' | 'about' | 'contact' | 'bidding' | 'cakes'>('home')
  const [currentBid, setCurrentBid] = useState(0) // Start with 0 instead of stale 200
  const [bidAmount, setBidAmount] = useState('')
  const [bidCount, setBidCount] = useState(0)
  const [selectedMedia, setSelectedMedia] = useState<'main' | 'dimensions' | 'video'>('main')
  const [showBidForm, setShowBidForm] = useState(false)
  const [currentFeaturedIndex, setCurrentFeaturedIndex] = useState(0)
  const [isLoadingBidData, setIsLoadingBidData] = useState(true) // Start as loading
  const [hasRealBidData, setHasRealBidData] = useState(false) // Track if we have real backend data
  const [bidderInfo, setBidderInfo] = useState({
    fullName: '',
    email: '',
    phone: ''
  })
  const [isSubmittingBid, setIsSubmittingBid] = useState(false)

  // Add keyboard protection for image saving on all artwork pages
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Disable common image saving shortcuts when viewing artwork (about, home, bidding pages)
      if (currentView === 'about' || currentView === 'home' || currentView === 'bidding' || currentView === 'cakes') {
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
    { image: featured1, title: "Ethereal Flow", description: "Contemporary resin with gold accents" },
    { image: featured2, title: "Ocean Dreams", description: "Blue and white resin waves" },
    { image: featured3, title: "Golden Sunset", description: "Warm amber and gold tones" },
    { image: featured4, title: "Marble Elegance", description: "Classic marble-inspired design" },
    { image: featured5, title: "Forest Whispers", description: "Green and natural earth tones" },
    { image: featured6, title: "Rose Quartz", description: "Soft pink and pearl finish" },
    { image: featured7, title: "Midnight Galaxy", description: "Deep blues with metallic stars" },
    { image: featured8, title: "Autumn Leaves", description: "Rich orange and copper hues" },
    { image: featured9, title: "Crystal Clear", description: "Transparent layers with light play" }
  ]

  // Auto-rotate featured artwork every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeaturedIndex((prev) => (prev + 1) % featuredArtworks.length)
    }, 4000)
    
    return () => clearInterval(interval)
  }, [featuredArtworks.length])

  // Fetch real bid data from Google Sheets
  const fetchBidData = async () => {
    try {
      setIsLoadingBidData(true)
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
                  setBidCount(data.summary.totalBids)
                  setHasRealBidData(true)
                  setIsLoadingBidData(false) // Clear loading only when we get real data
                  console.log(`✅ Delayed fetch success - Highest bid: $${data.summary.highestBid}, Total bids: ${data.summary.totalBids}`)
                }
              })
              .catch(err => {
                console.log('Delayed CORS fetch failed:', err)
                setIsLoadingBidData(false) // Clear loading even if delayed fetch fails
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
      // if (window.location.hostname === 'localhost' && !hasRealBidData) {
      //   console.log('🔧 Mock data disabled - attempting to fetch real data only')
      // }
      
      // Method 4: Log that all methods failed
      console.log('⚠️ All data fetching methods failed')
      console.log('Current bid in state:', currentBid)
      console.log('Will keep existing state values until real data is available')
      console.log('')
      console.log('� DEPLOYMENT REQUIRED:')
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
      console.log('Keeping existing state values - current bid:', currentBid)
      setIsLoadingBidData(false) // Clear loading on error
    }
  }

  // Fetch bid data when component mounts
  useEffect(() => {
    fetchBidData() // Fetch immediately on mount
  }, [])

  // Refresh bid data when viewing bidding page
  useEffect(() => {
    if (currentView === 'bidding') {
      fetchBidData() // Fetch when entering bidding page
      // Refresh bid data every 30 seconds when on bidding page
      const interval = setInterval(fetchBidData, 30000)
      return () => clearInterval(interval)
    }
  }, [currentView])

  const handleBidSubmit = () => {
    const bid = parseInt(bidAmount)
    const minimumBid = currentBid + 50
    
    if (!bid || bid < minimumBid) {
      alert(`Please enter a bid of at least $${minimumBid} (minimum $50 increment)`)
      return
    }
    
    setShowBidForm(true)
  }

  const submitBid = async () => {
    if (!bidderInfo.fullName || !bidderInfo.email || !bidderInfo.phone) {
      alert('Please fill in all required fields (Name, Email, Phone)')
      return
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(bidderInfo.email)) {
      alert('Please enter a valid email address')
      return
    }
    
    // Phone validation (basic)
    const phoneRegex = /^[\d\s\-\+\(\)]+$/
    if (!phoneRegex.test(bidderInfo.phone) || bidderInfo.phone.length < 10) {
      alert('Please enter a valid phone number')
      return
    }
    
    const bid = parseInt(bidAmount)
    const bidData = {
      timestamp: new Date().toLocaleString(),
      fullName: bidderInfo.fullName,
      email: bidderInfo.email,
      phone: bidderInfo.phone,
      bidAmount: bid,
      previousBid: currentBid,
      item: 'Ganeshji Resin Art - Diwali Special',
      charity: 'UTSAV USA'
    }
    
    // Start loading state immediately
    setIsSubmittingBid(true)
    
    try {
      // Optimistically update the UI FIRST for instant feedback
      if (bid > currentBid) {
        setCurrentBid(bid)
        setBidCount(prevCount => prevCount + 1)
        setHasRealBidData(true)
        console.log(`🎯 Optimistically updated current bid to $${bid}`)
      }
      
      // Clear the form immediately to show success
      const userInfo = { ...bidderInfo } // Save for success message
      setBidAmount('')
      setBidderInfo({ fullName: '', email: '', phone: '' })
      setShowBidForm(false)
      setIsSubmittingBid(false)
      
      // Show immediate success feedback
      alert(`🪔 Bid Submitted Successfully! 
      
Your generous bid of $${bid} has been placed! 

Contact Information Saved:
• Name: ${userInfo.fullName}
• Email: ${userInfo.email}
• Phone: ${userInfo.phone}

✅ Your bid is being processed in real-time
📞 You'll be notified if you win the auction
💝 Thank you for supporting UTSAV USA!`)
      
      // Save to Google Sheets in the background (no await to block UI)
      saveToGoogleSheets(bidData).then(() => {
        console.log('✅ Bid successfully saved to Google Sheets')
        // Refresh data from backend after a short delay
        setTimeout(() => {
          fetchBidData()
        }, 1000) // Reduced delay from 2s to 1s
      }).catch(error => {
        console.error('⚠️ Error saving to Google Sheets (but UI already updated):', error)
        // Don't show error to user since UI is already updated optimistically
        // In a production app, you might want to implement retry logic here
      })
      
    } catch (error) {
      // Reset optimistic updates if there's an immediate error
      setIsSubmittingBid(false)
      console.error('Error in bid submission:', error)
      alert('There was an error processing your bid. Please try again or contact us directly.')
    }
  }

  // Function to create WhatsApp links with pre-filled messages
  const createWhatsAppLink = (message: string, phoneNumber: string = '14256989990') => {
    const encodedMessage = encodeURIComponent(message)
    return `https://wa.me/${phoneNumber}?text=${encodedMessage}`
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
    const NavButton = ({ view, children }: { view: 'home' | 'about' | 'contact' | 'bidding' | 'cakes', children: React.ReactNode }) => {
      const button = (
        <button
          onClick={() => setCurrentView(view)}
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
        <NavButton view="bidding"><span className="burning-diya">🪔</span>Art Auction</NavButton>
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
            {/* Urgent Diwali Auction Banner - Top Priority */}
            <div className="relative overflow-hidden bg-gradient-to-r from-orange-50 via-amber-50 to-red-50 border border-amber-200 rounded-2xl p-8 mb-8 shadow-xl -mx-6 mx-6">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-100/30 via-amber-100/30 to-red-100/30"></div>
              <div className="relative text-center">
                <div className="mb-6">
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <span className="animate-pulse text-red-600">🔥</span>
                    <span className="inline-block px-4 py-2 bg-amber-100 text-amber-800 text-sm font-medium rounded-full">
                      LIVE CHARITY AUCTION
                    </span>
                    <span className="animate-pulse text-red-600">🔥</span>
                  </div>
                  <h2 className="font-display text-3xl md:text-4xl font-light text-amber-900 mb-2">
                    🪔 Divine Ganeshji Collection 🪔
                  </h2>
                  <p className="text-lg text-amber-700 font-serif italic">
                    Handcrafted resin masterpiece for Diwali celebration
                  </p>
                </div>
                
                <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-6">
                  <div className="bg-white/90 backdrop-blur-sm px-6 py-3 rounded-full border border-amber-200 shadow-lg">
                    <span className="text-sm text-amber-700 uppercase tracking-wide">Current Highest Bid: </span>
                    {isLoadingBidData && !hasRealBidData ? (
                      <span className="font-display text-lg font-medium text-amber-600 animate-pulse">Loading...</span>
                    ) : (
                      <span className="font-display text-2xl font-bold text-amber-800">${currentBid}</span>
                    )}
                  </div>
                  <div className="bg-green-50/90 backdrop-blur-sm px-6 py-3 rounded-full border border-green-200 shadow-lg">
                    <span className="text-sm text-green-700">💚 100% Benefits </span>
                    <span className="font-semibold text-green-800">UTSAV USA</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-center gap-4 mb-6">
                  <p className="text-amber-700 text-sm font-medium">
                    ⏰ Auction Ends: October 17, 2025
                  </p>
                </div>
                
                <Button 
                  onClick={() => setCurrentView('bidding')}
                  className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-semibold px-12 py-4 text-lg rounded-full shadow-xl transform hover:scale-105 transition-all duration-200 animate-pulse hover:animate-none"
                >
                  <span className="mr-2">🪔</span>
                  See Details
                  <span className="ml-2">🪔</span>
                </Button>
              </div>
            </div>

            {/* Elegant Hero Section */}
            <div className="relative overflow-hidden bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800 -mx-6 px-6 py-16 mb-16">
              <div className="absolute inset-0 opacity-40">
                <div className="w-full h-full" style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23f1f5f9' fill-opacity='0.3'%3E%3Ccircle cx='7' cy='7' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                  backgroundSize: '60px 60px'
                }}></div>
              </div>
              <div className="relative text-center max-w-5xl mx-auto">
                <div className="mb-8">
                  <span className="inline-block px-4 py-2 bg-amber-100 text-amber-800 text-sm font-medium rounded-full mb-6">
                    Fine Contemporary Resin Art
                  </span>
                </div>
                <h1 className="font-display text-5xl md:text-7xl font-light text-foreground mb-6 tracking-tight">
                  Art Studio
                  <span className="block font-medium text-accent">by Akash</span>
                </h1>
                <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
                  Exquisite resin, plaster, and acrylic artworks meticulously handcrafted in our Bothell atelier
                </p>
                <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-8">
                  <p className="text-lg text-slate-600 italic font-serif">
                    "Where liquid becomes eternal beauty"
                  </p>
                  <div className="hidden md:block w-px h-8 bg-slate-300"></div>
                  <p className="text-sm text-slate-500 uppercase tracking-wider">
                    Est. Pacific Northwest
                  </p>
                </div>
                <div className="flex flex-wrap justify-center gap-4">
                  <Button 
                    onClick={() => setCurrentView('about')}
                    className="bg-slate-900 hover:bg-slate-700 text-white px-8 py-3 rounded-full text-sm uppercase tracking-wide"
                  >
                    Discover the Artist
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => setCurrentView('contact')}
                    className="border-slate-300 text-slate-700 hover:bg-slate-50 px-8 py-3 rounded-full text-sm uppercase tracking-wide"
                  >
                    Commission Art
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => window.open(createWhatsAppLink(
                      "Hello! I discovered your beautiful art studio and I'm interested in your resin art collection. Could we chat about your available pieces and custom work? 🎨✨"
                    ), '_blank')}
                    className="border-green-300 text-green-700 hover:bg-green-50 px-8 py-3 rounded-full text-sm uppercase tracking-wide flex items-center gap-2"
                  >
                    <WhatsappLogo size={16} />
                    Quick Chat
                  </Button>
                </div>
              </div>
            </div>

            {/* Artisan Philosophy Section */}
            <div className="grid md:grid-cols-2 gap-16 mb-20">
              <div className="space-y-6">
                <h2 className="font-display text-3xl md:text-4xl font-light text-foreground">
                  The Art of <span className="font-medium text-accent">Transformation</span>
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Each piece begins as liquid potential—resin flowing into forms that capture light, emotion, and eternal beauty. 
                  Through meticulous layering and patient curing, we transform the ephemeral into the permanent.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-2 h-2 bg-accent rounded-full mt-3 flex-shrink-0"></div>
                    <div>
                      <h4 className="font-medium text-foreground mb-1">Premium Materials</h4>
                      <p className="text-muted-foreground">Museum-quality epoxy resins and archival pigments</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-2 h-2 bg-accent rounded-full mt-3 flex-shrink-0"></div>
                    <div>
                      <h4 className="font-medium text-foreground mb-1">Meticulous Process</h4>
                      <p className="text-muted-foreground">Each layer carefully applied and cured for optimal clarity</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-2 h-2 bg-accent rounded-full mt-3 flex-shrink-0"></div>
                    <div>
                      <h4 className="font-medium text-foreground mb-1">Timeless Design</h4>
                      <p className="text-muted-foreground">Contemporary aesthetics with enduring appeal</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative">
                {/* Main Featured Artwork Display */}
                <div className="aspect-square bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl overflow-hidden shadow-2xl group">
                  <ProtectedImage 
                    src={featuredArtworks[currentFeaturedIndex].image}
                    alt={featuredArtworks[currentFeaturedIndex].title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    showWatermark={false}
                    onError={(e) => {
                      e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'%3E%3Cg fill='%23f1f5f9'%3E%3Crect width='400' height='400' fill='%23f8fafc'/%3E%3Cpath d='M200 150c-27.6 0-50 22.4-50 50s22.4 50 50 50 50-22.4 50-50-22.4-50-50-50zm0 75c-13.8 0-25-11.2-25-25s11.2-25 25-25 25 11.2 25 25-11.2 25-25 25z'/%3E%3Cpath d='M350 100H50c-13.8 0-25 11.2-25 25v150c0 13.8 11.2 25 25 25h300c13.8 0 25-11.2 25-25V125c0-13.8-11.2-25-25-25zm0 175H50V125h300v150z'/%3E%3C/g%3E%3C/svg%3E"
                    }}
                  />
                  {/* Artwork Info Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-6 left-6 right-6 text-white">
                      <h4 className="font-display text-xl font-medium mb-1">
                        {featuredArtworks[currentFeaturedIndex].title}
                      </h4>
                      <p className="text-sm opacity-90">
                        {featuredArtworks[currentFeaturedIndex].description}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Artwork Navigation Dots */}
                <div className="flex justify-center gap-2 mt-6">
                  {featuredArtworks.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentFeaturedIndex(index)}
                      className={`w-2 h-2 rounded-full transition-all duration-200 ${
                        index === currentFeaturedIndex 
                          ? 'bg-accent w-8' 
                          : 'bg-slate-300 hover:bg-slate-400'
                      }`}
                      aria-label={`View artwork ${index + 1}`}
                    />
                  ))}
                </div>

                {/* Decorative Elements */}
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-accent/10 rounded-full blur-xl"></div>
                <div className="absolute -top-4 -left-4 w-32 h-32 bg-slate-200/50 rounded-full blur-2xl"></div>
              </div>
            </div>

            {/* Featured Portfolio Gallery */}
            <div className="mb-20">
              <div className="text-center mb-12">
                <h2 className="font-display text-3xl md:text-4xl font-light text-foreground mb-4">
                  Recent <span className="font-medium text-accent">Masterpieces</span>
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Each piece represents hours of meticulous craftsmanship, where liquid resin transforms into eternal art
                </p>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {featuredArtworks.slice(0, 8).map((artwork, index) => (
                  <div 
                    key={index} 
                    className="group relative aspect-square rounded-xl overflow-hidden bg-slate-100 hover:shadow-xl transition-all duration-300 cursor-pointer"
                    onClick={() => setCurrentFeaturedIndex(index)}
                  >
                    <img 
                      src={artwork.image}
                      alt={artwork.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      onError={(e) => {
                        e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300' viewBox='0 0 300 300'%3E%3Cg fill='%23e2e8f0'%3E%3Crect width='300' height='300' fill='%23f1f5f9'/%3E%3Cpath d='M150 100c-20 0-36 16-36 36s16 36 36 36 36-16 36-36-16-36-36-36zm0 54c-10 0-18-8-18-18s8-18 18-18 18 8 18 18-8 18-18 18z'/%3E%3Cpath d='M250 80H50c-10 0-18 8-18 18v104c0 10 8 18 18 18h200c10 0 18-8 18-18V98c0-10-8-18-18-18zm0 122H50V98h200v104z'/%3E%3C/g%3E%3C/svg%3E"
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-3 left-3 right-3 text-white">
                        <p className="font-medium text-sm truncate">{artwork.title}</p>
                        <p className="text-xs opacity-80 truncate">{artwork.description}</p>
                      </div>
                    </div>
                    {/* Selection indicator */}
                    {index === currentFeaturedIndex && (
                      <div className="absolute top-2 right-2 w-6 h-6 bg-accent rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              
              <div className="text-center mt-8">
                <Button 
                  variant="outline"
                  onClick={() => setCurrentView('contact')}
                  className="border-accent text-accent hover:bg-accent hover:text-accent-foreground px-8 py-3"
                >
                  View Full Portfolio & Commission Art
                </Button>
              </div>
            </div>

            {/* Elegant Studio Showcase */}
            <div className="grid md:grid-cols-3 gap-8 mb-20">
              {/* Artist Spotlight */}
              <div className="group relative bg-gradient-to-br from-slate-50 to-white rounded-2xl p-8 border border-slate-100 hover:shadow-xl transition-all duration-300">
                <div className="absolute top-4 right-4 w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                  <div className="text-accent text-xl">👨‍🎨</div>
                </div>
                <h3 className="font-display text-2xl font-light text-foreground mb-4">The Artisan</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Akash brings years of dedication to the craft of resin art, creating bespoke pieces 
                  that blend traditional techniques with contemporary vision.
                </p>
                <Button 
                  variant="ghost" 
                  onClick={() => setCurrentView('about')}
                  className="text-accent hover:bg-accent/10 font-medium p-0 h-auto group-hover:translate-x-2 transition-transform duration-200"
                >
                  Discover the Journey →
                </Button>
              </div>
              
              {/* Studio Process */}
              <div className="group relative bg-gradient-to-br from-slate-50 to-white rounded-2xl p-8 border border-slate-100 hover:shadow-xl transition-all duration-300">
                <div className="absolute top-4 right-4 w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                  <div className="text-accent text-xl">⚗️</div>
                </div>
                <h3 className="font-display text-2xl font-light text-foreground mb-4">The Process</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Each artwork undergoes a meticulous multi-stage process, from initial concept sketches 
                  to final curing—ensuring exceptional quality and longevity.
                </p>
                <Button 
                  variant="ghost" 
                  onClick={() => setCurrentView('contact')}
                  className="text-accent hover:bg-accent/10 font-medium p-0 h-auto group-hover:translate-x-2 transition-transform duration-200"
                >
                  Commission Process →
                </Button>
              </div>
              
              {/* Custom Commissions */}
              <div className="group relative bg-gradient-to-br from-accent/5 to-accent/10 rounded-2xl p-8 border border-accent/20 hover:shadow-xl transition-all duration-300">
                <div className="absolute top-4 right-4 w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center">
                  <div className="text-accent text-xl">✨</div>
                </div>
                <h3 className="font-display text-2xl font-light text-foreground mb-4">Bespoke Art</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Transform your vision into tangible beauty. We collaborate closely with clients 
                  to create one-of-a-kind pieces tailored to your space and aesthetic.
                </p>
                <Button 
                  onClick={() => setCurrentView('contact')}
                  className="bg-accent text-accent-foreground hover:bg-accent/90 font-medium group-hover:scale-105 transition-transform duration-200"
                >
                  Start Your Commission
                </Button>
              </div>
            </div>

            {/* Testimonial Section */}
            <div className="relative bg-slate-50 rounded-2xl p-12 mb-16 overflow-hidden">
              <div className="absolute top-6 left-6 text-6xl text-slate-200 font-serif">"</div>
              <div className="relative max-w-3xl mx-auto text-center">
                <p className="text-xl text-slate-700 font-light italic mb-6 leading-relaxed">
                  The resin artwork we commissioned exceeded every expectation. The way light plays through 
                  the layers creates an almost magical effect that transforms our entire living space.
                </p>
                <div className="flex items-center justify-center gap-4">
                  <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center">
                    <span className="text-accent font-medium">S.P.</span>
                  </div>
                  <div className="text-left">
                    <p className="font-medium text-slate-800">Satisfied Client</p>
                    <p className="text-sm text-slate-500">Bellevue, WA</p>
                  </div>
                </div>
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
                Akash is a contemporary resin, plaster, and acrylic artist based in Seattle, Washington, who has expanded her creative passion into a full-service family business. Her artistic journey began in childhood, where a love for color and creativity has blossomed into a comprehensive studio offering custom art, organic baking, and memorable family celebrations.
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
                
                {/* Organic Cakes Service */}
                <div className="bg-gradient-to-r from-pink-50 to-rose-50 p-4 rounded-lg border border-pink-200">
                  <h4 className="font-display text-lg font-bold text-pink-800 mb-2 flex items-center gap-2">
                    🧁 Organic Cakes
                  </h4>
                  <p className="font-body text-pink-800 text-sm leading-relaxed">
                    Handcrafted organic, whole wheat, eggless cakes with custom designs. Perfect for celebrations.
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
                For Akash, creativity flows through every aspect of her work—from the fluid elegance of resin art to the delicate craft of organic baking. She masterfully blends artistic vision with family-centered service, creating beautiful experiences that bring people together through art, food, and celebration.
              </p>
              <p className="font-body text-foreground leading-relaxed mb-6">
                Through Art Studio by Akash, she has built a comprehensive creative business that serves families across the Pacific Northwest. Whether crafting a custom resin masterpiece, designing an organic birthday cake, or organizing an engaging kids art party, every service reflects her commitment to quality, creativity, and making life's special moments truly memorable.
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

        {currentView === 'bidding' && (
          <div className="animate-fade-in max-w-4xl mx-auto">
            {/* Family-Friendly Charity Disclaimer */}
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mb-6">
              <p className="text-blue-800 text-sm font-medium">
                ✨ <strong>Family-Friendly Charity Art Auction</strong> ✨<br/>
                This is a legitimate charitable fundraiser for cultural organizations. 
                All proceeds support community programs. Open to all ages and families.
              </p>
            </div>
            
            {/* Diwali Header */}
            <div className="text-center mb-8">
              <h2 className="font-display text-4xl font-bold text-foreground mb-4">
                🪔 Diwali Charity Art Auction 🪔
              </h2>
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg border border-green-200 mb-4">
                <p className="text-green-800 font-semibold text-lg">🎁 100% Proceeds → UTSAV USA Nonprofit 🎁</p>
                <p className="text-green-700 text-sm mt-1">Supporting cultural education and community programs</p>
              </div>
            </div>
            
            {/* Bidding Item */}
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
                
                {/* Bidding Details */}
                <div className="md:w-1/2 p-6">
                  <div className="mb-6">
                    <h3 className="font-display text-2xl font-bold text-foreground mb-3">
                      🕉️ Divine Ganeshji Resin Art 🕉️
                    </h3>
                    <p className="font-body text-foreground leading-relaxed mb-4">
                      Handcrafted resin art perfect for Diwali celebrations. Brings blessings and prosperity to your home.
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="text-xs bg-amber-100 text-amber-800 px-3 py-1 rounded-full">#DiwaliSpecial</span>
                      <span className="text-xs bg-green-100 text-green-800 px-3 py-1 rounded-full">#CharityAuction</span>
                      <span className="text-xs bg-amber-100 text-amber-800 px-3 py-1 rounded-full">#HandmadeArt</span>
                    </div>
                  </div>
                  
                  {/* Bidding Info */}
                  <div className="space-y-3 mb-6">
                    <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-4 rounded-lg border border-amber-200">
                      <div className="text-center">
                        <div className="flex items-center justify-center gap-2 mb-1">
                          <span className="text-sm text-amber-700">
                            {hasRealBidData ? 'Current Highest Bid' : 'Artist Set Price (Starting Bid)'}
                          </span>
                          <button 
                            onClick={fetchBidData}
                            disabled={isLoadingBidData}
                            className="text-amber-600 hover:text-amber-800 disabled:opacity-50"
                            title="Refresh bid data"
                          >
                            {isLoadingBidData ? '⟳' : '↻'}
                          </button>
                        </div>
                        <div className="font-display text-3xl font-bold text-amber-600">
                          {isLoadingBidData ? '...' : `$${currentBid}`}
                        </div>
                        <span className="text-xs text-amber-600">
                          {isLoadingBidData 
                            ? 'Loading auction data...' 
                            : hasRealBidData 
                              ? `${bidCount} total bids • Ends Oct 17`
                              : 'Loading live auction • Ends Oct 17'
                          }
                        </span>
                        {/* Debug info - remove in production */}
                        <div className="text-xs text-gray-500 mt-1 opacity-75">
                          Debug: ${currentBid} | {hasRealBidData ? 'Live Auction Data' : 'Artist Set Price'} | {new Date().toLocaleTimeString()}
                        </div>
                      </div>
                    </div>
                    <div className="bg-green-50 p-3 rounded-lg border border-green-200 text-center">
                      <span className="text-sm text-green-700">Benefiting </span>
                      <a 
                        href="https://utsavusa.org" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-green-600 hover:text-green-800 font-semibold underline"
                      >
                        UTSAV USA
                      </a>
                    </div>
                  </div>
                  
                  {/* Bidding Actions */}
                  <div className="space-y-3">
                    {!showBidForm ? (
                      <>
                        {/* Quick Bid Buttons */}
                        <div className="space-y-3">
                          <div className="text-center">
                            <p className="text-sm font-medium text-gray-700 mb-2">
                              Quick Bid - Tap to add to {hasRealBidData ? 'current highest bid' : 'artist set price'} of ${currentBid}
                            </p>
                            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                              {[50, 100, 250, 500, 1000].map((increment) => {
                                const bidValue = currentBid + increment
                                const isSelected = bidAmount === bidValue.toString()
                                return (
                                  <Button
                                    key={increment}
                                    onClick={() => setBidAmount(bidValue.toString())}
                                    variant="outline"
                                    disabled={isSubmittingBid}
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
                          
                          {/* Custom Bid Input */}
                          <div className="space-y-2">
                            <p className="text-sm text-gray-600 text-center">Or enter custom amount:</p>
                            <div className="flex gap-2">
                              <input 
                                type="number" 
                                placeholder={`Min: $${currentBid + 50}`}
                                value={bidAmount}
                                onChange={(e) => setBidAmount(e.target.value)}
                                disabled={isSubmittingBid}
                                className="flex-1 px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-accent text-center font-semibold disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-100"
                                min={currentBid + 50}
                                onFocus={() => {
                                  // Clear the field when user starts typing custom amount
                                  if (bidAmount && [50, 100, 250, 500, 1000].some(inc => bidAmount === (currentBid + inc).toString())) {
                                    setBidAmount('')
                                  }
                                }}
                              />
                              <Button 
                                onClick={handleBidSubmit}
                                disabled={!bidAmount || parseInt(bidAmount) <= currentBid + 49 || isSubmittingBid}
                                className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                {isSubmittingBid ? (
                                  <span className="flex items-center gap-2">
                                    <span className="animate-spin">⏳</span>
                                    Processing...
                                  </span>
                                ) : (
                                  "🪔 Place Bid 🪔"
                                )}
                              </Button>
                            </div>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <p className="text-xs text-amber-700 bg-amber-50 px-3 py-2 rounded border border-amber-200 text-center">
                            ✨ Minimum bid increment: $50 (Next charitable bid: ${currentBid + 50}) ✨
                          </p>
                          {!hasRealBidData && (
                            <p className="text-xs text-blue-600 bg-blue-50 px-3 py-2 rounded border border-blue-200 text-center">
                              🎨 Artist's set price: $200 • ⚡ Loading live auction with 5000+ participants...
                            </p>
                          )}
                          {hasRealBidData && bidCount > 100 && (
                            <p className="text-xs text-red-600 bg-red-50 px-3 py-2 rounded border border-red-200 text-center">
                              🔥 High competition! {bidCount} bids received • Auction heating up! 🔥
                            </p>
                          )}
                        </div>
                      </>
                    ) : (
                      <>
                        {/* Bidder Information Form */}
                        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-200">
                          <h4 className="font-semibold text-blue-800 mb-3 flex items-center gap-2">
                            📝 Bidder Information Required
                          </h4>
                          <p className="text-sm text-blue-700 mb-4">
                            Your bid of <strong>${bidAmount}</strong> requires contact information. 
                            You'll be notified if you win and can pay via cheque or at our venue.
                          </p>
                          
                          <div className="space-y-3">
                            <div>
                              <label className="block text-sm font-medium text-blue-800 mb-1">
                                Full Name *
                              </label>
                              <input 
                                type="text" 
                                placeholder="Enter your full name"
                                value={bidderInfo.fullName}
                                onChange={(e) => setBidderInfo({...bidderInfo, fullName: e.target.value})}
                                disabled={isSubmittingBid}
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
                                value={bidderInfo.email}
                                onChange={(e) => setBidderInfo({...bidderInfo, email: e.target.value})}
                                disabled={isSubmittingBid}
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
                                value={bidderInfo.phone}
                                onChange={(e) => setBidderInfo({...bidderInfo, phone: e.target.value})}
                                disabled={isSubmittingBid}
                                className="w-full px-3 py-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-100"
                                required
                              />
                            </div>
                          </div>
                          
                          <div className="flex gap-2 mt-4">
                            <Button 
                              onClick={submitBid}
                              disabled={isSubmittingBid}
                              className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              {isSubmittingBid ? (
                                <span className="flex items-center gap-2">
                                  <span className="animate-spin">⏳</span>
                                  Submitting Bid...
                                </span>
                              ) : (
                                `✅ Confirm Bid - $${bidAmount}`
                              )}
                            </Button>
                            <Button 
                              variant="outline"
                              onClick={() => {
                                setShowBidForm(false)
                                setBidderInfo({ fullName: '', email: '', phone: '' })
                              }}
                              disabled={isSubmittingBid}
                              className="border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              Cancel
                            </Button>
                          </div>
                          
                          <div className="mt-3 p-2 bg-blue-100 rounded text-xs text-blue-700">
                            <p><strong>📞 Notification Process:</strong></p>
                            <p>• We'll contact you if you win the auction</p>
                            <p>• Payment options: Venue pickup or cheque</p>
                            <p>• All proceeds support UTSAV USA charity</p>
                          </div>
                        </div>
                      </>
                    )}
                    
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        className="flex-1 border-green-300 text-green-700 hover:bg-green-50"
                        onClick={() => window.open(createWhatsAppLink(
                          "Hi! I've a question on the auction of this art! 🪔✨"
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
                        See Entire Collection
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
            
            {/* Artist Pricing & Auction Info */}
            <div className="mt-8 space-y-4">
              
              <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg p-6 border border-amber-200">
                <h4 className="font-display text-lg font-bold text-amber-800 mb-3 flex items-center gap-2">
                  🎊 Diwali Charity Auction Terms 🎊
                </h4>
              <ul className="space-y-2 text-sm text-amber-700">
                <li>� Bidders must provide full name, email, and phone number</li>
                <li>📞 Winners will be notified via email and phone within 24 hours</li>
                <li>�💳 Payment options: Venue pickup or cheque payment</li>
                <li>⏰ Payment due within 48 hours of auction end notification</li>
                <li>💚 100% of net proceeds donated to UTSAV USA - Gift of Giving</li>
                <li>🏠 Local pickup available in Bothell, WA</li>
                <li>💌 Contact us for Diwali gifting options and custom messages</li>
                <li>🎁 Perfect as a Diwali gift - comes with blessing card and charity certificate</li>
              </ul>
              <div className="mt-4 p-3 bg-green-100 rounded border border-green-300">
                <p className="text-xs text-green-800 text-center font-medium">
                  💚 "Your bid spreads light twice - in your home and in someone's life through UTSAV USA" 💚
                </p>
              </div>
              <div className="mt-2 p-3 bg-amber-100 rounded border border-amber-300">
                <p className="text-xs text-amber-800 text-center font-medium">
                  🕉️ "May this divine artwork bring light, joy, and prosperity to your Diwali celebrations" 🕉️
                </p>
              </div>
            </div>
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
              Licensed Family-Friendly Art Studio & Organic Bakery<br/>
              Custom Artwork • Organic Cakes • Kids Art Events • Party Planning
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