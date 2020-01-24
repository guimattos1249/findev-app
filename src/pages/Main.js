import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, View, Text, TextInput, TouchableOpacity } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location';
import { MaterialIcons } from '@expo/vector-icons';

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

      <View style={styles.searchFrom}>
          <TextInput 
            style={styles.searchInput}
            placeholder="Buscar devs por techs..."
            placeholderTextColor="#999"
            autoCapitalize="words"
            autoCorrect={false}
          />

          <TouchableOpacity onPress={() => {}} style={styles.loadButton}>
            <MaterialIcons name="my-location" size={20} color="#FFF" />
          </TouchableOpacity>
      </View>
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

  searchFrom: {
    position: 'absolute',
    top: 20,//TODO deixar no bottom e fazer o form subir
    left: 20,
    right: 20,
    zIndex: 5,
    flexDirection: 'row',
  },

  searchInput: {
    flex: 1,
    height: 50,
    backgroundColor: '#FFF',
    borderRadius: 25,
    paddingHorizontal: 20,
    fontSize: 16,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 4,
      height: 4,
    },
    elevation: 3,
  },

  loadButton: {
    width: 50,
    height: 50,
    backgroundColor: '#8E4DFF',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 15,
  }

});

export default Main;