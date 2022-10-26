import { Button, Text, View, StyleSheet } from 'react-native';

export default function HomePageScreen({ navigation }) {



    return (
        <View style={styles.container}>
            <Text>HomePage</Text>
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
