import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ShoppingBag, Mail, Lock, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Please enter email and password');
      return;
    }
    const success = login(email, password);
    if (success) {
      toast.success('Successfully logged in');
      navigate('/');
    } else {
      toast.error('Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-8 bg-rose-50 text-slate-800 selection:bg-rose-200 selection:text-rose-900">
      <div className="w-full max-w-md bg-white p-8 sm:p-10 rounded-3xl shadow-[0_8px_30px_rgb(225,29,72,0.1)] border border-rose-50 relative overflow-hidden">
        <div className="absolute -top-20 -right-20 w-48 h-48 bg-rose-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-pulse"></div>
        <div className="mb-8 text-center relative z-10">
          <div className="mx-auto w-14 h-14 bg-rose-100 rounded-3xl flex items-center justify-center mb-6 shadow-sm">
            <ShoppingBag size={28} className="text-rose-500" />
          </div>
          <h2 className="text-2xl font-black text-rose-900 tracking-tight">Sign in to LuxeCommerce</h2>
          <p className="text-rose-500 mt-2 font-bold text-sm">Welcome back. Let's get shopping!</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
          <div>
            <label className="block text-sm font-black text-slate-700 mb-2 pl-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full outline-none rounded-full border-2 border-transparent bg-rose-50/50 px-5 py-3 transition-all text-sm font-bold focus:border-rose-300 focus:ring-4 focus:ring-rose-100 placeholder:text-rose-300 text-slate-800"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-black text-slate-700 mb-2 pl-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full outline-none rounded-full border-2 border-transparent bg-rose-50/50 px-5 py-3 transition-all text-sm font-bold focus:border-rose-300 focus:ring-4 focus:ring-rose-100 placeholder:text-rose-300 text-slate-800"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full flex justify-center items-center py-4 px-4 rounded-full text-sm font-black text-white bg-rose-500 hover:bg-rose-600 focus:outline-none focus:ring-4 focus:ring-rose-200 transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 mt-8"
          >
            Sign in
          </button>
        </form>

        <p className="mt-8 text-center text-sm font-bold text-slate-500 relative z-10">
          Don't have an account?{' '}
          <Link to="/register" className="font-black text-rose-500 hover:text-rose-600 hover:underline hover:underline-offset-4 transition-all">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
