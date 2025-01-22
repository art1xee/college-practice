package com.example.phoneshopcollegepractice.viewModels

import android.app.Application
import android.util.Patterns
import androidx.lifecycle.AndroidViewModel
import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import com.example.phoneshopcollegepractice.api.models.RegisterRequest
import com.example.phoneshopcollegepractice.api.models.RegisterResponse
import com.example.phoneshopcollegepractice.utils.RetrofitClient
import com.example.phoneshopcollegepractice.utils.TokenManager
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

sealed class RegisterEmailState {
    data object Initial : RegisterEmailState()
    data object Loading : RegisterEmailState()
    data class Error(val message: String) : RegisterEmailState()
    data object Success : RegisterEmailState()
}

class RegisterEmailViewModel(application: Application) : AndroidViewModel(application) {

    private val _state = MutableLiveData<RegisterEmailState>(RegisterEmailState.Initial)
    val state: LiveData<RegisterEmailState> = _state

    private val _email = MutableLiveData<String>()
    val email: LiveData<String> = _email

    private val _password = MutableLiveData<String>()
    val password: LiveData<String> = _password

    private val _confirmPassword = MutableLiveData<String>()
    val confirmPassword: LiveData<String> = _confirmPassword

    private val _emailError = MutableLiveData<String?>()
    val emailError: LiveData<String?> = _emailError

    private val _passwordError = MutableLiveData<String?>()
    val passwordError: LiveData<String?> = _passwordError

    private val _confirmPasswordError = MutableLiveData<String?>()
    val confirmPasswordError: LiveData<String?> = _confirmPasswordError

    private val _navigateToMain = MutableLiveData<Boolean>()
    val navigateToMain: LiveData<Boolean> = _navigateToMain


    fun onEmailChanged(email: String) {
        _email.value = email
        validateEmail(email)
    }

    fun onPasswordChanged(password: String) {
        _password.value = password
        validatePassword(password)
        validateConfirmPassword(_confirmPassword.value ?: "", password)
    }

    fun onConfirmPasswordChanged(confirmPassword: String) {
        _confirmPassword.value = confirmPassword
        validateConfirmPassword(confirmPassword, _password.value ?: "")
    }


    private fun validateEmail(email: String) {
        if (!Patterns.EMAIL_ADDRESS.matcher(email).matches()) {
            _emailError.value = "Invalid Email Pattern"
        } else {
            _emailError.value = null
        }
    }

    private fun validatePassword(password: String) {
        if (password.isEmpty()) {
            _password.value = "Enter a Password"
        } else {
            _passwordError.value = null
        }
    }

    //    private fun validateConfirmPassword(confirmPassword: String, password: String) {
//        when {
//            confirmPassword.isEmpty() -> {
//                _confirmPasswordError.value = "Enter a Confirm Password!"
//            }
//
//            confirmPassword != password -> {
//                _confirmPasswordError.value = "Password Doesn't Match"
//            }
//
//            else -> {
//                _confirmPasswordError.value = null
//            }
//        }
//    }
    private fun validateConfirmPassword(confirmPassword: String, password: String) {
        when {
            confirmPassword.isNotEmpty() && confirmPassword != password -> {
                _confirmPasswordError.value = "Password Doesn't Match"
            }

            else -> {
                _confirmPasswordError.value = null
            }
        }
    }

    fun onRegisterClick() {
        val email = _email.value?.trim() ?: ""
        val password = _password.value?.trim() ?: ""
        val confirmPassword = _confirmPassword.value?.trim() ?: ""

        validateEmail(email)
        validatePassword(password)
        validateConfirmPassword(confirmPassword, password)

        if (_emailError.value != null ||
            _passwordError.value != null ||
            _confirmPassword.value != null
        ) {
            return
        }
        registerUser(email, password)
    }

    private fun registerUser(email: String, password: String) {
        _state.value = RegisterEmailState.Loading

        val registerRequest = RegisterRequest(
            email = email,
            password = password,
            name = "",
            phoneNumber = ""
        )

        RetrofitClient.authApi.register(registerRequest)
            .enqueue(object : Callback<RegisterResponse> {
                override fun onResponse(
                    call: Call<RegisterResponse>,
                    response: Response<RegisterResponse>,
                ) {
                    if (response.isSuccessful) {
                        response.body()?.let { registerResponse ->
                            registerResponse.token?.let { token ->
                                TokenManager.saveToken(getApplication(), token)
                                _state.value = RegisterEmailState.Success
                                _navigateToMain.value = true
                            } ?: run {
                                _state.value =
                                    RegisterEmailState.Error("Registration failed: No token received")
                            }
                        }
                    } else {
                        val errorMessage = try {
                            response.errorBody()?.string() ?: "Registration failed"
                        } catch (e: Exception) {
                            "Registration failed"
                        }
                        _state.value = RegisterEmailState.Error(errorMessage)
                    }
                }

                override fun onFailure(call: Call<RegisterResponse>, t: Throwable) {
                    _state.value = RegisterEmailState.Error("Network Error: ${t.message}")
                }
            })
    }

    fun onNavigationToMainComplete() {
        _navigateToMain.value = false
    }
}






