import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, useWindowDimensions, Image, ImageBackground, TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';


export function GestionCompte() {
    const window = useWindowDimensions();
    const navigation = useNavigation();
    return(
        <View style = {{flexDirection : 'row', height : "100%", borderRadius : 10}}>
            <View style = {{backgroundColor : 'white', width : '100%', justifyContent : 'space-between', alignItems : 'center'}}>
                <TouchableOpacity style = {{marginTop : 50, }}><Text style = {{fontWeight : 'bold', fontSize : 20}}>Page de parametres</Text></TouchableOpacity>
                <TouchableOpacity style = {{borderWidth : 0.5, borderRadius : 5, width : 200, height : 50, backgroundColor : "rgba(93, 95, 239, 1)" }} onPressIn = {() => {navigation.navigate("Modifier")}}><Text style = {{fontWeight : 'bold', textAlign : 'center', marginTop : "auto", marginBottom : 'auto' , color : 'white'}}>Modifier</Text></TouchableOpacity>
                <TouchableOpacity style = {{borderWidth : 0.5, borderRadius : 5, width : 200, height : 50, backgroundColor : "rgba(93, 95, 239, 1)"}}><Text style = {{fontWeight : 'bold', textAlign : 'center', marginTop : "auto", marginBottom : 'auto', color : 'white'}}>Me Soutenir</Text></TouchableOpacity>
                <TouchableOpacity style = {{borderWidth : 0.5, borderRadius : 5, width : 200, height : 50, backgroundColor : "rgba(93, 95, 239, 1)" }}><Text style = {{fontWeight : 'bold', textAlign : 'center', marginTop : "auto", marginBottom : 'auto', color : 'white'}}>Supprimer le compte</Text></TouchableOpacity>
                <TouchableOpacity style = {{borderWidth : 0.5, borderRadius : 5, width : 200, height : 50, backgroundColor : "rgba(93, 95, 239, 1)" }}><Text style = {{fontWeight : 'bold', textAlign : 'center', marginTop : "auto", marginBottom : 'auto', color : 'white'}}>FAQ</Text></TouchableOpacity>
                <TouchableOpacity style = {{borderWidth : 0.5, borderRadius : 5, width : 200, height : 50, marginBottom : 20, backgroundColor : "rgba(93, 95, 239, 1)" }}><Text style = {{fontWeight : 'bold', textAlign : 'center', marginTop : "auto", marginBottom : 'auto', color : 'white'}}>Faire une réclamations</Text></TouchableOpacity>
            </View>



        </View>

    );

}