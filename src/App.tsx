import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './Login';      
import Register from './Register'; 
import Cabinet from './Cabinet';  

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Register />} />
      <Route path="/cabinet" element={<Cabinet />} />
    </Routes>
  );
};

export default App;
