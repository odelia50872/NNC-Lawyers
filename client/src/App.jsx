import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';
import { NotificationProvider } from './components/notifications/NotificationContext';
import PublicLayout from './components/PublicLayout';
import ProtectedRoute from './components/ProtectedRoute';
import ScrollToTop from './components/ScrollToTop';

import About from './pages/public/About';
import PracticeAreas from './pages/public/PracticeAreas';
import Team from './pages/public/Team';
import Contact from './pages/public/Contact';
import LegalArticle from './pages/public/LegalArticle';
import Accessibility from './pages/public/Accessibility';

import ClientDashboard from './pages/client/ClientDashboard';

import AdminDashboard from './pages/admin/AdminDashboard';

import Login from './pages/auth/Login';
import ChangePassword from './pages/auth/ChangePassword';

function App() {
  return (
    <LanguageProvider>
      <NotificationProvider>
        <AuthProvider>
          <ScrollToTop />
          <Routes>
            <Route element={<PublicLayout />}>
              <Route path="/" element={<About />} />
              <Route path="/about" element={<About />} />
              <Route path="/practice-areas" element={<PracticeAreas />} />
              <Route path="/team" element={<Team />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/legal-article" element={<LegalArticle />} />
              <Route path="/accessibility" element={<Accessibility />} />
              <Route path="/login" element={<Login />} />

              <Route element={<ProtectedRoute allowedRoles={['client', 'admin']} />}>
                <Route path="/change-password" element={<ChangePassword />} />
              </Route>

              <Route element={<ProtectedRoute allowedRoles={['client', 'admin']} />}>
                <Route path="/:name/dashboard" element={<ClientDashboard />} />
              </Route>

              <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
                <Route path="/admin" element={<AdminDashboard />} />
              </Route>
            </Route>
          </Routes>
        </AuthProvider>
      </NotificationProvider>
    </LanguageProvider>
  );
}

export default App;
