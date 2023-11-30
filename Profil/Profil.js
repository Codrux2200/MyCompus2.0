import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, useWindowDimensions, Image, TouchableOpacity, ScrollView} from 'react-native';
import { NavigationContainer, useFocusEffect, useNavigation } from '@react-navigation/native';
import { useState, useEffect, Profiler } from 'react';
import { getBasicData } from '../Components/FireConfig';
import { collection, onSnapshot, where, query, doc } from 'firebase/firestore';
import {auth} from "../App"
import { signOut } from 'firebase/auth';
import { db } from '../App';
import { AnnoncesWidjet } from '../Annonces/annonces';
import { AideWidjet } from '../entreaide/entreaide';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AddentreAideModal } from '../entreaide/entreAideModal';
export const MenuProfil = (props) => {
    const navigation = useNavigation();



    return(

        <View style = {{flexDirection : "row", marginLeft : 10, marginRight : 10, justifyContent : 'space-between', marginTop : 100, borderWidth : 1, height : 50, alignItems : 'center', borderRadius : 20}}>
            <TouchableOpacity onPressIn={() => {props.setmenu(1)}} style = {{height : 50, borderTopLeftRadius : 20, borderBottomLeftRadius : 20, justifyContent : 'center'}}>
                <Text style = {[props.menu == 1 ? {fontWeight : "bold"} : {}]}>Mes Annonces</Text>
            </TouchableOpacity>
            <TouchableOpacity onPressIn={() => {props.setmenu(2)}}  style = {[{height : 50, justifyContent : 'center'}]}>
                <Text style = {[props.menu == 2 ? {fontWeight : "bold"} : {}]}>Mes Aides</Text>
            </TouchableOpacity>

            <TouchableOpacity onPressIn={() => {props.setmenu(3)}}  style = {{height : 50, justifyContent : 'center'}}>
                <Text style = {[props.menu == 3 ? {fontWeight : "bold"} : {}]}>Mes Demandes</Text>
            </TouchableOpacity>

            <TouchableOpacity onPressIn={() => {props.setmenu(4)}}  style = {{height : 50, borderTopRightRadius : 20, borderBottomRightRadius: 20, justifyContent : 'center'}}>
                <Text style = {[props.menu == 4 ? {fontWeight : "bold"} : {}]}>Mes plaintes</Text>
            </TouchableOpacity>


            
        </View>
    );


};

const AddAnnonces = () => {
    const window = useWindowDimensions();
    const navigation = useNavigation();
    const [data, setData] = useState([]);
    useEffect(() => {
        const collectionRef = collection(db, 'Annonces'); // Utilisation de collection()
        const query2 = query(collectionRef, where('userId', '==', auth.currentUser.uid));
        const unsubscribe = onSnapshot(query2, snapshot => {
          const newData = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          setData(newData);
        });
    
        return () => {
          unsubscribe(); // Arrêter l'écoute lorsque le composant est démonté
        };
      }, []);
    
    return(
        <View>
        <ScrollView>
            {
                data.map((element) => {
                    console.log(element);
                    return(
                        <TouchableOpacity onPress={() => {navigation.navigate("Demande", element)}} style = {{marginBottom : 20, marginLeft : 10, marginRight : 10}}>
                        <Image style = {{width : "100%", height : 200, borderRadius : 10}} source = {{uri : element.uris[1].uri}}></Image>
                        <Text style = {{fontWeight : "bold", fontSize : 20, marginBottom : 5}}>{element.title}</Text>
                        <Text>{element.soustitle}</Text>
                  
                      </TouchableOpacity>);
                    
                })

            }


         

        </ScrollView>
         
               </View>

    );
}


const AddAide = (props) => {
    const window = useWindowDimensions();
    const navigation = useNavigation();
    const [data, setData] = useState([]);
    const [setprops, Props] = useState(null);
    useEffect(() => {
        const collectionRef = collection(db, 'Aide'); // Utilisation de collection()
        const query2 = query(collectionRef, where('userId', '==', auth.currentUser.uid), where('demande' , '==', props.data));
        const unsubscribe = onSnapshot(query2, snapshot => {
          const newData = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          setData(newData);
        });
    
        return () => {
          unsubscribe(); // Arrêter l'écoute lorsque le composant est démonté
        };
      }, []);
    
    return(
        <View>
        <ScrollView>
            {
                data.map((element) => {
                    console.log("element ", element);
                    return(
                        <TouchableOpacity style = {{width : "100%", height : 70, marginBottom : 50, justifyContent : 'center', marginRight: 10, marginLeft : 10, marginTop : 20}}>
                        <View style = {{flexDirection : "row"}}>
                          <Image source = {{uri : element.photoUrl}} style = {{width : 50, height : 50, borderRadius : 10, marginRight : 10}}></Image>
                          <View>
                            <Text style = {{fontWeight : "bold", marginRight : 100}}>{element.title}</Text>
                            <Text style = {{marginTop : 5, marginRight : 100}}>{element.annonce}</Text>
                            <Text style = {{color : "grey"}}>{element.demande ? "possibilité de rémuneration" : "demande une rémuneration"} {element.pay ? "(oui)" : "(non)"}</Text>
                          </View>
                        </View>
                      </TouchableOpacity>);
                    
                })

            }


         

        </ScrollView>
         
               </View>

    );
}



