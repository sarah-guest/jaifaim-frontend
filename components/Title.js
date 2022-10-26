import { Text, StyleSheet } from 'react-native';
import { useState, useEffect } from 'react';
import * as Font from 'expo-font';

const fetchFonts = () => {
    return Font.loadAsync({
        'Lissain': require('../assets/fonts/Lissain.ttf'),
    });
};

export default function Title(props) {
    const { h1, h2, h3, h4, h5, h6 } = props;

    const [hNumber, sethNumber] = useState('h1');
    const [fontsLoaded, setFontsLoaded] = useState(false);
    useEffect(() => {
        async function getFonts() {
            await fetchFonts();
            setFontsLoaded(true);
        }
        getFonts();
    }, []);

    if (!fontsLoaded || fontsLoaded) {
        return (
            <Text
                style={[styles.title,
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
