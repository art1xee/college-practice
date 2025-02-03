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

    private val _emailError = MutableLiveData<String?>()
    val emailError: LiveData<String?> = _emailError

    private val _passwordError = MutableLiveData<String?>()
    val passwordError: LiveData<String?> = _password

    private val _confirmPasswordError = MutableLiveData<String?>()
    val confirmPasswordError: LiveData<String?> = _confirmPasswordError

    fun onEmailChanged(email: String) {
        _email.value = email
        _emailError.value = null
    }

    fun onPasswordChanged(password: String) {
        _password.value = password
        _passwordError.value = null
    }

    fun onConfirmPasswordChanged(confirmPassword: String) {
        _confirmPassword.value = confirmPassword
        _confirmPasswordError.value = null
    }


    fun onRegisterClick() {
        val email = _email.value?.trim() ?: ""
        val password = _password.value?.trim() ?: ""
        val confirmPassword = _confirmPassword.value?.trim() ?: ""

        val emailError = validateEmail(email)
        val passwordError = validatePassword(password)
        val confirmPasswordError = validateConfirmPassword(confirmPassword, password)

        _emailError.value = emailError
        _passwordError.value = passwordError
        _confirmPasswordError.value = confirmPasswordError

        if (emailError != null || passwordError != null || confirmPasswordError != null) {
            return
        }
        registerUser(email, password)
    }


    private fun validateEmail(email: String): String? {
        if (email.isEmpty()) {
            return "Enter an email"
        }
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
        if (confirmPassword.isEmpty()) {
            return "Confirm your password"
        }
        return if (confirmPassword != password) {
            "Password Doesn't Match"
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