import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import Lucide from '@react-native-vector-icons/lucide'
import SearchModal from '../components/SearchModal';
import Geolocation from '@react-native-community/geolocation';
const WeatherScreen = () => {
  const [apiresponse, setApiResponse] = useState(null);
  const [current,setCurrent] = useState([])
  const [weekly, setWeekly] = useState([]);
  const [modalVisible, setModalVisible] = useState(false)
  const [city, setCity] = useState('rawalpindi');

  const navigation = useNavigation()

const getCurrentWeather = async () => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=a02b2ddff5bf5fc5372b45dc81166514&units=metric`
    );
    const json = await response.json();
    setApiResponse(json);
  } catch (error) {
    console.error('Error fetching current weather:', error);
  }
};

const getWeeklyForecast = async () => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=a02b2ddff5bf5fc5372b45dc81166514&units=metric`
    );
    const json = await response.json();
    setWeekly(json.list.slice(0, 7));
  } catch (error) {
    console.error('Error fetching forecast:', error);
  }
};

useEffect(() => {
  if(city){
  getCurrentWeather();}
  else{
  Geolocation.getCurrentPosition((position)=>{
    const {latitude,longitude} = position.coords;
    getCurrentLocation(latitude,longitude)
  })

  }
  getWeeklyForecast();
}, [city]); 

// // <== city state change triggers new fetch

  //   const getDayName=(dateString)=>{
  //   const date = new Date(dateString);
  //   const options = {weekly:'long'};
  //   return date.toLocaleDateString('en-US',options);
  // }
  //  const getLocalTime=(timestamp)=>{
  //   const date = new Date(timestamp*1000);

  //   return date.toLocaleDateString('en-US',{
  //     hour:'2-digit',
  //     minute:'2-digit',
  //     hour12:true,
  //     // timeZone:'RawalPindi',
  //   });
  // };
  const handleCitySelect = ({ city }) => {
    setCity(city);
    setModalVisible(false);
  };
  const getCurrentLocation=async(lat,lon)=>{
const data=await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=a02b2ddff5bf5fc5372b45dc81166514&units=metric`)
const jsonResponse=await data.json()
 setApiResponse(jsonResponse)
  }
return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={['#25186eff', '#873d96ff']} style={styles.gradient}>
        <View style={{ alignSelf: 'flex-end', margin: 20 }}>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Lucide name='search' size={30} color={'white'} />
          </TouchableOpacity>
        </View>

        <SearchModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          onSelectCity={handleCitySelect}
        />

        <View style={styles.topSection}>
          <Image source={require('../assets/image/Cloud.png')} style={styles.weatherIcon} />
          <Text style={styles.precipitation}>{apiresponse?.name}</Text>
          <Text style={styles.temperature}>{apiresponse?.main?.temp} °C</Text>

          <Text style={styles.minMax}>{apiresponse?.main?.temp_max} °C</Text>
          <Text style={styles.minMax}>{apiresponse?.main?.temp_min} °C</Text>
        </View>


        <Image source={require('../assets/image/House.png')} style={styles.houseImage} />


        <View style={styles.bottomCard}>

          <View style={styles.dateRow}>
            <View style={styles.tabContainer}>
              <Text style={styles.dateText}>Weekly</Text>
              <View style={styles.underline} />
            </View>
            <View style={styles.tabContainer}>
              <Text style={styles.dateText}>July, 21</Text>
            </View>
          </View>

          <View style={styles.separator} />


          <FlatList
            data={weekly}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={styles.weatherItem}>
                {/* <Text>{getDayName(item.dt_txt)}</Text> */}
                {/* <Text>{getLocalTime(item.dt)}</Text> */}
                <Text style={styles.itemTemp}>{Math.round(item.main.temp)}°C</Text>
                <Image
                  source={{
                    uri: `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`,
                  }}
                  style={styles.itemIcon}
                />
                <Text style={styles.itemTime}>{item.dt_txt.split(' ')[1].slice(0, 5)}</Text>
              </View>
            )}
          />
        </View>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('FinalScreen',{
              currentWeather: apiresponse,
              weeklyForecast: weekly,
          })
          }
          
        >
          <Text style={{ color: 'white', textAlign: 'right', margin: 10 }}>
            See Full Forecast
          </Text>
        </TouchableOpacity>

      </LinearGradient>
    </SafeAreaView>
  );
};

export default WeatherScreen;

const styles = StyleSheet.create({
  container: { flex: 1 },

  gradient: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'flex-start',
  },

  topSection: { alignItems: 'center', },
  weatherIcon: { width: 120, height: 120, resizeMode: 'contain' },
  temperature: { fontSize: 30, color: '#fff', fontWeight: 'bold', marginVertical: 5 },
  precipitation: { color: '#fff', fontSize: 30, marginTop: 5 },
  minMax: { color: '#fff', fontSize: 16, marginTop: 5 },

  houseImage: {
    width: '100%',
    height: 150,
    resizeMode: 'contain',
    alignSelf: 'center',
  },

  bottomCard: {
    backgroundColor: '#873d96',
    borderRadius: 25,
    padding: 20,
    marginBottom: 0,
  },

  dateRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  tabContainer: { alignItems: 'center' },
  dateText: { color: '#fff', fontSize: 16 },
  underline: {
    height: 3,
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 2,
    marginTop: 4,
  },

  separator: {
    height: 1.5,
    backgroundColor: '#fff',
    opacity: 0.3,
    width: '100%',
    marginVertical: 10,
  },

  weatherItem: { alignItems: 'center', marginHorizontal: 10 },
  itemTemp: { color: '#fff', marginBottom: 5 },
  itemIcon: { width: 40, height: 40, resizeMode: 'contain', marginBottom: 5 },
  itemTime: { color: '#fff', fontSize: 12 },
});








