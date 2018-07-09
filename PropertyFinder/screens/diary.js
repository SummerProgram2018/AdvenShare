/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image, TextInput, Button, TouchableOpacity} from 'react-native';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

class AddPlace extends Component {
  constructor (props, context) {
    super (props, context);
    this.state = {
      city: ''
    };

  render () {
    return (
      <button
        title = 'Manually Change location'
        onPress={this.navigate}
    />
    )
  }
}

class DiaryTextInput extends Component{
  render () {
    return (
      <TextInput
      {...this.props} //Inherit any properties passed
      editable = {true}
      maxLength = {100}
      multiline = {true}
      numberOfLines = {10}
      />
    );
  }
}



export default class Diary extends Component<Props> {
  constructor (props, context) {
    super (props, context);
    this.state = {
      text: 'Enter your diary text here',
      savedText: '',
    };
    onPressLearnMore = this.onPressLearnMore.bind(this)
  }
  onPressLearnMore() {
    this.setState({savedText: this.state.savedText + this.state.text + "\n"});
  }

  render () {
    return (
      <View style={styles.container}>
        <Image style={styles.backgroundImage} source={require('../res/cloud.png')}/>
        <TextInput
          blurOnSubmit = {false}
          style = {{height: 80, width: 320, borderColor: 'blue', borderWidth: 1}}
          onChangeText = {(text) => this.setState({text})}
          value = {this.state.text}
        />
        <View style={styles.diaryView}>
        <Button
          title = "Save Entry"
          color = "#841584"
          onPress={onPressLearnMore}
          />
        <Text style={{backgroundColor: 'transparent'}}> {this.state.savedText} </Text>
        </View>
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
   diaryView: {
     flex:1,
     backgroundColor:'transparent',
   },
});
