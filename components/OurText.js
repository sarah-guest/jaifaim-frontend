import { Text, StyleSheet } from 'react-native';
import { useState, useEffect } from 'react';
// FONTS LATO
import * as Font from 'expo-font';
const fetchFonts = () => {
    return Font.loadAsync({
        'LatoBold': require('../assets/fonts/LatoBold.ttf'),
        'LatoReg': require('../assets/fonts/LatoRegular.ttf'),
    });
};

export default function OurText(props) {
    const { subtitle, body1, body2, isLight } = props;

    //condition pour que le texte s'affiche en blanc (si le fond est sombre)
    const color = isLight && {
        color: 'white'
    }

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

    if (!fontsLoaded) {
        return null;
    }

    return (
        <Text style={[color,
            subtitle && { fontFamily: 'LatoBold', fontSize: 20, },
            body1 && { fontFamily: 'LatoReg', fontSize: 20, },
            body2 && { fontFamily: 'LatoReg', fontSize: 16, },
        ]}>
            {props.children}
        </Text>
    );
}

const styles = StyleSheet.create({
});
