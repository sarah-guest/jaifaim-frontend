import { Text, StyleSheet } from 'react-native';
import { useState, useEffect } from 'react';
import * as Font from 'expo-font';

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
    const [fontsLoaded, setFontsLoaded] = useState(false);
    //On charge la font et on set l'état à true
    useEffect(() => {
        async function getFonts() {
            await fetchFonts();
            setFontsLoaded(true);
        }
        getFonts();
    }, []);

    //Composant
    if (!fontsLoaded || fontsLoaded) {
        return (
            <Text
                style={[styles.title,
                    color,
                h1 && { fontSize: 48 },
                h2 && { fontSize: 32 },
                h3 && { fontSize: 28 },
                h4 && { fontSize: 24 },
                h5 && { fontSize: 20 },
                h6 && { fontSize: 16 }]}
            >
                {props.children}
            </Text>
        );
    }
}

const styles = StyleSheet.create({
    title: {
        fontFamily: 'Lissain'
    },
});
