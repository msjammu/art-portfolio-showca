import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { 
  Cake, 
  Palette, 
  Clock, 
  Users, 
  Star, 
  Heart, 
  Gift,
  Phone,
  Eye,
  Image as ImageIcon,
  WhatsappLogo
} from '@phosphor-icons/react'

// Import cake images
import cake1 from '../assets/cakes/cake1.jpg'
import cake2 from '../assets/cakes/cake2.jpg'
import cake3 from '../assets/cakes/cake3.jpg'
import cake4 from '../assets/cakes/cake4.jpg'
import cake5 from '../assets/cakes/cake5.jpg'
import cake6 from '../assets/cakes/cake6.jpg'
import cake61 from '../assets/cakes/cake6.1.jpg'
import cake7 from '../assets/cakes/cake7.jpg'
import cake8 from '../assets/cakes/cake8.jpeg'
import cake9 from '../assets/cakes/cake9.jpeg'
import cake10 from '../assets/cakes/cake10.jpeg'
import cake11 from '../assets/cakes/cake11.jpeg'
import cake12 from '../assets/cakes/cake12.jpeg'
import cake13 from '../assets/cakes/cake13.jpeg'
// Butterfly cake image and video
import butterflyCake from '../assets/cakes/butterfly-cake.jpeg'
import butterflyVideo from '../assets/cakes/the-making-of-the-butterfly-cake.mp4'

