import React from 'react';
import { Truck, CreditCard, Shield, HeartHandshake } from 'lucide-react';

const Features = () => {
  const featuresList = [
    {
      icon: Truck,
      title: 'Free Shipping',
      description: 'Free worldwide shipping on all orders over $100.'
    },
    {
      icon: CreditCard,
      title: 'Secure Payment',
      description: 'Multiple secure payment methods with SSL encryption.'
    },
    {
      icon: Shield,
      title: 'Quality Guarantee',
      description: '30-day money-back guarantee on all products.'
    },
    {
      icon: HeartHandshake,
      title: 'Customer Support',
      description: '24/7 dedicated customer support for your convenience.'
    }
  ];

  return (
    <section id='About' className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Choose Us
          </h2>
          <p className="text-xl text-gray-600">
            We're committed to providing an exceptional shopping experience
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuresList.map((feature, index) => (
            <div 
              key={index} data-aos="flip-up"
              className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-xl transition duration-300"
            >
              <div className="bg-orange-500 p-4 rounded-full inline-block mb-4">
                <feature.icon size={40} className="text-orange-100" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;