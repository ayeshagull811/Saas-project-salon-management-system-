'use client'

import { useState } from 'react'

export default function OffersPage() {
  const [selectedOffer, setSelectedOffer] = useState(null)

  const offers = [
    {
      id: 1,
      title: 'Bridal Package',
      price: 15000,
      originalPrice: 21500,
      discount: '30% OFF',
      validity: 'Valid till: 31st December 2025',
      features: [
        'Bridal Makeup',
        'Hair Styling',
        'Manicure & Pedicure',
        'Facial Treatment',
        'Mehndi Design'
      ],
      gradient: 'from-pink-500 via-purple-500 to-indigo-500'
    },
    {
      id: 2,
      title: 'Party Package',
      price: 6000,
      originalPrice: 10000,
      discount: '40% OFF',
      validity: 'Valid till: 31st December 2025',
      features: [
        'Party Makeup',
        'Hair Styling',
        'Manicure',
        'Threading'
      ],
      gradient: 'from-cyan-400 via-blue-400 to-purple-400'
    },
    {
      id: 3,
      title: 'Monthly Membership',
      price: 5000,
      originalPrice: 10000,
      discount: '50% OFF',
      validity: 'Limited Time Offer',
      features: [
        '4 Haircuts',
        '2 Facials',
        '2 Hair Treatments',
        'Unlimited Consultations',
        '10% off on Products'
      ],
      gradient: 'from-yellow-400 via-orange-500 to-pink-500'
    },
    {
      id: 4,
      title: 'Spa Package',
      price: 4500,
      originalPrice: 6000,
      discount: '25% OFF',
      validity: 'Valid till: 31st October 2025',
      features: [
        'Full Body Massage',
        'Aromatherapy',
        'Facial Treatment',
        'Foot Reflexology'
      ],
      gradient: 'from-fuchsia-500 via-purple-600 to-violet-600'
    },
    {
      id: 5,
      title: 'Hair Care Package',
      price: 3500,
      originalPrice: 5400,
      discount: '35% OFF',
      validity: 'Valid till: 30th November 2025',
      features: [
        'Hair Spa Treatment',
        'Hair Color/Highlights',
        'Haircut & Styling',
        'Keratin Treatment'
      ],
      gradient: 'from-orange-400 via-red-500 to-pink-500'
    },
    {
      id: 6,
      title: 'Quick Refresh',
      price: 2000,
      originalPrice: 2500,
      discount: '20% OFF',
      validity: 'Valid till: 31st December 2025',
      features: [
        'Express Facial',
        'Manicure',
        'Threading',
        'Blow Dry'
      ],
      gradient: 'from-cyan-400 via-sky-500 to-blue-600'
    }
  ]

  const bookOffer = (offerTitle) => {
    setSelectedOffer(offerTitle)
    alert(`Thank you! You have selected "${offerTitle}".\nWe will contact you soon.`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-yellow-500/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        {/* Header */}
        <header className="text-center mb-16 animate-fade-in-down">
          <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-green-400 via-cyan-500 to-pink-500 bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
            ✨ SPECIAL OFFERS ✨
          </h1>
          <p className="text-xl md:text-2xl text-cyan-400 drop-shadow-[0_0_10px_rgba(0,245,255,0.5)]">
            Limited Time Amazing Deals
          </p>
        </header>

        {/* Offers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {offers.map((offer, index) => (
            <div
              key={offer.id}
              className="group bg-white/5 backdrop-blur-lg rounded-3xl overflow-hidden border-2 border-transparent hover:border-white/30 transition-all duration-500 hover:-translate-y-4 hover:shadow-[0_25px_60px_rgba(0,245,255,0.4)] animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Card Header */}
              <div className={`relative bg-gradient-to-br ${offer.gradient} p-8 text-center overflow-hidden`}>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer"></div>
                
                {/* Discount Badge */}
                <span className="absolute top-5 right-5 bg-gradient-to-r from-pink-500 to-orange-500 text-white px-5 py-2 rounded-full font-bold shadow-lg shadow-pink-500/50 animate-pulse">
                  {offer.discount}
                </span>

                <h2 className="text-3xl font-bold mb-4 text-white relative z-10">
                  {offer.title}
                </h2>
                
                <div className="text-5xl font-bold text-white relative z-10 drop-shadow-[0_0_20px_rgba(255,255,255,0.5)]">
                  Rs. {offer.price.toLocaleString()}
                  <span className="text-xl line-through opacity-70 ml-3">
                    Rs. {offer.originalPrice.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-8">
                {/* Validity */}
                <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 text-yellow-400 px-4 py-3 rounded-xl text-center mb-6 font-medium">
                  ⏰ {offer.validity}
                </div>

                {/* Features List */}
                <ul className="space-y-3 mb-8">
                  {offer.features.map((feature, idx) => (
                    <li
                      key={idx}
                      className="flex items-center text-white text-lg hover:text-cyan-400 hover:translate-x-2 transition-all duration-300"
                    >
                      <span className="text-green-400 text-2xl mr-3 drop-shadow-[0_0_10px_rgba(0,242,96,0.8)]">
                        ✓
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* Book Button */}
                <button
                  onClick={() => bookOffer(offer.title)}
                  className="w-full bg-gradient-to-r from-green-400 to-blue-500 text-white py-4 rounded-2xl text-xl font-bold shadow-lg shadow-green-500/40 hover:shadow-green-500/60 hover:scale-105 transition-all duration-300 relative overflow-hidden group"
                >
                  <span className="relative z-10">Book Now</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Terms */}
        <div className="text-center text-cyan-400 text-lg opacity-80 drop-shadow-[0_0_10px_rgba(0,245,255,0.3)]">
          * Terms and conditions apply. Offers cannot be combined with other promotions.
        </div>
      </div>

      <style jsx>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }

        @keyframes fade-in-down {
          from {
            opacity: 0;
            transform: translateY(-40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-gradient {
          animation: gradient 5s ease infinite;
        }

        .animate-shimmer {
          animation: shimmer 3s infinite;
        }

        .animate-fade-in-down {
          animation: fade-in-down 0.8s ease;
        }

        .animate-fade-in-up {
          opacity: 0;
          animation: fade-in-up 0.8s ease forwards;
        }

        .delay-1000 {
          animation-delay: 1s;
        }

        .delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </div>
  )
}