import { dirname } from "path";
import { fileURLToPath } from "url";

export const __dirname = dirname(fileURLToPath(import.meta.url));

export const respuesta = (res, status, message) =>{
    res.status(status).json({message});
}
