import './App.css';
import { Sidebar } from './components/sidebar/Sidebar.tsx';
import { ActionButtons } from './components/actionbuttons/ActionButtons.tsx';
import { Separator } from './components/separator/Separator.tsx';
import { BranchesTable } from './components/branches/BranchesTable.tsx';
import { Header } from './components/header/Header.tsx';

const App = () => {
  return (
    <>
      <Header />
      <div className="content-container">
        <Sidebar />
        <div className="content">
          <div className="content-header">Branches</div>
          <ActionButtons />
          <Separator />
          <BranchesTable />
        </div>
      </div>
    </>
  );
};

export default App;
