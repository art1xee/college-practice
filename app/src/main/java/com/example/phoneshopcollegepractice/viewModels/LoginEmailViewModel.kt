package com.example.phoneshopcollegepractice.viewModels

import android.app.Application
import android.util.Patterns
import androidx.lifecycle.AndroidViewModel
import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import com.example.phoneshopcollegepractice.api.models.LoginRequest
import com.example.phoneshopcollegepractice.api.models.LoginResponse
import com.example.phoneshopcollegepractice.utils.RetrofitClient
import com.example.phoneshopcollegepractice.utils.TokenManager
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

sealed class LoginEmailState {
    data object Initial : LoginEmailState()
    data object Loading : LoginEmailState()
    data class Error(val message: String) : LoginEmailState()
    data object Success : LoginEmailState()
}

class LoginEmailViewModel(application: Application) : AndroidViewModel(application) {

    private val _state = MutableLiveData<LoginEmailState>(LoginEmailState.Initial)
    val state: LiveData<LoginEmailState> = _state

    private val _email = MutableLiveData<String>()
    val email: LiveData<String> = _email

    private val _password = MutableLiveData<String>()
    val password: LiveData<String> = _password

    private val _emailError = MutableLiveData<String?>()
    val emailError: LiveData<String?> = _emailError

    private val _passwordError = MutableLiveData<String?>()
    val passwordError: LiveData<String?> = _passwordError

    private val _navigateToMain = MutableLiveData<Boolean>()
    val navigateToMain: LiveData<Boolean> = _navigateToMain


    init {
        //Check if already logged in
        if (TokenManager.isLoggedIn(getApplication())) {
            _navigateToMain.value = true
        }
    }

    fun onEmailChanged(email: String) {
        _email.value = email
        validateEmail(email)
    }

    fun onPasswordChanged(password: String) {
        _password.value = password
        validatePassword(password)
    }

    private fun validateEmail(email: String) {
        if (!Patterns.EMAIL_ADDRESS.matcher(email).matches()) {
            _emailError.value = "Invalid Email format!"
        } else {
            _emailError.value = null
        }
    }

    private fun validatePassword(password: String) {
        if (password.isEmpty()) {
            _passwordError.value = "Enter a Password!"
        } else {
            _passwordError.value = null
        }
    }

    fun onLoginClick() {
        val email = _email.value?.trim() ?: ""
        val password = _password.value?.trim() ?: ""

        //Validate input first
        validateEmail(email)
        validatePassword(password)

        //Check of there are any validation errors
        if (_emailError.value != null || _passwordError.value != null) {
            return
        }

        //Proceed with login
        loginUser(email, password)
    }

    private fun loginUser(email: String, password: String) {
        _state.value = LoginEmailState.Loading

        val loginRequest = LoginRequest(email, password)
        RetrofitClient.authApi.login(loginRequest)
            .enqueue(object : Callback<LoginResponse> {
                override fun onResponse(
                    call: Call<LoginResponse>,
                    response: Response<LoginResponse>,
                ) {
                    if (response.isSuccessful) {
                        response.body()?.let { loginResponse ->
                            loginResponse.token?.let { token ->
                                // Save token
                                TokenManager.saveToken(getApplication(), token)
                                _state.value = LoginEmailState.Success
                                _navigateToMain.value = true
                            } ?: run {
                                _state.value =
                                    LoginEmailState.Error("Login failed: No token received")
                            }
                        }
                    } else {
                        val errorMessage = try {
                            response.errorBody()?.string() ?: "Login failed"
                        } catch (e: Exception) {
                            "Login failed"
                        }
                        _state.value = LoginEmailState.Error(errorMessage)
                    }
                }

                override fun onFailure(call: Call<LoginResponse>, t: Throwable) {
                    _state.value = LoginEmailState.Error("Network error: ${t.message}")
                }
            })
    }
    fun onNavigationToMainComplete() {
        _navigateToMain.value = false
    }
}