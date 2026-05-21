import { fetchFromWordPress } from '@/lib/wordpress';
import { HummingbirdPass, Route, Room, LodgeExperience, PhotoProduct, PhotoWorkshopPackage } from '@/types';

// Mock data de alta fidelidad basada en los inputs y mapas de Cusco
const MOCK_HUMMINGBIRD_PASSES: HummingbirdPass[] = [
  {
    id: 'pass-1',
    title: 'Pase Diario - Jardín Sagrado',
    price: 25,
    description: 'Acceso completo al jardín de observación de colibríes por un día.',
    features: ['Acceso de 6:00 AM a 5:00 PM', 'Uso de miradores y bebederos', 'Guía de campo digital de aves de Cusco', 'Café e infusión local ilimitados']
  },
  {
    id: 'pass-2',
    title: 'Pase de Temporada (Migración)',
    price: 120,
    description: 'Acceso ilimitado durante la temporada alta de migración de aves.',
    features: ['Ingreso ilimitado por 3 meses', 'Invitado gratuito por visita', '15% de descuento en el Lodge', 'Checklist físico de colibríes de cortesía']
  },
  {
    id: 'pass-3',
    title: 'Tour Guiado VIP con Biólogo',
    price: 65,
    description: 'Experiencia premium de avistamiento con un especialista local.',
    features: ['Duración: 3 horas', 'Grupos de máximo 4 personas', 'Uso de telescopio terrestre profesional', 'Consejos de fotografía de aves']
  }
];

const MOCK_ROUTES: Route[] = [
  {
    id: 'route-1',
    title: 'Ruta Ensifera (Yanahuara)',
    difficulty: 'Moderado',
    duration: '6 horas',
    price: 80,
    description: 'Ruta de avistamiento especializada en el colibrí pico de espada (Ensifera ensifera) en el Santuario de Yanahuara.',
    startPoint: 'Yanahuara'
  },
  {
    id: 'route-2',
    title: 'Humedal Lucre - Huacarpay',
    difficulty: 'Fácil',
    duration: '4 horas',
    price: 50,
    description: 'Observación de aves acuáticas andinas en los humedales de Lucre, un ecosistema Ramsar de gran biodiversidad.',
    startPoint: 'Huacarpay'
  },
  {
    id: 'route-3',
    title: 'Expedición Bosque Andino (Pachacutec)',
    difficulty: 'Difícil',
    duration: '8 horas',
    price: 110,
    description: 'Búsqueda de especies endémicas de bosque nublado y queñuales en las laderas altas de la cordillera de San Jerónimo.',
    startPoint: 'San Jerónimo'
  }
];

const MOCK_ROOMS: Room[] = [
  {
    id: 'room-1',
    name: 'Habitación Rústica Standard',
    pricePerNight: 120,
    capacity: 2,
    amenities: ['Desayuno buffet incluido', 'Agua caliente por energía solar', 'Vistas al jardín de colibríes', 'Wi-Fi de alta velocidad'],
    imageUrl: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=800'
  },
  {
    id: 'room-2',
    name: 'Habitación Deluxe Ensifera',
    pricePerNight: 175,
    capacity: 2,
    amenities: ['Balcón privado con bebedero de colibríes', 'Cama King Size de algodón orgánico', 'Calefactor ecológico', 'Servicio a la habitación de cortesía'],
    imageUrl: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=800'
  },
  {
    id: 'room-3',
    name: 'Cabaña Familiar Cordillera',
    pricePerNight: 240,
    capacity: 4,
    amenities: ['Cocina completa equipada', 'Chimenea de leña tradicional', 'Terraza panorámica hacia las montañas', 'Guía privado para caminatas cortas'],
    imageUrl: 'https://images.unsplash.com/photo-1542718610-a1d656d1884c?q=80&w=800'
  }
];

