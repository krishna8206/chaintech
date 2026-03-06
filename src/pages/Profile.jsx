import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Lock, Save } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Profile() {
  const { currentUser, updateProfile } = useAuth();
  
  const [name, setName] = useState(currentUser?.name || '');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [password, setPassword] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email) {
      toast.error('Name and Email cannot be empty');
      return;
    }
    
    const success = updateProfile(name, email, password);
    if (success) {
      toast.success('Profile updated successfully');
      setPassword('');
    } else {
      toast.error('Could not update profile');
    }
  };
  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="bg-white p-8 sm:p-12 rounded-3xl shadow-[0_8px_30px_rgb(225,29,72,0.1)] border border-rose-50 relative overflow-hidden">
        <div className="absolute -top-20 -right-20 w-48 h-48 bg-rose-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-pulse"></div>
        
        <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-8 mb-10 pb-10 border-b-2 border-rose-100 relative z-10">
          <div className="w-28 h-28 rounded-[2rem] bg-gradient-to-tr from-rose-400 to-pink-500 text-white flex items-center justify-center font-black text-5xl shadow-md transform rotate-3 hover:rotate-0 transition-all duration-300 cursor-default">
            {currentUser?.name?.charAt(0).toUpperCase() || <User size={48} />}
          </div>
          <div className="text-center sm:text-left pt-2">
            <h1 className="text-3xl font-black text-rose-900 tracking-tight">{currentUser?.name}</h1>
            <p className="text-rose-500 font-bold mt-1 text-base">{currentUser?.email}</p>
          </div>
        </div>
        
        <h2 className="text-xl font-black text-slate-800 mb-8 pb-4 relative z-10">
          Edit Profile
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-black text-slate-700 mb-2 pl-1">Full Name</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User size={18} className="text-rose-400 group-focus-within:text-rose-600 transition-colors" />
                </div>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="pl-11 block w-full outline-none rounded-full border-2 border-transparent bg-rose-50/50 px-5 py-3 transition-all text-sm font-bold focus:border-rose-300 focus:ring-4 focus:ring-rose-100 text-slate-800"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-black text-slate-700 mb-2 pl-1">Email Address</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail size={18} className="text-rose-400 group-focus-within:text-rose-600 transition-colors" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-11 block w-full outline-none rounded-full border-2 border-transparent bg-rose-50/50 px-5 py-3 transition-all text-sm font-bold focus:border-rose-300 focus:ring-4 focus:ring-rose-100 text-slate-800"
                />
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-black text-slate-700 mb-2 pl-1">New Password (Optional)</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock size={18} className="text-rose-400 group-focus-within:text-rose-600 transition-colors" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-11 block w-full outline-none rounded-full border-2 border-transparent bg-rose-50/50 px-5 py-3 transition-all text-sm font-bold focus:border-rose-300 focus:ring-4 focus:ring-rose-100 placeholder:text-rose-300 text-slate-800"
                  placeholder="Leave blank to keep current password"
                />
              </div>
            </div>
          </div>

          <div className="pt-6 flex justify-end">
            <button
              type="submit"
              className="flex justify-center items-center py-4 px-8 rounded-full text-sm font-black text-white bg-rose-500 hover:bg-rose-600 focus:outline-none focus:ring-4 focus:ring-rose-200 transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
            >
              <Save size={18} className="mr-2" /> Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
