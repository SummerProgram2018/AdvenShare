/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

 // Sorry for the comments - feel free to delete in your version

import React, {Component} from 'react';
import {TouchableOpacity,
        Image,
        Platform,
        StyleSheet,
        Text,
        View,
        Button} from 'react-native';
import BottomBar from "../navigation";

// constant for all
const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});



//<Me name="Hannah"/>
//this.props.name
class MeMap extends Component {
  render(){
    return (
      <View style={styles.list}>
        <Image style={styles.mapImage} source={require('../res/map.png')}/>
          <View style = {styles.overlay}>
            <Image style = {styles.meIcon} source = {require('../res/meavatar.png')} />
            <Text style = {styles.avatarText}>Hannah Jury</Text>
            <TouchableOpacity style={styles.optionsView} onPress={()=>{alert("Location services are unavailable :)")}}>
              <Image style={styles.locationImage} source={require('../res/icons/About.png')}/>
              <Text style={styles.locationText}>Your Location</Text>
            </TouchableOpacity>
          </View>
      </View>
    )
  }
}
export default class Me extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {text: ""}
  }
  // actually puts stuff on the app
  render() {
    return (
        <View style={styles.container}>

          <MeMap/>


          <View styles={styles.buttonList}>
            <TouchableOpacity style={styles.optionsView} onPress={()=>{alert("You have no plans today you loser :)")}}>
              <Image style={styles.image} source={require('../res/icons/Itin.png')}/>
              <Text style={styles.buttonText}>My Itinerary</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.optionsView} onPress={()=>{alert("No one cares :)")}}>
              <Image style={styles.image} source={require('../res/icons/About.png')}/>
              <Text style={styles.buttonText}>About</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.optionsView} onPress={()=>{alert("You have no friends :)")}}>
              <Image style={styles.image} source={require('../res/icons/star.png')}/>
              <Text style={styles.buttonText}>Favourites</Text>
            </TouchableOpacity>
          </View>

        </View>
    );
  }
}

var styles = StyleSheet.create({
  container:{
    backgroundColor: 'rgb(256, 256, 256)',
    flex:1,
//    alignItems: 'center',
  },

  buttonList: {
    flex:1,
  },

  list: {
       justifyContent: 'center',
       flexWrap: 'wrap',
       flex:1,
   },

   mapImage:{
     backgroundColor: 'rgb(256, 256, 256)',
     flex: 2,
     flexGrow:1,
     resizeMode: 'contain',
     position: 'absolute',
     width: '100%',
     height: '100%',
     justifyContent: 'center',
   },

   optionsView: {
    backgroundColor: 'transparent',
    borderRadius: 20,
    padding: 10,
    marginBottom: 20,
    flexDirection: 'row',
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    shadowOpacity: 0.35,
    width: '100%'
   },

   image: {
     justifyContent: 'center',
     height: 30,
     resizeMode:"contain",
     padding: 20,
   },

   locationImage: {
     flex:1,
     flexDirection: 'row',
     height: 18,
     resizeMode:"contain",
  //   margin: 10 0 0 0,
   },


   buttonText: {
    flex:1,
    textAlign: 'center', // <-- the magic
    fontWeight: 'bold',
    color: 'rgb(116, 156, 237)',
    fontSize: 28,
    marginTop: 0,
    width: "100%",
  },

  avatarText: {
   textAlign: 'center', // <-- the magic
   fontWeight: 'bold',
   color: 'rgb(116, 156, 237)',
   fontSize: 28,
   width: "100%",
  },

  locationText: {
   flex:2,
   fontWeight: 'bold',
   color: 'rgb(116, 156, 237)',
   fontSize: 20,

  },

   overlay: {
     backgroundColor: 'transparent'
   },

   meIcon: {
     justifyContent: 'center',
     height: 150,
     alignItems: 'center',
     resizeMode:"contain",
     padding: 20,
     width: "100%"
   },
});
