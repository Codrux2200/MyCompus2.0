import { getFirestore, setDoc, doc } from "firebase/firestore";
import {app} from './firebase_config'
import { useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { Alert } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
const db = getFirestore(app);

export const createAccount = async (uid, appt, etablisementId, name) => {
    await AsyncStorage.setItem("UserUid", uid); 
    await setDoc(doc(db, "Users", uid), {
        etablisementId : etablisementId,
        nom : name,
        numeroAppart : appt
    });
    Alert.alert("compte successfully created");

}