import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Menu,
  X,
  ArrowRight,
  User,
  LogOut,
  ChevronDown,
  LayoutDashboard,
  HeartHandshake,
  ShieldCheck
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Navbar({ onOpenHelpline, onOpenProfile }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();

  const navItems = [
    { id: 'home', name: 'Home', path: '/' },
    { id: 'product', name: 'Product', path: '/product' },
    { id: 'technology', name: 'Technology', path: '/technology' },
    { id: 'research', name: 'Research', path: '/research' },
    { id: 'use-cases', name: 'Use Cases', path: '/use-cases' },
    { id: 'pricing', name: 'Pricing', path: '/pricing' },
  ];

  // Precise active check matching each route and affiliated pages
  const isNavActive = (item) => {
    if (item.path === '/' && location.pathname === '/') return true;
    if (item.path !== '/' && (location.pathname === item.path || location.pathname.startsWith(item.path + '/'))) return true;

    // Sub-route affiliations
    if (item.id === 'product' && location.pathname === '/assessment') return true;
    if (item.id === 'technology' && (location.pathname === '/explainable-ai' || location.pathname === '/explainability')) return true;
    if (item.id === 'research' && location.pathname === '/research') return true;
    if (item.id === 'use-cases' && (location.pathname === '/dashboard' || location.pathname === '/history' || location.pathname.startsWith('/results/'))) return true;
    if (item.id === 'pricing' && (location.pathname === '/wellness' || location.pathname === '/crisis-support')) return true;

    return false;
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white/70 backdrop-blur-md border-b border-blue-100/50 transition-all">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-20">

          {/* Nexora Logo & Brand */}
          <Link
            to="/"
            className="flex items-center gap-2.5 group focus:outline-none"
          >
            <div className="w-8 h-8 flex items-center justify-center transition-transform duration-200 group-hover:scale-105">
              <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 drop-shadow-sm">
                <defs>
                  <linearGradient id="nexoraBlueGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#2563EB" />
                    <stop offset="50%" stopColor="#3B82F6" />
                    <stop offset="100%" stopColor="#60A5FA" />
                  </linearGradient>
                </defs>
                <path
                  d="M9 27L9 11C9 8.8 11.2 7 13.5 8.5L22.5 14.5C24.8 16 27 14.2 27 12V25"
                  stroke="url(#nexoraBlueGrad)"
                  strokeWidth="5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <span className="font-bold text-2xl text-slate-900 tracking-tight font-sans">
              Nexora
            </span>
          </Link>

          {/* Desktop Center Navigation Hyperlinks matching user's template */}
          <nav className="hidden md:flex items-center gap-8 lg:gap-11">
            {navItems.map((item) => {
              const active = isNavActive(item);
              return (
                <Link
                  key={item.id}
                  to={item.path}
                  className={`text-sm tracking-normal transition-all relative py-2 ${active
                    ? 'text-slate-950 font-bold'
                    : 'text-slate-600 hover:text-slate-950 font-medium'
                    }`}
                >
                  {item.name}
                  {active && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-blue-600 rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Items */}
          <div className="hidden md:flex items-center gap-4">
            {/* Live AI Status Pill */}
            <div className="hidden lg:flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50/90 border border-emerald-200/70 text-[11px] font-semibold text-emerald-700 select-none shadow-sm" title="DSP Audio & FACS Vision Engines Online">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>AI Engine: Active</span>
            </div>

            {/* Crisis Support Hotline Link */}
            <button
              type="button"
              onClick={onOpenHelpline}
              className="text-xs font-semibold px-3 py-1.5 rounded-full text-rose-700 bg-rose-50/80 hover:bg-rose-100 border border-rose-200/60 transition-colors flex items-center gap-1.5"
              title="24/7 Mental Health Emergency Helpline"
            >
              <HeartHandshake className="w-3.5 h-3.5 text-rose-500" />
              <span>Crisis Support</span>
            </button>

            {isAuthenticated ? (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center gap-2.5 py-1.5 px-3 rounded-full hover:bg-white transition-colors border border-slate-200 bg-white/70 shadow-sm"
                  aria-expanded={profileDropdownOpen}
                >
                  <div className="w-7 h-7 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center">
                    {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                  </div>
                  <span className="text-xs font-semibold text-slate-800 max-w-[120px] truncate">
                    {user?.name || 'Account'}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {profileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-52 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50 text-xs animate-in fade-in zoom-in-95 duration-100">
                    <div className="px-3 py-2 border-b border-slate-100">
                      <p className="font-bold text-slate-900 truncate">{user?.name || 'Signed In'}</p>
                      <p className="text-slate-500 text-[11px] truncate">{user?.email || 'user@nexora.ai'}</p>
                    </div>

                    <Link
                      to="/dashboard"
                      onClick={() => setProfileDropdownOpen(false)}
                      className="w-full text-left px-3 py-2 text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                    >
                      <LayoutDashboard className="w-4 h-4 text-blue-600" />
                      <span>Telemetry Dashboard</span>
                    </Link>

                    <Link
                      to="/admin"
                      onClick={() => setProfileDropdownOpen(false)}
                      className="w-full text-left px-3 py-2 text-slate-700 hover:bg-slate-50 flex items-center gap-2 font-semibold text-blue-600"
                    >
                      <ShieldCheck className="w-4 h-4 text-blue-600" />
                      <span>Host Admin Portal</span>
                    </Link>

                    <button
                      type="button"
                      onClick={() => {
                        setProfileDropdownOpen(false);
                        if (onOpenProfile) onOpenProfile();
                      }}
                      className="w-full text-left px-3 py-2 text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                    >
                      <User className="w-4 h-4 text-slate-500" />
                      <span>Profile Settings</span>
                    </button>

                    <div className="border-t border-slate-100 mt-1 pt-1">
                      <button
                        type="button"
                        onClick={() => {
                          setProfileDropdownOpen(false);
                          logout();
                          navigate('/');
                        }}
                        className="w-full text-left px-3 py-2 text-rose-600 hover:bg-rose-50 flex items-center gap-2"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="text-sm font-medium text-slate-700 hover:text-slate-950 transition-colors"
              >
                Login
              </Link>
            )}

            <Link
              to="/assessment"
              className="inline-flex items-center gap-2 bg-[#0B0F19] hover:bg-slate-800 text-white text-sm font-medium px-5 py-2.5 rounded-full shadow-sm hover:shadow transition-all group"
            >
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-700 hover:bg-white/80 transition-colors focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-xl border-b border-slate-200/80 px-6 py-5 space-y-4">
          <nav className="flex flex-col space-y-3">
            {navItems.map((item) => {
              const active = isNavActive(item);
              return (
                <Link
                  key={item.id}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-base py-1.5 transition-colors flex items-center justify-between ${active ? 'text-blue-600 font-bold' : 'text-slate-700 font-medium'
                    }`}
                >
                  <span>{item.name}</span>
                  {active && <span className="w-2 h-2 rounded-full bg-blue-600"></span>}
                </Link>
              );
            })}
          </nav>

          <div className="pt-4 border-t border-slate-100 flex flex-col gap-2.5">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenHelpline();
              }}
              className="w-full py-2.5 text-center text-xs font-semibold text-rose-700 bg-rose-50 rounded-full flex items-center justify-center gap-1.5"
            >
              <HeartHandshake className="w-4 h-4 text-rose-500" />
              <span>24/7 Crisis Support Helpline</span>
            </button>

            {!isAuthenticated ? (
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-2.5 text-center text-sm font-semibold text-slate-700 bg-slate-100 rounded-full hover:bg-slate-200 transition-colors"
              >
                Login
              </Link>
            ) : (
              <Link
                to="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-2.5 text-center text-sm font-semibold text-slate-700 bg-slate-100 rounded-full hover:bg-slate-200 transition-colors"
              >
                Go to Dashboard
              </Link>
            )}

            <Link
              to="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-2.5 text-center text-sm font-semibold text-blue-700 bg-blue-50 rounded-full hover:bg-blue-100 transition-colors flex items-center justify-center gap-1.5"
            >
              <ShieldCheck className="w-4 h-4 text-blue-600" />
              <span>Host Admin Portal</span>
            </Link>

            <Link
              to="/assessment"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-2.5 text-center text-sm font-semibold text-white bg-[#0B0F19] rounded-full hover:bg-slate-800 transition-colors flex items-center justify-center gap-1.5"
            >
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
