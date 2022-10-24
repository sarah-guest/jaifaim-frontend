import { Text, TouchableOpacity, StyleSheet } from "react-native";
export default function EaterProviderScreen({ navigation }) {
    const handleSubmit=()=>{}
        navigation.native({screen:'SignUpScreen'})
    return (
        <View>
            <Text>J'ai</Text>
            <Image source={require('../assets/logo.jpg')} />
            <TouchableOpacity onPress={() => handleSubmit()} style={styles.button} activeOpacity={0.8}>
                <Text style={styles.textButton}>...faim</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => handleSubmit()} style={styles.button} activeOpacity={0.8}>
                    <Text style={styles.textButton}>...à manger</Text>
                </TouchableOpacity>
        </View>
    )
}