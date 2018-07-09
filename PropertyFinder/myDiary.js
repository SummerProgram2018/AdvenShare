/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, AppRegistry, TouchableHighlight,
Modal, Button, CameraRoll, Image, Dimensions, ScrollView} from 'react-native';

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

const Navigation = StackNavigator({
  App: { screen: App},
  ImageBrowser: { screen: ImageBrowser}
});

AppRegistry.registerComponent('rncameraroll, () => Navigation');



type Props = {};
export default class App extends Component<Props> {

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
});
