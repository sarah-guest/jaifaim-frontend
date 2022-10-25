import { Text, View, StyleSheet } from "react-native";
import OurButton from "../components/Button";
export default function DemoScreen({ navigation }) {
    return (
        <View>
            <Text>DemoScreen</Text>
            <OurButton
                title="Demostration"
                onPress={() => navigation.navigate('SignUp')}
            />
        </View>


    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff'
    }
})