import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, useWindowDimensions, Image, ScrollView, TouchableOpacity, TouchableNativeFeedback} from 'react-native';
import { Menu } from '../Components/menu';
import { useState, useEffect } from 'react';
import { ImageCarrousel } from '../Components/imagecarrousel';
import { SearchBar } from '../Components/SearchBar';


const AlertGeneral = () => {
  const window = useWindowDimensions();
  const falseData = [{title : "Plus d'electricité", message : "a partir de cette aprem il n'y a plus d'élécticité de 18 a 20 heures a cause d'un soucis de conduite", 
  uris : ["https://www.referenseo.com/wp-content/uploads/2019/03/image-attractive.jpg", "https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&w=1000&q=80"]},
  {title : "Plus d'electricité", message : "a partir de cette aprem il n'y a plus d'élécticité de 18 a 20 heures a cause d'un soucis de conduite", 
  uris : ["https://www.referenseo.com/wp-content/uploads/2019/03/image-attractive.jpg", "https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&w=1000&q=80"]}
]
  useEffect(() => {

    //use Effect pour recup les data


  }, []);


  return(
    <ScrollView>
      {
        falseData == null ?  <View style = {{marginTop : 20}}>
        <Text>Aucune Alerte active pour le moment !!</Text>
      </View> : 
      falseData.map((data) => {
        return(
        <View style = {{marginBottom : 20}}>
          <Image style = {{width : "100%", height : 300, borderRadius : 10}} source = {{uri : data.uris[0]}}></Image>
          <Text style = {{fontWeight : "bold", fontSize : 20, marginBottom : 5}}>{data.title}</Text>
          <Text>{data.message}</Text>

        </View>
        );

      
      })
    }
    <View style = {{height : 200}}></View>
    </ScrollView>

  );


} 

export const HomeScreen = () => {
    windowDimensions = useWindowDimensions();
    return(
      <View style = {{backgroundColor : 'white', height : '100%'}}>
      <View style = {{marginTop :50, marginLeft : 10, marginRight : 10,display : 'flex', flexDirection : 'column',
      justifyContent : "space-between", backgroundColor : 'white'}}>
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
        <AlertGeneral></AlertGeneral>

      </View></View>
  
    );
  }