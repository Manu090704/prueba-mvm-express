// Tipo para representar un Alumno
export interface Profesor {
  id?: number;
  first_name: string;
  last_name: string;
  department: string;
  email: string;
  address?: string;
  phone?: string;
}

export interface PaginatedProfesor {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  data: Profesor[];
}
