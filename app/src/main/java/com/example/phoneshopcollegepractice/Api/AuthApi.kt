package com.example.phoneshopcollegepractice.Api

import com.example.phoneshopcollegepractice.Api.models.LoginRequest
import com.example.phoneshopcollegepractice.Api.models.LoginResponse
import com.example.phoneshopcollegepractice.Api.models.RegisterRequest
import com.example.phoneshopcollegepractice.Api.models.RegisterResponse
import retrofit2.Call
import retrofit2.http.Body
import retrofit2.http.POST

interface AuthApi {
    @POST("api/phone/auth/login")
    fun login(@Body loginRequest: LoginRequest): Call<LoginResponse>

    @POST("api/phone/auth/register")
    fun register(@Body registerRequest: RegisterRequest): Call<RegisterResponse>
}