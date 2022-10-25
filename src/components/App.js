import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "../contexts/AuthContext";
import Signin from "./Signin";
import Dashboard from "./Dashboard";
import SubPart from "./SubPart";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Signin />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/subpart/:id" element={<SubPart/>}/>
      </Routes>
    </AuthProvider>
  );
}

export default App;
