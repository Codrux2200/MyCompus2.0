import { getFirestore, setDoc, doc } from "firebase/firestore";
import {app} from './firebase_config'
import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { Alert } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {getAuth} from 'firebase/auth';
const storage = getStorage(app);
const auth = getAuth(app);
let fileUploaded = 0;

async function uploadfile(file, reference) {
    return new Promise((resolve, reject) => {
        const storageRef = ref(storage, reference);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on('state_changed', 
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;
                }
            }, 
            (error) => {
                Alert.prompt(error.message + error.status);
                reject(error);
            }, 
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    fileUploaded += 1;
                    console.log('File available at', downloadURL);
                    resolve(true);
                }).catch((error) => {
                    reject(error);
                });
            }
        );
    });
}


export const uploadFiles = async (list) => {
    return new Promise(async (resolve, reject) => {
    let counter = 0;
    for (const element of list) {
        await uploadfile(element, auth.currentUser.uid + "/file" + counter + ".png");
        counter += 1;
    }
    resolve(true);
    }); 
    
}