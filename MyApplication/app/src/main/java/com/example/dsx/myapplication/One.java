package com.example.dsx.myapplication;

import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.EditText;

public class One extends AppCompatActivity implements View.OnClickListener {

    EditText editText;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.one);
        editText = findViewById(R.id.editText1);
        findViewById(R.id.button).setOnClickListener(this);
    }


    @Override
    public void onClick(View v) {
        switch (v.getId()){
            case R.id.button:{
                String city = editText.getText().toString();
                Intent intent = new Intent(One.this,MainActivity.class);
                intent.putExtra("city",city);              // 城市名称
                startActivity(intent);
            }
        }
    }
}