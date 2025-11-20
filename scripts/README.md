# Script de Conversión Excel a JSON

Este script convierte el archivo `restaurant_products.xlsx` al formato JSON usado por el menú.

## Uso

```bash
npm run update-menu
```

## Formato del Excel

El Excel debe tener las siguientes columnas (no importa el orden):
- **nombre** (o Name, Nombre, name)
- **precio** (o Price, Precio, price)
- **categoria** (o Category, Categoria, category)
- **subcategoria** (o Subcategory, Subcategoria, subcategory)
- **imagen** (o Image, Imagen, img) - opcional, si no existe usa `/img/proceso.webp`

## Resultado

El script generará automáticamente:
- IDs secuenciales (1, 2, 3...)
- Formato JSON compatible con `menu_prototipo.json`
- Guardará en `public/data/menu_prototipo.json`

## Ejemplo

Si tu Excel tiene:
```
nombre              | precio | categoria     | subcategoria | imagen
Jugo Verde          | 8.00   | Desayunos    | Bebidas      | /img/jugo_verde.webp
La Clásica          | 8.50   | Hamburguesas | Carne        | /img/CLASICA.webp
```

Se convertirá a:
```json
[
  { "id": 1, "name": "Jugo Verde", "price": 8.00, "category": "Desayunos", "subcategory": "Bebidas", "img": "/img/jugo_verde.webp" },
  { "id": 2, "name": "La Clásica", "price": 8.50, "category": "Hamburguesas", "subcategory": "Carne", "img": "/img/CLASICA.webp" }
]
```
