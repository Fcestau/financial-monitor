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

export enum TipoOperacion {
  buy = 'Compra',
  sell = 'Venta',
}

export enum OperationMode {
  limitPrice = 'precio_Limite',
  marketPrice = 'precio_Mercado',
}

export interface IolOperation {
  numero: number
  fechaOrden: string
  tipo: TipoOperacion
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

export interface PosicionModel {
  cantidad: number
  ultimoPrecio: number
  valorizado: number
  titulo: TituloModel
}

export interface TituloModel {
  simbolo: string
  descripcion: string
  pais: string
  tipo: string
  moneda: string
  mercado: string
}
