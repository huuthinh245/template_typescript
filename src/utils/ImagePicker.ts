import { launchImageLibrary, MediaType, ImagePickerResponse } from 'react-native-image-picker';


const options = {
    mediaType: 'photo' as MediaType,
    includeBase64: true,
    maxHeight: 200,
    maxWidth: 200,
} 
const pickImage  = (): Promise<ImagePickerResponse> => {
    return new Promise((resolve, reject) => {
        launchImageLibrary(options,(response) => {   
            if(response?.base64) {
                let obj = {
                    base64: response.base64,
                    width: response.width,
                    height: response.height,
                    fileSize: response.fileSize,

                }
                resolve(obj as ImagePickerResponse)
            }else {
                reject({
                    message: response.errorMessage
                })
            }
        })
    })
}

pickImage().then(res => {
    console.log(res.base64)
})
export default {
    pickImage
}