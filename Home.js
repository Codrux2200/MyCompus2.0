import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Image, ScrollView, RefreshControl } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import style from "./Home.module.css"
import { useState, useEffect } from 'react';
import AnnoncesJson from "./Json/annonces.json"
import { Navbar } from './AddOn/navbar';
import { getAnnoncesData } from './Backend/getfirestore';
const AnnoncesPlugin = () => {
    const [refresh, refreshData] = useState(false);
    const [annoncesData, setAnnoncesData] = useState([]);
    const navigation = useNavigation();
    useEffect(() => {
        const unsubscribe = getAnnoncesData(setAnnoncesData);
        console.log("hey");
        return () => unsubscribe();
    }, [refresh, ]);

    const AnnoncesTab = (val) => {  
        return(
                annoncesData[0] != undefined ?
                <TouchableOpacity onPress={() => navigation.navigate("AnnonceSheet", {id : val.id})} style = {{marginBottom : 40}}>
                    <View style = {{flexDirection : 'row'}}>
                        <Image style = {style.pluginImage} source={require("./assets/fete.png")}></Image>
                        <View style = {style.TextComponent}>
                        <Text style = {{marginBottom : 10, fontSize : 20}}>{val.title}</Text>
                        <Text ellipsizeMode='clip' style = {style.textOverflow}>{val.annonce}</Text>
                    </View>
                </View>
                    <View style = {{flexDirection : 'row', justifyContent : 'space-between', marginTop : 10}}>
                        <View style = {{flexDirection : 'row',alignItems : 'flex-end'}}>
                        <Image source={require("./assets/like.png")}></Image>
                        <Text style = {{fontWeight : 'bold', marginLeft : 5}}>{val.like.length}</Text>
                        </View>
                        <View style = {{flexDirection : 'row',alignItems : 'flex-end'}}>
                        <Image source={require("./assets/unlike.png")}></Image>
                        <Text style = {{fontWeight : 'bold', marginLeft : 5}}>{val.dislike.length}</Text>
                        </View>
                    </View>
                </TouchableOpacity> : <View><RefreshControl></RefreshControl></View>
        );
    }

    return(
        <View style = {{marginTop : 30, marginRight: 20, marginLeft: 20}}>
            <ScrollView
                refreshControl={<RefreshControl onRefresh={() => {refreshData(!refresh)}}></RefreshControl>}>
            {annoncesData.map(AnnoncesTab)}
            <View style = {{height : 500}}></View>
            </ScrollView>
        </View>

    );
}   

export const Home = () => {
    const [choose, setChooseVar] = useState(0);
    return(
        <View style = {{backgroundColor : 'white', height: "100%"}}>
            <View style = {{backgroundColor : 'white', marginTop : 50, height: "100%", marginLeft : 20}}>
                <Navbar setvar={setChooseVar}></Navbar>
                <AnnoncesPlugin></AnnoncesPlugin>
            </View>
        </View>

    ); 
}
