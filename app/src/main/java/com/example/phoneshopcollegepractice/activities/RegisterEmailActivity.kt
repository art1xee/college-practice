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
import com.example.phoneshopcollegepractice.databinding.ActivityRegisterEmailBinding
import com.example.phoneshopcollegepractice.viewModels.RegisterEmailState
import com.example.phoneshopcollegepractice.viewModels.RegisterEmailViewModel


class RegisterEmailActivity : AppCompatActivity() {
    private lateinit var binding: ActivityRegisterEmailBinding
    private lateinit var progressDialog: ProgressDialog
    private val viewModel: RegisterEmailViewModel by viewModels()

    private companion object {
        private const val TAG = "REGISTER_TAG"
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()

        binding = ActivityRegisterEmailBinding.inflate(layoutInflater)
        setContentView(binding.root)

        progressDialog = ProgressDialog(this).apply {
            setTitle("Please Wait..")
            setCanceledOnTouchOutside(false)
        }

        setupObservers()
        setupClickListeners()
    }

    private fun setupObservers() {
        viewModel.state.observe(this) { state ->
            when (state) {
                RegisterEmailState.Loading -> {
                    progressDialog.setMessage("Creating account")
                    progressDialog.show()
                }
                RegisterEmailState.Success -> progressDialog.dismiss()
                is RegisterEmailState.Error -> {
                    progressDialog.dismiss()
                    Utils.toast(this, state.message)
                }
                RegisterEmailState.Initial -> progressDialog.dismiss()
            }
        }

        viewModel.emailError.observe(this) { error ->
            binding.emailEt.error = error
            error?.let { binding.emailEt.requestFocus() }
        }

        viewModel.passwordError.observe(this) { error ->
            binding.passwordEt.error = error
            error?.let { binding.passwordEt.requestFocus() }
        }

        viewModel.confirmPasswordError.observe(this) { error ->
            binding.confirmPasswordEt.error = error
            error?.let { binding.confirmPasswordEt.requestFocus() }
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
        binding.toolbarBackBtn.setOnClickListener {
            onBackPressed()
        }

        binding.noAccountTv.setOnClickListener {
            onBackPressed()
        }

        binding.registerBtn.setOnClickListener {
            viewModel.onRegisterClick()
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

        binding.confirmPasswordEt.addTextChangedListener(object : TextWatcher {
            override fun beforeTextChanged(s: CharSequence?, start: Int, count: Int, after: Int) {}
            override fun onTextChanged(s: CharSequence?, start: Int, before: Int, count: Int) {
                viewModel.onConfirmPasswordChanged(s?.toString() ?: "")
            }
            override fun afterTextChanged(s: Editable?) {}
        })
    }
}