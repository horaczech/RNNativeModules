package com.rnnativemodules

import android.content.res.Configuration
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise

class DarkModeModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String {
        return "DarkMode"
    }

    @ReactMethod
    fun isDarkMode(promise: Promise) {
        val currentNightMode = reactApplicationContext.resources.configuration.uiMode and Configuration.UI_MODE_NIGHT_MASK
        when (currentNightMode) {
            Configuration.UI_MODE_NIGHT_NO -> promise.resolve(false) // Night mode is not active, we're in day time
            Configuration.UI_MODE_NIGHT_YES -> promise.resolve(true) // Night mode is active, we're at night!
            else -> promise.resolve(false) // default to false
        }
    }
}
