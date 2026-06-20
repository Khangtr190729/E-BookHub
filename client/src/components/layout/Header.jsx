import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Library, User, BookOpen, Search } from 'lucide-react';
import { useCartStore } from '../../stores/cartStore';

const Header = () => {
  const { cartCount } = useCartStore();

  return (
    <header className="bg-[#171a21] shadow-2xl sticky top-0 z-50 border-b border-[#2a475e]">
      <div className="container mx-auto px-4 h-18 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-[#67c1f5] p-1.5 rounded-sm group-hover:bg-white transition-colors">
              <BookOpen className="text-[#171a21] w-6 h-6" />
            </div>
            <span className="text-2xl font-black tracking-tighter text-white uppercase italic">E-BookHub</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-sm font-bold uppercase tracking-widest">
            <Link to="/products" className="text-[#c7d5e0] hover:text-white transition">Cửa hàng</Link>
            <Link to="/library" className="text-[#c7d5e0] hover:text-white transition">Thư viện</Link>
            <Link to="/community" className="text-[#c7d5e0] hover:text-white transition opacity-50 cursor-not-allowed">Cộng đồng</Link>
            <Link to="/about" className="text-[#c7d5e0] hover:text-white transition opacity-50 cursor-not-allowed">Về chúng tôi</Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative hidden sm:block">
            <input 
              type="text" 
              placeholder="Tìm kiếm..." 
              className="bg-[#316282] text-white text-sm px-4 py-1.5 pr-10 rounded-sm focus:outline-none focus:ring-1 focus:ring-[#67c1f5] w-48 transition-all focus:w-64"
            />
            <Search className="w-4 h-4 text-[#171a21] absolute right-3 top-1/2 -translate-y-1/2" />
          </div>

          <Link to="/cart" className="relative p-2 text-[#c7d5e0] hover:text-white transition">
            <ShoppingCart className="w-6 h-6" />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 bg-[#5c7e10] text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-bold">
                {cartCount}
              </span>
            )}
          </Link>
          
          <div className="flex items-center gap-2 bg-[#2a475e] px-3 py-1.5 rounded-sm hover:bg-[#3d6c8d] cursor-pointer transition">
            <User className="w-4 h-4 text-[#67c1f5]" />
            <span className="text-xs font-bold text-[#c7d5e0]">Đăng nhập</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
