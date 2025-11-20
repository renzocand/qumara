import XLSX from 'xlsx';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Rutas
const excelPath = path.join(__dirname, '../public/restaurant_products.xlsx');
const menuJsonPath = path.join(__dirname, '../public/data/menu_prototipo.json');
const deliveryJsonPath = path.join(__dirname, '../public/data/deliveries.json');

// Leer el archivo Excel
const workbook = XLSX.readFile(excelPath);

// ========== PROCESAR HOJA DE PRODUCTOS ==========
const productSheetName = workbook.SheetNames[0];
const productWorksheet = workbook.Sheets[productSheetName];

// Convertir a JSON
const rawProductData = XLSX.utils.sheet_to_json(productWorksheet);

// Filtrar solo productos ACTIVOS
const activeData = rawProductData.filter(row => {
  const status = (row.status || row.Status || row.STATUS || '').toString().trim().toUpperCase();
  return status === 'ACTIVO';
});

// Transformar al formato requerido
const products = activeData.map((row, index) => {
  return {
    id: index + 1,
    name: row.nombre || row.Nombre || row.name || row.Name || '',
    price: parseFloat(row.precio || row.Precio || row.price || row.Price || 0),
    category: row.categoria || row.Categoria || row.category || row.Category || '',
    subcategory: row.subcategoria || row.Subcategoria || row.subcategory || row.Subcategory || '',
    img: row.imagen || row.Imagen || row.img || row.Image || '/img/proceso.webp'
  };
});

// Guardar productos en JSON
const productsJsonContent = JSON.stringify(products, null, 2).replace(/\r\n/g, '\n');
fs.writeFileSync(menuJsonPath, productsJsonContent, 'utf-8');

console.log('✅ Conversión exitosa!');
console.log(`📁 ${products.length} productos exportados a: ${menuJsonPath}`);

// ========== PROCESAR HOJA DE DELIVERIES ==========
const deliverySheet = workbook.Sheets['Deliveries'];
if (deliverySheet) {
  const rawDeliveryData = XLSX.utils.sheet_to_json(deliverySheet);
  
  // Transformar datos de delivery
  const deliveries = rawDeliveryData.map((row, index) => {
    return {
      id: index + 1,
      district: row.distrito || row.Distrito || row.district || row.District || '',
      price: parseFloat(row.precio || row.Precio || row.price || row.Price || 0),
      time: row.tiempo || row.Tiempo || row.time || row.Time || '',
      minOrder: parseFloat(row.pedidoMinimo || row.PedidoMinimo || row.minOrder || row.MinOrder || 0)
    };
  });
  
  // Guardar deliveries en JSON
  const deliveriesJsonContent = JSON.stringify(deliveries, null, 2).replace(/\r\n/g, '\n');
  fs.writeFileSync(deliveryJsonPath, deliveriesJsonContent, 'utf-8');
  
  console.log(`📁 ${deliveries.length} zonas de delivery exportadas a: ${deliveryJsonPath}`);
} else {
  console.log('⚠️  No se encontró la hoja "Deliveries" en el Excel');
}
