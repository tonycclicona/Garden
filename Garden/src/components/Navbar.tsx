'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Menu, X, ShoppingBag } from 'lucide-react';
import { useCartStore } from '@/store/cart-store';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('inicio');
  const items = useCartStore((state) => state.items);
  
  // Calcular cantidad total de ítems en el carrito
  const cartItemsCount = items.length;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const sections = ['inicio', 'colibries', 'rutas', 'lodge', 'galeria'];
    const observers = sections.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        { threshold: 0.2, rootMargin: '-10% 0px -60% 0px' }
      );
      observer.observe(el);
      return { observer, el };
    });

    return () => {
      observers.forEach((item) => {
        if (item) item.observer.unobserve(item.el);
      });
    };
  }, []);

  const navLinks = [
    { id: 'inicio', label: 'Inicio' },
    { id: 'colibries', label: 'Colibríes' },
    { id: 'rutas', label: 'Rutas' },
    { id: 'lodge', label: 'Lodge & Experiencias' },
    { id: 'galeria', label: 'Galería & Talleres' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 text-white ${
        isScrolled
          ? 'bg-[#0a100a]/98 backdrop-blur-md shadow-lg border-b border-white/10 py-2'
          : 'bg-[#0a100a]/50 backdrop-blur-sm shadow-md border-b border-white/5 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <a href="#inicio" className="flex items-center">
          <div
            className={`relative transition-all duration-300 ${
              isScrolled 
                ? 'w-32 h-16 bg-[#131b12]/95 border border-accent/25 shadow-md rounded-lg px-3 py-1' 
                : 'w-44 h-24 bg-[#131b12]/95 border border-accent/35 shadow-lg rounded-xl px-4 py-1.5'
            } flex items-center justify-center hover:bg-[#1b261b] hover:scale-105 transition-all duration-200`}
          >
            <Image
              src="/logo_BEARDEDMOUNTANIER.png"
              alt="Logo Bearded Mountaineer"
              fill
              className="object-contain p-1"
              priority
            />
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-10 text-base md:text-lg font-semibold tracking-wide">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className={`transition-colors relative py-2 hover:text-accent ${
                activeSection === link.id ? 'text-accent font-bold' : 'text-white/95'
              }`}
            >
              {link.label}
              {activeSection === link.id && (
                <span className="absolute bottom-0 left-0 right-0 h-[3px] bg-accent rounded-full animate-in fade-in zoom-in duration-200" />
              )}
            </a>
          ))}
        </nav>

        {/* CTA and Actions */}
        <div className="flex items-center gap-4">
          <a
            href="#galeria"
            className={`hidden sm:inline-block border border-white hover:border-accent hover:text-accent px-6 py-2.5 rounded-full text-sm font-bold uppercase tracking-wider transition-all ${
              isScrolled ? 'bg-accent border-accent text-[#0a100a] hover:bg-transparent hover:text-accent' : ''
            }`}
          >
            Ver Galería
          </a>

          {/* Cart Icon Link */}
          <a
            href="#galeria"
            className="relative p-2 text-white hover:text-accent transition-colors"
            aria-label="Ver Carrito"
          >
            <ShoppingBag className="w-5 h-5" />
            {cartItemsCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-accent text-primary text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-bounce">
                {cartItemsCount}
              </span>
            )}
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-white hover:text-accent transition-colors"
            aria-label="Abrir Menú"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-[#0a100a]/98 backdrop-blur-lg border-b border-white/10 py-8 px-8 flex flex-col gap-5 shadow-xl animate-in fade-in slide-in-from-top-5 duration-200">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`text-lg font-bold py-2 hover:text-accent transition-colors ${
                activeSection === link.id ? 'text-accent border-l-4 border-accent pl-3' : 'text-white/90'
              }`}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#galeria"
            onClick={() => setIsMobileMenuOpen(false)}
            className="mt-4 text-center bg-accent text-[#0a100a] border border-accent hover:bg-transparent hover:text-accent py-3.5 rounded-full text-sm font-bold uppercase tracking-wider transition-all"
          >
            Ver Galería
          </a>
        </div>
      )}
    </header>
  );
}
