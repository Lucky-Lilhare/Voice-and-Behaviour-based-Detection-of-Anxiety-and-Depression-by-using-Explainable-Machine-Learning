import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  Filter, 
  Calendar, 
  Mic, 
  Video, 
  Eye, 
  ArrowUpDown, 
  PlusCircle, 
  Clock, 
  RotateCcw,
  Sparkles,
  Inbox
} from 'lucide-react';
import { useAssessment } from '../context/AssessmentContext';
import DemoDataBanner from '../components/DemoDataBanner';
import EmptyState from '../components/EmptyState';

export default function AssessmentHistoryPage() {
  const { assessments } = useAssessment();

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [modalityFilter, setModalityFilter] = useState('all'); // 'all' | 'multimodal' | 'voice' | 'video'
  const [statusFilter, setStatusFilter] = useState('all'); // 'all' | 'completed' | 'mild'
  const [sortOrder, setSortOrder] = useState('desc'); // 'desc' | 'asc'

  // Filtered and sorted records
  const filteredAssessments = useMemo(() => {
    let result = [...assessments];

    // Search by ID or summary text
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(item => 
        item.id.toLowerCase().includes(q) || 
        item.summary.toLowerCase().includes(q)
      );
    }

    // Modality filter
    if (modalityFilter !== 'all') {
      result = result.filter(item => {
        if (modalityFilter === 'multimodal') return item.type.toLowerCase().includes('multimodal');
        if (modalityFilter === 'voice') return item.type.toLowerCase().includes('voice') && !item.type.toLowerCase().includes('multimodal');
        if (modalityFilter === 'video') return item.type.toLowerCase().includes('video') && !item.type.toLowerCase().includes('multimodal');
        return true;
      });
    }

    // Status filter
    if (statusFilter !== 'all') {
      result = result.filter(item => {
        if (statusFilter === 'completed') return item.statusColor === 'emerald';
        if (statusFilter === 'mild') return item.statusColor === 'amber';
        return true;
      });
    }

    // Sort order (by index or simulated chronological)
    if (sortOrder === 'asc') {
      result.reverse();
    }

    return result;
  }, [assessments, searchQuery, modalityFilter, statusFilter, sortOrder]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setModalityFilter('all');
    setStatusFilter('all');
    setSortOrder('desc');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Assessment Session History
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Browse, filter, and inspect previous multimodal screening sessions and biomarker reports
          </p>
        </div>

        <Link
          to="/assessment"
          className="self-start sm:self-auto px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-semibold text-xs shadow-sm transition-colors flex items-center gap-1.5"
        >
          <PlusCircle className="w-4 h-4" />
          <span>New Assessment</span>
        </Link>
      </div>

      {/* Demo data notice */}
      <DemoDataBanner
        title="DEMONSTRATION RESEARCH RECORDS"
        message="All records listed below are simulated sessions with synthesized acoustic parameters and action units for B.Tech project presentation."
      />

      {/* Search and Filters Bar */}
      <div className="bg-white rounded-3xl border border-slate-200 p-5 sm:p-6 shadow-soft space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
          
          {/* Search Input */}
          <div className="md:col-span-5 relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by ID (e.g. ASM-2026-104) or keyword..."
              className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/60 focus:bg-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 text-xs"
              >
                Clear
              </button>
            )}
          </div>

          {/* Modality Filter */}
          <div className="md:col-span-3">
            <select
              value={modalityFilter}
              onChange={(e) => setModalityFilter(e.target.value)}
              className="w-full py-2.5 px-3 rounded-xl border border-slate-200 bg-slate-50/60 focus:bg-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 text-slate-700 font-medium"
            >
              <option value="all">All Modalities</option>
              <option value="multimodal">Multimodal (Voice + Facial)</option>
              <option value="voice">Voice Only</option>
              <option value="video">Video Only</option>
            </select>
          </div>

          {/* Status Filter */}
          <div className="md:col-span-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full py-2.5 px-3 rounded-xl border border-slate-200 bg-slate-50/60 focus:bg-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 text-slate-700 font-medium"
            >
              <option value="all">All Statuses</option>
              <option value="completed">Stable (Normal)</option>
              <option value="mild">Mild Variation</option>
            </select>
          </div>

          {/* Sort Order Toggle */}
          <div className="md:col-span-2 flex items-center gap-2">
            <button
              type="button"
              onClick={() => setSortOrder(prev => prev === 'desc' ? 'asc' : 'desc')}
              className="w-full py-2.5 px-3 rounded-xl border border-slate-200 bg-slate-50/60 hover:bg-slate-100 text-slate-700 text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
            >
              <ArrowUpDown className="w-3.5 h-3.5 text-slate-500" />
              <span>{sortOrder === 'desc' ? 'Newest First' : 'Oldest First'}</span>
            </button>
          </div>

        </div>

        {/* Active Filters count & reset */}
        {(searchQuery || modalityFilter !== 'all' || statusFilter !== 'all') && (
          <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
            <span>Showing {filteredAssessments.length} matching assessment records</span>
            <button
              type="button"
              onClick={handleResetFilters}
              className="text-teal-700 hover:underline font-semibold flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset all filters</span>
            </button>
          </div>
        )}
      </div>

      {/* Assessments Records Table or Empty State */}
      {filteredAssessments.length === 0 ? (
        <EmptyState
          title="No Matching Assessments"
          description={
            searchQuery || modalityFilter !== 'all' || statusFilter !== 'all'
              ? "No records matched your search query or filters. Try adjusting your search term."
              : "No assessment sessions have been logged yet. Launch your first guided screening session."
          }
          actionText={
            searchQuery || modalityFilter !== 'all' || statusFilter !== 'all'
              ? "Clear Filter Criteria"
              : "Start First Assessment"
          }
          onActionClick={
            searchQuery || modalityFilter !== 'all' || statusFilter !== 'all'
              ? handleResetFilters
              : null
          }
          actionLink={
            searchQuery || modalityFilter !== 'all' || statusFilter !== 'all'
              ? null
              : "/assessment"
          }
          icon={Inbox}
        />
      ) : (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-soft overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider text-[10px] border-b border-slate-200">
                <tr>
                  <th className="py-3.5 px-4 font-bold">Assessment ID</th>
                  <th className="py-3.5 px-4 font-bold">Date & Time</th>
                  <th className="py-3.5 px-4 font-bold">Modality</th>
                  <th className="py-3.5 px-4 font-bold">Status</th>
                  <th className="py-3.5 px-4 font-bold">Stability Score</th>
                  <th className="py-3.5 px-4 font-bold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredAssessments.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-4 px-4 whitespace-nowrap">
                      <span className="font-mono font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded text-xs">
                        {item.id}
                      </span>
                    </td>

                    <td className="py-4 px-4 whitespace-nowrap text-slate-700">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span>{item.date}</span>
                      </div>
                    </td>

                    <td className="py-4 px-4 whitespace-nowrap">
                      <span className="inline-flex items-center gap-1.5 font-medium text-slate-800">
                        {item.type.includes('Voice') && <Mic className="w-3.5 h-3.5 text-teal-600" />}
                        {(item.type.includes('Video') || item.type.includes('Facial')) && <Video className="w-3.5 h-3.5 text-lavender-600" />}
                        {item.type}
                      </span>
                    </td>

                    <td className="py-4 px-4 whitespace-nowrap">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        item.statusColor === 'amber'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}>
                        <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                        {item.status}
                      </span>
                    </td>

                    <td className="py-4 px-4 whitespace-nowrap font-mono font-bold text-slate-900 text-sm">
                      {item.compositeScore} <span className="text-[11px] font-normal text-slate-400">/ 100</span>
                    </td>

                    <td className="py-4 px-4 whitespace-nowrap text-right">
                      <Link
                        to={`/results/${item.id}`}
                        className="px-3.5 py-1.5 rounded-lg bg-teal-50 hover:bg-teal-100 text-teal-800 font-semibold text-xs transition-colors inline-flex items-center gap-1"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>View Details</span>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Displaying {filteredAssessments.length} assessment records</span>
            <span className="text-[11px] text-slate-400">Client-side demonstration store</span>
          </div>
        </div>
      )}

    </div>
  );
}
