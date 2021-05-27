

declare module "screens" {
    import { StackScreenProps } from "@react-navigation/stack";
    type RootStackParamList = {
        SplashScreen: undefined;
        LoginScreen: undefined;
        HomeScreen: { id: string };
    };
    type HomeScreenParam = StackScreenProps<RootStackParamList, 'HomeScreen'>;
    type LoginScreenParam = StackScreenProps<RootStackParamList, 'LoginScreen'>;
    type SplashScreenParam = StackScreenProps<RootStackParamList, 'SplashScreen'>;
}