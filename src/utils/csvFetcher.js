/**
 * Utilidad para extraer y convertir archivos CSV de Google Sheets en objetos de JavaScript.
 * Sigue los principios de JavaScript Pro: ES2023+, async/await y manejo de errores robusto.
 */

/**
 * Convierte una cadena CSV en un arreglo de objetos.
 * @param {string} csvText - El contenido del CSV como texto.
 * @returns {Array<Object>} Un arreglo de objetos con los datos del CSV.
 */
const parseCSV = (csvText) => {
  if (!csvText) return [];

  // Dividir por líneas, filtrando líneas vacías
  const lines = csvText.split("\n").filter((line) => line.trim() !== "");
  if (lines.length < 2) return [];

  // Extraer encabezados de la primera línea
  const headers = lines[0].split(",").map((header) => header.trim());

  // Procesar las filas restantes
  return lines.slice(1).map((line) => {
    const values = line.split(",").map((value) => value.trim());
    const entry = {};

    headers.forEach((header, index) => {
      // Manejar valores que podrían faltar
      entry[header] = values[index] ?? null;
    });

    return entry;
  });
};

/**
 * Obtiene un archivo CSV desde una URL y lo convierte a un objeto JS.
 * @param {string} url - La URL pública del CSV de Google Sheets.
 * @returns {Promise<Array<Object>|null>} Los datos procesados o null si ocurre un error.
 */
export const fetchAndParseCSV = async (url) => {
  try {
    console.info("Iniciando la extracción de datos desde Google Sheets...");
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status} ${response.statusText}`);
    }

    const csvData = await response.text();
    const parsedData = parseCSV(csvData);

    console.info("✅ Datos extraídos y procesados correctamente:");
    console.table(parsedData.slice(0, 5)); // Muestra los primeros 5 datos para verificar
    
    return parsedData;
  } catch (error) {
    console.error("❌ Error al extraer o procesar el archivo CSV:", error.message);
    return null;
  }
};
