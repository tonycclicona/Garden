<?php
/**
 * Plugin Name: Bearded Mountaineer Helper
 * Plugin URI: https://beardedmountaineerlodge.com
 * Description: Registers Custom Post Types and custom REST API endpoints for the Bearded Mountaineer Sacred Garden & Lodge frontend.
 * Version: 1.0.0
 * Author: Antigravity
 * License: GPL2
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

// 1. Registro de Custom Post Types
function bml_register_custom_post_types() {
    // Pases de Colibrí
    register_post_type( 'hummingbird_pass', [
        'labels' => [
            'name' => 'Pases de Colibrí',
            'singular_name' => 'Pase de Colibrí',
        ],
        'public' => true,
        'has_archive' => true,
        'show_in_rest' => true,
        'supports' => [ 'title', 'editor' ],
        'menu_icon' => 'dashicons-tickets-alt',
    ]);

    // Rutas de Avistamiento
    register_post_type( 'avian_route', [
        'labels' => [
            'name' => 'Rutas de Avistamiento',
            'singular_name' => 'Ruta de Avistamiento',
        ],
        'public' => true,
        'has_archive' => true,
        'show_in_rest' => true,
        'supports' => [ 'title', 'editor' ],
        'menu_icon' => 'dashicons-location-alt',
    ]);

    // Habitaciones
    register_post_type( 'lodge_room', [
        'labels' => [
            'name' => 'Habitaciones Lodge',
            'singular_name' => 'Habitación Lodge',
        ],
        'public' => true,
        'has_archive' => true,
        'show_in_rest' => true,
        'supports' => [ 'title', 'editor', 'thumbnail' ],
        'menu_icon' => 'dashicons-admin-home',
    ]);

    // Experiencias
    register_post_type( 'lodge_experience', [
        'labels' => [
            'name' => 'Experiencias Lodge',
            'singular_name' => 'Experiencia Lodge',
        ],
        'public' => true,
        'has_archive' => true,
        'show_in_rest' => true,
        'supports' => [ 'title', 'editor' ],
        'menu_icon' => 'dashicons-palmtree',
    ]);

    // Fotos de Galería
    register_post_type( 'photo_product', [
        'labels' => [
            'name' => 'Fotos Galería',
            'singular_name' => 'Foto Galería',
        ],
        'public' => true,
        'has_archive' => true,
        'show_in_rest' => true,
        'supports' => [ 'title', 'editor', 'thumbnail' ],
        'menu_icon' => 'dashicons-format-image',
    ]);

    // Talleres
    register_post_type( 'photo_workshop', [
        'labels' => [
            'name' => 'Talleres de Fotografía',
            'singular_name' => 'Taller de Fotografía',
        ],
        'public' => true,
        'has_archive' => true,
        'show_in_rest' => true,
        'supports' => [ 'title', 'editor' ],
        'menu_icon' => 'dashicons-welcome-learn-more',
    ]);
}
add_action( 'init', 'bml_register_custom_post_types' );

// 2. Registro de Rutas Custom del REST API en la ruta wp-json/wp/v2/...
function bml_register_rest_routes() {
    register_rest_route( 'wp/v2', '/hummingbird-passes', [
        'methods' => 'GET',
        'callback' => 'bml_get_hummingbird_passes',
        'permission_callback' => '__return_true',
    ]);

    register_rest_route( 'wp/v2', '/routes', [
        'methods' => 'GET',
        'callback' => 'bml_get_routes',
        'permission_callback' => '__return_true',
    ]);

    register_rest_route( 'wp/v2', '/rooms', [
        'methods' => 'GET',
        'callback' => 'bml_get_rooms',
        'permission_callback' => '__return_true',
    ]);

    register_rest_route( 'wp/v2', '/experiences', [
        'methods' => 'GET',
        'callback' => 'bml_get_experiences',
        'permission_callback' => '__return_true',
    ]);

    register_rest_route( 'wp/v2', '/photos', [
        'methods' => 'GET',
        'callback' => 'bml_get_photos',
        'permission_callback' => '__return_true',
    ]);

    register_rest_route( 'wp/v2', '/workshops', [
        'methods' => 'GET',
        'callback' => 'bml_get_workshops',
        'permission_callback' => '__return_true',
    ]);
}
add_action( 'rest_api_init', 'bml_register_rest_routes' );

// 3. Callbacks para el REST API
function bml_get_hummingbird_passes() {
    $posts = get_posts([
        'post_type' => 'hummingbird_pass',
        'numberposts' => -1,
        'post_status' => 'publish',
    ]);

    $data = [];
    foreach ( $posts as $post ) {
        $features_raw = get_post_meta( $post->ID, '_features', true );
        $features = is_array( $features_raw ) ? $features_raw : array_map( 'trim', explode( "\n", $features_raw ) );
        $data[] = [
            'id' => 'pass-' . $post->ID,
            'title' => $post->post_title,
            'price' => (float) get_post_meta( $post->ID, '_price', true ),
            'description' => $post->post_content,
            'features' => array_filter( $features ),
        ];
    }
    return $data;
}

function bml_get_routes() {
    $posts = get_posts([
        'post_type' => 'avian_route',
        'numberposts' => -1,
        'post_status' => 'publish',
    ]);

    $data = [];
    foreach ( $posts as $post ) {
        $data[] = [
            'id' => 'route-' . $post->ID,
            'title' => $post->post_title,
            'difficulty' => get_post_meta( $post->ID, '_difficulty', true ) ?: 'Fácil',
            'duration' => get_post_meta( $post->ID, '_duration', true ) ?: '4 horas',
            'price' => (float) get_post_meta( $post->ID, '_price', true ),
            'description' => $post->post_content,
            'startPoint' => get_post_meta( $post->ID, '_start_point', true ) ?: 'San Salvador',
        ];
    }
    return $data;
}

function bml_get_rooms() {
    $posts = get_posts([
        'post_type' => 'lodge_room',
        'numberposts' => -1,
        'post_status' => 'publish',
    ]);

    $data = [];
    foreach ( $posts as $post ) {
        $amenities_raw = get_post_meta( $post->ID, '_amenities', true );
        $amenities = is_array( $amenities_raw ) ? $amenities_raw : array_map( 'trim', explode( "\n", $amenities_raw ) );
        
        $image_id = get_post_thumbnail_id( $post->ID );
        $image_url = $image_id ? wp_get_attachment_url( $image_id ) : get_post_meta( $post->ID, '_image_url', true );

        $data[] = [
            'id' => 'room-' . $post->ID,
            'name' => $post->post_title,
            'pricePerNight' => (float) get_post_meta( $post->ID, '_price_per_night', true ),
            'capacity' => (int) get_post_meta( $post->ID, '_capacity', true ) ?: 2,
            'amenities' => array_filter( $amenities ),
            'imageUrl' => $image_url ?: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=800',
        ];
    }
    return $data;
}

function bml_get_experiences() {
    $posts = get_posts([
        'post_type' => 'lodge_experience',
        'numberposts' => -1,
        'post_status' => 'publish',
    ]);

    $data = [];
    foreach ( $posts as $post ) {
        $included_raw = get_post_meta( $post->ID, '_included', true );
        $included = is_array( $included_raw ) ? $included_raw : array_map( 'trim', explode( "\n", $included_raw ) );
        $data[] = [
            'id' => 'exp-' . $post->ID,
            'title' => $post->post_title,
            'price' => (float) get_post_meta( $post->ID, '_price', true ),
            'duration' => get_post_meta( $post->ID, '_duration', true ) ?: '3 horas',
            'description' => $post->post_content,
            'included' => array_filter( $included ),
        ];
    }
    return $data;
}

function bml_get_photos() {
    $posts = get_posts([
        'post_type' => 'photo_product',
        'numberposts' => -1,
        'post_status' => 'publish',
    ]);

    $data = [];
    foreach ( $posts as $post ) {
        $image_id = get_post_thumbnail_id( $post->ID );
        $image_url = $image_id ? wp_get_attachment_url( $image_id ) : get_post_meta( $post->ID, '_image_url', true );

        $data[] = [
            'id' => 'photo-' . $post->ID,
            'title' => $post->post_title,
            'slug' => $post->post_name,
            'price' => (float) get_post_meta( $post->ID, '_price', true ),
            'description' => $post->post_content,
            'imageUrl' => $image_url ?: 'https://images.unsplash.com/photo-1589656966895-2f33e7653819?q=80&w=800',
            'metadata' => [
                'species' => get_post_meta( $post->ID, '_metadata_species', true ) ?: '',
                'location' => get_post_meta( $post->ID, '_metadata_location', true ) ?: '',
                'camera' => get_post_meta( $post->ID, '_metadata_camera', true ) ?: '',
                'resolution' => get_post_meta( $post->ID, '_metadata_resolution', true ) ?: '',
            ],
        ];
    }
    return $data;
}

function bml_get_workshops() {
    $posts = get_posts([
        'post_type' => 'photo_workshop',
        'numberposts' => -1,
        'post_status' => 'publish',
    ]);

    $data = [];
    foreach ( $posts as $post ) {
        $included_raw = get_post_meta( $post->ID, '_included', true );
        $included = is_array( $included_raw ) ? $included_raw : array_map( 'trim', explode( "\n", $included_raw ) );
        $data[] = [
            'id' => 'ws-' . $post->ID,
            'title' => $post->post_title,
            'category' => get_post_meta( $post->ID, '_category', true ) ?: 'Otros',
            'price' => (float) get_post_meta( $post->ID, '_price', true ),
            'duration' => get_post_meta( $post->ID, '_duration', true ) ?: '1 día',
            'description' => $post->post_content,
            'included' => array_filter( $included ),
        ];
    }
    return $data;
}

// 4. Seeding de Datos Iniciales en la Activación
function bml_seed_initial_data() {
    bml_register_custom_post_types();

    // Seeding Hummingbird Passes
    $passes_seeded = get_posts([ 'post_type' => 'hummingbird_pass', 'numberposts' => 1 ]);
    if ( empty( $passes_seeded ) ) {
        $passes = [
            [
                'title' => 'Pase Diario - Jardín Sagrado',
                'price' => 25,
                'content' => 'Acceso completo al jardín de observación de colibríes por un día.',
                'features' => "Acceso de 6:00 AM a 5:00 PM\nUso de miradores y bebederos\nGuía de campo digital de aves de Cusco\nCafé e infusión local ilimitados"
            ],
            [
                'title' => 'Pase de Temporada (Migración)',
                'price' => 120,
                'content' => 'Acceso ilimitado durante la temporada alta de migración de aves.',
                'features' => "Ingreso ilimitado por 3 meses\nInvitado gratuito por visita\n15% de descuento en el Lodge\nChecklist físico de colibríes de cortesía"
            ],
            [
                'title' => 'Tour Guiado VIP con Biólogo',
                'price' => 65,
                'content' => 'Experiencia premium de avistamiento con un especialista local.',
                'features' => "Duración: 3 horas\nGrupos de máximo 4 personas\nUso de telescopio terrestre profesional\nConsejos de fotografía de aves"
            ]
        ];

        foreach ( $passes as $pass ) {
            $post_id = wp_insert_post([
                'post_title' => $pass['title'],
                'post_content' => $pass['content'],
                'post_type' => 'hummingbird_pass',
                'post_status' => 'publish'
            ]);
            update_post_meta( $post_id, '_price', $pass['price'] );
            update_post_meta( $post_id, '_features', $pass['features'] );
        }
    }

    // Seeding Routes
    $routes_seeded = get_posts([ 'post_type' => 'avian_route', 'numberposts' => 1 ]);
    if ( empty( $routes_seeded ) ) {
        $routes = [
            [
                'title' => 'Ruta Ensifera (Yanahuara)',
                'difficulty' => 'Moderado',
                'duration' => '6 horas',
                'price' => 80,
                'content' => 'Ruta de avistamiento especializada en el colibrí pico de espada (Ensifera ensifera) en el Santuario de Yanahuara.',
                'start_point' => 'Yanahuara'
            ],
            [
                'title' => 'Humedal Lucre - Huacarpay',
                'difficulty' => 'Fácil',
                'duration' => '4 horas',
                'price' => 50,
                'content' => 'Observación de aves acuáticas andinas en los humedales de Lucre, un ecosistema Ramsar de gran biodiversidad.',
                'start_point' => 'Huacarpay'
            ],
            [
                'title' => 'Expedición Bosque Andino (Pachacutec)',
                'difficulty' => 'Difícil',
                'duration' => '8 horas',
                'price' => 110,
                'content' => 'Búsqueda de especies endémicas de bosque nublado y queñuales en las laderas altas de la cordillera de San Jerónimo.',
                'start_point' => 'San Jerónimo'
            ]
        ];

        foreach ( $routes as $route ) {
            $post_id = wp_insert_post([
                'post_title' => $route['title'],
                'post_content' => $route['content'],
                'post_type' => 'avian_route',
                'post_status' => 'publish'
            ]);
            update_post_meta( $post_id, '_difficulty', $route['difficulty'] );
            update_post_meta( $post_id, '_duration', $route['duration'] );
            update_post_meta( $post_id, '_price', $route['price'] );
            update_post_meta( $post_id, '_start_point', $route['start_point'] );
        }
    }

    // Seeding Rooms
    $rooms_seeded = get_posts([ 'post_type' => 'lodge_room', 'numberposts' => 1 ]);
    if ( empty( $rooms_seeded ) ) {
        $rooms = [
            [
                'title' => 'Habitación Rústica Standard',
                'price' => 120,
                'capacity' => 2,
                'amenities' => "Desayuno buffet incluido\nAgua caliente por energía solar\nVistas al jardín de colibríes\nWi-Fi de alta velocidad",
                'image_url' => 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=800'
            ],
            [
                'title' => 'Habitación Deluxe Ensifera',
                'price' => 175,
                'capacity' => 2,
                'amenities' => "Balcón privado con bebedero de colibríes\nCama King Size de algodón orgánico\nCalefactor ecológico\nServicio a la habitación de cortesía",
                'image_url' => 'https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=800'
            ],
            [
                'title' => 'Cabaña Familiar Cordillera',
                'price' => 240,
                'capacity' => 4,
                'amenities' => "Cocina completa equipada\nChimenea de leña tradicional\nTerraza panorámica hacia las montañas\nGuía privado para caminatas cortas",
                'image_url' => 'https://images.unsplash.com/photo-1542718610-a1d656d1884c?q=80&w=800'
            ]
        ];

        foreach ( $rooms as $room ) {
            $post_id = wp_insert_post([
                'post_title' => $room['title'],
                'post_type' => 'lodge_room',
                'post_status' => 'publish'
            ]);
            update_post_meta( $post_id, '_price_per_night', $room['price'] );
            update_post_meta( $post_id, '_capacity', $room['capacity'] );
            update_post_meta( $post_id, '_amenities', $room['amenities'] );
            update_post_meta( $post_id, '_image_url', $room['image_url'] );
        }
    }

    // Seeding Experiences
    $experiences_seeded = get_posts([ 'post_type' => 'lodge_experience', 'numberposts' => 1 ]);
    if ( empty( $experiences_seeded ) ) {
        $experiences = [
            [
                'title' => 'Cooking Class Ancestral',
                'price' => 45,
                'duration' => '3 horas',
                'content' => 'Aprende a preparar platos tradicionales andinos usando ingredientes frescos cosechados directamente de nuestro huerto orgánico guiado por un chef local.',
                'included' => "Ingredientes orgánicos\nCata de chicha de jora o pisco sour\nRecetario digital\nAlmuerzo completo"
            ],
            [
                'title' => 'Aventura en Moto Cross',
                'price' => 95,
                'duration' => '4 horas',
                'content' => 'Siente la adrenalina recorriendo los senderos andinos autorizados del Valle Sagrado. Rutas adaptadas a tu nivel técnico.',
                'included' => "Motocicleta de cross equipada\nCasco y equipo de seguridad completo\nGuía certificado de aventura\nSeguro contra accidentes"
            ],
            [
                'title' => 'Ciclismo de Montaña San Salvador',
                'price' => 60,
                'duration' => '5 horas',
                'content' => 'Descenso guiado en bicicleta desde los miradores altos de San Salvador hasta el fondo del valle. Paisajes inolvidables de Cusco.',
                'included' => "Bicicleta de montaña de doble suspensión\nCasco, guantes y coderas\nTransporte de soporte\nSnacks e hidratación"
            ]
        ];

        foreach ( $experiences as $exp ) {
            $post_id = wp_insert_post([
                'post_title' => $exp['title'],
                'post_content' => $exp['content'],
                'post_type' => 'lodge_experience',
                'post_status' => 'publish'
            ]);
            update_post_meta( $post_id, '_price', $exp['price'] );
            update_post_meta( $post_id, '_duration', $exp['duration'] );
            update_post_meta( $post_id, '_included', $exp['included'] );
        }
    }

    // Seeding Photos
    $photos_seeded = get_posts([ 'post_type' => 'photo_product', 'numberposts' => 1 ]);
    if ( empty( $photos_seeded ) ) {
        $photos = [
            [
                'title' => 'Ensifera Ensifera en Yanahuara',
                'slug' => 'ensifera-ensifera-yanahuara',
                'price' => 45,
                'content' => 'Fotografía digital de alta resolución del colibrí pico de espada (Ensifera ensifera) alimentándose de flores nativas de fucsia.',
                'image_url' => 'https://images.unsplash.com/photo-1589656966895-2f33e7653819?q=80&w=800',
                'species' => 'Ensifera ensifera',
                'location' => 'Santuario de Yanahuara, Cusco',
                'camera' => 'Sony Alpha 1 + 600mm f/4',
                'resolution' => '50MP (8640 x 5760)'
            ],
            [
                'title' => 'Colibrí Gigante en el Jardín',
                'slug' => 'colibri-gigante-jardin',
                'price' => 35,
                'content' => 'Impresionante captura del Patagona gigas, el colibrí más grande del mundo, sobrevolando las flores del lodge en San Salvador.',
                'image_url' => 'https://images.unsplash.com/photo-1452570053594-1b985d6ea890?q=80&w=800',
                'species' => 'Patagona gigas',
                'location' => 'San Salvador, Cusco',
                'camera' => 'Canon EOS R5 + 400mm f/2.8',
                'resolution' => '45MP (8192 x 5464)'
            ],
            [
                'title' => 'Amanecer sobre el Valle Sagrado',
                'slug' => 'amanecer-valle-sagrado',
                'price' => 55,
                'content' => 'Vista panorámica de la cordillera del Urubamba al amanecer desde los miradores del lodge, con niebla baja cubriendo el río.',
                'image_url' => 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=800',
                'species' => '',
                'location' => 'San Salvador, Valle Sagrado',
                'camera' => 'Fujifilm GFX 100S + 32-64mm',
                'resolution' => '102MP (11648 x 8736)'
            ],
            [
                'title' => 'Tangara Andina de Pecho Amarillo',
                'slug' => 'tangara-andina-pecho-amarillo',
                'price' => 40,
                'content' => 'Retrato de detalle con plumaje nítido de la Tangara de montaña posada en una rama musgosa durante la mañana fría.',
                'image_url' => 'https://images.unsplash.com/photo-1444464666168-49d633b86797?q=80&w=800',
                'species' => 'Anisognathus lacrymosus',
                'location' => 'Bosque Andino, Pachacutec',
                'camera' => 'Sony Alpha 9 II + 200-600mm',
                'resolution' => '24MP (6000 x 4000)'
            ]
        ];

        foreach ( $photos as $photo ) {
            $post_id = wp_insert_post([
                'post_title' => $photo['title'],
                'post_name' => $photo['slug'],
                'post_content' => $photo['content'],
                'post_type' => 'photo_product',
                'post_status' => 'publish'
            ]);
            update_post_meta( $post_id, '_price', $photo['price'] );
            update_post_meta( $post_id, '_image_url', $photo['image_url'] );
            update_post_meta( $post_id, '_metadata_species', $photo['species'] );
            update_post_meta( $post_id, '_metadata_location', $photo['location'] );
            update_post_meta( $post_id, '_metadata_camera', $photo['camera'] );
            update_post_meta( $post_id, '_metadata_resolution', $photo['resolution'] );
        }
    }

    // Seeding Workshops
    $workshops_seeded = get_posts([ 'post_type' => 'photo_workshop', 'numberposts' => 1 ]);
    if ( empty( $workshops_seeded ) ) {
        $workshops = [
            [
                'title' => 'Taller de Fotografía de Aves en Vuelo',
                'category' => 'Aves',
                'price' => 150,
                'duration' => '2 días',
                'content' => 'Domina las técnicas de enfoque continuo de alta velocidad, iluminación con flash de sincronización rápida y encuadres de colibríes en acción.',
                'included' => "Clases teóricas en el lodge\nPráctica de campo guiada en bebederos\nUso de fondos profesionales y flashes múltiples\nSesión de edición en Lightroom"
            ],
            [
                'title' => 'Astrofotografía y Vía Láctea en el Valle',
                'category' => 'Paisajes',
                'price' => 195,
                'duration' => '1 noche',
                'content' => 'Aprovecha los cielos limpios y la nula contaminación lumínica de San Salvador para fotografiar la Vía Láctea sobre el gazebo y las montañas.',
                'included' => "Transporte a miradores altos\nCatering y bebidas calientes\nGuiado por fotógrafo astronómico experto\nTaller de apilado digital de imágenes (Sequator/Photoshop)"
            ],
            [
                'title' => 'Macro y Flora del Bosque Nublado',
                'category' => 'Naturaleza',
                'price' => 130,
                'duration' => '1 día',
                'content' => 'Aprende a ajustar el increíble micromundo de orquídeas nativas, helechos, insectos y gotas de rocío en los senderos de Pachacutec.',
                'included' => "Almuerzo campestre\nPréstamo de lentes macro especializados\nGuiado personalizado en senderos\nGuía PDF de revelado macro"
            ]
        ];

        foreach ( $workshops as $ws ) {
            $post_id = wp_insert_post([
                'post_title' => $ws['title'],
                'post_content' => $ws['content'],
                'post_type' => 'photo_workshop',
                'post_status' => 'publish'
            ]);
            update_post_meta( $post_id, '_category', $ws['category'] );
            update_post_meta( $post_id, '_price', $ws['price'] );
            update_post_meta( $post_id, '_duration', $ws['duration'] );
            update_post_meta( $post_id, '_included', $ws['included'] );
        }
    }
}
register_activation_hook( __FILE__, 'bml_seed_initial_data' );
