import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import style from "../App.module.css"
import { useNavigation } from '@react-navigation/native';
import { LoginUser, RegisterUser } from '../Backend/login';
import { useState } from 'react';
import RNPickerSelect from 'react-native-picker-select';
import { getImmeubles } from '../Backend/getfirestore';
import { useEffect } from 'react';

export function RegisterPage(){
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [appt, setAppt] = useState("");
  const [name, setName] = useState("");
  const [immeuble, setImmeuble] = useState([]);
  const [choosenImmb, setChoosenImmb] = useState("");
  useEffect(() => {
    const unsubscribe = getImmeubles(setImmeuble);
    console.log(immeuble);
    return () => unsubscribe();
}, [immeuble, ]);

  return (
    <View style={style.container}>
      <View style = {style.loginContainer}>
        <Text style = {[style.TextAlign, style.LoginText]}>Register Page</Text>
        <TextInput style = {style.TextInput} 
        placeholder='Login' autoComplete='email' 
        inputMode='email' value={email} onChangeText={(text) => {setEmail(text)}}>
        </TextInput>
        <TextInput style = {style.TextInput} 
        placeholder='name' 
         value={name} onChangeText={(text) => {setName(text)}}>
        </TextInput>
        <TextInput style = {style.TextInput} 
        placeholder='Password' secureTextEntry = {true} value={password} onChangeText={(text) => {setPassword(text)}}>
        </TextInput>
        <TextInput style = {style.TextInput} 
        placeholder='Apprt number' value={appt} onChangeText={(text) => {setAppt(text)}}>
        </TextInput>
        <View style={style.labelChoice}>
            <RNPickerSelect
                
                onValueChange={(value) => setChoosenImmb(value)}
                items={immeuble}
            />
        </View>
        <RegisterUser email = {email} password = {password} appt = {appt} immb = {choosenImmb} name = {name}></RegisterUser>
        <View>
          <Text>si vous avez deja un compte <Text onPress={() => {navigation.navigate("Login")}}>cliquez ici</Text></Text>
        </View>
        <StatusBar style="auto" />
      </View>
    </View>
  );

}
