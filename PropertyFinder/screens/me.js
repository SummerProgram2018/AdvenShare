/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {TouchableOpacity, Image, Platform, StyleSheet, Text, View, Button} from 'react-native';
import BottomBar from "../navigation";

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});


export default class Me extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {text: ""}
  }
  render() {
    return (
        <View style={styles.container}>
          <View style={styles.list}>
            <Image style={styles.backgroundImage} source={require('../res/cloud.png')}/>
          </View>
          <Text>Basic Info</Text>
        </View>
    );
  }
}

var styles = StyleSheet.create({
  container:{
    flex:1,
  },
  list: {
       justifyContent: 'center',
       flexWrap: 'wrap',
       flex:1,
       flexDirection: 'row',
       height: 100,
   },
   backgroundImage:{
     backgroundColor: 'transparent',
     flex: 1,
     resizeMode: 'contain',
     position: 'absolute',
     width: '100%',
     height: '100%',
     justifyContent: 'center',
   },
});