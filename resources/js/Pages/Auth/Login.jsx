import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory(); // Untuk navigasi setelah login berhasil

  const handleSubmit = async (event) => {
    event.preventDefault(); // Menghentikan form default submit

    const requestBody = {
      username: username,  // Mengirim email di 'username'
      password: password,
    };

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody), // Mengirim body dalam format JSON
      });

      const data = await response.json();

      if (response.ok) {
        // Sukses login, arahkan ke halaman lain
        console.log('Login berhasil:', data);
        history.push('/dashboard');  // Arahkan pengguna ke halaman dashboard (atau halaman lain)
      } else {
        // Gagal login
        console.error('Login gagal:', data);
      }
    } catch (error) {
      console.error('Terjadi kesalahan:', error);
    }
  };

  return (
    <div className="w-screen min-h-screen flex items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8">
      <div className="relative py-3 sm:max-w-xs sm:mx-auto">
        <form onSubmit={handleSubmit} className="min-h-96 px-8 py-6 mt-4 text-left bg-white rounded-xl shadow-lg">
          <div className="flex flex-col justify-center items-center h-full select-none">
            <div className="flex flex-col items-center justify-center gap-2 mb-8">
              <a href="https://amethgalarcio.web.app/" target="_blank" rel="noopener noreferrer">
                <img src="/storage/img/logo.png" className="w-8" alt="Logo" />
              </a>
              <p className="m-0 text-[16px] font-semibold text-white">Login to your Account</p>
              <span className="m-0 text-xs max-w-[90%] text-center text-[#8B8E98]">
                Get started with our app, just start section and enjoy experience.
              </span>
            </div>
            <div className="w-full flex flex-col gap-2">
              <label className="font-semibold text-xs text-gray-400">Email</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="border rounded-lg px-3 py-2 mb-5 text-sm w-full outline-none border-gray-500"
                placeholder="Email"
              />
            </div>
          </div>
          <div className="w-full flex flex-col gap-2">
            <label className="font-semibold text-xs text-gray-400">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border rounded-lg px-3 py-2 mb-5 text-sm w-full outline-none border-gray-500"
              placeholder="••••••••"
            />
          </div>
          <div className="mt-5">
            <button
              type="submit"
              className="py-1 px-8 bg-blue-500 hover:bg-blue-800 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg cursor-pointer select-none"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

