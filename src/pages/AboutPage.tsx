import React from 'react';
import { Leaf, ShieldCheck, Zap } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="relative z-20 py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-gray-900">
      <div className="text-center mb-16">
        <h1 className="font-display font-black text-5xl md:text-7xl tracking-tighter mb-6 uppercase">
          ABOUT <span className="text-[#15803d]">QUINS WELLNESS</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto font-medium leading-relaxed">
          We are dedicated to providing premium, scientifically-backed supplements to help you achieve your peak physical and mental performance.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 items-center mb-24 text-left">
        <div className="bg-white border border-gray-200 rounded-3xl p-8 md:p-12 shadow-xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#15803d]/5 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-110"></div>
          <h2 className="font-display font-bold text-3xl mb-6 text-[#15803d] relative z-10">Our Story</h2>
          <p className="text-gray-600 leading-relaxed mb-6 relative z-10">
            Founded with a passion for holistic well-being, QUINS WELLNESS CENTRE started as a small initiative to bring transparent, high-quality nutrition to our community. We noticed a gap in the market for supplements that were both effective and sustainably sourced.
          </p>
          <p className="text-gray-600 leading-relaxed relative z-10">
            Today, we partner with top researchers and sustainable farms globally to ensure every product we offer meets the highest standards of purity and potency.
          </p>
        </div>
        <div className="relative aspect-square rounded-3xl overflow-hidden border border-gray-200 shadow-2xl">
          <img src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop" alt="Laboratory" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#14532d]/20 to-transparent"></div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8 text-center">
        <div className="bg-white border border-gray-100 rounded-2xl p-8 hover:border-[#15803d]/30 hover:bg-gray-50 transition-all shadow-sm">
          <div className="w-16 h-16 bg-[#15803d]/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Leaf className="w-8 h-8 text-[#15803d]" />
          </div>
          <h3 className="font-bold text-xl mb-4 text-gray-900 uppercase tracking-tighter">Pure Ingredients</h3>
          <p className="text-gray-500 text-sm font-medium">We source only the finest raw materials, ensuring no artificial fillers or harmful additives.</p>
        </div>
        <div className="bg-white border border-gray-100 rounded-2xl p-8 hover:border-[#15803d]/30 hover:bg-gray-50 transition-all shadow-sm">
          <div className="w-16 h-16 bg-[#15803d] rounded-full flex items-center justify-center mx-auto mb-6 text-white shadow-lg">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <h3 className="font-bold text-xl mb-4 text-gray-900 uppercase tracking-tighter">Rigorous Testing</h3>
          <p className="text-gray-500 text-sm font-medium">Every batch undergoes strict third-party testing for quality, safety, and efficacy.</p>
        </div>
        <div className="bg-white border border-gray-100 rounded-2xl p-8 hover:border-[#15803d]/30 hover:bg-gray-50 transition-all shadow-sm">
          <div className="w-16 h-16 bg-[#00d2ff]/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Zap className="w-8 h-8 text-[#00d2ff]" />
          </div>
          <h3 className="font-bold text-xl mb-4 text-gray-900 uppercase tracking-tighter">Maximum Efficacy</h3>
          <p className="text-gray-500 text-sm font-medium">Formulated for optimal absorption so your body gets exactly what it needs.</p>
        </div>
      </div>
    </div>
  );
};
