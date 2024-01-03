import {getAuth, signInWithEmailAndPassword, initializeAuth, getReactNativePersistence, signOut, createUserWithEmailAndPassword} from 'firebase/auth';
import {app} from "./firebase_config"
import { Alert } from 'react-native';
import { useState } from 'react';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { createAccount } from './setfirestore';
import {View, TouchableOpacity, Text} from 'react-native'
export const auth = getAuth(app);

export const LoginUser = ({email, password}) => {
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();


    const loginbutton = () => {
        signInWithEmailAndPassword(auth, email, password).
    then((userCredential) => {
        const user = userCredential.user;
        Alert.alert("User connected");  
        navigation.navigate("Home");
        return true;
    }).catch((error) => {
        Alert.alert(error.message);
        console.log(error.message, error.code);
        return false;
    });
    }
    return(

    <View>
    <TouchableOpacity style = {{backgroundColor : 'grey', width : 200, height : 50, justifyContent : 'center', alignItems : 'center', borderRadius : 100}}  onPress={() => {loginbutton(email, password)}}>
        <Text style = {{color : 'white', fontWeight : 'bold', fontFamily : "Arial"}}>se connecter</Text>
    </TouchableOpacity>
    </View>
    );
}


export const RegisterUser = ({email, password, appt, immb, name}) => {
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();


    const loginbutton = () => {
        createUserWithEmailAndPassword(auth, email, password).
    then((userCredential) => {
        const user = userCredential.user;
        createAccount(user.uid, appt, immb, name).then(() => {navigation.navigate("Home");});
        return true;
    }).catch((error) => {
        Alert.alert(error.message);
        console.log(error.message, error.code);
        return false;
    });
    }
    return(

    <View>
    <TouchableOpacity style = {{backgroundColor : 'grey', width : 200, height : 50, justifyContent : 'center', alignItems : 'center', borderRadius : 100}}   onPress={() => {loginbutton(email, password)}}>
        <Text>crée son compte</Text>
    </TouchableOpacity>
    </View>
    );
}


export const LogoutUser = ({email, password}) => {
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();


    const logoutbutton = () => {
        signOut(auth).then(() => {
            navigation.navigate("Login");

        }).catch((err) => {console.log(err.code, err.message)});
    }
    return(

    <View>
    <TouchableOpacity style = {{color : 'white', fontWeight : 'bold', fontFamily : "Arial"}} onPress={() => {loginbutton(email, password)}}>
        <Text>se deconecter</Text>
    </TouchableOpacity>
    </View>
    );
}


