package com.example.phoneshopcollegepractice.Utils

import android.app.Application

class MyApp : Application() {
    override fun onCreate() {
        super.onCreate()
        UserInfoProvider.initialize(RetrofitClient.authApi)
    }
}