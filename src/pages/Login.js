import React, { useState } from 'react';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://yalla-backend.onrender.com/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email,
          password
        })
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || 'فشل تسجيل الدخول');
        return;
      }

      if (data.user.role !== 'admin') {
        alert('هذا الحساب ليس أدمن ❌');
        return;
      }

      // ✅ تسجيل دخول ناجح
      alert('تم تسجيل الدخول بنجاح ✅');

      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      // لاحقًا منعمل توجيه للوحة التحكم
    } catch (err) {
      console.error(err);
      alert('حدث خطأ، حاول لاحقًا');
    }
  };

  return (
    <div className="login-container">
      <h2>تسجيل دخول الأدمن</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="البريد الإلكتروني"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="كلمة المرور"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">تسجيل الدخول</button>
      </form>
    </div>
  );
}

export default Login;

