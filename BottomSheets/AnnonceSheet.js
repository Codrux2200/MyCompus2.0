import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Image, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import style from "./AnnonceSheet.module.css"
import { useState } from 'react';
import AnnoncesJson from "../Json/annonces.json"
import { getElementById } from '../factory/json';


export const AnnonceSheet = (data) => {
    const id = data.route.params.id;
    const annonce = getElementById(AnnoncesJson, id);
    console.log(annonce);
    return(
        <View>
            <Text>hey salut {id}</Text>
        </View>
    )



};