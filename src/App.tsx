import React, { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Login from './Login';      
import Register from './Register'; 
import Cabinet from './Cabinet';  

const App: React.FC = () => {
  const blockPage = ["/cabinet"]
  const navigate = useNavigate()
  useEffect(()=>{
    const id = localStorage.getItem('id')
    if(!id){
      if(blockPage.includes(location.pathname)){
        navigate('/login')
      }
    }
  })
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Register />} />
      <Route path="/cabinet" element={<Cabinet />} />
    </Routes>
  );
};

export default App;
