export class Usuario {
    id: number;
    username: string;
    nombre: string;
    email: string;
    password: string;
    fechaRegistro: Date;
    roles: string[] = [];
} 