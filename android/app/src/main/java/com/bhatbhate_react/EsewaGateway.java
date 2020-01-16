package com.bhatbhate_react;


import android.app.Activity;
import android.content.Intent;
import android.util.Log;

import com.esewa.android.sdk.payment.ESewaConfiguration;
import com.esewa.android.sdk.payment.ESewaPayment;
import com.esewa.android.sdk.payment.ESewaPaymentActivity;
import com.facebook.react.bridge.ActivityEventListener;
import com.facebook.react.bridge.BaseActivityEventListener;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Callback;



public class EsewaGateway extends ReactContextBaseJavaModule {

    private  static   final int REQUEST_CODE_PAYMENT = 302;
    private static final String E_PAYMENT_CANCLED = "E_PAYMENT_CANCLED";


    ESewaConfiguration eSewaConfiguration = new ESewaConfiguration()
            .clientId("JB0BBQ4aD0UqIThFJwAKBgAXEUkEGQUBBAwdOgABHD4DChwUAB0R")
            .secretKey("BhwIWQQADhIYSxILExMcAgFXFhcOBwAKBgAXEQ==")
            .environment(ESewaConfiguration.ENVIRONMENT_TEST);

    private Promise mPickerPromise;

    private final ActivityEventListener mActivityEventListener = new BaseActivityEventListener() {

        @Override
        public void onActivityResult(Activity activity, int requestCode, int resultCode, Intent intent) {
        if (requestCode == REQUEST_CODE_PAYMENT) {
            if (resultCode == Activity.RESULT_OK) {
                if (intent == null) return;
                String message = intent.getStringExtra(ESewaPayment.EXTRA_RESULT_MESSAGE);
                Log.d("test", "Proof of Payment " + message);
//                Toast.makeText(activity, "SUCCESSFUL PAYMENT", Toast.LENGTH_SHORT).show();
                mPickerPromise.resolve("success");

            } else if (resultCode == Activity.RESULT_CANCELED) {
                Log.d("test", "Cancelled by user" );
//                Toast.makeText(activity, "Canceled By User", Toast.LENGTH_SHORT).show();
                mPickerPromise.reject( E_PAYMENT_CANCLED,"E-payment was cancelled");

            } else if (resultCode == ESewaPayment.RESULT_EXTRAS_INVALID) {
                if (intent == null) return;
                String message = intent.getStringExtra(ESewaPayment.EXTRA_RESULT_MESSAGE);
                Log.d("rantest", "Proof of Payment " + message);
            }
        }
    }
    };

    EsewaGateway(ReactApplicationContext reactContext) {
        super(reactContext);

        // Add the listener for `onActivityResult`
        reactContext.addActivityEventListener(mActivityEventListener);
    }

    @Override
    public String getName() {
        return "EsewaGateway";
    }

    @ReactMethod
    public void turnOn(String amount, String productId, final Promise promise) {
        Activity currentActivity = getCurrentActivity();

        // Store the promise to resolve/reject when picker returns data
        mPickerPromise = promise;
//
        ESewaPayment eSewaPayment = new ESewaPayment("10","Purchase from Android App" ,productId,"http://uat.bhatbhate.net/api/v1/esewa/redirect");
        Intent intent   =    new Intent(currentActivity, ESewaPaymentActivity.class );
        intent.putExtra(ESewaConfiguration.ESEWA_CONFIGURATION, eSewaConfiguration);
        intent.putExtra(ESewaPayment.ESEWA_PAYMENT, eSewaPayment);
        currentActivity.startActivityForResult(intent, REQUEST_CODE_PAYMENT);
//
//            final Intent galleryIntent = new Intent(Intent.ACTION_PICK);
//
//            galleryIntent.setType("image/*");
//
//            final Intent chooserIntent = Intent.createChooser(galleryIntent, "Pick an image");
//
//            currentActivity.startActivityForResult(chooserIntent, REQUEST_CODE_PAYMENT);

    }
}


