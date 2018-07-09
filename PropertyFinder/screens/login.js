/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */


import React, {Component} from 'react';
import {Platform, StyleSheet, Text, Dimensions, View, Image, TextInput, TouchableOpacity} from 'react-native';
import {NavigationButton} from "../navigation";

class Inputs extends Component {
  state = {
      username: '',
      password: ''
   }

   //Updated onChangeText, displays input
   handleUsername = (text) => {
      this.setState({ username: text })
   }

   //Updated onChangeText, displays input
   handlePassword = (text) => {
      this.setState({ password: text })
   }

   //Updated onPress of Submit, interface with Fireba
   login = (user, pass) => {
     this.setState({ username: ''}) //Not working
     this.setState({ password: ''}) //Not working
     alert('Username: ' + user + ' password: ' + pass)
   }
  render() {
    return (
      <View style = {styles.container}>
            <TextInput style = {styles.input}
               underlineColorAndroid = "#ffffff"
               placeholder = "Username"
               placeholderTextColor = "#749ced"
               autoCapitalize = "none"
               buttonColor = "#ffffff"
               onChangeText = {this.handleUsername}/>

            <TextInput style = {styles.input}
               underlineColorAndroid = "#ffffff"
               placeholder = "Password"
               placeholderTextColor = "#749ced"
               autoCapitalize = "none"
               buttonColor = "#ffffff"
               secureTextEntry = {true}
               onChangeText = {this.handlePassword}/>

            <TouchableOpacity
               style = {styles.submitButton}
               onPress = {
                  () => this.login(this.state.username, this.state.password)
               }
             >
            <Text
               style = {styles.submitButtonText, color = "#666666"}>
               Submit </Text>
            </TouchableOpacity>
         </View>
    );
  }
}


export default class Login extends Component {
  render() {
    return (
        <View style={styles.container}>
          <Image style={styles.backgroundImage} source={require('../res/loginBackground.png')}/>
          <View style = {styles.advenShareLogo}>
            <Image source ={require('../res/AdvenShare.jpg')} style={styles.logo}/>
          </View>
          <View style = {styles.logInTextBox}>
            <Text style= {styles.logInText}>
            LOG IN
            </Text>
          </View>
          <View style = {styles.logInEntry}>
            <Inputs/>
          </View>
          <View style = {styles.additionalLinks}>
          </View>
          <View style = {styles.placeHolder}/>
        </View>
    );
  }
}

var styles = StyleSheet.create({
  container:{
    flex:10,
  },
  backgroundImage:{
    backgroundColor: 'transparent',
    resizeMode: 'contain',
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
  list: {
    justifyContent: 'center',
    flexWrap: 'wrap',
    flex:1,
    flexDirection: 'row',
    height: 100,
   },
   advenShareLogo: {
    flex: 10,
    width: "100%",
    marginTop: 20,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignContent: 'center'
   },
   logo: {
     resizeMode: 'contain',
     justifyContent: 'center',
     width: "100%",
     flex: 1
   },
   logInTextBox: {
    flex: 5,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    width: "100%",
    alignContent: 'center'
   },
   logInText: {
     textAlign: 'center',
     color: '#000000',
     fontSize: 20,
   },
   logInEntry: {
    flex: 15,
    backgroundColor: "#6dbfeb",
    justifyContent: 'center',
    resizeMode: 'contain'
   },
   additionalLinks: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'center'
  },
  placeHolder: {
    flex: 20
  }
});
