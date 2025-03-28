import './App.css';
import { Sidebar } from './components/sidebar/Sidebar.tsx';
import { Header } from './components/header/Header.tsx';
import LaunchesContent from './components/content/LaunchesContent.tsx';
import { Navigate, Route, Routes } from 'react-router-dom';
import ProfilesContentWithParams from './components/hocs/ProfilesContentWithParams.tsx';
import { initializeIcons } from '@fluentui/react';

const App = () => {
  initializeIcons();

  return (
    <>
      <Header />
      <div className="content-container">
        <Sidebar />
        <Routes>
          <Route index element={<Navigate to="/launches" />} />
          <Route path="/launches" element={<LaunchesContent />} />
          <Route path="/launches/:id/profiles" element={<ProfilesContentWithParams />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
