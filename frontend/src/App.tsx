import './App.css';
import { Sidebar } from './components/sidebar/Sidebar.tsx';
import { Separator } from './components/separator/Separator.tsx';
import { BranchesTable } from './components/branches/BranchesTable.tsx';
import { Header } from './components/header/Header.tsx';
import { ActionButtons } from './components/actionbuttons/ActionButtons.tsx';
import { useState } from 'react';
import { SelectableItem } from './model/SelectableItem.ts';

const App = () => {
  const [selectedItems, setSelectedItems] = useState<SelectableItem[]>([]);

  return (
    <>
      <Header />
      <div className="content-container">
        <Sidebar />
        <div className="content">
          <div className="content-header">Launches</div>
          <ActionButtons selectedItems={selectedItems} />
          <Separator />
          <BranchesTable setSelectedItems={setSelectedItems} />
        </div>
      </div>
    </>
  );
};

export default App;