const MOCK_EXPERIENCES: LodgeExperience[] = [
  {
    id: 'exp-1',
    title: 'Cooking Class Ancestral',
    price: 45,
    duration: '3 horas',
    description: 'Aprende a preparar platos tradicionales andinos usando ingredientes frescos cosechados directamente de nuestro huerto orgánico guiado por un chef local.',
    included: ['Ingredientes orgánicos', 'Cata de chicha de jora o pisco sour', 'Recetario digital', 'Almuerzo completo']
  },
  {
    id: 'exp-2',
    title: 'Aventura en Moto Cross',
    price: 95,
    duration: '4 horas',
    description: 'Siente la adrenalina recorriendo los senderos andinos autorizados del Valle Sagrado. Rutas adaptadas a tu nivel técnico.',
    included: ['Motocicleta de cross equipada', 'Casco y equipo de seguridad completo', 'Guía certificado de aventura', 'Seguro contra accidentes']
  },
  {
    id: 'exp-3',
    title: 'Ciclismo de Montaña San Salvador',
    price: 60,
    duration: '5 horas',
    description: 'Descenso guiado en bicicleta desde los miradores altos de San Salvador hasta el fondo del valle. Paisajes inolvidables de Cusco.',
    included: ['Bicicleta de montaña de doble suspensión', 'Casco, guantes y coderas', 'Transporte de soporte', 'Snacks e hidratación']
  }
];

const MOCK_PHOTOS: PhotoProduct[] = [
  {
    id: 'photo-1',
    title: 'Ensifera Ensifera en Yanahuara',
    slug: 'ensifera-ensifera-yanahuara',
    price: 45,
    description: 'Fotografía digital de alta resolución del colibrí pico de espada (Ensifera ensifera) alimentándose de flores nativas de fucsia.',
    imageUrl: 'https://images.unsplash.com/photo-1589656966895-2f33e7653819?q=80&w=800',
    metadata: {
      species: 'Ensifera ensifera',
      location: 'Santuario de Yanahuara, Cusco',
      camera: 'Sony Alpha 1 + 600mm f/4',
      resolution: '50MP (8640 x 5760)'
    }
  },
  {
    id: 'photo-2',
    title: 'Colibrí Gigante en el Jardín',
    slug: 'colibri-gigante-jardin',
    price: 35,
    description: 'Impresionante captura del Patagona gigas, el colibrí más grande del mundo, sobrevolando las flores del lodge en San Salvador.',
    imageUrl: 'https://images.unsplash.com/photo-1452570053594-1b985d6ea890?q=80&w=800',
    metadata: {
      species: 'Patagona gigas',
      location: 'San Salvador, Cusco',
      camera: 'Canon EOS R5 + 400mm f/2.8',
      resolution: '45MP (8192 x 5464)'
    }
  },
  {
    id: 'photo-3',
    title: 'Amanecer sobre el Valle Sagrado',
    slug: 'amanecer-valle-sagrado',
    price: 55,
    description: 'Vista panorámica de la cordillera del Urubamba al amanecer desde los miradores del lodge, con niebla baja cubriendo el río.',
    imageUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=800',
    metadata: {
      location: 'San Salvador, Valle Sagrado',
      camera: 'Fujifilm GFX 100S + 32-64mm',
      resolution: '102MP (11648 x 8736)'
    }
  },
  {
    id: 'photo-4',
    title: 'Tangara Andina de Pecho Amarillo',
    slug: 'tangara-andina-pecho-amarillo',
    price: 40,
    description: 'Retrato de detalle con plumaje nítido de la Tangara de montaña posada en una rama musgosa durante la mañana fría.',
    imageUrl: 'https://images.unsplash.com/photo-1444464666168-49d633b86797?q=80&w=800',
    metadata: {
      species: 'Anisognathus lacrymosus',
      location: 'Bosque Andino, Pachacutec',
      camera: 'Sony Alpha 9 II + 200-600mm',
      resolution: '24MP (6000 x 4000)'
    }
  }
];

