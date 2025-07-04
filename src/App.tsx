// src/App.tsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import SpeakerSelector from "./components/SpeakerSelector";
import SpeakerProfile from "./pages/SpeakerProfile";
import OrderOfProgram from "./pages/OrderOfProgram";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/select" element={<SpeakerSelector />} />
      <Route path="/order" element={<OrderOfProgram />} />
      <Route path="/" element={<SpeakerProfile />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;
