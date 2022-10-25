import { Text, View, StyleSheet, } from 'react-native';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSignIn } from '../reducers/user';
import OurTextInput from '../components/InputAndButton'
import OurButton from '../components/Button';
export default function SignInScreen({ navigation }) {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.value);

    const [username, setUserName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const handleRegister = () => {
        fetch(`http://192.168.10.164:3000/signup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: email,
                username: username,
                password: password
            })
        })
            .then((response) => response.json())
            .then(data => {
                if (data.result) {
                    dispatch(getSignIn({ username: username, token: data.token }));
                    setEmail('');
                    setUserName('');
                    setPassword('');
                }

            });
    }


    return (
        <View>
            <OurTextInput placeholder="New email" onChangeText={(value) => setEmail(value)} value={email} />
            <OurTextInput placeholder="New name" onChangeText={(value) => setName(value)} value={username} />
            <OurTextInput placeholder="New password" onChangeText={(value) => setPassword(value)} value={password} />
            <OurButton Text="je m'inscris" color='caféaulaitchaud' onPress={() => handleRegister()} ></OurButton>
            <Text>-----------OU------------</Text>

            <Button Text="LogIn Google" color='caféaulaitchaud'>SingIn</Button>
        </View>

    )


}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff'
    }
})