const MOCK_WORKSHOPS: PhotoWorkshopPackage[] = [
  {
    id: 'ws-1',
    title: 'Taller de Fotografía de Aves en Vuelo',
    category: 'Aves',
    price: 150,
    duration: '2 días',
    description: 'Domina las técnicas de enfoque continuo de alta velocidad, iluminación con flash de sincronización rápida y encuadres de colibríes en acción.',
    included: ['Clases teóricas en el lodge', 'Práctica de campo guiada en bebederos', 'Uso de fondos profesionales y flashes múltiples', 'Sesión de edición en Lightroom']
  },
  {
    id: 'ws-2',
    title: 'Astrofotografía y Vía Láctea en el Valle',
    category: 'Paisajes',
    price: 195,
    duration: '1 noche',
    description: 'Aprovecha los cielos limpios y la nula contaminación lumínica de San Salvador para fotografiar la Vía Láctea sobre el gazebo y las montañas.',
    included: ['Transporte a miradores altos', 'Catering y bebidas calientes', 'Guiado por fotógrafo astronómico experto', 'Taller de apilado digital de imágenes (Sequator/Photoshop)']
  },
  {
    id: 'ws-3',
    title: 'Macro y Flora del Bosque Nublado',
    category: 'Naturaleza',
    price: 130,
    duration: '1 día',
    description: 'Aprende a capturar el increíble micromundo de orquídeas nativas, helechos, insectos y gotas de rocío en los senderos de Pachacutec.',
    included: ['Almuerzo campestre', 'Préstamo de lentes macro especializados', 'Guiado personalizado en senderos', 'Guía PDF de revelado macro']
  }
];

export class ContentService {
  static async getHummingbirdPasses(): Promise<HummingbirdPass[]> {
    try {
      // Intenta conectar a WordPress, de lo contrario cae en mock
      const data = await fetchFromWordPress<HummingbirdPass[]>('hummingbird-passes');
      return data && data.length ? data : MOCK_HUMMINGBIRD_PASSES;
    } catch {
      return MOCK_HUMMINGBIRD_PASSES;
    }
  }

  static async getRoutes(): Promise<Route[]> {
    try {
      const data = await fetchFromWordPress<Route[]>('routes');
      return data && data.length ? data : MOCK_ROUTES;
    } catch {
      return MOCK_ROUTES;
    }
  }

  static async getRooms(): Promise<Room[]> {
    try {
      const data = await fetchFromWordPress<Room[]>('rooms');
      return data && data.length ? data : MOCK_ROOMS;
    } catch {
      return MOCK_ROOMS;
    }
  }

  static async getExperiences(): Promise<LodgeExperience[]> {
    try {
      const data = await fetchFromWordPress<LodgeExperience[]>('experiences');
      return data && data.length ? data : MOCK_EXPERIENCES;
    } catch {
      return MOCK_EXPERIENCES;
    }
  }

  static async getPhotos(): Promise<PhotoProduct[]> {
    try {
      const data = await fetchFromWordPress<PhotoProduct[]>('photos');
      return data && data.length ? data : MOCK_PHOTOS;
    } catch {
      return MOCK_PHOTOS;
    }
  }

  static async getPhotoBySlug(slug: string): Promise<PhotoProduct | null> {
    try {
      const photos = await this.getPhotos();
      return photos.find(p => p.slug === slug) || null;
    } catch {
      return MOCK_PHOTOS.find(p => p.slug === slug) || null;
    }
  }

  static async getWorkshops(): Promise<PhotoWorkshopPackage[]> {
    try {
      const data = await fetchFromWordPress<PhotoWorkshopPackage[]>('workshops');
      return data && data.length ? data : MOCK_WORKSHOPS;
    } catch {
      return MOCK_WORKSHOPS;
    }
  }

  static async getWorkshopById(id: string): Promise<PhotoWorkshopPackage | null> {
    const workshops = await this.getWorkshops();
    return workshops.find(w => w.id === id) || null;
  }
}
