package com.example.phoneshopcollegepractice.Utils

import com.example.phoneshopcollegepractice.Api.AuthApi
import com.example.phoneshopcollegepractice.Api.models.LoginRequest
import com.example.phoneshopcollegepractice.Api.models.LoginResponse
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

object UserInfoProvider {
    private lateinit var authApi: AuthApi
    private var instance: UserInfoProvider? = null
    var user: User? = null
        private set

    // Initialize the singleton with dependencies
    fun initialize(authApi: AuthApi) {
        this.authApi = authApi
    }

    // Get the singleton instance
    fun getInstance(): UserInfoProvider {
        if (!::authApi.isInitialized) {
            throw IllegalStateException("UserInfoProvider must be initialized with AuthApi before use")
        }
        return instance ?: synchronized(this) {
            instance ?: UserInfoProvider.also { instance = it }
        }
    }

    fun loginUser(
        email: String,
        password: String,
        onSuccess: () -> Unit,
        onFailure: (String) -> Unit
    ) {
        authApi.login(LoginRequest(email, password)).enqueue(object : Callback<LoginResponse> {
            override fun onResponse(call: Call<LoginResponse>, response: Response<LoginResponse>) {
                if (response.isSuccessful) {
                    val body = response.body()
                    user = User(
                        id = body?.token ?: "",
                        name = body?.token ?: "",
                    )
                    onSuccess()
                } else {
                    onFailure(response.errorBody()?.string() ?: "")
                }
            }

            override fun onFailure(call: Call<LoginResponse>, t: Throwable) {
                onFailure(t.localizedMessage)
            }
        })
    }
}

data class User(
    val id: String,
    val name: String
)

data class Advertisement(
    val description: String,
    val price: Float,
    val title: String
)

data class Chat(
    val users: List<String>,
    val messages: List<Message>
)

data class Message(
    val text: String,
    val receiveTime: Long,
    val senderId: String
)