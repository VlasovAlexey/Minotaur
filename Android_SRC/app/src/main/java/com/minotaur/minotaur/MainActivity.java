package com.minotaur.minotaur;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import android.Manifest;
import android.content.Context;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.graphics.Bitmap;
import android.location.Location;
import android.location.LocationManager;
import android.net.Uri;
import android.os.Bundle;
import android.webkit.GeolocationPermissions;
import android.webkit.PermissionRequest;
import android.webkit.WebChromeClient;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.os.Build;
import android.webkit.ConsoleMessage;
import android.webkit.WebSettings;
import androidx.activity.EdgeToEdge;
import androidx.core.app.ActivityCompat;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;

public class MainActivity extends AppCompatActivity {
    WebView myWeb;
    private static final int LOCATION_PERMISSION_REQUEST_CODE = 1;
    String url;

    @Override
    protected void onCreate(Bundle savedInstanceState) {

        super.onCreate(savedInstanceState);
        EdgeToEdge.enable(this);
        setContentView(R.layout.activity_main);

        String myURL = "file:///android_asset/index.html";
        android.webkit.CookieManager cookieManager = android.webkit.CookieManager.getInstance();
        cookieManager.setAcceptCookie(true);
        cookieManager.acceptCookie();
        cookieManager.getCookie(myURL);

        myWeb = findViewById(R.id.myWeb);
        myWeb.getSettings().setJavaScriptEnabled(true);

        //make visible all console log from WebView visible on Android Studio Console
        myWeb.setWebChromeClient(new WebChromeClient() {
            @Override
            public void onGeolocationPermissionsShowPrompt(String origin, GeolocationPermissions.Callback callback) {
                if (ActivityCompat.checkSelfPermission(MainActivity.this, Manifest.permission.ACCESS_FINE_LOCATION) != PackageManager.PERMISSION_GRANTED) {
                    ActivityCompat.requestPermissions(MainActivity.this, new String[]{Manifest.permission.ACCESS_FINE_LOCATION}, LOCATION_PERMISSION_REQUEST_CODE);
                } else {
                    LocationManager locationManager = (LocationManager) getSystemService(Context.LOCATION_SERVICE);
                    Location location = locationManager.getLastKnownLocation(LocationManager.GPS_PROVIDER);
                    if (location != null) {
                        String latitude = String.valueOf(location.getLatitude());
                        String longitude = String.valueOf(location.getLongitude());
                        String url = myURL + "?lat=" + latitude + "&long=" + longitude;
                        myWeb.loadUrl(url);
                        callback.invoke(origin, true, true);
                    } else {
                        callback.invoke(origin, false, false);
                    }
                }
            }
            @Override
            public void onPermissionRequest(PermissionRequest request) {
                if (request.getOrigin().toString().startsWith("https://")) {
                    request.grant(new String[]{Manifest.permission.ACCESS_FINE_LOCATION});
                } else {
                    super.onPermissionRequest(request);
                }
            }
            @Override
            public boolean onConsoleMessage(ConsoleMessage consoleMessage) {
                android.util.Log.d("WebView--> ", consoleMessage.message());
                return true;
            }
        });
        // Check if location permission is granted
        if (ActivityCompat.checkSelfPermission(this, Manifest.permission.ACCESS_FINE_LOCATION) != PackageManager.PERMISSION_GRANTED) {
            // Request location permission if not granted
            ActivityCompat.requestPermissions(this, new String[]{Manifest.permission.ACCESS_FINE_LOCATION}, LOCATION_PERMISSION_REQUEST_CODE);
        } else {
            // Load the web page if location permission is granted
            myWeb.loadUrl(url);
        }

        //enable access to local storage from web view
        WebSettings settings = myWeb.getSettings();
        settings.setJavaScriptEnabled(true);
        settings.setDatabaseEnabled(true);
        settings.setDomStorageEnabled(true);

        //enable geolocation services
        myWeb.getSettings().setJavaScriptCanOpenWindowsAutomatically(true);
        myWeb.getSettings().setBuiltInZoomControls(true);
        myWeb.getSettings().setGeolocationEnabled(true);

        myWeb.setWebChromeClient(new WebChromeClient() {
            public void onGeolocationPermissionsShowPrompt(String origin, GeolocationPermissions.Callback callback) {
                callback.invoke(origin, true, false);
            }
        });

        //enable cookies save
        myWeb.getSettings().setDomStorageEnabled(true);
        myWeb.getSettings().setDatabaseEnabled(true);
        if (Build.VERSION.SDK_INT < Build.VERSION_CODES.KITKAT) {
            myWeb.getSettings().setDatabasePath("/data/data/" + myWeb.getContext().getPackageName() + "/databases/");
        }

        //and finally start index.html from storage
        myWeb.loadUrl(myURL);


        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main), (v, insets) -> {
            Insets systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars());
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom);
            return insets;
        });

    }
    public class myWebViewclient extends WebViewClient {

        @Override
        public boolean shouldOverrideUrlLoading(WebView view, String url) {

            view.loadUrl(url);

            return true;
        }


        @Override
        public void onPageStarted(WebView view, String url, Bitmap favicon) {
            super.onPageStarted(view, url, favicon);


            final String urls = url;
            if (urls.contains("mailto") || urls.contains("whatsapp") || urls.contains("tel") || urls.contains("sms") || urls.contains("facebook") || urls.contains("truecaller") || urls.contains("")) {
                myWeb.stopLoading();
                Intent i = new Intent();
                i.setAction(Intent.ACTION_VIEW);
                i.setData(Uri.parse(urls));
                startActivity(i);


            }


        }

        @Override
        public void onPageFinished(WebView view, String url) {
            super.onPageFinished(view, url);

        }
    }


    @Override
    public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions, @NonNull int[] grantResults) {
        if (requestCode == LOCATION_PERMISSION_REQUEST_CODE) {
            if (grantResults.length > 0 && grantResults[0] == PackageManager.PERMISSION_GRANTED) {
                myWeb.loadUrl(url); // to load the web page after location permission is granted
            }
        } else {
            super.onRequestPermissionsResult(requestCode, permissions, grantResults);
        }
    }
}