import { Link } from 'react-router-dom';
import { BookOpen, CreditCard, ShieldCheck, Flame, Star, Clock } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { productService } from '../services/productService';
import ProductCard from '../components/product/ProductCard';
import Loading from '../components/common/Loading';
import { formatCurrency } from '../utils/formatCurrency';

const HomePage = () => {
  const { data: productsRes, isLoading } = useQuery({
    queryKey: ['featured-products'],
    queryFn: () => productService.getAll(),
  });

  const products = productsRes?.data || [];

  return (
    <div className="bg-[#1b2838] min-h-screen">
      {/* Hero Banner Area */}
      <section className="relative h-[500px] overflow-hidden group">
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
          style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=2698&auto=format&fit=crop")' }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#171a21] via-[#171a21]/60 to-transparent" />
        
        <div className="container mx-auto px-4 relative h-full flex flex-col justify-center items-start">
          <div className="max-w-xl">
            <div className="flex items-center gap-2 text-[#67c1f5] font-black uppercase tracking-widest text-xs mb-6">
              <span className="w-12 h-[2px] bg-[#67c1f5]" />
              Sản phẩm nổi bật
            </div>
            <h1 className="text-6xl font-black text-white mb-6 leading-tight drop-shadow-2xl italic tracking-tighter">
              KHÁM PHÁ <br/> THẾ GIỚI MỚI
            </h1>
            <p className="text-xl text-[#c7d5e0] mb-10 drop-shadow-lg font-medium">
              Hàng ngàn cuốn sách điện tử, tiểu thuyết và truyện tranh hấp dẫn nhất đang chờ đợi bạn tại E-BookHub.
            </p>
            <Link
              to="/products"
              className="steam-button-blue text-white px-12 py-4 rounded-sm font-black text-lg hover:shadow-[0_0_20px_rgba(103,193,245,0.4)] transition-all uppercase tracking-widest"
            >
              Xem ngay
            </Link>
          </div>
        </div>
      </section>

      {/* Main Content Sections */}
      <div className="container mx-auto px-4 -mt-12 relative z-10 pb-24">
        
        {/* Row Header */}
        <div className="flex items-center justify-between mb-6 bg-[#171a21]/80 backdrop-blur-md p-4 border-l-4 border-[#67c1f5]">
          <h2 className="text-lg font-bold text-white uppercase tracking-widest flex items-center gap-2">
            <Flame className="w-5 h-5 text-orange-500 fill-orange-500" />
            ĐANG THỊNH HÀNH
          </h2>
          <Link to="/products" className="text-xs font-bold text-[#67c1f5] hover:text-white border border-[#2a475e] px-3 py-1 hover:bg-[#2a475e] transition">
            Xem tất cả
          </Link>
        </div>

        {/* Product Grid */}
        {isLoading ? (
          <Loading />
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-20">
            {products.slice(0, 10).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {/* Secondary Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Large List */}
          <div className="lg:col-span-8 flex flex-col gap-4">
             <div className="bg-[#171a21]/60 p-4 border-b border-[#2a475e]">
                <h3 className="text-sm font-bold text-white uppercase tracking-widest flex items-center gap-2">
                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  MỚI CẬP NHẬT
                </h3>
             </div>
             <div className="flex flex-col gap-1">
                {products.slice(0, 5).map(product => (
                  <Link key={product.id} to={`/products/${product.id}`} className="flex items-center gap-4 bg-[#16212d] hover:bg-[#2a475e] p-2 transition group">
                      <img src={product.coverImageUrl} className="w-16 h-20 object-cover" />
                      <div className="flex-grow">
                        <div className="font-bold text-white group-hover:text-[#67c1f5] transition">{product.title}</div>
                        <div className="text-[10px] text-[#c7d5e0]/60 italic">{product.authorName}</div>
                      </div>
                      <div className="flex flex-col items-end gap-1">
                         <div className="text-[#67c1f5] font-bold text-sm">{Number(product.price) === 0 ? 'Free' : formatCurrency(product.price)}</div>
                         <div className="text-[9px] text-[#2a475e] bg-[#67c1f5]/10 px-1 font-bold">SALE</div>
                      </div>
                  </Link>
                ))}
             </div>
          </div>

          {/* Right Features */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="bg-[#1b2838] border border-[#2a475e] p-6 rounded-sm">
                <div className="w-12 h-12 bg-[#2a475e] text-[#67c1f5] rounded-sm flex items-center justify-center mb-6">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-white font-bold mb-2 uppercase tracking-wide">Bản quyền đảm bảo</h3>
                <p className="text-xs text-[#c7d5e0] leading-relaxed italic">
                  Chúng tôi làm việc trực tiếp với các tác giả và nhà xuất bản để mang đến những tác phẩm chính gốc nhất.
                </p>
            </div>
            <div className="bg-[#1b2838] border border-[#2a475e] p-6 rounded-sm">
                <div className="w-12 h-12 bg-[#2a475e] text-[#67c1f5] rounded-sm flex items-center justify-center mb-6">
                  <Clock className="w-6 h-6" />
                </div>
                <h3 className="text-white font-bold mb-2 uppercase tracking-wide">Đọc mọi lúc mọi nơi</h3>
                <p className="text-xs text-[#c7d5e0] leading-relaxed italic">
                  Ưu tiên trải nghiệm người dùng với hệ thống đọc mượt mà trên mọi thiết bị.
                </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
