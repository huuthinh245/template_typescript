package com.mpds.SmsModule;

import android.Manifest;
import android.app.Activity;
import android.app.PendingIntent;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.content.pm.PackageManager;
import android.os.Build;
import android.telephony.SmsManager;
import android.telephony.SubscriptionInfo;
import android.telephony.SubscriptionManager;
import android.util.Log;
import android.widget.Button;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.annotation.RequiresApi;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;

import com.facebook.react.ReactRootView;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.facebook.react.modules.core.PermissionListener;

import org.json.JSONArray;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class SmsModule extends ReactContextBaseJavaModule implements PermissionListener {
    private static final int code = 1;
    Context context;
    TelephonyInfo telephonyInfo;
    String number = "";
    String message = "";
    String timestamp = "";
    private static String SENT = "SMS_SENT", DELIVERED = "SMS_DELIVERED";
    String SET_DATA_SMS = "com.mps.SET_DATA_SMS";

    @NonNull
    @Override
    public String getName() {
        return "SmsModule";
    }

    public SmsModule(ReactApplicationContext reactContext) {
        super(reactContext);
        context = reactContext;
//        SmsListener listener = new SmsListener(reactContext);
        telephonyInfo = TelephonyInfo.getInstance(context);
        IntentFilter intentFilter = new IntentFilter("android.provider.Telephony.SMS_RECEIVED");
//        context.registerReceiver(listener, intentFilter);
    }

    @ReactMethod
    public void isDualSIM(Promise promise) {
        boolean isDualSIM = telephonyInfo.isDualSIM();
        promise.resolve(isDualSIM);
    }
    public void resetData() {
        this.number  = "";
        this.message = "";
        this.timestamp = "";
    }

    @ReactMethod
    public void isSIM1Ready(Promise promise) {
        boolean isSIM1Ready = telephonyInfo.isSIM1Ready();
        promise.resolve(isSIM1Ready);
    }
    @ReactMethod
    public void testNavigate() {}
    ReactRootView mReactRootView = new ReactRootView(context);
    @ReactMethod
    public void isSIM2Ready(Promise promise) {
        boolean isSIM2Ready = telephonyInfo.isSIM2Ready();
        promise.resolve(isSIM2Ready);
    }

    @RequiresApi(api = Build.VERSION_CODES.LOLLIPOP_MR1)
    @ReactMethod
    public void sendSms(int i) {
        Log.e("slot_sim ", i+"");
//        TelephonyInfo telephonyInfo = TelephonyInfo.getInstance(context);
//        boolean isSIM1Ready = telephonyInfo.isSIM1Ready();
//        boolean isSIM2Ready = telephonyInfo.isSIM2Ready();
//        boolean test = telephonyInfo.isDualSIM();
        Intent intentPI = new Intent(SENT);
        IntentFilter intentFilter = new IntentFilter();
        intentPI.putExtra("message", "GHN");
        intentPI.putExtra("number", "0362462070");
        PendingIntent sentPI = PendingIntent.getBroadcast(context, 0, intentPI, 0);

        PendingIntent deliveredPI = PendingIntent.getBroadcast(context, 0,
                new Intent(DELIVERED), 0);
//        SmsManager.getDefault().sendMultipartTextMessage();

        if (ContextCompat.checkSelfPermission(context, Manifest.permission.READ_PHONE_STATE) == PackageManager.PERMISSION_GRANTED) {
            SubscriptionManager localSubscriptionManager = SubscriptionManager.from(context);
            List localList = localSubscriptionManager.getActiveSubscriptionInfoList();

            SubscriptionInfo simInfo1 = (SubscriptionInfo) localList.get(0);

            intentFilter.addAction(SENT);
            intentFilter.addAction(SET_DATA_SMS);
            context.registerReceiver(sendSMS, intentFilter);
            context.registerReceiver(deliverSMS, new IntentFilter(DELIVERED));
            intentPI.setAction(SET_DATA_SMS);
            context.sendBroadcast(intentPI);
           SmsManager.getSmsManagerForSubscriptionId(simInfo1.getSubscriptionId()).sendTextMessage("0362462070", null, "GHN", sentPI, deliveredPI);

            //SendSMS From SIM Two
            //SmsManager.getSmsMaptionId(simInfo2.getSubscriptionId()).sendTextMessage("0362462070", null, "GHN", sentPI, deliveredPI);
        }
    }

    @ReactMethod
    public void getInfo(Promise promise) {
        if(ContextCompat.checkSelfPermission(context, Manifest.permission.READ_PHONE_STATE) == PackageManager.PERMISSION_GRANTED) {
            SubscriptionManager localSubscriptionManager = null;
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP_MR1) {
                localSubscriptionManager = SubscriptionManager.from(context);
                List localList = localSubscriptionManager.getActiveSubscriptionInfoList();
                WritableArray result = Arguments.createArray();
                for (int i = 0; i < localList.size(); i++) {
                    WritableMap simInfo = Arguments.createMap();
                    SubscriptionInfo info = (SubscriptionInfo) localList.get(i);
                    simInfo.putString("displayName", String.valueOf(info.getDisplayName()));
                    simInfo.putString("carrierName", String.valueOf(info.getCarrierName()));
                    simInfo.putInt("simSlotIndex",info.getSimSlotIndex());
                    result.pushMap(simInfo);
                }

                promise.resolve(result);
            }
        }else {
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
                Activity activity = getCurrentActivity();
                if (activity != null) {
                    getCurrentActivity().requestPermissions(new String[] { Manifest.permission.READ_SMS }, code);
                }
            }
        }
    }

    private void sendEvent(ReactContext reactContext,
                           String eventName,
                           @Nullable WritableMap params) {
        reactContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(eventName, params);
    }


    @Override
    public boolean onRequestPermissionsResult(int requestCode, String[] permissions,
                                           int[] grantResults) {
        switch (requestCode) {
            case code:
                // If request is cancelled, the result arrays are empty.
                if (grantResults.length > 0 &&
                        grantResults[0] == PackageManager.PERMISSION_GRANTED) {
                    return true;
                    //start();
                    // Permission is granted. Continue the action or workflow
                    // in your app.
                }  else {
                    // Explain to the user that the feature is unavailable because
                    // the features requires a permission that the user has denied.
                    // At the same time, respect the user's decision. Don't link to
                    // system settings in an effort to convince the user to change
                    // their decision.
                }
                return false;
            default:
                return  false;
        }
        // Other 'case' lines to check for other
        // permissions this app might request.
    }

    // SEND BroadcastReceiver
    BroadcastReceiver sendSMS = new BroadcastReceiver() {

        @Override
        public void onReceive(Context arg0, Intent arg1) {
            if(SET_DATA_SMS == arg1.getAction()) {

                number = arg1.getStringExtra("number");
                message= arg1.getStringExtra("message");
                timestamp = String.valueOf(new Date().getTime());
                Toast.makeText(context, "send sms to number: " + number + "message: " + message,
                        Toast.LENGTH_SHORT).show();
            }else {
                switch (getResultCode()) {
                    case Activity.RESULT_OK:
                        WritableMap params = Arguments.createMap();
                        params.putString("numberPhone", number);
                        params.putString("message", message);
                        params.putString("timestamp",timestamp);
                        Log.d("Activity.RESULT_OK", message);
                        sendEvent(getReactApplicationContext(), "sms", params);
                        resetData();
                        break;
                    case SmsManager.RESULT_ERROR_GENERIC_FAILURE:

                        break;
                    case SmsManager.RESULT_ERROR_NO_SERVICE:

                        break;
                    case SmsManager.RESULT_ERROR_NULL_PDU:

                        break;
                    case SmsManager.RESULT_ERROR_RADIO_OFF:

                        break;
                }
            }
        }
    };

    BroadcastReceiver deliverSMS = new BroadcastReceiver() {
        @Override
        public void onReceive(Context arg0, Intent arg1) {
            switch (getResultCode()) {
                case Activity.RESULT_OK:
                    Toast.makeText(context, "sms_delivered",
                            Toast.LENGTH_SHORT).show();
                    break;
                case Activity.RESULT_CANCELED:
                    Toast.makeText(context, "sms_not_delivered",
                            Toast.LENGTH_SHORT).show();
                    break;
            }
        }
    };

}
