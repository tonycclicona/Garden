export interface HummingbirdPass {
  id: string;
  title: string;
  price: number;
  description: string;
  features: string[];
}

export interface Route {
  id: string;
  title: string;
  difficulty: 'Fácil' | 'Moderado' | 'Difícil';
  duration: string; // Ej: "4 horas" o "Día completo"
  price: number;
  description: string;
  startPoint: string;
}

export interface Room {
  id: string;
  name: string;
  pricePerNight: number;
  capacity: number;
  amenities: string[];
  imageUrl: string;
}

export interface LodgeExperience {
  id: string;
  title: string; // Ej: "Cooking class", "Moto Cross", "Ciclismo"
  price: number;
  duration: string;
  description: string;
  included: string[];
}

export interface PhotoProduct {
  id: string;
  title: string;
  slug: string;
  price: number;
  description: string;
  imageUrl: string;
  metadata: {
    species?: string;
    location?: string;
    camera?: string;
    resolution?: string;
  };
}

export interface PhotoWorkshopPackage {
  id: string;
  title: string; // Ej: "Taller de Fotografía de Colibríes", "Taller de Paisaje Nocturno"
  category: 'Naturaleza' | 'Aves' | 'Paisajes' | 'Otros';
  price: number;
  duration: string;
  description: string;
  included: string[];
}

export interface CartItem {
  product: PhotoProduct | PhotoWorkshopPackage;
  quantity: number;
}
