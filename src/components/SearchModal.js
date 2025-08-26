import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Keyboard,
  ActivityIndicator,
  TouchableWithoutFeedback,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Modal from 'react-native-modal';
import Lucide from '@react-native-vector-icons/lucide';

const API_KEY = 'a02b2ddff5bf5fc5372b45dc81166514';

const SearchModal = ({ visible, onClose, onSelectCity }) => {
  const [searchText, setSearchText] = useState('');
  const [cityResults, setCityResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCities = async search => {
    if (!search) return;
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${search}&limit=10&appid=${API_KEY}`
      );
      const data = await response.json();
      setCityResults(data);
    } catch (error) {
      console.log('Fetch error:', error);
      setCityResults([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!searchText) {
      setCityResults([]);
      setLoading(false);
      return;
    }
    const timeout = setTimeout(() => {
      fetchCities(searchText);
    }, 500);
    return () => clearTimeout(timeout);
  }, [searchText]);

  const handleCityPress = item => {
    Keyboard.dismiss();
    onSelectCity({ city: item.name, lat: item.lat, long: item.lon });
    onClose();
    setSearchText('');
    setCityResults([]);
  };

  return (
    <Modal
      isVisible={visible}
      animationIn="bounceIn"
      animationOut="fadeOutDown"
      backdropOpacity={0.3}
      style={{ margin: 0 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.fullScreenContainer}>
          <LinearGradient
            colors={['#25186eff', '#873d96ff']}
            style={styles.gradient}
          >
            <View style={styles.topBar}>
              <TouchableOpacity onPress={onClose}>
                <View style={styles.lucideicon}>
                  <Lucide name="arrow-left" color="#ffffff" size={25} />
                </View>
              </TouchableOpacity>

              <View style={styles.searchContainer}>
                <TextInput
                  placeholder="Search city..."
                  placeholderTextColor="#ffffff"
                  style={styles.input}
                  value={searchText}
                  onChangeText={setSearchText}
                />
                <Lucide name="search" size={22} color="white" />
              </View>
            </View>

            {loading ? (
              <ActivityIndicator
                size="large"
                color="#fff"
                style={{ marginTop: 40 }}
              />
            ) : cityResults.length === 0 && searchText.length > 0 ? (
              <View style={styles.noResultContainer}>
                <Text style={styles.noResultText}>No cities found</Text>
              </View>
            ) : (
              <FlatList
                data={cityResults}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.cityItem}
                    onPress={() => handleCityPress(item)}
                  >
                    <Text style={styles.cityText}>
                      {item.name}, {item.state ? item.state + ', ' : ''}
                      {item.country}
                    </Text>
                  </TouchableOpacity>
                )}
                contentContainerStyle={{ paddingTop: 20 }}
                keyboardShouldPersistTaps="handled"
              />
            )}
          </LinearGradient>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default SearchModal;

const styles = StyleSheet.create({
  fullScreenContainer: { flex: 1 },
  gradient: { flex: 1, padding: 20 },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  lucideicon: {
    backgroundColor: '#ffffff40',
    width: 42,
    height: 42,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    marginRight: 12,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#ffffff30',
    borderRadius: 30,
    paddingHorizontal: 15,
    alignItems: 'center',
    height: 48,
  },
  input: {
    flex: 1,
    color: 'white',
    fontSize: 16,
    fontFamily: 'MerriweatherSans-Regular',
  },
  cityItem: {
    backgroundColor: '#ffffff20',
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginVertical: 6,
    borderRadius: 12,
    marginHorizontal: 4,
  },
  cityText: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'MerriweatherSans-SemiBold',
  },
  noResultContainer: {
    marginTop: 40,
    alignItems: 'center',
  },
  noResultText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'MerriweatherSans-Regular',
    opacity: 0.7,
  },
});
