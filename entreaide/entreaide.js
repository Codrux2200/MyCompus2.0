import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, useWindowDimensions, Image, ScrollView, TouchableOpacity, Button, Alert, Dimensions } from 'react-native';
import { Menu } from '../Components/menu';
import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { ImageCarrousel } from '../Components/imagecarrousel';
import { useNavigation } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Staylishinput } from '../Components/stylishinput';
import { SearchBar } from '../Components/SearchBar';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db, auth } from '../App'
const screen = Dimensions.get('window');
export const AideWidjet = (props) => {
    const navigation = useNavigation();
    console.log(props.data.uris);
    return(
       <TouchableOpacity onPress={() => {navigation.navigate("Demande", props.data)}} style = {{marginBottom : 20}}>
      <Image style = {{width : "100%", height : 300, borderRadius : 10}} source = {{uri : props.data.uris[1].uri}}></Image>
      <Text style = {{fontWeight : "bold", fontSize : 20, marginBottom : 5}}>{props.data.title}</Text>
      <Text>{props.data.soustitle}</Text>

    </TouchableOpacity>
        
    );


}


const AideTab = () => {

  const [FalseData, setFalseData] = useState([]);

  useEffect(() => {
    const collectionRef = collection(db, 'Annonces');
    const query2 = query(collectionRef, where('etablisementId', '==', auth.currentUser.photoURL));
    const unsubscribe = onSnapshot(query2, snapshot => {
      const newData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setFalseData(newData);
    });

    return () => {
      unsubscribe(); // Arrêter l'écoute lorsque le composant est démonté
    };
  }, []);
    return(
        <ScrollView style = {{width : '100%'}}>
            {
                FalseData.map((data) => {
                    return(
                    <AideWidjet data = {data}></AideWidjet>);

                })
            }
            <View  style = {{height : 300}}></View>
        </ScrollView>


    );
}

export const ConfirmationAide = (props) => {
    const window = useWindowDimensions();
    const navigation = useNavigation();
    const data = props.route.params;
    return(
        <ScrollView style = {{backgroundColor : 'rgba(100,100,100, 0)'}}>
          <View style = {{height : 200, width : "100%", backgroundColor : "rgba(93, 95, 239, 1)"}}>

          <View style = {{width : 110, height : 110, position : "absolute", top : window.height - 705, left : window.width / 2 - 55, borderRadius : 100, backgroundColor : 'white'}}></View>
          <Image source = {{uri : data.photoUrl}} style = {{width : 100, height : 100, position : "absolute", top : window.height - 700, left : window.width / 2 - 50, borderRadius : 100}}></Image>
          </View>

          <View style = {{marginLeft : 10, marginRight : 10}}>
            <Text style = {{marginTop : 100, fontWeight : "bold", fontSize : 18, textAlign : 'center'}}>{data.title}</Text>
            <Text style = {{marginTop : 30, textAlign : 'justify'}}>{data.realText}</Text>
            <ImageCarrousel tab = {data.uris}></ImageCarrousel>
            <Text style = {{fontWeight : 40}}>Ce service sera possiblement à faire <Text style = {{fontWeight : "bold"}}>{data.pay ? "en étant payé" : "gratuitement"}</Text></Text>
            <Text style = {{marginTop : 10}}>Prix : <Text style = {{fontWeight : 'bold'}}>{data.pay ? "la personne peut donner $" : "0 dhs"}</Text></Text>
          </View>

          <TouchableOpacity onPressIn={() => Alert.alert("êtes vous sur de vouloir aider ?", 
          "cliquez sur ce bouton c'est accepter que vos certaines de vos coordonés soit partagé a cette personne",[
            {text : 'Oui', onPress : () => {console.log("ok")}}, {text : 'Non' , onPress : () => {navigation.goBack()}},
          ])} style = {{width : 200, height : 50, backgroundColor : 'rgba(93, 95, 239, 1)', marginTop : 40, alignSelf : 'center', justifyContent : 'center', borderRadius : 10}}>
              <Text style = {{textAlign : 'center', fontWeight : "bold", color : 'white'}}>Cliquez pour aider</Text>
          </TouchableOpacity>
          <View style = {{height : 100}}></View>
        </ScrollView>
    );
}


