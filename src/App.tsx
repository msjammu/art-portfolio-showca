import { useState, useEffect } from 'react'
import { List, InstagramLogo } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'

// Import images from assets
import ganeshjiPic from './assets/bid1/pic.jpeg'
import dimensionsImage from './assets/bid1/diamentions.jpeg'
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

function App() {
  const [currentView, setCurrentView] = useState<'home' | 'about' | 'contact' | 'bidding'>('home')
  const [currentBid, setCurrentBid] = useState(200) // Artist's set price - starting bid
  const [bidAmount, setBidAmount] = useState('')
  const [bidCount, setBidCount] = useState(0)
  const [selectedMedia, setSelectedMedia] = useState<'main' | 'dimensions' | 'video'>('main')
  const [showBidForm, setShowBidForm] = useState(false)
  const [currentFeaturedIndex, setCurrentFeaturedIndex] = useState(0)
  const [isLoadingBidData, setIsLoadingBidData] = useState(false)
  const [hasRealBidData, setHasRealBidData] = useState(false) // Track if we have real backend data
  const [bidderInfo, setBidderInfo] = useState({
    fullName: '',
    email: '',
    phone: ''
  })

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
                  console.log(`✅ Delayed fetch success - Highest bid: $${data.summary.highestBid}, Total bids: ${data.summary.totalBids}`)
                }
              })
              .catch(err => console.log('Delayed CORS fetch failed:', err))
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
    } finally {
      setIsLoadingBidData(false)
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
    
    try {
      // Save to Google Sheets
      await saveToGoogleSheets(bidData)
      
      // Optimistically update the current bid if this bid is higher
      if (bid > currentBid) {
        setCurrentBid(bid)
        setBidCount(prevCount => prevCount + 1)
        setHasRealBidData(true) // We now have real bid data (the bid we just submitted)
        console.log(`🎯 Optimistically updated current bid to $${bid}`)
      }
      
      // Update UI and refresh data from backend
      setBidAmount('')
      setBidderInfo({ fullName: '', email: '', phone: '' })
      setShowBidForm(false)
      
      // Fetch fresh data from Google Sheets after successful bid
      setTimeout(() => {
        fetchBidData()
      }, 2000) // Wait 2 seconds for the data to be processed in the sheet
      
      alert(`🪔 Diwali Bid placed successfully! 
      
Your generous bid of $${bid} is now the highest bid. 

We have your contact information:
• Name: ${bidderInfo.fullName}
• Email: ${bidderInfo.email}
• Phone: ${bidderInfo.phone}

Your bid has been recorded and you will be notified if you win the auction. If you win, you can purchase the piece at our venue or arrange payment via cheque.

Thank you for supporting UTSAV USA! 🎁`)
    } catch (error) {
      console.error('Error saving bid:', error)
      alert('There was an error saving your bid. Please try again or contact us directly.')
    }
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

  const NavMenu = ({ mobile = false }) => (
    <nav className={`${mobile ? 'flex flex-col space-y-4' : 'hidden md:flex space-x-8'}`}>
      <button
        onClick={() => setCurrentView('home')}
        className={`font-body text-sm transition-colors ${
          currentView === 'home' ? 'text-accent' : 'text-foreground hover:text-accent'
        }`}
      >
        Home
      </button>
      <button
        onClick={() => setCurrentView('about')}
        className={`font-body text-sm transition-colors ${
          currentView === 'about' ? 'text-accent' : 'text-foreground hover:text-accent'
        }`}
      >
        About
      </button>
      <button
        onClick={() => setCurrentView('bidding')}
        className={`font-body text-sm transition-colors ${
          currentView === 'bidding' ? 'text-accent' : 'text-foreground hover:text-accent'
        }`}
      >
        Bidding
      </button>
      <button
        onClick={() => setCurrentView('contact')}
        className={`font-body text-sm transition-colors ${
          currentView === 'contact' ? 'text-accent' : 'text-foreground hover:text-accent'
        }`}
      >
        Contact
      </button>
    </nav>
  )

  return (
    <div className="min-h-screen bg-background font-body">
      {/* Header */}
      <header className="border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img 
              src={businessLogo} 
              alt="Art Studio by Akash Logo" 
              className="h-10 w-10 rounded-full object-cover"
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
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-border">
                  <img 
                    src={businessLogo} 
                    alt="Art Studio by Akash Logo" 
                    className="h-8 w-8 rounded-full object-cover"
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
                <div className="mt-8 pt-8 border-t border-border">
                  <a
                    href="https://www.instagram.com/artstudiobyakash/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-foreground hover:text-accent transition-colors"
                  >
                    <InstagramLogo size={20} />
                    <span className="font-body text-sm">Follow on Instagram</span>
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
                  <img 
                    src={featuredArtworks[currentFeaturedIndex].image}
                    alt={featuredArtworks[currentFeaturedIndex].title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
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

            {/* Elegant Diwali Auction Banner */}
            <div className="relative overflow-hidden bg-gradient-to-r from-orange-50 via-amber-50 to-red-50 border border-amber-200 rounded-2xl p-8 mb-16 shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-100/30 via-amber-100/30 to-red-100/30"></div>
              <div className="relative text-center">
                <div className="mb-6">
                  <span className="inline-block px-4 py-2 bg-amber-100 text-amber-800 text-sm font-medium rounded-full mb-4">
                    Exclusive Charity Auction
                  </span>
                  <h2 className="font-display text-3xl md:text-4xl font-light text-amber-900 mb-2">
                    Divine Ganeshji Collection
                  </h2>
                  <p className="text-lg text-amber-700 font-serif italic">
                    Handcrafted resin masterpiece for Diwali celebration
                  </p>
                </div>
                
                <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-6">
                  <div className="bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full border border-amber-200 shadow-sm">
                    <span className="text-sm text-amber-700 uppercase tracking-wide">Current Bid: </span>
                    <span className="font-display text-2xl font-bold text-amber-800">${currentBid}</span>
                  </div>
                  <div className="bg-green-50/80 backdrop-blur-sm px-6 py-3 rounded-full border border-green-200 shadow-sm">
                    <span className="text-sm text-green-700">💚 All proceeds benefit </span>
                    <span className="font-semibold text-green-800">UTSAV USA</span>
                  </div>
                </div>
                
                <p className="text-amber-700 text-sm mb-6 font-medium">
                  🕉️ Auction closes October 17, 2025 • Starting $200 • $50 increments
                </p>
                
                <Button 
                  onClick={() => setCurrentView('bidding')}
                  className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-semibold px-10 py-4 text-lg rounded-full shadow-lg transform hover:scale-105 transition-all duration-200"
                >
                  <span className="mr-2">🪔</span>
                  Place Charitable Bid
                  <span className="ml-2">🪔</span>
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
                  Akashwinder brings years of dedication to the craft of resin art, creating bespoke pieces 
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
            
            {/* Artist Photo */}
            <div className="flex flex-col md:flex-row gap-8 mb-8">
              <div className="md:w-1/3">
                <img 
                  src={artistPic} 
                  alt="Akashwinder - Artist" 
                  className="w-full max-w-sm mx-auto rounded-lg shadow-lg object-cover"
                  onError={(e) => {
                    e.currentTarget.src = "https://via.placeholder.com/300x400/e2e8f0/64748b?text=Artist+Photo"
                  }}
                />
                <p className="text-center text-sm text-muted-foreground mt-3 italic">
                  Akashwinder in her Bothell, WA studio
                </p>
              </div>
              
              <div className="md:w-2/3">
            <div className="prose prose-gray max-w-none">
              <p className="font-body text-foreground text-lg leading-relaxed mb-6">
                Akashwinder is a contemporary resin, plaster, and acrylic artist based in Seattle, Washington. 
                Her artistic journey began in childhood, where a love for color and creativity blossomed into 
                a lifelong pursuit of artistic expression.
              </p>
              
              {/* Custom Handmade Highlight */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-200 mb-6">
                <h3 className="font-display text-xl font-bold text-blue-800 mb-3 flex items-center gap-2">
                  🎨 Custom Handmade Artworks
                </h3>
                <p className="font-body text-blue-800 leading-relaxed">
                  <strong>Every piece is completely custom and handmade in Bothell, WA.</strong> From initial concept to final creation, 
                  each artwork is meticulously crafted by hand in our Pacific Northwest studio. No mass production, no shortcuts—
                  just pure artisanal dedication to creating one-of-a-kind pieces that reflect your vision and space.
                </p>
              </div>
              
              <p className="font-body text-foreground leading-relaxed mb-6">
                For Akashwinder, art is both nature and a dream—a reflection of balance, imagination, and emotion. 
                She masterfully blends the fluid elegance of resin, the earthy texture of plaster, and the expressive 
                depth of acrylics to create artworks that evoke harmony and sophistication.
              </p>
              <p className="font-body text-foreground leading-relaxed mb-6">
                Through her studio, Art Studio by Akash, she transforms ideas into bespoke creations that merge 
                modern design with natural inspiration. Working from her Bothell, WA studio, each piece is handcrafted 
                with precision and passion, bringing timeless beauty and individuality to every space.
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
            {/* Diwali Header */}
            <div className="text-center mb-8">
              <h2 className="font-display text-4xl font-bold text-foreground mb-4">
                🪔 Diwali Charity Auction 🪔
              </h2>
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg border border-green-200 mb-4">
                <p className="text-green-800 font-semibold text-lg">🎁 100% Proceeds → UTSAV USA 🎁</p>
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
                      <img 
                        src={ganeshjiPic} 
                        alt="Ganeshji Resin Art - Main View" 
                        className="w-full h-80 md:h-96 object-cover"
                        onError={(e) => {
                          e.currentTarget.src = "https://via.placeholder.com/400x300/e2e8f0/64748b?text=Ganeshji+Resin+Art"
                        }}
                      />
                    )}
                    {selectedMedia === 'dimensions' && (
                      <img 
                        src={dimensionsImage} 
                        alt="Ganeshji Resin Art - Dimensions" 
                        className="w-full h-80 md:h-96 object-cover"
                        onError={(e) => {
                          e.currentTarget.src = "https://via.placeholder.com/400x300/e2e8f0/64748b?text=Dimensions"
                        }}
                      />
                    )}
                    {selectedMedia === 'video' && (
                      <video 
                        src={videoFile}
                        controls 
                        className="w-full h-80 md:h-96 object-cover"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none'
                        }}
                      >
                        Your browser does not support the video tag.
                      </video>
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
                      <img 
                        src={ganeshjiPic} 
                        alt="Main View" 
                        className="w-full h-full object-cover"
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
                      <img 
                        src={dimensionsImage} 
                        alt="Dimensions" 
                        className="w-full h-full object-cover"
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
                                    className={`h-12 text-sm font-semibold border-2 transition-all duration-200 ${
                                      isSelected 
                                        ? 'border-amber-500 bg-amber-100 text-amber-800 ring-2 ring-amber-300' 
                                        : 'border-amber-300 text-amber-700 hover:bg-amber-100 hover:border-amber-400'
                                    }`}
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
                                className="flex-1 px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-accent text-center font-semibold"
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
                                disabled={!bidAmount || parseInt(bidAmount) <= currentBid + 49}
                                className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                🪔 Place Bid 🪔
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
                                className="w-full px-3 py-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                                className="w-full px-3 py-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                                className="w-full px-3 py-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                              />
                            </div>
                          </div>
                          
                          <div className="flex gap-2 mt-4">
                            <Button 
                              onClick={submitBid}
                              className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold"
                            >
                              ✅ Confirm Bid - ${bidAmount}
                            </Button>
                            <Button 
                              variant="outline"
                              onClick={() => {
                                setShowBidForm(false)
                                setBidderInfo({ fullName: '', email: '', phone: '' })
                              }}
                              className="border-gray-300 text-gray-700 hover:bg-gray-50"
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
                        className="flex-1 border-amber-300 text-amber-700 hover:bg-amber-50"
                        onClick={() => setCurrentView('contact')}
                      >
                        💬 Ask About Diwali Piece
                      </Button>
                      <Button 
                        variant="outline" 
                        className="flex-1 border-amber-300 text-amber-700 hover:bg-amber-50"
                        onClick={() => window.open('https://www.instagram.com/artstudiobyakash/', '_blank')}
                      >
                        <InstagramLogo size={16} className="mr-2" />
                        🎆 See Diwali Collection
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
            
            {/* Artist Pricing & Auction Info */}
            <div className="mt-8 space-y-4">
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4 border border-purple-200">
                <h4 className="font-display text-md font-bold text-purple-800 mb-2 flex items-center gap-2">
                  🎨 Artist Information 🎨
                </h4>
                <div className="text-sm text-purple-700 space-y-1">
                  <p><strong>Original Price:</strong> $200 (Artist's valuation for this unique Ganeshji resin piece)</p>
                  <p><strong>Auction Scale:</strong> Open to 5000+ participants worldwide</p>
                  <p><strong>Auction Format:</strong> Highest bid wins • No reserve price beyond artist's $200 valuation</p>
                </div>
              </div>
              
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

        {currentView === 'contact' && (
          <div className="animate-fade-in max-w-2xl mx-auto">
            <h2 className="font-display text-3xl font-bold text-foreground mb-8">
              Get in Touch
            </h2>
            <div className="bg-card rounded-lg p-8 border border-border">
              <p className="font-body text-foreground mb-6 leading-relaxed">
                I'd love to hear from you. Whether you're interested in purchasing a piece, 
                commissioning custom work, or simply want to discuss art, please don't hesitate to reach out.
              </p>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-body font-medium text-foreground mb-2">Email</h3>
                  <a 
                    href="mailto:artstudiobyakash@gmail.com"
                    className="text-accent hover:text-accent/80 transition-colors"
                  >
                    artstudiobyakash@gmail.com
                  </a>
                </div>
                
                <div>
                  <h3 className="font-body font-medium text-foreground mb-2">Phone</h3>
                  <a 
                    href="tel:4256989990"
                    className="text-accent hover:text-accent/80 transition-colors"
                  >
                    425.698.9990
                  </a>
                </div>
                
                <div>
                  <h3 className="font-body font-medium text-foreground mb-2">Instagram</h3>
                  <a 
                    href="https://www.instagram.com/artstudiobyakash/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent hover:text-accent/80 transition-colors flex items-center gap-2"
                  >
                    <InstagramLogo size={16} />
                    @artstudiobyakash
                  </a>
                </div>
                
                <div>
                  <h3 className="font-body font-medium text-foreground mb-2">Studio Address</h3>
                  <p className="text-muted-foreground mb-2">
                    Bothell, WA
                  </p>
                  <p className="text-sm text-accent font-medium">
                    🎨 All artwork custom handmade on-site
                  </p>
                </div>
                
                <div>
                  <h3 className="font-body font-medium text-foreground mb-2">Studio Hours</h3>
                  <p className="text-muted-foreground">
                    By prior appointment only
                  </p>
                </div>
              </div>
              
              <div className="mt-8">
                <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
                  Schedule a Visit
                </Button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default App