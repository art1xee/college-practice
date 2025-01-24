package com.example.phoneshopcollegepractice.viewModels

import android.app.Application
import android.util.Patterns
import androidx.lifecycle.AndroidViewModel
import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import com.example.phoneshopcollegepractice.utils.TokenManager
import com.example.phoneshopcollegepractice.utils.UserInfoProvider


sealed class RegisterEmailState {
    data object Initial : RegisterEmailState()
    data object Loading : RegisterEmailState()
    data class Error(val message: String) : RegisterEmailState()
    data object Success : RegisterEmailState()
}

class RegisterEmailViewModel(application: Application) : AndroidViewModel(application) {
    private val tokenManager = TokenManager(application)
    private val userInfoProvider = UserInfoProvider(tokenManager)

    private val _state = MutableLiveData<RegisterEmailState>(RegisterEmailState.Initial)
    val state: LiveData<RegisterEmailState> = _state

    private val _email = MutableLiveData<String>()
    private val _password = MutableLiveData<String>()
    private val _confirmPassword = MutableLiveData<String>()

    private val _navigateToMain = MutableLiveData<Boolean>()
    val navigateToMain: LiveData<Boolean> = _navigateToMain

    private var emailError: String? = null
    private var passwordError: String? = null
    private var confirmPasswordError: String? = null

    fun onEmailChanged(email: String) {
        _email.value = email
    }

    fun onPasswordChanged(password: String) {
        _password.value = password
    }

    fun onConfirmPasswordChanged(confirmPassword: String) {
        _confirmPassword.value = confirmPassword
    }


    fun onRegisterClick() {
        val email = _email.value?.trim() ?: ""
        val password = _password.value?.trim() ?: ""
        val confirmPassword = _confirmPassword.value?.trim() ?: ""

        emailError = validateEmail(email)
        passwordError = validatePassword(password)
        confirmPasswordError = validateConfirmPassword(confirmPassword, password)

        if (emailError != null || passwordError != null || confirmPasswordError != null) {
            return
        }
        registerUser(email, password)
    }

    private fun validateEmail(email: String): String? {
        return if (!Patterns.EMAIL_ADDRESS.matcher(email).matches()) {
            "Invalid Email Pattern"
        } else {
            null
        }
    }

    private fun validatePassword(password: String): String? {
        return if (password.isEmpty()) {
            "Enter a password"
        } else {
            null
        }
    }

    private fun validateConfirmPassword(confirmPassword: String, password: String): String? {
        return if (confirmPassword.isNotEmpty() && confirmPassword != password) {
            "Password Does`nt Match"
        } else {
            null
        }
    }

    private fun registerUser(email: String, password: String) {
        _state.value = RegisterEmailState.Loading

        userInfoProvider.register(
            email,
            password,
            onSuccess = {
                _state.value = RegisterEmailState.Success
                _navigateToMain.value = true
            },
            onError = { errorMessage ->
                _state.value = RegisterEmailState.Error(errorMessage)
            }
        )
    }


    fun onNavigationToMainComplete() {
        _navigateToMain.value = false
    }
}






