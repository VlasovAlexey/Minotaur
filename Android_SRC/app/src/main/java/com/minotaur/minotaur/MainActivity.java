package com.minotaur.minotaur;

import androidx.annotation.Nullable;
import androidx.annotation.RequiresApi;
import androidx.appcompat.app.AppCompatActivity;
import android.Manifest;
import android.annotation.SuppressLint;
import android.app.Activity;
import android.content.ContentResolver;
import android.content.ContentValues;
import android.content.Context;
import android.content.Intent;
import android.content.pm.ActivityInfo;
import android.content.pm.PackageManager;
import android.graphics.Color;
import android.graphics.PixelFormat;
import android.location.Location;
import android.location.LocationManager;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.os.Environment;
import android.provider.MediaStore;
import android.util.Base64;
import android.util.Log;
import android.view.Gravity;
import android.view.WindowManager;
import android.webkit.GeolocationPermissions;
import android.webkit.JavascriptInterface;
import android.webkit.PermissionRequest;
import android.webkit.ValueCallback;
import android.webkit.WebChromeClient;
import android.webkit.WebView;
import android.webkit.ConsoleMessage;
import android.webkit.WebSettings;
import android.webkit.WebViewClient;
import android.widget.LinearLayout;
import android.widget.RelativeLayout;
import android.widget.Toast;

import androidx.activity.EdgeToEdge;
import androidx.constraintlayout.widget.ConstraintLayout;
import androidx.core.app.ActivityCompat;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;

import java.io.OutputStream;

public class MainActivity extends AppCompatActivity {
    private static final String TAG = "WebViewFileDownload";
    private static final int CREATE_FILE_REQUEST_CODE = 1001;
    private String pendingFileName;
    private String pendingMimeType;
    private byte[] pendingFileData;
    WebView myWeb;
    private static final int LOCATION_PERMISSION_REQUEST_CODE = 1;
    private ValueCallback<Uri[]> filePathCallback;
    private static final int FILE_CHOOSER_REQUEST_CODE = 1;
    String myURL = "file:///android_asset/index.html";

