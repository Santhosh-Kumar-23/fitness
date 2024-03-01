import {View, Text, Image} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

const SplashScreen = () => {
  const navigation = useNavigation();

  setTimeout(() => {
    navigation.navigate('HomeScreen');
  }, 2000);

  return (
    <View
      style={{
        backgroundColor: '#010A0D',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
      }}>
      <Image source={require('../assets/splash.png')} resizeMode="contain" />
    </View>
  );
};

export default SplashScreen;
