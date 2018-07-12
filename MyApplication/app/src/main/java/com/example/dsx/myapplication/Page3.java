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
import android.widget.EditText;
import android.widget.ImageButton;

public  class Page3 extends AppCompatActivity {
      Button btn1;
      ImageButton btn2;
//    Button b1;
//    WebView wv;
//    EditText ed;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.page3);
        btn1=findViewById(R.id.button4);
       btn2=findViewById(R.id.imageButton7);

       btn1.setOnClickListener(new View.OnClickListener(){
            @Override
            public void onClick(View v){
                Uri uri = Uri.parse("http://booking.com/");
                Intent intent = new Intent(Intent.ACTION_VIEW, uri);
                startActivity(intent);
                //   Intent intent = new Intent(MainActivity.this, Page4.class);
                startActivity(intent);
            }
        });
        btn2.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(Page3.this, Page9.class);
                startActivity(intent);
            }

        });


//        init();

    }

//    void init(){
//        b1=(Button)findViewById(R.id.query);
//        ed = findViewById(R.id.city);
//        Intent intent = getIntent();
//        ed.setText(intent.getStringExtra("city"));
//        wv=(WebView)findViewById(R.id.wv);
//        b1.setOnClickListener(this);
//        wv.getSettings().setJavaScriptEnabled(true);/////设置支持javascript
//        wv.setWebChromeClient(new WebChromeClient());////处理javascript对话框
//        wv.setWebViewClient(new WebViewClient());/////处理各种通知请求事件，如果不用该语句，将使用内置浏览器访问网页
//        wv.loadUrl("http://booking.com");
//        //   wv.setInitialScale(57*4);把网页内容放大4倍
//    }
}
