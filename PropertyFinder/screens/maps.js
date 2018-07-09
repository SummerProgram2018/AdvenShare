/*Code for importing code for the maps API
* You will need to install the react-native-maps
* Here is a link to a tutorial on installing the necessary packages
* https://itnext.io/install-react-native-maps-with-gradle-3-on-android-44f91a70a395 */

import React, { Component } from 'react'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'
import { View, StyleSheet } from 'react-native'

class MapTest extends Component {
  render () {
    return (
      /* This should hopefully just open a map*/
      <View style={styles.container}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          region={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}
        ></MapView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: { ... StyleSheet.absoluteFillObject },
  map: { ...StyleSheet.absoluteFillObject }
})
export default MapTest
