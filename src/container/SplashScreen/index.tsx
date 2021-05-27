
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SplashScreenParam } from 'screens';
import { IRootState } from '../../stores';
import instance from '../../network'
import {  Text } from '../../components'
import { color } from '../../theme';
type Props = SplashScreenParam & {

}
const SplashScreen : React.FC<Props> = (props) => {
    const { auth } = useSelector((state: IRootState) => state)

    useEffect(() => {
        if(auth.token) {
            instance.defaults.headers.common['X-Auth'] = 'Bearer' + auth.token;
            props.navigation.navigate("HomeScreen", { id: "10"})
        }else {
            props.navigation.navigate("LoginScreen");
        }
    },[auth])
    return(
        <SafeAreaView style={{ flex: 1}}>
            <View  style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <TouchableOpacity>
                    < Text
                        tx="welcomeScreen.helloWorld"
                        style={{ color: color.primary }}
                    />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default SplashScreen;
