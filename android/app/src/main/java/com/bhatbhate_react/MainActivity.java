package com.bhatbhate_react;

import android.app.Activity;
import android.content.Intent;
import android.os.AsyncTask;
import android.util.Log;
import android.widget.Toast;

import com.esewa.android.sdk.payment.ESewaConfiguration;
import com.esewa.android.sdk.payment.ESewaPayment;
import com.esewa.android.sdk.payment.ESewaPaymentActivity;
import com.facebook.react.ReactActivity;
import com.facebook.react.modules.core.DefaultHardwareBackBtnHandler;

import javax.annotation.Nullable;

public class MainActivity extends ReactActivity  implements DefaultHardwareBackBtnHandler {
    public static String amount;
    public static String productId;
    public static  final int REQUEST_CODE_PAYMENT = 360;


    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    public String getMainComponentName() {
        return "Bhatbhate_react";

    }



}






