package com.example.phoneshopcollegepractice.Api.models

data class LoginResponse(
    val message: String,
    val token: String?,
    val error: String?,
)
