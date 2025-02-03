package com.example.phoneshopcollegepractice.fragments

import android.content.Context
import android.content.Intent
import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.navigation.activity
import com.example.phoneshopcollegepractice.R
import com.example.phoneshopcollegepractice.activities.LoginOptionsActivity
import com.example.phoneshopcollegepractice.activities.MainActivity
import com.example.phoneshopcollegepractice.databinding.FragmentProfileBinding
import com.example.phoneshopcollegepractice.utils.TokenManager
import com.example.phoneshopcollegepractice.viewModels.MainViewModel


class AccountFragment : Fragment() {

    private var _binding: FragmentProfileBinding? = null
    private val binding get() = _binding!!
    private lateinit var mContext: Context
    private lateinit var tokenManager: TokenManager

    override fun onAttach(context: Context) {
        mContext = context
        super.onAttach(context)
    }

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?,
    ): View {
        _binding = FragmentProfileBinding.inflate(inflater, container, false)
        tokenManager = TokenManager(mContext)
        return binding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        binding.logoutBtn.setOnClickListener {
            // Clear the token from SharedPreferences
            tokenManager.clearToken()

            // Navigate to the LoginOptionsActivity (or your login screen)
            startActivity(Intent(mContext, LoginOptionsActivity::class.java))
            activity?.finishAffinity() // Close all activities in the task
        }
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }
}