const AddentreAide = (props) => {
    const window = useWindowDimensions();
    const navigation = useNavigation();
    const [data, setData] = useState([]);
    const [setprops, Props] = useState(null);
    useEffect(() => {
        const collectionRef = collection(db, 'Aide'); // Utilisation de collection()
        const query2 = query(collectionRef, where('userId', '==', auth.currentUser.uid), where('demande' , '==', props.data));
        const unsubscribe = onSnapshot(query2, snapshot => {
          const newData = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          setData(newData);
        });
    
        return () => {
          unsubscribe(); // Arrêter l'écoute lorsque le composant est démonté
        };
      }, []);
    
    return(
        <View>
        <ScrollView>
            {
                data.map((element) => {
                    console.log("element ", element);
                    return(
                        <TouchableOpacity style = {{width : "100%", height : 70, marginBottom : 50, justifyContent : 'center', marginRight: 10, marginLeft : 10, marginTop : 20}}>
                        <View style = {{flexDirection : "row"}}>
                          <Image source = {{uri : element.photoUrl}} style = {{width : 50, height : 50, borderRadius : 10, marginRight : 10}}></Image>
                          <View>
                            <Text style = {{fontWeight : "bold", marginRight : 100}}>{element.title}</Text>
                            <Text style = {{marginTop : 5, marginRight : 100}}>{element.annonce}</Text>
                            <Text style = {{color : "grey"}}>{element.demande ? "possibilité de rémuneration" : "demande une rémuneration"} {element.pay ? "(oui)" : "(non)"}</Text>
                          </View>
                        </View>
                      </TouchableOpacity>);
                    
                })

            }


         

        </ScrollView>
         
               </View>

    );
}



export const Profil = () => {
    const window = useWindowDimensions();
    const navigation = useNavigation();
    const [menu, setmenu] = useState(1);
    const [ProfilData, setProfilData] = useState();

    const tocreator = (menu) => {
        if (menu == 1){
            navigation.navigate("AddAnonces");
        }
        if (menu == 2){
            console.log("hey");
            navigation.navigate("AddEntreAide");
        }
        if (menu == 3){
            console.log("hey");
            navigation.navigate("AddEntreDemandeAide");
        }
        
        
    }
    
    
    useEffect(() => {
        const collectionRef = doc(db, 'Users', auth.currentUser.uid);
        const unsubscribe = onSnapshot(collectionRef, snapshot => {
            console.log(snapshot.data());
          const newData = snapshot.data();
          setProfilData(newData);
        });
    
        return () => {
          unsubscribe(); // Arrêter l'écoute lorsque le composant est démonté
        };
      }, []);


    console.log("profilData" , ProfilData);
    const data = {icon :  "https://firebasestorage.googleapis.com/v0/b/mycampus-74605.appspot.com/o/" + auth.currentUser.uid + "%2Fprofile.jpg?alt=media&token=05a5860d-0b8d-42a9-a527-45123593fa83"};
    return(
        <View style = {{backgroundColor : 'white', height : '100%'}}>
            <ScrollView>
            <View style = {{height : 300, width : "100%", backgroundColor : "rgba(93, 95, 239, 1)"}}>
                <View style = {{marginTop : 50, marginLeft : 10, marginRight : 10, justifyContent : 'space-between', flexDirection : 'row'}}>
                    <TouchableOpacity onPressIn = {() => {navigation.navigate("GererCompte")}}><Text style = {{color : 'white', fontWeight : "bold"}}>Gérez son compte</Text></TouchableOpacity>
                    <TouchableOpacity onPressIn={() => {signOut(auth), navigation.navigate("Login")}}><Text style = {{color : 'white', fontWeight : "bold"}}>Déconnexion</Text></TouchableOpacity>
                    
            </View>
            <View style = {{width : 110, height : 110, position : "absolute", top : window.height - 600, left : window.width / 2 - 55, borderRadius : 100, backgroundColor : 'white'}}></View>
            <Image source = {{uri : ProfilData != undefined? ProfilData.photoUrl : data.icon}} style = {{width : 100, height : 100, position : "absolute", top : window.height - 596, left : window.width / 2 - 50, borderRadius : 100}}></Image>
            </View>
            <View style = {{flexDirection : "row", justifyContent : 'space-between', marginLeft : 10, marginRight : 10}}>
            <Text style = {{fontWeight : "bold", fontSize : 20}}>{ProfilData != undefined? ProfilData.nom.replace(":", "\n"): "loading..."}</Text>
            <Text style = {{fontWeight : "bold", fontSize : 20}}>{ProfilData != undefined? ProfilData.numeroAppart : "loading..."}</Text>
            </View>
            <MenuProfil menu = {menu} setmenu= {setmenu} style = {{marginTop : 3}}></MenuProfil>
            <View style = {{marginTop : 10, marginBottom : 30}}>
            {
                menu == 1 ?
                <AddAnnonces></AddAnnonces>
                : menu == 2 ?
                <AddAide data = {false}></AddAide>
                :menu == 3 ?
                <AddentreAide data = {true}></AddentreAide>:
                <></>



            }
            
            </View>
            </ScrollView>
            <TouchableOpacity onPress={() => {tocreator(menu)}}  style = {{width : 50, height: 50, borderRadius : 100, justifyContent : 'center', backgroundColor: "rgba(93, 95, 239, 1)"
           , position : "absolute", top : window.height - 200, left : window.width / 2 - 25}}>
                   <Text style = {{textAlign : 'center', color : 'white', fontWeight : 'bold', fontSize : 30}}>+</Text>
               </TouchableOpacity>
        </View>

    );
};

