package com.example.phoneshopcollegepractice.ViewModels

import android.app.Application
import androidx.lifecycle.AndroidViewModel
import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import com.example.phoneshopcollegepractice.Utils.TokenManager
import com.example.phoneshopcollegepractice.Utils.UserInfoProvider


sealed class NavigationEvent {
    data object Home : NavigationEvent()
    data object Chats : NavigationEvent()
    data object MyAds : NavigationEvent()
    data object Account : NavigationEvent()
    data object Login : NavigationEvent()
}

sealed interface AppScreen {
    data object Home : AppScreen
    data object Chats : AppScreen
    data object MyAds : AppScreen
    data object Account : AppScreen
    data object Login : AppScreen
}

class MainViewModel(application: Application) : AndroidViewModel(application) {

    private val _currentScreen = MutableLiveData<AppScreen>()
    val currentScreen: LiveData<AppScreen> = _currentScreen

    private val _toolbarTitle = MutableLiveData<String>()
    val toolbarTitle: LiveData<String> = _toolbarTitle

    private val _toastMessage = MutableLiveData<String>()
    val toastMessage: LiveData<String> = _toastMessage


    init {
        // Установить начальный экран
        if (!TokenManager.isLoggedIn(application)) {
            onNavigationEvent(NavigationEvent.Login)
        } else {
            navigateToHome()
        }
    }

    fun onHomeClick() {
        navigateToHome()
    }

    fun login(email: String, password: String) {
        UserInfoProvider.getInstance().loginUser(
            email,
            password,
            onSuccess = {
                navigateToHome()
            },
            onFailure = { e ->
                _toastMessage.value = e
            }
        )
    }

    private fun navigateToHome() {
        _currentScreen.value = AppScreen.Home
        _toolbarTitle.value = "Home"
    }

    private fun navigateToLogin() {
        _currentScreen.value = AppScreen.Login
    }

    private fun onNavigationEvent(event: NavigationEvent) {
        when (event) {
            NavigationEvent.Home -> navigateToHome()
            NavigationEvent.Chats -> navigateToChats()
            NavigationEvent.MyAds -> navigateToMyAds()
            NavigationEvent.Account -> navigateToAccount()
            NavigationEvent.Login -> navigateToLogin()
        }
    }

    private fun navigateToChats() {
        _currentScreen.value = AppScreen.Chats
        _toolbarTitle.value = "Chats"
    }

    private fun navigateToMyAds() {
        _currentScreen.value = AppScreen.MyAds
        _toolbarTitle.value = "My Ads"
    }

    private fun navigateToAccount() {
        _currentScreen.value = AppScreen.Account
        _toolbarTitle.value = "Account"
    }

    fun onChatsClick() {
        if (UserInfoProvider.user == null) {
            _toastMessage.value = "Login Required"
            _currentScreen.value = AppScreen.Login
        } else {
            _currentScreen.value = AppScreen.Chats
        }
    }

}