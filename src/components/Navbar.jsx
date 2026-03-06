import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { ShoppingCart, User, LogOut, Package, Clock } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const { currentUser, logout, sessionExpiresAt } = useAuth();
  const { cart } = useCart();
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    if (!sessionExpiresAt) return;

    const updateTimer = () => {
      const remaining = Math.max(0, sessionExpiresAt - Date.now());
      const minutes = Math.floor(remaining / 60000);
      const seconds = Math.floor((remaining % 60000) / 1000);
      setTimeLeft(`${minutes}:${seconds.toString().padStart(2, '0')}`);
    };

    updateTimer();
    const timer = setInterval(updateTimer, 1000);
    return () => clearInterval(timer);
  }, [sessionExpiresAt]);

  return (
    <>
      <div className="pt-4 px-4 sm:px-6 lg:px-8 z-50 sticky top-4">
        <nav className="max-w-7xl mx-auto bg-white/90 backdrop-blur-md rounded-full shadow-[0_8px_30px_rgb(225,29,72,0.1)] transition-all duration-300 border border-white">
          <div className="px-6 py-3">
            <div className="flex justify-between items-center w-full">
              <div className="flex items-center space-x-4 sm:space-x-8">
                <Link to="/" className="flex-shrink-0 flex items-center space-x-2 group">
                  <div className="bg-rose-100 p-2 rounded-full text-rose-500 group-hover:bg-rose-500 group-hover:text-white transition-colors duration-300">
                    <Package className="h-5 w-5 sm:h-6 sm:w-6" />
                  </div>
                  <span className="font-black text-lg sm:text-xl text-slate-800 tracking-tight">LuxeCommerce</span>
                </Link>
                
                <div className="hidden md:flex items-center space-x-2">
                  <Link to="/" className="text-sm font-bold text-slate-600 hover:text-rose-500 hover:bg-rose-50 px-4 py-2 rounded-full transition-all">Products</Link>
                  <Link to="/cart" className="text-sm font-bold text-slate-600 hover:text-rose-500 hover:bg-rose-50 px-4 py-2 rounded-full flex items-center transition-all">
                    Cart
                    {cart.length > 0 && (
                      <span className="ml-2 inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 text-[10px] font-black text-white bg-rose-500 rounded-full shadow-sm animate-bounce">
                        {cart.length}
                      </span>
                    )}
                  </Link>
                  <Link to="/profile" className="text-sm font-bold text-slate-600 hover:text-rose-500 hover:bg-rose-50 px-4 py-2 rounded-full transition-all">Profile</Link>
                </div>
              </div>
              
              <div className="flex items-center space-x-4 sm:space-x-6">
                <div className="hidden lg:flex items-center space-x-1.5 text-xs text-rose-400 font-bold bg-rose-50 px-3 py-1.5 rounded-full">
                  <Clock size={14} />
                  <span>Session: {timeLeft}</span>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2 bg-slate-100 hover:bg-rose-50 cursor-pointer transition-colors p-1.5 pr-4 rounded-full">
                    <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-rose-400 to-pink-500 text-white flex items-center justify-center font-bold text-sm shadow-sm">
                      {currentUser?.name?.charAt(0).toUpperCase() || <User size={14} />}
                    </div>
                    <span className="text-sm font-bold text-slate-700 hidden sm:block truncate max-w-[120px]">{currentUser?.name}</span>
                  </div>
                  
                  <button 
                    onClick={logout}
                    className="p-2.5 rounded-full text-slate-400 hover:text-rose-500 hover:bg-rose-50 transition-all focus:outline-none focus:ring-2 focus:ring-rose-200"
                    title="Logout"
                  >
                    <LogOut className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </nav>
        {/* Mobile session timer */}
        <div className="md:hidden mt-2 bg-rose-100/50 backdrop-blur-sm rounded-full py-1.5 px-4 flex justify-center items-center text-xs font-bold text-rose-500 space-x-1 max-w-[200px] mx-auto shadow-sm">
          <Clock size={12} />
          <span>Session: {timeLeft}</span>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-4 left-4 right-4 z-50">
        <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-[0_8px_30px_rgb(225,29,72,0.15)] flex justify-around items-center py-2 px-2 border border-white">
          <Link to="/" className="flex flex-col items-center justify-center w-full text-slate-400 hover:text-rose-500 active:text-rose-500 transition-colors py-2 rounded-xl hover:bg-rose-50">
            <Package size={22} className="mb-1" />
            <span className="text-[10px] font-bold">Shop</span>
          </Link>
          <Link to="/cart" className="flex flex-col items-center justify-center w-full text-slate-400 hover:text-rose-500 active:text-rose-500 transition-colors py-2 rounded-xl hover:bg-rose-50 relative">
            <div className="relative">
              <ShoppingCart size={22} className="mb-1" />
              {cart.length > 0 && (
                <span className="absolute -top-1.5 -right-2 inline-flex items-center justify-center min-w-[16px] h-4 text-[9px] font-bold text-white bg-rose-500 rounded-full shadow-sm animate-bounce">
                  {cart.length}
                </span>
              )}
            </div>
            <span className="text-[10px] font-bold">Cart</span>
          </Link>
          <Link to="/profile" className="flex flex-col items-center justify-center w-full text-slate-400 hover:text-rose-500 active:text-rose-500 transition-colors py-2 rounded-xl hover:bg-rose-50">
            <User size={22} className="mb-1" />
            <span className="text-[10px] font-bold">Profile</span>
          </Link>
        </div>
      </div>
    </>
  );
}
