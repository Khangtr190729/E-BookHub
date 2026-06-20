const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-white text-xl font-bold mb-4">E-BookHub</h3>
            <p className="max-w-xs">
              Nền tảng đọc và bán sách trực tuyến hàng đầu Việt Nam. Khám phá thế giới tri thức ngay hôm nay.
            </p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Liên kết</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white">Điều khoản sử dụng</a></li>
              <li><a href="#" className="hover:text-white">Chính sách bảo mật</a></li>
              <li><a href="#" className="hover:text-white">Liên hệ</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Theo dõi chúng tôi</h4>
            <div className="flex gap-4">
              <a href="#" className="hover:text-white">Facebook</a>
              <a href="#" className="hover:text-white">Twitter</a>
              <a href="#" className="hover:text-white">Instagram</a>
            </div>
          </div>
        </div>
        <div className="border-t border-slate-800 mt-12 pt-8 text-center text-sm">
          &copy; {new Date().getFullYear()} E-BookHub. Bảo lưu mọi quyền.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
