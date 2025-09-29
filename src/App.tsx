import { useState } from 'react'
import { X, CaretLeft, CaretRight, List, InstagramLogo } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { useKV } from '@github/spark/hooks'

interface Artwork {
  id: string
  title: string
  medium: string
  dimensions: string
  year: string
  description: string
  imageUrl: string
  price?: string
}

function App() {
  const [artworks] = useKV<Artwork[]>('artworks', [])
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null)
  const [currentView, setCurrentView] = useState<'gallery' | 'about' | 'contact'>('gallery')

  const openArtwork = (artwork: Artwork) => {
    setSelectedArtwork(artwork)
  }

  const closeArtwork = () => {
    setSelectedArtwork(null)
  }

  const navigateArtwork = (direction: 'prev' | 'next') => {
    if (!selectedArtwork || !artworks) return
    
    const currentIndex = artworks.findIndex(art => art.id === selectedArtwork.id)
    let newIndex
    
    if (direction === 'prev') {
      newIndex = currentIndex > 0 ? currentIndex - 1 : artworks.length - 1
    } else {
      newIndex = currentIndex < artworks.length - 1 ? currentIndex + 1 : 0
    }
    
    setSelectedArtwork(artworks[newIndex])
  }

  const NavMenu = ({ mobile = false }) => (
    <nav className={`${mobile ? 'flex flex-col space-y-4' : 'hidden md:flex space-x-8'}`}>
      <button
        onClick={() => setCurrentView('gallery')}
        className={`font-body text-sm transition-colors ${
          currentView === 'gallery' ? 'text-accent' : 'text-foreground hover:text-accent'
        }`}
      >
        Gallery
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
        {currentView === 'gallery' && (
          <div className="animate-fade-in">
            {!artworks || artworks.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-muted-foreground font-body text-lg">
                  Gallery coming soon. Artwork will be displayed here.
                </p>
              </div>
            ) : (
              <div className="masonry-grid">
                {artworks.map((artwork) => (
                  <Card
                    key={artwork.id}
                    className="masonry-item cursor-pointer group hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                    onClick={() => openArtwork(artwork)}
                  >
                    <CardContent className="p-0">
                      <div className="aspect-auto overflow-hidden rounded-t-lg">
                        <img
                          src={artwork.imageUrl}
                          alt={artwork.title}
                          className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-body font-medium text-foreground mb-1">
                          {artwork.title}
                        </h3>
                        <p className="text-muted-foreground text-sm font-body">
                          {artwork.medium} • {artwork.year}
                        </p>
                        {artwork.price && (
                          <p className="text-accent font-body text-sm mt-2">
                            {artwork.price}
                          </p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}

        {currentView === 'about' && (
          <div className="animate-fade-in max-w-3xl mx-auto">
            <h2 className="font-display text-3xl font-bold text-foreground mb-8">
              About the Artist
            </h2>
            <div className="prose prose-gray max-w-none">
              <p className="font-body text-foreground text-lg leading-relaxed mb-6">
                Welcome to my artistic journey. Each piece represents a unique exploration of form, 
                color, and emotion, creating a visual narrative that speaks to the human experience.
              </p>
              <p className="font-body text-foreground leading-relaxed mb-6">
                With over a decade of experience in various mediums, I strive to create works that 
                not only capture the eye but also resonate with the soul. My artistic philosophy 
                centers around the belief that art should be both beautiful and meaningful.
              </p>
              <p className="font-body text-foreground leading-relaxed">
                Whether you're a seasoned collector or someone just beginning to appreciate art, 
                I invite you to explore my gallery and discover pieces that speak to you.
              </p>
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
                    href="mailto:hello@artstudiobyakash.com"
                    className="text-accent hover:text-accent/80 transition-colors"
                  >
                    hello@artstudiobyakash.com
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
                    123 Art District<br />
                    Creative Quarter<br />
                    New York, NY 10001
                  </p>
                </div>
                
                <div>
                  <h3 className="font-body font-medium text-foreground mb-2">Studio Hours</h3>
                  <p className="text-muted-foreground">
                    Tuesday - Saturday: 10AM - 6PM<br />
                    Sunday: 12PM - 5PM<br />
                    Closed Mondays
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

      {/* Artwork Detail Dialog */}
      <Dialog open={!!selectedArtwork} onOpenChange={() => closeArtwork()}>
        <DialogContent className="max-w-7xl w-full h-full max-h-screen p-0 bg-black/95">
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Close button */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 z-50 text-white hover:bg-white/10"
              onClick={closeArtwork}
            >
              <X size={24} />
            </Button>

            {/* Navigation buttons */}
            {artworks && artworks.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-50 text-white hover:bg-white/10"
                  onClick={() => navigateArtwork('prev')}
                >
                  <CaretLeft size={32} />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-50 text-white hover:bg-white/10"
                  onClick={() => navigateArtwork('next')}
                >
                  <CaretRight size={32} />
                </Button>
              </>
            )}

            {selectedArtwork && (
              <div className="flex flex-col lg:flex-row items-center justify-center w-full h-full p-8 gap-8">
                {/* Image */}
                <div className="flex-1 flex items-center justify-center max-h-full">
                  <img
                    src={selectedArtwork.imageUrl}
                    alt={selectedArtwork.title}
                    className="max-w-full max-h-full object-contain animate-scale-in"
                  />
                </div>

                {/* Details */}
                <div className="lg:w-80 text-white space-y-4">
                  <div>
                    <h2 className="font-display text-2xl font-bold mb-2">
                      {selectedArtwork.title}
                    </h2>
                    <p className="text-white/80 font-body">
                      {selectedArtwork.medium}
                    </p>
                    <p className="text-white/80 font-body">
                      {selectedArtwork.dimensions}
                    </p>
                    <p className="text-white/80 font-body">
                      {selectedArtwork.year}
                    </p>
                    {selectedArtwork.price && (
                      <p className="text-accent font-body font-medium mt-2">
                        {selectedArtwork.price}
                      </p>
                    )}
                  </div>
                  
                  {selectedArtwork.description && (
                    <div>
                      <p className="text-white/90 font-body leading-relaxed">
                        {selectedArtwork.description}
                      </p>
                    </div>
                  )}
                  
                  <div className="pt-4">
                    <Button 
                      className="bg-accent hover:bg-accent/90 text-accent-foreground"
                      onClick={() => setCurrentView('contact')}
                    >
                      Inquire About This Piece
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default App