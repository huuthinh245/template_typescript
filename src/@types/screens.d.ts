

declare module "screens" {
    import { StackScreenProps } from "@react-navigation/stack";
    import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
    type RootStackParamList = {
        SplashScreen: undefined;
        LoginScreen: undefined;
        BottomTab: undefined
    };
    type BottomTabParamList = {
        HomeScreen: undefined;
        ProfileScreen: undefined;
    }
    type LoginScreenParam = StackScreenProps<RootStackParamList, 'LoginScreen'>;
    type SplashScreenParam = StackScreenProps<RootStackParamList, 'SplashScreen'>;
    type HomeScreenParam = BottomTabScreenProps<BottomTabParamList, 'HomeScreen'>;
    type ProfileScreenPram = BottomTabScreenProps<BottomTabParamList, 'ProfileScreen'>;
}