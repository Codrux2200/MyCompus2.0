import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, useWindowDimensions, Image, TouchableOpacity, ScrollView, ImageBackground} from 'react-native';
import { NavigationContainer, useFocusEffect, useNavigation } from '@react-navigation/native';
import { useState, useEffect, Profiler } from 'react';
import { getBasicData } from '../Components/FireConfig';
import { collection, onSnapshot, where, query, doc} from 'firebase/firestore';
import {auth} from "../App"
import { signOut } from 'firebase/auth';
import { db } from '../App';
import { AnnoncesWidjet } from '../Annonces/annonces';
import { AideWidjet } from '../entreaide/entreaide';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ProfilPicture } from '../Components/AddPictures';

export const Modifier = () => {
    const window = useWindowDimensions();
    const navigation = useNavigation();
    const [menu, setmenu] = useState(1);
    const [ProfilData, setProfilData] = useState();
    const [changePicture, setChangePicture] = useState(false);
    
    useEffect(() => {
        const collectionRef = doc(db, 'Users', auth.currentUser.uid);
        const unsubscribe = onSnapshot(collectionRef, snapshot => {
            console.log(snapshot.data());
          const newData = snapshot.data();
          setProfilData(newData);
        });
    
        return () => {
          unsubscribe(); // Arrêter l'écoute lorsque le composant est démonté
        };
      }, []);

    console.log("profilData" , ProfilData);
    const data = {icon : "https://firebasestorage.googleapis.com/v0/b/mycampus-74605.appspot.com/o/" + auth.currentUser.uid + "%2Fprofile.jpg?alt=media&token=05a5860d-0b8d-42a9-a527-45123593fa83"};
    return(
        <View style = {{backgroundColor : 'white', height : '100%'}}>
            <ScrollView>
            <View style = {{height : 300, width : "100%", backgroundColor : "rgba(93, 95, 239, 1)"}}>
                <View style = {{marginTop : 50, marginLeft : 10, marginRight : 10, justifyContent : 'space-between', flexDirection : 'row'}}>
                    <TouchableOpacity onPressIn = {() => {navigation.navigate("GererCompte")}}><Text style = {{color : 'white', fontWeight : "bold"}}>Gérez son compte</Text></TouchableOpacity>
                    <TouchableOpacity onPressIn={() => {signOut(auth), navigation.navigate("Login")}}><Text style = {{color : 'white', fontWeight : "bold"}}>Déconnexion</Text></TouchableOpacity>
                    </View>
                    <View style = {{width : 110, height : 110, position : "absolute", top : window.height - 600, left : window.width / 2 - 55, borderRadius : 100, backgroundColor : 'white'}}></View>
            <ImageBackground source = {{uri : ProfilData != undefined? ProfilData.photoUrl : data.icon}} style = {{width : 100, height : 100, position : "absolute", top : window.height - 596, left : window.width / 2 - 50, borderRadius : 100, overflow : 'hidden'}}>
                <TouchableOpacity onPressIn={() => {ProfilPicture(auth.currentUser.uid).then(() => {setChangePicture(true)})}} style = {{backgroundColor : 'rgba(255,255,255,0.5)', width : "100%", height : "100%", justifyContent : 'center'}}><Text style = {{textAlign : "center", fontSize : 30 }}>🖊</Text></TouchableOpacity>
            </ImageBackground>
            </View>
            <View style = {{flexDirection : "row", justifyContent : 'space-between', marginLeft : 10, marginRight : 10}}>
            <Text style = {{fontWeight : "bold", fontSize : 20}}>{ProfilData != undefined? ProfilData.nom.replace(":", "\n"): "loading..."}</Text>
            <Text style = {{fontWeight : "bold", fontSize : 20}}>{ProfilData != undefined? ProfilData.numeroAppart : "loading..."}</Text>
            </View>
  
            </ScrollView>
        
        </View>

    );
};

