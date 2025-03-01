import './App.css';
import { Sidebar } from './components/sidebar/Sidebar.tsx';
import { ActionButtons } from './components/actionbuttons/ActionButtons.tsx';
import { Separator } from './components/separator/Separator.tsx';
import { BranchesTable } from './components/branches/BranchesTable.tsx';
import { Header } from './components/header/Header.tsx';
import { useState } from 'react';

const App = () => {
  const [selectedLaunches, setSelectedLaunches] = useState<number[]>([]);

  return (
    <>
      <Header />
      <div className="content-container">
        <Sidebar />
        <div className="content">
          <div className="content-header">Branches</div>
          <ActionButtons selectedLaunches={selectedLaunches} />
          <Separator />
          <BranchesTable
            selectedLaunches={selectedLaunches}
            setSelectedLaunches={setSelectedLaunches}
          />
        </div>
      </div>
    </>
  );
};

export default App;
