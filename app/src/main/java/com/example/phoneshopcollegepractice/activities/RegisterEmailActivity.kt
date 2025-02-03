package com.example.phoneshopcollegepractice.activities

import android.app.ProgressDialog
import android.content.Intent
import android.os.Bundle
import androidx.activity.enableEdgeToEdge
import androidx.activity.viewModels
import androidx.appcompat.app.AppCompatActivity
import androidx.core.widget.doAfterTextChanged
import com.example.phoneshopcollegepractice.utils.Utils
import com.example.phoneshopcollegepractice.databinding.ActivityRegisterEmailBinding
import com.example.phoneshopcollegepractice.viewModels.RegisterEmailState
import com.example.phoneshopcollegepractice.viewModels.RegisterEmailViewModel


class RegisterEmailActivity : AppCompatActivity() {
    private lateinit var binding: ActivityRegisterEmailBinding
    private lateinit var progressDialog: ProgressDialog
    private val viewModel: RegisterEmailViewModel by viewModels()


    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()

        binding = ActivityRegisterEmailBinding.inflate(layoutInflater)
        setContentView(binding.root)

        progressDialog = ProgressDialog(this).apply {
            setTitle("Please Wait..")
            setCanceledOnTouchOutside(false)
        }

        setupProgressDialog()
        setupObservers()
        setupClickListeners()
    }

    private fun setupProgressDialog() {
        progressDialog = ProgressDialog(this).apply {
            setTitle("Please Wait..")
            setCanceledOnTouchOutside(false)
        }
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
            noAccountTv.setOnClickListener { onBackPressed() }
            registerBtn.setOnClickListener { viewModel.onRegisterClick() }

            emailEt.doAfterTextChanged {
                viewModel.onEmailChanged(it.toString())
            }

            passwordEt.doAfterTextChanged {
                viewModel.onPasswordChanged(it.toString())
            }

            confirmPasswordEt.doAfterTextChanged {
                viewModel.onConfirmPasswordChanged(it.toString())
            }
        }
    }
}