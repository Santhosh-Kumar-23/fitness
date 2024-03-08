import React from 'react';
import {Image, StyleSheet, View, useWindowDimensions} from 'react-native';
import useOrientation from '../common/hooks/Orientation';

const GetStarted = props => {
  // Props Variables
  const {} = props;
  const orientation = useOrientation();
  const {width, height} = useWindowDimensions();

  console.log('orientation:::: ', orientation);

  return (
    <View style={styles.container}>
      <View
        style={{
          width,
          height,
          backgroundColor: 'black',
        }}>
        <Image
          resizeMode="cover"
          source={require('../assets/f4.png')}
          style={{
            width,
            height: height,
          }}
        />
      </View>
      <View
        style={[
          styles.backgroundImage,
          {flex: 1, justifyContent: 'space-between'},
        ]}></View>
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
