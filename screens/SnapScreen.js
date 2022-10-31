// IMPORTS HABITUELS
import { Image, StyleSheet, Text, View } from 'react-native';
import { useEffect, useState, useRef } from 'react';
// IMPORTS APPAREIL PHOTO
import { Camera } from 'expo-camera';
import { useIsFocused } from '@react-navigation/native';
import OurButton from '../components/Button';
// IMPORTS REDUCER
import { useDispatch, useSelector } from 'react-redux';
import {
  clearPlatdujourPhoto,
  setPlatdujourPhoto,
} from '../reducers/temporary';

export default function SnapScreen({ navigation }) {
  const [hasPermission, setHasPermission] = useState(false);
  const isFocused = useIsFocused();
  let cameraRef = useRef(null);
  const temporary = useSelector((state) => state.temporary.value);
  const dispatch = useDispatch();

  // Demande de consentement appareil photo
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  // Lors de la prise de photo, ma photo est stockée dans le reducer temporary.platdujourPhoto
  const takePicture = async () => {
    const photo = await cameraRef.takePictureAsync({ quality: 0.3 });
    dispatch(setPlatdujourPhoto(photo));
  };

  // Dès que le reducer temporary contient une photo de plat du jour, la montrer.
  // --- bouton "rotate-right": le reducer temporary.platdujourPhoto est cleared, entraînant un rerender qui return la camera
  // --- bouton "check": redirection vers le screen pdjForm
  if (temporary.platdujourPhoto) {
    const imgSource = temporary.platdujourPhoto;
    return (
      <View style={styles.container}>
        <Image style={styles.image} source={imgSource} />
        <View style={styles.buttons}>
          <OurButton
            icon="rotate-right"
            onPress={() => dispatch(clearPlatdujourPhoto())}
            color="cannelle"
          />
          <OurButton
            icon="check"
            onPress={() => navigation.navigate('PdjForm')}
            color="cannelle"
          />
        </View>
      </View>
    );
  }
  // Sinon
  else if (!hasPermission || !isFocused) {
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
      <View style={styles.snapButton}>
        <OurButton icon="camera" color="cannelle" onPress={takePicture} />
      </View>
    </Camera>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  camera: {
    padding: 16,
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  buttons: {
    width: 400,
    flexDirection: 'row',
    justifyContent: 'space-around',
    position: 'absolute',
    bottom: 100,
  },
  image: {
    height: 800,
    width: 400,
  },
  snapButton: {
    position: 'absolute',
    bottom: 100,
    zIndex: 2,
  },
});
