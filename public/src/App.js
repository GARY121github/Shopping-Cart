import "./App.css";
import Friends from "./components/Friends";
import Group from "./components/Group";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <div className="bg-slate-300">
        <Navbar />
        <Group />
        <Friends />
      </div>
    </>
  );
}

export default App;
