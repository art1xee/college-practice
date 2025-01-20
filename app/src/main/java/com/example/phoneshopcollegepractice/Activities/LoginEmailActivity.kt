package com.example.phoneshopcollegepractice.Activities

import android.app.ProgressDialog
import android.content.Intent
import android.os.Bundle
import android.util.Patterns
import androidx.activity.enableEdgeToEdge
import androidx.appcompat.app.AppCompatActivity
import com.example.phoneshopcollegepractice.Api.*
import com.example.phoneshopcollegepractice.Api.models.LoginRequest
import com.example.phoneshopcollegepractice.Api.models.LoginResponse
import com.example.phoneshopcollegepractice.Utils.TokenManager
import com.example.phoneshopcollegepractice.Utils.Utils
import com.example.phoneshopcollegepractice.databinding.ActivityLoginEmailBinding
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class LoginEmailActivity : AppCompatActivity() {
    private lateinit var binding: ActivityLoginEmailBinding
    private lateinit var progressDialog: ProgressDialog

    private companion object {
        private const val TAG = "LOGIN_TAG"
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()

        binding = ActivityLoginEmailBinding.inflate(layoutInflater)
        setContentView(binding.root)

        // Check if already logged in
        if (TokenManager.isLoggedIn(this)) {
            startActivity(Intent(this, MainActivity::class.java))
            finish()
            return
        }

        progressDialog = ProgressDialog(this).apply {
            setTitle("Please wait...")
            setCanceledOnTouchOutside(false)
        }

        setupClickListeners()
    }

    private fun setupClickListeners() {
        binding.toolbarBackBtn.setOnClickListener {
            onBackPressed()
        }

        binding.noAccountTv.setOnClickListener {
            startActivity(Intent(this, RegisterEmailActivity::class.java))
        }

        binding.loginBtn.setOnClickListener {
            validateData()
        }
    }

    private fun validateData() {
        val email = binding.emailEt.text.toString().trim()
        val password = binding.passwordEt.text.toString().trim()

        when {
            !Patterns.EMAIL_ADDRESS.matcher(email).matches() -> {
                binding.emailEt.error = "Invalid Email format"
                binding.emailEt.requestFocus()
            }
            password.isEmpty() -> {
                binding.passwordEt.error = "Enter a Password!"
                binding.passwordEt.requestFocus()
            }
            else -> {
                loginUser(email, password)
            }
        }
    }

    private fun loginUser(email: String, password: String) {
        progressDialog.setMessage("Logging In...")
        progressDialog.show()

        val loginRequest = LoginRequest(email, password)

        RetrofitClient.authApi.login(loginRequest).enqueue(object : Callback<LoginResponse> {
            override fun onResponse(call: Call<LoginResponse>, response: Response<LoginResponse>) {
                progressDialog.dismiss()

                if (response.isSuccessful) {
                    response.body()?.let { loginResponse ->
                        loginResponse.token?.let { token ->
                            // Save token
                            TokenManager.saveToken(this@LoginEmailActivity, token)

                            // Navigate to main activity
                            Utils.toast(this@LoginEmailActivity, loginResponse.message)
                            startActivity(Intent(this@LoginEmailActivity, MainActivity::class.java))
                            finishAffinity()
                        } ?: run {
                            Utils.toast(this@LoginEmailActivity, "Login failed: No token received")
                        }
                    }
                } else {
                    val errorMessage = try {
                        response.errorBody()?.string() ?: "Login failed"
                    } catch (e: Exception) {
                        "Login failed"
                    }
                    Utils.toast(this@LoginEmailActivity, errorMessage)
                }
            }

            override fun onFailure(call: Call<LoginResponse>, t: Throwable) {
                progressDialog.dismiss()
                Utils.toast(this@LoginEmailActivity, "Network error: ${t.message}")
            }
        })
    }
}