const CakesEvents = () => {
  const [selectedService, setSelectedService] = useState<'cakes' | 'events'>('cakes')
  const [selectedCakeImage, setSelectedCakeImage] = useState<string | null>(null)
  const [showButterflyVideo, setShowButterflyVideo] = useState(false)
  const [selectedSpecialCake, setSelectedSpecialCake] = useState<any>(null)

  // Watermark component for cake images
  const WatermarkedImage = ({ src, alt, className, onClick }: { 
    src: string; 
    alt: string; 
    className?: string; 
    onClick?: () => void 
  }) => (
    <div className={`relative ${className || ''} ${onClick ? 'cursor-pointer' : ''}`} onClick={onClick}>
      <img 
        src={src} 
        alt={alt}
        className="w-full h-full object-cover select-none pointer-events-none"
        onContextMenu={(e) => e.preventDefault()}
        onDragStart={(e) => e.preventDefault()}
      />
      {/* Subtle watermark overlay */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-1 right-1 text-white/40 text-[10px] font-normal bg-black/10 px-1.5 py-0.5 rounded-sm">
          © Akash
        </div>
      </div>
    </div>
  )

  // Cake gallery images
  const cakeGallery = [
    { id: 1, src: cake1, alt: "Beautiful Custom Birthday Cake" },
    { id: 2, src: cake2, alt: "Elegant Wedding Celebration Cake" },
    { id: 3, src: cake3, alt: "Themed Party Cake Design" },
    { id: 4, src: cake4, alt: "Artistic Custom Cake Creation" },
    { id: 5, src: cake5, alt: "Quality Ingredients Special Cake" },
    { id: 6, src: cake6, alt: "Designer Party Cake" },
    { id: 7, src: cake61, alt: "Custom Decoration Cake" },
    { id: 8, src: cake7, alt: "Premium Special Occasion Cake" },
    { id: 9, src: cake8, alt: "Festive Celebration Cake" },
    { id: 10, src: cake9, alt: "Creative Theme Cake Design" },
    { id: 11, src: cake10, alt: "Deluxe Custom Cake" },
    { id: 12, src: cake11, alt: "Specialty Event Cake" },
    { id: 13, src: cake12, alt: "Artisan Handcrafted Cake" },
    { id: 14, src: cake13, alt: "Signature Cake Studio Creation" },
    { 
      id: 15, 
      src: butterflyCake, 
      alt: "Beautiful Butterfly Cake with Delicate Wings",
      isSpecial: true,
      hasVideo: true,
      description: "A stunning butterfly-themed cake featuring delicate sugar wings and vibrant colors"
    }
  ]

  const cakeServices = [
    {
      title: "Custom Birthday Cakes",
      description: "Beautifully designed cakes tailored to your celebration theme",
      features: ["Quality ingredients", "Custom designs", "Theme-based decorations", "Fresh flavors"],
      priceRange: "View Prices",
      image: cake2
    },
    {
      title: "Party Decorations",
      description: "Complete party decoration service to match your cake design",
      features: ["Theme coordination", "Balloon arrangements", "Table settings", "Photo backdrops"],
      priceRange: "View Prices", 
      image: cake12
    },
    {
      title: "Special Occasion Cakes",
      description: "Cakes for anniversaries, graduations, and special milestones",
      features: ["Elegant designs", "Premium ingredients", "Custom messaging", "Professional presentation"],
      priceRange: "View Prices",
      image: cake13
    }
  ]

  const artEventPackages = [
    {
      title: "Kids Art & Craft Party",
      duration: "1 Hour",
      price: "$250",
      description: "Keep the little ones engaged with fun art activities during your party",
      includes: [
        "Professional art instructor",
        "All art supplies provided",
        "Age-appropriate activities (3-12 years)",
        "Take-home artwork",
        "Setup and cleanup included"
      ],
      ageGroups: "Ages 3-12",
      maxKids: "Up to 10 children"
    }
  ]



  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-yellow-50">
      {/* Header Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-pink-100 to-purple-100 py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center items-center gap-4 mb-6">
            <Cake size={48} className="text-pink-500" />
            <Palette size={48} className="text-purple-500" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-4">
            Cakes & Events
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-6">
            Beautiful handcrafted cakes and engaging art events to make your celebrations unforgettable
          </p>
        </div>
      </div>

      {/* Service Selection Tabs */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-full p-2 shadow-lg">
            <div className="flex gap-2">
              <Button
                variant={selectedService === 'cakes' ? 'default' : 'ghost'}
                onClick={() => setSelectedService('cakes')}
                className="rounded-full px-6"
              >
                <Cake className="mr-2" size={20} />
                Cakes & Decorations
              </Button>
              <Button
                variant={selectedService === 'events' ? 'default' : 'ghost'}
                onClick={() => setSelectedService('events')}
                className="rounded-full px-6"
              >
                <Palette className="mr-2" size={20} />
                Art Events
              </Button>
            </div>
          </div>
        </div>

        {/* Cakes & Decorations Section */}
        {selectedService === 'cakes' && (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Custom Cakes & Party Decorations</h2>
              <p className="text-gray-600 text-sm max-w-xl mx-auto">
                Handcrafted cakes with beautiful designs, plus complete party decoration services.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {cakeServices.map((service, index) => (
                <Card key={index} className="hover:shadow-xl transition-shadow duration-300 border-0 shadow-lg overflow-hidden">
                  <CardHeader className="text-center p-0">
                    <div className="relative h-48 overflow-hidden group">
                      <WatermarkedImage 
                        src={service.image} 
                        alt={service.title}
                        className="w-full h-full group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/20 hover:bg-black/10 transition-colors duration-300"></div>
                    </div>
                    <div className="p-6">
                      <CardTitle className="text-xl text-gray-800">{service.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-gray-600 text-center">{service.description}</p>
                    <div className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <Star size={16} className="text-yellow-500" />
                          <span className="text-sm text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                    <div className="text-center pt-4">
                      <Badge 
                        variant="secondary" 
                        className="text-lg px-4 py-2 cursor-pointer hover:bg-secondary/80 transition-colors"
                        onClick={() => {
                          const pricingSection = document.getElementById('pricing-section');
                          if (pricingSection) {
                            pricingSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                          }
                        }}
                      >
                        {service.priceRange}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Featured Butterfly Cake Section */}
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-4 md:p-8 shadow-lg mt-12 border border-purple-200">
              <div className="flex items-center justify-center gap-2 md:gap-3 mb-4 md:mb-6">
                <span className="text-2xl md:text-4xl">🦋</span>
                <h3 className="text-xl md:text-3xl font-bold text-gray-800 text-center">Featured: Butterfly Cake</h3>
                <span className="text-2xl md:text-4xl">🦋</span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-center">
                <div className="relative group order-2 md:order-1">
                  <div className="relative overflow-hidden rounded-lg shadow-xl cursor-pointer" onClick={() => setSelectedCakeImage(butterflyCake)}>
                    <WatermarkedImage 
                      src={butterflyCake} 
                      alt="Beautiful Butterfly Cake with Delicate Wings"
                      className="w-full h-64 md:h-80 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center pointer-events-none">
                      <Eye size={32} className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  </div>
                  <div className="absolute top-2 right-2 md:top-4 md:right-4 pointer-events-none">
                    <Badge className="bg-purple-500 text-white text-xs">✨ Featured</Badge>
                  </div>
                </div>
                
                <div className="space-y-4 md:space-y-6 order-1 md:order-2">
                  <div>
                    <h4 className="text-xl md:text-2xl font-bold text-gray-800 mb-3">Enchanting Butterfly Design</h4>
                    <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                      This stunning butterfly cake features delicate sugar wings, vibrant colors, and intricate details 
                      that bring the beauty of nature to your celebration. Perfect for garden parties, spring celebrations, 
                      or anyone who loves these magical creatures. Watch the complete making process in our exclusive video!
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 md:gap-4 text-xs md:text-sm">
                    <div className="bg-white p-2 md:p-3 rounded-lg shadow-sm">
                      <span className="font-semibold text-purple-600 block">Design Time:</span>
                      <p className="text-gray-600">4-5 hours crafting</p>
                    </div>
                    <div className="bg-white p-2 md:p-3 rounded-lg shadow-sm">
                      <span className="font-semibold text-purple-600 block">Special Features:</span>
                      <p className="text-gray-600">Edible sugar wings</p>
                    </div>
                    <div className="bg-white p-2 md:p-3 rounded-lg shadow-sm">
                      <span className="font-semibold text-purple-600 block">Colors:</span>
                      <p className="text-gray-600">Customizable palette</p>
                    </div>
                    <div className="bg-white p-2 md:p-3 rounded-lg shadow-sm">
                      <span className="font-semibold text-purple-600 block">Best For:</span>
                      <p className="text-gray-600">All age celebrations</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-col md:flex-row gap-3 md:gap-4">
                    <Button 
                      className="bg-purple-600 hover:bg-purple-700 text-white flex-1 text-sm md:text-base"
                      onClick={() => setShowButterflyVideo(true)}
                    >
                      🎥 Watch Making Process
                    </Button>
                    <Button 
                      variant="outline" 
                      className="border-purple-300 text-purple-600 hover:bg-purple-50 text-sm md:text-base"
                      onClick={() => {
                        const message = `Hi! I'm interested in ordering a beautiful Butterfly Cake like the one featured on your website! 🦋

I'd love to discuss:
• Size and servings needed
• Color preferences for the butterfly wings
• Special decoration requests
• Delivery date

Could you please share pricing and availability?

Thank you! 🎂✨`
                        const phoneNumber = atob('MTQyNTY5ODk5OTA=')
                        window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`)
                      }}
                    >
                      💬 Order This Design
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Cake Gallery Section */}
            <div className="bg-white rounded-2xl p-8 shadow-lg mt-12">
              <div className="flex items-center justify-center gap-3 mb-8">
                <ImageIcon size={32} className="text-pink-500" />
                <h3 className="text-3xl font-bold text-gray-800">Our Cake Gallery</h3>
                <ImageIcon size={32} className="text-pink-500" />
              </div>
              <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
                Explore our collection of handcrafted cakes, each one a unique masterpiece designed with love and attention to detail.
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {cakeGallery.map((cake) => (
                  <div 
                    key={cake.id}
                    className={`relative group cursor-pointer overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 ${
                      cake.isSpecial ? 'ring-2 ring-purple-400 ring-offset-2' : ''
                    }`}
                    onClick={() => {
                      if (cake.isSpecial && cake.hasVideo) {
                        setSelectedSpecialCake(cake)
                      } else {
                        setSelectedCakeImage(cake.src)
                      }
                    }}
                  >
                    <WatermarkedImage 
                      src={cake.src} 
                      alt={cake.alt}
                      className="w-full h-32 md:h-40 group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center z-10">
                      {cake.isSpecial && cake.hasVideo ? (
                        <div className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center">
                          <Eye size={20} className="mx-auto mb-1" />
                          <span className="text-xs font-medium">View Options</span>
                        </div>
                      ) : (
                        <Eye size={24} className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      )}
                    </div>
                    
                    {/* Special badges for butterfly cake */}
                    {cake.isSpecial && (
                      <div className="absolute top-2 left-2 flex flex-col gap-1">
                        <Badge className="bg-purple-500 text-white text-xs">🦋 Featured</Badge>
                        {cake.hasVideo && (
                          <Badge className="bg-red-500 text-white text-xs">🎥 Video</Badge>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
              
              <div className="text-center">
                <p className="text-sm text-gray-500 italic">
                  Click on any image to view larger. Special cakes with videos show additional options! 🎥
                </p>
              </div>
            </div>

            {/* Image Modal */}
            {selectedCakeImage && (
              <div 
                className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
                onClick={() => setSelectedCakeImage(null)}
              >
                <div className="relative max-w-4xl max-h-full">
                  <WatermarkedImage 
                    src={selectedCakeImage} 
                    alt="Cake detail view"
                    className="max-w-full max-h-full rounded-lg shadow-2xl"
                  />
                  <button 
                    onClick={(e) => {
                      e.stopPropagation()
                      setSelectedCakeImage(null)
                    }}
                    className="absolute top-4 right-4 bg-white/90 hover:bg-white text-gray-800 rounded-full p-2 shadow-lg transition-colors duration-200 z-10"
                  >
                    ✕
                  </button>
                </div>
              </div>
            )}

            {/* Butterfly Cake Video Modal */}
            {showButterflyVideo && (
              <div 
                className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4"
                onClick={() => setShowButterflyVideo(false)}
              >
                <div className="relative max-w-4xl w-full max-h-full bg-white rounded-lg overflow-hidden shadow-2xl">
                  <div className="flex items-center justify-between p-4 bg-purple-600 text-white">
                    <h3 className="text-xl font-bold">🦋 Butterfly Cake Making Process - Exclusive Video</h3>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation()
                        setShowButterflyVideo(false)
                      }}
                      className="bg-white/20 hover:bg-white/30 rounded-full p-2 transition-colors duration-200"
                    >
                      ✕
                    </button>
                  </div>
                  
                  <div className="p-6">
                    <div className="aspect-video bg-gray-100 rounded-lg mb-4 overflow-hidden">
                      {/* Actual butterfly cake making video */}
                      <video 
                        controls 
                        className="w-full h-full rounded-lg object-cover"
                        poster={butterflyCake}
                        controlsList="nodownload noremoteplayback"
                        disablePictureInPicture
                        onContextMenu={(e) => e.preventDefault()}
                        style={{ userSelect: 'none' }}
                      >
                        <source src={butterflyVideo} type="video/mp4" />
                        <p className="text-gray-600 p-4">
                          Your browser does not support the video tag. Please update your browser to watch this beautiful cake making process.
                        </p>
                      </video>
                    </div>
                    
                    <div className="text-center">
                      <p className="text-gray-600 text-sm mb-4">
                        Watch our skilled baker create this stunning butterfly cake! The video showcases our detailed process including:
                      </p>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div className="bg-purple-50 p-3 rounded-lg">
                          <span className="block font-semibold text-purple-600">Step 1</span>
                          <span className="text-gray-600">Cake base preparation</span>
                        </div>
                        <div className="bg-purple-50 p-3 rounded-lg">
                          <span className="block font-semibold text-purple-600">Step 2</span>
                          <span className="text-gray-600">Sugar wing crafting</span>
                        </div>
                        <div className="bg-purple-50 p-3 rounded-lg">
                          <span className="block font-semibold text-purple-600">Step 3</span>
                          <span className="text-gray-600">Color application</span>
                        </div>
                        <div className="bg-purple-50 p-3 rounded-lg">
                          <span className="block font-semibold text-purple-600">Step 4</span>
                          <span className="text-gray-600">Final assembly</span>
                        </div>
                      </div>
                      
                      <Button 
                        className="mt-6 bg-purple-600 hover:bg-purple-700 text-white"
                        onClick={() => {
                          const message = `Hi! I just watched the butterfly cake making process and I'm amazed by the craftsmanship! 🦋✨

I'd love to order a similar butterfly cake. Could we discuss:
• Available sizes and pricing
• Timeline for creating this detailed design
• Color customization options
• Delivery arrangements

Thank you for sharing your beautiful work! 🎂`
                          const phoneNumber = atob('MTQyNTY5ODk5OTA=')
                          window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`)
                          setShowButterflyVideo(false)
                        }}
                      >
                        💬 Order This Design
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Special Cake Options Modal */}
            {selectedSpecialCake && (
              <div 
                className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
                onClick={() => setSelectedSpecialCake(null)}
              >
                <div className="relative max-w-md w-full bg-white rounded-lg overflow-hidden shadow-2xl">
                  <div className="flex items-center justify-between p-4 bg-purple-600 text-white">
                    <h3 className="text-lg font-bold">🦋 Butterfly Cake</h3>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation()
                        setSelectedSpecialCake(null)
                      }}
                      className="bg-white/20 hover:bg-white/30 rounded-full p-2 transition-colors duration-200"
                    >
                      ✕
                    </button>
                  </div>
                  
                  <div className="p-6">
                    <div className="relative mb-6 rounded-lg overflow-hidden">
                      <WatermarkedImage 
                        src={selectedSpecialCake.src} 
                        alt={selectedSpecialCake.alt}
                        className="w-full h-48 object-cover"
                      />
                    </div>
                    
                    <p className="text-gray-600 text-sm mb-6 text-center">
                      A stunning butterfly-themed cake featuring delicate sugar wings and vibrant colors
                    </p>
                    
                    <div className="grid grid-cols-2 gap-3">
                      <Button 
                        className="bg-purple-600 hover:bg-purple-700 text-white text-sm"
                        onClick={(e) => {
                          e.stopPropagation()
                          setSelectedSpecialCake(null)
                          setSelectedCakeImage(selectedSpecialCake.src)
                        }}
                      >
                        🖼️ View Image
                      </Button>
                      
                      <Button 
                        className="bg-red-600 hover:bg-red-700 text-white text-sm"
                        onClick={(e) => {
                          e.stopPropagation()
                          setSelectedSpecialCake(null)
                          setShowButterflyVideo(true)
                        }}
                      >
                        🎥 Watch Video
                      </Button>
                    </div>
                    
                    <Button 
                      variant="outline" 
                      className="w-full mt-3 border-purple-300 text-purple-600 hover:bg-purple-50 text-sm"
                      onClick={(e) => {
                        e.stopPropagation()
                        const message = `Hi! I'm interested in ordering a Butterfly Cake! 🦋

I'd love to discuss:
• Size and pricing
• Color preferences
• Delivery date

Thank you! 🎂✨`
                        const phoneNumber = atob('MTQyNTY5ODk5OTA=')
                        window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`)
                        setSelectedSpecialCake(null)
                      }}
                    >
                      💬 Order Now
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Cake Sizing and Pricing Information */}
            <div id="pricing-section" className="bg-white rounded-2xl p-8 shadow-lg mt-8">
              <div className="text-center mb-8">
                <h3 className="text-3xl font-bold text-gray-800 mb-4">Cake Sizes & Prices</h3>
                <p className="text-gray-600 max-w-3xl mx-auto">
                  Handcrafted whole wheat eggless cakes made with high-quality 
                  ingredients, fresh frosting, and <strong>3 hours</strong> of skilled labor per cake.
                </p>
                <p className="text-gray-600 mt-2">
                  We welcome decoration requests. Feel free to share a reference image or 
                  design inspiration, and we'll do our best to match your vision.
                </p>
                
                {/* Cupcake Pricing */}
                <div className="mt-6 p-4 bg-pink-50 rounded-lg border border-pink-200">
                  <p className="text-pink-800 font-semibold">
                    🧁 <strong>Cupcakes:</strong> $3 per piece
                  </p>
                  <p className="text-pink-700 text-sm mt-1">Same quality ingredients, perfect for smaller celebrations!</p>
                </div>
              </div>

              {/* Standard Cake Sheet Sizes */}
              <div className="mb-8">
                <h4 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <Cake size={24} className="text-pink-500" />
                  Standard Cake Sheet Sizes
                </h4>
                
                <div>
                  <table className="w-full border-collapse border border-gray-300 rounded-lg overflow-hidden text-sm">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="border border-gray-300 px-2 py-2 md:px-4 md:py-3 text-left font-semibold">Sheet Size</th>
                        <th className="border border-gray-300 px-2 py-2 md:px-4 md:py-3 text-left font-semibold">Dimensions (inches)</th>
                        <th className="border border-gray-300 px-2 py-2 md:px-4 md:py-3 text-left font-semibold">Approx. Servings</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="hover:bg-gray-50">
                        <td className="border border-gray-300 px-2 py-2 md:px-4 md:py-3 font-medium">Full Sheet</td>
                        <td className="border border-gray-300 px-2 py-2 md:px-4 md:py-3">18 × 24</td>
                        <td className="border border-gray-300 px-2 py-2 md:px-4 md:py-3">48–96 servings</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="border border-gray-300 px-2 py-2 md:px-4 md:py-3 font-medium">Half Sheet</td>
                        <td className="border border-gray-300 px-2 py-2 md:px-4 md:py-3">13 × 18</td>
                        <td className="border border-gray-300 px-2 py-2 md:px-4 md:py-3">36–48 servings</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="border border-gray-300 px-2 py-2 md:px-4 md:py-3 font-medium">Quarter Sheet</td>
                        <td className="border border-gray-300 px-2 py-2 md:px-4 md:py-3">9 × 13</td>
                        <td className="border border-gray-300 px-2 py-2 md:px-4 md:py-3">12–24 servings</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="border border-gray-300 px-2 py-2 md:px-4 md:py-3 font-medium">Eighth Sheet</td>
                        <td className="border border-gray-300 px-2 py-2 md:px-4 md:py-3">6.5 × 9</td>
                        <td className="border border-gray-300 px-2 py-2 md:px-4 md:py-3">6–12 servings</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="mt-4 bg-blue-50 p-4 rounded-lg">
                  <h5 className="font-semibold text-blue-800 mb-2">Tips:</h5>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• Servings depend on portion size (e.g., 2x2" or 2x3" pieces).</li>
                    <li>• These sizes refer to the baking pan dimensions (not including icing or decorations).</li>
                    <li>• Quarter and half sheets are most popular for home bakers and small events.</li>
                  </ul>
                </div>
              </div>

              {/* Sheet Cake Pricing */}
              <div className="mb-8">
                <h4 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <Badge className="bg-green-100 text-green-800">💰</Badge>
                  Sheet Cake Pricing
                </h4>
                
                <div>
                  <table className="w-full border-collapse border border-gray-300 rounded-lg overflow-hidden text-sm">
                    <thead className="bg-green-100">
                      <tr>
                        <th className="border border-gray-300 px-2 py-2 md:px-4 md:py-3 text-left font-semibold">Cake Size</th>
                        <th className="border border-gray-300 px-2 py-2 md:px-4 md:py-3 text-left font-semibold">Dimensions (in)</th>
                        <th className="border border-gray-300 px-2 py-2 md:px-4 md:py-3 text-left font-semibold">Servings</th>
                        <th className="border border-gray-300 px-2 py-2 md:px-4 md:py-3 text-left font-semibold">Final Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="hover:bg-gray-50">
                        <td className="border border-gray-300 px-2 py-2 md:px-4 md:py-3 font-medium">Eighth Sheet</td>
                        <td className="border border-gray-300 px-2 py-2 md:px-4 md:py-3">6.5 × 9</td>
                        <td className="border border-gray-300 px-2 py-2 md:px-4 md:py-3">6–12</td>
                        <td className="border border-gray-300 px-2 py-2 md:px-4 md:py-3 font-bold text-green-600">$90</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="border border-gray-300 px-2 py-2 md:px-4 md:py-3 font-medium">Quarter Sheet</td>
                        <td className="border border-gray-300 px-2 py-2 md:px-4 md:py-3">9 × 13</td>
                        <td className="border border-gray-300 px-2 py-2 md:px-4 md:py-3">12–24</td>
                        <td className="border border-gray-300 px-2 py-2 md:px-4 md:py-3 font-bold text-green-600">$110</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="border border-gray-300 px-2 py-2 md:px-4 md:py-3 font-medium">Half Sheet</td>
                        <td className="border border-gray-300 px-2 py-2 md:px-4 md:py-3">13 × 18</td>
                        <td className="border border-gray-300 px-2 py-2 md:px-4 md:py-3">36–48</td>
                        <td className="border border-gray-300 px-2 py-2 md:px-4 md:py-3 font-bold text-green-600">$140</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="border border-gray-300 px-2 py-2 md:px-4 md:py-3 font-medium">Full Sheet</td>
                        <td className="border border-gray-300 px-2 py-2 md:px-4 md:py-3">18 × 24</td>
                        <td className="border border-gray-300 px-2 py-2 md:px-4 md:py-3">48–96</td>
                        <td className="border border-gray-300 px-2 py-2 md:px-4 md:py-3 font-bold text-green-600">$200</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="mt-4 bg-amber-50 p-4 rounded-lg">
                  <p className="text-sm text-amber-800">
                    <strong>Note:</strong> All cakes are made with whole wheat, eggless ingredients. 
                    Pricing includes 3 hours of skilled craftsmanship and basic decoration. 
                    Complex custom designs may have additional charges.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg mt-8">
              <h3 className="text-2xl font-bold text-center mb-6 text-gray-800">Why Choose Our Cakes?</h3>
              <div className="grid md:grid-cols-4 gap-6 text-center">
                <div className="space-y-2">
                  <Heart size={32} className="mx-auto text-red-500" />
                  <h4 className="font-semibold">Quality Ingredients</h4>
                  <p className="text-sm text-gray-600">Made with love using only the finest ingredients</p>
                </div>
                <div className="space-y-2">
                  <Palette size={32} className="mx-auto text-blue-500" />
                  <h4 className="font-semibold">Custom Designs</h4>
                  <p className="text-sm text-gray-600">Unique designs tailored to your party theme</p>
                </div>
                <div className="space-y-2">
                  <Star size={32} className="mx-auto text-yellow-500" />
                  <h4 className="font-semibold">Fresh & Delicious</h4>
                  <p className="text-sm text-gray-600">Baked fresh for maximum flavor and quality</p>
                </div>
                <div className="space-y-2">
                  <Gift size={32} className="mx-auto text-purple-500" />
                  <h4 className="font-semibold">Complete Service</h4>
                  <p className="text-sm text-gray-600">From design to delivery, we handle everything</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Art Events Section */}
        {selectedService === 'events' && (
          <div className="space-y-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Kids Art & Craft Events</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Keep the children entertained with supervised art activities while parents enjoy the party. 
                Professional instruction and all supplies included!
              </p>
            </div>

            {artEventPackages.map((package_, index) => (
              <Card key={index} className="max-w-4xl mx-auto border-0 shadow-xl">
                <CardHeader className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-t-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-2xl text-gray-800 flex items-center gap-2">
                        <Palette size={28} />
                        {package_.title}
                      </CardTitle>
                      <p className="text-gray-600 mt-2">{package_.description}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-purple-600">{package_.price}</div>
                      <div className="text-sm text-gray-600 flex items-center gap-1">
                        <Clock size={16} />
                        {package_.duration}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-4">What's Included:</h4>
                      <ul className="space-y-2">
                        {package_.includes.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <Star size={16} className="text-yellow-500 mt-1 flex-shrink-0" />
                            <span className="text-gray-700">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <Users size={20} className="text-blue-500" />
                        <span className="font-semibold">{package_.ageGroups}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users size={20} className="text-green-500" />
                        <span className="font-semibold">{package_.maxKids}</span>
                      </div>
                      <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                        <p className="text-sm text-yellow-800">
                          <strong>Perfect for:</strong> Birthday parties, family gatherings, community events. 
                          Additional children can be accommodated for $15 per child.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}



        {/* Contact Section */}
        <div className="mt-16 bg-white rounded-2xl p-8 shadow-lg">
          <h3 className="text-2xl font-bold text-center mb-8 text-gray-800">Ready to Plan Your Perfect Party?</h3>
          <div className="grid md:grid-cols-2 gap-8 text-center max-w-2xl mx-auto">
            <div className="space-y-4">
              <Phone size={32} className="mx-auto text-green-500" />
              <h4 className="font-semibold">Call for Consultation</h4>
              <p className="text-gray-600 text-sm">Discuss your party vision and get a custom quote</p>
              <Button 
                className="bg-green-500 hover:bg-green-600"
                onClick={() => window.open('tel:+' + atob('MTQyNTY5ODk5OTA='))}
              >
                Call Now
              </Button>
            </div>
            <div className="space-y-4">
              <WhatsappLogo size={32} className="mx-auto text-green-600" />
              <h4 className="font-semibold">WhatsApp Order</h4>
              <p className="text-gray-600 text-sm">Quick cake order and party planning chat</p>
              <Button 
                className="bg-green-600 hover:bg-green-700"
                onClick={() => {
                  const message = `Hi! I'm interested in your cake and party services. I'd like to discuss:

🎂 Custom cake design for: [Date/Occasion]
🎨 Kids art event (1 hour - $250)
🎈 Party decorations

Could you please share more details about pricing and availability?

Thank you!`
                  const phoneNumber = atob('MTQyNTY5ODk5OTA=') // Base64 encoded phone
                  window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`)
                }}
              >
                WhatsApp
              </Button>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default CakesEvents