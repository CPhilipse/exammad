// package com.exammad;
//
// import android.*;
// import android.Manifest;
// import android.content.pm.PackageManager;
// import android.os.Bundle;
// import android.support.annotation.NonNull;
// import android.support.annotation.Nullable;
// import android.net.Uri;
// import android.os.Bundle;
//
// import android.support.design.widget.TabLayout;
// import android.support.v4.app.ActivityCompat;
// import android.support.v4.content.ContextCompat;
// import android.support.v4.view.ViewPager;
// import android.support.v7.app.AppCompatActivity;
// import android.util.Log;
// import android.widget.SectionIndexer;
// import android.widget.TableLayout;
//
// public class SearchActivity extends AppCompatActivity {
//
//     private static final String TAG = "SearchActivity";
//     private static final int REQUEST_CODE = 1;
//
//     //widgets
//     private TabLayout mTabLayout;
//     public ViewPager mViewPager;
//
//     //vars
//     public SectionsPagerAdapter mPagerAdapter;
//
//     @Override
//     protected void onCreate(@Nullable Bundle savedInstanceState) {
//     super.onCreate(savedInstanceState);
//     setContentView(R.layout.activity_search);
//     mTabLayout = (TabLayout) findViewById(R.id.tabs);
//     mViewPager  = (ViewPager) findViewById(R.id.viewpager_container);
//
//     verifyPermissions();
// }
//
// private void verifyPermissions(){
//     Log.d(TAG, "verifyPermissions: asking user for permissions");
//     String[] permissions = {Manifest.permission.READ_EXTERNAL_STORAGE,
//         Manifest.permission.WRITE_EXTERNAL_STORAGE,
//         Manifest.permission.CAMERA};
//
//     if(ContextCompat.checkSelfPermission(this.getApplicationContext(),
//         permissions[0]) == PackageManager.PERMISSION_GRANTED
//         && ContextCompat.checkSelfPermission(this.getApplicationContext(),
//             permissions[1]) == PackageManager.PERMISSION_GRANTED
//         && ContextCompat.checkSelfPermission(this.getApplicationContext(),
//             permissions[2]) == PackageManager.PERMISSION_GRANTED){
//     }else{
//         ActivityCompat.requestPermissions(SearchActivity.this,
//             permissions,
//             REQUEST_CODE);
//     }
// }
//
// @Override
// public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions, @NonNull int[] grantResults) {
//     verifyPermissions();
// }
// }