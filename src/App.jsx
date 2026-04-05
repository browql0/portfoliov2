import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import About from './components/About/About';
import Projects from './components/Projects/Projects';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';

// Admin Pages
import AdminLayout from './pages/Admin/AdminLayout';
import Dashboard from './pages/Admin/Dashboard';
import ProjectManager from './pages/Admin/ProjectManager';
import ProjectForm from './pages/Admin/ProjectForm';
import MessageManager from './pages/Admin/MessageManager';
import Login from './pages/Admin/Login';
import ProtectedRoute from './components/ProtectedRoute';

import './App.css';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public Portfolio */}
        <Route path="/" element={
          <div className="app">
            <Navbar />
            <Hero />
            <About />
            <Projects />
            <Contact />
            <Footer />
          </div>
        } />

        {/* Admin Secret Login */}
        <Route path="/admin/login" element={<Login />} />

        {/* Protected Admin Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="projects" element={<ProjectManager />} />
            <Route path="projects/new" element={<ProjectForm />} />
            <Route path="projects/edit/:id" element={<ProjectForm />} />
            <Route path="messages" element={<MessageManager />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
