export enum OperationStatusFilter {
  all = 'todas',
  pending = 'pendientes',
  finished = 'terminadas',
  canceled = 'canceladas',
}

export interface GetOperationsFilter {
  from?: Date
  to?: Date
  status?: OperationStatusFilter
}

export enum OperationStatus {
  finished = 'terminada',
  canceled = 'cancelada',
}

export enum OperationType {
  buy = 'Compra',
  sell = 'Venta',
}

export enum OperationMode {
  limitPrice = 'precio_Limite',
  marketPrice = 'precio_Mercado',
}

export interface Operation {
  numero: number
  fechaOrden: string
  tipo: OperationType
  estado: OperationStatus
  mercado: string
  simbolo: string
  cantidad: number
  monto: number
  modalidad: OperationMode
  precio: 0
  fechaOperada: string
  cantidadOperada: number
  precioOperado: number
  montoOperado: number
}
