import * as React from 'react';
import { NavigationContainerRef, ParamListBase } from '@react-navigation/native';
import { RootStackParamList } from 'screens';
export const navigationRef = React.createRef<NavigationContainerRef<RootStackParamList>>();
  /**
     * Navigate to a route in current navigation tree.
     *
     * @param routeName Name of the route to navigate to.
     * @param [params] Params object for the route.
     */

const  navigate = <T extends keyof RootStackParamList, P extends RootStackParamList[T]>(
    routeName: T,
    params?: P | undefined,
    callback?:() => void )  => {
    if(callback) callback()
    navigationRef.current?.navigate(routeName as keyof RootStackParamList, params)
};


export default {
    navigate
}
