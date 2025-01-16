package com.example.phoneshopcollegepractice.Activities

import android.os.Bundle
import androidx.activity.enableEdgeToEdge
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat
import com.example.phoneshopcollegepractice.R
import com.example.phoneshopcollegepractice.databinding.ActivityLoginOptionsBinding
import com.example.phoneshopcollegepractice.databinding.ActivityMainBinding

class LoginOptionsActivity : AppCompatActivity() {

    private lateinit var binding: ActivityLoginOptionsBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        binding = ActivityLoginOptionsBinding.inflate(layoutInflater)
        setContentView(binding.root)


        binding.closeBtn.setOnClickListener{
            onBackPressed()
        }
    }
}