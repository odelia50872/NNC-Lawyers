import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';
import PublicLayout from './components/PublicLayout';
import ProtectedRoute from './components/ProtectedRoute';

import About from './pages/public/About';
import PracticeAreas from './pages/public/PracticeAreas';
import Team from './pages/public/Team';
import Contact from './pages/public/Contact';

import ClientDashboard from './pages/client/ClientDashboard';

import AdminDashboard from './pages/admin/AdminDashboard';
import AdminClients from './pages/admin/AdminClients';

import Login from './pages/auth/Login';

function App() {
  return (
    <LanguageProvider>
    <AuthProvider>
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<About />} />
        <Route path="/about" element={<About />} />
        <Route path="/practice-areas" element={<PracticeAreas />} />
        <Route path="/team" element={<Team />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />

        <Route element={<ProtectedRoute allowedRoles={['client', 'admin']} />}>
          <Route path="/client/dashboard" element={<ClientDashboard />} />
        </Route>

        <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/clients" element={<AdminClients />} />
        </Route>
      </Route>
    </Routes>
    </AuthProvider>
    </LanguageProvider>
  );
}

export default App;
