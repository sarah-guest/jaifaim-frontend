// IMPORTS HABITUELS
import { Button, StyleSheet, Text, View } from 'react-native';
import { useEffect, useState, useRef } from 'react';
// IMPORTS APPAREIL PHOTO
import { Camera } from 'expo-camera';
import { useIsFocused } from '@react-navigation/native';
import OurButton from '../components/Button';

export default function SnapScreen() {
  const [hasPermission, setHasPermission] = useState(false);
  const isFocused = useIsFocused();
  let cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const takePicture = async () => {
    const photo = await cameraRef.takePictureAsync({ quality: 0.3 });
    console.log(photo);
  };

  if (!hasPermission || !isFocused) {
    return (
      <View style={styles.container}>
        <Text>
          Turn on camera permission to make the most of our app's awesomeness.
          🤎
        </Text>
      </View>
    );
  }

  return (
    <Camera style={styles.camera} ref={(ref) => (cameraRef = ref)}>
      <OurButton icon="camera" color="cannelle" onPress={takePicture} />
    </Camera>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lavender',
  },
  camera: {
    padding: 16,
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});
