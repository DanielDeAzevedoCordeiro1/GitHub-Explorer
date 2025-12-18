import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import Home from './pages/Home';
import UserProfile from './pages/UserProfile';
import RepositoryDetails from './pages/RepositoryDetails';

const App: React.FC = () => {
  return (
    <Router>
      <UserProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/user/:username" element={<UserProfile />} />
          <Route path="/repository/:owner/:repo" element={<RepositoryDetails />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </UserProvider>
    </Router>
  );
};

export default App;
