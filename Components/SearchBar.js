import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, useWindowDimensions, Image, ImageBackground, TouchableOpacity, TextInput } from 'react-native';
import { useState, useEffect } from 'react';



export const SearchBar = (props) => {
    const [index, setindex] = useState(0);
    console.log(index);
    return(
        <View style = {{marginTop : 10, width : '100%', height : 50, backgroundColor : 'rgba(246, 246, 246, 1)', borderRadius : 20,
        alignContent : 'center', justifyContent : 'center', borderWidth: 1, borderColor : 'rgba(232, 232, 232, 1)'}}>
            <TextInput placeholder = {"Search"} style = {{marginLeft : 10 }}></TextInput>
        </View>

    );


}