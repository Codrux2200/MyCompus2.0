import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';




export const  Menu = () => {
    const navigation = useNavigation();
    const home = [require("../assets/maison.png"), require("../assets/maisonpleine.png")];
    const profil = [require("../assets/utilisateur.png"), require("../assets/utilisateurplein.png")];
    const alert = [require("../assets/megaphone.png"), require("../assets/megaphoneplein.png")];
    const help = [require("../assets/utilisateurs-alt.png"), require("../assets/utilisateurs-altplein.png")];
    const [homestate, setHomeState] = useState(1);
    const [profilstate, setProfilState] = useState(0);
    const [alertstate, setAlertState] = useState(0);
    const [helpstate, setHelpState] = useState(0);

    const setallto0 = () => {
        setHomeState(0);
        setProfilState(0);
        setAlertState(0);
        setHelpState(0);
    }


    return(

        <View style = {{flexDirection : 'row', justifyContent : 'space-around', borderTopColor : "rgba(232, 232, 232, 1)", borderTopWidth : 1}}>
            <TouchableOpacity style = {[{width : 50, height : 50, borderRadius : 100}, !homestate == 1 ? {backgroundColor : "rgba(232, 232, 232, 1)"} : {backgroundColor : "rgba(232, 232, 232, 1)"},{marginTop : 10,  justifyContent: 'center', alignItems : 'center'}]} onPressIn={() => {setallto0() ,setHomeState(1), navigation.navigate("Home")}}><Image source={home[homestate]} style = {{width : 29, height : 27, resizeMode : 'contain'}}></Image></TouchableOpacity>
            <TouchableOpacity style = {{width : 50, height : 50, borderRadius : 100, backgroundColor : "rgba(232, 232, 232, 1)", marginTop : 10,  justifyContent: 'center', alignItems : 'center'}}  onPressIn={() => {setallto0(), setAlertState(1), navigation.navigate("Aide")}}><Image source={alert[alertstate]} style = {{width : 29, height : 27}}></Image></TouchableOpacity>
            <TouchableOpacity style = {{width : 50, height : 50, borderRadius : 100, backgroundColor : "rgba(232, 232, 232, 1)",  marginTop : 10,  justifyContent: 'center', alignItems : 'center'}}   onPressIn={() => {setallto0(), setHelpState(1), navigation.navigate("Annonces")}}><Image source={help[helpstate]} style = {{width : 29, height : 27, resizeMode : 'contain'}}></Image></TouchableOpacity>
            <TouchableOpacity style = {{width : 50, height : 50, borderRadius : 100, backgroundColor : "rgba(232, 232, 232, 1)", marginTop : 10,  justifyContent: 'center', alignItems : 'center'}} onPressIn={() => {setallto0(), setProfilState(1), navigation.navigate("Profil")}}><Image source={profil[profilstate]} style = {{width : 29, height : 27, resizeMode : 'contain'}}></Image></TouchableOpacity>
        </View>


    );


};