import { useParams, useNavigate, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ChevronLeft, ChevronRight, Home, Menu, ZoomIn, ZoomOut, Layers } from 'lucide-react';
import { productService } from '../services/productService';
import Loading from '../components/common/Loading';
import ErrorMessage from '../components/common/ErrorMessage';

const ReaderPage = () => {
  const { chapterId } = useParams();
  const navigate = useNavigate();

  const { data: response, isLoading, isError } = useQuery({
    queryKey: ['chapter', chapterId],
    queryFn: () => productService.getChapter(chapterId),
  });

  if (isLoading) return <Loading message="Đang tải nội dung chương..." />;
  if (isError) return <ErrorMessage message="Không thể tải chương truyện. Vui lòng thử lại." />;

  const chapter = response.data;

  // Parse danh sách ảnh từ imagesJson (dành riêng cho truyện tranh)
  let comicPages = [];
  if (chapter.imagesJson) {
    try {
      comicPages = JSON.parse(chapter.imagesJson);
    } catch (e) {
      comicPages = [];
    }
  }

  const isComicMode = comicPages.length > 0;

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-[#c7d5e0]">
      {/* Sticky Header */}
      <nav className="bg-[#1b2838]/95 backdrop-blur-md border-b border-[#2a475e] sticky top-0 z-50 shadow-2xl">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              to={`/products/${chapter.productId}`}
              className="flex items-center gap-2 text-[#67c1f5] hover:text-white font-bold text-xs uppercase tracking-tighter transition"
            >
              <ChevronLeft className="w-4 h-4" />
              Thoát
            </Link>
            <div className="h-6 w-[1px] bg-[#2a475e]" />
            <div className="flex flex-col">
              <span className="text-[10px] text-[#2a475e] font-black uppercase tracking-tighter leading-none">
                {chapter.product.title}
              </span>
              <span className="text-sm font-bold text-white tracking-wide leading-none mt-0.5">
                {chapter.title}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {isComicMode && (
              <div className="flex items-center gap-1 bg-[#2a475e]/60 px-3 py-1.5 rounded-sm">
                <Layers className="w-3 h-3 text-[#67c1f5]" />
                <span className="text-[10px] text-[#67c1f5] font-bold uppercase tracking-widest">
                  {comicPages.length} trang
                </span>
              </div>
            )}
            <button className="bg-[#2a475e] p-1.5 rounded-sm text-white hover:bg-[#3d6c8d] transition">
              <Menu className="w-4 h-4" />
            </button>
          </div>
        </div>
      </nav>

      {/* ================= CHẾ ĐỘ ĐỌC TRUYỆN TRANH ================= */}
      {isComicMode ? (
        <div className="bg-black flex flex-col items-center">
          {/* Danh sách ảnh cuộn liên tục từ đầu đến cuối */}
          {comicPages.map((pageUrl, index) => (
            <div key={index} className="w-full max-w-3xl">
              <img
                src={pageUrl}
                alt={`Trang ${index + 1}`}
                className="w-full h-auto block select-none"
                loading="lazy"
              />
            </div>
          ))}

          {/* Cuối tập - Navigation */}
          <div className="w-full max-w-3xl py-16 px-4 bg-[#0d0d0d] flex flex-col items-center gap-6">
            <div className="text-[10px] font-black uppercase tracking-widest text-[#2a475e] italic">
              ——— Hết {chapter.title} ———
            </div>
            <div className="w-12 h-1.5 bg-[#67c1f5] rounded-full" />
            <div className="grid grid-cols-2 gap-4 w-full max-w-sm mt-4">
              <button
                disabled
                className="bg-[#1b2838] border border-[#2a475e] py-4 text-[#2a475e] font-black uppercase text-xs tracking-widest flex items-center justify-center gap-2 rounded-sm opacity-50 cursor-not-allowed"
              >
                <ChevronLeft className="w-4 h-4" />
                Tập trước
              </button>
              <button
                disabled
                className="steam-button-blue py-4 text-white font-black uppercase text-xs tracking-widest flex items-center justify-center gap-2 rounded-sm"
              >
                Tập tiếp theo
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* ================= CHẾ ĐỘ ĐỌC TRUYỆN CHỮ ================= */
        <div className="max-w-4xl mx-auto px-4 py-12">
          <article className="bg-[#1b2838] p-8 sm:p-20 rounded-sm shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-[#2a475e]/30">
            <header className="mb-16 text-center">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#67c1f5] mb-4 block">
                —— {chapter.product.title} ——
              </span>
              <h1 className="text-4xl font-extrabold text-white mb-4 tracking-tighter italic uppercase">
                {chapter.title}
              </h1>
            </header>

            <div className="prose prose-invert prose-lg max-w-none text-[#c7d5e0] leading-[2.2] text-justify whitespace-pre-wrap font-serif selection:bg-[#67c1f5] selection:text-[#171a21]">
              {chapter.content}
            </div>

            <footer className="mt-24 pt-12 border-t border-[#2a475e]/20 text-center">
              <div className="text-[10px] font-black uppercase tracking-widest text-[#2a475e] mb-4 italic">
                Hết chương {chapter.chapterNumber}
              </div>
              <div className="w-12 h-1.5 bg-[#67c1f5] mx-auto rounded-full" />
            </footer>
          </article>

          <div className="mt-12 mb-24 grid grid-cols-2 gap-4 max-w-xl mx-auto">
            <button
              disabled
              className="bg-[#171a21] border border-[#2a475e] py-4 px-6 text-[#2a475e] font-black uppercase text-xs tracking-widest flex items-center justify-center gap-2 rounded-sm opacity-50 cursor-not-allowed"
            >
              <ChevronLeft className="w-5 h-5" />
              Chương Trước
            </button>
            <button
              disabled
              className="steam-button-blue py-4 px-6 text-white font-black uppercase text-xs tracking-widest flex items-center justify-center gap-2 rounded-sm shadow-xl"
            >
              Chương Sau
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* Nút về trang chủ nổi */}
      <Link
        to="/"
        className="fixed bottom-8 right-8 bg-[#67c1f5] text-[#171a21] p-4 rounded-full shadow-2xl hover:scale-110 transition active:scale-95 group z-50"
      >
        <Home className="w-6 h-6" />
        <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-white text-black text-[10px] font-black px-2 py-1 rounded-sm uppercase tracking-widest whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
          Trang chủ
        </span>
      </Link>
    </div>
  );
};

export default ReaderPage;
