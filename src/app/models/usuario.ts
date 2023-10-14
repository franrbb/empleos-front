export class Usuario {
    id: number;
    username: string;
    nombre: string;
    email: string;
    password: string;
    fechaRegistro: Date;
    enabled: boolean;
    roles: string[] = [];
} 