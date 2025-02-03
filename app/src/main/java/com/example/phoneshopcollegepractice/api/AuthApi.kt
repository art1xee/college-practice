package com.example.phoneshopcollegepractice.api

import com.example.phoneshopcollegepractice.api.models.GoogleSignInRequest
import com.example.phoneshopcollegepractice.api.models.LoginRequest
import com.example.phoneshopcollegepractice.api.models.LoginResponse
import com.example.phoneshopcollegepractice.api.models.RegisterRequest
import com.example.phoneshopcollegepractice.api.models.RegisterResponse
import retrofit2.Call
import retrofit2.http.Body
import retrofit2.http.POST

interface AuthApi {
    @POST("api/phone/auth/login")
    fun login(@Body loginRequest: LoginRequest): Call<LoginResponse>

    @POST("api/phone/auth/register")
    fun register(@Body registerRequest: RegisterRequest): Call<RegisterResponse>

    @POST("api/phone/auth/google") // Adjust this endpoint path to match your backend
    fun googleSignIn(@Body request: GoogleSignInRequest): Call<LoginResponse>
}