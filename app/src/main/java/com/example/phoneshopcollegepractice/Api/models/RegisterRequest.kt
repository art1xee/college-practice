package com.example.phoneshopcollegepractice.Api.models

data class RegisterRequest(
    val email: String,
    val password: String,
    val name: String = "",
    val phoneNumber: String = "",
)
