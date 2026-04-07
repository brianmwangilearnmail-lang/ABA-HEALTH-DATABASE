import React, { useState } from 'react';
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight, ShieldCheck } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'motion/react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose }) => {
  const { cart, removeFromCart, updateQuantity, totalPrice, totalItems, clearCart } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const handleCheckout = () => {
    setIsCheckingOut(true);
    // Simulate checkout success after 2 seconds
    setTimeout(() => {
        setIsCheckingOut(false);
        clearCart();
        alert('Thank you for your order! This was a simulated checkout.');
        onClose();
    }, 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-white z-[101] shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-white shadow-sm">
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-6 h-6 text-[#15803d]" />
                <h2 className="font-display font-black text-2xl text-gray-900 uppercase tracking-tighter">Your Bag</h2>
                <span className="bg-[#15803d] text-white text-[10px] font-black px-2 py-0.5 rounded-full">{totalItems} ITEMS</span>
              </div>
              <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100 text-gray-500 transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-grow overflow-y-auto p-6 space-y-6 custom-scrollbar">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center text-gray-400 space-y-4">
                  <ShoppingBag className="w-16 h-16 opacity-20" />
                  <div>
                    <p className="font-bold text-xl text-gray-900">Your bag is empty</p>
                    <p className="text-sm">Start adding some high-quality supplements!</p>
                  </div>
                  <button 
                    onClick={onClose}
                    className="mt-4 px-8 py-3 bg-[#15803d] text-white font-black rounded-full hover:scale-105 transition-transform"
                  >
                    CONTINUE SHOPPING
                  </button>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={item.id} className="flex gap-4 bg-gray-50 p-4 rounded-2xl border border-gray-100 group">
                    <div className="w-20 h-20 bg-white rounded-xl flex-shrink-0 flex items-center justify-center overflow-hidden border border-gray-200">
                      {item.image ? (
                        <img src={item.image} alt={item.title} className="w-full h-full object-contain p-2" />
                      ) : (
                        <ShoppingBag className="w-8 h-8 text-gray-200" />
                      )}
                    </div>
                    <div className="flex-grow flex flex-col">
                      <div className="flex justify-between items-start">
                        <h3 className="font-bold text-gray-900 text-sm line-clamp-2 leading-tight pr-4">{item.title}</h3>
                          <button 
                          onClick={() => removeFromCart(item.id)}
                          className="text-gray-300 hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-[#15803d] font-black mt-1 text-sm">Ksh {item.price.toLocaleString()}</p>
                      
                      <div className="flex items-center justify-between mt-auto pt-2">
                        <div className="flex items-center gap-3 bg-white rounded-full px-2 py-1 border border-gray-200 shadow-sm">
                          <button 
                            onClick={() => updateQuantity(item.id, -1)}
                            className="w-6 h-6 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-100"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-bold text-gray-900 w-4 text-center">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, 1)}
                            className="w-6 h-6 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-100"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <p className="text-gray-900 font-black text-sm">Ksh {(item.price * item.quantity).toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer / Summary */}
            {cart.length > 0 && (
              <div className="p-6 bg-white border-t border-gray-200 shadow-2xl space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-gray-500 text-sm font-medium">
                    <span>Subtotal</span>
                    <span>Ksh {totalPrice.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-gray-500 text-sm font-medium">
                    <span>Shipping</span>
                    <span className="text-[#14532d] font-black">FREE</span>
                  </div>
                  <div className="flex justify-between text-gray-900 text-xl font-black pt-2 border-t border-gray-100">
                    <span>Total</span>
                    <span className="text-[#14532d]">Ksh {totalPrice.toLocaleString()}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-[10px] uppercase font-black tracking-widest text-gray-400 justify-center py-2 bg-gray-50 rounded-lg border border-gray-100">
                  <ShieldCheck className="w-3 h-3 text-[#15803d]" />
                  Secure Checkout Guaranteed
                </div>

                <button 
                  onClick={handleCheckout}
                  disabled={isCheckingOut}
                  className="w-full bg-[#14532d] hover:bg-[#114022] disabled:bg-gray-500 text-white py-4 rounded-2xl font-black text-lg tracking-widest transition-all hover:shadow-[0_10px_30px_rgba(20,83,45,0.5)] flex items-center justify-center gap-3 active:scale-95 group"
                >
                  {isCheckingOut ? (
                    <motion.div 
                        animate={{ rotate: 360 }} 
                        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                        className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full"
                    />
                  ) : (
                    <>
                      <span>CHECKOUT NOW</span>
                      <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
