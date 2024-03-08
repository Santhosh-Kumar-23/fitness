import {useEffect, useRef, useState} from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import useNetworkStatus from '../common/hooks/Network';
import useOrientation from '../common/hooks/Orientation';
// import * as commonStyles from '../common/styles'
import {Button} from 'react-native-paper';
import {RFPercentage} from 'react-native-responsive-fontsize';

const App = props => {
  // Props Variables
  const {} = props;

  // UseState Variables
  const [sliderState, setSliderState] = useState({currentPage: 0});

  // Hooks Variables
  const orientation = useOrientation();
  const {isConnected, networkType} = useNetworkStatus();

  const scrollViewRef = useRef(null);
  const {width, height} = useWindowDimensions();

  // console.log('orientation::: ', orientation);

  // Other Variables
  const {currentPage: pageIndex} = sliderState;
  const onboardingData = [
    {
      header: `The Power${'\n'}Workout`,
      paragraph:
        'Achieve your fitness goals with our expert trainers! Join us for personalized workouts that get results',
    },
    {
      header: `The Power${'\n'}Workout`,
      paragraph:
        'Achieve your fitness goals with our expert trainers! Join us for personalized workouts that get results',
    },
    {
      header: 'The PowerWorkout',
      paragraph:
        'Achieve your fitness goals with our expert trainers! Join us for personalized workouts that get results',
    },
    {
      header: `Legs${'\n'}Workout`,
      paragraph:
        'Achieve your fitness goals with our expert trainers! Join us for personalized workouts that get results',
    },
  ];

  // Hooks Functions
  useEffect(() => {
    handleSlider();
  }, [width]);

  // Functions
  const renderBackSkipButtons = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          // backgroundColor: '#010A0D',
          backgroundColor: '#010A0D',
          paddingHorizontal: 28,
          paddingVertical: 12,
        }}>
        <View
          style={{
            flex: 0.5,
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
          }}>
          {pageIndex != 0 && (
            <Pressable
              onPress={() => {
                handleSlider('DEC');
              }}
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
              }}>
              <Image
                source={require('../assets/back.png')}
                style={{width: RFPercentage(2), height: RFPercentage(2)}}
              />
              <Text
                style={{
                  color: 'white',
                  fontFamily: 'Roboto-Regular',
                  fontSize: RFPercentage(1.9),
                }}>
                Back
              </Text>
            </Pressable>
          )}
        </View>
        <View
          style={{
            flex: 0.5,
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}>
          {onboardingData.length - 1 != pageIndex && (
            <Pressable
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => {
                handleSlider('SKIP');
              }}>
              <Text
                style={{
                  color: 'white',
                  fontFamily: 'Roboto-Regular',
                  fontSize: RFPercentage(1.9),
                }}>
                Skip
              </Text>
              <Image
                source={require('../assets/skip.png')}
                style={{width: RFPercentage(2), height: RFPercentage(2)}}
              />
            </Pressable>
          )}
        </View>
      </View>
    );
  };

  const renderIntroSliders = () => {
    const setSliderPage = event => {
      const {currentPage} = sliderState;
      const {x} = event.nativeEvent.contentOffset;

      const indexOfNextScreen = Math.round(x / width);

      if (indexOfNextScreen !== currentPage) {
        setSliderState({
          ...sliderState,
          currentPage: indexOfNextScreen,
        });
      }
    };

    const renderItem = (item, index) => {
      return (
        <View
          style={{
            width,
            flex: 1,
            justifyContent: 'flex-end',
          }}
          key={index}>
          <View style={styles.wrapper}>
            <Text style={styles.header}>{item.header}</Text>
            <Text style={styles.paragraph}>{item.paragraph}</Text>
          </View>
        </View>
      );
    };

    return (
      <ScrollView
        horizontal
        onScroll={event => {
          setSliderPage(event);
        }}
        pagingEnabled
        ref={scrollViewRef}
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}>
        {onboardingData.map((item, index) => renderItem(item, index))}
      </ScrollView>
    );
  };

  const handleSlider = (action = null, scrollIndex = null) => {
    console.log('scrollIndex::', scrollIndex);
    console.log('PAGEINDEX::', pageIndex);
    const lastIndex = onboardingData.length - 1;

    switch (action) {
      case 'DEC':
        const checkIsFirst = pageIndex == 0;

        scrollViewRef.current.scrollTo({
          x: (checkIsFirst ? pageIndex : pageIndex - 1) * width,
          animated: true,
        });
        break;

      case 'INC':
        const checkIsLast = lastIndex == pageIndex;

        scrollViewRef.current.scrollTo({
          x: (checkIsLast ? pageIndex : pageIndex + 1) * width,
          animated: true,
        });

        pageIndex == 3 && props.navigation.navigate('GetStarted');

        break;

      case 'SKIP':
        props.navigation.navigate('GetStarted');

      default:
        // scrollViewRef.current.scrollTo({
        //   x:
        //     (scrollIndex || scrollIndex == 0 ? scrollIndex : pageIndex) * width,
        //   animated: false,
        // });
        break;
    }
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          width,
          height,
        }}>
        <Image
          resizeMode="center"
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
        ]}>
        <View
          style={{
            flex: 1,
          }}>
          {renderBackSkipButtons()}
          {renderIntroSliders()}
          <View style={{paddingHorizontal: 20}}>
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
              }}
              onPress={() => {
                handleSlider('INC'); // Change 200 to the desired position
              }}>
              Next
            </Button>
          </View>
          <View style={[styles.paginationWrapper]}>
            {Array.from(Array(4).keys()).map((_key, index) => (
              <Pressable
                onPress={() => {
                  handleSlider(null, index);
                }}
                style={[
                  styles.paginationDots,
                  {
                    opacity: pageIndex >= index ? 1 : 0.2,
                    borderColor:
                      pageIndex != index
                        ? pageIndex >= index
                          ? 'white'
                          : 'white'
                        : 'transparent',
                    borderWidth: 1.75,
                  },
                  pageIndex == index && {width: 40},
                ]}
                key={index}
              />
            ))}
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  header: {
    fontSize: RFPercentage(4),
    fontWeight: '600',
    color: 'white',
    lineHeight: RFPercentage(5.25),
    paddingVertical: 10,
    fontFamily: 'Saira-Bold',
  },
  paragraph: {
    fontSize: RFPercentage(1.9),
    fontFamily: 'Roboto-Regular',
    fontWeight: '400',
    color: 'white',
    lineHeight: RFPercentage(2.3),
  },
  paginationWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: 16,
  },
  paginationDots: {
    height: 10,
    width: 10,
    borderRadius: 10 / 2,
    backgroundColor: '#B4E13F',
    marginLeft: 10,
  },
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

export default App;
