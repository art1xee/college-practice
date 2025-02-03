package com.example.phoneshopcollegepractice.utils

import android.content.Context
import android.content.SharedPreferences

class TokenManager(private val context: Context) {

    private val prefs: SharedPreferences by lazy {
        context.getSharedPreferences(PREF_NAME, Context.MODE_PRIVATE)
    }

    fun saveToken(token: String) {
        prefs.edit().putString(KEY_TOKEN, token).apply()
    }

    fun getToken(): String? {
        return prefs.getString(KEY_TOKEN, null)
    }

    fun clearToken() {
        prefs.edit().remove(KEY_TOKEN).apply()
    }

    fun isLoggedIn(): Boolean {
        return getToken() != null
    }

    companion object{
        private const val PREF_NAME = "AuthPrefs"
        private const val KEY_TOKEN = "auth_token"
    }
}