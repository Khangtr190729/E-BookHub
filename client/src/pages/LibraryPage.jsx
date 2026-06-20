import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { Library as LibraryIcon, Search, LayoutGrid, List } from 'lucide-react';
import { libraryService } from '../services/libraryService';
import Loading from '../components/common/Loading';

const LibraryPage = () => {
  const { data: response, isLoading } = useQuery({
    queryKey: ['library'],
    queryFn: () => libraryService.get(),
  });

  const libraryItems = response?.data || [];

  return (
    <div className="bg-[#1b2838] min-h-screen">
      {/* Sidebar Layout for Library */}
      <div className="flex h-screen overflow-hidden">
        
        {/* Left Sidebar (Small) */}
        <div className="w-[300px] border-r border-[#171a21] bg-[#171a21]/50 flex flex-col hidden lg:flex">
             <div className="p-6">
                <h2 className="text-white font-black uppercase text-xs tracking-widest mb-6 flex items-center gap-2">
                    <LibraryIcon className="w-4 h-4 text-[#67c1f5]" />
                    Bộ sưu tập
                </h2>
                <div className="relative mb-6">
                    <input type="text" placeholder="Tìm kiếm thư viện..." className="bg-[#316282]/40 text-xs text-white px-3 py-2 w-full rounded-sm placeholder:text-[#2a475e] focus:outline-none focus:bg-[#316282]/60" />
                    <Search className="w-3 h-3 text-[#2a475e] absolute right-3 top-1/2 -translate-y-1/2" />
                </div>
             </div>
             
             <div className="flex-grow overflow-y-auto px-4 flex flex-col gap-1 pb-10">
                {libraryItems.map(item => (
                    <Link key={item.id} to={`/products/${item.product.id}`} className="text-[11px] text-[#c7d5e0] hover:text-white hover:bg-[#2a475e] p-2 rounded-sm truncate transition font-medium">
                        {item.product.title}
                    </Link>
                ))}
             </div>
        </div>

        {/* Main Library View */}
        <div className="flex-grow overflow-y-auto bg-gradient-to-br from-[#2a475e]/20 to-[#171a21]">
            <div className="container mx-auto px-8 py-12">
                <div className="flex items-center justify-between mb-12">
                    <div>
                        <h1 className="text-4xl font-black text-white uppercase tracking-tighter italic">Thư viện của bạn</h1>
                        <p className="text-xs text-[#67c1f5] font-bold uppercase tracking-widest mt-1">Sẵn sàng khám phá kiến thức</p>
                    </div>
                    <div className="flex items-center gap-2 bg-[#171a21] p-1 rounded-sm">
                        <button className="p-1.5 bg-[#2a475e] text-white"><LayoutGrid className="w-4 h-4" /></button>
                        <button className="p-1.5 text-[#2a475e] hover:text-white"><List className="w-4 h-4" /></button>
                    </div>
                </div>

                {isLoading ? (
                    <Loading />
                ) : libraryItems.length === 0 ? (
                    <div className="bg-[#171a21]/50 border-2 border-dashed border-[#2a475e] p-24 text-center rounded-sm">
                        <LibraryIcon className="w-16 h-16 text-[#2a475e] mx-auto mb-6" />
                        <h2 className="text-xl font-bold text-white uppercase mb-4 tracking-widest italic">Chưa sở hữu tác phẩm nào</h2>
                        <p className="text-[#c7d5e0] text-sm mb-10 max-w-sm mx-auto italic font-medium">Thư viện hiện đang trống trơn. Hãy ghé qua cửa hàng để tìm kiếm tác phẩm bạn yêu thích nhé!</p>
                        <Link to="/products" className="steam-button-blue text-white px-10 py-3 rounded-sm font-black uppercase text-xs tracking-widest shadow-xl">
                            Đi đến cửa hàng
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6">
                        {libraryItems.map((item) => (
                            <div key={item.id} className="group cursor-pointer">
                                <Link to={`/products/${item.product.id}`}>
                                    <div className="aspect-[3/4] overflow-hidden rounded-sm shadow-2xl border-4 border-[#171a21] group-hover:border-[#67c1f5] transition-all duration-300 relative">
                                        <img
                                            src={item.product.coverImageUrl}
                                            alt={item.product.title}
                                            className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                                        />
                                        <div className="absolute inset-0 bg-[#171a21]/80 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-4">
                                            <button className="steam-button-blue text-white font-black text-xs uppercase px-4 py-2 rounded-sm shadow-xl tracking-tighter">
                                                Đọc ngay
                                            </button>
                                        </div>
                                    </div>
                                    <div className="mt-3">
                                        <h3 className="font-bold text-white line-clamp-1 group-hover:text-[#67c1f5] transition-colors uppercase text-sm tracking-tighter">{item.product.title}</h3>
                                        <p className="text-[10px] text-[#2a475e] font-black uppercase italic tracking-tighter mt-1">Đã sở hữu</p>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>

      </div>
    </div>
  );
};

export default LibraryPage;
