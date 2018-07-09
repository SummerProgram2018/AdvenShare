/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image, TextInput, Button,
  TouchableOpacity, AppRegistry, TouchableHighlight, Modal, CameraRoll,
  Dimensions, ScrollView} from 'react-native';

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

class PhotoBrowse extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Button
            title='Browse Images'
            onPress={() => this.props.navigation.navigate('ImageBrowser')}
        />
      </View>
    )
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
          <PhotoBrowse navigation={this.props.navigation}/>
          <View style={styles.list}>
              <TextInput
                editable = {true}
                autoFocus = {true}
                blurOnSubmit = {false}
                style = {{height: 80, width: 320, borderColor: 'blue', borderWidth: 1}}
                onChangeText = {(text) => this.setState({text})}
                value = {this.state.text}
              />
            <Image style={styles.backgroundImage} source={require('../res/cloud.png')}/>
          </View>
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
