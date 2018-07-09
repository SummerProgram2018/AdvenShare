
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image} from 'react-native';

export default class ImageBrowser extends Component {

  state = {
  modalVisible: false,
  photos: [],
  index: null
  }

  getPhotos = () => {
    CameraRoll.getPhotos({
      first: 4,
      assetType: 'All' /*Change this line if we want only photos (currently gets video too)*/
    })
    .then(r => this.setState({ photos: r.edges }))
  }

  render() {
    return (

      componentDidMount(){
        this.getPhotos()
        <Image
          style={{
            width: 51,
            height: 51,
            resizeMode: Image.resizeMode.contain,
          }}
          source={{
            this.state.photos
          }}
      }
        />
        </View>
        <View style={styles.container}>
          <View style={styles.list}>
            <Image style={styles.backgroundImage} source={require('../res/cloud.png')}/>
          </View>
          <Text>Image Browser</Text>
        </View>
    );
  }
}

var styles = StyleSheet.create({
  container:{
    flex:1,
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
  list: {
       justifyContent: 'center',
       flexWrap: 'wrap',
       flex:1,
       flexDirection: 'row',
       height: 100,
   },
});
