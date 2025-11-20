import XLSX from 'xlsx';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Rutas
const excelPath = path.join(__dirname, '../public/restaurant_products.xlsx');
const jsonPath = path.join(__dirname, '../public/data/menu_prototipo.json');

// Leer el archivo Excel
const workbook = XLSX.readFile(excelPath);
const sheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[sheetName];

// Convertir a JSON
const rawData = XLSX.utils.sheet_to_json(worksheet);

// Filtrar solo productos ACTIVOS
const activeData = rawData.filter(row => {
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

// Guardar en JSON con saltos de línea Unix (LF)
const jsonContent = JSON.stringify(products, null, 2).replace(/\r\n/g, '\n');
fs.writeFileSync(jsonPath, jsonContent, 'utf-8');

console.log('✅ Conversión exitosa!');
console.log(`📁 ${products.length} productos exportados a: ${jsonPath}`);
