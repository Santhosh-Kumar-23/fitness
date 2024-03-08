import React from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import {RFPercentage} from 'react-native-responsive-fontsize';
import useOrientation from '../common/hooks/Orientation';

const SigninScreen = props => {
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
          source={require('../assets/f2.png')}
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
            backgroundColor: 'transparent',
            flexDirection: 'row',
            justifyContent: 'space-between',
            // alignItems:,
          }}>
          <View
            style={{
              width: RFPercentage(8.5),
              height: RFPercentage(8),
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
          <Pressable
            onPress={() => {
              props.navigation.goBack();
            }}
            style={{
              top: RFPercentage(4),
              right:
                orientation == 'PORTRAIT' ? RFPercentage(4) : RFPercentage(7.5),
            }}>
            <Image
              source={require('../assets/cancel.png')}
              resizeMode="contain"
              style={{width: RFPercentage(3), height: RFPercentage(3)}}
            />
          </Pressable>
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
            Sign in
          </Text>

          <TextInput
            label="Password"
            secureTextEntry
            left={<TextInput.Icon icon="eye" />}
          />

          <Button
            mode="contained"
            textColor="#010A0D"
            labelStyle={{
              fontSize: RFPercentage(1.65),
              fontWeight: '400',
              fontFamily: 'Roboto-Regular',
            }}
            contentStyle={{
              paddingHorizontal: 20,
              paddingVertical: RFPercentage(0.5),
            }}
            style={{
              backgroundColor: '#B4E13F',
              borderRadius: 50,
              marginVertical: 16,
            }}
            onPress={() => {
              // Change 200 to the desired position
            }}>
            Sign In
          </Button>
          <Text
            style={{
              textAlign: 'center',
              color: '#B4E13F',
              fontSize: RFPercentage(1.8),
              fontWeight: '400',
              lineHeight: RFPercentage(3.5),
              fontFamily: 'Roboto-Regular',
            }}>
            Forget Password?
          </Text>
          <Text
            style={{
              textAlign: 'center',
              color: 'white',
              fontSize: RFPercentage(1.8),
              fontWeight: '400',
              lineHeight: RFPercentage(3.5),
              fontFamily: 'Roboto-Regular',
            }}>
            Didn’t have any account?{' '}
            <Text
              style={{color: '#B4E13F', fontWeight: '700'}}
              onPress={() => {
                props.navigation.navigate('SignupScreen');
              }}>
              Sign Up here
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

export default SigninScreen;
