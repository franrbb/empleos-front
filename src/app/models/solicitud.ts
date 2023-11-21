import { Usuario } from "./usuario";
import { Vacante } from "./vacante";

export class Solicitud {
    id: number;
    fecha: Date;
    comentarios: string;
    archivo: string;
    vacante: Vacante;
    usuario: Usuario;
}