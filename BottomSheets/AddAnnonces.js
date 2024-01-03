import {View, Text, Image, TouchableOpacity, StyleSheet} from "react-native" 
import {useState, useEffect} from 'react'
import { Alert } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { AddPictures, BigInput } from "../AddOn/input"
import { uploadFiles } from "../Backend/setdatabase"

export const AddNewAnnonces = () => {
    const navigation = useNavigation();
    const Publish = () => {
        if (annonces.length == 0 && title.length == 0) {
            Alert.alert("Le titre ou l'annonce ne peuvent pas être vide !!");
        } else {
            Alert.alert("publication en cours ..");
            uploadFiles(Images).then((value) => {value == true ? navigation.goBack() : <></>});
        }
    };


    const [title, setTitle] = useState("");
    const [annonces, setAnnonces] = useState("");
    const [Images, setImages] = useState([]);
    return(
        <View style = {styles.container}>
            <Text style = {styles.Title}>Ajouter une annonce</Text>

            <BigInput name = {"titre"} placeholder={"entrez votre titre"} setValeur={setTitle}></BigInput>
            <BigInput name = {"Annonces"} placeholder={"entrez votre titre"} setValeur={setAnnonces}></BigInput>
            <AddPictures setBigImage = {setImages}></AddPictures>
            <TouchableOpacity onPress={Publish} style = {styles.button}><Text>Publiez mon annonces</Text></TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    Title : {
        fontWeight: 'bold',
        textAlign:  'center',
        marginTop: 20,
        fontSize: 25,

    },

    container : {
        display : 'flex',
        flexDirection : 'column',
        justifyContent : 'space-around',
        height : "100%",
        alignSelf : 'center',
    },

    button : {
        alignSelf : 'center',
    }

  });
  