import {
    View,
    Image,
    StyleSheet
} from 'react-native';
import { BlurView } from 'expo-blur';
//imports de nos composants
import OurText from '../components/OurText';
import Title from '../components/Title';

export default function Meal(props) {
    return (
        <View style={styles.container}>
            <BlurView intensity={50} style={styles.background}>
                <Image source={{ uri: props.src }} style={styles.images} />
                <Title h5 isLight={true}>
                    {props.meal}
                </Title>
                <OurText body2 isLight={true}>
                    Par {props.restaurant}
                </OurText>
            </BlurView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        borderTopLeftRadius: 30,
        borderBottomRightRadius: 30,
        overflow: 'hidden',
        marginRight: 30,
    },
    background: {
        width: 300,
        minHeight: 210,
        backgroundColor: '#rgba(60, 35 ,18, .75)',
        padding: 18,
    },
    images: {
        width: '100%',
        height: 120,
        borderTopLeftRadius: 30,
        borderBottomRightRadius: 30,
        marginBottom: 10,
    },
});