    @SuppressLint("SetJavaScriptEnabled")
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_PORTRAIT); // Fixed portrait orientation
        super.onCreate(savedInstanceState);
        EdgeToEdge.enable(this);
        setContentView(R.layout.activity_main);
        myWeb = findViewById(R.id.myWeb);

        //setup WebViewChromeClient for working with geolocation, file chooser and blob downloader
        setupWebView();

        //change background color for Android GUI
        getWindow().getDecorView().setBackgroundColor(Color.parseColor("#808080"));
        //color for WebView background
        myWeb.setBackgroundColor(Color.parseColor("#808080"));

        //and finally start index.html from storage
        myWeb.loadUrl(myURL);

        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main), (v, insets) -> {
            Insets systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars());
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom);
            return insets;
        });
    }
    private void setupWebView() {
        WebSettings settings = myWeb.getSettings();

        // Enable JavaScript and file access
        settings.setJavaScriptEnabled(true);
        settings.setDomStorageEnabled(true);
        settings.setAllowFileAccess(true);
        settings.setAllowContentAccess(true);
        settings.setAllowUniversalAccessFromFileURLs(true);
        settings.setAllowFileAccessFromFileURLs(true);

        android.webkit.CookieManager cookieManager = android.webkit.CookieManager.getInstance();
        cookieManager.setAcceptCookie(true);
        cookieManager.acceptCookie();
        cookieManager.getCookie(myURL);
        settings.setDatabaseEnabled(true);
        settings.setDomStorageEnabled(true);
        settings.setAllowContentAccess(true);
        settings.setAllowFileAccess(true);
        settings.setDatabaseEnabled(true);
        settings.setDomStorageEnabled(true);
        settings.setGeolocationEnabled(true);
        settings.setJavaScriptCanOpenWindowsAutomatically(true);
        settings.setLoadsImagesAutomatically(true);
        settings.setMediaPlaybackRequiresUserGesture(false);
        settings.setSupportMultipleWindows(true);
        settings.setJavaScriptCanOpenWindowsAutomatically(true);
        settings.setBuiltInZoomControls(true);

        settings.setJavaScriptEnabled(true);
        settings.setDomStorageEnabled(true);
        settings.setAllowFileAccess(true);
        settings.setAllowContentAccess(true);

        //enable cookies save
        settings.setDomStorageEnabled(true);
        settings.setDatabaseEnabled(true);

        //disable scrollbars
        myWeb.setHorizontalScrollBarEnabled(false);
        myWeb.setVerticalScrollBarEnabled(false);

        //enable geolocation services
        myWeb.getSettings().setGeolocationEnabled(true);

        // Set WebView clients
        myWeb.setWebViewClient(new WebViewClient());

        // Add JavaScript interface
        myWeb.addJavascriptInterface(new WebAppInterface(), "Android");
        myWeb.setWebChromeClient(new WebChromeClient() {
            //override geolocation prompts
            @Override
            public void onGeolocationPermissionsShowPrompt(String origin, GeolocationPermissions.Callback callback) {
                if (ActivityCompat.checkSelfPermission(MainActivity.this, Manifest.permission.ACCESS_FINE_LOCATION) != PackageManager.PERMISSION_GRANTED) {
                    ActivityCompat.requestPermissions(MainActivity.this, new String[]{Manifest.permission.ACCESS_FINE_LOCATION}, LOCATION_PERMISSION_REQUEST_CODE);
                } else {
                    LocationManager locationManager = (LocationManager) getSystemService(Context.LOCATION_SERVICE);
                    Location location = locationManager.getLastKnownLocation(LocationManager.GPS_PROVIDER);
                    if (location != null) {
                        /* String latitude = String.valueOf(location.getLatitude());
                        String longitude = String.valueOf(location.getLongitude());
                        String url = myURL + "?lat=" + latitude + "&long=" + longitude;
                         */
                        myWeb.loadUrl(myURL);
                        callback.invoke(origin, true, true);
                    } else {
                        callback.invoke(origin, false, false);
                    }
                }
                callback.invoke(origin, true, false);
            }
            @Override
            public void onPermissionRequest(PermissionRequest request) {
                if (request.getOrigin().toString().startsWith("https://")) {
                    request.grant(new String[]{Manifest.permission.ACCESS_FINE_LOCATION});
                } else {
                    super.onPermissionRequest(request);
                }
            }
            //display in console javascript errors and warnings
            @Override
            public boolean onConsoleMessage(ConsoleMessage consoleMessage) {
                android.util.Log.d("WebView--> ", consoleMessage.message());
                return true;
            }

            //parameters for file chooser
            public boolean onShowFileChooser(WebView webView,
                                             ValueCallback<Uri[]> filePathCallback,
                                             WebChromeClient.FileChooserParams fileChooserParams) {
                if (MainActivity.this.filePathCallback != null) {
                    MainActivity.this.filePathCallback.onReceiveValue(null);
                }
                MainActivity.this.filePathCallback = filePathCallback;

                Intent intent = fileChooserParams.createIntent();
                try {
                    startActivityForResult(intent, FILE_CHOOSER_REQUEST_CODE);
                } catch (Exception e) {
                    MainActivity.this.filePathCallback = null;
                    Toast.makeText(MainActivity.this, "Cannot open file chooser", Toast.LENGTH_LONG).show();
                    return false;
                }
                return true;
            }
        });
        // Check if location permission is granted
        if (ActivityCompat.checkSelfPermission(this, Manifest.permission.ACCESS_FINE_LOCATION) != PackageManager.PERMISSION_GRANTED) {
            // Request location permission if not granted
            ActivityCompat.requestPermissions(this, new String[]{Manifest.permission.ACCESS_FINE_LOCATION}, LOCATION_PERMISSION_REQUEST_CODE);
        }


    }
    // JavaScript interface for handling blob downloads
    public class WebAppInterface {
        @JavascriptInterface
        public void downloadFile(String base64Data, String fileName, String mimeType) {

            try {
                byte[] data = Base64.decode(base64Data, Base64.DEFAULT);

                // For Android 10+ we use MediaStore API
                if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) {
                    saveFileWithMediaStore(data, fileName, mimeType);
                } else {
                    // Fallback for older versions (though minSdk=31 makes this unreachable)
                    createFileWithSAF(data, fileName, mimeType);
                }
            } catch (Exception e) {
                runOnUiThread(() -> Toast.makeText(MainActivity.this,
                        "Error downloading file", Toast.LENGTH_SHORT).show());
            }
        }
    }

    @RequiresApi(api = Build.VERSION_CODES.Q)
    private void saveFileWithMediaStore(byte[] data, String fileName, String mimeType) {
        try {
            ContentResolver resolver = getContentResolver();
            ContentValues contentValues = new ContentValues();
            contentValues.put(MediaStore.MediaColumns.DISPLAY_NAME, fileName);
            contentValues.put(MediaStore.MediaColumns.MIME_TYPE, mimeType);
            contentValues.put(MediaStore.MediaColumns.RELATIVE_PATH, Environment.DIRECTORY_DOWNLOADS);

            Uri contentUri = MediaStore.Downloads.EXTERNAL_CONTENT_URI;
            Uri uri = resolver.insert(contentUri, contentValues);

            if (uri != null) {
                try (OutputStream outputStream = resolver.openOutputStream(uri)) {
                    if (outputStream != null) {
                        outputStream.write(data);
                        runOnUiThread(() -> {
                            Toast.makeText(this, "File saved to Downloads folder", Toast.LENGTH_LONG).show();
                            // Notify the system about the new file
                            Intent mediaScanIntent = new Intent(Intent.ACTION_MEDIA_SCANNER_SCAN_FILE);
                            mediaScanIntent.setData(uri);
                            sendBroadcast(mediaScanIntent);
                        });
                    }
                }
            } else {
                runOnUiThread(() -> Toast.makeText(this,
                        "Failed to save file", Toast.LENGTH_SHORT).show());
            }
        } catch (Exception e) {
            runOnUiThread(() -> Toast.makeText(this,
                    "Error saving file", Toast.LENGTH_SHORT).show());
        }
    }

    private void createFileWithSAF(byte[] data, String fileName, String mimeType) {
        pendingFileData = data;
        pendingFileName = fileName;
        pendingMimeType = mimeType;

        Intent intent = new Intent(Intent.ACTION_CREATE_DOCUMENT);
        intent.addCategory(Intent.CATEGORY_OPENABLE);
        intent.setType(mimeType);
        intent.putExtra(Intent.EXTRA_TITLE, fileName);
        startActivityForResult(intent, CREATE_FILE_REQUEST_CODE);
    }

    //file chooser override parameters
    @Override
    protected void onActivityResult(int requestCode, int resultCode, @Nullable Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        if (requestCode != FILE_CHOOSER_REQUEST_CODE || filePathCallback == null) {
            return;
        }
        //load file
        Uri[] results = null;
        if (resultCode == Activity.RESULT_OK && data != null) {
            String dataString = data.getDataString();
            if (dataString != null) {
                results = new Uri[]{Uri.parse(dataString)};
            }
        }

        //save file
        if (requestCode == CREATE_FILE_REQUEST_CODE && resultCode == RESULT_OK) {
            if (data != null && data.getData() != null) {
                Uri uri = data.getData();
                saveFileWithSAF(uri, pendingFileData);
            }
        }

        //load file
        filePathCallback.onReceiveValue(results);
        filePathCallback = null;
    }

    private void saveFileWithSAF(Uri uri, byte[] data) {
        try {
            ContentResolver resolver = getContentResolver();
            try (OutputStream outputStream = resolver.openOutputStream(uri)) {
                if (outputStream != null) {
                    outputStream.write(data);
                    runOnUiThread(() -> Toast.makeText(this,
                            "File saved successfully", Toast.LENGTH_LONG).show());
                }
            }
        } catch (Exception e) {
            runOnUiThread(() -> Toast.makeText(this,
                    "Error saving file", Toast.LENGTH_SHORT).show());
        }
    }
}