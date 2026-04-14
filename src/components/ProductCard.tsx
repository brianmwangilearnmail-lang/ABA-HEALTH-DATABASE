import React, { useState } from 'react';
import { ShoppingCart, Plus, Minus, Package, Eye, Heart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useSite, Product } from '../context/SiteContext';
import { motion } from 'motion/react';

interface ProductCardProps {
  product: Product;
  variant?: 'default' | 'new-arrival';
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, variant = 'default' }) => {
  const { addToCart } = useCart();
  const { setSelectedProduct } = useSite();
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setQuantity(1); // Reset quantity after adding
  };

  if (variant === 'new-arrival') {
    return (
      <div 
        onClick={() => setSelectedProduct(product)}
        className="min-w-[260px] w-[260px] bg-white border border-gray-200 rounded-[1.25rem] p-4 flex flex-col gap-4 group hover:-translate-y-1 transition-all duration-300 hover:border-[#14532d] shadow-sm hover:shadow-xl cursor-pointer"
      >
        <div className="w-full aspect-square bg-white/5 rounded-xl relative flex items-center justify-center p-4 overflow-hidden">
          <div className="absolute top-2 right-2 flex flex-col gap-2 z-10">
            <button 
              onClick={(e) => { e.stopPropagation(); setSelectedProduct(product); }}
              className="w-8 h-8 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-[#15803d] hover:text-white transition-colors"
            >
              <Eye className="w-4 h-4" />
            </button>
            <button 
              onClick={(e) => e.stopPropagation()}
              className="w-8 h-8 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-[#14532d] hover:text-white hover:border-[#14532d] transition-colors"
            >
              <Heart className="w-4 h-4" />
            </button>
          </div>
          {product.image ? (
            <img src={product.image} alt={product.title} className="w-full h-full object-contain drop-shadow-xl group-hover:scale-105 transition-transform duration-500" />
          ) : (
            <div className="flex flex-col items-center text-gray-300">
               <Package className="w-8 h-8 mb-2" />
               <span className="text-[10px] uppercase font-bold tracking-wider">No Visual</span>
            </div>
          )}
        </div>
        <div className="flex flex-col gap-1 flex-grow">
          <h3 className="font-display font-bold text-[1.1rem] text-gray-900 leading-[1.2] line-clamp-2">{product.title}</h3>
          <p className="text-[#15803d] font-black text-lg mt-1">Ksh {product.price.toLocaleString()}</p>
        </div>
        <button 
          onClick={(e) => { e.stopPropagation(); handleAddToCart(); }}
          className="w-full py-3 rounded-xl bg-gray-100 hover:bg-[#14532d] text-gray-900 hover:text-white font-black text-sm tracking-widest transition-all flex items-center justify-center gap-2 border border-transparent hover:shadow-[0_0_20px_rgba(255,94,0,0.4)]"
        >
          <Plus className="w-4 h-4" /> ADD TO CART
        </button>
      </div>
    );
  }

  return (
    <div 
      onClick={() => setSelectedProduct(product)}
      className="bg-white border border-gray-200 rounded-[1.25rem] p-[1.25rem] relative transition-all duration-300 flex flex-col gap-4 cursor-pointer hover:-translate-y-[5px] hover:border-[#14532d] shadow-sm hover:shadow-2xl group text-left"
    >
      
      <span className="absolute top-4 right-4 px-3 py-1 rounded-full text-[0.65rem] font-black uppercase bg-[#15803d] text-white z-10">
        {product.brand}
      </span>

      <div className="w-full aspect-square bg-white/5 rounded-2xl flex items-center justify-center relative overflow-hidden">
        {product.image ? (
          <img src={product.image} alt={product.title} className="w-full h-full object-contain p-4 drop-shadow-xl group-hover:scale-105 transition-transform duration-500" />
        ) : (
           <div className="flex flex-col items-center text-gray-300">
             <Package className="w-8 h-8 mb-2" />
             <span className="text-[10px] uppercase font-bold tracking-wider">No Visual</span>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <h3 className="font-display font-bold text-[1.1rem] text-gray-900 leading-[1.2]">{product.title}</h3>
        <p className="text-[0.8rem] text-gray-500 leading-[1.4] mt-1 line-clamp-1 italic">{product.composition}</p>
      </div>
      
      <div className="mt-auto flex flex-col gap-4 pt-4 border-t border-gray-100">
        <div className="flex justify-between items-end">
          <div>
            <p className="text-gray-400 text-[10px] font-bold tracking-wider mb-1 uppercase">Total Price</p>
            <p className="text-[#15803d] font-black text-xl">Ksh {(product.price * quantity).toLocaleString()}</p>
          </div>
          
          <div className="flex items-center space-x-2 bg-gray-100 rounded-full p-1 border border-gray-200">
            <button 
              onClick={(e) => { e.stopPropagation(); setQuantity(q => Math.max(1, q - 1)); }} 
              className="w-8 h-8 rounded-full bg-white border border-gray-200 hover:bg-gray-200 text-gray-600 flex items-center justify-center transition-colors shadow-sm"
            >
              <Minus className="w-3 h-3" />
            </button>
            <span className="text-gray-900 font-bold text-sm w-4 text-center">{quantity}</span>
            <button 
              onClick={(e) => { e.stopPropagation(); setQuantity(q => q + 1); }} 
              className="w-8 h-8 rounded-full bg-white border border-gray-200 hover:bg-gray-200 text-gray-600 flex items-center justify-center transition-colors shadow-sm"
            >
              <Plus className="w-3 h-3" />
            </button>
          </div>
        </div>
        
        <button 
          onClick={(e) => { e.stopPropagation(); handleAddToCart(); }}
          className="w-full bg-[#14532d] hover:bg-[#114022] text-white py-3 rounded-xl font-black text-sm tracking-widest transition-all hover:shadow-lg border border-[#14532d] flex items-center justify-center space-x-2"
        >
          <ShoppingCart className="w-4 h-4" />
          <span>ADD TO CART</span>
        </button>
      </div>
    </div>
  );
};
