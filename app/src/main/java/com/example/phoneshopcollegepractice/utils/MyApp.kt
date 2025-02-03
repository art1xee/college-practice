// MyApp.kt
package com.example.phoneshopcollegepractice.utils

import android.app.Application

class MyApp : Application() {
    lateinit var userInfoProvider: UserInfoProvider
        private set

    override fun onCreate() {
        super.onCreate()

        // Initialize TokenManager
        val tokenManager = TokenManager(this)

        // Initialize UserInfoProvider with TokenManager
        userInfoProvider = UserInfoProvider(tokenManager)
    }
}
