import { Categoria } from './categoria';
export class Vacante {
    id: number;
    nombre: string;
    descripcion: string;
    fecha: Date;
    salario: number;
    destacado: number;
    imagen: string;
    status: string;
    detalles: string;
    categoria: Categoria;
}