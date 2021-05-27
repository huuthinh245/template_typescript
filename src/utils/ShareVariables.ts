export class ShareVariables{
    
    private static _instance:ShareVariables = new ShareVariables();
    private driverId: string = '';
    constructor() {
        if(ShareVariables._instance){
            throw new Error("Error");
        }
        ShareVariables._instance = this;
    }

    public static getInstance():ShareVariables{
        return ShareVariables._instance;
    }
    setDriverId(driverId:string) {
        return this.driverId = driverId;
    }

    getDriverId() {
        return this.driverId;
    }
}

export default ShareVariables;
