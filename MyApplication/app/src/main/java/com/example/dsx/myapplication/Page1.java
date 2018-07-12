package com.example.dsx.myapplication;

import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.webkit.WebChromeClient;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.Button;
import android.widget.EditText;

public class Page1 extends AppCompatActivity implements View.OnClickListener{

    Button b1;
    WebView wv;
    EditText ed;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.page1);
        init();

    }

    void init(){
        b1=(Button)findViewById(R.id.query);
        ed = findViewById(R.id.city);
        Intent intent = getIntent();
        ed.setText(intent.getStringExtra("city"));
        wv=(WebView)findViewById(R.id.wv);
        b1.setOnClickListener(this);
        wv.getSettings().setJavaScriptEnabled(true);/////设置支持javascript
        wv.setWebChromeClient(new WebChromeClient());////处理javascript对话框
        wv.setWebViewClient(new WebViewClient());/////处理各种通知请求事件，如果不用该语句，将使用内置浏览器访问网页
//        wv.loadUrl("http://m.weather.com.cn/m/pn12/weather.htm");
        wv.loadUrl("http://m.weather.com.cn/m/pn12/weather.htm");
        //   wv.setInitialScale(57*4);把网页内容放大4倍
    }

    @Override
    public void onClick(View v) {  //http://m.weather.com.cn/mweather/101010100.shtml
        switch(v.getId()){
            case R.id.query: {
                String city = ed.getText().toString();
                if(city.equals("北京")){
                    openUrl("101010100");
                }
                if(city.equals("上海")){
                    openUrl("101020100");
                }
                if(city.equals("天津")){
                    openUrl("101030100");
                }
                if(city.equals("沈阳")){
                    openUrl("101070101");
                }
                if(city.equals("dalian")){
                    openUrl("101070201");
                }
            }
        }
    }
    public void openUrl(String id){
        wv.loadUrl("http://m.weather.com.cn/mweather/" + id + ".shtml");
    }
}
