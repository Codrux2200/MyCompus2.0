import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, useWindowDimensions, Image, ScrollView, TouchableOpacity, Button, Alert, Dimensions, Modal, TextInput } from 'react-native';
import { Menu } from '../Components/menu';
import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { ImageCarrousel } from '../Components/imagecarrousel';
import { useNavigation } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Staylishinput } from '../Components/stylishinput';
import { SearchBar } from '../Components/SearchBar';
import { confirmationAide } from '../entreaide/entreaide';
import GestureRecognizer from 'react-native-swipe-gestures';
import { isColor } from 'react-native-reanimated';
import { uploadCommentaires } from '../Components/FireConfig';
import { collection, doc, onSnapshot, query , where} from 'firebase/firestore';
import { db, auth } from '../App';
const screen = Dimensions.get('window');
export const AnnoncesWidjet = (props) => {
  const navigation = useNavigation();
    console.log(props);
    return(
        <TouchableOpacity onPress={() => {props.data.demande ? navigation.navigate("ConfirmationAide", props.data) :navigation.navigate("ConfirmationAidePropositon", props.data)  }} style = {{width : "100%", height : 70, marginBottom : 50, justifyContent : 'center', marginRight: 10, marginLeft : 10, marginTop : 20}}>
          <View style = {{flexDirection : "row"}}>
            <Image source = {{uri : props.data.photoUrl}} style = {{width : 50, height : 50, borderRadius : 10, marginRight : 10}}></Image>
            <View>
              <Text style = {{fontWeight : "bold", marginRight : 100}}>{props.data.title}</Text>
              <Text style = {{marginTop : 5, marginRight : 100}}>{props.data.annonce}</Text>
              <Text style = {{color : "grey"}}>{ props.data.demande ? "possibilité de rémuneration" : "demande une rémuneration"} {props.data.pay ? "(oui)" : "(non)"}</Text>
              <Text style = {{fontSize : 10}}>cliquez pour plus d'info</Text>
            </View>
          </View>
        </TouchableOpacity>
            );


}


const AnnoncesTab = () => {
  const [state, setState] = useState(true);
  const [FalseData, setFalseData] = useState(null);



  useEffect(() => {
    const collectionRef = collection(db, 'Aide');
    const query2 = query(collectionRef, where('etablisementId', '==', auth.currentUser.photoURL));
    const unsubscribe = onSnapshot(query2, snapshot => {
      const newData = snapshot.docs.map(doc => (doc.data()
      ));
      setFalseData(newData);
      console.log("false Data", FalseData, auth.currentUser.photoURL);
    });

    return () => {
      unsubscribe(); // Arrêter l'écoute lorsque le composant est démonté
    };
  }, []);

    return(
      <View>
        <ScrollView style = {{width : '100%'}}>
            {
              FalseData != null ?
                FalseData.map((data) => {
                    return(
                      state == false ? 
                      data.demande == false ?
                    <AnnoncesWidjet data = {data}></AnnoncesWidjet> :<></> : 
                    data.demande == true?<AnnoncesWidjet data = {data}></AnnoncesWidjet> :
                    <></>);

                }) : <></>

            }
        </ScrollView>
        <ChangeState state = {state} setState = {setState}></ChangeState>
        </View>

    );
}

export const ChangeState = (props) => {
  const window = useWindowDimensions();
  return(
  <View style = {{ borderWidth : 2, marginLeft : 10, marginRight : 30, borderRadius : 30 , height : 100, width : '100%', backgroundColor : 'rgba(246, 246, 246, 1)', zIndex : 100, flexDirection : 'row', justifyContent : 'space-between',borderWidth: 1, borderColor : 'rgba(232, 232, 232, 1)', marginTop : window.height - 650, right : 10 }}>
    <TouchableOpacity onPressIn={() => {props.setState(true)}}  style = {[ props.state == true ? {backgroundColor : 'white'} : {backgroundColor : "rgba(246, 246, 246, 1)"} ,{justifyContent : 'center', borderTopLeftRadius : 30, borderBottomLeftRadius : 30, width : "50%"}]}><Text style = {{textAlign : 'center', fontWeight : "bold"}}>Demande d'aide</Text></TouchableOpacity>
    <TouchableOpacity  onPressIn={() => {props.setState(false)}}  style = {[ props.state == false ? {backgroundColor : 'white'} : {backgroundColor : "rgba(246, 246, 246, 1)"} ,{justifyContent : 'center', borderTopRightRadius : 30, borderBottomRightRadius : 30, width : "50%"}]}><Text style = {{textAlign : 'center', fontWeight : "bold"}}>Proposition d'une aide         </Text></TouchableOpacity>
  </View>);

} 

