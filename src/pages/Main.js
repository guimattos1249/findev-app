import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, View, Text, TextInput } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location';

function Main({ navigation }) {
  const [currentRegion, setCurrentRegion] = useState(null);

  useEffect(() => {
    async function loadInitalPosition() {
      const { granted } = await requestPermissionsAsync();

      if(granted) {
        const { coords } = await getCurrentPositionAsync({
          enableHighAccuracy: true,
        });

        const { latitude, longitude } = coords;

        setCurrentRegion({
          latitude,
          longitude,
          latitudeDelta: 0.04,
          longitudeDelta: 0.04,
        });
      }
    }
    loadInitalPosition();
  }, []);

  if(!currentRegion) {
    return null;
  }

  return (
    <>
      <MapView 
        initialRegion={currentRegion} 
        style={styles.map}>
        <Marker coordinate={{ latitude: -22.4743378, longitude: -48.9757239 }}>
          <Image style={styles.avatar} source={{uri: 'https://avatars0.githubusercontent.com/u/50272051?s=460&v=4'}} />
          
          <Callout onPress={() => {
            navigation.navigate('Profile', { github_username: 'guimattos1249' });
          }}>
            <View style={styles.callout}>
              <Text style={styles.devName}>Guilherme Mattos</Text>
              <Text style={styles.devBio}>Computer Science student and Dev.</Text>
              <Text style={styles.devTechs}>C++, Node.Js, React-Native</Text>
            </View>
          </Callout>
        </Marker>
      </MapView>
    </>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },

  avatar: {
    width: 54,
    height: 54,
    borderRadius: 4,
    borderWidth: 4,
  },

  callout: {
    width: 260,
  },

  devName: {
    fontWeight: 'bold',
    fontSize: 16,
  },

  devBio: {
    color: '#666',
    marginTop: 5,
  },

  devTechs: {
    marginTop: 5,
  },

});

export default Main;