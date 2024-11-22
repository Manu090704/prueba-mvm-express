// Tipo para representar una Lectura de Temperatura
export interface TemperatureReading {
  id?: number; // Opcional, generado automáticamente
  sensor_id: string; // ID único del sensor
  temperature: number; // Temperatura en °C
  timestamp: string; // Marca temporal en formato ISO 8601
}

// Tipo para representar la respuesta paginada de lecturas de temperatura
export interface PaginatedTemperatureReading {
  page: number; // Página actual
  limit: number; // Límite de lecturas por página
  total: number; // Número total de lecturas
  totalPages: number; // Número total de páginas
  data: TemperatureReading[]; // Lecturas de temperatura
}
