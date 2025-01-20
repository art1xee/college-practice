package com.example.phoneshopcollegepractice.Activities

import android.app.ProgressDialog
import android.content.Intent
import android.os.Bundle
import android.util.Log
import android.util.Patterns
import androidx.activity.enableEdgeToEdge
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat
import com.example.phoneshopcollegepractice.R
import com.example.phoneshopcollegepractice.Utils.Utils
import com.example.phoneshopcollegepractice.databinding.ActivityLoginEmailBinding
import com.example.phoneshopcollegepractice.databinding.ActivityLoginOptionsBinding
import com.google.firebase.auth.FirebaseAuth

class LoginEmailActivity : AppCompatActivity() {

    private lateinit var binding: ActivityLoginEmailBinding


    private companion object {
        private const val TAG = "LOGIN_TAG"
    }


    private lateinit var firebaseAuth: FirebaseAuth


    private lateinit var progressDialog: ProgressDialog
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()

        binding = ActivityLoginEmailBinding.inflate(layoutInflater)
        setContentView(binding.root)


        firebaseAuth = FirebaseAuth.getInstance()


        progressDialog = ProgressDialog(this)
        progressDialog.setTitle("Please wait...")
        progressDialog.setCanceledOnTouchOutside(false)

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

    private var email = ""
    private var password = ""

    private fun validateData() {
        //input data
        email = binding.emailEt.text.toString().trim()
        password = binding.passwordEt.text.toString().trim()


        Log.d(TAG, "validateData: email: $email")
        Log.d(TAG, "validateData: password: $password")

        //validate data
        if (!Patterns.EMAIL_ADDRESS.matcher(email).matches()) {

            binding.emailEt.error = "Invalid Email format"
            binding.emailEt.requestFocus()

        } else if (password.isEmpty()) {
            binding.passwordEt.error = "Enter a Password!"
            binding.passwordEt.requestFocus()

        } else {
            loginUser()

        }
    }


    private fun loginUser() {
        Log.d(TAG, "loginUser: ")
        //show progress
        progressDialog.setMessage("Logging In")


        firebaseAuth.signInWithEmailAndPassword(email, password)
            .addOnSuccessListener {
                Log.d(TAG, "loginUser: Logged In...")
                progressDialog.dismiss()


                startActivity(Intent(this, MainActivity::class.java))
                finishAffinity()
            }
            .addOnFailureListener { e ->

                Log.e(TAG, "loginUser: ", e)
                progressDialog.dismiss()
                Utils.toast(this, "Unable to login due to ${e.message}")
            }
    }
}



