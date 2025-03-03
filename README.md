# Documentación de AppStore

## Introducción
Este proyecto es el frontend de una tienda en línea desarrollada con **Next.js (App Router)**. Se conecta a un backend simulado con **JSON Server** y permite la gestión de productos, categorías, carrito de compras y cupones de descuento.

## Instalación y Configuración
### Prerrequisitos
- **Node.js** (v18 o superior)
- **npm**

### Instalación de dependencias
```sh
npm install  # O usa npm install
```

### Configuración del entorno
Crea un archivo `.env.local` en la raíz del proyecto y agrega las siguientes variables:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

## Uso de JSON Server
Este proyecto usa **JSON Server** para simular una API REST con datos de prueba.

### Instalación de JSON Server
```sh
npm add -g json-server
```

### Inicio del servidor JSON
```sh
json-server --watch db.json --port 3001
```

El archivo `db.json` contiene datos de ejemplo:

```json
{
  "products": [
    {
      "id": "1",
      "name": "Producto de ejemplo",
      "price": 100,
      "category": "Ejemplo"
    }
  ],
  "categories": [
    {
      "id": "1",
      "name": "Ejemplo",
      "slug": "ejemplo"
    }
  ]
}
```

## Estructura del Proyecto
```
src/
├── app/
│   ├── (shop)/
│   │   ├── page.tsx   # Página principal
│   │   ├── products/
│   │   │   ├── [id]/page.tsx   # Página de detalle del producto
│   │   │   ├── @modal/products/[id]/page.tsx   # Modal del producto
│   ├── layout.tsx   # Layout principal
├── components/
├── context/
├── services/
├── types/
```

## Componentes Destacados
### `ProductModal.tsx`
Muestra un modal con la información del producto cuando se selecciona en la página de inicio.

### `ProductPage.tsx`
Página individual del producto, accesible en `/products/[id]`.

## Despliegue en Vercel
Para desplegar este proyecto en **Vercel**, sigue estos pasos:

1. Instala la CLI de Vercel:
   ```sh
   pnpm add -g vercel
   ```

2. Inicia sesión:
   ```sh
   vercel login
   ```

3. Despliega el proyecto:
   ```sh
   vercel --prod
   ```

## Pruebas con Cupones de Descuento
Para probar cupones en el frontend, usa los siguientes códigos:

- **`DESCUENTO20`**: Aplica un 20% de descuento.
- **`PROMO50`**: Aplica S/ 50 de descuento.


---

Esta documentación proporciona una visión general del frontend, su configuración y el uso de JSON Server. Para más detalles, revisa el código fuente o expande la documentación según sea necesario.

