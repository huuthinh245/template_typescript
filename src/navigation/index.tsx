import * as React from 'react';
import { View, Text } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer, NavigationState } from '@react-navigation/native';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { navigationRef } from './RootNavigation'
import HomeScreen from '../container/HomeScreen';
import LoginScreen from '../container/LoginScreen';
import SplashScreen from '../container/SplashScreen'
import ProfileScreen from '../container/ProfileScreen'
import  stores from '../stores'
import { Provider } from 'react-redux';
import { BottomTabParamList, RootStackParamList } from 'screens';

// // @ts-ignore
// global.XMLHttpRequest = global.originalXMLHttpRequest ? global.originalXMLHttpRequest: global.XMLHttpRequest
// // @ts-ignore
// global.FormData = global.originalFormData ? global.originalFormData : global.FormData
// fetch
// // @ts-ignore
// if (window.__FETCH_SUPPORT__) {
// // @ts-ignore
//   window.__FETCH_SUPPORT__.blob = false
// } else {
//   // @ts-ignore
//   global.Blob = global.originalBlob ? global.originalBlob : global.Blob
//   // @ts-ignore
//   global.FileReader = global.originalFileReader ? global.originalFileReader: global.FileReader
// }


const Tab = createBottomTabNavigator<BottomTabParamList>();
const Stack = createStackNavigator<RootStackParamList>();



const Tabs = () => {
  return(
      <Tab.Navigator
        screenOptions={{
          headerShown: false
        }}
      >
        <Tab.Screen name="HomeScreen" component={HomeScreen} />
        <Tab.Screen name="ProfileScreen" component={ProfileScreen} />
      </Tab.Navigator>
  )
}

const SCREENS = {
    SplashScreen: {
      title: 'SplashScreen',
      component: SplashScreen,
    },
    LoginScreen: {
      title: 'LoginScreen',
      component: LoginScreen
    },
    BottomTab: {
      title: 'BottomTab',
      component: Tabs
    }
}

function MyStack() {
    return (
      <Stack.Navigator 
        initialRouteName="BottomTab"
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
            <>
            <MyStack/>
              </>
          </SafeAreaProvider>
      </NavigationContainer>
    </Provider>
  );
}