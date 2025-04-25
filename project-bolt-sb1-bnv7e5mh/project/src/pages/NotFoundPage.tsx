import React from 'react';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <section className="min-h-screen pt-32 pb-20 bg-dark-900 flex items-center">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-9xl font-display font-bold text-primary-500 mb-6">404</h1>
        <h2 className="text-4xl font-display font-bold mb-4">Page Not Found</h2>
        <p className="text-gray-300 max-w-md mx-auto mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link to="/" className="btn-primary inline-flex items-center">
          <Home size={16} className="mr-2" />
          Back to Homepage
        </Link>
      </div>
    </section>
  );
};

export default NotFoundPage;