import { useQuery } from '@tanstack/react-query';
import { productService } from '../services/productService';
import ProductCard from '../components/product/ProductCard';
import Loading from '../components/common/Loading';
import ErrorMessage from '../components/common/ErrorMessage';

const ProductListPage = () => {
  const { data: response, isLoading, isError, refetch } = useQuery({
    queryKey: ['products'],
    queryFn: () => productService.getAll(),
  });

  if (isLoading) return <Loading />;
  if (isError) return <ErrorMessage onRetry={refetch} />;

  const products = response?.data || [];

  return (
    <div className="bg-[#1b2838] min-h-screen pb-24">
      {/* Search/Filter Bar Area */}
      <div className="bg-[#171a21] border-b border-[#2a475e]/30 pt-16 pb-8">
          <div className="container mx-auto px-4">
              <h1 className="text-5xl font-black text-white uppercase tracking-tighter tracking-widest italic mb-2">Cửa hàng</h1>
              <p className="text-[#67c1f5] font-bold uppercase tracking-widest text-xs">Khám phá hàng ngàn cuốn sách hấp dẫn nhất</p>
          </div>
      </div>

      <div className="container mx-auto px-4 mt-12 flex flex-col lg:flex-row gap-8">
        {/* Sidebar Filters */}
        <div className="w-full lg:w-[240px] shrink-0">
             <div className="bg-[#171a21]/40 p-4 rounded-sm border border-[#2a475e]/20">
                <h3 className="text-white font-bold uppercase text-xs tracking-widest mb-4 border-b border-[#2a475e] pb-2">Phân loại</h3>
                <div className="flex flex-col gap-2">
                    <div className="text-[11px] text-[#67c1f5] font-bold uppercase hover:bg-[#2a475e] p-2 cursor-pointer transition">Tất cả sản phẩm</div>
                    <div className="text-[11px] text-[#c7d5e0] font-bold uppercase hover:bg-[#2a475e] p-2 cursor-pointer transition">E-book (PDF/EPUB)</div>
                    <div className="text-[11px] text-[#c7d5e0] font-bold uppercase hover:bg-[#2a475e] p-2 cursor-pointer transition">Tiểu thuyết / Truyện chữ</div>
                    <div className="text-[11px] text-[#c7d5e0] font-bold uppercase hover:bg-[#2a475e] p-2 cursor-pointer transition">Truyện tranh (Comic/Manga)</div>
                </div>

                <h3 className="text-white font-bold uppercase text-xs tracking-widest mt-8 mb-4 border-b border-[#2a475e] pb-2 text-xs">Thể loại phổ biến</h3>
                <div className="flex flex-wrap gap-2">
                    {['Hành động', 'Kỳ ảo', 'Lãng mạn', 'Kinh dị', 'Trinh thám', 'Kiếm hiệp'].map(g => (
                        <span key={g} className="text-[9px] font-black uppercase bg-[#2a475e] text-[#c7d5e0] px-2 py-1 hover:text-[#67c1f5] cursor-pointer transition">
                            {g}
                        </span>
                    ))}
                </div>
             </div>
        </div>

        {/* Content Area */}
        <div className="flex-grow">
          <div className="flex items-center justify-between mb-8 bg-[#171a21]/50 p-4 border-b border-[#2a475e]">
            <span className="text-xs font-bold text-[#c7d5e0] uppercase tracking-widest">Hiển thị {products.length} sản phẩm</span>
            <div className="flex items-center gap-4 text-[11px] font-bold text-[#c7d5e0]">
                <span>Sắp xếp theo:</span>
                <select className="bg-[#2a475e]/60 text-white border-0 outline-none p-1 rounded-sm cursor-pointer">
                    <option>Bán chạy nhất</option>
                    <option>Mới nhất</option>
                    <option>Giá: Thấp đến Cao</option>
                    <option>Giá: Cao đến Thấp</option>
                </select>
            </div>
          </div>

          {products.length === 0 ? (
            <div className="text-center py-24 bg-[#171a21]/30 rounded-sm border-2 border-dashed border-[#2a475e]">
              <p className="text-[#c7d5e0] uppercase tracking-widest font-black italic">Không tìm thấy sản phẩm nào phù hợp.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductListPage;
