import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { api } from '../services/api';

function detectDevice() {
  const ua = navigator.userAgent || '';
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
    return 'Tablet';
  }
  if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/i.test(ua)) {
    return 'Mobile';
  }
  return 'Desktop';
}

function detectBrowser() {
  const ua = navigator.userAgent || '';
  if (ua.includes('Edg/')) return 'Edge';
  if (ua.includes('Chrome/')) return 'Chrome';
  if (ua.includes('Safari/') && !ua.includes('Chrome/')) return 'Safari';
  if (ua.includes('Firefox/')) return 'Firefox';
  if (ua.includes('OPR/') || ua.includes('Opera/')) return 'Opera';
  return 'Other';
}

function detectOS() {
  const ua = navigator.userAgent || '';
  if (ua.includes('Win')) return 'Windows';
  if (ua.includes('Mac')) return 'macOS';
  if (ua.includes('Linux')) return 'Linux';
  if (ua.includes('Android')) return 'Android';
  if (ua.includes('like Mac') || ua.includes('iPhone') || ua.includes('iPad')) return 'iOS';
  return 'Unknown';
}

export function useVisitorTracker() {
  const { pathname } = useLocation();
  const lastPathRef = useRef('');

  useEffect(() => {
    // Avoid double tracking in strict mode on identical path in rapid succession
    if (lastPathRef.current === pathname) return;
    lastPathRef.current = pathname;

    // Don't track admin portal route visits as regular external visitors
    if (pathname.startsWith('/admin')) return;

    try {
      const STORAGE_KEY_ID = 'nexora_visitor_id';
      const STORAGE_KEY_COUNT = 'nexora_visit_count';

      let visitorId = localStorage.getItem(STORAGE_KEY_ID);
      let isNewVisitor = false;
      let count = 1;

      if (!visitorId) {
        visitorId = `vis_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
        localStorage.setItem(STORAGE_KEY_ID, visitorId);
        localStorage.setItem(STORAGE_KEY_COUNT, '1');
        isNewVisitor = true;
      } else {
        const storedCount = parseInt(localStorage.getItem(STORAGE_KEY_COUNT) || '1', 10);
        count = storedCount + 1;
        localStorage.setItem(STORAGE_KEY_COUNT, count.toString());
      }

      api.recordVisit({
        visitorId,
        isNewVisitor,
        visitCount: count,
        page: pathname,
        referrer: document.referrer || 'Direct',
        device: detectDevice(),
        browser: detectBrowser(),
        os: detectOS(),
      });
    } catch (err) {
      console.warn('Visitor tracking error:', err);
    }
  }, [pathname]);
}

