import { createUserWithEmailAndPassword, updatePhoneNumber, updateProfile } from "firebase/auth";
import { db, auth } from "../App";
import { collection, getDocs, setDoc, doc, getDoc, FieldPath, updateDoc } from "firebase/firestore";
import { Alert, } from "react-native";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import * as Random from 'expo-random';
import { useSafeAreaFrame } from "react-native-safe-area-context";
import AsyncStorage from '@react-native-async-storage/async-storage';

export async function getEtablisement() {
    const citiesCol = collection(db, 'Etablisement');
    const citySnapshot = await getDocs(citiesCol);
    const cityList = citySnapshot.docs.map(doc => ({
        id: doc.id,
        data: doc.data()
    }));
    
    return cityList;
}


export async function uploadDatatoCollection(uid, data, name, navigation, collections){
  const usersCol = collection(db, collections);
  const newUser = doc(usersCol, uid);

  try {
    await setDoc(newUser, data);
  } catch (error) {
    console.log(error);
  }

  Alert.alert( name + " Créé avec succès");
  navigation.navigate("Profil");

}

export async function getBasicData(uid){
    const citiesCol = doc(db, 'Users', uid);
    const citySnapshot = await getDoc(citiesCol);
    try {
    if ( citySnapshot.exists()) {
        const userData =  citySnapshot.data();
        console.log('User data:', userData);
        return userData;
      } else {
        console.log('User not found');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
    return userData;
  }

export async function createUsers(nom,prenom,password,nomEtablisement, numeroAppart, email, navigation){
    try {
        await createUserWithEmailAndPassword(auth, email, password);
      
        const userId = auth.currentUser.uid;
        const usersCol = collection(db, 'Users');
        const newUser = doc(usersCol, userId);

        try {
          await setDoc(newUser, {
            nom: nom + ":" + prenom,
            etablisementId: nomEtablisement,
            numeroAppart: numeroAppart
          });
          updateProfile(auth.currentUser, {displayName: prenom, photoURL: nomEtablisement,
          });
        } catch (error) {
          console.log(error);
        }
        
        Alert.alert("Compte Créé avec succès");
        navigation.navigate("Profil");
      } catch (error) {
        console.log("Error", error);
      }

}

export const generateUniqueId = async (length = 8) => {
  try {
    const randomBytes = await Random.getRandomBytesAsync(length);
    const uniqueId = randomBytes.reduce((acc, byte) => acc + byte.toString(16).padStart(2, '0'), '');
    return uniqueId;
  } catch (error) {
    console.error('Erreur lors de la génération de l\'UID unique :', error);
    return null;
  }
};


export const uploadProfilPicture = async (url) => {
  let photoUrl = "";
  const citiesCol = doc(db, 'Users', auth.currentUser.uid);
    const citySnapshot = await getDoc(citiesCol);
    try {
    if ( citySnapshot.exists()) {
        const userData = citySnapshot.data();
        photoUrl = userData.photoUrl;
      } else {
        console.log('User not found');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
    photoUrl = url;
    try {
      await updateDoc(citiesCol, { photoUrl: photoUrl });
      console.log('Document mis à jour avec succès !');
    } catch (error) {
      console.error('Erreur lors de la mise à jour du document :', error);
    }
}





export const uploadCommentaires = async (id, comment) => {
  let commentaire = [];
  let photoUrl = "";
  const citiesCol = doc(db, 'Annonces', id);
  const UserCol = doc(db, "Users", auth.currentUser.uid);
  const UserSnapshot = await getDoc(UserCol);
  try {
    if ( UserSnapshot.exists()) {
        const userData = UserSnapshot.data();
        photoUrl = userData.photoUrl;
      } else {
        console.log('User not found');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
    const citySnapshot = await getDoc(citiesCol);
    try {
    if ( citySnapshot.exists()) {
        const userData = citySnapshot.data();
        commentaire = userData.commentaire;
        console.log('User data:', userData.commentaire);
      } else {
        console.log('User not found');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  commentaire.push({name : auth.currentUser.displayName, userid : auth.currentUser.uid, commentaire : comment,
  photoUrl : photoUrl});
  console.log(commentaire);
  if (commentaire.length > 0) {
    try {
      await updateDoc(citiesCol, { commentaire: commentaire });
      console.log('Document mis à jour avec succès !');
    } catch (error) {
      console.error('Erreur lors de la mise à jour du document :', error);
    }
  } else {
    console.error('La liste de commentaires est vide ou non définie.');
  }
  
}

// Appel de la fonction pour générer un UID uniqu
