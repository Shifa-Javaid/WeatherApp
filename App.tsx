import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import HomeScreen from './src/screens/HomeScreen'
import Degree from './src/screens/Degree'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import FinalScreen from './src/screens/FinalScreen'




function App() {

  const Stack = createNativeStackNavigator()
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>

       <Stack.Screen name='HomeScreen' component={HomeScreen}/> 
 <Stack.Screen name='Degree' component={Degree} /> 
   <Stack.Screen name="FinalScreen" component={FinalScreen} />  

     </Stack.Navigator>
     </NavigationContainer>
    //  <HomeScreen/>
    //  <Degree />
    
    // <FinalScreen/>

  )
}

export default App

const styles = StyleSheet.create({})