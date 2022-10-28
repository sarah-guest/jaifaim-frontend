import { Text, StyleSheet } from 'react-native';
import { useState, useEffect } from 'react';
import * as Font from 'expo-font';
// FONT LATO
import {
    useFonts,
    Lato_400Regular,
    Lato_400Regular_Italic,
    Lato_700Bold,
    Lato_700Bold_Italic,
} from '@expo-google-fonts/lato';

const fetchFonts = () => {
    return Font.loadAsync({
        'Lissain': require('../assets/fonts/Lissain.ttf'),
    });
};

export default function Title(props) {
    //On détermine les tailles de typo
    const { isLight, h1, h2, h3, h4, h5, h6 } = props;

    //condition pour que le texte s'affiche en blanc (si le fond est sombre)
    const color = isLight && { color: 'white' }

    //On crée un état chargé de vérifier si la font est chargée ou non
    const [LissainLoaded, setLissainLoaded] = useState(false);
    //On charge la font et on set l'état à true
    useEffect(() => {
        async function getFonts() {
            await fetchFonts();
            setLissainLoaded(true);
        }
        getFonts();
    }, []);

    //FONT LATO
    let [LatoLoaded] = useFonts({
        Lato_400Regular,
        Lato_400Regular_Italic,
        Lato_700Bold,
        Lato_700Bold_Italic,
    });


    if (!LatoLoaded) {
        return null;
    }
    else if (!LissainLoaded) {
        return null;
    }

    //Composant
    return (
        <Text
            style={[color,
                h1 && { fontSize: 48, fontFamily: 'Lissain' },
                h2 && { fontSize: 32, fontFamily: 'Lato' },
                h3 && { fontSize: 28, fontFamily: 'Lato' },
                h4 && { fontSize: 24, fontFamily: 'Lato' },
                h5 && { fontSize: 20, fontFamily: 'Lato' },
                h6 && { fontSize: 16, fontFamily: 'Lato' }]}
        >
            {props.children}
        </Text>
    );
}

const styles = StyleSheet.create({
    title: {

    },
});
