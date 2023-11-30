import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, useWindowDimensions, Image, ImageBackground, TouchableOpacity, TextInput } from 'react-native';
import { useState, useEffect } from 'react';



export const Staylishinput = (props) => {
    return(
        <View style = {{width : 200, marginLeft : 'auto', marginRight : 'auto', marginTop : 30}}>
            <Text style = {{fontWeight : 'bold', fontSize : 20}}>{props.title}</Text>
        <View style = {{marginTop : 10, borderWidth : 1, borderColor : 'black', width : 250, height: props.height, borderRadius : 10, alignContent : 'center', marginLeft : 'auto', marginRight : 'auto'}}>
            <TextInput style = {{fontSize : 20, marginLeft : 10, width : 230, height : props.height, textAlignVertical : 'auto'}} multiline={props.multiline}></TextInput>
        </View>
        </View>

    );


}