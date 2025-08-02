import React from 'react';

const CardShowcase = () => {
  const cards = [
    {
      tier: 'Elite',
      name: 'Mariam Koné',
      borderColor: '#ffcf08',
      zenikaColor: '#277732',
      background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)'
    },
    {
      tier: 'Premium', 
      name: 'Moussa Ballo',
      borderColor: '#22c55e',
      zenikaColor: '#ffcf08',
      background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)'
    },
    {
      tier: 'Essential',
      name: 'Ousmane Traoré',
      borderColor: '#3b82f6',
      zenikaColor: '#b4121d',
      background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)'
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-purple-50 to-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Your Membership, Your Identity
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Experience the prestige of ZENIKA membership cards designed for the modern African professional
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {cards.map((card, index) => (
            <div key={index} className="flex justify-center">
              <div 
                className="relative overflow-hidden rounded-2xl shadow-2xl transition-all duration-300 hover:shadow-3xl hover:scale-105"
                style={{
                  border: `4px solid ${card.borderColor}`,
                  background: card.background,
                  aspectRatio: '1.6/1',
                  width: '320px'
                }}
              >
                {/* Blue wave section */}
                <div className="absolute inset-0">
                  <div className="absolute inset-0 bg-white"></div>
                  <svg viewBox="0 0 400 250" className="w-full h-full absolute">
                    <path d="M0,100 Q200,60 400,90 L400,250 L0,250 Z" fill="#3b82f6" />
                  </svg>
                </div>
                
                {/* Globe and hand logo */}
                <div className="absolute top-6 right-6 w-14 h-14">
                  <div className="relative w-full h-full">
                    {/* Hand circle */}
                    <div className="absolute inset-0 bg-blue-500 rounded-full"></div>
                    {/* Globe */}
                    <div className="absolute top-1 right-1 w-9 h-9 bg-green-500 rounded-full flex items-center justify-center">
                      <div className="w-6 h-6 bg-white rounded-full"></div>
                    </div>
                  </div>
                </div>

                <div className="relative p-6 h-full flex flex-col">
                  {/* ZENIKA Header */}
                  <div className="mb-4">
                    <h2 className="text-3xl font-bold tracking-wider" style={{ color: card.zenikaColor }}>
                      ZENIKA
                    </h2>
                  </div>

                  {/* Member Info */}
                  <div className="mt-auto text-white pb-4">
                    <div className="mb-4">
                      <h3 className="text-xl font-semibold mb-1">{card.name}</h3>
                      <p className="text-base opacity-95 mb-1">Status: {card.tier}</p>
                      <p className="text-base opacity-95 mb-2">Sokorodji, Bamako, Mali</p>
                    </div>
                    
                    <div className="flex items-end justify-between">
                      <div>
                        <p className="text-sm opacity-90">ID: ML-2025896550</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-lg font-bold">03/26</span>
                        {/* QR Code */}
                        <div className="w-12 h-12 bg-white rounded-sm border-2 border-black p-1">
                          <div className="w-full h-full bg-black rounded-sm grid grid-cols-3 grid-rows-3 gap-0.5">
                            {[...Array(9)].map((_, i) => (
                              <div key={i} className={`${i % 2 === 0 ? 'bg-white' : 'bg-black'} rounded-sm`}></div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="inline-flex items-center gap-4 bg-white rounded-full px-8 py-4 shadow-lg">
            <span className="text-gray-600">Join the community of successful professionals</span>
            <button className="bg-purple-600 text-white px-6 py-2 rounded-full hover:bg-purple-700 transition-colors">
              Get Your Card
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CardShowcase;