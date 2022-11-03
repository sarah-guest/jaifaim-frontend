import { Text } from 'react-native';
import { useState, useEffect } from 'react';
//FONTS LISSAIN ET LATO
import * as Font from 'expo-font';

const fetchFonts = () => {
  return Font.loadAsync({
    Lissain: require('../assets/fonts/Lissain.ttf'),
    LatoBold: require('../assets/fonts/LatoBold.ttf'),
    LatoReg: require('../assets/fonts/LatoRegular.ttf'),
  });
};

export default function Title(props) {
  // On détermine les tailles de typo
  const { h1, h2, h3, h4, h5, h6, isLight, isCentered } = props;

  // Condition pour que le texte s'affiche en blanc (si le fond est sombre)
  const color = isLight && { color: 'white' };
  const textAlign = isCentered && { textAlign: 'center' };

  // On crée un état chargé de vérifier si la font est chargée ou non
  const [fontsLoaded, setFontsLoaded] = useState(false);

  // On charge la font et on set l'état à true
  useEffect(() => {
    async function getFonts() {
      await fetchFonts();
      setFontsLoaded(true);
    }
    getFonts();
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Text
      style={[
        color,
        textAlign,
        h1 && { fontSize: 48, fontFamily: 'Lissain' },
        h2 && { fontSize: 32, fontFamily: 'LatoReg' },
        h3 && { fontSize: 28, fontFamily: 'LatoBold' },
        h4 && { fontSize: 24, fontFamily: 'LatoBold' },
        h5 && { fontSize: 20, fontFamily: 'LatoBold' },
        h6 && { fontSize: 18, fontFamily: 'LatoBold' },
      ]}
    >
      {props.children}
    </Text>
  );
}
