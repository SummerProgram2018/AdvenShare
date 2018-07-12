package com.example.dsx.myapplication;

import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.webkit.WebChromeClient;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.Button;
import android.widget.ImageView;

public class Page2 extends AppCompatActivity {
    ImageView im1, im2, im3, im4, im5, im6;

    //    WebView wv;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.page8);

        im1 = findViewById(R.id.im1);
        im2 = findViewById(R.id.im2);
        im3 = findViewById(R.id.im3);
        im4 = findViewById(R.id.im4);
        im5 = findViewById(R.id.im5);
        im6 = findViewById(R.id.im6);
//        Intent intent = getIntent();
//        wv=(WebView)findViewById(R.id.wv);
//        wv.getSettings().setJavaScriptEnabled(true);/////设置支持javascript
//        wv.setWebChromeClient(new WebChromeClient());////处理javascript对话框
//        wv.setWebViewClient(new WebViewClient());/////处理各种通知请求事件，如果不用该语句，将使用内置浏览器访问网页
////        wv.loadUrl("http://m.weather.com.cn/m/pn12/weather.htm");
//        wv.loadUrl("http://m.weather.com.cn/m/pn12/weather.htm");
//        //   wv.setInitialScale(57*4);把网页内容放大4倍
        im1.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Uri uri = Uri.parse("https://flight.qunar.com/?kwid=220|2742054419&cooperate=baidu50");
                Intent intent = new Intent(Intent.ACTION_VIEW, uri);
                startActivity(intent);
                //   Intent intent = new Intent(MainActivity.this, Page4.class);
                startActivity(intent);
            }

        });
        im2.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Uri uri = Uri.parse("https://www.01zhuanche.com/");
                Intent intent = new Intent(Intent.ACTION_VIEW, uri);
                startActivity(intent);
                //   Intent intent = new Intent(MainActivity.this, Page4.class);
                startActivity(intent);
            }

        });
        im3.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Uri uri = Uri.parse("http://m.elongstatic.com/static/webapp/train/website/train.html");
                Intent intent = new Intent(Intent.ACTION_VIEW, uri);
                startActivity(intent);
                //   Intent intent = new Intent(MainActivity.this, Page4.class);
                startActivity(intent);
            }

        });
        im4.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Uri uri = Uri.parse("https://www.didiglobal.com/");
                Intent intent = new Intent(Intent.ACTION_VIEW, uri);
                startActivity(intent);
                //   Intent intent = new Intent(MainActivity.this, Page4.class);
                startActivity(intent);
            }

        });
        im5.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Uri uri = Uri.parse("https://www.costachina.com/?mz_ca=2080769&mz_sp=7F30R&mz_kw=9387019&mz_sb=1");
                Intent intent = new Intent(Intent.ACTION_VIEW, uri);
                startActivity(intent);
                //   Intent intent = new Intent(MainActivity.this, Page4.class);
                startActivity(intent);
            }

        });
        im6.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Uri uri = Uri.parse("http://www.ofo.so/");
                Intent intent = new Intent(Intent.ACTION_VIEW, uri);
                startActivity(intent);
                //   Intent intent = new Intent(MainActivity.this, Page4.class);
                startActivity(intent);
            }

        });


//
//    @Override
//    public void onClick(View view) {
//        switch (view.getId()) {
//            case R.id.im1: {
//                openUrl("101070201");
//            }
//            case R.id.im2: {
//                openUrl("101070201");
//            }
//            case R.id.im3: {
//                openUrl("101070201");
//            }
//            case R.id.im4: {
//                openUrl("101070201");
//            }
//            case R.id.im5: {
//                openUrl("101070201");
//            }
//            case R.id.im6: {
//                openUrl("101070201");
//            }
//        }
//
//    }
//    public void openUrl(String id){
//        wv.loadUrl("http://www.elong.com/?semid=ppzqbaidu" + id + ".shtml");
//    }
    }
}
