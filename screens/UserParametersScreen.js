import { Text, View, StyleSheet } from 'react-native';
import OurButton from '../components/Button';

export default function UserParametersScreen() {
    return (
        <View style={styles.container}>
            <Text>User parameters screen</Text>
            <OurButton text="Sign Up" onPress={() => navigation.navigate('EaterProvider')} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
