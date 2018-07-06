/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button} from 'react-native';
import BottomBar from "../navigation";

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class Home extends Component<Props> {
  render() {
    return (
      <Image
        style={{
          backgroundColor: 'transparent',
          flex: 1,
          resizeMode,
          position: 'absolute',
          width: '100%',
          height: '100%',
          justifyContent: 'center',
        }}
        source={}
      >
      <View style={styles.container}>
        <View style={styles.list}>
        </View>
        <Text>Home</Text>
        <BottomBar navigation={this.props.navigation}></BottomBar>
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
   bottomBar: {
       backgroundColor:'gray',
       flexDirection: 'row',
       width: '100%',
       height: 50,
       bottom: 0
   },
   buttons1:{
     backgroundColor:'transparent',
     flex: 1,
   },
   buttons2:{
     backgroundColor:'transparent',
     flex: 1
   },
   buttons3:{
     backgroundColor:'transparent',
     flex: 1
   },
   buttons4:{
     backgroundColor:'transparent',
     flex: 1
   },
   image:{
     width: '100%',
     height: 50,
     resizeMode: 'contain'
  },
});
