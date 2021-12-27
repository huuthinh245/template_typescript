import instance from '../../../network';
import { GHNAPI } from '../../../constants'
import { from } from 'rxjs';
const loginApi = (authorcode: string) => {
    const url = `${GHNAPI.URL}/v1/session/sso-login-v2`
    const param={
        "authorCode": authorcode
      }
    const config = {
        headers: {
          "X-Auth": "ggg",
          "Authorization": "ggg"
        },
        
    }
    return from(instance.post(url,param, config))
}

const loginOut = () => {
    const url = GHNAPI.URL
    return from(instance.get(url))
}

export default {
    loginApi,
    loginOut
}