//package com.bhatbhate_react;
//
//import android.app.Activity;
//import android.content.Intent;
//import android.net.Uri;
//import android.util.Log;
//import android.util.SparseArray;
//import android.widget.Toast;
//
//import com.esewa.android.sdk.payment.ESewaConfiguration;
//import com.esewa.android.sdk.payment.ESewaPayment;
//import com.esewa.android.sdk.payment.ESewaPaymentActivity;
//import com.facebook.react.bridge.ActivityEventListener;
//import com.facebook.react.bridge.BaseActivityEventListener;
//import com.facebook.react.bridge.Promise;
//import com.facebook.react.bridge.ReactApplicationContext;
//import com.facebook.react.bridge.ReactContextBaseJavaModule;
//import com.facebook.react.bridge.ReactMethod;
//
//import static androidx.core.app.ActivityCompat.startActivityForResult;
//
//public class EsewaGateway extends ReactContextBaseJavaModule {
//
//    public SparseArray<Promise> epromise;
//
//    private  static   final int REQUEST_CODE_PAYMENT = 302;
//
//    private static final String E_ACTIVITY_DOES_NOT_EXIST = "E_ACTIVITY_DOES_NOT_EXIST";
//    private static final String E_PICKER_CANCELLED = "E_PICKER_CANCELLED";
//    private static final String E_FAILED_TO_SHOW_PICKER = "E_FAILED_TO_SHOW_PICKER";
//    private static final String E_NO_IMAGE_DATA_FOUND = "E_NO_IMAGE_DATA_FOUND";
//    ESewaConfiguration eSewaConfiguration = new ESewaConfiguration()
//            .clientId("JB0BBQ4aD0UqIThFJwAKBgAXEUkEGQUBBAwdOgABHD4DChwUAB0R")
//            .secretKey("BhwIWQQADhIYSxILExMcAgFXFhcOBwAKBgAXEQ==")
//            .environment(ESewaConfiguration.ENVIRONMENT_TEST);
//    private Promise mPickerPromise;
//
//    private final ActivityEventListener mActivityEventListener = new BaseActivityEventListener() {
//
//
//        @Override
//        public void onActivityResult(Activity activity, int requestCode, int resultCode, Intent intent) {
//
//
//                //        super.onActivityResult(requestCode, resultCode, data);
//        if (requestCode == REQUEST_CODE_PAYMENT) {
//            if (resultCode == Activity.RESULT_OK) {
//                if (intent == null) return;
//                String message = intent.getStringExtra(ESewaPayment.EXTRA_RESULT_MESSAGE);
//                Log.d("rantest", "Proof of Payment " + message);
////                Toast.makeText(activity, "SUCCESSFUL PAYMENT", Toast.LENGTH_SHORT).show();
//            } else if (resultCode == Activity.RESULT_CANCELED) {
//                Log.d("rantest", "Cancelled by user" );
//
////                Toast.makeText(activity, "Canceled By User", Toast.LENGTH_SHORT).show();
//            } else if (resultCode == ESewaPayment.RESULT_EXTRAS_INVALID) {
//                if (intent == null) return;
//                String message = intent.getStringExtra(ESewaPayment.EXTRA_RESULT_MESSAGE);
//                Log.d("rantest", "Proof of Payment " + message);
//
//            }
//
//
//                }
//
//
//    }};
//
//    EsewaGateway(ReactApplicationContext reactContext) {
//        super(reactContext);
//
//        // Add the listener for `onActivityResult`
//        reactContext.addActivityEventListener(mActivityEventListener);
//    }
//
//    @Override
//    public String getName() {
//        return "EsewaGateway";
//    }
//
//    @ReactMethod
//    public void turnOn(String amount, String productId, Promise promise) {
////        Activity activity = getCurrentActivity();
////        ESewaPayment eSewaPayment = new ESewaPayment("10","Purchase from Android App" ,productId,"http://uat.bhatbhate.net/api/v1/esewa/redirect");
////    Intent intent   =    new Intent(activity, ESewaPaymentActivity.class );
////   intent.putExtra(ESewaConfiguration.ESEWA_CONFIGURATION, eSewaConfiguration);
////   intent.putExtra(ESewaPayment.ESEWA_PAYMENT, eSewaPayment);
////        activity.startActivityForResult(intent, REQUEST_CODE_PAYMENT);
////
//////
//////        if (currentActivity == null) {
//////            promise.reject(E_ACTIVITY_DOES_NOT_EXIST, "Activity doesn't exist");
//////            return;
//////        }
//////
//////        // Store the promise to resolve/reject when picker returns data
//////        mPickerPromise = promise;
//////
//////        try {
//////            final Intent galleryIntent = new Intent(Intent.ACTION_PICK);
//////
//////            galleryIntent.setType("image/*");
//////
//////            final Intent chooserIntent = Intent.createChooser(galleryIntent, "Pick an image");
//////
//////            currentActivity.startActivityForResult(chooserIntent, IMAGE_PICKER_REQUEST);
//////        } catch (Exception e) {
//////            mPickerPromise.reject(E_FAILED_TO_SHOW_PICKER, e);
//////            mPickerPromise = null;
//////        }
//
//
////
//        Activity activity = getReactApplicationContext().getCurrentActivity();
////        Intent intent = new Intent(action);
////        intent.putExtras(Arguments.toBundle(data));
////        activity.startActivityForResult(intent, requestCode);
//        //                final Intent galleryIntent = new Intent(Intent.ACTION_PICK);
//        final Intent galleryIntent = new Intent(Intent.ACTION_PICK);
//        galleryIntent.setType("image/*");
//        final Intent chooserIntent = Intent.createChooser(galleryIntent, "Pick an image");
//
//        activity.startActivityForResult(chooserIntent, REQUEST_CODE_PAYMENT);
//
//
//        epromise.put(REQUEST_CODE_PAYMENT, promise);
////        intent.putExtras(Arguments.toBundle(data));
////        activity.startActivityForResult(intent, requestCode);
////        mPromises.put(requestCode, promise);
////
////            Activity currentActivity = getReactApplicationContext().getCurrentActivity();
////
////            if (currentActivity == null) {
////                return;
////            }
////
////            // Store the promise to resolve/reject when picker returns data
////
////            try {
////                final Intent galleryIntent = new Intent(Intent.ACTION_PICK);
////
////
////
////            } catch (Exception e) {
////
////            }
////
////    }
//    }
//}

