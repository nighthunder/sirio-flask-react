export interface User {
    id: number ;
    firstname: string;
    lastname: string;
    situation: string;
    phone: string;
    type?: number | null;
    email: string;
    created_at?: string;
    updated_at?: string;
}