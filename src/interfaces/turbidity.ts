// Tipo para representar una lectura de turbidez
export interface Turbidity {
  id?: number; // ID único para cada registro de turbidez
  turbidity: number; // Valor de turbidez (FLOAT)
}

export interface PaginatedTurbidity {
  page: number; // Página actual
  limit: number; // Límite de registros por página
  total: number; // Total de registros en la base de datos
  totalPages: number; // Total de páginas disponibles
  data: Turbidity[]; // Datos de turbidez en la página actual
}
