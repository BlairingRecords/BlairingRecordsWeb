import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Pages
import Home from './pages/Home';
import BeatsPage from './pages/BeatsPage';
import ContactPage from './pages/ContactPage';
import TermsPage from './pages/TermsPage';
import PrivacyPage from './pages/PrivacyPage';
import LicensesPage from './pages/LicensesPage';
import LicenseAgreementPage from './pages/LicenseAgreementPage';
import LicenseSignaturePage from './pages/LicenseSignaturePage';
import NotFoundPage from './pages/NotFoundPage';
import CheckoutPage from './pages/CheckoutPage';
import DownloadPage from './pages/DownloadPage';

// Layout
import Layout from './components/Layout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="beats" element={<BeatsPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="terms" element={<TermsPage />} />
          <Route path="privacy" element={<PrivacyPage />} />
          <Route path="licenses" element={<LicensesPage />} />
          <Route path="license-agreement" element={<LicenseAgreementPage />} />
          <Route path="license-signature" element={<LicenseSignaturePage />} />
          <Route path="checkout" element={<CheckoutPage />} />
          <Route path="download" element={<DownloadPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;