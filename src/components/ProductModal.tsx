import React, { useState, useEffect } from 'react';
import { X, ShoppingCart, Plus, Minus, Package, ShieldCheck, Leaf } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useSite, Product } from '../context/SiteContext';
import { motion, AnimatePresence } from 'motion/react';

export const ProductModal: React.FC = () => {
  const { selectedProduct, setSelectedProduct } = useSite();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  // Reset quantity when new product is selected
  useEffect(() => {
    if (selectedProduct) {
      setQuantity(1);
    }
  }, [selectedProduct]);

  if (!selectedProduct) return null;

  const handleAddToCart = () => {
    addToCart(selectedProduct, quantity);
    setSelectedProduct(null);
  };

  return (
    <AnimatePresence>
      {selectedProduct && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm cursor-pointer"
            onClick={() => setSelectedProduct(null)}
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row z-10 max-h-[90vh]"
          >
            <button 
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 w-10 h-10 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-full flex items-center justify-center z-20 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Left Image Section */}
            <div className="w-full md:w-1/2 p-8 md:p-12 bg-gray-50 flex items-center justify-center min-h-[300px]">
              {selectedProduct.image ? (
                <img 
                  src={selectedProduct.image} 
                  alt={selectedProduct.title} 
                  className="w-full h-full max-w-[300px] object-contain drop-shadow-xl"
                />
              ) : (
                <div className="flex flex-col items-center text-gray-300">
                  <Package className="w-16 h-16 mb-4" />
                  <span className="text-sm uppercase font-bold tracking-wider">No Visual</span>
                </div>
              )}
            </div>

            {/* Right Details Section */}
            <div className="w-full md:w-1/2 p-8 md:p-10 flex flex-col overflow-y-auto">
              <span className="inline-block px-3 py-1 rounded-full text-[0.7rem] font-black uppercase bg-[#15803d] text-white w-max mb-4">
                {selectedProduct.brand}
              </span>
              
              <h2 className="font-display font-black text-3xl text-gray-900 mb-2 leading-tight">
                {selectedProduct.title}
              </h2>
              
              <p className="text-gray-500 font-medium italic mb-6">
                {selectedProduct.composition}
              </p>

              <div className="bg-gray-50 rounded-2xl p-6 mb-8 border border-gray-100">
                <p className="text-gray-400 text-xs font-bold tracking-wider uppercase mb-1">
                  Price
                </p>
                <p className="text-[#15803d] font-black text-3xl">
                  Ksh {selectedProduct.price.toLocaleString()}
                </p>
              </div>

              <div className="flex flex-col gap-4 mb-auto">
                 <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#15803d]/10 flex items-center justify-center text-[#15803d] shrink-0">
                       <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div>
                       <h4 className="font-bold text-gray-900 text-sm">Clinical Grade</h4>
                       <p className="text-gray-500 text-sm">Tested for maximum purity and potency.</p>
                    </div>
                 </div>
                 <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#15803d]/10 flex items-center justify-center text-[#15803d] shrink-0">
                       <Leaf className="w-5 h-5" />
                    </div>
                    <div>
                       <h4 className="font-bold text-gray-900 text-sm">Clean Ingredients</h4>
                       <p className="text-gray-500 text-sm">Sustainably sourced, no harmful additives.</p>
                    </div>
                 </div>
              </div>

              <div className="mt-8 pt-8 border-t border-gray-100 flex flex-col sm:flex-row items-center gap-4">
                <div className="flex items-center w-full sm:w-auto space-x-4 bg-gray-100 rounded-2xl p-2 border border-gray-200 shrink-0">
                  <button 
                    onClick={() => setQuantity(q => Math.max(1, q - 1))} 
                    className="w-12 h-12 rounded-xl bg-white border border-gray-200 hover:bg-gray-50 text-gray-600 flex items-center justify-center transition-colors shadow-sm"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="text-gray-900 font-black text-lg w-6 text-center">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(q => q + 1)} 
                    className="w-12 h-12 rounded-xl bg-white border border-gray-200 hover:bg-gray-50 text-gray-600 flex items-center justify-center transition-colors shadow-sm"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                
                <button 
                  onClick={handleAddToCart}
                  className="flex-1 w-full bg-[#14532d] hover:bg-[#114022] text-white py-4 rounded-2xl font-black text-sm tracking-widest transition-all hover:shadow-[0_8px_30px_rgba(20,83,45,0.3)] border border-[#14532d] flex items-center justify-center space-x-3"
                >
                  <ShoppingCart className="w-5 h-5" />
                  <span>ADD TO CART</span>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
