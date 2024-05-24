import 'reactflow/dist/style.css';
import FlowPanel from './components/FlowPanel';
import SidePanel from './components/SidePanel';
import TopBar from './components/TopBar';
import './App.css';

export default function App() {
  return (
    <div>
      <TopBar />
      <div className="app-content">
        <FlowPanel />
        <SidePanel />
      </div>
    </div>
  );
}
