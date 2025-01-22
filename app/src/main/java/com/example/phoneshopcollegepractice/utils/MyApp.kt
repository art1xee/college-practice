package com.example.phoneshopcollegepractice.utils

import android.app.Application

class MyApp : Application() {
    override fun onCreate() {
        super.onCreate()
        UserInfoProvider.initialize(RetrofitClient.authApi)
    }
}