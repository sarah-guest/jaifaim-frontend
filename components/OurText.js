import { Text, StyleSheet } from 'react-native';
// FONT LATO
import {
    useFonts,
    Lato_400Regular,
    Lato_400Regular_Italic,
    Lato_700Bold,
    Lato_700Bold_Italic,
} from '@expo-google-fonts/lato';

export default function OurText(props) {
    const { subtitle, body1, body2 } = props;

    //FONT LATO
    let [fontsLoaded] = useFonts({
        Lato_400Regular,
        Lato_400Regular_Italic,
        Lato_700Bold,
        Lato_700Bold_Italic,
    });


    if (!fontsLoaded || fontsLoaded) {
        return (
            <Text style={[
                subtitle && { fontFamily: 'Lato_700Bold', fontSize: 20, },
                body1 && { fontFamily: 'Lato_400Regular', fontSize: 20, },
                body2 && { fontFamily: 'Lato_400Regular', fontSize: 16, },
            ]}>
                {props.children}
            </Text>
        );
    }
}

const styles = StyleSheet.create({
});
