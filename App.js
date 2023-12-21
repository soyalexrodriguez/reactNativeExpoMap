import { StatusBar } from "expo-status-bar";
import { useRef, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import MapView, { Callout, Marker, Overlay } from "react-native-maps";
import * as FileSystem from "expo-file-system";
import { shareAsync } from "expo-sharing";

// npx expo install react-native-maps
// npx expo install expo-sharing
// npx expo install expo-file-system

let locationsOfInterest = [
  {
    title: "First",
    location: {
      latitude: -27.2,
      longitude: 145,
    },
    description: "My First Marker",
  },
  {
    title: "Second",
    location: {
      latitude: -30.2,
      longitude: 150,
    },
    description: "My Second Marker",
  },
];

export default function App() {
  const [count, setCount] = useState(0);
  const [draggableMarkerCoord, setDraggableMarkerCoord] = useState({
    longitude: 148.11,
    latitude: -26.85,
  });

  const onRegionChange = (region) => {
    console.log(region);
  };

  const showLocationsOfInterest = () => {
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
      <MapView
        style={styles.map}
        onRegionChange={onRegionChange}
        initialRegion={{
          latitude: -26.852691607783505,
          latitudeDelta: 27.499085419977938,
          longitude: 148.1104129487327,
          longitudeDelta: 15.952148000000022,
        }}
      >
        {showLocationsOfInterest()}
        <Marker
          draggable
          pinColor="#0000ff"
          coordinate={draggableMarkerCoord}
          onDragEnd={(e) => setDraggableMarkerCoord(e.nativeEvent.coordinate)}
        />
        <Marker
          pinColor="#00ff00"
          coordinate={{ latitude: -35, longitude: 147 }}
        ></Marker>
      </MapView>
      <Callout style={styles.mapOverlay}>
        <Text>Count: {count}</Text>
        <Button title="Increment Count" onPress={() => setCount(count + 1)} />
      </Callout>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: "100%",
    height: "100%",
  },
  mapOverlay: {
    position: "absolute",
    bottom: 50,
    backgroundColor: "#ffffff",
    borderWidth: 2,
    borderRadius: 5,
    padding: 16,
    left: "25%",
    width: "50%",
    textAlign: "center",
  },
});
