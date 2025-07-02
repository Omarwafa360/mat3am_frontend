import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Toaster } from '@/components/ui/toaster';
import Layout from '@/components/layout/Layout';
import PageLoader from '@/components/shared/PageLoader';
import { useTheme } from '@/contexts/ThemeContext';
import { hexToHsl } from '@/lib/colorUtils';

const Home = React.lazy(() => import('@/pages/Home'));
const About = React.lazy(() => import('@/pages/About'));
const Menu = React.lazy(() => import('@/pages/Menu'));
const Gallery = React.lazy(() => import('@/pages/Gallery'));
const Contact = React.lazy(() => import('@/pages/Contact'));
const Booking = React.lazy(() => import('@/pages/Booking'));
const Admin = React.lazy(() => import('@/pages/AdminDashboardPage')); // ✅ هنا التعديل الصحيح
const NotFound = React.lazy(() => import('@/pages/NotFound'));

function App() {
  const location = useLocation();
  const { pageBackgrounds } = useTheme();

  useEffect(() => {
    let pageColor = '#ffffff';

    switch (location.pathname) {
      case '/':
        pageColor = pageBackgrounds.Home || '#ffffff';
        break;
      case '/about':
        pageColor = pageBackgrounds.About || '#ffffff';
        break;
      case '/menu':
        pageColor = pageBackgrounds.Menu || '#ffffff';
        break;
      case '/gallery':
        pageColor = pageBackgrounds.Gallery || '#ffffff';
        break;
      case '/contact':
        pageColor = pageBackgrounds.Contact || '#ffffff';
        break;
      case '/booking':
        pageColor = pageBackgrounds.Booking || '#ffffff';
        break;
      case '/admin':
        pageColor = pageBackgrounds.Admin || '#ffffff';
        break;
      default:
        pageColor = '#ffffff';
    }

    const hslColor = hexToHsl(pageColor);
    document.body.style.setProperty('--background', hslColor);
  }, [location.pathname, pageBackgrounds]);

  return (
    <>
      <Layout>
        <AnimatePresence mode="wait" initial={false}>
          <React.Suspense fallback={<PageLoader />}>
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/booking" element={<Booking />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </React.Suspense>
        </AnimatePresence>
      </Layout>
      <Toaster />
    </>
  );
}

export default App;
