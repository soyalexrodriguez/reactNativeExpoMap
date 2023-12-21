import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button } from "react-native";
import MapView, { Marker, Callout } from "react-native-maps";

let locationsOfInterest = [
  {
    title: "First",
    location: {
      latitude: -27.2,
      longitude: 145,
    },
    description: "My first marker",
  },
  {
    title: "Second",
    location: {
      latitude: -30.2,
      longitude: 150,
    },
    description: "My second marker",
  },
];

export default function App() {
  const [count, setCount] = useState(0)
  const [draggableMarker, setDraggableMarker] = useState({
    longitude: 148.11,
    latitude: -26.85,
  });

  const onRegionChange = (region) => {
    console.log(region);
  };

  const showLocationOfInterest = () => {
    return locationsOfInterest.map((item, index) => {
      return (
        <Marker
          key={index}
          coordinate={item.location}
          title={item.title}
          description={item.description}
        />
      );
    });
  };


  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <MapView
        style={styles.map}
        onRegionChange={onRegionChange}
        initialRegion={{
          latitude: -26.852691607783505,
          latitudeDelta: 27.499085419977938,
          longitude: 147.1104129487327,
          longitudeDelta: 15.952148000000022,
        }}
      >
        {showLocationOfInterest()}
        <Marker 
          draggable
          pinColor="#0000ff"
          coordinate={draggableMarker}
          onDragEnd={(e) => setDraggableMarker(e.nativeEvent.coordinate)}
        />
        <Marker pinColor="#00ff00" coordinate={{latitude: -35, longitude: 147 }}>
          <Callout>
            <Text>Count: {count}</Text>
            <Button title="Increment count" onPress={() => setCount(count + 1)} />
            <Button title="Take snapshot and Share" onPress={takeSnapshotAndShare} />
          </Callout>
        </Marker>
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  mapOverlay: {
    position: "absolute",
    bottom: 50,
    backgroundColor: "white",
    borderWidth: 2,
    borderRadius: 5,
    padding: 16,
    left: "25%",
    width: "50%",
    textAlign: "center",
  },
});
