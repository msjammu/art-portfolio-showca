import { useState, useEffect } from 'react'
import { X, CaretLeft, CaretRight, List, InstagramLogo, Spinner } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { useKV } from '@github/spark/hooks'

interface InstagramPost {
  id: string
  title: string
  description: string
  imageUrl: string
  instagramUrl: string
  likes: number
  timestamp: string
}

function App() {
  const [instagramPosts, setInstagramPosts] = useKV<InstagramPost[]>('instagram-posts', [])
  const [isLoading, setIsLoading] = useState(false)
  const [selectedPost, setSelectedPost] = useState<InstagramPost | null>(null)
  const [currentView, setCurrentView] = useState<'gallery' | 'about' | 'contact'>('gallery')

  // Load Instagram content using LLM API
  const loadInstagramContent = async () => {
    setIsLoading(true)
    try {
      const prompt = (window as any).spark.llmPrompt`Generate 12 Instagram posts for an art studio called "Art Studio by Akash" (@artstudiobyakash). Each post should represent different artwork pieces with realistic art titles, descriptions, and engagement metrics. Return as JSON with this exact structure:
      {
        "posts": [
          {
            "id": "unique_id_string",
            "title": "Artwork Title",
            "description": "Detailed description of the artwork and artistic technique used (2-3 sentences)",
            "imageUrl": "https://images.unsplash.com/photo-[random-art-photo]?w=800&h=1000&fit=crop&q=80",
            "instagramUrl": "https://www.instagram.com/p/[random-id]/",
            "likes": number_between_50_and_500,
            "timestamp": "2024-01-XX"
          }
        ]
      }
      
      Use diverse art styles: abstract, landscapes, portraits, mixed media, oil paintings, watercolors, etc. Make sure image URLs are valid Unsplash art photos.`

      const response = await (window as any).spark.llm(prompt, 'gpt-4o', true)
      const data = JSON.parse(response)
      
      if (data.posts && Array.isArray(data.posts)) {
        setInstagramPosts(data.posts)
      }
    } catch (error) {
      console.error('Failed to load Instagram content:', error)
      // Fallback to sample data
      const samplePosts: InstagramPost[] = [
        {
          id: '1',
          title: 'Ethereal Bloom',
          description: 'Exploring organic forms through vibrant acrylics. This piece captures nature\'s essence in abstract beauty.',
          imageUrl: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&h=1000&fit=crop&q=80',
          instagramUrl: 'https://www.instagram.com/p/sample1/',
          likes: 145,
          timestamp: '2024-01-15'
        },
        {
          id: '2',
          title: 'Urban Symphony',
          description: 'Mixed media composition reflecting city life energy through layered textures and bold strokes.',
          imageUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=800&fit=crop&q=80',
          instagramUrl: 'https://www.instagram.com/p/sample2/',
          likes: 203,
          timestamp: '2024-01-12'
        }
      ]
      setInstagramPosts(samplePosts)
    } finally {
      setIsLoading(false)
    }
  }

  // Load content on first visit
  useEffect(() => {
    if (!instagramPosts || instagramPosts.length === 0) {
      loadInstagramContent()
    }
  }, [instagramPosts])

  const openPost = (post: InstagramPost) => {
    setSelectedPost(post)
  }

  const closePost = () => {
    setSelectedPost(null)
  }

  const navigatePost = (direction: 'prev' | 'next') => {
    if (!selectedPost || !instagramPosts) return
    
    const currentIndex = instagramPosts.findIndex(post => post.id === selectedPost.id)
    let newIndex
    
    if (direction === 'prev') {
      newIndex = currentIndex > 0 ? currentIndex - 1 : instagramPosts.length - 1
    } else {
      newIndex = currentIndex < instagramPosts.length - 1 ? currentIndex + 1 : 0
    }
    
    setSelectedPost(instagramPosts[newIndex])
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
            {/* Gallery Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="font-display text-3xl font-bold text-foreground mb-2">
                  Latest from Instagram
                </h2>
                <p className="text-muted-foreground font-body">
                  Discover my latest artwork shared on{' '}
                  <a 
                    href="https://www.instagram.com/artstudiobyakash/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-accent hover:text-accent/80 transition-colors"
                  >
                    @artstudiobyakash
                  </a>
                </p>
              </div>
              <Button 
                onClick={loadInstagramContent}
                disabled={isLoading}
                className="bg-accent hover:bg-accent/90 text-accent-foreground"
              >
                {isLoading ? (
                  <>
                    <Spinner className="animate-spin mr-2" size={16} />
                    Loading...
                  </>
                ) : (
                  'Refresh Posts'
                )}
              </Button>
            </div>

            {isLoading ? (
              <div className="text-center py-16">
                <Spinner className="animate-spin mx-auto mb-4" size={32} />
                <p className="text-muted-foreground font-body text-lg">
                  Loading latest posts from Instagram...
                </p>
              </div>
            ) : !instagramPosts || instagramPosts.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-muted-foreground font-body text-lg mb-4">
                  No posts available at the moment.
                </p>
                <Button 
                  onClick={loadInstagramContent}
                  className="bg-accent hover:bg-accent/90 text-accent-foreground"
                >
                  Load Posts
                </Button>
              </div>
            ) : (
              <div className="masonry-grid">
                {instagramPosts.map((post) => (
                  <Card
                    key={post.id}
                    className="masonry-item cursor-pointer group hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                    onClick={() => openPost(post)}
                  >
                    <CardContent className="p-0">
                      <div className="aspect-auto overflow-hidden rounded-t-lg relative">
                        <img
                          src={post.imageUrl}
                          alt={post.title}
                          className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        {/* Instagram overlay */}
                        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="bg-black/50 rounded-full p-1">
                            <InstagramLogo size={16} className="text-white" />
                          </div>
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="font-body font-medium text-foreground mb-1">
                          {post.title}
                        </h3>
                        <p className="text-muted-foreground text-sm font-body mb-2 line-clamp-2">
                          {post.description}
                        </p>
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span>{post.likes} likes</span>
                          <span>{new Date(post.timestamp).toLocaleDateString()}</span>
                        </div>
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
                Follow my latest works and creative process on Instagram{' '}
                <a 
                  href="https://www.instagram.com/artstudiobyakash/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-accent hover:text-accent/80 transition-colors"
                >
                  @artstudiobyakash
                </a>, where I share behind-the-scenes content and new pieces as they come to life.
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

      {/* Instagram Post Detail Dialog */}
      <Dialog open={!!selectedPost} onOpenChange={() => closePost()}>
        <DialogContent className="max-w-7xl w-full h-full max-h-screen p-0 bg-black/95">
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Close button */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 z-50 text-white hover:bg-white/10"
              onClick={closePost}
            >
              <X size={24} />
            </Button>

            {/* Navigation buttons */}
            {instagramPosts && instagramPosts.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-50 text-white hover:bg-white/10"
                  onClick={() => navigatePost('prev')}
                >
                  <CaretLeft size={32} />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-50 text-white hover:bg-white/10"
                  onClick={() => navigatePost('next')}
                >
                  <CaretRight size={32} />
                </Button>
              </>
            )}

            {selectedPost && (
              <div className="flex flex-col lg:flex-row items-center justify-center w-full h-full p-8 gap-8">
                {/* Image */}
                <div className="flex-1 flex items-center justify-center max-h-full">
                  <img
                    src={selectedPost.imageUrl}
                    alt={selectedPost.title}
                    className="max-w-full max-h-full object-contain animate-scale-in"
                  />
                </div>

                {/* Details */}
                <div className="lg:w-80 text-white space-y-4">
                  <div>
                    <h2 className="font-display text-2xl font-bold mb-2">
                      {selectedPost.title}
                    </h2>
                    <p className="text-white/90 font-body leading-relaxed mb-4">
                      {selectedPost.description}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-white/70">
                      <span>{selectedPost.likes} likes</span>
                      <span>{new Date(selectedPost.timestamp).toLocaleDateString()}</span>
                    </div>
                  </div>
                  
                  <div className="pt-4 space-y-3">
                    <Button 
                      className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
                      onClick={() => window.open(selectedPost.instagramUrl, '_blank')}
                    >
                      <InstagramLogo size={16} className="mr-2" />
                      View on Instagram
                    </Button>
                    <Button 
                      variant="outline"
                      className="w-full border-white/20 text-white hover:bg-white/10"
                      onClick={() => {
                        closePost()
                        setCurrentView('contact')
                      }}
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