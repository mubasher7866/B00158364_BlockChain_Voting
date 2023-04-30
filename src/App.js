import { Route, Routes } from "react-router-dom";
import AdminPage from "./components/AdminPage";
import Home from "./components/Home";
import { ToastContainer } from "react-toastify";
import { VoterReg } from "./components/VoterReg";
import { AdminTabs } from "./components/AdminTabs";

function App() {
  
  return (
    <div className="App">
      <ToastContainer/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/election/:electionId" element={<VoterReg/>}/>
        <Route path="/admin" element={<AdminPage/>}/>
        <Route path="/admin/:electionId" element={<AdminTabs/>}/>
      </Routes>
    </div>
  );
}

export default App;
