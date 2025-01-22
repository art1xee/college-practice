package com.example.phoneshopcollegepractice.activities

import android.app.ProgressDialog
import android.content.Intent
import android.os.Bundle
import android.text.Editable
import android.text.TextWatcher
import androidx.activity.enableEdgeToEdge
import androidx.activity.viewModels
import androidx.appcompat.app.AppCompatActivity
import com.example.phoneshopcollegepractice.utils.Utils
import com.example.phoneshopcollegepractice.databinding.ActivityLoginEmailBinding
import com.example.phoneshopcollegepractice.viewModels.LoginEmailState
import com.example.phoneshopcollegepractice.viewModels.LoginEmailViewModel

class LoginEmailActivity : AppCompatActivity() {
    private lateinit var binding: ActivityLoginEmailBinding
    private lateinit var progressDialog: ProgressDialog
    private companion object {
        private const val TAG = "LOGIN_TAG"
    }
    private val viewModel: LoginEmailViewModel by viewModels()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()

        binding = ActivityLoginEmailBinding.inflate(layoutInflater)
        setContentView(binding.root)

        //Initialize progress dialog
        progressDialog = ProgressDialog(this).apply {
            setTitle("Please wait...")
            setCanceledOnTouchOutside(false)
        }

        setupObservers()
        setupClickListener()
    }

    private fun setupObservers() {
        viewModel.state.observe(this) { state ->
            when (state) {
                LoginEmailState.Loading -> progressDialog.show()
                LoginEmailState.Success -> progressDialog.dismiss()
                is LoginEmailState.Error -> {
                    progressDialog.dismiss()
                    Utils.toast(this, state.message)
                }

                LoginEmailState.Initial -> progressDialog.dismiss()
            }
        }

        viewModel.emailError.observe(this) { e ->
            binding.emailEt.error = e
        }

        viewModel.passwordError.observe(this) { e ->
            binding.passwordEt.error = e
        }

        viewModel.navigateToMain.observe(this) { shouldNavigate ->
            if (shouldNavigate) {
                startActivity(Intent(this, MainActivity::class.java))
                viewModel.onNavigationToMainComplete()
                finishAffinity()
            }
        }
    }

    private fun setupClickListener() {
        binding.toolbarBackBtn.setOnClickListener {
            onBackPressed()
        }

        binding.noAccountTv.setOnClickListener {
            startActivity(Intent(this, RegisterEmailActivity::class.java))
        }

        binding.loginBtn.setOnClickListener {
            viewModel.onLoginClick()
        }

        binding.emailEt.addTextChangedListener(object : TextWatcher {
            override fun beforeTextChanged(s: CharSequence?, start: Int, count: Int, after: Int) {}
            override fun onTextChanged(s: CharSequence?, start: Int, before: Int, count: Int) {
                viewModel.onEmailChanged(s?.toString() ?: "")
            }

            override fun afterTextChanged(s: Editable?) {}
        })

        binding.passwordEt.addTextChangedListener(object : TextWatcher {
            override fun beforeTextChanged(s: CharSequence?, start: Int, count: Int, after: Int) {}
            override fun onTextChanged(s: CharSequence?, start: Int, before: Int, count: Int) {
                viewModel.onPasswordChanged(s?.toString() ?: "")
            }

            override fun afterTextChanged(s: Editable?) {}
        })

    }
}