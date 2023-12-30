import { getFirestore } from "firebase/firestore";
import {app} from './firebase_config'
import { useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
const db = getFirestore(app);

export const getAnnoncesData = (setAnnoncesData) => {
    const unsubscribe = onSnapshot(
        collection(db, "Annonces"), 
        (snapshot) => {
            const data = [];
            console.log(snapshot.forEach((doc) => {
                data.push(doc.data());
            }));
            setAnnoncesData(data);
        },
        (error) => {
          console.log(error);
        });
    return (unsubscribe);
}

export const getImmeubles = (setImmeuble) => {
    const unsubscribe = onSnapshot(
        collection(db, "Etablisement"), 
        (snapshot) => {
            const data = [];
            console.log(snapshot.forEach((doc) => {
                data.push({value : doc.id, label : doc.data().nom});
            }));
            setImmeuble(data);
        },
        (error) => {
          console.log(error);
        });
    return (unsubscribe);
}