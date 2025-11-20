# 🍔 Señora Qumara - Sistema de Pedidos

Sitio web de restaurante construido con **Astro 5.8.1** siguiendo las mejores prácticas de [e-commerce de Astro](https://docs.astro.build/en/guides/ecommerce/).

## ✨ Características

- 🛒 **Sistema de Carrito**: Gestión completa de pedidos con localStorage
- 📱 **Responsive**: Diseño adaptable a todos los dispositivos
- 🎨 **Componentes Reutilizables**: Arquitectura modular y mantenible
- ⚡ **Performance**: SSG con hidratación selectiva
- 📊 **Gestión de Datos**: Conversión automática de Excel a JSON
- 💬 **Integración WhatsApp**: Checkout directo vía WhatsApp Business

## 🏗️ Estructura del Proyecto

```text
/
├── public/
│   ├── data/
│   │   ├── menu_prototipo.json      # Datos del menú (generado automáticamente)
│   │   └── productos.json           # Fuente de datos alternativa
│   └── img/                         # Imágenes del sitio
├── scripts/
│   └── excel-to-json.js            # Conversor Excel → JSON
├── src/
│   ├── components/
│   │   ├── Header.astro            # Navegación principal
│   │   ├── Footer.astro            # Pie de página
│   │   ├── Hero.astro              # Banner principal
│   │   ├── SummaryCards.astro      # Tarjetas de inicio
│   │   ├── MenuIsland.astro        # Grid de productos con filtros
│   │   ├── DeliveryTable.astro     # Tabla de precios delivery
│   │   ├── AboutCards.astro        # Tarjetas sobre nosotros
│   │   ├── CartStore.astro         # 🛒 Estado global del carrito
│   │   ├── CartButton.astro        # 🛒 Botón flotante del carrito
│   │   └── AddToCartButton.astro   # 🛒 Componente reutilizable
│   ├── layouts/
│   │   └── Layout.astro            # Layout principal
│   ├── pages/
│   │   ├── index.astro             # Página de inicio
│   │   ├── menu.astro              # Menú con filtros
│   │   ├── delivery.astro          # Información de delivery
│   │   ├── nosotros.astro          # Sobre nosotros
│   │   └── checkout.astro          # 🛒 Página de carrito
│   └── styles/
│       └── global.css              # Estilos globales mínimos
└── package.json
```

## 🧞 Comandos

| Comando                   | Acción                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Instalar dependencias                            |
| `npm run dev`             | Servidor de desarrollo en `localhost:4321`       |
| `npm run build`           | Construir sitio para producción en `./dist/`     |
| `npm run preview`         | Previsualizar build localmente                   |
| `npm run update-menu`     | 📊 Actualizar JSON desde Excel                   |
| `npm run astro ...`       | Ejecutar comandos CLI de Astro                   |

## 🛒 Sistema de Carrito (E-commerce)

Implementación siguiendo [Astro E-commerce Guide](https://docs.astro.build/en/guides/ecommerce/):

### Características del Carrito

- ✅ **Persistencia Local**: Usa localStorage para mantener el carrito entre sesiones
- ✅ **Validación de Datos**: Valida estructura y tipos antes de añadir productos
- ✅ **Event System**: Custom events para sincronización reactiva
- ✅ **Feedback Visual**: Animaciones al añadir/actualizar productos
- ✅ **Control de Cantidad**: Incrementar, decrementar y eliminar items
- ✅ **Cálculo de Totales**: Subtotales y total en tiempo real

### Flujo de Compra

1. **Explorar Menú** (`/menu`): Ver productos con filtros por categoría/subcategoría
2. **Añadir al Carrito**: Click en "🛒 Añadir al Carrito"
3. **Ver Carrito**: Click en botón flotante o ir a `/checkout`
4. **Ajustar Cantidades**: Usar +/- o eliminar items
5. **Enviar Pedido**: Click en "Enviar Pedido por WhatsApp"
6. **WhatsApp**: Se abre con mensaje formateado del pedido

### Componentes del Carrito

#### CartStore.astro
Store global con métodos:
- `addItem(product, quantity)` - Añadir producto
- `removeItem(productId)` - Eliminar producto
- `updateQuantity(productId, quantity)` - Actualizar cantidad
- `clear()` - Limpiar carrito
- `getTotal()` - Calcular total
- `getItemCount()` - Contar items totales

#### CartButton.astro
Botón flotante que muestra:
- Icono de carrito
- Badge con cantidad de items
- Animaciones al añadir productos
- Redirección a `/checkout`

#### MenuIsland.astro
Grid de productos con:
- Filtros por categoría y subcategoría
- Botones "Añadir al Carrito"
- Event delegation para performance
- Animaciones de feedback

#### checkout.astro
Página de carrito con:
- Lista de productos con imágenes
- Controles de cantidad (+/-)
- Botón de eliminar por item
- Cálculo de subtotales y total
- Botón "Seguir Comprando"
- Botón "Enviar Pedido por WhatsApp"

## 📊 Gestión de Datos

### Excel a JSON

El script `scripts/excel-to-json.js` convierte automáticamente un archivo Excel a JSON:

```bash
npm run update-menu
```

**Características:**
- Lee de `restaurant_products.xlsx`
- Filtra solo productos con `Status = "ACTIVO"`
- Genera `public/data/menu_prototipo.json`
- Normaliza line endings (LF)
- Valida estructura de datos

**Formato esperado del Excel:**
| id | name | price | category | subcategory | img | Status |
|----|------|-------|----------|-------------|-----|--------|
| 1  | Pizza| 25.00 | Comidas  | Pizzas      | ... | ACTIVO |

## 🎨 Arquitectura CSS

### Global Styles
`src/styles/global.css` contiene solo:
- Variables CSS (colores, fuentes, espaciados)
- Reset básico (box-sizing, margin, padding)
- Estilos de tipografía base

### Component Styles
Cada componente tiene sus propios estilos scoped:
```astro
<style>
  /* Estilos scoped al componente */
  .mi-clase { }
  
  /* Estilos para elementos dinámicos */
  :global(.clase-dinamica) { }
</style>
```

## 📱 Responsive Design

- **Desktop**: Grid de 3 columnas para productos
- **Tablet**: Grid de 2 columnas
- **Mobile**: Grid de 1 columna, navegación colapsada

## 🔧 Configuración

### WhatsApp Business
Edita el número en `src/pages/checkout.astro`:
```javascript
const phoneNumber = '51967159171'; // Tu número
```

### Colores del Sitio
Edita en `src/styles/global.css`:
```css
:root {
  --primary-color: #d4a017;
  --primary-dark: #b8860b;
  --secondary-color: #f9f3e6;
  /* ... */
}
```

## 🚀 Deploy

Este proyecto puede desplegarse en:
- **Vercel**: `vercel deploy`
- **Netlify**: `netlify deploy`
- **GitHub Pages**: Configurar en GitHub Actions
- **Cualquier host estático**: Subir carpeta `dist/`

## 📚 Referencias

- [Astro Documentation](https://docs.astro.build)
- [Astro E-commerce Guide](https://docs.astro.build/en/guides/ecommerce/)
- [WhatsApp Business API](https://faq.whatsapp.com/general/chats/how-to-use-click-to-chat)

## 📄 Licencia

MIT
