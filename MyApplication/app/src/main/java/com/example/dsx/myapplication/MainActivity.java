package com.example.dsx.myapplication;

import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.View;


public class MainActivity extends AppCompatActivity implements View.OnClickListener{

    String city;    // 城市名称

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        findViewById(R.id.imageButton).setOnClickListener(this);
        findViewById(R.id.imageButton2).setOnClickListener(this);
        findViewById(R.id.imageButton3).setOnClickListener(this);
        findViewById(R.id.imageButton4).setOnClickListener(this);
        findViewById(R.id.imageButton5).setOnClickListener(this);
        findViewById(R.id.imageButton6).setOnClickListener(this);
        //加567的监听，同上，复制，id别错了

        Intent intent = getIntent();
        city = intent.getStringExtra("city");              // 城市名称
    }

    @Override
    public void onClick(View v){

        switch(v.getId()){
            case  R.id.imageButton:{
                Intent intent = new Intent(MainActivity.this, Page1.class);
                intent.putExtra("city",city);
                startActivity(intent);
                break;
            }
            case  R.id.imageButton2:{
                Intent intent = new Intent(MainActivity.this, Page2.class);
                startActivity(intent);
                break;
            }
            case  R.id.imageButton3:{


            Intent intent = new Intent(MainActivity.this, Page3.class);
                startActivity(intent);
                break;
            }
            case  R.id.imageButton4:{

                Uri uri = Uri.parse("http://hl.anseo.cn/");
                Intent intent = new Intent(Intent.ACTION_VIEW, uri);
                startActivity(intent);
                //   Intent intent = new Intent(MainActivity.this, Page4.class);
                startActivity(intent);
                break;
            }
            case  R.id.imageButton5:{
                Intent intent = new Intent(MainActivity.this, Page4.class);
                startActivity(intent);
                break;
            }
            case  R.id.imageButton6:{
                Intent intent = new Intent(MainActivity.this, One.class);
                startActivity(intent);
                break;
            }

            }

            //加567的跳转
            /**************

              case  R.id.imageButton4:{
                Intent intent = new Intent(MainActivity.this, Page4.class);
                startActivity(intent);
                break;
            }
             ***************/


        }
    }
