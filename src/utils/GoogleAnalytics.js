// GoogleAnalytics.js
import  { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const GoogleAnalytics = () => {
  const location = useLocation();

  useEffect(() => {
    // Initialize Google Analytics
    const script1 = document.createElement('script');
    script1.async = true;
    script1.src = 'https://www.googletagmanager.com/gtag/js?id=G-KH2KTHK3SZ';
    document.head.appendChild(script1);

    script1.onload = () => {
      const script2 = document.createElement('script');
      script2.text = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-KH2KTHK3SZ');
      `;
      document.head.appendChild(script2);
    };
  }, []);

  useEffect(() => {
    // Log page views when the location changes
    if (typeof window.gtag === 'function') {
      window.gtag('config', 'G-KH2KTHK3SZ', {
        'page_path': location.pathname + location.search,
      });
    }
  }, [location]);

  return null;
};

export default GoogleAnalytics;
