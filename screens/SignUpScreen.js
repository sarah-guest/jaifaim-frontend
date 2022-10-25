import {Button, Text,View, StyleSheet} from 'react-native';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSignIn } from '../reducers/user';


export default function SignInScreen({ navigation }){
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.value);

    const[name,setName]=useState('')
    const[email,setEmail]=useState('')
    const[password, setPassword]= useState('')
const handleRegister=()=>{
    fetch(`http://192.168.10.144:3000/signup`, {
        method: 'POST',
        headers:{'Contente-Type':'applicatio/json'},
        body:JSON.stringify({
            email: email,  
            username: name,
            password: password}
        )
        .then((response)=>response.json())
        .then(data=>{
            if(data.result){
                dispatch(getSignIn({name:name, token:data.token}));
                setEmail('');
                setName('');
                setPassword('');
            }

        })}
        );}
    
   
    return(
       <View>
        <TextInput placeholder="New email" onChangeText={(value) => setEmail(value)} value={email} style={styles.input} />
        <TextInput placeholder="New name" onChangeText={(value) => setName(value)} value={name} style={styles.input} />
        <TextInput placeholder="New password" onChangeText={(value) => setPassword(value)} value={password} style={styles.input} />
        <Button Text="je m'inscris" color='caféaulaitchaud' onPress={() => handleRegister()} ></Button>
        <text>-----------OU------------</text>

 <Button Text="LogIn Google" color='caféaulaitchaud'></Button>
       </View>

    )
   
    
}
const styles= StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#ffffff'
      }
})