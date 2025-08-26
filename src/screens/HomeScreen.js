import React from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

const HomeScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LinearGradient
        colors={['#231c4dff', '#873d96ff']}
        
        style={{
          flex: 1,
          justifyContent: 'space-evenly',
          alignItems: 'center',
          paddingVertical: 40,
          paddingHorizontal: 20,
        }}
      >
        
        <Image
          source={require('../assets/image/Cloud.png')}
          style={{
            height: 230,
            width: 230,
            resizeMode: 'contain',
          }}
        />

       
        <View style={{ alignItems: 'center' }}>
          <Text
            style={{
              fontSize: 50,
              fontWeight: 'bold',
              color: 'white',
              marginBottom: 5,
            }}
          >
            Weather
          </Text>
          <Text
            style={{
              fontSize: 40,
              fontWeight: 'bold',
              color: '#f7c400',
            }}
          >
            ForeCasts
          </Text>
        </View>

       
        <TouchableOpacity
          style={{
            backgroundColor: '#f7c400',
            paddingVertical: 15,
            paddingHorizontal: 40,
            borderRadius: 30,
            elevation: 5,
          }}
          onPress={() => navigation.navigate('Degree')}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: '#333',
              textAlign: 'center',
            }}
          >
            Get Start
          </Text>
        </TouchableOpacity>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default HomeScreen;
