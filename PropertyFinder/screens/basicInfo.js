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
/*
type Props = {};
export default class BasicInfo extends React.Component {
  constructor(props, context) {
      super(props, context)
      this.state = {weather: ""};
      this.showWeather = this.showWeather.bind(this)
  }

  showWeather() {
    this.setState({weather: "Sunny"});
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.list}>
        </View>
        <View style={styles.bottomBar}>
          <View style={styles.buttons1}>
            <TouchableOpacity>
                <Image
                  style={styles.image}
                  source={require('../res/number1.png')}
                  resizeMode="contain"
                />
            </TouchableOpacity>
          </View>
          <View style={styles.buttons2}>
            <TouchableOpacity>
                <Image
                  style={styles.image}
                  source={require('../res/number2.png')}
                />
            </TouchableOpacity>
          </View>
          <View style={styles.buttons3}>
            <TouchableOpacity>
                <Image
                  style={styles.image}
                  source={require('../res/number3.png')}
                />
            </TouchableOpacity>
          </View>
          <View style={styles.buttons4}>
            <TouchableOpacity style={styles.btn}>
                <Image
                  style={styles.image}
                  source={require('../res/number4.png')}
                />
            </TouchableOpacity>
          </View>
        </View>
    );
  }
}
*/

export default class BasicInfo extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.list}>
          <Image style={styles.backgroundImage} source={require('../res/cloud.png')}/>
        </View>
        <Text>Basic Info</Text>
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
   backgroundImage:{
     backgroundColor: 'transparent',
     flex: 1,
     resizeMode: 'contain',
     position: 'absolute',
     width: '100%',
     height: '100%',
     justifyContent: 'center',
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

/* const styles = StyleSheet.create({
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
}); */
