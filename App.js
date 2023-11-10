import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import style from "./App.module.css"
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { Home } from './Home';

function LoginPage(){
  const navigation = useNavigation();
  return (
    <View style={style.container}>
      <View style = {style.loginContainer}>
        <Text style = {[style.TextAlign, style.LoginText]}>Login Page</Text>
        <TextInput style = {style.TextInput} 
        placeholder='Login' autoComplete='email' 
        inputMode='email'>
        </TextInput>
        <TextInput style = {style.TextInput} 
        placeholder='Password' secureTextEntry = {true}>
        </TextInput>
        <TouchableOpacity onPress={() => {navigation.navigate("Home")}}>
          <Text>se connecter</Text>
        </TouchableOpacity>

        <View>
          <Text>si vous n'avez toujours pas de compte cliquez ici</Text>
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}