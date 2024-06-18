# Hola Fede

## Leeme

## Instrucciones para las pruebas

### Colección de Carritos

1. La colección de carritos comienza vacía.
2. Puedes crear un nuevo carrito utilizando Postman.

### Método POST para crear un carrito

- **URL**: `http://localhost:8080/api/carts`
- El método POST genera un nuevo carrito y devuelve su ID.

### JSON de Productos

A continuación, se presenta un ejemplo de los productos disponibles para las pruebas con Postman:

```json
[
    {
      "title": "Camiseta Básica Blanca",
      "description": "Camiseta de algodón blanca de manga corta",
      "price": 10.99,
      "stock": 100,
      "thumbnail": "sin img",
      "code": "CMB001",
      "category": "Camisetas",
      "status": true
    },
    {
      "title": "Jeans Azul Clásico",
      "description": "Jeans ajustados de mezclilla azul",
      "price": 29.99,
      "stock": 50,
      "thumbnail": "sin img",
      "code": "JAC001",
      "category": "Pantalones",
      "status": true
    },
    {
      "title": "Sudadera con Capucha Negra",
      "description": "Sudadera de algodón negra con capucha",
      "price": 24.99,
      "stock": 70,
      "thumbnail": "sin img",
      "code": "SCN001",
      "category": "Sudaderas",
      "status": true
    },
    {
      "title": "Polo Verde",
      "description": "Camiseta polo verde de algodón",
      "price": 19.99,
      "stock": 80,
      "thumbnail": "sin img",
      "code": "PV001",
      "category": "Polos",
      "status": true
    },
    {
      "title": "Chaqueta de Cuero",
      "description": "Chaqueta de cuero genuino negro",
      "price": 99.99,
      "stock": 30,
      "thumbnail": "sin img",
      "code": "CC001",
      "category": "Chaquetas",
      "status": true
    },
    {
      "title": "Vestido Rojo",
      "description": "Vestido de fiesta rojo ajustado",
      "price": 49.99,
      "stock": 40,
      "thumbnail": "sin img",
      "code": "VR001",
      "category": "Vestidos",
      "status": true
    },
    {
      "title": "Falda Negra",
      "description": "Falda corta negra de lana",
      "price": 25.99,
      "stock": 60,
      "thumbnail": "sin img",
      "code": "FN001",
      "category": "Faldas",
      "status": true
    },
    {
      "title": "Blusa Blanca",
      "description": "Blusa de seda blanca con botones",
      "price": 35.99,
      "stock": 55,
      "thumbnail": "sin img",
      "code": "BB001",
      "category": "Blusas",
      "status": true
    },
    {
      "title": "Pantalones Cortos",
      "description": "Pantalones cortos de mezclilla azul",
      "price": 15.99,
      "stock": 90,
      "thumbnail": "sin img",
      "code": "PC001",
      "category": "Pantalones",
      "status": true
    },
    {
      "title": "Zapatos Deportivos",
      "description": "Zapatos deportivos blancos unisex",
      "price": 59.99,
      "stock": 40,
      "thumbnail": "sin img",
      "code": "ZD001",
      "category": "Zapatos",
      "status": true
    },
    {
      "title": "Gorra Azul",
      "description": "Gorra azul con visera curva",
      "price": 12.99,
      "stock": 120,
      "thumbnail": "sin img",
      "code": "GA001",
      "category": "Accesorios",
      "status": true
    },
    {
      "title": "Cinturón de Cuero",
      "description": "Cinturón de cuero marrón",
      "price": 19.99,
      "stock": 80,
      "thumbnail": "sin img",
      "code": "CCM001",
      "category": "Accesorios",
      "status": true
    },
    {
      "title": "Bufanda de Lana",
      "description": "Bufanda de lana gris",
      "price": 14.99,
      "stock": 70,
      "thumbnail": "sin img",
      "code": "BL001",
      "category": "Accesorios",
      "status": true
    },
    {
      "title": "Calcetines Deportivos",
      "description": "Calcetines deportivos blancos (paquete de 3)",
      "price": 9.99,
      "stock": 150,
      "thumbnail": "sin img",
      "code": "CD001",
      "category": "Calcetines",
      "status": true
    },
    {
      "title": "Chaqueta Vaquera",
      "description": "Chaqueta de mezclilla azul clásica",
      "price": 49.99,
      "stock": 50,
      "thumbnail": "sin img",
      "code": "CV001",
      "category": "Chaquetas",
      "status": true
    },
    {
      "title": "Traje de Baño",
      "description": "Traje de baño de una pieza negro",
      "price": 29.99,
      "stock": 60,
      "thumbnail": "sin img",
      "code": "TB001",
      "category": "Ropa de Baño",
      "status": true
    },
    {
      "title": "Gafas de Sol",
      "description": "Gafas de sol polarizadas",
      "price": 25.99,
      "stock": 70,
      "thumbnail": "sin img",
      "code": "GS001",
      "category": "Accesorios",
      "status": true
    },
    {
      "title": "Chaleco Acolchado",
      "description": "Chaleco acolchado para el invierno",
      "price": 39.99,
      "stock": 40,
      "thumbnail": "sin img",
      "code": "CA001",
      "category": "Chaquetas",
      "status": true
    },
    {
      "title": "Pijama de Algodón",
      "description": "Pijama de algodón suave de dos piezas",
      "price": 22.99,
      "stock": 65,
      "thumbnail": "sin img",
      "code": "PA001",
      "category": "Ropa de Dormir",
      "status": true
    },
    {
      "title": "Bermudas Beige",
      "description": "Bermudas casuales beige",
      "price": 18.99,
      "stock": 75,
      "thumbnail": "sin img",
      "code": "BB002",
      "category": "Pantalones",
      "status": true
    }
]
```

## Inicialización del Proyecto

Para inicializar el proyecto, sigue estos pasos:

1. Cambia al directorio del backend:

    ```bash
    cd backend
    ```
2. Instala las dependencias necesarias:

    ```bash
    npm install
    ```

3. Para iniciar el proyecto en modo desarrollo:

    ```bash
    npm run dev
    ```
    
4. Para iniciar el proyecto en modo producción:

    ```bash
    npm start
    ```