export const AddAnnonces = (props) => {
  useEffect(() => {
    

  });
  const window = useWindowDimensions();
  const navigation = useNavigation();
  console.log("props" , props);
  const data = props.route.params;
  const [visible, isvisible] = useState(false);
  const [commentaire, iscommentaire] = useState(false);
  const [commentaireData, isCommentaireData] = useState({});
  return(
      <ScrollView style = {{backgroundColor : 'rgba(100,100,100, 0)'}}>
        <View style = {{height : 200, width : "100%", backgroundColor : "rgba(93, 95, 239, 1)"}}>

        <View style = {{width : 110, height : 110, position : "absolute", top : window.height - 705, left : window.width / 2 - 55, borderRadius : 100, backgroundColor : 'white'}}></View>
        <Image source = {{uri : data.photoUrl}} style = {{width : 100, height : 100, position : "absolute", top : window.height - 700, left : window.width / 2 - 50, borderRadius : 100}}></Image>
        </View>

        <View style = {{marginLeft : 10, marginRight : 10}}>
          <View style = {{flexDirection : 'row', width : "100%", justifyContent : 'space-between'}}>
            <TouchableOpacity><Image source = {require('../assets/sub_like.png')} style = {{width : 30, height : 30, marginTop : 20}}></Image></TouchableOpacity>
            <TouchableOpacity><Image source = {require('../assets/sub_dislike.png')} style = {{width : 30, height : 30, marginTop : 20}}></Image></TouchableOpacity>
          </View>
          <Text style = {{marginTop : 70, fontWeight : "bold", fontSize : 18, textAlign : 'center'}}>{data.title}</Text>
          <ImageCarrousel tab = {data.uris}></ImageCarrousel>
          <Text style = {{marginTop : 30, textAlign : 'justify', fontWeight : 'bold', marginBottom : 19}}>{data.annonce}</Text>
          <Text>commentaires :</Text>
          <ScrollView style = {{height : 200}}>
            {

              data.commentaire.map((data) => {
                return(
               <TouchableOpacity onPress={() => {isCommentaireData(data), iscommentaire(true)}} style = {{flexDirection : 'row', backgroundColor : "rgba(246, 246, 246, 1)", borderColor : 'rgba(232, 232, 232, 1)', marginLeft : 10, marginBottom : 30, justifyContent : 'space-between',
               borderWidth : 2}}>
                {!data.photoUrl == ""?
                  <Image source = {{uri : data.photoUrl}} style = {{width : 30, height : 30, borderRadius : 100}}></Image>:
                  <View style = {{width : 30, height : 30, borderRadius : 100, backgroundColor : 'grey'}}>
                  </View>
                }
                  <View>
                    <Text style = {{fontWeight : "bold", textAlign : 'center'}}>{data.name}</Text>
                    <Text  numberOfLines={1} style = {{width : 200, height : 20}}>{data.commentaire}</Text>
                  </View>
                  <View style = {{alignSelf : 'center'}}>
                    {
                      !data.proprio ?
                      <></>:
                      <View backgroundColor = {"red"} style = {{width : 20, height : 20, borderRadius : 100}}></View>

                    }
                  </View>
               </TouchableOpacity> );
              })
            }

          </ScrollView>
        </View>
            <TouchableOpacity onPressIn={() => {isvisible(true)}} style = {{width : "94%", marginLeft : 10, marginRight: 10, height : 50, backgroundColor : "rgba(93, 95, 239, 1)", marginBottom : 30, borderRadius : 10, justifyContent : 'center'}}>
                <Text style = {{textAlign : 'center', fontWeight : 'bold', color : "white"}}>Laissez un commentaire</Text>
            </TouchableOpacity>
      <AnnonceModal visible = {visible} isvisible = {isvisible} id = {data.id}></AnnonceModal>
      </ScrollView>
  );
};


