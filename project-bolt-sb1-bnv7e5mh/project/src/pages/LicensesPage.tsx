import React from 'react';
import { ArrowLeft, Check } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const LicensesPage = () => {
  const navigate = useNavigate();
  
  const licenses = [
    {
      name: "Basic License",
      price: 29.99,
      features: [
        "MP3 File",
        "For non-profit use only",
        "Up to 10,000 streams",
        "Credit required (Prod. by WTD.TY)",
        "1 music video"
      ],
      restrictions: [
        "No radio broadcasting",
        "No distribution rights",
        "No commercial use"
      ]
    },
    {
      name: "Premium License",
      price: 69.99,
      popular: true,
      features: [
        "MP3 & WAV Files",
        "For commercial use",
        "Up to 100,000 streams",
        "Credit required (Prod. by WTD.TY)",
        "1 music video",
        "Radio broadcasting",
        "Distribution on all platforms"
      ],
      restrictions: [
        "No exclusive rights",
        "Beat remains in catalog"
      ]
    },
    {
      name: "Unlimited License",
      price: 149.99,
      features: [
        "MP3, WAV & Trackout Files",
        "Unlimited commercial use",
        "Unlimited streams",
        "Credit required (Prod. by WTD.TY)",
        "Multiple music videos",
        "Radio broadcasting",
        "Worldwide distribution rights"
      ],
      restrictions: [
        "No exclusive rights",
        "Beat remains in catalog"
      ]
    },
    {
      name: "Exclusive Rights",
      price: 499.99,
      features: [
        "MP3, WAV & Trackout Files",
        "Full exclusive ownership",
        "Beat removed from catalog",
        "Unlimited streams and sales",
        "Multiple music videos",
        "Radio broadcasting",
        "Worldwide distribution rights",
        "No credit required (optional)"
      ],
      restrictions: []
    }
  ];

  const handleLicenseSelect = (license: any) => {
    navigate('/license-agreement', { state: { license } });
  };

  return (
    <section className="pt-32 pb-20 bg-dark-900">
      <div className="container mx-auto px-4">
        <Link to="/" className="inline-flex items-center text-primary-500 hover:text-primary-400 mb-6">
          <ArrowLeft size={16} className="mr-2" /> Back to Home
        </Link>
        
        <h1 className="text-4xl font-display font-bold mb-4">Licensing Options</h1>
        <p className="text-gray-300 max-w-3xl mb-12">
          Choose the right license for your project. Each license grants different usage rights. 
          For custom licensing options or questions, please contact us.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {licenses.map((license, index) => (
            <div 
              key={index} 
              className={`relative bg-dark-800 rounded-lg overflow-hidden border ${license.popular ? 'border-primary-500' : 'border-dark-700'}`}
            >
              {license.popular && (
                <div className="absolute top-0 right-0 bg-primary-500 text-dark-900 font-bold text-xs py-1 px-3 rounded-bl-lg">
                  MOST POPULAR
                </div>
              )}
              <div className="p-6">
                <h3 className="font-display text-xl font-bold mb-1">{license.name}</h3>
                <div className="flex items-end mb-6">
                  <span className="text-3xl font-display font-bold">${license.price}</span>
                  <span className="text-gray-400 ml-1 mb-1">one-time</span>
                </div>
                
                <ul className="space-y-3 mb-6">
                  {license.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <Check size={16} className="text-primary-500 mt-1 mr-2 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                {license.restrictions.length > 0 && (
                  <div className="mb-6">
                    <h4 className="font-bold text-sm text-gray-400 mb-2">Restrictions:</h4>
                    <ul className="space-y-2">
                      {license.restrictions.map((restriction, idx) => (
                        <li key={idx} className="text-sm text-gray-400">
                          • {restriction}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                <button 
                  onClick={() => handleLicenseSelect(license)}
                  className={`w-full py-2 px-4 rounded-md font-medium ${
                    license.popular 
                      ? 'bg-primary-600 hover:bg-primary-700 text-white' 
                      : 'bg-dark-700 hover:bg-dark-600 text-white'
                  } transition duration-300`}
                >
                  View License Agreement
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 max-w-3xl">
          <h2 className="text-2xl font-display font-bold mb-6">License FAQ</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="font-bold text-lg mb-2">What's the difference between the licenses?</h3>
              <p className="text-gray-300">
                Each license tier offers different usage rights. Basic licenses are for non-profit use with limited streams, 
                while Premium and Unlimited licenses allow for commercial use with increasing stream limits and features. 
                Exclusive rights give you full ownership of the beat, which will be removed from our catalog.
              </p>
            </div>
            
            <div>
              <h3 className="font-bold text-lg mb-2">What are trackout files?</h3>
              <p className="text-gray-300">
                Trackout files are individual stems of the beat (separate tracks for drums, bass, melody, etc.), 
                allowing you to mix the beat to your preference or have your engineer create a custom mix.
              </p>
            </div>
            
            <div>
              <h3 className="font-bold text-lg mb-2">Can I upgrade my license later?</h3>
              <p className="text-gray-300">
                Yes, you can upgrade from a lower tier to a higher tier by paying the difference between the two license prices. 
                Contact us for upgrade options.
              </p>
            </div>
            
            <div>
              <h3 className="font-bold text-lg mb-2">Do I need to give credit with all licenses?</h3>
              <p className="text-gray-300">
                Yes, producer credit (Prod. by WTD.TY) is required for all licenses except the Exclusive Rights license, 
                where credit is appreciated but optional.
              </p>
            </div>
          </div>
          
          <div className="mt-12 bg-dark-800 p-8 rounded-lg">
            <h3 className="font-display text-xl font-bold mb-4">Need a Custom License?</h3>
            <p className="text-gray-300 mb-6">
              If none of our standard licenses meet your needs, we can create a custom licensing agreement for your specific project.
            </p>
            <Link to="/contact" className="btn-primary inline-flex">
              Contact Us for Custom Licensing
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LicensesPage;