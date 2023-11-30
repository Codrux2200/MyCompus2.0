import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, useWindowDimensions, Image, TouchableOpacity, TextInput, ScrollView, Switch} from 'react-native';
import { NavigationContainer, useFocusEffect, useNavigation } from '@react-navigation/native';
import { useState, useEffect, Profiler } from 'react';
import "firebase/storage";
import {doc, onSnapshot} from "firebase/firestore";
import { AddPictures, exportdeleteImage } from '../Components/AddPictures';
import { uploadDatatoCollection } from '../Components/FireConfig';
import { auth, db } from '../App';
import  {generateUniqueId} from '../Components/FireConfig'


export const AddentreAideModal = () => {
    const navigation = useNavigation();
    const [title, settitle] = useState("");
    const [soustitle, setsoustitle] = useState("");
    const [sswitch, setswitch] = useState(false);
    const [annonce , setannonce] = useState("");
    const [picture, setpicture] = useState([]);
    const [uuid, setUuid] = useState(null);
    const [ProfilData, setProfilData] = useState(null);
    useEffect(() => {
        generateUniqueId().then(uid => {
            setUuid(uid)// Affiche l'UID unique dans la console
          });
        
    }, []);
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




    return(
        
        <View  style = {{backgroundColor : "rgba(0,0,0,0.6)"}}>
            <View style = {{height : "20%"}}>

            </View>
        <View style = {{backgroundColor : 'white', height : "80%", borderRadius : 30}}>
            <View style= {{marginLeft : 10, marginRight : 10, alignSelf : 'center', flexDirection : 'column'}}>
            <TouchableOpacity onPressIn={() => {exportdeleteImage("images/" + uuid).then(() => {navigation.goBack()})}} style = {{marginLeft : 'auto', marginTop : 20}}><Text style = {{fontSize: 20, fontWeight : 'bold'}}>x</Text></TouchableOpacity>
            <ScrollView style =  {{marginTop : 50,}}>
            <Text style = {{textAlign : 'center', fontWeight : 'bold', fontSize : 50, marginBottom : 30}}>Proposer son aide</Text>

            <Text style = {{fontWeight : 'bold', fontSize : 30, marginBottom : 20}}>Titre</Text>
            <TextInput onChangeText= {(text) => {settitle(text)}} style = {{borderBottomWidth : '0.5', width : 200, marginBottom : 40}}></TextInput>

            <Text style = {{fontWeight : 'bold', fontSize : 30, marginBottom : 20}}>Annonces</Text>
            <TextInput onChangeText= {(text) => {setannonce(text)}}  multiline style = {{borderWidth : '0.5', width : 200, marginBottom : 40, height : 100}}></TextInput>

            <Text style = {{fontWeight : 'bold', fontSize : 30, marginBottom : 20}}>Demande une rémunération</Text>
            <Switch value = {sswitch} onValueChange={(val) => setswitch(val)}></Switch>
            <Text style = {{fontWeight : 'bold', fontSize : 30, marginBottom : 20}}>Photos</Text>
            <AddPictures uuid = {uuid} setpicture = {setpicture}></AddPictures>
            <TouchableOpacity disabled = {uuid == null ? true : false} onPress ={() => {
                uploadDatatoCollection(
                    uuid,
                {
                    uuid : uuid,
                    title : title,
                    annonce : annonce,
                    uris : picture,
                    pay : sswitch,
                    demande : false,
                    userId : auth.currentUser.uid,
                    etablisementId : auth.currentUser.photoURL,
                    photoUrl : ProfilData.photoUrl,

                },
                "Proposition d'aide",
                navigation,
                "Aide"
                )
            }}  style = {{height :50, width : 200, alignSelf : 'center', justifyContent : 'center', marginTop : 30, marginBottom : 40, borderRadius : 10,
        backgroundColor : "rgba(93, 95, 239, 1)"}}>
                <Text style = {{textAlign : 'center', fontWeight : 'bold', color : 'white'}}>Publier l'aide</Text>
            </TouchableOpacity>
            </ScrollView>
            </View>
            
        </View>
        </View>
    );

}


export const AddentreDemandeModal = () => {
    const navigation = useNavigation();
    const [title, settitle] = useState("");
    const [soustitle, setsoustitle] = useState("");
    const [sswitch, setswitch] = useState(false);
    const [annonce , setannonce] = useState("");
    const [picture, setpicture] = useState([]);
    const [uuid, setUuid] = useState(null);
    const [ProfilData, setProfilData] = useState(null);
    useEffect(() => {
        generateUniqueId().then(uid => {
            setUuid(uid)// Affiche l'UID unique dans la console
          });
        
    }, []);
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




    return(
        
        <View  style = {{backgroundColor : "rgba(0,0,0,0.6)"}}>
            <View style = {{height : "20%"}}>

            </View>
        <View style = {{backgroundColor : 'white', height : "80%", borderRadius : 30}}>
            <View style= {{marginLeft : 10, marginRight : 10, alignSelf : 'center', flexDirection : 'column'}}>
            <TouchableOpacity onPressIn={() => {exportdeleteImage("images/" + uuid).then(() => {navigation.goBack()})}} style = {{marginLeft : 'auto', marginTop : 20}}><Text style = {{fontSize: 20, fontWeight : 'bold'}}>x</Text></TouchableOpacity>
            <ScrollView style =  {{marginTop : 50,}}>
            <Text style = {{textAlign : 'center', fontWeight : 'bold', fontSize : 50, marginBottom : 30}}>Demander de l'aide</Text>

            <Text style = {{fontWeight : 'bold', fontSize : 30, marginBottom : 20}}>Titre</Text>
            <TextInput onChangeText= {(text) => {settitle(text)}} style = {{borderBottomWidth : '0.5', width : 200, marginBottom : 40}}></TextInput>

            <Text style = {{fontWeight : 'bold', fontSize : 30, marginBottom : 20}}>Annonces</Text>
            <TextInput onChangeText= {(text) => {setannonce(text)}}  multiline style = {{borderWidth : '0.5', width : 200, marginBottom : 40, height : 100}}></TextInput>

            <Text style = {{fontWeight : 'bold', fontSize : 30, marginBottom : 20}}>Proposer une rémunération</Text>
            <Switch value = {sswitch} onValueChange={(val) => setswitch(val)}></Switch>
            <Text style = {{fontWeight : 'bold', fontSize : 30, marginBottom : 20}}>Photos</Text>
            <AddPictures uuid = {uuid} setpicture = {setpicture}></AddPictures>
            <TouchableOpacity disabled = {uuid == null ? true : false} onPress ={() => {
                uploadDatatoCollection(
                    uuid,
                {
                    uuid : uuid,
                    title : title,
                    annonce : annonce,
                    uris : picture,
                    pay : sswitch,
                    demande : true,
                    userId : auth.currentUser.uid,
                    etablisementId : auth.currentUser.photoURL,
                    photoUrl : ProfilData.photoUrl,

                },
                "Proposition d'aide",
                navigation,
                "Aide"
                )
            }}  style = {{height :50, width : 200, alignSelf : 'center', justifyContent : 'center', marginTop : 30, marginBottom : 40, borderRadius : 10,
        backgroundColor : "rgba(93, 95, 239, 1)"}}>
                <Text style = {{textAlign : 'center', fontWeight : 'bold', color : 'white'}}>Publier l'aide</Text>
            </TouchableOpacity>
            </ScrollView>
            </View>
            
        </View>
        </View>
    );

}