package com.example.phoneshopcollegepractice.api.models

data class RegisterRequest(
    val email: String,
    val password: String,
    val name: String = "",
    val phoneNumber: String = "",
)
