// IMPORTS HABITUELS
import { StyleSheet, Text, View } from 'react-native';

export default function PdjFormScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>COMPOSANT PDJ FORM</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lavender',
  },
});
