import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { AssessmentProvider } from './context/AssessmentContext';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CrisisHelplineModal from './components/CrisisHelplineModal';
import ProfileModal from './components/ProfileModal';
import EnquiryModal from './components/EnquiryModal';
import FeedbackModal from './components/FeedbackModal';
import ReportIssueModal from './components/ReportIssueModal';
import QuickUserActionsWidget from './components/QuickUserActionsWidget';

import LandingPage from './pages/LandingPage';
import ProductPage from './pages/ProductPage';
import TechnologyPage from './pages/TechnologyPage';
import UseCasesPage from './pages/UseCasesPage';
import ResearchPage from './pages/ResearchPage';
import PricingPage from './pages/PricingPage';
import AdminPortalPage from './pages/AdminPortalPage';

import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import AssessmentPage from './pages/AssessmentPage';
import ExplainabilityPage from './pages/ExplainabilityPage';
import AssessmentResultsPage from './pages/AssessmentResultsPage';
import AssessmentHistoryPage from './pages/AssessmentHistoryPage';
import WellnessPage from './pages/WellnessPage';
import CrisisSupportPage from './pages/CrisisSupportPage';
import NotFoundPage from './pages/NotFoundPage';

import { useVisitorTracker } from './hooks/useVisitorTracker';

// Helper component to scroll to top or hash anchor on route changes
function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      setTimeout(() => {
        const el = document.getElementById(hash.replace('#', ''));
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 50);
      return;
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}

function MainLayout() {
  const [helplineModalOpen, setHelplineModalOpen] = useState(false);
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [profileInitialTab, setProfileInitialTab] = useState('profile');
  const [enquiryModalOpen, setEnquiryModalOpen] = useState(false);
  const [feedbackModalOpen, setFeedbackModalOpen] = useState(false);
  const [issueModalOpen, setIssueModalOpen] = useState(false);

  // Automatically track visitor telemetry & new vs returning visitors
  useVisitorTracker();

  const handleOpenProfile = (tab = 'profile') => {
    setProfileInitialTab(tab);
    setProfileModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#EEF5FD] text-slate-900 antialiased selection:bg-blue-100 selection:text-blue-900 font-sans">
      <ScrollToTop />
      
      {/* Sticky Modern Calming Navbar with Active Underline Indicator */}
      <Navbar 
        onOpenHelpline={() => setHelplineModalOpen(true)}
        onOpenProfile={handleOpenProfile}
      />

      {/* Main Page Route View */}
      <main className="flex-1 flex flex-col">
        <Routes>
          {/* Main 6 Navbar Routes */}
          <Route path="/" element={<LandingPage onOpenHelpline={() => setHelplineModalOpen(true)} />} />
          <Route path="/product" element={<ProductPage />} />
          <Route path="/technology" element={<TechnologyPage />} />
          <Route path="/research" element={<ResearchPage />} />
          <Route path="/use-cases" element={<UseCasesPage />} />
          <Route path="/pricing" element={<PricingPage onOpenHelpline={() => setHelplineModalOpen(true)} />} />
          
          {/* Host Admin Portal Route */}
          <Route path="/admin" element={<AdminPortalPage />} />
          <Route path="/admin-portal" element={<Navigate to="/admin" replace />} />

          {/* Functional Application Pages */}
          <Route path="/assessment" element={<AssessmentPage />} />
          <Route path="/explainable-ai" element={<ExplainabilityPage />} />
          <Route path="/explainability" element={<Navigate to="/technology" replace />} />
          <Route 
            path="/dashboard" 
            element={
              <DashboardPage 
                onOpenHelpline={() => setHelplineModalOpen(true)}
                onOpenProfile={handleOpenProfile}
              />
            } 
          />
          <Route path="/results/:id" element={<AssessmentResultsPage />} />
          <Route path="/history" element={<AssessmentHistoryPage />} />
          <Route path="/wellness" element={<WellnessPage onOpenHelpline={() => setHelplineModalOpen(true)} />} />
          <Route path="/crisis-support" element={<CrisisSupportPage />} />
          
          {/* Authentication Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          
          {/* 404 Not Found Route */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      {/* Modern Nexora & Research Footer */}
      <Footer onOpenHelpline={() => setHelplineModalOpen(true)} />

      {/* Quick User Assistance Floating Widget */}
      <QuickUserActionsWidget
        onOpenEnquiry={() => setEnquiryModalOpen(true)}
        onOpenFeedback={() => setFeedbackModalOpen(true)}
        onOpenIssue={() => setIssueModalOpen(true)}
      />

      {/* User Enquiry Modal */}
      <EnquiryModal
        isOpen={enquiryModalOpen}
        onClose={() => setEnquiryModalOpen(false)}
      />

      {/* User Feedback Modal */}
      <FeedbackModal
        isOpen={feedbackModalOpen}
        onClose={() => setFeedbackModalOpen(false)}
      />

      {/* User Report Issue Modal */}
      <ReportIssueModal
        isOpen={issueModalOpen}
        onClose={() => setIssueModalOpen(false)}
      />

      {/* 24/7 Mental Health Emergency Crisis Modal */}
      <CrisisHelplineModal
        isOpen={helplineModalOpen}
        onClose={() => setHelplineModalOpen(false)}
      />

      {/* Profile & Privacy Settings Modal */}
      <ProfileModal
        isOpen={profileModalOpen}
        onClose={() => setProfileModalOpen(false)}
        initialTab={profileInitialTab}
      />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AssessmentProvider>
        <BrowserRouter>
          <MainLayout />
        </BrowserRouter>
      </AssessmentProvider>
    </AuthProvider>
  );
}
