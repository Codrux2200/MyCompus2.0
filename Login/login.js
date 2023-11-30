import { StyleSheet, Text, View, useWindowDimensions, Image, ScrollView, TouchableOpacity, TouchableNativeFeedback, TextInput} from 'react-native';
import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import App, {auth} from "../App"


export const Login = () => {
    const navigation = useNavigation();
    const [Email, SetEmail] = useState("");
    const [Password, SetPassword] = useState("");
    return(

        <View style = {{backgroundColor : 'white', height : "100%"}}>
            <View style = {{flexDirection : 'row', marginTop : 100, alignItems : 'center', marginLeft : 'auto', marginRight : 'auto', width : "100%", justifyContent : 'center'}}>
          <View style = {{flexDirection : 'row', alignItems : 'center'}}>
          <Image source = {require("../assets/maisonpleine.png")} style = {{width : 50, height : 50}}></Image>
        <Text style = {{fontStyle : 'italic', fontWeight : 'bold', fontSize : 30}}>MyCompus</Text>
        </View>
        </View>
        <View style = {{marginLeft : 10, marginRight : 10,width :"90%", justifyContent : 'center', marginTop : 100, alignItems : 'center'}}>
            <Text style = {{fontWeight : 'bold', fontSize : 30}}>Login: </Text>
            <TextInput 
            style = {{borderWidth : 0.5, width : 300, fontSize : 30,borderRadius : 10}}
            value = {Email}
            onChangeText = {(val) => {SetEmail(val)}}
            ></TextInput>

        </View>
        <View style = {{marginLeft : 10, marginRight : 10,width :"90%", justifyContent : 'center', marginTop : 100, alignItems : 'center'}}>
            <Text style = {{fontWeight : 'bold', fontSize : 30}}>Password: </Text>
            <TextInput 
            style = {{borderWidth : 0.5, width : 300, fontSize : 30, borderRadius : 10}}
            value = {Password}
            onChangeText = {(val) => {SetPassword(val)}}
            ></TextInput> 
        
        <TouchableOpacity onPress = {() => {signInWithEmailAndPassword(auth ,Email, Password).then((user) => {console.log("hey" + user)})}} style = {{width : 300, height : 50, borderWidth : 0.5, justifyContent : 'center', marginTop : 40, borderRadius : 10, backgroundColor : 'rgba(93, 95, 239, 1)'}}>
            <Text style = {{textAlign : "center", fontWeight : "bold", color : "white"}}>Login</Text>
        </TouchableOpacity>
        <Text style = {{fontSize : 12}}><TouchableOpacity onPress = {() => {navigation.navigate("SignIn")}}><Text style = {{fontWeight : 'bold'}}>cliquez ici</Text></TouchableOpacity> pour crée un compte</Text>
        </View>
        </View>
    )


}