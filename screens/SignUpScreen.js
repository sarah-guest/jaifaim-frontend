import { Text, View, StyleSheet, TextInput } from 'react-native';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSignIn } from '../reducers/user';
import OurButton from '../components/Button';

export default function SignInScreen({ navigation }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = () => {
    console.log("coucou")
    //     fetch(`http://192.168.10.144:3000/signup`, {
    //       method: 'POST',
    //       headers: { 'Content-Type': 'application/json' },
    //       body: JSON.stringify({
    //         email: email,
    //         username: name,
    //         password: password,
    //       })
    //         .then((response) => response.json())
    //         .then((data) => {
    //           if (data.result) {
    //             dispatch(getSignIn({ name: name, token: data.token }));
    //             setEmail('');
    //             setName('');
    //             setPassword('');
    //           }
    //         }),
    //     });
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="New email"
        onChangeText={(value) => setEmail(value)}
        value={email}
      />
      <TextInput
        placeholder="New name"
        onChangeText={(value) => setName(value)}
        value={name}
      />
      <TextInput
        placeholder="New password"
        onChangeText={(value) => setPassword(value)}
        value={password}
      />

      <OurButton
        text="Je m'inscris"
        color="caféaulaitchaud"
        onPress={handleRegister}
      />
      <Text>-----------OU------------</Text>

      <OurButton
        text="S'inscrire avec Google"
        color="caféaulaitchaud"
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
});
