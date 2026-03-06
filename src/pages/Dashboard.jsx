import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { ShoppingCart, Star, Search, Filter } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Dashboard() {
  const { currentUser } = useAuth();
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Search and Filter State
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch('https://fakestoreapi.com/products');
      if (!res.ok) throw new Error('Failed to fetch products');
      const data = await res.json();
      setProducts(data);
      setFilteredProducts(data);
      
      // Extract unique categories
      const uniqueCategories = ['All', ...new Set(data.map(item => item.category))];
      setCategories(uniqueCategories);
    } catch (err) {
      setError(err.message);
      toast.error('Could not load products. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  // Effect to handle filtering and searching locally
  useEffect(() => {
    let result = products;
    
    // Apply category filter
    if (selectedCategory !== 'All') {
      result = result.filter(product => product.category === selectedCategory);
    }
    
    // Apply search filter
    if (searchTerm.trim() !== '') {
      const lowerCaseSearch = searchTerm.toLowerCase();
      result = result.filter(product => 
        product.title.toLowerCase().includes(lowerCaseSearch)
      );
    }
    
    setFilteredProducts(result);
  }, [searchTerm, selectedCategory, products]);

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-12">
      <div className="bg-gradient-to-br from-rose-100 to-amber-50 p-6 sm:p-10 rounded-3xl shadow-[0_8px_30px_rgb(225,29,72,0.1)] flex flex-col items-start justify-center relative overflow-hidden">
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-rose-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-pulse"></div>
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-amber-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-pulse delay-700"></div>
        <h1 className="text-3xl font-black text-rose-900 tracking-tight z-10">
          Welcome back, {currentUser?.name}.
        </h1>
        <p className="text-rose-700 mt-2 font-medium text-lg z-10">Ready to find something playful today?</p>
      </div>

      <div className="flex flex-col space-y-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h2 className="text-2xl font-black text-slate-800 tracking-tight">Featured Products</h2>
          
          {/* Search Control */}
          <div className="relative w-full md:w-auto group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search size={18} className="text-rose-400 group-focus-within:text-rose-600 transition-colors" />
            </div>
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-11 pr-4 py-3 w-full md:w-80 bg-white border-2 border-transparent rounded-full shadow-sm focus:border-rose-300 focus:ring-4 focus:ring-rose-100 text-sm font-bold outline-none transition-all placeholder:text-slate-400 text-slate-700"
            />
          </div>
        </div>

        {/* Category Filter */}
        <div 
          className="flex overflow-x-auto pb-4 pt-1 -mx-4 px-4 sm:mx-0 sm:px-0 space-x-3 [&::-webkit-scrollbar]:hidden" 
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`whitespace-nowrap px-5 py-2.5 rounded-full text-sm font-bold transition-all shadow-sm flex-shrink-0 ${
                selectedCategory === cat 
                  ? 'bg-rose-500 text-white shadow-rose-200 hover:-translate-y-0.5' 
                  : 'bg-white text-slate-600 hover:bg-rose-50 hover:text-rose-600 hover:-translate-y-0.5'
              }`}
            >
              <span className="capitalize w-full h-full block antialiased">{cat}</span>
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="bg-white rounded-3xl overflow-hidden shadow-sm p-2 animate-pulse">
              <div className="h-48 bg-rose-100/50 rounded-2xl w-full"></div>
              <div className="p-4 space-y-3">
                <div className="h-4 bg-rose-100 rounded-full w-3/4"></div>
                <div className="h-4 bg-rose-100 rounded-full w-1/2"></div>
                <div className="pt-4 flex justify-between items-center">
                  <div className="h-5 bg-rose-100 rounded-full w-1/4"></div>
                  <div className="h-8 bg-rose-100 rounded-full w-20"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="bg-white shadow-[0_8px_30px_rgb(225,29,72,0.1)] p-8 rounded-3xl text-center max-w-md mx-auto">
          <p className="text-rose-600 font-bold mb-4">{error}</p>
          <button 
            onClick={fetchProducts}
            className="px-6 py-3 bg-rose-500 text-white rounded-full font-bold hover:bg-rose-600 hover:-translate-y-1 hover:shadow-lg hover:shadow-rose-200 transition-all"
          >
            Try Again
          </button>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="bg-white shadow-[0_8px_30px_rgb(225,29,72,0.1)] p-12 rounded-3xl text-center max-w-lg mx-auto">
          <p className="text-slate-500 font-bold text-lg">Oops! No products found matching your search.</p>
          <button 
            onClick={() => { setSearchTerm(''); setSelectedCategory('All'); }}
            className="mt-6 px-6 py-3 bg-rose-50 text-rose-600 rounded-full font-bold hover:bg-rose-100 hover:-translate-y-1 transition-all"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-3xl p-2 shadow-sm hover:shadow-[0_8px_30px_rgb(225,29,72,0.15)] hover:-translate-y-1 transition-all duration-300 group flex flex-col">
              <div className="relative pt-[100%] overflow-hidden bg-rose-50/50 rounded-2xl">
                <img 
                  src={product.image} 
                  alt={product.title} 
                  className="absolute inset-0 w-full h-full object-contain p-8 mix-blend-multiply transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full text-xs font-black text-rose-500 flex items-center shadow-sm">
                  <Star size={12} className="text-amber-400 mr-1 fill-amber-400" />
                  {product.rating.rate}
                </div>
              </div>
              <div className="p-4 flex flex-col flex-1">
                <div className="text-[10px] text-rose-400 font-black uppercase tracking-widest mb-1.5">{product.category}</div>
                <h3 className="font-bold text-slate-800 line-clamp-2 leading-snug mb-3 flex-1 text-sm group-hover:text-rose-500 transition-colors" title={product.title}>
                  {product.title}
                </h3>
                <div className="flex items-center justify-between mt-auto pt-2">
                  <span className="text-xl font-black text-slate-900">${product.price.toFixed(2)}</span>
                  <button 
                    onClick={() => handleAddToCart(product)}
                    className="flex text-xs items-center justify-center bg-rose-50 text-rose-600 hover:bg-rose-500 hover:text-white px-4 py-2.5 rounded-full font-black transition-all shadow-sm hover:shadow-rose-200"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
