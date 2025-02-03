package com.example.phoneshopcollegepractice.api.models

data class LoginResponse(
    val message: String,
    val token: String?,
    val error: String?,
)
