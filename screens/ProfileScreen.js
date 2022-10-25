// IMPORTS HABITUELS
import { StyleSheet, Text, View } from 'react-native';

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <Text>Profile !</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'cornsilk',
  },
});
