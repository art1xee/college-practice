package com.example.phoneshopcollegepractice

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.tooling.preview.Preview
import com.example.phoneshopcollegepractice.databinding.ActivityMainBinding
import com.example.phoneshopcollegepractice.ui.theme.PhoneShopCollegePracticeTheme

class MainActivity : ComponentActivity() {

    private lateinit var binding: ActivityMainBinding
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()

        // activity_main.xml = ActivityMainBinding
        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)


        binding.bottomNav.setOnItemSelectedListener { item ->
            when (item.itemId) {
                R.id.menu_home -> {
                    true
                }

                R.id.menu_chats -> {

                    true
                }

                R.id.menu_my_ads -> {
                    true
                }

                R.id.menu_account -> {
                    true
                }

                else -> {
                    false
                }
            }

        }
    }
}

