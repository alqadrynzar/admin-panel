import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from './pages/Login'; // استيراد صفحة تسجيل الدخول
import Dashboard from './pages/Dashboard'; // استيراد صفحة لوحة التحكم

function App() {
  return (
    <Router>
      <Routes>
        {/* مسار صفحة تسجيل الدخول */}
        <Route path="/login" element={<Login />} />
        
        {/* مسار لوحة التحكم */}
        <Route path="/dashboard" element={<Dashboard />} />
        
        {/* إضافة مسار افتراضي / لتوجيه المستخدم إلى صفحة تسجيل الدخول */}
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;

