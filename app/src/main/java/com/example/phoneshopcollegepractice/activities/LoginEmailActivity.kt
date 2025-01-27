package com.example.phoneshopcollegepractice.activities

import android.app.ProgressDialog
import android.content.Intent
import android.os.Bundle
import android.text.Editable
import android.text.TextWatcher
import androidx.activity.enableEdgeToEdge
import androidx.activity.viewModels
import androidx.appcompat.app.AppCompatActivity
import androidx.core.widget.doAfterTextChanged
import com.example.phoneshopcollegepractice.utils.Utils
import com.example.phoneshopcollegepractice.databinding.ActivityLoginEmailBinding
import com.example.phoneshopcollegepractice.viewModels.LoginEmailState
import com.example.phoneshopcollegepractice.viewModels.LoginEmailViewModel

class LoginEmailActivity : AppCompatActivity() {
    private lateinit var binding: ActivityLoginEmailBinding
    private lateinit var progressDialog: ProgressDialog
    private val viewModel: LoginEmailViewModel by viewModels()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()

        binding = ActivityLoginEmailBinding.inflate(layoutInflater)
        setContentView(binding.root)

        setupProgressDialog()
        setupObservers()
        setupClickListeners()
    }

    private fun setupProgressDialog() {
        progressDialog = ProgressDialog(this).apply {
            setTitle("Please wait...")
            setCanceledOnTouchOutside(false)
        }
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

        viewModel.navigateToMain.observe(this) { shouldNavigate ->
            if (shouldNavigate) {
                startActivity(Intent(this, MainActivity::class.java))
                viewModel.onNavigationToMainComplete()
                finishAffinity()
            }
        }
    }

    private fun setupClickListeners() {
        binding.apply {
            toolbarBackBtn.setOnClickListener { onBackPressed() }

            noAccountTv.setOnClickListener {
                startActivity(Intent(this@LoginEmailActivity, RegisterEmailActivity::class.java))
            }

            loginBtn.setOnClickListener { viewModel.onLoginClick() }

            emailEt.doAfterTextChanged {
                viewModel.onEmailChanged(it.toString())
            }

            passwordEt.doAfterTextChanged {
                viewModel.onPasswordChanged(it.toString())
            }
        }
    }
}