//
//    @Override
//    public void onActivityResult(int requestCode, int resultCode, Intent data) {

//
////         super.getMainComponentName();
//
//        }
//    }



//
//
//
//
//import android.app.Activity;
//import android.content.Intent;
//
//import com.esewa.android.sdk.payment.ESewaConfiguration;
//import com.esewa.android.sdk.payment.ESewaPayment;
//import com.esewa.android.sdk.payment.ESewaPaymentActivity;
//import com.facebook.react.bridge.ActivityEventListener;
//import com.facebook.react.bridge.ReactApplicationContext;
//import com.facebook.react.bridge.ReactContextBaseJavaModule;
//import com.facebook.react.bridge.ReactMethod;
//import com.facebook.react.bridge.Callback;
//
//public class EsewaGateway extends ReactContextBaseJavaModule implements ActivityEventListener {
//
//    public  static ActivityCallback activityCallback;
//
//
//
//
//    private static Boolean isOn = false;
////    private static final int REQUEST_CODE_PAYMENT = 9;
//
//
//
//
//    public EsewaGateway(ReactApplicationContext reactContext) {
//
//        super(reactContext);
//    }
//
//    public static   void setActivityCallback(ActivityCallback activityCallbacks ){
//
//        activityCallback = activityCallbacks;
//
//    }
//
//
//    @ReactMethod
//    public void turnOn(String amount, String productId) {
//      activityCallback.startEsewaActivity(amount,productId);
//
//    }
//
//
//    @Override
//    public String getName() {
//        return "EsewaGateway";
//    }
//
//    @Override
//    public void onActivityResult(Activity activity, int requestCode, int resultCode, Intent data) {
//
//
//
//    }
//
//    @Override
//    public void onNewIntent(Intent intent) {
//        ESewaPayment eSewaPayment = new ESewaPayment("10","Purchase from Android App" ,productId,"http://uat.bhatbhate.net/api/v1/esewa/redirect");
//        Intent intent   =    new Intent(MainActivity.this , ESewaPaymentActivity.class );
//        intent.putExtra(ESewaConfiguration.ESEWA_CONFIGURATION, eSewaConfiguration);
//        intent.putExtra(ESewaPayment.ESEWA_PAYMENT, eSewaPayment);
//        startActivityForResult(intent, REQUEST_CODE_PAYMENT);
//
//
//    }
//
//    public interface  ActivityCallback{
//        void startEsewaActivity(String amount, String productid);
//    }
//
//}

