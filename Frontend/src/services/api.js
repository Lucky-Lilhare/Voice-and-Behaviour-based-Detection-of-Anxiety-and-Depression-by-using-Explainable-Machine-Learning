// Nexora Client API Service
const API_BASE = '/api';

const TOKEN_KEY = 'nexora_admin_host_token';

export const api = {
  // ================= Host Authentication =================
  getAdminToken() {
    return localStorage.getItem(TOKEN_KEY) || sessionStorage.getItem(TOKEN_KEY) || '';
  },

  setAdminToken(token, remember = false) {
    if (remember) {
      localStorage.setItem(TOKEN_KEY, token);
    } else {
      sessionStorage.setItem(TOKEN_KEY, token);
    }
  },

  clearAdminToken() {
    localStorage.removeItem(TOKEN_KEY);
    sessionStorage.removeItem(TOKEN_KEY);
  },

  async adminLogin(username, password, remember = false) {
    const res = await fetch(`${API_BASE}/admin/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || 'Invalid credentials');
    }
    this.setAdminToken(data.token, remember);
    return data;
  },

  async verifyAdminSession() {
    const token = this.getAdminToken();
    if (!token) return false;
    try {
      const res = await fetch(`${API_BASE}/admin/verify`, {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      return res.ok;
    } catch {
      return false;
    }
  },

  async adminLogout() {
    const token = this.getAdminToken();
    if (token) {
      try {
        await fetch(`${API_BASE}/admin/logout`, {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
          body: JSON.stringify({ token }),
        });
      } catch (err) {
        console.warn('Logout error:', err);
      }
    }
    this.clearAdminToken();
  },

  // ================= Analytics & Visitor Tracking =================
  async recordVisit(payload) {
    try {
      const res = await fetch(`${API_BASE}/analytics/visit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      return await res.json();
    } catch (err) {
      console.warn('Failed to record visit telemetry:', err);
      return null;
    }
  },

  async getAnalyticsOverview() {
    const res = await fetch(`${API_BASE}/analytics/overview`);
    if (!res.ok) throw new Error('Failed to load analytics overview');
    return await res.json();
  },

  async getRecentVisitors(limit = 50) {
    const res = await fetch(`${API_BASE}/analytics/recent?limit=${limit}`);
    if (!res.ok) throw new Error('Failed to load recent visitors');
    return await res.json();
  },

  // ================= Admin Stats & Live Database (Protected) =================
  async getAdminStats() {
    const token = this.getAdminToken();
    const res = await fetch(`${API_BASE}/admin/stats`, {
      headers: token ? { 'Authorization': `Bearer ${token}` } : {},
    });
    if (!res.ok) {
      if (res.status === 401) throw new Error('UNAUTHORIZED');
      throw new Error('Failed to load admin stats');
    }
    return await res.json();
  },

  async getDatabaseView() {
    const token = this.getAdminToken();
    const res = await fetch(`${API_BASE}/admin/database-view`, {
      headers: token ? { 'Authorization': `Bearer ${token}` } : {},
    });
    if (!res.ok) {
      if (res.status === 401) throw new Error('UNAUTHORIZED');
      throw new Error('Failed to load live database view');
    }
    return await res.json();
  },

  async seedDatabase() {
    const token = this.getAdminToken();
    const res = await fetch(`${API_BASE}/admin/seed`, {
      method: 'POST',
      headers: token ? { 'Authorization': `Bearer ${token}` } : {},
    });
    if (!res.ok) throw new Error('Failed to seed sample data');
    return await res.json();
  },

  // ================= Enquiries =================
  async createEnquiry(data) {
    const res = await fetch(`${API_BASE}/enquiries`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || 'Failed to submit enquiry');
    }
    return await res.json();
  },

  async getEnquiries() {
    const res = await fetch(`${API_BASE}/enquiries`);
    if (!res.ok) throw new Error('Failed to load enquiries');
    return await res.json();
  },

  async updateEnquiryStatus(id, status, notes) {
    const res = await fetch(`${API_BASE}/enquiries/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status, notes }),
    });
    if (!res.ok) throw new Error('Failed to update enquiry');
    return await res.json();
  },

  async deleteEnquiry(id) {
    const res = await fetch(`${API_BASE}/enquiries/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Failed to delete enquiry');
    return await res.json();
  },

  // ================= Feedback =================
  async createFeedback(data) {
    const res = await fetch(`${API_BASE}/feedback`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || 'Failed to submit feedback');
    }
    return await res.json();
  },

  async getFeedback() {
    const res = await fetch(`${API_BASE}/feedback`);
    if (!res.ok) throw new Error('Failed to load feedback');
    return await res.json();
  },

  // ================= Issues =================
  async createIssue(data) {
    const res = await fetch(`${API_BASE}/issues`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || 'Failed to submit issue');
    }
    return await res.json();
  },

  async getIssues() {
    const res = await fetch(`${API_BASE}/issues`);
    if (!res.ok) throw new Error('Failed to load issues');
    return await res.json();
  },

  async updateIssueStatus(id, status, resolutionNotes) {
    const res = await fetch(`${API_BASE}/issues/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status, resolutionNotes }),
    });
    if (!res.ok) throw new Error('Failed to update issue');
    return await res.json();
  },

  async deleteIssue(id) {
    const res = await fetch(`${API_BASE}/issues/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Failed to delete issue');
    return await res.json();
  },
};
