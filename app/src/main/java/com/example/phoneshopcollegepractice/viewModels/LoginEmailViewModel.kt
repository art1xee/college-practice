package com.example.phoneshopcollegepractice.viewModels

import android.app.Application
import android.util.Patterns
import androidx.lifecycle.AndroidViewModel
import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import com.example.phoneshopcollegepractice.utils.TokenManager
import com.example.phoneshopcollegepractice.utils.UserInfoProvider

sealed class LoginEmailState {
    data object Initial : LoginEmailState()
    data object Loading : LoginEmailState()
    data class Error(val message: String) : LoginEmailState()
    data object Success : LoginEmailState()
}

class LoginEmailViewModel(application: Application) : AndroidViewModel(application) {
    private val tokenManager = TokenManager(application)
    private val userInfoProvider = UserInfoProvider(tokenManager)

    private val _state = MutableLiveData<LoginEmailState>(LoginEmailState.Initial)
    val state: LiveData<LoginEmailState> = _state

    private val _email = MutableLiveData<String>()
    private val _password = MutableLiveData<String>()

    private val _navigateToMain = MutableLiveData<Boolean>()
    val navigateToMain: LiveData<Boolean> = _navigateToMain

    private var emailError: String? = null
    private var passwordError: String? = null


    init {
        //Check if already logged in
        if (tokenManager.isLoggedIn()) {
            _navigateToMain.value = true
        }
    }

    fun onEmailChanged(email: String) {
        _email.value = email
    }

    fun onPasswordChanged(password: String) {
        _password.value = password
    }


    fun onLoginClick() {
        val email = _email.value?.trim() ?: ""
        val password = _password.value?.trim() ?: ""

        //Validate input first
        emailError = validateEmail(email)
        passwordError = validatePassword(password)

        //Check of there are any validation errors
        if (emailError != null || passwordError != null) {
            return
        }

        //Proceed with login
        loginUser(email, password)
    }

    private fun validateEmail(email: String): String? {
        return if (!Patterns.EMAIL_ADDRESS.matcher(email).matches()) {
            "Invalid Email format!"
        } else {
            null
        }
    }

    private fun validatePassword(password: String): String? {
        return if (password.isEmpty()) {
            "Enter a Password!"
        } else {
            null
        }
    }

    private fun loginUser(email: String, password: String) {
        _state.value = LoginEmailState.Loading

        userInfoProvider.login(
            email,
            password,
            onSuccess = {
                _state.value = LoginEmailState.Success
                _navigateToMain.value = true
            },
            onError = { errorMessage ->
                _state.value = LoginEmailState.Error(errorMessage)
            }
        )
    }

    fun onNavigationToMainComplete() {
        _navigateToMain.value = false
    }
}