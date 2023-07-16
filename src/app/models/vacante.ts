import { Categoria } from './categoria';
export class Vacante {
    id: number;
    nombre: string;
    descripcion: string;
    fecha: Date;
    salario: number;
    destacado: number;
    imagen: string;
    estatus: string;
    detalles: string;
    categoria: Categoria;
}