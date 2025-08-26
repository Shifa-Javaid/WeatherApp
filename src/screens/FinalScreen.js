import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Lucide from '@react-native-vector-icons/lucide';
import { useNavigation, useRoute } from '@react-navigation/native';

const FinalScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { currentWeather, weeklyForecast } = route.params || {};

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LinearGradient colors={['#0c0c91ff', '#da70d6']} style={styles.container}>
        
        <View style={styles.header}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Lucide name="chevron-left" size={30} color={'white'} />
            </TouchableOpacity>
            <Text style={styles.city}>{currentWeather?.name || 'City'}</Text>
          </View>
          <Text style={styles.temp}>
            Max: {currentWeather?.main?.temp_max}°   Min: {currentWeather?.main?.temp_min}°
          </Text>
        </View>

        
        <Text style={styles.title}>7-Days Forecasts</Text>

      
        <FlatList
          data={weeklyForecast}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 10 }}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.forecastCard}>
              <Text style={styles.dayTemp}>{Math.round(item.main.temp)}°C</Text>
              <Image
                source={{
                  uri: `https:openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`,
                }}
                style={styles.weatherIcon}
              />
              <Text style={styles.dayLabel}>
                {new Date(item.dt_txt).toLocaleDateString('en-US', { weekday: 'short' })}
              </Text>
            </View>
          )}
        />


        <LinearGradient colors={['#da70d6c9', '#3c3cbfa4']} style={styles.airQualityCard}>
          <Text style={styles.airQualityTitle}>💨  AIR QUALITY</Text>
          <Text style={styles.airQualityValue}>3 - Low Health Risk</Text>
          <View style={styles.airQualityFooter}>
            <Text style={styles.seeMore}>See more</Text>
            <Lucide name="chevron-right" size={30} color={'white'} />
          </View>
        </LinearGradient>

    
        <View style={styles.bottomCards}>
          <LinearGradient colors={['#da70d6c9', '#3c3cbfa4']} style={styles.infoCard}>
            <Text style={styles.infoTitle}>☀️  SUNRISE</Text>
            <Text style={styles.infoValue}>5:28 AM</Text>
            <Text style={styles.infoSub}>Sunset: 7:25 PM</Text>
          </LinearGradient>

          <LinearGradient colors={['#da70d6c9', '#3c3cbfa4']} style={styles.infoCard}>
            <Text style={styles.infoTitle}>🌤️  UV INDEX</Text>
            <Text style={styles.infoValue}>4</Text>
            <Text style={styles.infoSub}>Moderate</Text>
          </LinearGradient>
        </View>

        <View style={styles.menuContainer}>
          <View style={styles.menuLine} />
          <View style={styles.menuLine} />
          <View style={styles.menuLine} />
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default FinalScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    marginVertical: 20,
    padding: 10,
  },
  city: {
    fontSize: 24,
    color: '#fff',
    fontWeight: '600',
    marginLeft: 45,
  },
  temp: {
    fontSize: 18,
    color: '#fff',
    marginTop: 4,
    alignSelf: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 10,
    marginLeft: 10,
    marginTop: 30,
  },
  forecastCard: {
    backgroundColor: '#ffffff20',
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    width: 70,
    height: 130,
  },
  dayTemp: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  weatherIcon: {
    width: 40,
    height: 40,
    marginBottom: 4,
    resizeMode: 'contain',
  },
  dayLabel: {
    color: '#fff',
    fontSize: 14,
  },
  airQualityCard: {
    borderRadius: 15,
    padding: 20,
    marginTop: 20,
    margin: 20,
  },
  airQualityTitle: {
    fontSize: 14,
    color: '#fff',
    marginBottom: 10,
  },
  airQualityValue: {
    fontSize: 22,
    color: '#fff',
    fontWeight: 'bold',
  },
  airQualityFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15,
  },
  seeMore: {
    fontSize: 16,
    color: '#fff',
  },
  bottomCards: {
    flexDirection: 'row',
    gap: 5,
  },
  infoCard: {
    flex: 1,
    borderRadius: 15,
    padding: 15,
    margin: 10,
    marginTop: 25,
  },
  infoTitle: {
    fontSize: 14,
    color: '#fff',
    marginBottom: 8,
  },
  infoValue: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
  infoSub: {
    fontSize: 14,
    color: '#fff',
    marginTop: 5,
  },
  menuContainer: {
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 40,
  },
  menuLine: {
    width: 40,
    height: 3,
    backgroundColor: '#fff',
    marginVertical: 3,
    borderRadius: 2,
  },
});