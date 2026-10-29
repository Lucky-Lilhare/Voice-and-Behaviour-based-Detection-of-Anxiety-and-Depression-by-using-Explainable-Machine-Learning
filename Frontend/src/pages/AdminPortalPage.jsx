import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  Users, 
  UserPlus, 
  UserCheck, 
  Mail, 
  MessageSquare, 
  AlertTriangle, 
  Database, 
  RefreshCw, 
  Download, 
  Search, 
  Filter, 
  CheckCircle2, 
  Clock, 
  Star, 
  Laptop, 
  Smartphone, 
  Tablet, 
  ExternalLink,
  ChevronRight,
  TrendingUp,
  Activity,
  Sparkles,
  Bug,
  Eye,
  EyeOff,
  Lock,
  Unlock,
  Key,
  User,
  SlidersHorizontal,
  Flame,
  Globe,
  FileSpreadsheet,
  Layers,
  Terminal,
  Copy,
  Code2,
  Table,
  FileJson,
  Check,
  Radio
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell,
  Legend 
} from 'recharts';
import { api } from '../services/api';

const COLORS = ['#2563EB', '#10B981', '#F59E0B', '#8B5CF6', '#EC4899'];

export default function AdminPortalPage() {
  const [isAuthenticatedHost, setIsAuthenticatedHost] = useState(() => Boolean(api.getAdminToken()));
  const [checkingAuth, setCheckingAuth] = useState(true);

  // Host login credentials state
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberHost, setRememberHost] = useState(true);
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState('');

  const [activeTab, setActiveTab] = useState('overview'); // overview, enquiries, feedback, issues, visitors, database
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [stats, setStats] = useState(null);
  const [enquiries, setEnquiries] = useState([]);
  const [feedback, setFeedback] = useState([]);
  const [issues, setIssues] = useState([]);
  const [visitors, setVisitors] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [severityFilter, setSeverityFilter] = useState('All');
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalType, setModalType] = useState(null); // 'enquiry', 'issue', 'feedback'
  const [updatingStatus, setUpdatingStatus] = useState(false);
  const [messageToast, setMessageToast] = useState('');

  // Live MongoDB Database section states
  const [dbViewData, setDbViewData] = useState(null);
  const [selectedDbCollection, setSelectedDbCollection] = useState('all');
  const [dbViewMode, setDbViewMode] = useState('table'); // 'table' | 'raw'
  const [dbSearch, setDbSearch] = useState('');
  const [dbStatusFilter, setDbStatusFilter] = useState('All');
  const [dbAutoSync, setDbAutoSync] = useState(true);
  const [selectedDbDoc, setSelectedDbDoc] = useState(null);
  const [copiedDocId, setCopiedDocId] = useState(null);

  const showToast = (msg) => {
    setMessageToast(msg);
    setTimeout(() => setMessageToast(''), 3000);
  };

  const handleCopyJSON = (data, id = 'all') => {
    try {
      navigator.clipboard.writeText(JSON.stringify(data, null, 2));
      setCopiedDocId(id);
      showToast('Copied exact MongoDB document to clipboard!');
      setTimeout(() => setCopiedDocId(null), 2000);
    } catch (err) {
      console.error('Failed to copy JSON:', err);
    }
  };

  const loadAllData = async () => {
    try {
      setRefreshing(true);
      const [statsData, enquiriesData, feedbackData, issuesData, visitorsData, liveDbData] = await Promise.all([
        api.getAdminStats().catch((err) => {
          if (err.message === 'UNAUTHORIZED') {
            setIsAuthenticatedHost(false);
          }
          return null;
        }),
        api.getEnquiries().catch(() => ({ enquiries: [] })),
        api.getFeedback().catch(() => ({ feedbacks: [] })),
        api.getIssues().catch(() => ({ issues: [] })),
        api.getRecentVisitors(100).catch(() => ({ visitors: [] })),
        api.getDatabaseView().catch(() => null),
      ]);

      if (statsData) setStats(statsData);
      if (enquiriesData?.enquiries) setEnquiries(enquiriesData.enquiries);
      if (feedbackData?.feedbacks) setFeedback(feedbackData.feedbacks);
      if (issuesData?.issues) setIssues(issuesData.issues);
      if (visitorsData?.visitors) setVisitors(visitorsData.visitors);
      if (liveDbData) setDbViewData(liveDbData);
    } catch (err) {
      console.error('Failed to load admin portal data:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // Background auto-sync poll for live MongoDB additions
  useEffect(() => {
    if (!isAuthenticatedHost || !dbAutoSync) return;
    const interval = setInterval(async () => {
      try {
        const liveDb = await api.getDatabaseView();
        if (liveDb) setDbViewData(liveDb);
      } catch {
        // quiet sync
      }
    }, 6000);
    return () => clearInterval(interval);
  }, [isAuthenticatedHost, dbAutoSync]);

  useEffect(() => {
    const checkHostSession = async () => {
      const hasToken = api.getAdminToken();
      if (!hasToken) {
        setIsAuthenticatedHost(false);
        setCheckingAuth(false);
        setLoading(false);
        return;
      }
      const isValid = await api.verifyAdminSession();
      if (isValid) {
        setIsAuthenticatedHost(true);
        loadAllData();
      } else {
        api.clearAdminToken();
        setIsAuthenticatedHost(false);
        setLoading(false);
      }
      setCheckingAuth(false);
    };
    checkHostSession();
  }, []);

  const handleHostLogin = async (e) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError('');

    try {
      await api.adminLogin(loginUsername, loginPassword, rememberHost);
      setIsAuthenticatedHost(true);
      showToast('Authenticated as Platform Host!');
      await loadAllData();
    } catch (err) {
      setLoginError(err.message || 'Invalid host credentials. Please check your username and password.');
    } finally {
      setLoginLoading(false);
    }
  };

  const handleHostLogout = async () => {
    await api.adminLogout();
    setIsAuthenticatedHost(false);
    setStats(null);
    showToast('Host signed out. Admin portal locked.');
  };

  const handleUpdateEnquiryStatus = async (id, newStatus) => {
    try {
      setUpdatingStatus(true);
      await api.updateEnquiryStatus(id, newStatus);
      setEnquiries(prev => prev.map(e => (e._id === id || e.id === id) ? { ...e, status: newStatus } : e));
      if (selectedItem && (selectedItem._id === id || selectedItem.id === id)) {
        setSelectedItem(prev => ({ ...prev, status: newStatus }));
      }
      showToast(`Enquiry status changed to ${newStatus}`);
    } catch (err) {
      console.error(err);
    } finally {
      setUpdatingStatus(false);
    }
  };

  const handleUpdateIssueStatus = async (id, newStatus) => {
    try {
      setUpdatingStatus(true);
      await api.updateIssueStatus(id, newStatus);
      setIssues(prev => prev.map(i => (i._id === id || i.id === id) ? { ...i, status: newStatus } : i));
      if (selectedItem && (selectedItem._id === id || selectedItem.id === id)) {
        setSelectedItem(prev => ({ ...prev, status: newStatus }));
      }
      showToast(`Issue status changed to ${newStatus}`);
    } catch (err) {
      console.error(err);
    } finally {
      setUpdatingStatus(false);
    }
  };

  const handleSeedData = async () => {
    try {
      setRefreshing(true);
      await api.seedDatabase();
      await loadAllData();
      showToast('Sample dataset refreshed successfully!');
    } catch (err) {
      console.error(err);
    } finally {
      setRefreshing(false);
    }
  };

  const handleExportJSON = () => {
    window.open('/api/admin/export', '_blank');
  };

  // Filtered lists
  const filteredEnquiries = enquiries.filter(item => {
    const matchesSearch = searchTerm === '' || 
      item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.subject?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const filteredIssues = issues.filter(item => {
    const matchesSearch = searchTerm === '' || 
      item.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSeverity = severityFilter === 'All' || item.severity === severityFilter;
    const matchesStatus = statusFilter === 'All' || item.status === statusFilter;
    return matchesSearch && matchesSeverity && matchesStatus;
  });

  const filteredFeedback = feedback.filter(item => {
    return searchTerm === '' || 
      item.feedback?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category?.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const filteredVisitors = visitors.filter(item => {
    return searchTerm === '' ||
      item.visitorId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.page?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.browser?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.os?.toLowerCase().includes(searchTerm.toLowerCase());
  });

  // Prepare Chart Data
  const trendData = stats?.analytics?.dailyTrend || [
    { date: 'Oct 23', total: 12, newVisitors: 8, returning: 4 },
    { date: 'Oct 24', total: 19, newVisitors: 11, returning: 8 },
    { date: 'Oct 25', total: 24, newVisitors: 15, returning: 9 },
    { date: 'Oct 26', total: 28, newVisitors: 18, returning: 10 },
    { date: 'Oct 27', total: 35, newVisitors: 21, returning: 14 },
    { date: 'Oct 28', total: 42, newVisitors: 25, returning: 17 },
    { date: 'Oct 29', total: 48, newVisitors: 29, returning: 19 },
  ];

  const deviceData = [
    { name: 'Desktop', value: stats?.analytics?.devices?.Desktop || 32 },
    { name: 'Mobile', value: stats?.analytics?.devices?.Mobile || 12 },
    { name: 'Tablet', value: stats?.analytics?.devices?.Tablet || 4 },
  ];

  // 1. Initial Auth Check Spinner
  if (checkingAuth) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center space-y-4">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-sm font-semibold text-slate-600">Verifying Host Authorization...</p>
      </div>
    );
  }

  // 2. Host Login Gate (if not authenticated)
  if (!isAuthenticatedHost) {
    return (
      <div className="min-h-[85vh] flex items-center justify-center px-4 py-12">
        <div className="relative w-full max-w-md bg-white/90 backdrop-blur-2xl rounded-3xl p-7 sm:p-9 shadow-[0_20px_50px_rgba(37,99,235,0.08)] border border-white/80 space-y-6 animate-in fade-in zoom-in-95 duration-200">
          
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-3xl bg-gradient-to-tr from-slate-900 via-blue-900 to-indigo-950 text-white flex items-center justify-center mx-auto shadow-xl shadow-blue-950/20">
              <Lock className="w-7 h-7 text-blue-400" />
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/80 text-blue-700 text-xs font-bold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Restricted Host Area</span>
            </div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">Host Authentication</h2>
            <p className="text-xs text-slate-500 max-w-xs mx-auto">
              Only the verified platform host can access user inquiries, feedback, issue reports, and visitor telemetry.
            </p>
          </div>

          {/* Error notice */}
          {loginError && (
            <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-2xl flex items-center gap-2.5 text-rose-700 text-xs">
              <AlertTriangle className="w-4 h-4 flex-shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleHostLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Host Username</label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  required
                  value={loginUsername}
                  onChange={(e) => setLoginUsername(e.target.value)}
                  placeholder="Enter host username"
                  className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Host Password</label>
              <div className="relative">
                <Key className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="Enter host password"
                  className="w-full pl-10 pr-10 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3 text-slate-400 hover:text-slate-600 focus:outline-none"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-600 pt-1">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberHost}
                  onChange={(e) => setRememberHost(e.target.checked)}
                  className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 w-4 h-4"
                />
                <span>Remember session</span>
              </label>
              <span className="text-[11px] text-slate-400 font-mono">Secured by MongoDB</span>
            </div>

            <button
              type="submit"
              disabled={loginLoading}
              className="w-full py-3 bg-slate-900 hover:bg-slate-800 active:scale-[0.99] text-white rounded-2xl text-sm font-bold shadow-lg shadow-slate-950/15 flex items-center justify-center gap-2 transition-all disabled:opacity-60 cursor-pointer"
            >
              {loginLoading ? (
                <span>Authenticating host...</span>
              ) : (
                <>
                  <Unlock className="w-4 h-4 text-blue-400" />
                  <span>Authenticate & Enter Host Portal</span>
                </>
              )}
            </button>
          </form>

          {/* Credentials Info & Home link */}
          <div className="pt-2 border-t border-slate-100 text-center space-y-2">
            <div className="p-3 bg-blue-50/70 border border-blue-100 rounded-2xl text-[11px] text-slate-600">
              <span className="font-bold text-slate-800">Host Credentials in your <code className="text-blue-700 bg-white px-1.5 py-0.5 rounded border border-blue-200">.env</code>:</span>
              <div className="mt-1 font-mono text-[11px] text-blue-900">
                Username: <strong className="text-slate-900">admin</strong> &bull; Password: <strong className="text-slate-900">admin123</strong>
              </div>
            </div>

            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-800 font-medium transition-colors pt-1"
            >
              <span>&larr; Return to Nexora Public Website</span>
            </Link>
          </div>

        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F0F5FD] text-slate-900 pb-20 pt-6 px-4 sm:px-6 lg:px-10">
      
      {/* Toast Notification */}
      {messageToast && (
        <div className="fixed top-6 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-2.5 text-sm animate-in fade-in slide-in-from-top-4 duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{messageToast}</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto space-y-6">

        {/* ================= TOP BAR & HEADER ================= */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white/80 backdrop-blur-xl border border-white/90 rounded-3xl p-5 sm:p-6 shadow-[0_10px_30px_rgba(37,99,235,0.05)]">
          <div className="space-y-1">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center shadow-md shadow-blue-500/20">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                Nexora Host Admin Portal
              </h1>
              <span className="px-2.5 py-0.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold">
                Host Access
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 font-normal">
              Live MongoDB telemetry, user inquiries, feedback ratings, reported bugs & new visitor intelligence.
            </p>
          </div>

          {/* Action buttons & MongoDB Status */}
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Database indicator */}
            <div className={`px-3 py-1.5 rounded-2xl border text-xs font-semibold flex items-center gap-2 ${
              stats?.database?.connected 
                ? 'bg-emerald-50 border-emerald-200 text-emerald-800' 
                : 'bg-amber-50 border-amber-200 text-amber-800'
            }`}>
              <Database className="w-3.5 h-3.5" />
              <span>{stats?.database?.type || 'MongoDB Telemetry'}</span>
              <span className={`w-2 h-2 rounded-full ${stats?.database?.connected ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`}></span>
            </div>

            <button
              onClick={loadAllData}
              disabled={refreshing}
              className="p-2 sm:px-3 sm:py-1.5 rounded-2xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-all active:scale-95"
              title="Refresh Data"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin text-blue-600' : ''}`} />
              <span className="hidden sm:inline">Refresh</span>
            </button>

            <button
              onClick={handleExportJSON}
              className="px-3 py-1.5 rounded-2xl bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-700 text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm active:scale-95"
              title="Export all data as JSON"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export Data</span>
            </button>

            <button
              onClick={handleSeedData}
              className="px-3 py-1.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm active:scale-95"
              title="Reset sample test records"
            >
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              <span>Seed Sample Data</span>
            </button>

            <button
              onClick={handleHostLogout}
              className="px-3 py-1.5 rounded-2xl bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-700 text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm active:scale-95 cursor-pointer"
              title="Sign Out of Host Portal"
            >
              <Lock className="w-3.5 h-3.5 text-rose-600" />
              <span>Lock / Sign Out</span>
            </button>
          </div>
        </div>

        {/* ================= NAVIGATION TABS ================= */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {[
            { id: 'overview', label: 'Dashboard & New Users', icon: TrendingUp },
            { 
              id: 'live-db', 
              label: 'Exact MongoDB Database', 
              count: dbViewData?.database?.totalDocuments || (enquiries.length + feedback.length + issues.length + visitors.length), 
              icon: Database,
              isHighlight: true
            },
            { id: 'enquiries', label: 'Enquiries', count: enquiries.filter(e => e.status === 'New').length, icon: Mail },
            { id: 'feedback', label: 'User Feedback', count: feedback.length, icon: Star },
            { id: 'issues', label: 'Issues & Bugs', count: issues.filter(i => i.status === 'Open').length, icon: Bug },
            { id: 'visitors', label: 'All Visitors Log', count: stats?.counts?.totalVisitors || visitors.length, icon: Users },
            { id: 'database', label: 'MongoDB Telemetry & Config', icon: SlidersHorizontal },
          ].map(tab => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setSearchTerm('');
                  setStatusFilter('All');
                }}
                className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold flex items-center gap-2 whitespace-nowrap transition-all ${
                  active
                    ? 'bg-slate-900 text-white shadow-lg shadow-slate-950/10 scale-[1.02]'
                    : tab.isHighlight
                      ? 'bg-blue-50/80 hover:bg-blue-100/80 text-blue-900 border border-blue-200/80 shadow-sm'
                      : 'bg-white/80 hover:bg-white text-slate-600 hover:text-slate-900 border border-white/80 shadow-sm'
                }`}
              >
                <Icon className={`w-4 h-4 ${active ? (tab.isHighlight ? 'text-emerald-400' : 'text-blue-400') : tab.isHighlight ? 'text-blue-600' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
                {tab.isHighlight && !active && (
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                )}
                {tab.count !== undefined && tab.count > 0 && (
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    active 
                      ? tab.isHighlight ? 'bg-emerald-500 text-slate-950' : 'bg-blue-500 text-white' 
                      : tab.isHighlight ? 'bg-blue-600 text-white' : 'bg-blue-50 text-blue-700 border border-blue-100'
                  }`}>
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>


        {/* ================= TAB 1: OVERVIEW & NEW USERS DASHBOARD ================= */}
        {activeTab === 'overview' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            
            {/* Top 6 KPI Counter Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-6 gap-3 sm:gap-4">
              
              {/* Total Visitors */}
              <div className="bg-white/85 backdrop-blur-xl border border-white/90 rounded-3xl p-4 sm:p-5 shadow-sm space-y-2">
                <div className="flex items-center justify-between text-slate-500">
                  <span className="text-xs font-semibold">Total Visits</span>
                  <div className="w-7 h-7 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                    <Users className="w-3.5 h-3.5" />
                  </div>
                </div>
                <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  {stats?.counts?.totalVisitors || visitors.length || 0}
                </div>
                <div className="text-[11px] text-slate-500 font-medium">
                  Across all sessions
                </div>
              </div>

              {/* NEW VISITORS (Highlighted as requested!) */}
              <div className="bg-gradient-to-br from-emerald-500/10 via-white to-emerald-50/40 backdrop-blur-xl border-2 border-emerald-400/50 rounded-3xl p-4 sm:p-5 shadow-md shadow-emerald-500/5 space-y-2 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-16 h-16 bg-emerald-400/10 rounded-full blur-xl pointer-events-none"></div>
                <div className="flex items-center justify-between text-emerald-800">
                  <span className="text-xs font-bold uppercase tracking-wider">✨ New Visitors</span>
                  <div className="w-7 h-7 rounded-xl bg-emerald-500 text-white flex items-center justify-center shadow-sm">
                    <UserPlus className="w-3.5 h-3.5" />
                  </div>
                </div>
                <div className="text-2xl sm:text-3xl font-black text-emerald-950 tracking-tight">
                  {stats?.counts?.newVisitors || 0}
                </div>
                <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10.5px] font-bold">
                  <span>{stats?.counts?.newRatio || 0}% of all visitors</span>
                </div>
              </div>

              {/* RETURNING VISITORS */}
              <div className="bg-white/85 backdrop-blur-xl border border-white/90 rounded-3xl p-4 sm:p-5 shadow-sm space-y-2">
                <div className="flex items-center justify-between text-slate-500">
                  <span className="text-xs font-semibold">Returning Users</span>
                  <div className="w-7 h-7 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                    <UserCheck className="w-3.5 h-3.5" />
                  </div>
                </div>
                <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  {stats?.counts?.returningVisitors || 0}
                </div>
                <div className="text-[11px] text-indigo-600 font-semibold">
                  Engaged audience
                </div>
              </div>

              {/* Total Enquiries */}
              <div className="bg-white/85 backdrop-blur-xl border border-white/90 rounded-3xl p-4 sm:p-5 shadow-sm space-y-2">
                <div className="flex items-center justify-between text-slate-500">
                  <span className="text-xs font-semibold">Enquiries</span>
                  <div className="w-7 h-7 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                    <Mail className="w-3.5 h-3.5" />
                  </div>
                </div>
                <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  {stats?.counts?.totalEnquiries || enquiries.length}
                </div>
                <div className="text-[11px] text-blue-600 font-semibold">
                  {stats?.counts?.newEnquiries || 0} pending review
                </div>
              </div>

              {/* Feedback Average */}
              <div className="bg-white/85 backdrop-blur-xl border border-white/90 rounded-3xl p-4 sm:p-5 shadow-sm space-y-2">
                <div className="flex items-center justify-between text-slate-500">
                  <span className="text-xs font-semibold">Avg Feedback</span>
                  <div className="w-7 h-7 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  </div>
                </div>
                <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight flex items-baseline gap-1">
                  <span>{stats?.counts?.averageRating || '4.8'}</span>
                  <span className="text-xs text-slate-400 font-normal">/ 5.0</span>
                </div>
                <div className="text-[11px] text-amber-600 font-semibold">
                  {stats?.counts?.totalFeedback || feedback.length} total reviews
                </div>
              </div>

              {/* Open Issues */}
              <div className="bg-white/85 backdrop-blur-xl border border-white/90 rounded-3xl p-4 sm:p-5 shadow-sm space-y-2">
                <div className="flex items-center justify-between text-slate-500">
                  <span className="text-xs font-semibold">Bug Reports</span>
                  <div className="w-7 h-7 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
                    <Bug className="w-3.5 h-3.5" />
                  </div>
                </div>
                <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  {stats?.counts?.openIssues || 0}
                </div>
                <div className="text-[11px] text-rose-600 font-semibold">
                  {stats?.counts?.criticalIssues || 0} critical items
                </div>
              </div>

            </div>

            {/* Charts Section: New vs Returning Visitors Trend & Device Breakdown */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* MAIN CHART: New vs Returning Visitors Over Time */}
              <div className="lg:col-span-8 bg-white/85 backdrop-blur-xl border border-white/90 rounded-3xl p-5 sm:p-6 shadow-sm space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                  <div>
                    <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                      <span>Visitor Acquisition: New vs Returning Users</span>
                      <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-100">
                        Live Tracking
                      </span>
                    </h3>
                    <p className="text-xs text-slate-500 font-normal">
                      Daily tracking of first-time visitors compared to recurring audience visits.
                    </p>
                  </div>
                  
                  {/* Legend pills */}
                  <div className="flex items-center gap-4 text-xs font-semibold">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                      <span className="text-slate-700">New Visitors</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
                      <span className="text-slate-700">Returning</span>
                    </div>
                  </div>
                </div>

                <div className="h-64 w-full pt-2">
                  <ResponsiveContainer width="100%" height={250}>
                    <AreaChart data={trendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorNew" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#10B981" stopOpacity={0.35}/>
                          <stop offset="95%" stopColor="#10B981" stopOpacity={0.0}/>
                        </linearGradient>
                        <linearGradient id="colorReturning" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#2563EB" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#2563EB" stopOpacity={0.0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
                      <XAxis dataKey="date" stroke="#94A3B8" fontSize={11} tickLine={false} />
                      <YAxis stroke="#94A3B8" fontSize={11} tickLine={false} />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#0F172A', 
                          color: '#FFFFFF', 
                          borderRadius: '16px', 
                          border: 'none', 
                          fontSize: '12px',
                          boxShadow: '0 10px 25px rgba(0,0,0,0.2)' 
                        }} 
                      />
                      <Area 
                        type="monotone" 
                        dataKey="newVisitors" 
                        name="New Visitors" 
                        stroke="#10B981" 
                        strokeWidth={2.5} 
                        fillOpacity={1} 
                        fill="url(#colorNew)" 
                      />
                      <Area 
                        type="monotone" 
                        dataKey="returning" 
                        name="Returning Users" 
                        stroke="#2563EB" 
                        strokeWidth={2} 
                        fillOpacity={1} 
                        fill="url(#colorReturning)" 
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* SIDE CHART: Devices & Top Pages */}
              <div className="lg:col-span-4 bg-white/85 backdrop-blur-xl border border-white/90 rounded-3xl p-5 sm:p-6 shadow-sm space-y-4">
                <div>
                  <h3 className="text-base font-bold text-slate-900">Device Telemetry</h3>
                  <p className="text-xs text-slate-500">Distribution of devices accessing the platform</p>
                </div>

                <div className="h-44 w-full flex items-center justify-center">
                  <ResponsiveContainer width="100%" height={170}>
                    <PieChart>
                      <Pie
                        data={deviceData}
                        cx="50%"
                        cy="50%"
                        innerRadius={45}
                        outerRadius={70}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {deviceData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#0F172A', 
                          color: '#FFFFFF', 
                          borderRadius: '12px', 
                          border: 'none', 
                          fontSize: '11px' 
                        }} 
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                {/* Device Breakdown List */}
                <div className="space-y-2 pt-1 border-t border-slate-100">
                  <div className="flex items-center justify-between text-xs">
                    <span className="flex items-center gap-1.5 text-slate-600 font-medium">
                      <Laptop className="w-3.5 h-3.5 text-blue-600" />
                      Desktop Workstations
                    </span>
                    <span className="font-bold text-slate-900">{stats?.analytics?.devices?.Desktop || 32} visits</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="flex items-center gap-1.5 text-slate-600 font-medium">
                      <Smartphone className="w-3.5 h-3.5 text-emerald-600" />
                      Mobile Handsets
                    </span>
                    <span className="font-bold text-slate-900">{stats?.analytics?.devices?.Mobile || 12} visits</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="flex items-center gap-1.5 text-slate-600 font-medium">
                      <Tablet className="w-3.5 h-3.5 text-amber-600" />
                      Tablets & iPad
                    </span>
                    <span className="font-bold text-slate-900">{stats?.analytics?.devices?.Tablet || 4} visits</span>
                  </div>
                </div>

              </div>

            </div>

            {/* Live Recent Visitor Stream */}
            <div className="bg-white/85 backdrop-blur-xl border border-white/90 rounded-3xl p-5 sm:p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <Activity className="w-4 h-4 text-blue-600" />
                    <span>Real-time Visitor Stream</span>
                  </h3>
                  <p className="text-xs text-slate-500 font-normal">
                    Latest page hits logged to MongoDB with new vs returning status identification.
                  </p>
                </div>
                <button
                  onClick={() => setActiveTab('visitors')}
                  className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1"
                >
                  <span>View All {visitors.length} Visitors</span>
                  <ChevronRight className="w-3 h-3" />
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-100 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                      <th className="py-2.5 px-3">Visitor Status</th>
                      <th className="py-2.5 px-3">Visitor ID</th>
                      <th className="py-2.5 px-3">Page Visited</th>
                      <th className="py-2.5 px-3">Device / OS</th>
                      <th className="py-2.5 px-3">Referrer</th>
                      <th className="py-2.5 px-3 text-right">Timestamp</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100/80">
                    {visitors.slice(0, 7).map((v, i) => (
                      <tr key={v._id || v.id || i} className="hover:bg-blue-50/40 transition-colors">
                        <td className="py-3 px-3">
                          {v.isNewVisitor ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 font-bold text-[10px]">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                              NEW VISITOR
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 font-medium text-[10px]">
                              <span>🔄</span>
                              Visit #{v.visitCount || 2}
                            </span>
                          )}
                        </td>
                        <td className="py-3 px-3 font-mono text-[11px] text-slate-600">
                          {v.visitorId?.substring(0, 14)}...
                        </td>
                        <td className="py-3 px-3 font-semibold text-slate-800">
                          {v.page || '/'}
                        </td>
                        <td className="py-3 px-3 text-slate-600">
                          {v.device} • {v.browser} ({v.os})
                        </td>
                        <td className="py-3 px-3 text-slate-500">
                          {v.referrer || 'Direct'}
                        </td>
                        <td className="py-3 px-3 text-right text-slate-400 font-mono text-[11px]">
                          {new Date(v.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}


        {/* ================= TAB 2: ENQUIRIES ================= */}
        {activeTab === 'enquiries' && (
          <div className="space-y-4 animate-in fade-in duration-300">
            
            {/* Filter & Search Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white/80 backdrop-blur-xl border border-white/90 rounded-2xl p-3.5 shadow-sm">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Search by sender, email or subject..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <span className="text-xs font-semibold text-slate-500">Status:</span>
                {['All', 'New', 'In Review', 'Contacted', 'Resolved'].map(st => (
                  <button
                    key={st}
                    onClick={() => setStatusFilter(st)}
                    className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all ${
                      statusFilter === st
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {/* Enquiries Grid / List */}
            {filteredEnquiries.length === 0 ? (
              <div className="bg-white/80 rounded-3xl p-12 text-center text-slate-500 space-y-2">
                <Mail className="w-10 h-10 text-slate-300 mx-auto" />
                <h4 className="text-base font-bold text-slate-800">No Enquiries Found</h4>
                <p className="text-xs text-slate-400">Try changing your search terms or filter.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredEnquiries.map((item) => (
                  <div
                    key={item._id || item.id}
                    className="bg-white/85 backdrop-blur-xl border border-white/90 rounded-3xl p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4"
                  >
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                          item.status === 'New' 
                            ? 'bg-blue-50 text-blue-700 border-blue-200'
                            : item.status === 'In Review'
                            ? 'bg-amber-50 text-amber-700 border-amber-200'
                            : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        }`}>
                          {item.status}
                        </span>

                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                          item.priority === 'Urgent' ? 'bg-rose-100 text-rose-700' :
                          item.priority === 'High' ? 'bg-orange-100 text-orange-700' :
                          'bg-slate-100 text-slate-600'
                        }`}>
                          {item.priority} Priority
                        </span>
                      </div>

                      <div>
                        <h4 className="text-sm font-bold text-slate-900 leading-snug">
                          {item.subject}
                        </h4>
                        <div className="text-xs text-blue-600 font-semibold mt-0.5">
                          {item.type}
                        </div>
                      </div>

                      <p className="text-xs text-slate-600 line-clamp-3 bg-slate-50/70 p-3 rounded-2xl border border-slate-100/80">
                        "{item.message}"
                      </p>
                    </div>

                    <div className="pt-2 border-t border-slate-100 text-xs space-y-2">
                      <div className="flex items-center justify-between text-slate-600">
                        <span className="font-semibold text-slate-900">{item.name}</span>
                        <span className="text-[11px] text-slate-400">
                          {new Date(item.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="text-slate-500 text-[11px] truncate">
                        {item.email} {item.organization ? `• ${item.organization}` : ''}
                      </div>

                      {/* Status Updater Dropdown */}
                      <div className="pt-2 flex items-center justify-between gap-2">
                        <span className="text-[10px] text-slate-400 font-medium">Update Status:</span>
                        <div className="flex items-center gap-1">
                          {['New', 'In Review', 'Resolved'].map(st => (
                            <button
                              key={st}
                              disabled={updatingStatus || item.status === st}
                              onClick={() => handleUpdateEnquiryStatus(item._id || item.id, st)}
                              className={`px-2 py-0.5 text-[10px] font-bold rounded-lg transition-colors ${
                                item.status === st 
                                  ? 'bg-slate-900 text-white' 
                                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                              }`}
                            >
                              {st}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

          </div>
        )}


        {/* ================= TAB 3: USER FEEDBACK ================= */}
        {activeTab === 'feedback' && (
          <div className="space-y-4 animate-in fade-in duration-300">
            
            {/* Feedback Score Banner */}
            <div className="bg-gradient-to-r from-amber-500/10 via-white to-amber-50/30 border border-amber-200/60 rounded-3xl p-6 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-5">
                <div className="w-16 h-16 rounded-2xl bg-amber-500 text-white flex items-center justify-center text-3xl font-black shadow-lg shadow-amber-500/20">
                  {stats?.counts?.averageRating || '4.8'}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">User Satisfaction Index</h3>
                  <div className="flex items-center gap-1 my-1">
                    {[1, 2, 3, 4, 5].map(st => (
                      <Star key={st} className="w-4 h-4 text-amber-400 fill-amber-400" />
                    ))}
                    <span className="text-xs text-slate-500 font-medium ml-2">Based on {feedback.length} verified submissions</span>
                  </div>
                  <p className="text-xs text-slate-500">Live sentiment analysis correlating multimodal UI and assessment metrics.</p>
                </div>
              </div>

              {/* Quick stats pills */}
              <div className="flex items-center gap-3">
                <div className="text-center px-4 py-2 bg-white rounded-2xl border border-slate-100 shadow-sm">
                  <div className="text-lg font-bold text-emerald-600">
                    {feedback.filter(f => f.sentiment === 'Positive').length}
                  </div>
                  <div className="text-[10px] font-semibold text-slate-400 uppercase">Positive</div>
                </div>
                <div className="text-center px-4 py-2 bg-white rounded-2xl border border-slate-100 shadow-sm">
                  <div className="text-lg font-bold text-amber-600">
                    {feedback.filter(f => f.sentiment === 'Neutral').length}
                  </div>
                  <div className="text-[10px] font-semibold text-slate-400 uppercase">Neutral</div>
                </div>
                <div className="text-center px-4 py-2 bg-white rounded-2xl border border-slate-100 shadow-sm">
                  <div className="text-lg font-bold text-rose-600">
                    {feedback.filter(f => f.sentiment === 'Negative').length}
                  </div>
                  <div className="text-[10px] font-semibold text-slate-400 uppercase">Negative</div>
                </div>
              </div>
            </div>

            {/* Feedback Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredFeedback.map((f, i) => (
                <div
                  key={f._id || f.id || i}
                  className="bg-white/85 backdrop-blur-xl border border-white/90 rounded-3xl p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-3"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-0.5">
                        {[1, 2, 3, 4, 5].map(st => (
                          <Star 
                            key={st} 
                            className={`w-3.5 h-3.5 ${
                              st <= (f.rating || 5) ? 'text-amber-400 fill-amber-400' : 'text-slate-200'
                            }`} 
                          />
                        ))}
                      </div>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-100">
                        {f.category}
                      </span>
                    </div>

                    <p className="text-xs text-slate-700 leading-relaxed font-normal bg-slate-50/60 p-3 rounded-2xl border border-slate-100">
                      "{f.feedback}"
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                    <span className="font-semibold text-slate-800">{f.name || 'Anonymous User'}</span>
                    <span className="text-[11px] text-slate-400">
                      {new Date(f.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}


        {/* ================= TAB 4: ISSUES & BUG REPORTS ================= */}
        {activeTab === 'issues' && (
          <div className="space-y-4 animate-in fade-in duration-300">
            
            {/* Filter Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white/80 backdrop-blur-xl border border-white/90 rounded-2xl p-3.5 shadow-sm">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Search bug title or details..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500/20"
                />
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-slate-500">Severity:</span>
                {['All', 'Critical', 'High', 'Medium', 'Low'].map(sev => (
                  <button
                    key={sev}
                    onClick={() => setSeverityFilter(sev)}
                    className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all ${
                      severityFilter === sev
                        ? 'bg-rose-600 text-white shadow-sm'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {sev}
                  </button>
                ))}
              </div>
            </div>

            {/* Issues List */}
            {filteredIssues.length === 0 ? (
              <div className="bg-white/80 rounded-3xl p-12 text-center text-slate-500 space-y-2">
                <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                <h4 className="text-base font-bold text-slate-800">No Issues Found</h4>
                <p className="text-xs text-slate-400">All systems operating within normal telemetry thresholds.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredIssues.map((issue) => (
                  <div
                    key={issue._id || issue.id}
                    className="bg-white/85 backdrop-blur-xl border border-white/90 rounded-3xl p-5 shadow-sm space-y-3"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                          issue.severity === 'Critical' ? 'bg-red-50 text-red-700 border-red-200' :
                          issue.severity === 'High' ? 'bg-orange-50 text-orange-700 border-orange-200' :
                          issue.severity === 'Medium' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                          'bg-slate-100 text-slate-600 border-slate-200'
                        }`}>
                          {issue.severity}
                        </span>

                        <span className="text-xs font-bold text-slate-500">
                          {issue.category}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-slate-500">Status:</span>
                        {['Open', 'Investigating', 'Resolved'].map(st => (
                          <button
                            key={st}
                            disabled={updatingStatus || issue.status === st}
                            onClick={() => handleUpdateIssueStatus(issue._id || issue.id, st)}
                            className={`px-2.5 py-1 text-xs font-bold rounded-xl transition-all ${
                              issue.status === st
                                ? 'bg-slate-900 text-white shadow-sm'
                                : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                            }`}
                          >
                            {st}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm sm:text-base font-bold text-slate-900">
                        {issue.title}
                      </h4>
                      <p className="text-xs text-slate-600 mt-1">
                        {issue.description}
                      </p>
                    </div>

                    {issue.stepsToReproduce && (
                      <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 text-xs">
                        <span className="font-bold text-slate-700 block mb-0.5">Steps to reproduce:</span>
                        <pre className="text-slate-600 whitespace-pre-wrap font-sans">{issue.stepsToReproduce}</pre>
                      </div>
                    )}

                    <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-400 pt-2 border-t border-slate-100">
                      <div>
                        Reported by: <span className="font-semibold text-slate-700">{issue.reportedBy}</span> ({issue.email || 'No email'})
                      </div>
                      <div className="font-mono">
                        {new Date(issue.createdAt).toLocaleString()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

          </div>
        )}


        {/* ================= TAB 5: ALL VISITORS LOG ================= */}
        {activeTab === 'visitors' && (
          <div className="space-y-4 animate-in fade-in duration-300">
            
            {/* Search Bar */}
            <div className="flex items-center justify-between gap-3 bg-white/80 backdrop-blur-xl border border-white/90 rounded-2xl p-3.5 shadow-sm">
              <div className="relative w-full sm:w-96">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Filter by visitor ID, page, OS or browser..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              <div className="text-xs text-slate-500 font-semibold">
                Showing {filteredVisitors.length} of {visitors.length} total visits
              </div>
            </div>

            {/* Full Visitors Table */}
            <div className="bg-white/85 backdrop-blur-xl border border-white/90 rounded-3xl overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50/70 border-b border-slate-100 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                    <tr>
                      <th className="py-3 px-4">Visitor Type</th>
                      <th className="py-3 px-4">Visitor Token</th>
                      <th className="py-3 px-4">Route Visited</th>
                      <th className="py-3 px-4">Hardware Device</th>
                      <th className="py-3 px-4">Browser & OS</th>
                      <th className="py-3 px-4">Referrer Source</th>
                      <th className="py-3 px-4 text-right">Timestamp</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredVisitors.map((v, i) => (
                      <tr key={v._id || v.id || i} className="hover:bg-blue-50/30 transition-colors">
                        <td className="py-3 px-4">
                          {v.isNewVisitor ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-extrabold text-[10px]">
                              ✨ NEW VISITOR
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 font-semibold text-[10px]">
                              🔄 RETURNING #{v.visitCount || 2}
                            </span>
                          )}
                        </td>
                        <td className="py-3 px-4 font-mono text-[11px] text-slate-600">
                          {v.visitorId}
                        </td>
                        <td className="py-3 px-4 font-semibold text-slate-900">
                          {v.page || '/'}
                        </td>
                        <td className="py-3 px-4 text-slate-700">
                          {v.device}
                        </td>
                        <td className="py-3 px-4 text-slate-600">
                          {v.browser} • {v.os}
                        </td>
                        <td className="py-3 px-4 text-slate-500">
                          {v.referrer || 'Direct'}
                        </td>
                        <td className="py-3 px-4 text-right text-slate-400 font-mono text-[11px]">
                          {new Date(v.timestamp).toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* ================= TAB: LIVE MONGODB DATABASE EXPLORER ================= */}
        {activeTab === 'live-db' && (() => {
          const allCollections = dbViewData?.collections || [
            { name: 'enquiries', fullName: 'nexora.enquiries', label: 'User Inquiries', count: enquiries.length, documents: enquiries },
            { name: 'feedback', fullName: 'nexora.feedback', label: 'Customer Feedback', count: feedback.length, documents: feedback },
            { name: 'issues', fullName: 'nexora.issues', label: 'Issues & Bugs', count: issues.length, documents: issues },
            { name: 'visitors', fullName: 'nexora.visitors', label: 'Visitors Log', count: visitors.length, documents: visitors },
          ];

          let currentDocs = [];
          if (selectedDbCollection === 'all') {
            currentDocs = dbViewData?.unifiedStream || [
              ...enquiries.map(d => ({ ...d, _collection: 'enquiries', _entityType: 'Enquiry Submission' })),
              ...feedback.map(d => ({ ...d, _collection: 'feedback', _entityType: 'User Feedback' })),
              ...issues.map(d => ({ ...d, _collection: 'issues', _entityType: 'Issue Report' })),
              ...visitors.map(d => ({ ...d, _collection: 'visitors', _entityType: d.isNewVisitor ? 'New Visitor Arrival' : 'Returning Visitor' })),
            ];
          } else {
            const matchedCol = allCollections.find(c => c.name === selectedDbCollection);
            currentDocs = matchedCol?.documents || [];
          }

          // Apply Status / Severity / Rating filter
          let filteredByStatus = currentDocs;
          if (dbStatusFilter !== 'All') {
            filteredByStatus = currentDocs.filter(d => {
              if (dbStatusFilter === 'New') return d.status === 'New' || d.status === 'Open' || d.isNewVisitor;
              if (dbStatusFilter === 'InProgress') return d.status === 'In Progress' || d.status === 'Investigating';
              if (dbStatusFilter === 'Resolved') return d.status === 'Resolved' || d.status === 'Contacted';
              if (dbStatusFilter === '5Star') return d.rating === 5;
              if (dbStatusFilter === 'Critical') return d.severity === 'Critical';
              return true;
            });
          }

          // Apply text search
          const filteredDbDocs = filteredByStatus.filter(doc => {
            if (!dbSearch) return true;
            const q = dbSearch.toLowerCase();
            return (
              (doc.name && doc.name.toLowerCase().includes(q)) ||
              (doc.email && doc.email.toLowerCase().includes(q)) ||
              (doc.subject && doc.subject.toLowerCase().includes(q)) ||
              (doc.message && doc.message.toLowerCase().includes(q)) ||
              (doc.feedback && doc.feedback.toLowerCase().includes(q)) ||
              (doc.title && doc.title.toLowerCase().includes(q)) ||
              (doc.visitorId && doc.visitorId.toLowerCase().includes(q)) ||
              (doc._id && String(doc._id).toLowerCase().includes(q))
            );
          });

          // Helper for user initials avatar
          const getInitials = (name) => {
            if (!name) return 'U';
            return name
              .split(' ')
              .map(n => n[0])
              .join('')
              .toUpperCase()
              .slice(0, 2);
          };

          return (
            <div className="space-y-6 animate-in fade-in duration-300">
              
              {/* ================= HOST PATTERNED SUMMARY CARDS ================= */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                
                {/* 1. Inquiries */}
                <div 
                  onClick={() => setSelectedDbCollection('enquiries')}
                  className={`p-5 rounded-3xl border transition-all cursor-pointer shadow-sm hover:shadow-md ${
                    selectedDbCollection === 'enquiries'
                      ? 'bg-blue-600 text-white border-blue-600 ring-2 ring-blue-500/20'
                      : 'bg-white/85 backdrop-blur-xl border-white/90 text-slate-800 hover:border-blue-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${
                      selectedDbCollection === 'enquiries' ? 'bg-white/20 text-white' : 'bg-blue-50 text-blue-600'
                    }`}>
                      <Mail className="w-5 h-5" />
                    </div>
                    <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                      selectedDbCollection === 'enquiries' 
                        ? 'bg-white/20 text-white' 
                        : 'bg-blue-50 text-blue-700 border border-blue-200'
                    }`}>
                      {enquiries.filter(e => e.status === 'New').length} New
                    </span>
                  </div>
                  <div className="text-2xl font-black">{enquiries.length}</div>
                  <div className={`text-xs font-semibold mt-0.5 ${selectedDbCollection === 'enquiries' ? 'text-blue-100' : 'text-slate-500'}`}>
                    Customer Inquiries & Leads
                  </div>
                  <div className={`text-[10px] font-mono mt-1 ${selectedDbCollection === 'enquiries' ? 'text-blue-200' : 'text-slate-400'}`}>
                    Collection: nexora.enquiries
                  </div>
                </div>

                {/* 2. Customer Feedback */}
                <div 
                  onClick={() => setSelectedDbCollection('feedback')}
                  className={`p-5 rounded-3xl border transition-all cursor-pointer shadow-sm hover:shadow-md ${
                    selectedDbCollection === 'feedback'
                      ? 'bg-amber-500 text-white border-amber-500 ring-2 ring-amber-400/20'
                      : 'bg-white/85 backdrop-blur-xl border-white/90 text-slate-800 hover:border-amber-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${
                      selectedDbCollection === 'feedback' ? 'bg-white/20 text-white' : 'bg-amber-50 text-amber-600'
                    }`}>
                      <Star className="w-5 h-5" />
                    </div>
                    <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                      selectedDbCollection === 'feedback' 
                        ? 'bg-white/20 text-white' 
                        : 'bg-amber-50 text-amber-700 border border-amber-200'
                    }`}>
                      ★ {stats?.counts?.averageRating || '5.0'} / 5.0
                    </span>
                  </div>
                  <div className="text-2xl font-black">{feedback.length}</div>
                  <div className={`text-xs font-semibold mt-0.5 ${selectedDbCollection === 'feedback' ? 'text-amber-100' : 'text-slate-500'}`}>
                    Customer Reviews & Feedback
                  </div>
                  <div className={`text-[10px] font-mono mt-1 ${selectedDbCollection === 'feedback' ? 'text-amber-100' : 'text-slate-400'}`}>
                    Collection: nexora.feedback
                  </div>
                </div>

                {/* 3. Issue Reports */}
                <div 
                  onClick={() => setSelectedDbCollection('issues')}
                  className={`p-5 rounded-3xl border transition-all cursor-pointer shadow-sm hover:shadow-md ${
                    selectedDbCollection === 'issues'
                      ? 'bg-rose-600 text-white border-rose-600 ring-2 ring-rose-500/20'
                      : 'bg-white/85 backdrop-blur-xl border-white/90 text-slate-800 hover:border-rose-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${
                      selectedDbCollection === 'issues' ? 'bg-white/20 text-white' : 'bg-rose-50 text-rose-600'
                    }`}>
                      <Bug className="w-5 h-5" />
                    </div>
                    <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                      selectedDbCollection === 'issues' 
                        ? 'bg-white/20 text-white' 
                        : 'bg-rose-50 text-rose-700 border border-rose-200'
                    }`}>
                      {issues.filter(i => i.status === 'Open').length} Open
                    </span>
                  </div>
                  <div className="text-2xl font-black">{issues.length}</div>
                  <div className={`text-xs font-semibold mt-0.5 ${selectedDbCollection === 'issues' ? 'text-rose-100' : 'text-slate-500'}`}>
                    Reported Issues & Bugs
                  </div>
                  <div className={`text-[10px] font-mono mt-1 ${selectedDbCollection === 'issues' ? 'text-rose-200' : 'text-slate-400'}`}>
                    Collection: nexora.issues
                  </div>
                </div>

                {/* 4. Visitors & Traffic */}
                <div 
                  onClick={() => setSelectedDbCollection('visitors')}
                  className={`p-5 rounded-3xl border transition-all cursor-pointer shadow-sm hover:shadow-md ${
                    selectedDbCollection === 'visitors'
                      ? 'bg-indigo-600 text-white border-indigo-600 ring-2 ring-indigo-500/20'
                      : 'bg-white/85 backdrop-blur-xl border-white/90 text-slate-800 hover:border-indigo-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${
                      selectedDbCollection === 'visitors' ? 'bg-white/20 text-white' : 'bg-indigo-50 text-indigo-600'
                    }`}>
                      <Users className="w-5 h-5" />
                    </div>
                    <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                      selectedDbCollection === 'visitors' 
                        ? 'bg-white/20 text-white' 
                        : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    }`}>
                      {stats?.counts?.newRatio || 60}% New
                    </span>
                  </div>
                  <div className="text-2xl font-black">{stats?.counts?.totalVisitors || visitors.length}</div>
                  <div className={`text-xs font-semibold mt-0.5 ${selectedDbCollection === 'visitors' ? 'text-indigo-100' : 'text-slate-500'}`}>
                    Total Visitors Logged
                  </div>
                  <div className={`text-[10px] font-mono mt-1 ${selectedDbCollection === 'visitors' ? 'text-indigo-200' : 'text-slate-400'}`}>
                    Collection: nexora.visitors
                  </div>
                </div>

              </div>

              {/* ================= CONTROLS & TABLE TOOLBAR ================= */}
              <div className="bg-white/85 backdrop-blur-xl border border-white/90 rounded-3xl p-5 shadow-sm space-y-4">
                
                {/* Top strip: Live Status + Auto-sync + View switcher */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100">
                      <Database className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-slate-900">Live MongoDB Atlas Database</span>
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-mono font-bold">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                          <span>Connected: nexora</span>
                        </span>
                      </div>
                      <p className="text-xs text-slate-500">
                        {dbViewData?.database?.totalDocuments || (enquiries.length + feedback.length + issues.length + visitors.length)} total documents stored across MongoDB Atlas cluster.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setDbAutoSync(!dbAutoSync)}
                      className={`px-3 py-1.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-all ${
                        dbAutoSync 
                          ? 'bg-emerald-50 border-emerald-200 text-emerald-800' 
                          : 'bg-slate-100 border-slate-200 text-slate-600'
                      }`}
                      title={dbAutoSync ? 'Auto-sync is on (updates every 6s)' : 'Auto-sync is off'}
                    >
                      <Radio className={`w-3.5 h-3.5 ${dbAutoSync ? 'animate-pulse text-emerald-600' : 'text-slate-400'}`} />
                      <span>{dbAutoSync ? 'Live Sync Active' : 'Sync Paused'}</span>
                    </button>

                    <button
                      onClick={loadAllData}
                      disabled={refreshing}
                      className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer"
                    >
                      <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin' : ''}`} />
                      <span>Refresh</span>
                    </button>

                    <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200">
                      <button
                        onClick={() => setDbViewMode('table')}
                        className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                          dbViewMode === 'table' ? 'bg-white text-slate-900 shadow-sm font-bold' : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        <Table className="w-3.5 h-3.5 text-blue-600" />
                        <span>Host Table</span>
                      </button>
                      <button
                        onClick={() => setDbViewMode('raw')}
                        className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                          dbViewMode === 'raw' ? 'bg-white text-slate-900 shadow-sm font-bold' : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        <FileJson className="w-3.5 h-3.5 text-slate-500" />
                        <span>Raw JSON</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Collection Filter Buttons */}
                <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                  {[
                    { id: 'all', label: 'All User Submissions', icon: Layers, count: dbViewData?.database?.totalDocuments || (enquiries.length + feedback.length + issues.length + visitors.length) },
                    { id: 'enquiries', label: 'Inquiries', icon: Mail, count: enquiries.length },
                    { id: 'feedback', label: 'Feedback', icon: Star, count: feedback.length },
                    { id: 'issues', label: 'Bug Reports', icon: Bug, count: issues.length },
                    { id: 'visitors', label: 'Visitor Logs', icon: Users, count: stats?.counts?.totalVisitors || visitors.length },
                  ].map(tab => {
                    const Icon = tab.icon;
                    const active = selectedDbCollection === tab.id;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => {
                          setSelectedDbCollection(tab.id);
                          setDbSearch('');
                          setDbStatusFilter('All');
                        }}
                        className={`px-3.5 py-2 rounded-2xl text-xs font-bold flex items-center gap-2 whitespace-nowrap transition-all cursor-pointer ${
                          active
                            ? 'bg-slate-900 text-white shadow-md'
                            : 'bg-slate-100/80 hover:bg-slate-200/70 text-slate-700'
                        }`}
                      >
                        <Icon className={`w-3.5 h-3.5 ${active ? 'text-blue-400' : 'text-slate-500'}`} />
                        <span>{tab.label}</span>
                        <span className={`px-2 py-0.2 rounded-full text-[10px] font-mono font-bold ${
                          active ? 'bg-blue-500 text-white' : 'bg-slate-200 text-slate-700'
                        }`}>
                          {tab.count}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Filter and Search Bar */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1">
                  <div className="relative w-full sm:w-96">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-2.5" />
                    <input
                      type="text"
                      placeholder="Search by name, email, subject, keyword, or ID..."
                      value={dbSearch}
                      onChange={(e) => setDbSearch(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 font-medium"
                    />
                    {dbSearch && (
                      <button
                        onClick={() => setDbSearch('')}
                        className="absolute right-3 top-2.5 text-xs text-slate-400 hover:text-slate-600 font-bold"
                      >
                        &times;
                      </button>
                    )}
                  </div>

                  <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                    <div className="flex items-center gap-1.5 text-xs text-slate-500">
                      <Filter className="w-3.5 h-3.5 text-slate-400" />
                      <select
                        value={dbStatusFilter}
                        onChange={(e) => setDbStatusFilter(e.target.value)}
                        className="bg-slate-50 border border-slate-200 text-slate-700 text-xs font-semibold rounded-xl px-2.5 py-1.5 focus:outline-none"
                      >
                        <option value="All">All Statuses</option>
                        <option value="New">New / Open</option>
                        <option value="InProgress">In Progress / Investigating</option>
                        <option value="Resolved">Resolved / Contacted</option>
                        <option value="5Star">5-Star Feedback</option>
                        <option value="Critical">Critical Severity</option>
                      </select>
                    </div>

                    <div className="text-xs text-slate-500 font-medium">
                      Showing <strong className="text-slate-900">{filteredDbDocs.length}</strong> records
                    </div>
                  </div>
                </div>

              </div>

              {/* ================= VIEW 1: PATTERNED HOST TABLE ================= */}
              {dbViewMode === 'table' && (
                <div className="bg-white/90 backdrop-blur-xl border border-white/90 rounded-3xl overflow-hidden shadow-sm">
                  
                  {filteredDbDocs.length === 0 ? (
                    <div className="p-14 text-center space-y-3">
                      <div className="w-12 h-12 rounded-3xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                        <Search className="w-6 h-6" />
                      </div>
                      <h4 className="text-base font-bold text-slate-800">No records match your filters</h4>
                      <p className="text-xs text-slate-400 max-w-sm mx-auto">
                        Try clearing your search term or selecting "All Statuses" from the filter dropdown.
                      </p>
                      <button
                        onClick={() => { setDbSearch(''); setDbStatusFilter('All'); }}
                        className="px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded-xl hover:bg-slate-800 cursor-pointer"
                      >
                        Reset Search Filters
                      </button>
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse text-xs">
                        <thead>
                          <tr className="bg-slate-900 text-slate-300 text-[11px] font-bold uppercase tracking-wider">
                            <th className="py-3.5 px-4 w-12 text-center">#</th>
                            <th className="py-3.5 px-4">Type & Collection</th>
                            <th className="py-3.5 px-4">User / Contributor</th>
                            <th className="py-3.5 px-4">Subject & Message Summary</th>
                            <th className="py-3.5 px-4">Status / Rating</th>
                            <th className="py-3.5 px-4 text-right">Received Date</th>
                            <th className="py-3.5 px-4 text-center">Action</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {filteredDbDocs.map((doc, idx) => {
                            const docId = doc._id || doc.id || `doc-${idx}`;
                            const colName = doc._collection || selectedDbCollection;
                            const timestamp = doc.createdAt || doc.timestamp || doc.updatedAt;
                            const userName = doc.name || doc.user || (doc.visitorId ? `Visitor ${String(doc.visitorId).slice(-6)}` : 'Anonymous');
                            const userEmail = doc.email || doc.organization || (doc.device ? `${doc.device} • ${doc.os || ''}` : '');
                            
                            // Visual theme for collection badge
                            const isEnquiry = colName === 'enquiries' || doc._entityType?.includes('Enquiry');
                            const isFeedback = colName === 'feedback' || doc._entityType?.includes('Feedback');
                            const isIssue = colName === 'issues' || doc._entityType?.includes('Issue');
                            const isVisitor = colName === 'visitors' || doc._entityType?.includes('Visitor');

                            return (
                              <tr 
                                key={docId}
                                className="even:bg-slate-50/40 hover:bg-blue-50/50 transition-colors group cursor-default"
                              >
                                {/* 1. Row Index */}
                                <td className="py-3.5 px-4 text-center text-slate-400 font-mono text-[11px] font-bold">
                                  {idx + 1}
                                </td>

                                {/* 2. Type & Collection Badge */}
                                <td className="py-3.5 px-4">
                                  <div className="space-y-1">
                                    {isEnquiry && (
                                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-[11px] font-bold">
                                        <Mail className="w-3 h-3 text-blue-600" />
                                        <span>Inquiry</span>
                                      </span>
                                    )}
                                    {isFeedback && (
                                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-[11px] font-bold">
                                        <Star className="w-3 h-3 text-amber-600 fill-amber-500" />
                                        <span>Feedback</span>
                                      </span>
                                    )}
                                    {isIssue && (
                                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-[11px] font-bold">
                                        <Bug className="w-3 h-3 text-rose-600" />
                                        <span>Bug Report</span>
                                      </span>
                                    )}
                                    {isVisitor && (
                                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-bold">
                                        <Users className="w-3 h-3 text-emerald-600" />
                                        <span>Visitor</span>
                                      </span>
                                    )}
                                    <div className="text-[10px] font-mono text-slate-400 truncate max-w-[130px]" title={String(docId)}>
                                      id: {String(docId).slice(0, 8)}...
                                    </div>
                                  </div>
                                </td>

                                {/* 3. User Identity (Avatar + Name + Contact) */}
                                <td className="py-3.5 px-4">
                                  <div className="flex items-center gap-3">
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shadow-sm flex-shrink-0 ${
                                      isEnquiry ? 'bg-gradient-to-tr from-blue-600 to-indigo-600' :
                                      isFeedback ? 'bg-gradient-to-tr from-amber-500 to-orange-500' :
                                      isIssue ? 'bg-gradient-to-tr from-rose-500 to-red-600' :
                                      'bg-gradient-to-tr from-slate-600 to-slate-800'
                                    }`}>
                                      {getInitials(userName)}
                                    </div>
                                    <div className="min-w-0 max-w-[180px]">
                                      <div className="font-bold text-slate-900 truncate" title={userName}>
                                        {userName}
                                      </div>
                                      <div className="text-[11px] text-slate-500 truncate" title={userEmail}>
                                        {userEmail || 'No email provided'}
                                      </div>
                                    </div>
                                  </div>
                                </td>

                                {/* 4. Subject & Message Summary */}
                                <td className="py-3.5 px-4 max-w-xs">
                                  <div className="space-y-0.5">
                                    <div className="font-bold text-slate-900 truncate">
                                      {doc.subject || doc.title || doc.category || (doc.page ? `Visited ${doc.page}` : 'User Submission')}
                                    </div>
                                    <p className="text-slate-600 text-xs truncate max-w-sm" title={doc.message || doc.feedback || doc.description}>
                                      {doc.message || doc.feedback || doc.description || (doc.device ? `${doc.device} • ${doc.browser} on ${doc.os}` : 'Telemetry footprint recorded')}
                                    </p>
                                  </div>
                                </td>

                                {/* 5. Status / Rating / Priority */}
                                <td className="py-3.5 px-4 whitespace-nowrap">
                                  {doc.rating ? (
                                    <div className="space-y-1">
                                      <div className="flex items-center gap-1 text-amber-500 font-bold text-xs">
                                        {'★'.repeat(doc.rating)}
                                        <span className="text-slate-400 font-normal">({doc.rating}/5)</span>
                                      </div>
                                      <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-100">
                                        {doc.sentiment || 'Positive'}
                                      </span>
                                    </div>
                                  ) : doc.status ? (
                                    <div className="space-y-1">
                                      <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                                        doc.status === 'New' || doc.status === 'Open'
                                          ? 'bg-blue-100 text-blue-800'
                                          : doc.status === 'Resolved' || doc.status === 'Contacted'
                                            ? 'bg-emerald-100 text-emerald-800'
                                            : 'bg-amber-100 text-amber-800'
                                      }`}>
                                        {doc.status}
                                      </span>
                                      {doc.priority && (
                                        <div className="text-[10px] text-slate-400 font-medium">
                                          Priority: <span className="text-slate-600 font-bold">{doc.priority}</span>
                                        </div>
                                      )}
                                      {doc.severity && (
                                        <div className="text-[10px] text-slate-400 font-medium">
                                          Severity: <span className={`font-bold ${doc.severity === 'Critical' ? 'text-rose-600' : 'text-slate-600'}`}>{doc.severity}</span>
                                        </div>
                                      )}
                                    </div>
                                  ) : isVisitor ? (
                                    doc.isNewVisitor ? (
                                      <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-100 text-emerald-800">
                                        ✨ NEW VISITOR
                                      </span>
                                    ) : (
                                      <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-100 text-slate-700">
                                        🔄 RETURNING #{doc.visitCount || 2}
                                      </span>
                                    )
                                  ) : (
                                    <span className="text-slate-400 text-xs italic">Logged</span>
                                  )}
                                </td>

                                {/* 6. Received Date */}
                                <td className="py-3.5 px-4 text-right whitespace-nowrap">
                                  <div className="text-slate-700 font-semibold text-xs">
                                    {timestamp ? new Date(timestamp).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }) : 'N/A'}
                                  </div>
                                  <div className="text-[10px] text-slate-400 font-mono">
                                    {timestamp ? new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
                                  </div>
                                </td>

                                {/* 7. Actions */}
                                <td className="py-3.5 px-4 text-center whitespace-nowrap">
                                  <div className="flex items-center justify-center gap-1.5">
                                    <button
                                      onClick={() => setSelectedDbDoc(doc)}
                                      className="px-2.5 py-1 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-[11px] font-bold flex items-center gap-1 shadow-sm transition-all active:scale-95 cursor-pointer"
                                      title="Open complete host details"
                                    >
                                      <Eye className="w-3.5 h-3.5 text-blue-400" />
                                      <span>View</span>
                                    </button>
                                    <button
                                      onClick={() => handleCopyJSON(doc, docId)}
                                      className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
                                      title="Copy MongoDB Document JSON"
                                    >
                                      {copiedDocId === docId ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}

              {/* ================= VIEW 2: RAW MONGODB JSON ================= */}
              {dbViewMode === 'raw' && (
                <div className="bg-slate-950 rounded-3xl p-5 border border-slate-800 shadow-2xl space-y-3 font-mono text-xs">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <div className="flex items-center gap-2">
                      <Terminal className="w-4 h-4 text-emerald-400" />
                      <span className="text-slate-300 font-bold">
                        MongoDB Database Raw Export &bull; db.{selectedDbCollection}.find().pretty()
                      </span>
                    </div>
                    <button
                      onClick={() => handleCopyJSON(filteredDbDocs, 'raw-view')}
                      className="px-3 py-1 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
                    >
                      {copiedDocId === 'raw-view' ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400">Copied to Clipboard!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy Raw JSON</span>
                        </>
                      )}
                    </button>
                  </div>

                  <div className="overflow-x-auto max-h-[600px] scrollbar-thin scrollbar-thumb-slate-800">
                    <pre className="text-emerald-400 leading-relaxed font-mono text-xs p-2">
                      {JSON.stringify(filteredDbDocs, null, 2)}
                    </pre>
                  </div>
                </div>
              )}

            </div>
          );
        })()}


        {/* ================= TAB 6: MONGODB & SYSTEM CONFIG ================= */}
        {activeTab === 'database' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            
            <div className="bg-white/85 backdrop-blur-xl border border-white/90 rounded-3xl p-6 shadow-sm space-y-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Database className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">MongoDB Configuration & Connection Telemetry</h3>
                  <p className="text-xs text-slate-500">Database connection strings, collections & resilient storage mode</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
                  <div className="text-xs text-slate-400 font-semibold">Active Backend Status</div>
                  <div className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                    <span>Express API Server (Port 5000)</span>
                  </div>
                  <div className="text-[11px] text-slate-500">Health: http://localhost:5000/api/health</div>
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
                  <div className="text-xs text-slate-400 font-semibold">Database Storage Engine</div>
                  <div className="text-base font-bold text-slate-900">
                    {stats?.database?.type || 'MongoDB / Resilient Store'}
                  </div>
                  <div className="text-[11px] text-slate-500">Auto-persisted JSON & memory caching</div>
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
                  <div className="text-xs text-slate-400 font-semibold">Configured URI</div>
                  <div className="text-xs font-mono text-slate-700 truncate" title={stats?.database?.uri}>
                    {stats?.database?.uri}
                  </div>
                  <div className="text-[11px] text-blue-600 font-medium">Configurable via .env file</div>
                </div>
              </div>

              {/* Instructions on connecting real MongoDB Atlas */}
              <div className="p-5 bg-blue-50/60 border border-blue-200/80 rounded-2xl space-y-3">
                <h4 className="text-sm font-bold text-blue-900 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-blue-600" />
                  <span>How to connect your MongoDB Atlas or Local MongoDB instance:</span>
                </h4>
                <ol className="text-xs text-blue-950 space-y-1.5 list-decimal pl-4">
                  <li>
                    Open the file <code className="bg-white px-2 py-0.5 rounded border border-blue-200 font-mono text-[11px]">.env</code> in the project root.
                  </li>
                  <li>
                    Update the <code className="bg-white px-2 py-0.5 rounded border border-blue-200 font-mono text-[11px]">MONGODB_URI</code> variable with your MongoDB connection string:
                    <div className="mt-1 p-2 bg-slate-900 text-emerald-400 rounded-xl font-mono text-[11px]">
                      MONGODB_URI=mongodb+srv://&lt;username&gt;:&lt;password&gt;@cluster0.mongodb.net/nexora?retryWrites=true&w=majority
                    </div>
                  </li>
                  <li>
                    Restart the backend server via <code className="bg-white px-2 py-0.5 rounded border border-blue-200 font-mono text-[11px]">npm run server</code>. The server will automatically connect to your live MongoDB cluster!
                  </li>
                </ol>
              </div>

            </div>

          </div>
        )}

      {/* ================= PATTERNED HOST DOCUMENT DETAILS MODAL ================= */}
      {selectedDbDoc && (() => {
        const doc = selectedDbDoc;
        const colName = doc._collection || selectedDbCollection;
        const timestamp = doc.createdAt || doc.timestamp || doc.updatedAt;
        const userName = doc.name || doc.user || (doc.visitorId ? `Visitor ${String(doc.visitorId).slice(-6)}` : 'Anonymous Contributor');
        const userEmail = doc.email || 'No email provided';
        const isEnquiry = colName === 'enquiries' || doc._entityType?.includes('Enquiry');
        const isFeedback = colName === 'feedback' || doc._entityType?.includes('Feedback');
        const isIssue = colName === 'issues' || doc._entityType?.includes('Issue');
        const isVisitor = colName === 'visitors' || doc._entityType?.includes('Visitor');

        return (
          <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-7 shadow-2xl border border-slate-200 space-y-5 max-h-[90vh] flex flex-col animate-in fade-in zoom-in-95 duration-200">
              
              {/* Modal Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className={`w-11 h-11 rounded-2xl flex items-center justify-center text-white text-base font-bold shadow-md ${
                    isEnquiry ? 'bg-gradient-to-tr from-blue-600 to-indigo-600' :
                    isFeedback ? 'bg-gradient-to-tr from-amber-500 to-orange-500' :
                    isIssue ? 'bg-gradient-to-tr from-rose-500 to-red-600' :
                    'bg-gradient-to-tr from-slate-600 to-slate-800'
                  }`}>
                    {userName[0]?.toUpperCase() || 'U'}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-base sm:text-lg font-bold text-slate-900">{userName}</h3>
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        isEnquiry ? 'bg-blue-50 text-blue-700 border border-blue-200' :
                        isFeedback ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                        isIssue ? 'bg-rose-50 text-rose-700 border border-rose-200' :
                        'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      }`}>
                        {isEnquiry ? '📩 Lead Inquiry' : isFeedback ? '⭐ User Review' : isIssue ? '🐛 Bug Report' : '🌐 Visitor Log'}
                      </span>
                    </div>
                    <div className="text-xs text-slate-500 font-mono mt-0.5">
                      MongoDB ObjectId: <strong className="text-slate-800 font-mono">{doc._id || doc.id}</strong>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedDbDoc(null)}
                  className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 font-bold transition-colors cursor-pointer"
                >
                  &times;
                </button>
              </div>

              {/* Modal Body */}
              <div className="overflow-y-auto space-y-4 pr-1 text-xs">
                
                {/* Contact & Profile Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400">Email Address</span>
                    <div className="text-xs font-semibold text-slate-800 mt-0.5 truncate" title={userEmail}>
                      {userEmail}
                    </div>
                  </div>

                  {doc.phone && (
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400">Phone Number</span>
                      <div className="text-xs font-semibold text-slate-800 mt-0.5">
                        {doc.phone}
                      </div>
                    </div>
                  )}

                  {doc.organization && (
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400">Organization / Lab</span>
                      <div className="text-xs font-semibold text-slate-800 mt-0.5 truncate">
                        {doc.organization}
                      </div>
                    </div>
                  )}

                  {doc.category && (
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400">Category</span>
                      <div className="text-xs font-semibold text-slate-800 mt-0.5">
                        {doc.category}
                      </div>
                    </div>
                  )}

                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400">Submitted At</span>
                    <div className="text-xs font-semibold text-slate-800 mt-0.5">
                      {timestamp ? new Date(timestamp).toLocaleString() : 'N/A'}
                    </div>
                  </div>

                  {/* Status / Rating pill */}
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400">Current Status</span>
                    <div className="mt-0.5">
                      {doc.rating ? (
                        <span className="text-amber-500 font-bold">
                          {'★'.repeat(doc.rating)} ({doc.rating}/5 Stars)
                        </span>
                      ) : doc.status ? (
                        <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-800">
                          {doc.status}
                        </span>
                      ) : (
                        <span className="text-slate-500 italic">Logged</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Subject & Full Content / Review Message */}
                <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      {isEnquiry ? 'Inquiry Subject & Message' : isFeedback ? 'User Experience Feedback' : isIssue ? 'Bug Summary & Reproduction Steps' : 'Visitor Navigation Footprint'}
                    </span>
                    {doc.priority && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                        Priority: {doc.priority}
                      </span>
                    )}
                    {doc.severity && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-rose-50 text-rose-700 border border-rose-200">
                        Severity: {doc.severity}
                      </span>
                    )}
                  </div>

                  {(doc.subject || doc.title) && (
                    <div className="text-sm font-bold text-slate-900 pt-1">
                      {doc.subject || doc.title}
                    </div>
                  )}

                  <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-3.5 rounded-xl border border-slate-100 whitespace-pre-wrap">
                    {doc.message || doc.feedback || doc.description || (doc.device ? `Device: ${doc.device} • Browser: ${doc.browser} • OS: ${doc.os} • Visited Route: ${doc.page}` : 'No extra written content')}
                  </p>
                </div>

                {/* Collapsible Technical MongoDB JSON View */}
                <details className="p-3.5 bg-slate-900 rounded-2xl border border-slate-800 text-slate-300">
                  <summary className="text-xs font-mono font-bold text-emerald-400 cursor-pointer flex items-center justify-between">
                    <span>+ View Technical MongoDB Atlas JSON Record</span>
                    <button
                      type="button"
                      onClick={(e) => { e.preventDefault(); handleCopyJSON(doc, 'modal-doc'); }}
                      className="text-[11px] text-slate-400 hover:text-white flex items-center gap-1 font-sans"
                    >
                      {copiedDocId === 'modal-doc' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedDocId === 'modal-doc' ? 'Copied' : 'Copy JSON'}</span>
                    </button>
                  </summary>
                  <pre className="text-emerald-400 font-mono text-[11px] overflow-x-auto p-2 pt-3 leading-relaxed">
                    {JSON.stringify(doc, null, 2)}
                  </pre>
                </details>

              </div>

              {/* Modal Footer */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => handleCopyJSON(doc, 'doc-full')}
                  className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  {copiedDocId === 'doc-full' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedDocId === 'doc-full' ? 'Copied to Clipboard' : 'Copy Full Record'}</span>
                </button>

                <button
                  onClick={() => setSelectedDbDoc(null)}
                  className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  Close Details
                </button>
              </div>

            </div>
          </div>
        );
      })()}

      </div>
    </div>
  );
}
