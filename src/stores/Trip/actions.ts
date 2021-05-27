import { TripCancel, TripError, TripInfo, TripStart, TripSuccess, TripType } from "./types"



const tripStart = (cancel: any):TripStart => ({
    type: TripType.start,
    payload: {
        cancel
    }
})

const tripSuccess = ( tripInfo:TripInfo): TripSuccess => ({
    type: TripType.success,
    payload: {
      data: tripInfo
    }
})

const tripError = (message: string = ''): TripError => ({
    type: TripType.error,
    payload: {
        message: message
    }
})

const tripCancel = (): TripCancel => ({
    type: TripType.cancel,
})
const actions = {
    tripStart,
    tripSuccess,
    tripError,
    tripCancel
}

export { actions }