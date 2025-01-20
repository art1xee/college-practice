package com.example.phoneshopcollegepractice.Activities

import android.content.Intent
import android.os.Bundle
import androidx.activity.enableEdgeToEdge
import androidx.activity.viewModels
import androidx.appcompat.app.AppCompatActivity
import androidx.fragment.app.Fragment
import com.example.phoneshopcollegepractice.ViewModels.MainViewModel
import com.example.phoneshopcollegepractice.ViewModels.NavigationEvent
import com.example.phoneshopcollegepractice.R
import com.example.phoneshopcollegepractice.Utils.TokenManager
import com.example.phoneshopcollegepractice.Utils.Utils
import com.example.phoneshopcollegepractice.databinding.ActivityMainBinding
import com.google.firebase.auth.FirebaseAuth

class MainActivity : AppCompatActivity() {
    private val TAG = "MainActivity"
    private lateinit var binding: ActivityMainBinding

    //Firebase Auth for auth related tasks
    private lateinit var firebaseAuth: FirebaseAuth

    // ViewModel for managing UI-related data
    private val viewModel: MainViewModel by viewModels()


    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()// Enables edge-to-edge display

        // Initialize view binding for activity_main.xml
        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)

        // Initialize Firebase Authentication
//        firebaseAuth = FirebaseAuth.getInstance()

        // If the user is not logged in, navigate to the LoginOptionsActivity
        if (!TokenManager.isLoggedIn(this)) {
            //user is not logged in, move to LoginOptionActivity
            startLoginOptions()
        }

        // Observe changes in ViewModel (e.g., current fragment and toolbar title)
        observeViewModel()

        // Set up the bottom navigation bar with fragment navigation
        binding.bottomNav.setOnItemSelectedListener { item ->
            when (item.itemId) {
                R.id.menu_home -> {
                    // Navigate to HomeFragment when "Home" menu is selected

                    viewModel.onNavigationEvent(NavigationEvent.Home)
                    true
                }

                R.id.menu_chats -> {
                    // Navigate to ChatsFragment when "Chats" menu is selected
                    if (firebaseAuth.currentUser == null) {
                        Utils.toast(this, "Login Required")
                        startLoginOptions()
                        false
                    } else {
                        viewModel.onNavigationEvent(NavigationEvent.Chats)
                        true
                    }
                }

                R.id.menu_my_ads -> {
                    // Navigate to MyAdsFragment when "My Ads" menu is selected

                    if (firebaseAuth.currentUser == null) {
                        Utils.toast(this, "Login Required")
                        startLoginOptions()
                        false
                    } else {
                        viewModel.onNavigationEvent(NavigationEvent.MyAds)
                        true
                    }

                }

                R.id.menu_account -> {
                    // Navigate to AccountFragment when "Account" menu is selected
                    if (firebaseAuth.currentUser == null) {
                        Utils.toast(this, "Login Required")
                        startLoginOptions()
                        false
                    } else {
                        viewModel.onNavigationEvent(NavigationEvent.Account)
                        true
                    }
                }

                else -> false
            }

        }

    }

    /*
    BLOCK FOR APP LIFECYCLE
     */


    // Observes ViewModel changes to update UI elements (e.g., fragment and toolbar title)
    private fun observeViewModel() {
        viewModel.currentFragment.observe(this) { fragmentClass ->
            val fragment = fragmentClass.newInstance()
            showFragment(fragment)
        }
        viewModel.toolbarTitle.observe(this) { title ->
            binding.toolBarTitleTv.text = title

        }
    }

    // Replaces the current fragment in the container with the provided fragment
    private fun showFragment(fragment: Fragment) {
        supportFragmentManager.beginTransaction()
            .replace(binding.fragmentsFl.id, fragment)
            .commit()
    }

    // Starts LoginOptionsActivity for users who are not logged in
    private fun startLoginOptions() {
        startActivity(Intent(this, LoginOptionsActivity::class.java))
    }
}


