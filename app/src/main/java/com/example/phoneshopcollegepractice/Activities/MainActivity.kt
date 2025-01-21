package com.example.phoneshopcollegepractice.Activities

import android.content.Intent
import android.os.Bundle
import androidx.activity.enableEdgeToEdge
import androidx.activity.viewModels
import androidx.appcompat.app.AppCompatActivity
import androidx.fragment.app.Fragment
import com.example.phoneshopcollegepractice.Fragments.AccountFragment
import com.example.phoneshopcollegepractice.Fragments.ChatsFragment
import com.example.phoneshopcollegepractice.Fragments.HomeFragment
import com.example.phoneshopcollegepractice.Fragments.MyAdsFragment
import com.example.phoneshopcollegepractice.ViewModels.MainViewModel
import com.example.phoneshopcollegepractice.ViewModels.NavigationEvent
import com.example.phoneshopcollegepractice.R
import com.example.phoneshopcollegepractice.Utils.Utils
import com.example.phoneshopcollegepractice.ViewModels.AppScreen
import com.example.phoneshopcollegepractice.databinding.ActivityMainBinding

class MainActivity : AppCompatActivity() {
    private val TAG = "MainActivity"
    private lateinit var binding: ActivityMainBinding

    //Firebase Auth for auth related tasks
//    private lateinit var firebaseAuth: FirebaseAuth

    // ViewModel for managing UI-related data
    private val viewModel: MainViewModel by viewModels()


    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()// Enables edge-to-edge display

        // Initialize view binding for activity_main.xml
        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)

        // Observe changes in ViewModel (e.g., current fragment and toolbar title)
        observeViewModel()

        // Set up the bottom navigation bar with fragment navigation
        binding.bottomNav.setOnItemSelectedListener { item ->
            when (item.itemId) {
                R.id.menu_home -> {
                    // Navigate to HomeFragment when "Home" menu is selected
                    viewModel.onHomeClick()
                    true
                }

                R.id.menu_chats -> {
                    viewModel.onChatsClick()
                    // Navigate to ChatsFragment when "Chats" menu is selected
                    true
                }

                R.id.menu_my_ads -> {
                    // Navigate to MyAdsFragment when "My Ads" menu is selected

//                    if (true/*firebaseAuth.currentUser == null*/) {
//                        Utils.toast(this, "Login Required")
//                        startLoginOptions()
//                        false
//                    } else {
//                        viewModel.onNavigationEvent(NavigationEvent.MyAds)
//                        true
//                    }
                    true
                }

                R.id.menu_account -> {
                    // Navigate to AccountFragment when "Account" menu is selected
//                    if (true/*firebaseAuth.currentUser == null*/) {
//                        Utils.toast(this, "Login Required")
//                        startLoginOptions()
//                        false
//                    } else {
//                        viewModel.onNavigationEvent(NavigationEvent.Account)
//                        true
//                    }
                    true
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
        viewModel.currentScreen.observe(this) { screen ->
            showAppScreen(screen)
        }
        viewModel.toolbarTitle.observe(this) { title ->
            binding.toolBarTitleTv.text = title
        }
        viewModel.toastMessage.observe(this) { message ->
            Utils.toast(this, message)
        }
    }

    private fun showAppScreen(screen: AppScreen?) {
        when (screen) {
            AppScreen.Account -> {
                showFragment(AccountFragment())
            }

            AppScreen.Chats -> {
                showFragment(ChatsFragment())
            }

            AppScreen.Home -> {
                showFragment(HomeFragment())
            }

            AppScreen.MyAds -> {
                showFragment(MyAdsFragment())
            }

            AppScreen.Login -> {
                startLoginOptions()
            }

            null -> {}
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


