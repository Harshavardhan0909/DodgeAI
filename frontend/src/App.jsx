import GraphView from "./components/GraphView";
import ChatPanel from "./components/ChatPanel";

export default function App() {
  return (
    <div className="layout">
      <GraphView />
      <ChatPanel />
    </div>
  );
}