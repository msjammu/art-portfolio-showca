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

const CakesEvents = () => {
  const [selectedService, setSelectedService] = useState<'cakes' | 'events'>('cakes')
  const [selectedCakeImage, setSelectedCakeImage] = useState<string | null>(null)

  // Watermark component for cake images
  const WatermarkedImage = ({ src, alt, className, onClick }: { 
    src: string; 
    alt: string; 
    className?: string; 
    onClick?: () => void 
  }) => (
    <div className={`relative ${className || ''}`} onClick={onClick}>
      <img 
        src={src} 
        alt={alt}
        className="w-full h-full object-cover select-none pointer-events-none"
        onContextMenu={(e) => e.preventDefault()}
        onDragStart={(e) => e.preventDefault()}
      />
      {/* Single watermark overlay */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-2 right-2 text-white/80 text-xs font-semibold bg-black/30 px-2 py-1 rounded backdrop-blur-sm">
          Cake Studio by Akash
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
    { id: 5, src: cake5, alt: "Organic Ingredients Special Cake" },
    { id: 6, src: cake6, alt: "Designer Party Cake" },
    { id: 7, src: cake61, alt: "Custom Decoration Cake" },
    { id: 8, src: cake7, alt: "Premium Special Occasion Cake" },
    { id: 9, src: cake8, alt: "Festive Celebration Cake" },
    { id: 10, src: cake9, alt: "Creative Theme Cake Design" },
    { id: 11, src: cake10, alt: "Deluxe Custom Cake" },
    { id: 12, src: cake11, alt: "Specialty Event Cake" },
    { id: 13, src: cake12, alt: "Artisan Handcrafted Cake" },
    { id: 14, src: cake13, alt: "Signature Cake Studio Creation" }
  ]

  const cakeServices = [
    {
      title: "Custom Birthday Cakes",
      description: "Beautifully designed organic cakes tailored to your celebration theme",
      features: ["Organic ingredients", "Custom designs", "Theme-based decorations", "Fresh flavors"],
      priceRange: "Ask for Pricing",
      image: cake1
    },
    {
      title: "Party Decorations",
      description: "Complete party decoration service to match your cake design",
      features: ["Theme coordination", "Balloon arrangements", "Table settings", "Photo backdrops"],
      priceRange: "Ask for Pricing", 
      image: cake3
    },
    {
      title: "Special Occasion Cakes",
      description: "Cakes for anniversaries, graduations, and special milestones",
      features: ["Elegant designs", "Premium ingredients", "Custom messaging", "Professional presentation"],
      priceRange: "Ask for Pricing",
      image: cake5
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
            Beautiful organic cakes and engaging art events to make your celebrations unforgettable
          </p>
          
          {/* Quick Contact Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <Button 
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              onClick={() => {
                const message = `Hi! I'd like to order a custom cake and discuss party planning options. 

🎂 Cake needed for: [Your occasion]
📅 Date: [Your date]  
👥 Guests: [Number of people]
🎨 Kids art activity needed: [Yes/No]

Please share pricing and availability. Thank you!`
                window.open(`https://wa.me/14256989990?text=${encodeURIComponent(message)}`)
              }}
            >
              <WhatsappLogo size={20} className="mr-2" />
              Quick Order on WhatsApp
            </Button>
            <Button 
              variant="outline"
              className="border-2 border-purple-500 text-purple-500 hover:bg-purple-500 hover:text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              onClick={() => window.open('tel:+14256989990')}
            >
              <Phone size={20} className="mr-2" />
              Call for Quote
            </Button>
          </div>
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
          <div className="space-y-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Custom Cakes & Party Decorations</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Handcrafted organic cakes with beautiful designs, plus complete party decoration services 
                to make your celebration picture-perfect.
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
                      <Badge variant="secondary" className="text-lg px-4 py-2">
                        {service.priceRange}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Cake Gallery Section */}
            <div className="bg-white rounded-2xl p-8 shadow-lg mt-12">
              <div className="flex items-center justify-center gap-3 mb-8">
                <ImageIcon size={32} className="text-pink-500" />
                <h3 className="text-3xl font-bold text-gray-800">Our Cake Gallery</h3>
                <ImageIcon size={32} className="text-pink-500" />
              </div>
              <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
                Explore our collection of handcrafted organic cakes, each one a unique masterpiece designed with love and attention to detail.
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {cakeGallery.map((cake) => (
                  <div 
                    key={cake.id}
                    className="relative group cursor-pointer overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300"
                    onClick={() => setSelectedCakeImage(cake.src)}
                  >
                    <WatermarkedImage 
                      src={cake.src} 
                      alt={cake.alt}
                      className="w-full h-32 md:h-40 group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center z-10">
                      <Eye size={24} className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="text-center">
                <p className="text-sm text-gray-500 italic">Click on any image to view larger</p>
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

            <div className="bg-white rounded-2xl p-8 shadow-lg mt-8">
              <h3 className="text-2xl font-bold text-center mb-6 text-gray-800">Why Choose Our Cakes?</h3>
              <div className="grid md:grid-cols-4 gap-6 text-center">
                <div className="space-y-2">
                  <Heart size={32} className="mx-auto text-red-500" />
                  <h4 className="font-semibold">Organic Ingredients</h4>
                  <p className="text-sm text-gray-600">Made with love using only the finest organic ingredients</p>
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
                onClick={() => window.open('tel:+14256989990')}
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
                  window.open(`https://wa.me/14256989990?text=${encodeURIComponent(message)}`)
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