'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { ContentService } from '@/services/content.service';
import { Check, Star } from 'lucide-react';
import Image from 'next/image';

export default function HummingbirdSection() {
  const { data: passes = [], isLoading } = useQuery({
    queryKey: ['hummingbirdPasses'],
    queryFn: () => ContentService.getHummingbirdPasses()
  });

  return (
    <section id="colibries" className="relative w-full py-24 overflow-hidden border-b border-border-custom">
      {/* Contenedor del Fondo de Imagen con superposición crema */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/Santuario_de_colibries Rem.jpeg"
          alt="Santuario de Colibríes"
          fill
          sizes="100vw"
          className="object-cover object-center"
          priority
        />
        {/* Máscara de degradado crema para mantener contraste y legibilidad impecable */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#faf9f6]/65 via-[#faf9f6]/55 to-[#faf9f6]/65" />
      </div>

      <div className="max-w-7xl mx-auto px-6">
        {/* Encabezado */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-accent uppercase tracking-widest text-xs font-semibold">Santuario Ensifera</span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold mt-2 mb-4 text-primary">
            Avistamiento de Colibríes
          </h2>
          <p className="text-primary/75 font-light leading-relaxed">
            Ubicado en el microclima templado de Yanahuara y San Salvador, nuestro santuario alberga más de 20 especies registradas, incluyendo al majestuoso Colibrí Pico de Espada (*Ensifera ensifera*).
          </p>
        </div>

      {/* Grid de Pases */}
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {passes.map((pass, index) => {
            const isFeatured = index === 2; // El VIP es el destacado
            return (
              <motion.div
                key={pass.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className={`relative flex flex-col justify-between p-8 rounded-3xl transition-all border ${
                  isFeatured 
                    ? 'bg-primary text-white border-primary shadow-xl md:-translate-y-4' 
                    : 'bg-white text-primary border-border-custom hover:shadow-lg'
                }`}
              >
                {isFeatured && (
                  <span className="absolute -top-3 right-8 bg-accent text-primary px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 shadow-md">
                    <Star className="w-3 h-3 fill-primary" /> Recomendado
                  </span>
                )}
                <div>
                  <h3 className="font-serif text-2xl font-semibold mb-2">{pass.title}</h3>
                  <p className={`text-sm mb-6 ${isFeatured ? 'text-white/80' : 'text-primary/60'}`}>
                    {pass.description}
                  </p>
                  
                  {/* Precio */}
                  <div className="flex items-baseline gap-1 mb-8">
                    <span className="text-3xl font-bold font-serif">S/.</span>
                    <span className="text-5xl font-extrabold font-serif tracking-tight">{pass.price}</span>
                    <span className={`text-xs ml-1 ${isFeatured ? 'text-white/60' : 'text-primary/50'}`}>PEN</span>
                  </div>

                  {/* Beneficios */}
                  <ul className="space-y-4 mb-8">
                    {pass.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm">
                        <Check className={`w-4 h-4 shrink-0 mt-0.5 ${isFeatured ? 'text-accent' : 'text-secondary'}`} />
                        <span className={isFeatured ? 'text-white/95' : 'text-primary/85'}>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Botón de Reserva UI */}
                <button
                  type="button"
                  id={`btn-reserve-${pass.id}`}
                  className={`w-full py-3 rounded-full text-xs font-bold uppercase tracking-wider transition-all border ${
                    isFeatured 
                      ? 'bg-accent border-accent text-primary hover:bg-white hover:border-white' 
                      : 'border-primary/20 text-primary hover:bg-primary hover:text-white hover:border-primary'
                  }`}
                  onClick={() => alert(`Reserva de ${pass.title} iniciada. Completa tu consulta en nuestro WhatsApp o correo.`)}
                >
                  Reservar Pase
                </button>
              </motion.div>
            );
          })}
        </div>
      )}
      </div>
    </section>
  );
}
