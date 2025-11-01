import React, { useState, useEffect } from 'react'
import { List, InstagramLogo, WhatsappLogo } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import CakesEvents from '@/components/CakesEvents'

// Import images from assets
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

// Add CSS protection for all artwork images
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
    const validViews = ['home', 'about', 'gallery', 'contact', 'cakes']
    return validViews.includes(hash as any) ? hash as 'home' | 'about' | 'gallery' | 'contact' | 'cakes' : 'home'
  }
  
  const [currentView, setCurrentView] = useState<'home' | 'about' | 'gallery' | 'contact' | 'cakes'>(getInitialView())
  
  // Function to navigate and update URL
  const navigateTo = (view: 'home' | 'about' | 'gallery' | 'contact' | 'cakes') => {
    setCurrentView(view)
    window.location.hash = view === 'home' ? '' : view
  }
  
  const [currentFeaturedIndex, setCurrentFeaturedIndex] = useState(0)

  // Add keyboard protection for image saving on all artwork pages
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Disable common image saving shortcuts when viewing artwork (about, home, gallery pages)
      if (currentView === 'about' || currentView === 'home' || currentView === 'gallery' || currentView === 'cakes') {
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
      const validViews = ['home', 'about', 'gallery', 'contact', 'cakes']
      if (validViews.includes(hash as any)) {
        setCurrentView(hash as 'home' | 'about' | 'gallery' | 'contact' | 'cakes')
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

  // Function to create WhatsApp links with protected phone numbers
  const createWhatsAppLink = (message: string) => {
    const encodedMessage = encodeURIComponent(message)
    // Use base64 encoded number that gets decoded only when clicked
    const phone = atob('MTQyNTY5ODk5OTA=') 
    return `https://wa.me/${phone}?text=${encodedMessage}`
  }

  const NavMenu = ({ mobile = false }) => {
    const NavButton = ({ view, children }: { view: 'home' | 'about' | 'gallery' | 'contact' | 'cakes', children: React.ReactNode }) => {
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
            <div className="relative overflow-hidden bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800 -mx-6 px-6 py-6 mb-6">
              <div className="relative text-center max-w-3xl mx-auto">
                <span className="inline-block px-3 py-1 bg-amber-100 text-amber-800 text-xs font-medium rounded-full mb-3">
                  Fine Contemporary Resin Art
                </span>
                <h1 className="font-display text-3xl md:text-5xl font-light text-foreground mb-3 tracking-tight">
                  Art Studio <span className="font-medium text-accent">by Akash</span>
                </h1>
                <p className="text-base md:text-lg text-muted-foreground mb-4 max-w-xl mx-auto">
                  Handcrafted resin artworks from our Bothell studio
                </p>
                <Button 
                  onClick={() => navigateTo('about')}
                  size="sm"
                  className="bg-slate-900 hover:bg-slate-700 text-white px-4 py-2 rounded-full text-xs"
                >
                  Meet the Artist
                </Button>
              </div>
            </div>

            {/* Main Content Grid - Better Real Estate Usage */}
            <div className="grid md:grid-cols-5 gap-8 mb-12">
              {/* Featured Artwork - Takes 2/5 width */}
              <div className="md:col-span-2">
                <h2 className="font-display text-xl md:text-2xl font-light text-foreground mb-5">
                  Featured <span className="font-medium text-accent">Masterpiece</span>
                </h2>
                <div className="relative">
                  <div className="aspect-square bg-gradient-to-br from-slate-100 to-slate-200 rounded-xl overflow-hidden shadow-xl group">
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

              {/* Sidebar Content - 3/5 width */}
              <div className="md:col-span-3 space-y-6">
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

            {/* Business Info & Location */}
            <div className="text-center bg-gradient-to-r from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-900/50 rounded-2xl p-8 border border-slate-200 dark:border-slate-700 mb-12">
              <h3 className="font-display text-2xl font-semibold text-foreground mb-4">Visit Our Studio</h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Located in beautiful Bothell, Washington. Experience our artwork in person and discuss your custom commissions in our dedicated studio space.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={() => window.open('https://maps.app.goo.gl/nMEHnRpEAxZo5j6b7', '_blank')}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-medium transition-all duration-200 hover:shadow-md transform hover:-translate-y-0.5"
                >
                  <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M12 2C13.1 2 14 2.9 14 4V5H16C17.1 5 18 5.9 18 7V19C18 20.1 17.1 21 16 21H8C6.9 21 6 20.1 6 19V7C6 5.9 6.9 5 8 5H10V4C10 2.9 10.9 2 12 2M12 4V5H12V4M8 7V19H16V7H8M10 9H14V11H10V9M10 12H14V14H10V12M10 15H11V17H10V15Z" />
                  </svg>
                  See Reviews
                </Button>
                
                <Button 
                  onClick={() => navigateTo('contact')}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-medium transition-all duration-200 hover:shadow-md transform hover:-translate-y-0.5"
                >
                  Schedule Visit
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
                    "Hello! I'm interested in your resin art collection! I would love to learn more about your artwork and custom pieces. Could we discuss pricing and availability? 🎨✨"
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
                      <Button
                        onClick={() => window.open('https://maps.app.goo.gl/nMEHnRpEAxZo5j6b7', '_blank')}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 hover:shadow-md transform hover:-translate-y-0.5 mt-2"
                      >
                        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                        </svg>
                        View on Google Maps
                      </Button>
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

            <div className="text-center">
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










