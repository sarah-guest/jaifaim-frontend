import { Button, Text, View, StyleSheet } from 'react-native';

export default function DemoScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>DemoScreen</Text>
      <Button title="Sign In" onPress={() => navigation.navigate('SignIn')} />
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
