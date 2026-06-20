import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate, Link } from 'react-router-dom';
import { Trash2, CreditCard, ShoppingBag, ArrowLeft, ShieldCheck } from 'lucide-react';
import { cartService } from '../services/cartService';
import { orderService } from '../services/orderService';
import { walletService } from '../services/walletService';
import { formatCurrency } from '../utils/formatCurrency';
import { useCartStore } from '../stores/cartStore';
import Loading from '../components/common/Loading';

const CartPage = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { setCartCount } = useCartStore();

  const { data: cartResponse, isLoading: isCartLoading } = useQuery({
    queryKey: ['cart'],
    queryFn: async () => {
      const res = await cartService.get();
      setCartCount(res.data.items.length);
      return res;
    },
  });

  const { data: walletResponse, isLoading: isWalletLoading } = useQuery({
    queryKey: ['wallet'],
    queryFn: () => walletService.get(),
  });

  const removeItemMutation = useMutation({
    mutationFn: (productId) => cartService.removeItem(productId),
    onSuccess: () => {
      queryClient.invalidateQueries(['cart']);
    },
  });

  const checkoutMutation = useMutation({
    mutationFn: () => orderService.checkout(),
    onSuccess: () => {
      alert('Thanh toán thành công! Cảm ơn bạn đã tin dùng E-BookHub.');
      queryClient.invalidateQueries(['cart', 'wallet', 'library']);
      navigate('/library');
    },
    onError: (error) => {
      alert(error.response?.data?.message || 'Có lỗi xảy ra khi thanh toán');
    },
  });

  if (isCartLoading || isWalletLoading) return <Loading />;

  const cartItems = cartResponse?.data?.items || [];
  const wallet = walletResponse?.data;
  const totalAmount = cartItems.reduce((sum, item) => sum + Number(item.product.price), 0);

  if (cartItems.length === 0) {
    return (
      <div className="bg-[#1b2838] min-h-screen flex flex-col items-center justify-center p-4">
        <div className="bg-[#171a21] p-12 border border-[#2a475e] text-center max-w-md w-full shadow-2xl">
          <ShoppingBag className="w-16 h-16 text-[#2a475e] mx-auto mb-6" />
          <h1 className="text-2xl font-bold text-white mb-4 uppercase tracking-widest italic">Giỏ hàng đang trống</h1>
          <p className="text-[#c7d5e0] mb-10 text-sm italic">Bạn chưa chọn tác phẩm nào để vào giỏ hàng. Hãy duyệt qua cửa hàng để tìm những cuốn sách thú vị nhé!</p>
          <Link to="/products" className="steam-button-blue text-white w-full py-3 rounded-sm font-black uppercase text-sm inline-block tracking-widest">
            Tiếp tục mua sắm
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#1b2838] min-h-screen pb-24 pt-12">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="flex items-center justify-between mb-8">
            <div className="flex gap-2 text-[10px] font-bold uppercase tracking-widest text-[#67c1f5]">
                <Link to="/" className="hover:underline">Trang chủ</Link>
                <span>{`>`}</span>
                <span className="text-white">Giỏ hàng của bạn</span>
            </div>
            <Link to="/products" className="text-xs font-bold text-[#c7d5e0] flex items-center gap-1 hover:text-white">
                <ArrowLeft className="w-3 h-3" />
                Quay lại cửa hàng
            </Link>
        </div>

        <h1 className="text-3xl font-black text-white mb-1 tracking-tighter uppercase italic">Giỏ hàng</h1>
        <div className="h-1 w-24 bg-[#67c1f5] mb-12" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* List Section */}
          <div className="lg:col-span-8 flex flex-col gap-2">
            <div className="bg-[#171a21] p-4 text-[10px] font-bold uppercase tracking-widest text-[#2a475e] border-b border-[#2a475e]/30">
                Tác phẩm đã chọn ({cartItems.length})
            </div>
            {cartItems.map((item) => (
              <div key={item.id} className="bg-[#16212d] flex gap-4 p-4 border-l-2 border-[#1b2838] hover:border-[#67c1f5] transition">
                <img
                  src={item.product.coverImageUrl}
                  alt={item.product.title}
                  className="w-16 h-22 object-cover shadow-lg"
                />
                <div className="flex-grow flex flex-col">
                  <div className="flex justify-between">
                    <h3 className="font-bold text-white text-lg hover:text-[#67c1f5] transition cursor-pointer">
                        {item.product.title}
                    </h3>
                    <div className="text-white font-bold">{formatCurrency(item.product.price)}</div>
                  </div>
                  <p className="text-[10px] text-[#c7d5e0]/60 italic mb-4">{item.product.authorName}</p>
                  
                  <div className="mt-auto flex justify-end">
                    <button
                      onClick={() => removeItemMutation.mutate(item.productId)}
                      className="text-[9px] font-black uppercase text-[#2a475e] hover:text-red-500 transition-colors flex items-center gap-1 underline underline-offset-4"
                    >
                      <Trash2 className="w-3 h-3" />
                      Loại bỏ
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Checkout Section */}
          <div className="lg:col-span-4 sticky top-24">
            <div className="bg-[#171a21] p-8 border border-[#2a475e]/50 shadow-2xl rounded-sm">
                <h2 className="text-white font-bold uppercase tracking-widest text-sm mb-8 flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-[#67c1f5]" />
                    Tổng thanh toán
                </h2>
                
                <div className="flex justify-between mb-4 pb-4 border-b border-[#2a475e]/20 text-sm">
                  <span className="text-[#c7d5e0]">Tạm tính:</span>
                  <span className="text-white font-bold">{formatCurrency(totalAmount)}</span>
                </div>
                
                <div className="flex justify-between mb-10">
                  <span className="text-[#67c1f5] font-black uppercase tracking-tighter italic">Tổng cộng:</span>
                  <span className="text-2xl font-black text-white tracking-tighter">{formatCurrency(totalAmount)}</span>
                </div>

                <div className="mb-10 p-4 bg-[#1b2838] border-l-4 border-[#67c1f5]">
                  <div className="text-[10px] font-black text-[#67c1f5] uppercase tracking-widest mb-1">
                    Số dư ví hiện tại
                  </div>
                  <div className="text-xl font-black text-white tracking-tighter italic">{formatCurrency(wallet?.balance || 0)}</div>
                </div>

                <button
                  onClick={() => checkoutMutation.mutate()}
                  disabled={checkoutMutation.isPending || Number(wallet?.balance) < totalAmount}
                  className="w-full steam-button-green text-white font-black py-4 rounded-sm hover:shadow-[0_0_20px_rgba(117,176,34,0.3)] transition-all disabled:opacity-30 disabled:grayscale uppercase tracking-widest text-sm"
                >
                  {checkoutMutation.isPending ? 'Đang thực hiện...' : 'Thanh toán bằng ví'}
                </button>
                
                {Number(wallet?.balance) < totalAmount && (
                  <p className="text-red-400 text-[10px] mt-4 text-center font-bold italic uppercase tracking-tighter">
                    Số dư ví không đủ. Vui lòng nạp thêm.
                  </p>
                )}

                <div className="mt-8 flex items-center gap-2 text-[10px] text-[#2a475e] italic">
                    <ShieldCheck className="w-3 h-3" />
                    Bảo mật giao dịch bởi E-BookHub Secure
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
