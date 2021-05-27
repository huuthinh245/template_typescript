import { TripAction, TripState, TripType } from "./types";


const defaultState:TripState  = {
    loading: false,
    tripCode: '',
    displayCounter: 0,
    isTripDone: false,
    lastUpdatedTime : ''
};
const trip = (state: TripState = defaultState, action: TripAction):TripState =>  {
    switch (action.type) {
        case TripType.start:
            return state;
            case TripType.success:
                const { isTripDone, displayCounter, lastUpdatedTime, tripCode } = action.payload.data;
            return {
                ...state,
                loading: false,
                isTripDone,
                displayCounter,
                lastUpdatedTime,
                tripCode
            };
            case TripType.cancel:
            case TripType.error:
                return {
                    ...state,
                    loading: false
                };
        default: 
            return state;
    }
}

export default trip;