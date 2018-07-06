/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button} from 'react-native';
import {TabBarBottom, createStackNavigator} from 'react-navigation';
import Home from "./screens/home";
import BasicInfo from "./screens/basicInfo";
import MyDiary from "./screens/myDiary";
import Chat from "./screens/chat";
import Plan from "./screens/plan";


const RootStack = createStackNavigator(
  {
    Home: Home,
    BasicInfo: BasicInfo,
    MyDiary: MyDiary,
    Chat: Chat,
    Plan: Plan,
  },
  {
    initialRouteName: "Home",
    navigationOptions: {
      header: null,
      tabBarVisible: false
    }
  }
);


export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}
    /*
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to React Native!</Text>
        <Text style={styles.instructions}>Farking Christ, edit App.js</Text>
        <Text style={styles.instructions}></Text>
        <Routes />
      </View>
    );*/


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  image:{
    width: '100%',
    height: 60,
    resizeMode: 'contain'
  },
});
