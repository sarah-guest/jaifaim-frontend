// IMPORTS HABITUELS
import { StyleSheet, Text, View } from 'react-native';

export default function TabTwoScreen() {
  return (
    <View style={styles.container}>
      <Text>Tab 2!</Text>
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
