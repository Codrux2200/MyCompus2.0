import {View, Text, Image, TouchableOpacity, StyleSheet} from "react-native" 
import {useState, useEffect} from 'react'
import { useNavigation } from "@react-navigation/native"
import { AddPictures, BigInput } from "../AddOn/input"



export const AddNewAnnonces = () => {
    const [title, setTitle] = useState("");
    return(
        <View>
            <Text style = {styles.Title}>Ajouter une annonce</Text>

            <BigInput name = {"titre"} placeholder={"entrez votre titre"} setValeur={setTitle}></BigInput>
            <BigInput name = {"Annonces"} placeholder={"entrez votre titre"} setValeur={setTitle}></BigInput>
            <BigInput name = {"titre"} placeholder={"entrez votre titre"} setValeur={setTitle}></BigInput>
            <AddPictures></AddPictures>
        </View>
    )
}

const styles = StyleSheet.create({
    Title : {
        fontWeight: 'bold',
        textAlign:  'center',
        marginTop: 20,
        fontSize: 25,

    }
  });
  