import React, { useEffect, useRef, useState } from 'react'
import { Text, TouchableOpacity, View, NativeModules } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import { WebView, WebViewNavigation } from 'react-native-webview';
import { useDispatch, useSelector } from 'react-redux';
import { LoginScreenParam } from 'screens';
import { actions } from '../../stores/Authentication';
import instance from '../../network';
import { GHNAPI } from '../../constants';
import { IRootState } from '../../stores';
import ShareVariables from '../../utils/ShareVariables';
import { SafeAreaView } from 'react-native-safe-area-context';
import Config from 'react-native-config';
import ActionSheet from '../../components/actionsheet'
const deviceId = DeviceInfo ? DeviceInfo.getUniqueId() : '1E7BDB3E-02BF-44EA-AADA-00A3A6A1B69A' 

const evn = Config.EVN;
type Props = LoginScreenParam & {

}
const LoginScreen : React.FC<Props> = (props) => {
    const dispatch = useDispatch()
    const isLogined = useRef(false);
    const actionSheet = useRef<ActionSheet>(null);
    const { auth } = useSelector((state: IRootState) => state)


    useEffect(() => {
        if(auth.token) {
            instance.defaults.headers.common['X-Auth'] = 'Bearer ' + auth.token;
            instance.defaults.headers.common['X-WarehouseId'] = auth.hubId
            ShareVariables.getInstance().setDriverId(auth.ssoId);
            props.navigation.navigate("HomeScreen", { id: "10"})
        }
    },[auth])

    const check = async () => {
        try {
           NativeModules.Test.addEvent("dwqwq", "212", 1);
           const data  = await NativeModules.Test.multiply(1,2);
           console.log(data)
        } catch (error) {
            console.log(error)
        }
    }
    const onNavigationStateChange = (webViewState: WebViewNavigation) => {
        if(!isLogined.current) {
            const { url } = webViewState;
            if(url.includes('http')) {
                _checkNeededCookies(url)
            }
        }
    }

    const  _onMessage = () => {

    }

    const _checkNeededCookies = (webViewUrl: String) => {
        if (webViewUrl.includes('authorcode=')) {
                const pos = webViewUrl.split("authorcode=");
                if (pos?.[1]) {
                const authorcode = pos?.[1]
                dispatch(actions.login({ authorcode: authorcode}))
                isLogined.current = true;
            }
        }
    }

    const showActionSheet = () => {
        actionSheet.current?.show()
    }
    return(
        <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff"}}>
            <View style={{ flex: 1, height: 300, flexDirection: 'row', flexWrap: 'wrap'}}>

                {/* <TouchableOpacity onPress={showActionSheet}>
                    <Text>check</Text>
                    <Text>{evn}</Text>
                </TouchableOpacity> */}
                <ActionSheet
                    ref={actionSheet}
                    title={'Which one do you like ?'}
                    options={['Apple', 'Banana', 'cancel']}
                    cancelButtonIndex={2}
                    destructiveButtonIndex={1}
                    onPress= {(index: number) => {}}
                  
                />
                    {/* <WebView
                        source={{ uri: logoutUrl, 
                        headers: {
                            "User-Agent": getUserAgent()
                        }
                        }}
                        onNavigationStateChange={onNavigationStateChange}
                        onMessage={_onMessage.bind(this)}
                        scrollEnabled = {true}
                    /> */}
            </View>
        </SafeAreaView>
    )
}

export default LoginScreen;