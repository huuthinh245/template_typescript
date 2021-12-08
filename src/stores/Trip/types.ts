
export enum  TripType  {
    start = 'TRIP-INFO-START',
    success= 'TRIP-INFO-SUCCESS',
    error ="TRIP-INFO-ERROR",
    cancel="TRIP-INFO-CANCEL"
}
export interface TripInfo {
    lastUpdatedTime: string
    displayCounter: number
    isTripDone: boolean,
    tripCode: string
}
export interface TripState {
    loading: boolean
    tripCode: string
    displayCounter: number
    isTripDone: boolean
    lastUpdatedTime: string
}
export interface TripStart {
    type: TripType.start, payload: { cancel: any}
}
export interface TripError {
    type: TripType.error; payload: { message: any} 
}
export interface TripSuccess {
    type: TripType.success; payload: { data: TripInfo} 
}

export interface TripCancel {
    type: TripType.cancel,
    payload: any
}
export type TripAction   =  TripStart | TripSuccess | TripError | TripCancel