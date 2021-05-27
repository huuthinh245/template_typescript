import instance from '../../network';
import { GHNAPI } from '../../constants'
import { from } from 'rxjs';
import ShareVariables from '../../utils/ShareVariables';

const getTripInfoApi = (cancel: any) => {
    const URL = `${GHNAPI.PDS_URL}/trip/v2/mpds/trip-of-me-v2`;
    const driverId  = ShareVariables.getInstance().getDriverId()
    const config = {
        params: { q: { driverId: driverId, status: 'ON_TRIP' }, containStopPoint: true },
    };
    console.log(cancel)
    return from(instance.get(URL, {
            cancelToken: cancel?.token,
            ...config
    }))
};


export default {
    getTripInfoApi
}

