package com.example.phoneshopcollegepractice.ViewModels

import androidx.fragment.app.Fragment
import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import com.example.phoneshopcollegepractice.Fragments.AccountFragment
import com.example.phoneshopcollegepractice.Fragments.ChatsFragment
import com.example.phoneshopcollegepractice.Fragments.HomeFragment
import com.example.phoneshopcollegepractice.Fragments.MyAdsFragment


sealed class NavigationEvent {
    data object Home : NavigationEvent()
    data object Chats : NavigationEvent()
    data object MyAds : NavigationEvent()
    data object Account : NavigationEvent()
}

class MainViewModel : ViewModel() {

    private val _currentFragment = MutableLiveData<Class<out Fragment>>()
    val currentFragment: LiveData<Class<out Fragment>> = _currentFragment

    private val _toolbarTitle = MutableLiveData<String>()
    val toolbarTitle: LiveData<String> = _toolbarTitle


    init {
        // Установить начальный экран
        navigateToHome()
    }

    fun onNavigationEvent(event: NavigationEvent) {
        when (event) {
            is NavigationEvent.Home -> navigateToHome()
            is NavigationEvent.Chats -> navigateToChats()
            is NavigationEvent.MyAds -> navigateToMyAds()
            is NavigationEvent.Account -> navigateToAccount()
        }
    }

    private fun navigateToHome() {
        _currentFragment.value = HomeFragment::class.java
        _toolbarTitle.value = "Home"
    }

    private fun navigateToChats() {
        _currentFragment.value = ChatsFragment::class.java
        _toolbarTitle.value = "Chats"
    }

    private fun navigateToMyAds() {
        _currentFragment.value = MyAdsFragment::class.java
        _toolbarTitle.value = "My Ads"
    }

    private fun navigateToAccount() {
        _currentFragment.value = AccountFragment::class.java
        _toolbarTitle.value = "Account"
    }

}