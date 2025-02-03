package com.example.phoneshopcollegepractice.viewModels

import android.app.Application
import androidx.lifecycle.AndroidViewModel
import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import com.example.phoneshopcollegepractice.api.models.GoogleSignInRequest
import com.example.phoneshopcollegepractice.utils.TokenManager
import com.example.phoneshopcollegepractice.utils.UserInfoProvider
import com.google.android.gms.auth.api.signin.GoogleSignIn
import com.google.android.gms.auth.api.signin.GoogleSignInAccount
import com.google.android.gms.auth.api.signin.GoogleSignInClient
import com.google.android.gms.auth.api.signin.GoogleSignInOptions
import com.google.android.gms.common.api.ApiException
import com.google.android.gms.tasks.Task

sealed class LoginState {
    data object Initial : LoginState()
    data object Loading : LoginState()
    data class Success(val message: String) : LoginState()
    data class Error(val message: String) : LoginState()
}

class LoginViewModel(application: Application) : AndroidViewModel(application) {
    private val tokenManager = TokenManager(application)
    private val userInfoProvider = UserInfoProvider(tokenManager)

    private val _loginState = MutableLiveData<LoginState>(LoginState.Initial)
    val loginState: LiveData<LoginState> = _loginState

    private val _navigateToMain = MutableLiveData<Boolean>()
    val navigateToMain: LiveData<Boolean> = _navigateToMain

    lateinit var googleSignInClient: GoogleSignInClient

    fun initializeGoogleSignInClient(webClientId: String) {
       val gso =  GoogleSignInOptions.Builder(GoogleSignInOptions.DEFAULT_SIGN_IN)
            .requestIdToken(webClientId)
            .requestEmail()
            .build()
        googleSignInClient = GoogleSignIn.getClient(getApplication(), gso)
    }

    fun handleSignInResult(task: Task<GoogleSignInAccount>) {
        try {
            val account = task.getResult(ApiException::class.java)
            val idToken = account?.idToken

            if (idToken != null) {
                _loginState.value = LoginState.Loading

                userInfoProvider.googleSignIn(
                    idToken,
                    onSuccess = {
                        _loginState.value = LoginState.Success("Google Sign-In successful")
                        _navigateToMain.value = true
                    },
                    onError = { errorMessage ->
                        _loginState.value = LoginState.Error("Google Sign-In failed: $errorMessage")
                    }
                )
            } else {
                _loginState.value = LoginState.Error("Google Sign-In failed: ID Token is null")
            }
        } catch (e: ApiException) {
            _loginState.value =
                LoginState.Error("Google Sign-In failed with exception: ${e.message}")
        }
    }

    fun onNavigationToMainComplete() {
        _navigateToMain.value = false
    }
}