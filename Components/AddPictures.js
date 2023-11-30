import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, useWindowDimensions, Image, ImageBackground  ,TouchableOpacity, TextInput, ScrollView, Alert, Pressable} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { getStorage, ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";
import { useState } from 'react';
import { enableLegacyWebImplementation } from 'react-native-gesture-handler';
import {auth} from '../App'
import { uploadProfilPicture } from './FireConfig';


export const exportdeleteImage = async (refe) => {
    const storage = getStorage();
    const storageref = ref(storage ,refe);

    deleteObject(storageref).then(() => {
        console.log("deleted");
    }).catch((error) => {
        console.log(error);
    });

}



export const ProfilPicture = async(props) => {
    console.log(props);
    const uploadImage = async(uri, path) => {
        let URL;
    uri =
    Platform.OS === 'android' ? uri : uri.replace('file://', '');
    try{
        const response = await fetch(uri);
        const blob = await response.blob();
        const storage = getStorage();
        const storageRef = ref(storage, props + "/profile.jpg");
// Upload the file and metadata
    const uploadTask = uploadBytesResumable(storageRef, blob);
    uploadTask.on('state_changed', 
    (snapshot) => {
    },
    
    (error) => {
        throw e;
    }, () => {;
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        console.log('File available at', downloadURL);
        uploadProfilPicture(downloadURL);
      })});
    }catch(e){
       throw e;
    }
    }
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images, // We can 
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.1,   // 0 means compress for small size, 1 means 
          });
        await uploadImage(result.uri, "name");
        


  

}


export const AddPictures = (props) => {
    const [purcentage, setpurcentage] = useState(0);
    const [Images, setImages] = useState(["0"]);

    
const handleImagePicker = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images, // We can 
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.1,   // 0 means compress for small size, 1 means 
      });
    await uploadImage(result.uri, "name");
    console.log(result.uri);
}

 const deleteImage = async (refe) => {
        const storage = getStorage();
        const storageref = ref(storage ,refe);

        deleteObject(storageref).then(() => {
            setImages(Images.filter(item => item.ref !== refe));
            props.setpicture(Images.filter(item => item.ref !== refe));
        }).catch((error) => {

        });
    
    }


    const uploadImage = async(uri, path) => {
        let URL;
    uri =
    Platform.OS === 'android' ? uri : uri.replace('file://', '');
    try{
        const response = await fetch(uri);
        const blob = await response.blob();
        const storage = getStorage();
        const storageRef = ref(storage, 'images/' + props.uuid + "/Images" + Images.length +'.jpg');
// Upload the file and metadata
    const uploadTask = uploadBytesResumable(storageRef, blob);


    
    uploadTask.on('state_changed', 
    (snapshot) => {
        setpurcentage((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
    },
    
    (error) => {
        throw e;
    }, () => {;
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        console.log('File available at', typeof(downloadURL));
        setImages([...Images, {uri : downloadURL, ref : 'images/' + props.uuid + "/Images" + Images.length +'.jpg'}]);
        props.setpicture([...Images, {uri : downloadURL, ref : 'images/' + props.uuid + "/Images" + Images.length +'.jpg'}]);
        console.log(Images);
      })});
    }catch(e){
       throw e;
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
                  
                        <ImageBackground source = {{uri : element.uri}} style = {{
                            width : 150,
                            height : 100,
                            marginRight : 10
                        }}>
                            <TouchableOpacity onPress = {() => {deleteImage(element.ref)}}><Text>X</Text></TouchableOpacity>

                        </ImageBackground>

                    :<></>

                );


            })
        }
        { purcentage != 0 && purcentage != 100 ?
        <TouchableOpacity style = {{width : 150, height : 100, backgroundColor : "rgba(93, 95, 239, 1)", flexDirection : 'column', justifyContent : 'center'}}>
        <Text style = {{textAlign : 'center', color : 'white', fontWeight : 'bold', fontSize  :30}}>{purcentage}</Text>
    </TouchableOpacity> : <></>
    } 
    </ScrollView>
    </View>
    );



}