const AnnonceModal = (props) => {
  const window = useWindowDimensions();
  const data = props;
  console.log("data", data);
  const [text, setText] = useState("");
  return(
    <GestureRecognizer onSwipeDown={() => {data.isvisible(false)}}>
    <Modal animationType="slide"
    transparent={true}
    visible={data.visible}>
      <View style = {{backgroundColor : "rgba(0,0,0,0.5)"}}>
      <View style = {{backgroundColor : "white", width : window.width, height : window.height,
     marginTop : window.height - 500, borderRadius : 20 }}>
      <View style = {{marginLeft : 10, marginRight : 10, marginTop : 30}}>
        <View style = {{justifyContent : "space-around", flexDirection : 'column', height : window.height - 500}}>
        <Text style = {{fontWeight : "bold", fontSize : 30, alignSelf: 'center'}}>Commentaire:</Text>
        <View style = {{borderWidth : 1, borderColor : "black" , width : "100%", height : 200, alignSelf : 'center'}}>
        <TextInput multiline style = {{fontWeight: "20", }} value = {text} onChangeText = {(val) => {setText(val)}}></TextInput>
        </View>
        </View>
        
      </View>
      <TouchableOpacity onPress={() => {Alert.alert("êtes vous sur de publier ce commentaire ?","" , [{text : "oui", onPress : () => {uploadCommentaires(data.id, text).then(() => {data.isvisible(false)})}}, {text : "non", onPress : () => {data.isvisible(false)}} ] )}} style = {{backgroundColor : 'blue', marginLeft : 10,marginRight : 10, height : 50, justifyContent : 'center',
    borderRadius : 10 }}>
        <Text style = {{fontWeight : "bold", color : "white", textAlign : 'center'}}>Publier</Text>
      </TouchableOpacity>
      </View>
      
      </View>
    </Modal>
    </GestureRecognizer>
  );
}



const CommentaireModal = (props) => {
  const window = useWindowDimensions();
  const data = props;
  const [text, setText] = useState("");
  return(
    <GestureRecognizer onSwipeDown={() => {data.isvisible(false)}}>
    <Modal animationType="slide"
    transparent={true}
    visible={data.visible}>
      <View style = {{backgroundColor : "rgba(0,0,0,0.5)"}}>
      <View style = {{backgroundColor : "white", width : window.width, height : window.height,
     marginTop : window.height - 500, borderRadius : 20 }}>
      <View style = {{marginLeft : 10, marginRight : 10, marginTop : 30}}>
        <View style = {{justifyContent : "space-around", flexDirection : 'column', height : window.height - 500}}>
        <Text style = {{fontWeight : "bold", fontSize : 30, alignSelf: 'center'}}>Commentaire:</Text>
        <View style = {{borderWidth : 1, borderColor : "black" , width : "100%", height : 200, alignSelf : 'center'}}>
        <TextInput multiline style = {{fontWeight: "20", }} value = {text} onChangeText = {(val) => {setText(val)}}></TextInput>
        </View>
        </View>
        
      </View>
      <TouchableOpacity onPress={() => {Alert.alert("êtes vous sur de publier ce commentaire ?","" , [{text : "oui", onPress : () => {uploadCommentaires("a9479d65a11e60bb", text)}}, {text : "non", onPress : () => {data.isvisible(false)}} ] )}} style = {{backgroundColor : 'blue', marginLeft : 10,marginRight : 10, height : 50, justifyContent : 'center',
    borderRadius : 10 }}>
        <Text style = {{fontWeight : "bold", color : "white", textAlign : 'center'}}>Publier</Text>
      </TouchableOpacity>
      </View>
      
      </View>
    </Modal>
    </GestureRecognizer>
  );
}


export const Annonces = () => {
  const navigation = useNavigation();
  const windowDimensions = useWindowDimensions();
  const bottomSheetRef = useRef(null);



  const AlertAnnonces = () => {
    Alert.alert("Gérer mes annonces", "", [
      {
        text: "Changer une annonces",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      { text: "Ajouter une annonces", onPress: () => {navigation.navigate("AnnonceModal")} },
    ]);
  };

  return (
    <View style={{ height: "100%", backgroundColor: "white" }}>
      <View style = {{marginTop :50, marginLeft : 10, marginRight : 10,display : 'flex', flexDirection : 'column',
      justifyContent : "space-between", backgroundColor : 'white', marginBottom : 10}}>
        <View style = {{flexDirection : 'row', alignItems : 'center', marginLeft : 'auto', marginRight : 'auto', width : "100%", justifyContent : 'space-between'}}>
        <TouchableOpacity><Text style = {{fontSize : 16, color : "rgba(93, 95, 239, 1)"}}>Profile</Text></TouchableOpacity>
          <View style = {{flexDirection : 'row', alignItems : 'center'}}>
          <Image source = {require("../assets/maisonpleine.png")} style = {{width : 50, height : 50}}></Image>
        <Text style = {{fontStyle : 'italic', fontWeight : 'bold', fontSize : 30}}>MyCompus</Text>
        </View>
        <TouchableOpacity><Text style = {{fontSize : 16, color : "rgba(93, 95, 239, 1)"}}>Filter</Text></TouchableOpacity>
        </View>
        </View>
        <View style = {{marginLeft : 10, marginRight : 10}}>
      <SearchBar></SearchBar>
      </View>
      <View style = {{height : 30}}></View>
      <AnnoncesTab></AnnoncesTab>   
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
