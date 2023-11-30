import { StyleSheet, Text, View, useWindowDimensions, Image, ScrollView, TouchableOpacity, TouchableNativeFeedback, TextInput, Alert, ActivityIndicator} from 'react-native';
import { useState, useEffect } from 'react';
import ModalSelector from 'react-native-modal-selector'
import { createUsers, getEtablisement } from '../Components/FireConfig';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

const Selector = (props) => {
    console.log(props);
    const [textInputValue, setTextInputValue] = useState("");
    return(
        <ModalSelector
        data={props.data}
        style = {{width : 300}}
        initValue="Selectionner votre immeuble"
        onChange={(option)=>{ Alert.alert(`vous avez choisi ${option.label}`), props.selector(option.key)}} />);


};

export const SignIn = () => {
    let data = "searching";
    const navigation = useNavigation();
    const [Etablisement, setEtablisement] = useState([]);
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const [Nom, setNom] = useState("");
    const [Prenom, setPrenom] = useState("");
    const [NumeroAppart, setNumeroAppart] = useState("");
    const [ChosenEtablisement, setChosenEtablisement] = useState("");

    useFocusEffect(() => {
        const unsubscribe = navigation.addListener('beforeRemove', (e) => {
          // Prevent the back gesture by removing the default action
          e.preventDefault();
        });
    
        return () => {
          unsubscribe();
        };
      });
    useEffect(() => {
        async function fetchData() {
          try {
            const response = await getEtablisement();
            const etablisementData = []; // Créez un tableau pour stocker les données
            
            let index = 0;
            console.log(response);
            response.forEach(element => {
              etablisementData.push({
                key: element.id,
                label: element.data.nom
              });
            });
      
            setEtablisement(etablisementData);
          } catch (error) {
            console.log("Error", error);
          }
        }
      
        fetchData();
      
        return () => {
        };
      }, []);
    return(

        <ScrollView style = {{backgroundColor : 'white', height : "100%"}}>
            <View style = {{flexDirection : 'row', marginTop : 100, alignItems : 'center', marginLeft : 'auto', marginRight : 'auto', width : "100%", justifyContent : 'center'}}>
          <View style = {{flexDirection : 'row', alignItems : 'center'}}>
          <Image source = {require("../assets/maisonpleine.png")} style = {{width : 50, height : 50}}></Image>
        <Text style = {{fontStyle : 'italic', fontWeight : 'bold', fontSize : 30}}>MyCompus</Text>
        </View>
        </View>
        <View style = {{marginLeft : 10, marginRight : 10,width :"90%", justifyContent : 'center', marginTop : 50, alignItems : 'center'}}>
            <Text style = {{fontWeight : 'bold', fontSize : 30}}>email: </Text>
            <TextInput      
                keyboardType = {"email-address"} 
                style = {{borderWidth : 0.5, width : 300, fontSize : 30,borderRadius : 10}}
                value = {Email}
                onChangeText = {(email) => {setEmail(email)}}>
            </TextInput>

        </View>
        <View style = {{marginLeft : 10, marginRight : 10,width :"90%", justifyContent : 'center', marginTop : 50, alignItems : 'center'}}>
            <Text style = {{fontWeight : 'bold', fontSize : 30}}>Password: </Text>
            <TextInput 
                secureTextEntry = {true} 
                style = {{borderWidth : 0.5, width : 300, fontSize : 30, borderRadius : 10}}
                value = {Password}
                onChangeText = {(password) => {setPassword(password)}}
                >
            </TextInput>

            <View style = {{marginLeft : 10, marginRight : 10,width :"90%", justifyContent : 'center', marginTop : 50, alignItems : 'center'}}>
            <Text style = {{fontWeight : 'bold', fontSize : 30}}>nom: </Text>
            <TextInput 
                style = {{borderWidth : 0.5, width : 300, fontSize : 30,borderRadius : 10}}
                value = {Nom}
                onChangeText = {(nom) => {setNom(nom)}}
            ></TextInput>

        </View>
        <View style = {{marginLeft : 10, marginRight : 10,width :"90%", justifyContent : 'center', marginTop : 50, alignItems : 'center'}}>
            <Text style = {{fontWeight : 'bold', fontSize : 30}}>Prenom: </Text>
            <TextInput 
                style = {{borderWidth : 0.5, width : 300, fontSize : 30,borderRadius : 10}}
                value = {Prenom}
                onChangeText = {(prenom) => {setPrenom(prenom)}}
            >
                </TextInput>

        </View>
        
        <View style = {{marginLeft : 10, marginRight : 10,width :"90%", justifyContent : 'center', marginTop : 50, alignItems : 'center'}}>
            <Text style = {{fontWeight : 'bold', fontSize : 30}}>établisement: </Text>
        {
            Etablisement != null ?
            <Selector data = {Etablisement} selector = {setChosenEtablisement}></Selector>
            : <ActivityIndicator/>
        }
        </View>
        <View style = {{marginLeft : 10, marginRight : 10,width :"90%", justifyContent : 'center', marginTop : 50, alignItems : 'center'}}>
            <Text style = {{fontWeight : 'bold', fontSize : 30}}>Numero d'appartement: </Text>
            <TextInput 
                style = {{borderWidth : 0.5, width : 300, fontSize : 30,borderRadius : 10}}
                value = {NumeroAppart}
                onChangeText = {(numeroAppart) => {setNumeroAppart(numeroAppart)}}
            ></TextInput>

        </View>
       
        <TouchableOpacity onPress = {() => {createUsers(Nom, Prenom, Password, ChosenEtablisement, NumeroAppart, Email, navigation)}} style = {{width : 300, height : 50, borderWidth : 0.5, justifyContent : 'center', marginTop : 40, borderRadius : 10, backgroundColor : 'rgba(93, 95, 239, 1)'}}>
            <Text style = {{textAlign : "center", fontWeight : "bold", color : "white"}}>Crée un compte</Text>
        </TouchableOpacity>
        <Text style = {{fontSize : 12}}><Text style = {{fontWeight : 'bold'}}>cliquez ici</Text> si vous avez deja un compte</Text>
        </View>

        </ScrollView>
    )


}