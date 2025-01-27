package com.example.phoneshopcollegepractice.viewModels

import android.app.Application
import androidx.lifecycle.AndroidViewModel
import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import com.example.phoneshopcollegepractice.utils.TokenManager
import com.example.phoneshopcollegepractice.utils.UserInfoProvider


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
    private val tokenManager = TokenManager(application)
    private val userInfoProvider = UserInfoProvider(tokenManager)

    private val _currentScreen = MutableLiveData<AppScreen>()
    val currentScreen: LiveData<AppScreen> = _currentScreen

    private val _toolbarTitle = MutableLiveData<String>()
    val toolbarTitle: LiveData<String> = _toolbarTitle

    private val _toastMessage = MutableLiveData<String>()
    val toastMessage: LiveData<String> = _toastMessage

    init {
        if (!tokenManager.isLoggedIn()) {
            navigateToLogin()
        } else {
            navigateToHome()
        }
    }

    private fun requireAuth(action: () -> Unit) {
        if (tokenManager.isLoggedIn()) {
            action()
        } else {
            _toastMessage.value = "Login Required"
            _currentScreen.value = AppScreen.Login
        }
    }

    fun onHomeClick() = navigateToHome()
    fun onChatsClick() = requireAuth {
        _currentScreen.value = AppScreen.Chats
        _toolbarTitle.value = "Chats"
    }
    fun onMyAdsClick() = requireAuth {
        _currentScreen.value = AppScreen.MyAds
        _toolbarTitle.value = "My Ads"
    }
    fun onAccountClick() = requireAuth {
        _currentScreen.value = AppScreen.Account
        _toolbarTitle.value = "Account"
    }

    fun login(email: String, password: String) {
        userInfoProvider.login(
            email,
            password,
            onSuccess = { navigateToHome() },
            onError = { errorMessage ->
                _toastMessage.value = errorMessage
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

    fun onNavigationEvent(event: NavigationEvent) {
        when (event) {
            NavigationEvent.Home -> navigateToHome()
            NavigationEvent.Chats -> onChatsClick()
            NavigationEvent.MyAds -> onMyAdsClick()
            NavigationEvent.Account -> onAccountClick()
            NavigationEvent.Login -> navigateToLogin()
        }
    }
}