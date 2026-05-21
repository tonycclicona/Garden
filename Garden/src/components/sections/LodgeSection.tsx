'use client';

import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import { ContentService } from '@/services/content.service';
import { Coffee, Flame, Wifi, Compass, Sparkles, Users, Award, Shield, Timer } from 'lucide-react';
import Image from 'next/image';

export default function LodgeSection() {
  const [activeTab, setActiveTab] = useState<'rooms' | 'experiences'>('rooms');

  // Consulta de Habitaciones
  const { data: rooms = [], isLoading: isLoadingRooms } = useQuery({
    queryKey: ['rooms'],
    queryFn: () => ContentService.getRooms()
  });

  // Consulta de Experiencias (Cooking Class, Moto Cross, Ciclismo)
  const { data: experiences = [], isLoading: isLoadingExperiences } = useQuery({
    queryKey: ['experiences'],
    queryFn: () => ContentService.getExperiences()
  });

  return (
    <section id="lodge" className="py-24 bg-[#faf9f6] border-b border-border-custom overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Encabezado */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-accent uppercase tracking-widest text-xs font-semibold">Estadía & Aventura</span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold mt-2 mb-4 text-primary">
            Lodge & Experiencias
          </h2>
          <p className="text-primary/75 font-light leading-relaxed">
            Hospédate en un entorno natural andino sin renunciar al confort. Descubre también nuestras experiencias exclusivas de aventura, deporte y gastronomía local.
          </p>

          {/* Selector de Pestañas (Habitaciones / Experiencias) */}
          <div className="inline-flex bg-white border border-border-custom p-1 rounded-full mt-8 shadow-sm">
            <button
              onClick={() => setActiveTab('rooms')}
              className={`px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                activeTab === 'rooms'
                  ? 'bg-primary text-white'
                  : 'text-primary/60 hover:text-primary'
              }`}
            >
              Habitaciones
            </button>
            <button
              onClick={() => setActiveTab('experiences')}
              className={`px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                activeTab === 'experiences'
                  ? 'bg-primary text-white'
                  : 'text-primary/60 hover:text-primary'
              }`}
            >
              Experiencias
            </button>
          </div>
        </div>

        {/* Contenedor Animado */}
        <AnimatePresence mode="wait">
          {activeTab === 'rooms' ? (
            <motion.div
              key="rooms-tab"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
              transition={{ duration: 0.5 }}
              className="space-y-12"
            >
              {isLoadingRooms ? (
                <div className="flex justify-center py-16">
                  <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {rooms.map((room, idx) => (
                    <div 
                      key={room.id} 
                      className="bg-white border border-border-custom rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                    >
                      {/* Imagen con next/image */}
                      <div className="relative h-60 w-full bg-primary/10">
                        <Image
                          src={room.imageUrl}
                          alt={room.name}
                          fill
                          sizes="(max-width: 1024px) 100vw, 33vw"
                          className="object-cover"
                          priority={idx === 0}
                        />
                        <div className="absolute top-4 right-4 bg-white/95 backdrop-blur px-3 py-1 rounded-full text-[10px] font-bold text-primary flex items-center gap-1">
                          <Users className="w-3 h-3" /> Máx. {room.capacity}
                        </div>
                      </div>

                      <div className="p-8 flex-grow flex flex-col justify-between">
                        <div>
                          <h3 className="font-serif text-2xl font-bold text-primary mb-4">{room.name}</h3>
                          
                          {/* Amenities */}
                          <ul className="space-y-2.5 mb-8">
                            {room.amenities.map((amenity, i) => {
                              // Elige icono adecuado
                              let Icon = Compass;
                              if (amenity.toLowerCase().includes('desayuno') || amenity.toLowerCase().includes('buffet')) Icon = Coffee;
                              if (amenity.toLowerCase().includes('chimenea') || amenity.toLowerCase().includes('calefactor')) Icon = Flame;
                              if (amenity.toLowerCase().includes('wi-fi') || amenity.toLowerCase().includes('internet')) Icon = Wifi;
                              return (
                                <li key={i} className="flex items-center gap-2.5 text-xs text-primary/80">
                                  <Icon className="w-4 h-4 text-accent shrink-0" />
                                  <span>{amenity}</span>
                                </li>
                              );
                            })}
                          </ul>
                        </div>

                        {/* Precio & Reserva */}
                        <div className="border-t border-border-custom/50 pt-6 flex justify-between items-center mt-auto">
                          <div>
                            <span className="text-[10px] text-primary/50 block uppercase tracking-wider">Precio por noche</span>
                            <span className="text-2xl font-serif font-bold text-primary">S/. {room.pricePerNight} <span className="text-xs font-sans font-normal text-primary/60">PEN</span></span>
                          </div>
                          <button
                            type="button"
                            className="bg-primary hover:bg-accent hover:text-primary text-white font-semibold text-xs uppercase tracking-wider px-5 py-3 rounded-full transition-all"
                            onClick={() => alert(`Consulta de reserva para ${room.name} enviada. Nos pondremos en contacto.`)}
                          >
                            Reservar
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="experiences-tab"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
              transition={{ duration: 0.5 }}
            >
              {isLoadingExperiences ? (
                <div className="flex justify-center py-16">
                  <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {experiences.map((exp) => (
                    <div 
                      key={exp.id} 
                      className="bg-white border border-border-custom rounded-3xl p-8 flex flex-col justify-between hover:shadow-md transition-all"
                    >
                      <div>
                        {/* Cabecera */}
                        <div className="flex justify-between items-center mb-6">
                          <span className="text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 bg-accent/15 text-terracotta rounded-full flex items-center gap-1">
                            <Sparkles className="w-3 h-3" /> Aventura & Sabor
                          </span>
                          <div className="flex items-center gap-1 text-xs text-primary/60">
                            <Timer className="w-3.5 h-3.5" />
                            <span>{exp.duration}</span>
                          </div>
                        </div>

                        <h3 className="font-serif text-2xl font-bold text-primary mb-3">{exp.title}</h3>
                        <p className="text-sm text-primary/75 font-light leading-relaxed mb-6">
                          {exp.description}
                        </p>

                        {/* Inclusiones */}
                        <div className="mb-8">
                          <span className="text-[10px] uppercase font-bold tracking-wider text-primary/50 block mb-3">Qué incluye:</span>
                          <ul className="space-y-2">
                            {exp.included.map((inc, i) => (
                              <li key={i} className="flex items-start gap-2 text-xs text-primary/80">
                                <Shield className="w-3.5 h-3.5 text-secondary shrink-0 mt-0.5" />
                                <span>{inc}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Footer */}
                      <div className="border-t border-border-custom/50 pt-6 flex justify-between items-center">
                        <div>
                          <span className="text-[10px] text-primary/50 block uppercase tracking-wider">Costo por persona</span>
                          <span className="text-2xl font-serif font-bold text-primary">S/. {exp.price} <span className="text-xs font-sans font-normal text-primary/60">PEN</span></span>
                        </div>
                        <button
                          type="button"
                          className="bg-terracotta hover:bg-accent hover:text-primary text-white font-semibold text-xs uppercase tracking-wider px-5 py-3 rounded-full transition-all"
                          onClick={() => alert(`Reserva de experiencia: ${exp.title} añadida. Contáctanos por WhatsApp para cuadrar horarios.`)}
                        >
                          Adquirir
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Garantías de Lodge */}
        <div className="mt-16 border-t border-border-custom/60 pt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          <div className="flex flex-col md:flex-row gap-4 items-center md:items-start">
            <div className="w-12 h-12 rounded-full bg-accent/15 flex items-center justify-center text-terracotta shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-serif text-lg font-bold text-primary mb-1">Guías Locales Pro</h4>
              <p className="text-xs text-primary/70 leading-relaxed font-light">Todas nuestras excursiones son lideradas por biólogos locales o guías de aventura calificados.</p>
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-4 items-center md:items-start">
            <div className="w-12 h-12 rounded-full bg-accent/15 flex items-center justify-center text-terracotta shrink-0">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-serif text-lg font-bold text-primary mb-1">Servicio Personalizado</h4>
              <p className="text-xs text-primary/70 leading-relaxed font-light">Limitamos nuestros grupos a máximo 6 personas para garantizar el menor impacto ambiental y la mejor experiencia.</p>
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-4 items-center md:items-start">
            <div className="w-12 h-12 rounded-full bg-accent/15 flex items-center justify-center text-terracotta shrink-0">
              <Flame className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-serif text-lg font-bold text-primary mb-1">Impacto Positivo</h4>
              <p className="text-xs text-primary/70 leading-relaxed font-light">El 15% de cada reserva se destina directamente al mantenimiento y conservación del jardín botánico de colibríes.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
