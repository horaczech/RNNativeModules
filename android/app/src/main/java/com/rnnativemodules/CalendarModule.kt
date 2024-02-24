package com.rnnativemodules

import android.provider.CalendarContract
import android.content.Intent
import android.app.Activity
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ActivityEventListener
import com.facebook.react.bridge.BaseActivityEventListener

class CalendarModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    private val ADD_EVENT_REQUEST_CODE = 1

    private var addEventPromise: Promise? = null

    private val eventListener: ActivityEventListener = object : BaseActivityEventListener() {
        override fun onActivityResult(activity: Activity, requestCode: Int, resultCode: Int, data: Intent?) {
            if (requestCode == ADD_EVENT_REQUEST_CODE) {
                if (resultCode == Activity.RESULT_OK) {
                    addEventPromise?.resolve(true)
                } else if (resultCode == Activity.RESULT_CANCELED) {
                    addEventPromise?.resolve(false)
                }
                addEventPromise = null
            }
        }
    }

    init {
        reactContext.addActivityEventListener(eventListener)
    }

    override fun getName(): String {
        return "Calendar"
    }

    @ReactMethod
    fun addEvent(title: String, location: String, promise: Promise) {
        val intent = Intent(Intent.ACTION_INSERT)
            .setData(CalendarContract.Events.CONTENT_URI)
            .putExtra(CalendarContract.Events.TITLE, title)
            .putExtra(CalendarContract.Events.EVENT_LOCATION, location)

            addEventPromise = promise

        currentActivity?.startActivityForResult(intent, ADD_EVENT_REQUEST_CODE)
    }
}
