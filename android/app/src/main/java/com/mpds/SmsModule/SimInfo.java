package com.mpds.SmsModule;

public class SimInfo {
    String displayName;
    String carrierName;
    int simSlotIndex;

    public SimInfo(String displayName, String carrierName, int simSlotIndex) {
        this.displayName = displayName;
        this.carrierName = carrierName;
        this.simSlotIndex = simSlotIndex;
    }

    public String getDisplayName() {
        return displayName;
    }

    public void setDisplayName(String displayName) {
        this.displayName = displayName;
    }

    public String getCarrierName() {
        return carrierName;
    }

    public void setCarrierName(String carrierName) {
        this.carrierName = carrierName;
    }

    public int getSimSlotIndex() {
        return simSlotIndex;
    }

    public void setSimSlotIndex(int simSlotIndex) {
        this.simSlotIndex = simSlotIndex;
    }

}

