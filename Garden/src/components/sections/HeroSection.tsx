'use client';

import React from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';
import { Phone, Mail, MapPin, ChevronDown } from 'lucide-react';
import Image from 'next/image';

export default function HeroSection() {
  const { scrollY } = useScroll();
  // Desplaza la imagen hacia arriba un 25% de su tamaño para revelar la parte inferior en scroll
  const y = useTransform(scrollY, [0, 1000], ['0%', '-25%']);

  return (
    <section 
      id="inicio" 
      className="relative h-screen w-full flex flex-col justify-between items-center overflow-hidden"
    >
      {/* Fondo con Efecto Parallax */}
      <motion.div 
        style={{ 
          y,
          backgroundImage: `linear-gradient(to bottom, rgba(44, 62, 43, 0.45), rgba(44, 62, 43, 0.9)), url('/hero-1.jpg')`
        }}
        className="absolute inset-x-0 top-0 h-[135%] bg-cover bg-center -z-10"
      />
      {/* Espaciador para la barra de navegación fija */}
      <div className="h-28 w-full z-10" />

      {/* Contenido Central */}
      <div className="max-w-4xl px-6 text-center z-10 flex flex-col items-center justify-center flex-grow">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="flex flex-col items-center"
        >
          {/* Logo Oficial de Bearded Mountaineer */}
          <div className="relative w-32 h-32 mb-6 flex items-center justify-center bg-white/95 rounded-full p-3 border-2 border-accent/40 shadow-2xl hover:scale-105 transition-transform duration-300">
            <div className="relative w-full h-full">
              <Image
                src="/logo_BEARDEDMOUNTANIER.png"
                alt="Logo Oficial Bearded Mountaineer"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>

          <h1 className="font-serif text-5xl md:text-7xl font-bold text-white tracking-tight mb-2">
            Bearded Mountaineer
          </h1>
          <p className="font-serif text-accent text-xl md:text-2xl tracking-widest uppercase mb-6">
            Sacred Garden & Lodge
          </p>

          <p className="text-white/85 max-w-xl text-base md:text-lg font-light leading-relaxed mb-8">
            Un refugio andino de excelencia para el avistamiento de colibríes, expediciones fotográficas y descanso rústico de calidad en el corazón de los Andes.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <a 
              href="#lodge" 
              className="bg-accent hover:bg-accent/90 text-primary font-semibold px-8 py-3 rounded-full text-sm tracking-wide transition-all shadow-lg"
            >
              Explorar Habitaciones
            </a>
            <a 
              href="#colibries" 
              className="bg-white/10 hover:bg-white/20 border border-white/30 text-white font-semibold px-8 py-3 rounded-full text-sm tracking-wide transition-all"
            >
              Avistamiento de Colibríes
            </a>
          </div>
        </motion.div>
      </div>

      {/* Datos de Contacto y Footer del Hero */}
      <div className="w-full max-w-7xl mx-auto px-6 py-8 z-10 text-white/90 border-t border-white/15 flex flex-col md:flex-row gap-6 justify-between items-center text-xs md:text-sm">
        <div className="flex items-center gap-3">
          <MapPin className="text-accent w-4 h-4 shrink-0" />
          <span>San Salvador – Cusco, Perú</span>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 md:gap-8 items-center">
          <div className="flex items-center gap-2">
            <Phone className="text-accent w-4 h-4 shrink-0" />
            <span>+51 930 455 857 / +51 966 830 248</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="text-accent w-4 h-4 shrink-0" />
            <span>info@beardedmountaineerlodge.com</span>
          </div>
        </div>
        <a 
          href="#colibries" 
          aria-label="Deslizar hacia abajo"
          className="animate-bounce p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors"
        >
          <ChevronDown className="w-5 h-5 text-accent" />
        </a>
      </div>
    </section>
  );
}
