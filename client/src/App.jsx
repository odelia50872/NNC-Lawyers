import { Routes, Route } from 'react-router-dom';
import PublicLayout from './components/PublicLayout';

import Home from './pages/public/Home';
import About from './pages/public/About';
import PracticeAreas from './pages/public/PracticeAreas';
import Team from './pages/public/Team';
import Contact from './pages/public/Contact';

import ClientDashboard from './pages/client/ClientDashboard';
import ClientCases from './pages/client/ClientCases';

import AdminDashboard from './pages/admin/AdminDashboard';
import AdminClients from './pages/admin/AdminClients';

import Login from './pages/auth/Login';

function App() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/practice-areas" element={<PracticeAreas />} />
        <Route path="/team" element={<Team />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
      </Route>

      <Route path="/client/dashboard" element={<ClientDashboard />} />
      <Route path="/client/cases" element={<ClientCases />} />

      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/admin/clients" element={<AdminClients />} />
    </Routes>
  );
}

export default App;
