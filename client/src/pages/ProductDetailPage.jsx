import { useParams, useNavigate, Link } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import { ShoppingCart, BookOpen, Share2, Heart, Flag } from 'lucide-react';
import { productService } from '../services/productService';
import { cartService } from '../services/cartService';
import { formatCurrency } from '../utils/formatCurrency';
import { useCartStore } from '../stores/cartStore';
import Loading from '../components/common/Loading';
import ErrorMessage from '../components/common/ErrorMessage';

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { incrementCartCount } = useCartStore();

  const { data: response, isLoading, isError } = useQuery({
    queryKey: ['product', id],
    queryFn: () => productService.getById(id),
  });

  const addToCartMutation = useMutation({
    mutationFn: () => cartService.addItem(id),
    onSuccess: () => {
      incrementCartCount();
      alert('Đã thêm sản phẩm vào giỏ hàng!');
    },
    onError: (error) => {
      alert(error.response?.data?.message || 'Có lỗi xảy ra khi thêm vào giỏ hàng');
    },
  });

  if (isLoading) return <Loading />;
  if (isError) return <ErrorMessage />;

  const product = response.data;

  return (
    <div className="min-h-screen bg-[#1b2838] pb-24">
      {/* Background Blur Hero */}
      <div className="relative h-[400px] overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center blur-2xl opacity-30 scale-110"
          style={{ backgroundImage: `url(${product.coverImageUrl})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#1b2838]" />
        
        <div className="container mx-auto px-4 relative h-full flex items-end pb-12">
          <div className="flex flex-col md:flex-row gap-8 w-full">
            <div className="w-full md:w-[324px] shrink-0 shadow-2xl border-4 border-[#171a21]">
              <img
                src={product.coverImageUrl || 'https://via.placeholder.com/600x800'}
                alt={product.title}
                className="w-full h-auto block"
              />
            </div>
            <div className="flex-grow pt-8">
              <div className="flex gap-2 text-[10px] font-bold uppercase tracking-widest text-[#67c1f5] mb-2">
                <Link to="/" className="hover:underline">Trang chủ</Link>
                <span>{`>`}</span>
                <Link to="/products" className="hover:underline">Cửa hàng</Link>
                <span>{`>`}</span>
                <span className="text-white">{product.title}</span>
              </div>
              <h1 className="text-4xl font-extrabold text-white mb-4 drop-shadow-lg">{product.title}</h1>
              <p className="text-lg text-[#c7d5e0] mb-6">Tác giả: <span className="text-[#67c1f5] hover:underline cursor-pointer">{product.authorName}</span></p>
              
              <div className="flex flex-wrap gap-2 mb-8">
                {product.genres?.map((g) => (
                  <span key={g.genreId} className="bg-[#2a475e]/60 text-[#67c1f5] px-3 py-1 rounded-sm text-xs font-bold hover:bg-[#2a475e] cursor-pointer">
                    {g.genre.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-8 flex flex-col lg:flex-row gap-8">
        {/* Main Content */}
        <div className="flex-grow">
          <div className="bg-[#171a21]/50 p-8 rounded-sm mb-8">
            <h2 className="text-xl font-bold text-[#67c1f5] uppercase tracking-widest mb-6 border-b border-[#2a475e] pb-2">Giới thiệu về tác phẩm</h2>
            <div className="text-[#c7d5e0] leading-relaxed whitespace-pre-wrap text-sm">
              {product.description}
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[#67c1f5] uppercase tracking-widest mb-6 border-b border-[#2a475e] pb-2">Danh sách chương</h2>
            <div className="bg-[#171a21]/50 rounded-sm overflow-hidden">
              {product.chapters?.map((chapter) => (
                <div
                  key={chapter.id}
                  className="flex items-center justify-between p-4 border-b border-[#2a475e]/30 hover:bg-[#2a475e]/30 transition group"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-[#2a475e] font-mono w-8 text-sm">{chapter.chapterNumber.toString().padStart(2, '0')}</span>
                    <span className="font-bold text-[#c7d5e0] group-hover:text-[#67c1f5] transition">{chapter.title}</span>
                    {chapter.isFree && (
                      <span className="bg-[#5c7e10] text-white text-[9px] uppercase font-bold py-0.5 px-1.5 rounded-sm">
                        Miễn phí
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => navigate(`/reader/${chapter.id}`)}
                    className="steam-button-blue text-xs font-bold px-4 py-1.5 rounded-sm flex items-center gap-2"
                  >
                    <BookOpen className="w-3 h-3" />
                    Đọc ngay
                  </button>
                </div>
              ))}
              {(!product.chapters || product.chapters.length === 0) && (
                <div className="p-12 text-center text-[#2a475e] text-sm uppercase tracking-widest italic font-bold">Dữ liệu chương đang được cập nhật...</div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar Purchase */}
        <div className="w-full lg:w-[324px] shrink-0">
          <div className="bg-[#16212d] p-6 border border-[#2a475e] rounded-sm sticky top-24">
            <h3 className="text-white font-bold mb-4 flex items-center gap-2">
              <span className="w-2 h-2 bg-[#67c1f5] rounded-full animate-pulse" />
              Sẵn có trên E-BookHub
            </h3>
            
            <div className="bg-black/60 p-4 mb-6 rounded-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[#c7d5e0] text-xs">Giá bán:</span>
                <span className="text-xl font-bold text-white tracking-tighter">
                  {Number(product.price) === 0 ? 'MIỄN PHÍ' : formatCurrency(product.price)}
                </span>
              </div>
            </div>

            <button
              onClick={() => addToCartMutation.mutate()}
              className="w-full steam-button-green text-white font-black py-4 rounded-sm flex items-center justify-center gap-2 uppercase tracking-widest text-sm shadow-xl"
            >
              <ShoppingCart className="w-5 h-5" />
              Thêm vào giỏ hàng
            </button>

            <div className="mt-8 flex flex-col gap-3">
              <button className="flex items-center gap-3 text-xs text-[#c7d5e0] hover:text-white transition group">
                <div className="p-2 bg-[#2a475e] rounded-sm group-hover:bg-[#3d6c8d]">
                  <Heart className="w-3 h-3" />
                </div>
                Thêm vào danh sách ước
              </button>
              <button className="flex items-center gap-3 text-xs text-[#c7d5e0] hover:text-white transition group">
                <div className="p-2 bg-[#2a475e] rounded-sm group-hover:bg-[#3d6c8d]">
                  <Share2 className="w-3 h-3" />
                </div>
                Chia sẻ
              </button>
              <button className="flex items-center gap-3 text-xs text-[#c7d5e0] hover:text-white transition group">
                <div className="p-2 bg-[#2a475e] rounded-sm group-hover:bg-[#3d6c8d]">
                  <Flag className="w-3 h-3" />
                </div>
                Báo cáo vi phạm
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
