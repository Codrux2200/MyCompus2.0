import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, useWindowDimensions} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from './homePage/HomePage';
import { Menu } from './Components/menu';
import { AddAnnonces, Annonces } from './Annonces/annonces';
import { CardStyleInterpolators } from "@react-navigation/stack";
import { Aide, ConfirmationAide, ConfirmationAideProposition } from './entreaide/entreaide';
import { Profil } from './Profil/Profil';
import { initializeApp } from 'firebase/app';
import {initializeAuth, Auth, onAuthStateChanged} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import { Login } from './Login/login';
import { SignIn } from './Login/signin';
import { useEffect, useState } from 'react';
import { AddAnnoncesModal } from './Annonces/addAnoncesModal';
import { GestionCompte } from './GestionCompte/gestioncompte';
import { Modifier } from './Modifier/modifier';
import { AddentreAideModal, AddentreDemandeModal } from './entreaide/entreAideModal';
// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCTvwkzlTtIxxsrtmg0lJh8NhuPLTObn1M",
  authDomain: "mycampus-74605.firebaseapp.com",
  databaseURL: "https://mycampus-74605-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "mycampus-74605",
  storageBucket: "mycampus-74605.appspot.com",
  messagingSenderId: "241661623705",
  appId: "1:241661623705:web:d4138efcc4c8dcc47f2708",
  measurementId: "G-L8RHVVT26F"
};

export const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app);
export const db = getFirestore(app);


const Stack = createNativeStackNavigator();



export default function App() {
 const windowDimensions = useWindowDimensions();
 const [User, setUser] = useState(null);

  useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log('Utilisateur connecté :');
      setUser(user);
    } else {
      console.log('Utilisateur déconnecté');
      setUser(user);
    }
  });
  return () => unsubscribe();
}, []);
  return (
    <View style = {{height : windowDimensions.height - 30, backgroundColor : 'white'}}>
    <NavigationContainer style = {{height : '300', backgroundColor : 'white'}}>
      <Stack.Navigator initialRouteName= {User ? "Home" : "Login"}>
        <Stack.Screen name = "Login" component={Login} options={{headerShown : false}}/>
        <Stack.Screen name = "SignIn" component={SignIn} options={{headerShown : false}}/>
        <Stack.Screen name="Home" component={HomeScreen} options={{headerShown: false}}/>
        <Stack.Screen name="Annonces" component={Annonces} options={{headerShown: false}}/>
        <Stack.Screen name="Aide" component={Aide} options={{headerShown: false}}/>
        <Stack.Screen name="Profil" component={Profil} options={{headerShown: false}}/>
        <Stack.Screen name="GererCompte" component={GestionCompte} options={{headerShown: false}}/>
        <Stack.Screen name="Modifier" component={Modifier} options={{headerShown: false}}/>
        <Stack.Screen
            name="Demande"
            component={AddAnnonces}
            options={{
              presentation: "modal",
              headerShown : false,
              cardStyleInterpolator:
                CardStyleInterpolators.forModalPresentationIOS,
              cardStyle: {
                backgroundColor: "transparent",
                opacity: 0.99,
                height : 200,
              },
              gestureResponseDistance: 500,
            }}
          />
           <Stack.Screen
            name="AddAnonces"
            component={AddAnnoncesModal}
            options={{
              presentation: "transparentModal",
              headerShown : false,
              cardStyleInterpolator:
                CardStyleInterpolators.forModalPresentationIOS,
              cardStyle: {
                backgroundColor: "transparent",
                opacity: 0.99,
                height : 200,
              },
              gestureResponseDistance: 500,
            }}
          />
      <Stack.Screen
            name="AddEntreAide"
            component={AddentreAideModal}
            options={{
              presentation: "transparentModal",
              headerShown : false,
              cardStyleInterpolator:
                CardStyleInterpolators.forModalPresentationIOS,
              cardStyle: {
                backgroundColor: "transparent",
                opacity: 0.99,
                height : 200,
              },
              gestureResponseDistance: 500,
            }} 
          />
           <Stack.Screen
            name="AddEntreDemandeAide"
            component={AddentreDemandeModal}
            options={{
              presentation: "transparentModal",
              headerShown : false,
              cardStyleInterpolator:
                CardStyleInterpolators.forModalPresentationIOS,
              cardStyle: {
                backgroundColor: "transparent",
                opacity: 0.99,
                height : 200,
              },
              gestureResponseDistance: 500,
            }} 
          />
          <Stack.Screen
            name="ConfirmationAide"
            component={ConfirmationAide}
            options={{
              presentation: "modal",
              headerMode: 'none',
              height : 200,
              transparentCard: true,
              headerShown : false,
            }}
          />
          <Stack.Screen
            name="ConfirmationAidePropositon"
            component={ConfirmationAideProposition}
            options={{
              presentation: "modal",
              headerMode: 'none',
              height : 200,
              transparentCard: true,
              headerShown : false,
            }}
          />
      </Stack.Navigator>
      {
        User != null ? 
          <Menu style = {[auth.currentUser == null ? {display : null} : {display : 'flex'}]}></Menu>:<></>
      }
    </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
