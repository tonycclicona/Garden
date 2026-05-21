'use client';

import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ContentService } from '@/services/content.service';
import { PhotoProduct, PhotoWorkshopPackage } from '@/types';
import { useCartStore } from '@/store/cart-store';
import ImageCard from '../gallery/ImageCard';
import ImageLightbox from '../gallery/ImageLightbox';
import CartDrawer from '../gallery/CartDrawer';
import { Bird, Camera, Image as ImageIcon, Sparkles, Calendar, BookOpen, ShoppingCart } from 'lucide-react';
import { motion } from 'framer-motion';

export default function GallerySection() {
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoProduct | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<'todos' | 'aves' | 'paisajes'>('todos');

  // Zustand
  const { items, addItem } = useCartStore();
  const cartCount = items.length;

  // Consultar Fotos
  const { data: photos = [], isLoading: isLoadingPhotos } = useQuery({
    queryKey: ['photos'],
    queryFn: () => ContentService.getPhotos()
  });

  // Consultar Talleres
  const { data: workshops = [], isLoading: isLoadingWorkshops } = useQuery({
    queryKey: ['workshops'],
    queryFn: () => ContentService.getWorkshops()
  });

  // Filtrar Fotos
  const filteredPhotos = photos.filter(photo => {
    if (activeCategory === 'todos') return true;
    if (activeCategory === 'aves') return !!photo.metadata.species;
    if (activeCategory === 'paisajes') return !photo.metadata.species;
    return true;
  });

  return (
    <section id="galeria" className="py-24 bg-white border-b border-border-custom relative">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* ENCABEZADO DE SECCIÓN */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <span className="text-accent uppercase tracking-widest text-xs font-semibold">Galería de Naturaleza</span>
            <h2 className="font-serif text-4xl md:text-5xl font-bold mt-2 mb-4 text-primary">
              Venta de Fotos & Talleres
            </h2>
            <p className="text-primary/75 font-light leading-relaxed">
              Adquiere descargas digitales de alta resolución con metadatos EXIF completos, o inscríbete en nuestros prestigiosos talleres de fotografía en Cusco.
            </p>
          </div>

          {/* Botón flotante/fijo del Carrito */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="flex items-center gap-2 bg-primary hover:bg-accent text-white hover:text-primary px-6 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all shadow-lg shrink-0"
          >
            <ShoppingCart className="w-4 h-4" />
            <span>Ver Carrito</span>
            {cartCount > 0 && (
              <span className="ml-1 bg-accent text-primary text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border border-primary">
                {cartCount}
              </span>
            )}
          </button>
        </div>

        {/* TABS DE FILTRO (Sólo para la galería fotográfica) */}
        <div className="flex justify-start gap-3 mb-10 overflow-x-auto pb-2">
          <button
            onClick={() => setActiveCategory('todos')}
            className={`px-5 py-2 rounded-full text-xs font-semibold border transition-all ${
              activeCategory === 'todos'
                ? 'bg-primary text-white border-primary'
                : 'bg-[#faf9f6] text-primary/60 border-border-custom hover:text-primary'
            }`}
          >
            Todas las Fotos
          </button>
          <button
            onClick={() => setActiveCategory('aves')}
            className={`px-5 py-2 rounded-full text-xs font-semibold border transition-all flex items-center gap-1.5 ${
              activeCategory === 'aves'
                ? 'bg-primary text-white border-primary'
                : 'bg-[#faf9f6] text-primary/60 border-border-custom hover:text-primary'
            }`}
          >
            <Bird className="w-3.5 h-3.5" /> Colibríes & Aves
          </button>
          <button
            onClick={() => setActiveCategory('paisajes')}
            className={`px-5 py-2 rounded-full text-xs font-semibold border transition-all flex items-center gap-1.5 ${
              activeCategory === 'paisajes'
                ? 'bg-primary text-white border-primary'
                : 'bg-[#faf9f6] text-primary/60 border-border-custom hover:text-primary'
            }`}
          >
            <ImageIcon className="w-3.5 h-3.5" /> Paisajes
          </button>
        </div>

        {/* GRID DE FOTOS */}
        {isLoadingPhotos ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
            {filteredPhotos.map((photo) => (
              <ImageCard
                key={photo.id}
                photo={photo}
                onViewDetails={setSelectedPhoto}
                onOpenCart={() => setIsCartOpen(true)}
              />
            ))}
          </div>
        )}

        {/* SECCIÓN DE TALLERES DE FOTOGRAFÍA (Añadido según requerimiento del usuario) */}
        <div className="border-t border-border-custom pt-16">
          <div className="max-w-2xl mb-12">
            <span className="text-accent uppercase tracking-widest text-xs font-semibold">Aprendizaje en Campo</span>
            <h3 className="font-serif text-3xl font-bold mt-1 text-primary">Talleres de Fotografía</h3>
            <p className="text-sm text-primary/70 font-light mt-2">
              Aprende de profesionales del sector con sesiones prácticas en el jardín de colibríes, la cordillera andina o bajo el cielo estrellado.
            </p>
          </div>

          {isLoadingWorkshops ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {workshops.map((ws) => {
                const isInCart = items.some(item => item.product.id === ws.id);

                return (
                  <motion.div
                    key={ws.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-[#faf9f6] border border-border-custom rounded-3xl p-8 flex flex-col justify-between hover:shadow-md transition-all"
                  >
                    <div>
                      {/* Categoria */}
                      <div className="flex justify-between items-center mb-6">
                        <span className="text-[9px] font-bold uppercase tracking-wider px-3 py-1 bg-primary/5 text-primary rounded-full flex items-center gap-1.5">
                          <Camera className="w-3.5 h-3.5 text-accent" /> Taller {ws.category}
                        </span>
                        <span className="text-xs text-primary/60 flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" /> {ws.duration}
                        </span>
                      </div>

                      <h4 className="font-serif text-xl font-bold text-primary mb-3">{ws.title}</h4>
                      <p className="text-xs text-primary/75 leading-relaxed font-light mb-6">
                        {ws.description}
                      </p>

                      {/* Incluye */}
                      <div className="mb-8">
                        <span className="text-[9px] uppercase font-bold tracking-wider text-primary/40 block mb-2">Incluye:</span>
                        <ul className="space-y-1.5">
                          {ws.included.map((inc, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-xs text-primary/80">
                              <BookOpen className="w-3.5 h-3.5 text-accent shrink-0 mt-0.5" />
                              <span>{inc}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Footer de compra */}
                    <div className="border-t border-border-custom/50 pt-6 flex justify-between items-center">
                      <div>
                        <span className="text-[9px] text-primary/50 block uppercase tracking-wider">Inscripción</span>
                        <span className="text-2xl font-serif font-bold text-primary">S/. {ws.price} <span className="text-xs font-sans font-normal text-primary/60">PEN</span></span>
                      </div>

                      <button
                        onClick={() => {
                          if (isInCart) {
                            setIsCartOpen(true);
                          } else {
                            addItem(ws);
                            setIsCartOpen(true);
                          }
                        }}
                        className={`flex items-center gap-1.5 px-5 py-3 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                          isInCart 
                            ? 'bg-secondary text-white' 
                            : 'bg-primary hover:bg-accent text-white hover:text-primary'
                        }`}
                      >
                        {isInCart ? 'En Carrito' : 'Inscribirse'}
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>

        {/* MODALES FLOTANTES */}
        {selectedPhoto && (
          <ImageLightbox
            photo={selectedPhoto}
            onClose={() => setSelectedPhoto(null)}
            onOpenCart={() => setIsCartOpen(true)}
          />
        )}

        {/* DRAWER DEL CARRITO */}
        <CartDrawer
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
        />
        
      </div>
    </section>
  );
}
