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
import com.example.phoneshopcollegepractice.databinding.ActivityRegisterEmailBinding
import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.database.FirebaseDatabase

class RegisterEmailActivity : AppCompatActivity() {

    private lateinit var binding: ActivityRegisterEmailBinding


    private companion object {

        private const val TAG = "REGISTER_TAG"
    }


    private lateinit var firebaseAuth: FirebaseAuth


    private lateinit var progressDialog: ProgressDialog

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()

        binding = ActivityRegisterEmailBinding.inflate(layoutInflater)
        setContentView(binding.root)

        firebaseAuth = FirebaseAuth.getInstance()

        progressDialog = ProgressDialog(this)
        progressDialog.setTitle("Please Wait..")
        progressDialog.setCanceledOnTouchOutside(false)

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

    private var email = ""
    private var password = ""
    private var cPassword = ""

    private fun validateData() {
        //input data

        email = binding.emailEt.text.toString().trim()
        password = binding.passwordEt.text.toString().trim()
        cPassword = binding.confirmPasswordEt.text.toString().trim()

        Log.d(TAG, "validateData: email $email")
        Log.d(TAG, "validateData: password $password")
        Log.d(TAG, "validateData: confirm password $cPassword")

        //validate data
        if (!Patterns.EMAIL_ADDRESS.matcher(email).matches()) {

            binding.emailEt.error = "Invalid Email Pattern"
            binding.emailEt.requestFocus()

        } else if (password.isEmpty()) {
            binding.passwordEt.error = "Enter a Password!"
            binding.passwordEt.requestFocus()
        } else if (cPassword.isEmpty()) {
            binding.confirmPasswordEt.error = "Enter a Confirm Password!"
            binding.confirmPasswordEt.requestFocus()
        } else if (password != cPassword) {

            binding.confirmPasswordEt.error = "Password Does`t Match"
            binding.confirmPasswordEt.requestFocus()
        } else {
            registerUser()
        }


    }

    private fun registerUser() {
        Log.d(TAG, "registerUser: ")

        progressDialog.setMessage("Creating account")
        progressDialog.show()

        firebaseAuth.createUserWithEmailAndPassword(email, password)
            .addOnSuccessListener {
                Log.d(TAG, "registerUser: Registration Success")
                updateUserInfo()
            }
            .addOnFailureListener { e ->
                Log.e(TAG, "registerUser: ", e)
                progressDialog.dismiss()
                Utils.toast(this, "Failed to create account due to ${e.message}")
            }
    }


    private fun updateUserInfo() {
        Log.d(TAG, "updateUserInfo: ")
        progressDialog.setMessage("Saving User Info")

        val timestamp = Utils.getTimestamp()
        val registerUserEmail = firebaseAuth.currentUser!!.email
        val registerUserUid = firebaseAuth.currentUser!!.uid

        val hashMap = HashMap<String, Any>()
        hashMap["name"] = ""
        hashMap["phoneCode"] = ""
        hashMap["phoneNumber"] = ""
        hashMap["profileImageUrl"] = ""
        hashMap["dob"] = ""
        hashMap["userType"] = "Email"
        hashMap["typingTo"] = ""
        hashMap["timestamp"] = timestamp
        hashMap["onlineStatus"] = true
        hashMap["email"] = "$registerUserEmail"
        hashMap["uid"] = registerUserUid

        val reference = FirebaseDatabase.getInstance().getReference("Users")
        reference.child(registerUserUid)
            .setValue(hashMap)

            .addOnSuccessListener {
                Log.d(TAG, "updateUserInfo: User registered...")
                progressDialog.dismiss()

                startActivity(Intent(this, MainActivity::class.java))
                finishAffinity()
            }
            .addOnFailureListener{ e ->
                Log.e(TAG, "updateUserInfo: ", e)
                progressDialog.dismiss()
                Utils.toast(this,"Failed to save user info due to ${e.message}")
            }
    }
}
