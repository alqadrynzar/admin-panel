import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // استيراد useNavigate للتوجيه بعد تسجيل الدخول

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // تهيئة useNavigate

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
      console.log("الرد من السيرفر:", data);

      if (!response.ok) {
        alert(data.message || 'فشل تسجيل الدخول');
        return;
      }

      // بعد التسجيل الناجح، نخزن الـ accessToken فقط
      if (data.accessToken) {
        alert('تم تسجيل الدخول بنجاح ✅');
        localStorage.setItem('accessToken', data.accessToken);
        localStorage.setItem('refreshToken', data.refreshToken); // إذا حابب تخزنها

        // التوجيه إلى لوحة التحكم بعد تسجيل الدخول الناجح
        navigate('/dashboard'); // تغيير المسار إلى لوحة التحكم
      } else {
        alert('حدث خطأ، حاول لاحقًا');
      }

    } catch (err) {
      console.error(err);
      alert('حدث خطأ، حاول لاحقًا');
    }
  };

  return (
    <div className="login-container">
      <h2>تسجيل دخول</h2>
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

