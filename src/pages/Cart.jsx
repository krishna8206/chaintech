import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2, ArrowRight, ShoppingBag, ArrowLeft } from 'lucide-react';

export default function Cart() {
  const { cart, updateQuantity, removeFromCart, cartTotal } = useCart();

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6">
        <div className="w-28 h-28 bg-rose-100 rounded-full flex items-center justify-center shadow-sm">
          <ShoppingBag size={56} className="text-rose-400" />
        </div>
        <div className="text-center">
          <h2 className="text-2xl font-black text-slate-800 tracking-tight mb-2">Your cart is feeling light</h2>
          <p className="text-slate-500 mb-8 max-w-sm font-medium">Looks like you haven't added anything to your cart yet. Go ahead and explore our latest drops.</p>
          <Link 
            to="/" 
            className="inline-flex items-center justify-center px-8 py-4 text-sm font-black rounded-full text-white bg-rose-500 hover:bg-rose-600 shadow-[0_8px_30px_rgb(225,29,72,0.2)] hover:shadow-[0_8px_30px_rgb(225,29,72,0.3)] hover:-translate-y-1 transition-all"
          >
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between pb-4 border-b-2 border-rose-100">
        <h1 className="text-3xl font-black text-rose-900 tracking-tight">Shopping Cart</h1>
        <Link to="/" className="text-slate-500 font-bold hover:text-rose-500 flex items-center transition-colors">
          <ArrowLeft size={18} className="mr-2" /> Continue Shopping
        </Link>
      </div>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart Items List */}
        <div className="w-full lg:w-2/3 space-y-4">
          {cart.map((item) => (
            <div key={item.product.id} className="bg-white p-4 sm:p-6 rounded-3xl shadow-sm hover:shadow-[0_8px_30px_rgb(225,29,72,0.1)] hover:-translate-y-1 transition-all flex flex-col sm:flex-row items-center gap-6 border border-rose-50">
              <div className="w-24 h-24 sm:w-32 sm:h-32 flex-shrink-0 bg-rose-50/50 rounded-2xl p-2 relative overflow-hidden">
                <img 
                  src={item.product.image} 
                  alt={item.product.title} 
                  className="absolute inset-0 w-full h-full object-contain mix-blend-multiply p-4 transition-transform duration-500 hover:scale-110"
                />
              </div>
              
              <div className="flex-1 w-full flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start gap-4 mb-1">
                    <h3 className="font-bold text-slate-800 line-clamp-2 text-base">{item.product.title}</h3>
                    <p className="font-black text-rose-600 text-lg whitespace-nowrap">${(item.product.price * item.quantity).toFixed(2)}</p>
                  </div>
                  <p className="text-[10px] text-rose-400 mt-1 uppercase tracking-widest font-black">{item.product.category}</p>
                </div>
                
                <div className="flex items-center justify-between mt-6">
                  <div className="flex items-center bg-rose-50 rounded-full p-1 border border-rose-100">
                    <button 
                      onClick={() => updateQuantity(item.product.id, -1)}
                      className="p-2 text-slate-400 hover:text-rose-600 transition-colors rounded-full hover:bg-white shadow-sm"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="w-10 text-center font-black text-sm text-slate-800">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.product.id, 1)}
                      className="p-2 text-slate-400 hover:text-rose-600 transition-colors rounded-full hover:bg-white shadow-sm"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                  
                  <button 
                    onClick={() => removeFromCart(item.product.id)}
                    className="text-slate-400 hover:text-rose-500 p-3 transition-colors flex items-center justify-center rounded-full hover:bg-rose-50"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="w-full lg:w-1/3">
          <div className="bg-gradient-to-b from-white to-rose-50/50 p-6 sm:p-8 rounded-3xl border border-rose-100 shadow-[0_8px_30px_rgb(225,29,72,0.05)] sticky top-28">
            <h2 className="text-xl font-black text-slate-800 mb-6 pb-4 border-b-2 border-rose-100">
              Order Summary
            </h2>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-slate-500 items-center font-bold text-sm">
                <span>Subtotal</span>
                <span className="font-black text-slate-800">${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-500 items-center font-bold text-sm">
                <span>Shipping</span>
                <span className="font-black text-rose-500 bg-rose-100 px-2 py-0.5 rounded-md text-[10px] uppercase tracking-wide">Free</span>
              </div>
              <div className="flex justify-between text-slate-500 items-center font-bold text-sm">
                <span>Tax</span>
                <span className="font-black text-slate-800">$0.00</span>
              </div>
            </div>
            
            <div className="border-t-2 border-rose-100 pt-4 mb-8">
              <div className="flex justify-between items-end">
                <span className="text-sm font-black text-slate-500">Total</span>
                <span className="text-3xl font-black text-rose-600">${cartTotal.toFixed(2)}</span>
              </div>
            </div>
            
            <button className="w-full flex justify-center items-center py-4 px-4 rounded-full text-sm font-black text-white bg-rose-500 hover:bg-rose-600 focus:ring-4 focus:ring-rose-200 shadow-md hover:shadow-[0_8px_30px_rgb(225,29,72,0.3)] hover:-translate-y-1 transition-all">
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
