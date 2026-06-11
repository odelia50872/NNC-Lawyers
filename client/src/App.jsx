import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';
import { NotificationProvider } from './components/notifications/NotificationContext';
import PublicLayout from './components/PublicLayout';
import ProtectedRoute from './components/ProtectedRoute';

import About from './pages/public/About';
import PracticeAreas from './pages/public/PracticeAreas';
import Team from './pages/public/Team';
import Contact from './pages/public/Contact';
import LegalArticle from './pages/public/LegalArticle';

import ClientDashboard from './pages/client/ClientDashboard';

import AdminDashboard from './pages/admin/AdminDashboard';

import Login from './pages/auth/Login';

function App() {
  return (
    <LanguageProvider>
    <NotificationProvider>
    <AuthProvider>
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/nnc" element={<About />} />
        <Route path="/nnc/about" element={<About />} />
        <Route path="/nnc/practice-areas" element={<PracticeAreas />} />
        <Route path="/nnc/team" element={<Team />} />
        <Route path="/nnc/contact" element={<Contact />} />
        <Route path="/nnc/legal-article" element={<LegalArticle />} />
        <Route path="/nnc/login" element={<Login />} />

        <Route element={<ProtectedRoute allowedRoles={['client', 'admin']} />}>
          <Route path="/nnc/:name/dashboard" element={<ClientDashboard />} />
        </Route>

        <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
          <Route path="/nnc/admin" element={<AdminDashboard />} />
        </Route>
      </Route>
    </Routes>
    </AuthProvider>
    </NotificationProvider>
    </LanguageProvider>
  );
}

export default App;
