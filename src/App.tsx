import { useState } from 'react'
import { List, InstagramLogo } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'

// Import images from assets
import ganeshjiPic from './assets/bid1/pic.jpeg'
import dimensionsImage from './assets/bid1/diamentions.jpeg'
import videoFile from './assets/bid1/video.mp4'

function App() {
  const [currentView, setCurrentView] = useState<'about' | 'contact' | 'bidding'>('about')
  const [currentBid, setCurrentBid] = useState(150)
  const [bidAmount, setBidAmount] = useState('')
  const [bidCount, setBidCount] = useState(7)
  const [selectedMedia, setSelectedMedia] = useState<'main' | 'dimensions' | 'video'>('main')

  const placeBid = () => {
    const bid = parseInt(bidAmount)
    if (bid && bid > currentBid) {
      setCurrentBid(bid)
      setBidCount(bidCount + 1)
      setBidAmount('')
      // In a real app, this would send the bid to a server
      alert(`Bid placed successfully! Your bid of $${bid} is now the highest bid.`)
    } else {
      alert(`Please enter a bid higher than the current bid of $${currentBid}`)
    }
  }

  const NavMenu = ({ mobile = false }) => (
    <nav className={`${mobile ? 'flex flex-col space-y-4' : 'hidden md:flex space-x-8'}`}>
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
          <h1 className="font-display text-2xl font-bold text-foreground">
            Art Studio by Akash
          </h1>
          
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
        {currentView === 'about' && (
          <div className="animate-fade-in max-w-3xl mx-auto">
            <h2 className="font-display text-3xl font-bold text-foreground mb-8">
              About the Artist
            </h2>
            <div className="prose prose-gray max-w-none">
              <p className="font-body text-foreground text-lg leading-relaxed mb-6">
                Akashwinder is a contemporary resin, plaster, and acrylic artist based in Seattle, Washington. 
                Her artistic journey began in childhood, where a love for color and creativity blossomed into 
                a lifelong pursuit of artistic expression.
              </p>
              <p className="font-body text-foreground leading-relaxed mb-6">
                For Akashwinder, art is both nature and a dream—a reflection of balance, imagination, and emotion. 
                She masterfully blends the fluid elegance of resin, the earthy texture of plaster, and the expressive 
                depth of acrylics to create artworks that evoke harmony and sophistication.
              </p>
              <p className="font-body text-foreground leading-relaxed mb-6">
                Through her studio, Art Studio by Akash, she transforms ideas into bespoke creations that merge 
                modern design with natural inspiration. Each piece is handcrafted with precision and passion, 
                bringing timeless beauty and individuality to every space.
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
        )}

        {currentView === 'bidding' && (
          <div className="animate-fade-in max-w-4xl mx-auto">
            {/* Diwali Header */}
            <div className="text-center mb-8">
              <h2 className="font-display text-4xl font-bold text-foreground mb-4">
                🪔 Diwali Special Auction 🪔
              </h2>
              <p className="text-xl text-amber-600 font-semibold mb-2">
                Festival of Lights Collection
              </p>
              <p className="text-center text-muted-foreground font-body">
                Celebrate Diwali with divine art! This special Ganeshji resin piece brings blessings, prosperity, and the spirit of the festival into your home. 
                Perfect for this auspicious season of light, joy, and new beginnings. ✨
              </p>
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
                      🕉️ Divine Ganeshji Resin Art - Diwali Edition 🕉️
                    </h3>
                    <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-4 rounded-lg border border-amber-200 mb-4">
                      <p className="font-body text-amber-800 leading-relaxed text-center italic">
                        "May this Diwali bring infinite joy, prosperity, and light to your home"
                      </p>
                    </div>
                    <p className="font-body text-foreground leading-relaxed mb-4">
                      🪔 <strong>Perfect for Diwali 2025!</strong> This exquisite handcrafted Ganeshji resin piece embodies the spirit of Diwali - 
                      bringing light, prosperity, and divine blessings to your celebration. Created with devotion and artistic excellence, 
                      each layer represents the layers of joy and abundance that Diwali brings. Lord Ganesha, the remover of obstacles 
                      and harbinger of good fortune, makes this the perfect centerpiece for your festive decorations. ✨
                    </p>
                    <p className="font-body text-foreground leading-relaxed mb-4">
                      🎆 <strong>Diwali Special Features:</strong> Crafted to reflect the warm glow of diyas, this piece captures the essence 
                      of the festival of lights. Place it among your rangoli, near your prayer area, or as the highlight of your Diwali decor. 
                      A meaningful gift for loved ones or a treasured addition to your own celebration.
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="text-xs bg-gradient-to-r from-amber-100 to-orange-100 text-amber-800 px-3 py-1 rounded-full border border-amber-300">#DiwaliSpecial</span>
                      <span className="text-xs bg-gradient-to-r from-amber-100 to-orange-100 text-amber-800 px-3 py-1 rounded-full border border-amber-300">#GaneshjiBlessing</span>
                      <span className="text-xs bg-gradient-to-r from-amber-100 to-orange-100 text-amber-800 px-3 py-1 rounded-full border border-amber-300">#FestivalOfLights</span>
                      <span className="text-xs bg-gradient-to-r from-amber-100 to-orange-100 text-amber-800 px-3 py-1 rounded-full border border-amber-300">#DivineDecor</span>
                      <span className="text-xs bg-gradient-to-r from-amber-100 to-orange-100 text-amber-800 px-3 py-1 rounded-full border border-amber-300">#ArtStudioByAkash</span>
                    </div>
                  </div>
                  
                  {/* Bidding Info */}
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between items-center py-3 border-b border-amber-200">
                      <span className="font-body text-muted-foreground flex items-center gap-2">
                        💰 Current Bid
                      </span>
                      <span className="font-display text-2xl font-bold text-amber-600">${currentBid}</span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-amber-200">
                      <span className="font-body text-muted-foreground flex items-center gap-2">
                        🎯 Starting Bid
                      </span>
                      <span className="font-body text-foreground">$100</span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-amber-200">
                      <span className="font-body text-muted-foreground flex items-center gap-2">
                        ⏰ Diwali Auction Ends
                      </span>
                      <span className="font-body text-foreground font-semibold">Nov 1, 2025 at 11:59 PM</span>
                    </div>
                    <div className="flex justify-between items-center py-3">
                      <span className="font-body text-muted-foreground flex items-center gap-2">
                        🔥 Total Bids
                      </span>
                      <span className="font-body text-foreground">{bidCount} festive bids</span>
                    </div>
                  </div>
                  
                  {/* Bidding Actions */}
                  <div className="space-y-3">
                    <div className="flex gap-2">
                      <input 
                        type="number" 
                        placeholder="Enter bid amount"
                        value={bidAmount}
                        onChange={(e) => setBidAmount(e.target.value)}
                        className="flex-1 px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
                        min={currentBid + 5}
                      />
                      <Button 
                        onClick={placeBid}
                        className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold shadow-lg"
                      >
                        🪔 Place Diwali Bid 🪔
                      </Button>
                    </div>
                    <p className="text-xs text-amber-700 bg-amber-50 px-3 py-2 rounded border border-amber-200">
                      ✨ Minimum bid increment: $5 (Next auspicious bid: ${currentBid + 5}) ✨
                    </p>
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
            
            {/* Diwali Auction Info */}
            <div className="mt-8 bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg p-6 border border-amber-200">
              <h4 className="font-display text-lg font-bold text-amber-800 mb-3 flex items-center gap-2">
                🎊 Diwali Special Auction Terms 🎊
              </h4>
              <ul className="space-y-2 text-sm text-amber-700">
                <li>🪔 All sales are final - bringing prosperity to your home</li>
                <li>💳 Payment due within 48 hours of auction end (before Diwali celebrations!)</li>
                <li>📦 FREE Diwali gift wrapping included with shipping</li>
                <li>🏠 Local pickup available in Seattle, WA with Diwali blessings</li>
                <li>✨ Special Diwali delivery available for the festival week</li>
                <li>💌 Contact us for Diwali gifting options and custom messages</li>
                <li>🎁 Perfect as a Diwali gift - comes with blessing card</li>
              </ul>
              <div className="mt-4 p-3 bg-amber-100 rounded border border-amber-300">
                <p className="text-xs text-amber-800 text-center font-medium">
                  🕉️ "May this divine artwork bring light, joy, and prosperity to your Diwali celebrations" 🕉️
                </p>
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
                  <p className="text-muted-foreground">
                    Bothell, WA
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