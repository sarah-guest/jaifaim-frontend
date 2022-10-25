import { View, StyleSheet } from 'react-native';
import OurTextInput from '../components/InputAndButton'
import OurButton from '../components/Button';
import { useDispatch,useSelector } from 'react-redux';
export default function SignInScreen({ navigation }) {

    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.value);

    const [signInPassword, setSignInPassword] = useState('');
    const [signInUsername, setSignInUsername] = useState('');

    const handleConnection = () => {
        fetch(`http://192.168.10.164:3000/signin`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: signInUsername, password: signInPassword }),
        }.then(response => response.json())
            .then(data => {
                if (data.result) {
                    dispatch(getSignIn({ username: username, token: data.token }));
                    setSignInUsername('');
                    setSignInPassword('');

                }
            }))
    }
    return (

        <View>
            <OurTextInput placeholder="Username" onChangeText={(value) => setSignInUsername(value)} value={username} />
            <OurTextInput placeholder="Password" onChangeText={(value) => setSignInPassword(value)} value={password} />
            <OurButton Text="Connection" color='caféaulaitchaud' onPress={() => handleConnection()} ></OurButton>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff'
    }
})