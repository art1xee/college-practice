package com.example.phoneshopcollegepractice.utils

import com.example.phoneshopcollegepractice.api.AuthApi
import com.example.phoneshopcollegepractice.api.models.LoginRequest
import com.example.phoneshopcollegepractice.api.models.LoginResponse
import com.example.phoneshopcollegepractice.api.models.RegisterRequest
import com.example.phoneshopcollegepractice.api.models.RegisterResponse
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class UserInfoProvider(private val tokenManager: TokenManager) {

    fun register(
        email: String,
        password: String,
        onSuccess: () -> Unit,
        onError: (String) -> Unit
    ) {
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
                    response: Response<RegisterResponse>
                ) {
                    if (response.isSuccessful) {
                        response.body()?.let { registerResponse ->
                            registerResponse.token.let { token ->
                                tokenManager.saveToken(token)
                                onSuccess()
                            } ?: run {
                                onError("Registration failed: No token received")
                            }
                        }
                    } else {
                        val errorMessage = try {
                            response.errorBody()?.string() ?: "Registration failed"
                        } catch (e: Exception) {
                            "Registration failed"
                        }
                        onError(errorMessage)
                    }
                }

                override fun onFailure(call: Call<RegisterResponse>, t: Throwable) {
                    onError("Network Error: ${t.message}")
                }
            })
    }

    fun login(
        email: String,
        password: String,
        onSuccess: () -> Unit,
        onError: (String) -> Unit
    ) {
        val loginRequest = LoginRequest(email, password)
        RetrofitClient.authApi.login(loginRequest)
            .enqueue(object : Callback<LoginResponse> {
                override fun onResponse(
                    call: Call<LoginResponse>,
                    response: Response<LoginResponse>
                ) {
                    if (response.isSuccessful) {
                        response.body()?.let { loginResponse ->
                            loginResponse.token?.let { token ->
                                tokenManager.saveToken(token)
                                onSuccess()
                            } ?: run {
                                onError("Login failed: No token received")
                            }
                        }
                    } else {
                        val errorMessage = try {
                            response.errorBody()?.string() ?: "Login failed"
                        } catch (e: Exception) {
                            "Login failed"
                        }
                        onError(errorMessage)
                    }
                }

                override fun onFailure(call: Call<LoginResponse>, t: Throwable) {
                    onError("Network error: ${t.message}")
                }
            })
    }
}