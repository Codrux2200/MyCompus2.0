import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Image, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import style from "./css/Home.module.css"
import { useState, useEffect } from 'react';
import AnnoncesJson from "../Json/annonces.json"

const AnnoncesPlugin = () => {
    const navigation = useNavigation();
    const AnnoncesTab = (val) => {
        return(
            <TouchableOpacity onPress={() => navigation.navigate("AnnonceSheet", {id : val.id})} style = {{marginBottom : 40}}>
                <View style = {{flexDirection : 'row'}}>
                    <Image style = {style.pluginImage} source={require("../assets/fete.png")}></Image>
                    <View style = {style.TextComponent}>
                    <Text style = {{marginBottom : 10, fontSize : 20}}>{val.title}</Text>
                    <Text ellipsizeMode='clip' style = {style.textOverflow}>{val.annonces}</Text>
                </View>
            </View>
                <View style = {{flexDirection : 'row', justifyContent : 'space-between', marginTop : 10}}>
                    <View style = {{flexDirection : 'row',alignItems : 'flex-end'}}>
                    <Image source={require("../assets/like.png")}></Image>
                    <Text style = {{fontWeight : 'bold', marginLeft : 5}}>{val.like}</Text>
                    </View>
                    <View style = {{flexDirection : 'row',alignItems : 'flex-end'}}>
                    <Image source={require("../assets/unlike.png")}></Image>
                    <Text style = {{fontWeight : 'bold', marginLeft : 5}}>{val.unlike}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }

    return(
        <View style = {{marginTop : 30, marginRight: 20, marginLeft: 20}}>
            <ScrollView>
            {AnnoncesJson.map(AnnoncesTab)}
            <View style = {{height : 500}}></View>
            </ScrollView>
            <TouchableOpacity onPress={() => {navigation.navigate("AddAnnonceSheet")}} style = {[style.overflowButton, {position : 'absolute'}]}>
                <Text style = {{color : 'white', fontWeight : "bold"}}>ajoutez une annonce</Text>
            </TouchableOpacity>
        </View>

    );
}   




export const Mainhome = () => {
    const navigation = useNavigation();
    const [choose_var, setChooseVar] = useState(0);
    const tab = [<AnnoncesPlugin></AnnoncesPlugin>];
    return(
        <View style = {{backgroundColor : 'white'}}>
            <View style = {style.main}>
                <View style = {{flexDirection : 'row', justifyContent : 'space-between', marginRight : 20}}>
                <Image source={require("../assets/settings.png")} style = {style.settingsPicture} ></Image>
                <Text onPress={() => {navigation.navigate("Home")}}>Retour</Text>
                </View>
                <Image source = {require("../assets/pp.png")} style = {style.PictureProfile}></Image>
                <Text style = {style.Title}>Mes derniers ajouts</Text>
                <View style = {style.Bar}>
                    <TouchableOpacity onPress={() => {setChooseVar(0)}}><Text style = {choose_var == 0 ?{fontWeight : 'bold'} : {}}>Annonces</Text></TouchableOpacity>
                    <TouchableOpacity onPress={() => {setChooseVar(1)}}><Text style = {choose_var == 1 ?{fontWeight : 'bold'} : {}}>Proposition</Text></TouchableOpacity>
                    <TouchableOpacity onPress={() => {setChooseVar(2)}}><Text style = {choose_var == 2 ?{fontWeight : 'bold'} : {}}>Plainte</Text></TouchableOpacity>
                    <TouchableOpacity onPress={() => {setChooseVar(3)}}><Text style = {choose_var == 3 ?{fontWeight : 'bold'} : {}}>Demande d'aide</Text></TouchableOpacity>
                </View>
                {tab[choose_var]}
            </View>

        </View>


    );    
}