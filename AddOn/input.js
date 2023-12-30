import { View, Text, TouchableOpacity, TextInput, ImageBackground, ScrollView} from "react-native";
import { useState, useEffect } from "react";
import styles from "./css/input.module.css";
import * as ImagePicker from 'expo-image-picker';
import { getStorage, ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";


export const BigInput = ({name , placeholder , setValeur}) => {
    return(
        <View style = {styles.container}>
            <Text>{name}</Text>
            <TextInput style = {styles.input} placeholder = {placeholder} setValue = {setValeur} ></TextInput>
        </View>
    )

}

export const getBlobFromUri = async (uri, setImages, image) => {
    uri = Platform.OS === 'android' ? uri : uri.replace('file://', '');
    const response = await fetch(uri);
    const blob = await response.blob();
    setImages([...image, blob]);
}


export const AddPictures = (props) => {
    const [purcentage, setpurcentage] = useState(0);
    const [Images, setImages] = useState([]);

    
    const handleImagePicker = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images, // We can 
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.1,   // 0 means compress for small size, 1 means 
        });
        //await uploadImage(result.uri, "name");
        console.log("finish", result.assets[0].uri);
        await getBlobFromUri(result.assets[0].uri, setImages, Images);
        }

    const deleteImage = (blob) => {
        let index = -1;
        for (let i = 0; i < Images.length; i++) {
            if (URL.createObjectURL(Images[i]) == URL.createObjectURL(blob)) {
                index = i;
            }
        }
        if (index !== -1) {
            const nouvelleListe = [...Images.slice(0, index), ...Images.slice(index + 1)];
            setImages(nouvelleListe);
        }
    }


        return(
            <View style = {{flexDirection : 'row', justifyContent : 'space-around'}}>
                <ScrollView horizontal>
        <TouchableOpacity onPressIn={handleImagePicker} style = {{width : 150, height : 100, backgroundColor : "rgba(93, 95, 239, 1)", flexDirection : 'column', justifyContent : 'center', marginRight : 10}}>
            <Text style = {{textAlign : 'center', color : 'white', fontWeight : 'bold', fontSize  :30}}>+</Text>
        </TouchableOpacity> 
            
            {
                Images.map((element) => {
                    console.log(element);
                    return(
                        element != '0'?
                    
                            <ImageBackground source = {{uri : URL.createObjectURL(element)}} style = {{
                                width : 150,
                                height : 100,
                                marginRight : 10
                            }}>
                                <TouchableOpacity onPress = {() => {deleteImage(element)}}><Text>X</Text></TouchableOpacity>

                            </ImageBackground>

                        :<></>

                    );


                })
            }
        </ScrollView>
        </View>
        );



}
