import {View, Text, Image, TouchableOpacity} from "react-native" 
import styles from "./css/navbar.module.css"
import {useState, useEffect} from 'react'
import { useNavigation } from "@react-navigation/native"

export const Navbar = ({setvar}) => {
    const navigation = useNavigation();
    const [choose_var, setChooseVar] = useState(0);

    useEffect(() => {
        setvar(choose_var);
    }, 
    [choose_var]);

    return(
        <View>
        <View style = {styles.navbar}>
            <Image source={require("../assets/settings.png")} style = {{width : 30, height : 30}}></Image>
            <Text style = {{alignSelf : 'center', fontWeight : "bold", fontSize : 20}}>MyCompus 2.O</Text>
            <TouchableOpacity onPress={() => {navigation.navigate("MyHome")}}>
                <Image source={require("../assets/pp.png")} style = {{width : 40, height : 40, borderRadius : 100}}></Image>
            </TouchableOpacity>
        </View>
        <View style = {[styles.navbar, {marginTop : 20}]}>
            <TouchableOpacity onPressIn={() => {setChooseVar(0)}}>
                <Text style = {[styles.Text, choose_var == 0 ? {fontWeight : 'bold'} : {}]}>Annonces</Text>
            </TouchableOpacity>
            <TouchableOpacity onPressIn={() => {setChooseVar(1)}}>
                <Text style = {[styles.Text, choose_var == 1 ? {fontWeight : 'bold'} : {}]}>
                    Proposition</Text>
            </TouchableOpacity>
            <TouchableOpacity onPressIn={() => {setChooseVar(2)}}>
                <Text style = {[styles.Text, choose_var == 2 ? {fontWeight : 'bold'} : {}]}>
                    Plainte</Text>
            </TouchableOpacity>
            <TouchableOpacity onPressIn={() => {setChooseVar(3)}}>
                <Text style = {[styles.Text, choose_var == 3 ? {fontWeight : 'bold'} : {}]}>
                    Demande d'aide
                </Text>
            </TouchableOpacity>
        </View>
        </View>

    );

}
