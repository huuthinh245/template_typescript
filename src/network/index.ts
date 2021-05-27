import axios from 'axios';
import DeviceInfo from 'react-native-device-info';
const appVersionID = 20210319; 
const timeout = 15000;
const instance = axios.create();
const defaultUserAgent = 'Mozilla/5.0 (Linux; Android 11; sdk_gphone_x86_arm Build/RSR1.201013.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/83.0.4103.106 Mobile Safari/537.36 ID(ec2ffceffb5bc228) Version(20210319)'
export const getUserAgent=  ()=>{
    try{
        let user_agent =  DeviceInfo.getUserAgentSync()
        let userAgent =  user_agent +" ID("+DeviceInfo.getUniqueId()+") Version("+appVersionID+")"
        return userAgent;
    }catch(ex){
        return  "Error() Version("+appVersionID+")";
    }
}
instance.defaults.timeout = timeout;
instance.defaults.headers.common["User-Agent"] = getUserAgent();
if(__DEV__) {
  instance.defaults.headers.common["User-Agent"] = defaultUserAgent
}
instance.interceptors.request.use(function (config) {
    return config;
  }, function (error) {

    return Promise.reject(error);
  });
 let axiosCancelSource = axios.CancelToken.source()
export {
  axiosCancelSource
}
export default instance;