package com.example.phoneshopcollegepractice.Activities

import android.content.Intent
import android.os.Bundle
import android.util.Log
import androidx.activity.enableEdgeToEdge
import androidx.appcompat.app.AppCompatActivity
import com.example.phoneshopcollegepractice.Fragments.AccountFragment
import com.example.phoneshopcollegepractice.Fragments.ChatsFragment
import com.example.phoneshopcollegepractice.Fragments.HomeFragment
import com.example.phoneshopcollegepractice.Fragments.MyAdsFragment
import com.example.phoneshopcollegepractice.R
import com.example.phoneshopcollegepractice.databinding.ActivityMainBinding
import com.google.firebase.auth.FirebaseAuth

class MainActivity : AppCompatActivity() {
    private val TAG = "MainActivity"
    private lateinit var binding: ActivityMainBinding

    //Firebase Auth for auth related tasks
    private lateinit var firebaseAuth: FirebaseAuth

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()

        // activity_main.xml = ActivityMainBinding
        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)

        firebaseAuth = FirebaseAuth.getInstance()


        if (firebaseAuth.currentUser == null) {
        //user is not logged in, move to LoginOptionActivity
            startLoginOptions()
        }

        //By default (when app is open) show homeFragment
        showHomeFragment()

        binding.bottomNav.setOnItemSelectedListener { item ->
            when (item.itemId) {
                R.id.menu_home -> {
                    //Home item clicked, show HomeFragment

                    showHomeFragment()
                    true
                }

                R.id.menu_chats -> {
                    //Chats item clicked, show ChatsFragment
                    showChatsFragments()
                    true
                }

                R.id.menu_my_ads -> {
                    //My Ads item clicked, show MyAdsFragment

                    showMyAdsFragments()
                    true
                }


                R.id.menu_account -> {
                    //Account item clicked, show AccountFragment
                    showAccountFragments()
                    true
                }

                else -> {
                    false
                }
            }

        }


    }

    //APP lifecycle
    override fun onStart() {
        super.onStart()
        Log.d(TAG, "MainActivity onStart")
    }

    override fun onStop() {
        super.onStop()
        Log.d(TAG, "MainActivity onStop")
    }

    override fun onPause() {
        super.onPause()
        Log.d(TAG, "MainActivity onPause")
    }

    override fun onResume() {
        super.onResume()
        Log.d(TAG, "MainActivity onResume")
    }

    override fun onRestart() {
        super.onRestart()
        Log.d(TAG, "MainActivity onRestart")
    }

    override fun onDestroy() {
        super.onDestroy()
        Log.d(TAG, "MainActivity onDestroy")
    }


    //Function`s to show Fragment`s
    private fun showHomeFragment() {
        binding.toolBarTitleTv.text = "Home"

        // Show Home fragment
        val fragment = HomeFragment()
        val fragmentTransaction = supportFragmentManager.beginTransaction()
        fragmentTransaction.replace(binding.fragmentsFl.id, fragment, "HomeFragment")
        fragmentTransaction.commit()
    }

    private fun showChatsFragments() {
        binding.toolBarTitleTv.text = "Chats"

        //Show Chats fragment
        val fragment = ChatsFragment()
        val fragmentTransaction = supportFragmentManager.beginTransaction()
        fragmentTransaction.replace(binding.fragmentsFl.id, fragment, "ChatsFragment")
        fragmentTransaction.commit()


    }

    private fun showMyAdsFragments() {
        binding.toolBarTitleTv.text = "My Ads"

        //Show my Ads fragment
        val fragment = MyAdsFragment()
        val fragmentTransaction = supportFragmentManager.beginTransaction()
        fragmentTransaction.replace(binding.fragmentsFl.id, fragment, "MyAdsFragment")
        fragmentTransaction.commit()
    }

    private fun showAccountFragments() {
        binding.toolBarTitleTv.text = "Account"

        //Show Account fragment
        val fragment = AccountFragment()
        val fragmentTransaction = supportFragmentManager.beginTransaction()
        fragmentTransaction.replace(binding.fragmentsFl.id, fragment, "AccountFragment")
        fragmentTransaction.commit()
    }

    private fun startLoginOptions() {
        startActivity(Intent(this, LoginOptionsActivity::class.java))
    }
}


