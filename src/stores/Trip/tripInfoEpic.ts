import { map, mergeMap, catchError, takeUntil, repeat } from 'rxjs/operators'
import { of } from 'rxjs'

import {ActionsObservable, combineEpics, ofType} from 'redux-observable'
import _ from 'lodash';

import { actions } from './actions';
import GHNAPI from './api';
import { TripStart, TripType, TripCancel } from "./types";

const getTripInfoEpic= (action$: ActionsObservable<TripStart | TripCancel>)=>
    action$.pipe(
        ofType(TripType.start, TripType.cancel),
        map(action => action.payload),
        mergeMap(({ cancel}) => {
            return GHNAPI.getTripInfoApi(cancel).pipe(
                map( ({data}) => {
                    const response = data;
                    if(response.status == 'OK') {
                        const info = response.data?.[0] ?? {}
                        const { 
                            tripCode= "",
                            displayCounter=0,
                            lastUpdatedTime = new Date(),
                            status= ""
                        } = info
                        const isTripDone = status == 'FINISHED'
                        return actions.tripSuccess({
                            displayCounter,
                            tripCode,
                            isTripDone,
                            lastUpdatedTime
                        })
                    }
                    console.log(response)
                }),
                takeUntil(action$.pipe(ofType(TripType.cancel))),
                catchError(error =>  {
                    console.log(error)
                    return   of(actions.tripError(error.message))
                }
                ),
    
            )
        })
    )

export default combineEpics(
    getTripInfoEpic,
);
