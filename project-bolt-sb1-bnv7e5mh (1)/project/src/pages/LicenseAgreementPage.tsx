import React from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, FileText, Check } from 'lucide-react';

interface License {
  name: string;
  price: number;
  features: string[];
  restrictions?: string[];
}

const LicenseAgreementPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const license = location.state?.license as License;

  if (!license) {
    return (
      <section className="pt-32 pb-20 bg-dark-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl font-display font-bold mb-6">No License Selected</h1>
            <p className="text-gray-300 mb-8">
              Please select a license from our available options to view the agreement.
            </p>
            <Link 
              to="/licenses" 
              className="btn-primary inline-flex items-center"
            >
              <ArrowLeft size={16} className="mr-2" /> View Available Licenses
            </Link>
          </div>
        </div>
      </section>
    );
  }

  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <section className="pt-32 pb-20 bg-dark-900">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <Link to="/licenses" className="inline-flex items-center text-primary-500 hover:text-primary-400 mb-6">
            <ArrowLeft size={16} className="mr-2" /> Back to Licenses
          </Link>

          <div className="bg-dark-800 p-8 rounded-lg mb-8">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-3xl font-display font-bold">{license.name} Agreement</h1>
              <FileText size={24} className="text-primary-500" />
            </div>

            <div className="prose prose-invert prose-primary max-w-none">
              <p className="text-gray-300">
                This License Agreement (the "Agreement") is made effective as of {currentDate} by and between:
              </p>

              <div className="my-6">
                <p className="font-bold">BLAIRING RECORDS ("Licensor")</p>
                <p className="text-gray-300">represented by WTD.TY</p>
              </div>

              <div className="my-6">
                <p className="font-bold">AND</p>
                <p className="text-gray-300">The purchaser of the beat ("Licensee")</p>
              </div>

              <h2 className="text-xl font-bold mt-8 mb-4">1. License Grant</h2>
              <p>
                Upon purchase of the {license.name.toLowerCase()}, the Licensor grants to Licensee a non-exclusive license to use the musical composition (the "Beat") in accordance with the terms and conditions specified in this Agreement.
              </p>

              <h2 className="text-xl font-bold mt-8 mb-4">2. Permitted Uses</h2>
              <ul className="space-y-2">
                {license.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <Check size={16} className="text-primary-500 mt-1 mr-2 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <h2 className="text-xl font-bold mt-8 mb-4">3. Restrictions</h2>
              {(license.restrictions?.length ?? 0) > 0 ? (
                <ul className="space-y-2">
                  {license.restrictions?.map((restriction, index) => (
                    <li key={index} className="text-gray-300">• {restriction}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-300">No additional restrictions apply to this license type.</p>
              )}

              <h2 className="text-xl font-bold mt-8 mb-4">4. Credit and Attribution</h2>
              <p>
                Unless explicitly stated otherwise in the license features, the Licensee must provide credit to the Licensor as "Prod. by WTD.TY" in all uses of the Beat.
              </p>

              <h2 className="text-xl font-bold mt-8 mb-4">5. Term and Termination</h2>
              <p>
                This Agreement shall commence upon the purchase of the license and shall continue in perpetuity unless terminated due to breach of agreement terms.
              </p>

              <h2 className="text-xl font-bold mt-8 mb-4">6. Ownership</h2>
              <p>
                The Licensor maintains all ownership rights to the Beat, including but not limited to the copyright to the composition. The Licensee's rights to the Beat are limited to those expressly stated in this Agreement.
              </p>

              <h2 className="text-xl font-bold mt-8 mb-4">7. Payment</h2>
              <p>
                The license is granted in consideration of the payment of ${license.price}, which shall be paid in full at the time of purchase.
              </p>

              <h2 className="text-xl font-bold mt-8 mb-4">8. Governing Law</h2>
              <p>
                This Agreement shall be governed by and construed in accordance with the laws of the United States of America.
              </p>

              <div className="mt-12 p-6 bg-primary-900/20 border border-primary-800 rounded-lg">
                <h3 className="text-lg font-bold mb-4">Ready to Purchase?</h3>
                <p className="mb-4">
                  By purchasing this license, you agree to all terms and conditions outlined in this agreement.
                </p>
                <Link 
                  to="/beats" 
                  className="btn-primary inline-flex items-center"
                >
                  Browse Beats
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LicenseAgreementPage;