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
{
  "status": "success",
  "payload": [
    {
      "_id": "662433397029fcb5f751ad1b",
      "title": "Camiseta Manga Corta",
      "description": "Camiseta básica de manga corta en color blanco.",
      "price": 15.99,
      "img": "Sin img",
      "code": "CAM-001",
      "stock": 50,
      "category": "Ropa",
      "status": true,
      "thumbnails": null
    },
    {
      "_id": "662433397029fcb5f751ad1c",
      "title": "Pantalones Vaqueros",
      "description": "Pantalones vaqueros de corte recto en color azul oscuro.",
      "price": 29.99,
      "img": "Sin img",
      "code": "PAN-001",
      "stock": 30,
      "category": "Ropa",
      "status": true,
      "thumbnails": null
    },
    {
      "_id": "662433397029fcb5f751ad1d",
      "title": "Zapatillas Deportivas",
      "description": "Zapatillas deportivas blancas con detalles negros.",
      "price": 49.99,
      "img": "Sin img",
      "code": "ZAP-001",
      "stock": 20,
      "category": "Calzado",
      "status": true,
      "thumbnails": null
    },
    {
      "_id": "662433397029fcb5f751ad1e",
      "title": "Sudadera con Capucha",
      "description": "Sudadera con capucha en color gris.",
      "price": 35.99,
      "img": "Sin img",
      "code": "SUD-001",
      "stock": 40,
      "category": "Ropa",
      "status": true,
      "thumbnails": null
    },
    {
      "_id": "662433397029fcb5f751ad1f",
      "title": "Bolso de Mano",
      "description": "Bolso de mano en color marrón con detalles dorados.",
      "price": 59.99,
      "img": "Sin img",
      "code": "BOL-001",
      "stock": 15,
      "category": "Accesorios",
      "status": true,
      "thumbnails": null
    },
    {
      "_id": "662433397029fcb5f751ad20",
      "title": "Gorra de Béisbol",
      "description": "Gorra de béisbol en color negro.",
      "price": 12.99,
      "img": "Sin img",
      "code": "GOR-001",
      "stock": 25,
      "category": "Accesorios",
      "status": true,
      "thumbnails": null
    },
    {
      "_id": "662433397029fcb5f751ad21",
      "title": "Reloj de Pulsera",
      "description": "Reloj de pulsera con correa de cuero marrón.",
      "price": 89.99,
      "img": "Sin img",
      "code": "REL-001",
      "stock": 10,
      "category": "Joyería",
      "status": true,
      "thumbnails": null
    },
    {
      "_id": "662433397029fcb5f751ad22",
      "title": "Cinturón de Cuero",
      "description": "Cinturón de cuero en color negro.",
      "price": 24.99,
      "img": "Sin img",
      "code": "CIN-001",
      "stock": 35,
      "category": "Accesorios",
      "status": true,
      "thumbnails": null
    },
    {
      "_id": "662433397029fcb5f751ad23",
      "title": "Vestido Largo",
      "description": "Vestido largo de verano con estampado floral.",
      "price": 59.99,
      "img": "Sin img",
      "code": "VES-001",
      "stock": 15,
      "category": "Ropa",
      "status": true,
      "thumbnails": null
    },
    {
      "_id": "662433397029fcb5f751ad24",
      "title": "Sombrero de Paja",
      "description": "Sombrero de paja con cinta negra.",
      "price": 19.99,
      "img": "Sin img",
      "code": "SOM-001",
      "stock": 10,
      "category": "Accesorios",
      "status": true,
      "thumbnails": null
    }
  ],
  "totalPages": 1,
  "prevPage": null,
  "nextPage": null,
  "page": 1,
  "hasPrevPage": false,
  "hasNextPage": false,
  "prevLink": null,
  "nextLink": null
}
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

