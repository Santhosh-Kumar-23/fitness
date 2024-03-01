import React from 'react';
import {
  View,
  ImageBackground,
  Image,
  StyleSheet,
  useWindowDimensions,
  Text,
} from 'react-native';
import {Button} from 'react-native-paper';
import useOrientation from '../common/hooks/Orientation';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';

const GetStarted = props => {
  // Props Variables
  const {} = props;
  const orientation = useOrientation();
  const {width, height} = useWindowDimensions();

  console.log('orientation:::: ', orientation);

  return (
    <View style={styles.container}>
      <Image
        resizeMode="cover"
        source={require('../assets/background.png')}
        style={[
          styles.backgroundImage,
          {
            width,
            height,
          },
        ]}
      />
      <View
        style={{
          width,
          height,
          backgroundColor: 'black',
        }}>
        <Image
          resizeMode="contain"
          source={require('../assets/f1.png')}
          style={{
            width,
            height: height * 0.75,
          }}
        />
      </View>
      <View
        style={[
          styles.backgroundImage,
          {flex: 1, justifyContent: 'space-between'},
        ]}>
        <View
          style={{
            width:
              orientation == 'PORTRAIT' ? RFPercentage(8.5) : RFPercentage(10),
            height:
              orientation == 'PORTRAIT' ? RFPercentage(8) : RFPercentage(9.5),
            top: RFPercentage(4),
            left:
              orientation == 'PORTRAIT' ? RFPercentage(3) : RFPercentage(7.5),
          }}>
          <Image
            source={require('../assets/splash.png')}
            resizeMode="cover"
            style={{width: '100%', height: '100%'}}
          />
        </View>
        <View
          style={{paddingHorizontal: 20, paddingVertical: RFPercentage(3.5)}}>
          <Text
            style={{
              color: 'white',
              fontSize: RFPercentage(4),
              // fontWeight: '600',
              lineHeight: RFPercentage(5.25),
              fontFamily: 'Saira-Bold',
            }}>
            {orientation == 'PORTRAIT'
              ? `Let’s Make \nThe Power Start \nGood Shape`
              : `Let’s Make The Power Start Good Shape`}
          </Text>
          <Text
            style={{
              color: 'white',
              fontSize: RFPercentage(1.9),
              fontWeight: '400',
              lineHeight: RFPercentage(2.3),
              paddingVertical: 8,
              fontFamily: 'Roboto-Regular',
            }}>
            {`Achieve your fitness goals with our expert trainers! Join us for personalized workouts that get results`}
          </Text>
          <Button
            icon={require('../assets/b1.png')}
            mode="contained"
            textColor="#010A0D"
            labelStyle={{
              fontSize: RFPercentage(1.65),
              fontWeight: '400',
              fontFamily: 'Roboto-Regular',
            }}
            contentStyle={{
              flexDirection: 'row-reverse',
              paddingHorizontal: 20,
              paddingVertical: RFPercentage(0.5),
            }}
            style={{
              backgroundColor: '#B4E13F',
              borderRadius: 50,
              marginVertical: 16,
            }}
            onPress={() => {
              props.navigation.navigate('SignupScreen');
              // Change 200 to the desired position
            }}>
            Get Started
          </Button>
          <Text
            style={{
              textAlign: 'center',
              color: 'white',
              fontSize: RFPercentage(1.8),
              fontWeight: '400',
              lineHeight: RFPercentage(2),
              fontFamily: 'Roboto-Regular',
            }}>
            If you have an account?{' '}
            <Text
              style={{color: '#B4E13F', fontWeight: '700'}}
              onPress={() => {
                props.navigation.navigate('SigninScreen');
              }}>
              Sign In here
            </Text>
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#010A0D',
  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1,
  },
  overlayContainer: {
    backgroundColor: 'black',
  },
});

export default GetStarted;
