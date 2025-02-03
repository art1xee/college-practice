package com.example.phoneshopcollegepractice.activities

import android.content.Intent
import android.os.Bundle
import androidx.activity.result.contract.ActivityResultContracts
import androidx.activity.viewModels
import androidx.appcompat.app.AppCompatActivity
import com.example.phoneshopcollegepractice.R
import com.example.phoneshopcollegepractice.databinding.ActivityLoginOptionsBinding
import com.example.phoneshopcollegepractice.utils.Utils
import com.example.phoneshopcollegepractice.viewModels.LoginState
import com.example.phoneshopcollegepractice.viewModels.LoginViewModel
import com.google.android.gms.auth.api.signin.GoogleSignIn

class LoginOptionsActivity : AppCompatActivity() {

    private lateinit var binding: ActivityLoginOptionsBinding
    private val viewModel: LoginViewModel by viewModels()

    private val googleSignInLauncher =
        registerForActivityResult(ActivityResultContracts.StartActivityForResult()) { result ->
            val task = GoogleSignIn.getSignedInAccountFromIntent(result.data)
            viewModel.handleSignInResult(task)
        }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        binding = ActivityLoginOptionsBinding.inflate(layoutInflater)
        setContentView(binding.root)

        viewModel.initializeGoogleSignInClient(getString(R.string.default_web_client_id))

        binding.closeBtn.setOnClickListener {
            onBackPressed()
        }

        binding.loginEmailButton.setOnClickListener {
            startActivity(Intent(this, LoginEmailActivity::class.java))
        }

        binding.loginGoogleButton.setOnClickListener {
            val signInIntent = viewModel.googleSignInClient.signInIntent
            googleSignInLauncher.launch(signInIntent)
        }

        observeViewModel()
    }

    private fun observeViewModel() {
        viewModel.loginState.observe(this) { state ->
            when (state) {
                is LoginState.Loading -> Utils.toast(this, "Signing in...")
                is LoginState.Success -> {
                    Utils.toast(this, state.message)
                    navigateToMainScreen()
                }
                is LoginState.Error -> Utils.toast(this, state.message)
                else -> {}
            }
        }

        viewModel.navigateToMain.observe(this) { navigate ->
            if (navigate) {
                navigateToMainScreen()
                viewModel.onNavigationToMainComplete()
            }
        }
    }

    private fun navigateToMainScreen() {
        startActivity(Intent(this, MainActivity::class.java))
        finish()
    }

}
