import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import style from "./App.module.css"
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import {AnnonceSheet} from "./BottomSheets/AnnonceSheet"
import { Home } from './Home';
import { CardStyleInterpolators } from "@react-navigation/stack";
import {app} from "./Backend/firebase_config"
import { LoginUser } from './Backend/login';
import { useState } from 'react';
import {RegisterPage} from "./register/register"
import { Mainhome } from './my/MyHome';
import { AddNewAnnonces } from './BottomSheets/AddAnnonces';

function LoginPage(){
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <View style={style.container}>
       <Text style = {[style.TextAlign, style.LoginText]}>MyCompus2.0</Text>
      <View style = {style.loginContainer}>
        <Text style = {[style.TextAlign, style.LoginText]}>Login Page</Text>
        <TextInput style = {style.TextInput} 
        placeholder='Login' autoComplete='email' 
        inputMode='email' value={email} onChangeText={(text) => {setEmail(text)}}>
        </TextInput>
        <TextInput style = {style.TextInput} 
        placeholder='Password' secureTextEntry = {true} value={password} onChangeText={(text) => {setPassword(text)}}>
        </TextInput>
        <LoginUser email = {email} password = {password}></LoginUser>
        <View>
          <Text>si vous n'avez toujours pas de compte <Text onPress={() => {navigation.navigate("Register")}}>cliquez ic</Text>i</Text>
        </View>
        <StatusBar style="auto" />
      </View>
    </View>
  );

}


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login"
      screenOptions={{
        headerShown : false
      }}>
        <Stack.Screen name="Login" component={LoginPage}
         />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="MyHome" component={Mainhome} />
        <Stack.Screen name="Register" component={RegisterPage} />
        <Stack.Screen name = "AnnonceSheet" component={AnnonceSheet}
        options={{
          presentation: "modal",
          cardOverlayEnabled: true,
          cardStyleInterpolator:
            CardStyleInterpolators.forModalPresentationIOS,
          cardStyle: {
            backgroundColor: "transparent",
            opacity: 0.99,
            height: "30%",
          },
          gestureResponseDistance: 500,
        }}/>
        <Stack.Screen name = "AddAnnonceSheet" component={AddNewAnnonces}
        options={{
          presentation: "modal",
          cardOverlayEnabled: true,
          cardStyleInterpolator:
            CardStyleInterpolators.forModalPresentationIOS,
          cardStyle: {
            backgroundColor: "transparent",
            opacity: 0.99,
            height: "30%",
          },
          gestureResponseDistance: 500,
        }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}