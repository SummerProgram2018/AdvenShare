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

import Share from 'react-native-share'
import RNFetchBlob from 'react-native-fetch-blob'

let styles
const { width } = Dimensions.get('window')

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

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

AppRegistry.registerComponent('rncameraroll, () => Navigation');

class PhotoBrowse extends Component<Props> {

  static navigationOptions = {
      title: 'Camera Roll'
    }

    state = {
    modalVisible: false,
    photos: [],
    index: null
  }

  setIndex = (index) => {
    if (index === this.state.index) {
      index = null
    }
    this.setState({ index })
  }

  getPhotos = () => {
    CameraRoll.getPhotos({
      first: 4,
      assetType: 'All' /*Change this line if we want only photos (currently gets video too)*/
    })
    .then(r => this.setState({ photos: r.edges }))
  }

  toggleModal = () => {
    this.setState({ modalVisible: !this.state.modalVisible });
  }

  navigate = () => {
      const { navigate } = this.props.navigation
      navigate('ImageBrowser')
    }

    share = () => {
        const image = this.state.photos[this.state.index].node.image.uri
        RNFetchBlob.fs.readFile(image, 'base64')
        .then((data) => {
          let shareOptions = {
            title: "My Day Photo",
            message: "Check out this photo!",
            url: `data:image/jpg;base64,${data}`,
            subject: "Check out what I did today!"
          }
        }
      }
      render() {
        return (
          <View style={styles.container}>
            <Text style={styles.welcome}>Welcome to React Native!</Text>
            <Text style={styles.instructions}>Farking Christ, edit App.js</Text>
            <Text style={styles.instructions}>{instructions}</Text>
          </View>
          <Button
              title='Browse Images'
              onPress={this.navigate}
            />
          <Modal
              animationType={"slide"}
              transparent={false}
              visible={this.state.modalVisible}
              onRequestClose={() => console.log('closed')}
            >
            <View style={styles.modalContainer}>
                <Button
                  title='Close'
                  onPress={this.toggleModal}
                />
                <ScrollView
                  contentContainerStyle={styles.scrollView}>
                  {
                    this.state.photos.map((p, i) => {
                      return (
                        <TouchableHighlight
                          style={{opacity: i === this.state.index ? 0.5 : 1}}
                          key={i}
                          underlayColor='transparent'
                          onPress={() => this.setIndex(i)}
                        >
                          <Image
                            style={{
                              width: width/3,
                              height: width/3
                            }}
                            source={{uri: p.node.image.uri}}
                          />
                        </TouchableHighlight>
                      )
                 })
               }
               </ScrollView>
                {
                  this.state.index !== null  && (
                    <View style={styles.shareButton}>
                      <Button
                          title='Share'
                          onPress={this.share}
                        />
                    </View>
                  )
                }
              </View>
            </Modal>
          </View>

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
