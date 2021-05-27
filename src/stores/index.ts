import { createStore, applyMiddleware, compose, Store, AnyAction } from 'redux';
import { combineEpics, createEpicMiddleware } from 'redux-observable';
import {combineReducers} from 'redux'
import  { auth, authEpic,  } from './Authentication'
import  { trip, tripInfoEpic  } from './Trip'
import { AuthState } from './Authentication/types';
import { TripState } from './Trip/types';

const epicMiddleware = createEpicMiddleware();
declare global {
    interface Window {
      __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

export interface IRootState {
  auth: AuthState
  trip: TripState
}



const rootReducer = combineReducers({
    auth,
    trip
})

const rootEpic = combineEpics(
  authEpic,
  tripInfoEpic
)


    // let middlewares = []
    // if (__DEV__) {
    //   const createDebugger = require('redux-flipper').default;
    //   middlewares.push(createDebugger());
    // }
    //const finalReducer = persistReducer(config, {reducers})

    const composeEnhancers =  window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] as typeof compose || compose;
    const enhancer = composeEnhancers(
        applyMiddleware(
          epicMiddleware,
          // ...middlewares
        )
    )
    const store: Store<IRootState, any> = createStore(
      rootReducer,
      enhancer);
      epicMiddleware.run(rootEpic)
export default store;
    // epicMiddleware.run(rootEpic)