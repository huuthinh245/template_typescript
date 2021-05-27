// import { NativeModules, PermissionsAndroid, NativeEventEmitter } from 'react-native';
// import { infoSim, EventKey, data } from './type';


// const Sms = NativeModules.SmsModule;

// const SmsEmitter  = new NativeEventEmitter(Sms);

// const isDualSim = async ():Promise<boolean> => {
//     await PermissionsAndroid.request("android.permission.READ_PHONE_STATE")
//     const  isDual = await Sms.isDualSIM()
//     return isDual;
// }

// const getSimInfo = async ():Promise<Array<infoSim>> => {
//     try {
//         await PermissionsAndroid.request("android.permission.READ_PHONE_STATE")
//         const  info = await Sms.getInfo()
//         return info;
//     } catch (error) {
//             return []
//     }
// }

// const sendMessage =  () => {
//     Sms.sendSms(1)
// }


// export const addListener = (
//     eventName: keyof typeof EventKey,
//     listener: (sms: data) => void
//   ) => {
//       return SmsEmitter.addListener(eventName, listener)
// };


// export default {
//     addListener,
//     sendMessage,
//     getSimInfo,
//     isDualSim
// };
