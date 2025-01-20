package com.example.phoneshopcollegepractice.Activities

import android.app.ProgressDialog
import android.content.Intent
import android.os.Bundle
import android.util.Log
import android.util.Patterns
import androidx.activity.enableEdgeToEdge
import androidx.appcompat.app.AppCompatActivity
import com.example.phoneshopcollegepractice.Api.RetrofitClient
import com.example.phoneshopcollegepractice.Api.models.RegisterRequest
import com.example.phoneshopcollegepractice.Api.models.RegisterResponse
import com.example.phoneshopcollegepractice.Utils.TokenManager
import com.example.phoneshopcollegepractice.Utils.Utils
import com.example.phoneshopcollegepractice.databinding.ActivityRegisterEmailBinding
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class RegisterEmailActivity : AppCompatActivity() {
    private lateinit var binding: ActivityRegisterEmailBinding
    private lateinit var progressDialog: ProgressDialog

    private companion object {
        private const val TAG = "REGISTER_TAG"
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()

        binding = ActivityRegisterEmailBinding.inflate(layoutInflater)
        setContentView(binding.root)

        // Инициализация прогресс диалога
        progressDialog = ProgressDialog(this).apply {
            setTitle("Please Wait..")
            setCanceledOnTouchOutside(false)
        }

        // Настройка обработчиков кликов
        setupClickListeners()
    }

    private fun setupClickListeners() {
        binding.toolbarBackBtn.setOnClickListener {
            onBackPressed()
        }

        binding.noAccountTv.setOnClickListener {
            onBackPressed()
        }

        binding.registerBtn.setOnClickListener {
            validateData()
        }
    }

    private fun validateData() {
        val email = binding.emailEt.text.toString().trim()
        val password = binding.passwordEt.text.toString().trim()
        val cPassword = binding.confirmPasswordEt.text.toString().trim()

        Log.d(TAG, "validateData: email $email")
        Log.d(TAG, "validateData: password $password")
        Log.d(TAG, "validateData: confirm password $cPassword")

        when {
            !Patterns.EMAIL_ADDRESS.matcher(email).matches() -> {
                binding.emailEt.error = "Invalid Email Pattern"
                binding.emailEt.requestFocus()
            }
            password.isEmpty() -> {
                binding.passwordEt.error = "Enter a Password!"
                binding.passwordEt.requestFocus()
            }
            cPassword.isEmpty() -> {
                binding.confirmPasswordEt.error = "Enter a Confirm Password!"
                binding.confirmPasswordEt.requestFocus()
            }
            password != cPassword -> {
                binding.confirmPasswordEt.error = "Password Doesn't Match"
                binding.confirmPasswordEt.requestFocus()
            }
            else -> {
                registerUser(email, password)
            }
        }
    }

    private fun registerUser(email: String, password: String) {
        Log.d(TAG, "registerUser: ")
        progressDialog.setMessage("Creating account")
        progressDialog.show()

        val registerRequest = RegisterRequest(
            email = email,
            password = password,
            name = "", // Можно добавить поле в форму регистрации если нужно
            phoneNumber = "" // Можно добавить поле в форму регистрации если нужно
        )

        RetrofitClient.authApi.register(registerRequest).enqueue(object : Callback<RegisterResponse> {
            override fun onResponse(
                call: Call<RegisterResponse>,
                response: Response<RegisterResponse>
            ) {
                progressDialog.dismiss()

                if (response.isSuccessful) {
                    response.body()?.let { registerResponse ->
                        // Сохраняем токен
                        registerResponse.token?.let { token ->
                            TokenManager.saveToken(this@RegisterEmailActivity, token)

                            Utils.toast(this@RegisterEmailActivity, registerResponse.message)

                            // Переходим на главный экран
                            startActivity(Intent(this@RegisterEmailActivity, MainActivity::class.java))
                            finishAffinity()
                        } ?: run {
                            Utils.toast(
                                this@RegisterEmailActivity,
                                "Registration failed: No token received"
                            )
                        }
                    }
                } else {
                    val errorMessage = try {
                        response.errorBody()?.string() ?: "Registration failed"
                    } catch (e: Exception) {
                        "Registration failed"
                    }
                    Utils.toast(this@RegisterEmailActivity, errorMessage)
                }
            }

            override fun onFailure(call: Call<RegisterResponse>, t: Throwable) {
                progressDialog.dismiss()
                Log.e(TAG, "Registration Error: ", t)
                Utils.toast(this@RegisterEmailActivity, "Network Error: ${t.message}")
            }
        })
    }
}