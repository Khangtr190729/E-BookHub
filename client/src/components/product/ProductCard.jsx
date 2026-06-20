import { Link } from 'react-router-dom';
import { formatCurrency } from '../../utils/formatCurrency';
import { PRODUCT_TYPES } from '../../utils/constants';

const ProductCard = ({ product }) => {
  return (
    <div className="steam-card rounded-sm overflow-hidden flex flex-col h-full border border-transparent hover:border-[#67c1f5]">
      <Link to={`/products/${product.id}`} className="relative aspect-[4/5] overflow-hidden">
        <img
          src={product.coverImageUrl || 'https://via.placeholder.com/300x400?text=No+Cover'}
          alt={product.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/80 to-transparent">
          <span className="text-[10px] font-bold text-[#67c1f5] uppercase tracking-tighter">
            {PRODUCT_TYPES[product.productType]}
          </span>
        </div>
      </Link>
      <div className="p-3 flex flex-col flex-grow bg-[#1b2838]">
        <Link to={`/products/${product.id}`}>
          <h3 className="font-bold text-white line-clamp-1 mb-1 hover:text-[#67c1f5] transition">
            {product.title}
          </h3>
        </Link>
        <p className="text-[11px] text-[#c7d5e0] mb-4 truncate italic">{product.authorName}</p>
        
        <div className="mt-auto flex items-center justify-between">
          <div className="bg-black/40 px-2 py-1 rounded-sm">
            <span className="text-sm font-bold text-[#67c1f5]">
              {Number(product.price) === 0 ? 'Miễn phí' : formatCurrency(product.price)}
            </span>
          </div>
          <Link
            to={`/products/${product.id}`}
            className="text-[10px] font-black uppercase text-[#c7d5e0] hover:text-white"
          >
            Chi tiết
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