export const ConfirmationAideProposition = (props) => {
  const window = useWindowDimensions();
  const navigation = useNavigation();
  const data = props.route.params;
  return(
      <ScrollView style = {{backgroundColor : 'rgba(100,100,100, 0)'}}>
        <View style = {{height : 200, width : "100%", backgroundColor : "rgba(93, 95, 239, 1)"}}>

        <View style = {{width : 110, height : 110, position : "absolute", top : window.height - 705, left : window.width / 2 - 55, borderRadius : 100, backgroundColor : 'white'}}></View>
        <Image source = {{uri : data.photoUrl}} style = {{width : 100, height : 100, position : "absolute", top : window.height - 700, left : window.width / 2 - 50, borderRadius : 100}}></Image>
        </View>

        <View style = {{marginLeft : 10, marginRight : 10}}>
          <Text style = {{marginTop : 100, fontWeight : "bold", fontSize : 18, textAlign : 'center'}}>{data.title}</Text>
          <Text style = {{marginTop : 30, textAlign : 'justify'}}>{data.realText}</Text>
          <ImageCarrousel tab = {data.uris}></ImageCarrousel>
          <Text style = {{fontWeight : 40}}>Ce service sera possiblement <Text style = {{fontWeight : "bold"}}>{data.pay ? "payant" : "gratuit"}</Text></Text>
          <Text style = {{marginTop : 10}}>Prix : <Text style = {{fontWeight : 'bold'}}>{data.pay ? "la personne en demande $" : "0 dhs"}</Text></Text>
        </View>

        <TouchableOpacity onPressIn={() => Alert.alert("êtes vous sur de vouloir demander cette aide ?", 
        "cliquez sur ce bouton c'est accepter que vos certaines de vos coordonés soit partagé a cette personne",[
          {text : 'Oui', onPress : () => {console.log("ok")}}, {text : 'Non' , onPress : () => {navigation.goBack()}},
        ])} style = {{width : 200, height : 50, backgroundColor : 'rgba(93, 95, 239, 1)', marginTop : 40, alignSelf : 'center', justifyContent : 'center', borderRadius : 10}}>
            <Text style = {{textAlign : 'center', fontWeight : "bold", color : 'white'}}>Demander cette aide</Text>
        </TouchableOpacity>
        <View style = {{height : 100}}></View>
      </ScrollView>
  );
}


 
export const Aide = () => {
  const navigation = useNavigation();
  const windowDimensions = useWindowDimensions();
  const bottomSheetRef = useRef(null);



  const AlertAide = () => {
    Alert.alert("Gérer mes Aide", "", [
      {
        text: "Changer une Aide",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      { text: "Ajouter une Aide", onPress: () => {navigation.navigate("AnnonceModal")} },
    ]);
  };

  return (
    <View style={{ height: "100%", backgroundColor: "white" }}>
        
      <View style={{ marginTop: 50, marginLeft: 10, marginRight: 10, }}>
      <View style = {{flexDirection : 'row', alignItems : 'center', marginLeft : 'auto', marginRight : 'auto', width : "100%", justifyContent : 'space-between'}}>
        <TouchableOpacity><Text style = {{fontSize : 16, color : "rgba(93, 95, 239, 1)"}}>Profile</Text></TouchableOpacity>
          <View style = {{flexDirection : 'row', alignItems : 'center'}}>
          <Image source = {require("../assets/maisonpleine.png")} style = {{width : 50, height : 50}}></Image>
        <Text style = {{fontStyle : 'italic', fontWeight : 'bold', fontSize : 30}}>MyCompus</Text>
        </View>
        <TouchableOpacity><Text style = {{fontSize : 16, color : "rgba(93, 95, 239, 1)"}}>Filter</Text></TouchableOpacity>
        </View>

        <View style = {{marginTop : '5%', marginLeft : 'auto', marginRight : 'auto', marginBottom : "5%", width : '100%'}}>
          <SearchBar></SearchBar>
        </View>
     
      </View>
      <View style = {{position : 'relative', zIndex : -10, marginLeft : 10, marginRight : 10}}>
          <AideTab></AideTab>
        </View>
     
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
    position: "absolute",
    width: "100%",
    height: 1000,
    top: 100,
    zIndex: -100
    // Mettre un zIndex positif
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
     // Mettre un zIndex positif
  },
});
