import * as React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer, NavigationState } from '@react-navigation/native';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import { navigationRef } from './RootNavigation'
import HomeScreen from '../container/HomeScreen';
import LoginScreen from '../container/LoginScreen';
import SplashScreen from '../container/SplashScreen'
import  stores from '../stores'
import { Provider } from 'react-redux';
import { RootStackParamList } from 'screens';

// @ts-ignore
global.XMLHttpRequest = global.originalXMLHttpRequest ? global.originalXMLHttpRequest: global.XMLHttpRequest
// @ts-ignore
global.FormData = global.originalFormData ? global.originalFormData : global.FormData
fetch
// @ts-ignore
if (window.__FETCH_SUPPORT__) {
// @ts-ignore
  window.__FETCH_SUPPORT__.blob = false
} else {
  // @ts-ignore
  global.Blob = global.originalBlob ? global.originalBlob : global.Blob
  // @ts-ignore
  global.FileReader = global.originalFileReader ? global.originalFileReader: global.FileReader
}

const SCREENS = {
    SplashScreen: {
      title: 'SplashScreen',
      component: SplashScreen,
    },
    HomeScreen: {
      title: 'HomeScreen',
      component: HomeScreen
    },
    LoginScreen: {
      title: 'LoginScreen',
      component: LoginScreen
    }
}




const Stack = createStackNavigator<RootStackParamList>();
function MyStack() {
    return (
      <Stack.Navigator 
        initialRouteName="LoginScreen"
        screenOptions={{
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          gestureEnabled: true
        }}
      >
        {(Object.keys(SCREENS) as (keyof typeof SCREENS)[]).map((name) => (
            <Stack.Screen
              key={name}
              name={name}
              getComponent={() => SCREENS[name].component}
              options={{ title: SCREENS[name].title }}
            />
          ))}
      </Stack.Navigator>
    );
  }
export default function Router() {

  const onStateChange = (state: NavigationState| undefined) => {
    //tracking screen
  }
  return (
    <Provider store={stores}>
      <NavigationContainer
        ref={navigationRef}
        onStateChange={onStateChange}
      >
          <SafeAreaProvider>
              <MyStack/>
          </SafeAreaProvider>
      </NavigationContainer>
    </Provider>
  );
}