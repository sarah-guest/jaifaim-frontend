import { Text,View, StyleSheet } from "react-native";
export default function DemoScreen({navigation}){
    return(
        <View>
        <Text>DemoScreen</Text>
        <Button
          title="Demo"
          onPress={() => navigation.navigate('SignInScreen')}
        />
      </View>
   

    )
}
const styles= StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#ffffff'
      }
})