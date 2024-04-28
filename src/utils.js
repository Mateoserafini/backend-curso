// Importa dirname de path para obtener el directorio del archivo actual
import { dirname } from "path";
// Importa fileURLToPath de url para convertir una URL a una ruta de archivo
import { fileURLToPath } from "url";

// Exporta __dirname como el directorio del archivo actual
export const __dirname = dirname(fileURLToPath(import.meta.url));
