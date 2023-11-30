import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, useWindowDimensions, Image, ImageBackground, TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';



export const ImageCarrousel = (props) => {
    const [index, setindex] = useState(1);
    console.log(props.tab[index].uri);
    return(
        <View style = {{marginTop : 10}}>
            <GestureRecognizer
             onSwipeLeft={() => {index + 1 < props.tab.length ? setindex(index +1) : <></>}}
             onSwipeRight={() => {index - 1 >= 0 ? setindex(index -1) : <></>}}>
            <Image source = {{uri : props.tab[index].uri}} style= {{width : "100%", height : 200, flexDirection : 'row', justifyContent : 'space-between', alignItems : 'center', borderRadius : 10, display : 'flex'}}>
            </Image>
            </GestureRecognizer>
            <View style = {{flexDirection : 'row', justifyContent : 'flex-end', width : 'auto', marginLeft : "auto"}}>
            {
                props.tab.map((item) => {
                    
                    return(
                        item != "0" ?
                        <View style = {[{width : 10, height : 10}, item === props.tab[index] ? {backgroundColor : "rgba(93, 95, 239, 1)"} : {backgroundColor : "white"}, {borderWidth : 1, borderColor : 'black', marginTop : 10, marginLeft : 10, borderRadius : 100}]}>
                            </View> : <></>
                    );    
                })
            }
            </View>
        </View>

    );


}