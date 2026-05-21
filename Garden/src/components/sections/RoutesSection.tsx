'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { ContentService } from '@/services/content.service';
import { Map, Clock, Compass, AlertCircle } from 'lucide-react';

export default function RoutesSection() {
  const { data: routes = [], isLoading } = useQuery({
    queryKey: ['routes'],
    queryFn: () => ContentService.getRoutes()
  });

  return (
    <section id="rutas" className="py-24 bg-white border-b border-border-custom">
      <div className="max-w-7xl mx-auto px-6">
        {/* Encabezado */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-4">
          <div className="max-w-2xl">
            <span className="text-accent uppercase tracking-widest text-xs font-semibold">Destinos y Mapas</span>
            <h2 className="font-serif text-4xl md:text-5xl font-bold mt-2 mb-4 text-primary">
              Rutas de Avistamiento
            </h2>
            <p className="text-primary/70 font-light leading-relaxed">
              Explora los principales hotspots ornitológicos de Cusco. Desde los humedales altoandinos hasta los bosques nublados templados del Valle Sagrado.
            </p>
          </div>
          <a
            href="#contacto"
            className="text-xs uppercase font-bold tracking-wider text-accent border-b-2 border-accent pb-1 hover:text-primary hover:border-primary transition-all shrink-0"
            onClick={(e) => {
              e.preventDefault();
              alert("Mapa interactivo de hotspots en desarrollo. Contacta para el folleto digital.");
            }}
          >
            Descargar Mapa PDF
          </a>
        </div>

        {/* Listado de Rutas */}
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {routes.map((route, index) => {
              const diffColor = 
                route.difficulty === 'Fácil' ? 'bg-green-100 text-green-800' :
                route.difficulty === 'Moderado' ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800';

              return (
                <motion.div
                  key={route.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  className="bg-[#faf9f6] border border-border-custom hover:border-accent rounded-3xl p-8 flex flex-col justify-between hover:shadow-lg transition-all"
                >
                  <div>
                    {/* Header de la card */}
                    <div className="flex justify-between items-center mb-6">
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full ${diffColor}`}>
                        {route.difficulty}
                      </span>
                      <div className="flex items-center gap-1.5 text-xs text-primary/60">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{route.duration}</span>
                      </div>
                    </div>

                    <h3 className="font-serif text-2xl font-bold text-primary mb-3">
                      {route.title}
                    </h3>
                    
                    <p className="text-sm text-primary/75 font-light leading-relaxed mb-6">
                      {route.description}
                    </p>

                    {/* Meta info */}
                    <div className="space-y-3 mb-8 border-t border-border-custom/50 pt-4 text-xs text-primary/70">
                      <div className="flex items-center gap-2">
                        <Map className="w-4 h-4 text-secondary shrink-0" />
                        <span>Punto de Inicio: <strong className="font-semibold">{route.startPoint}</strong></span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Compass className="w-4 h-4 text-secondary shrink-0" />
                        <span>Equipamiento: Telescopio, Binoculares</span>
                      </div>
                    </div>
                  </div>

                  {/* Footer de la card: Precio y Botón */}
                  <div className="border-t border-border-custom/50 pt-6 flex justify-between items-center">
                    <div>
                      <span className="text-[10px] text-primary/50 block uppercase tracking-wider">Precio desde</span>
                      <span className="text-2xl font-serif font-bold text-primary">S/. {route.price} <span className="text-xs font-sans font-normal text-primary/60">PEN</span></span>
                    </div>
                    <button
                      type="button"
                      id={`btn-route-${route.id}`}
                      className="bg-primary hover:bg-accent hover:text-primary text-white font-semibold text-xs uppercase tracking-wider px-5 py-3 rounded-full transition-all"
                      onClick={() => alert(`Consulta sobre la ${route.title} enviada. Responderemos en breve.`)}
                    >
                      Ver Detalles
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Tip de Seguridad */}
        <div className="mt-12 bg-primary/5 border border-primary/10 rounded-2xl p-6 flex gap-4 items-start max-w-4xl mx-auto">
          <AlertCircle className="w-5 h-5 text-accent shrink-0 mt-0.5" />
          <p className="text-xs leading-relaxed text-primary/80">
            <strong>Recomendación de aclimatación:</strong> Para las rutas clasificadas como *Moderado* o *Difícil* (Yanahuara y Pachacutec), recomendamos contar con al menos 24 horas de aclimatación previa en la altitud de Cusco para evitar el mal de montaña.
          </p>
        </div>
      </div>
    </section>
  );
}
