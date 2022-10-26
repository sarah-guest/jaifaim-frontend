import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';


export default function FaqScreen({ navigation , route }) {
    return (
      <View style={styles.container}>
        
          <TextInput style={styles.input}> 🔎 Recherche </TextInput>
          <Text style={styles.text}> FAQ </Text>
          
        
        
      </View>
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'red',
    },
    text: {
        backgroundColor: 'blue',
    },
    input: {
        height: 50,
        width: '90%',
        backgroundColor: '#E6CCB2',
        alignItems : 'center',
        textAlign: 'center',
        borderRadius: 50,
        
        // marginBottom: 650,


    }
  });