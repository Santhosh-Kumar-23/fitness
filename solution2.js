import {useEffect, useRef, useState} from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  useWindowDimensions,
} from 'react-native';
import {Button} from 'react-native-paper';
import useOrientation from '../common/hooks/Orientation';
import useNetworkStatus from '../common/hooks/Network';
// import * as commonStyles from '../common/styles'
import {buttonStyles, cardStyles} from '../common/styles';

const App = props => {
  // Props Variables
  const {} = props;

  // UseState Variables
  const [sliderState, setSliderState] = useState({currentPage: 0});

  // Hooks Variables
  const orientation = useOrientation();
  const {isConnected, networkType} = useNetworkStatus();
  console.log('isConnected', isConnected);
  console.log('NetworkType', networkType);
  const scrollViewRef = useRef(null);
  const {width} = useWindowDimensions();

  console.log('orientation::: ', orientation);

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
          flex: orientation == 'PORTRAIT' ? 0.075 : 0.2,
          flexDirection: 'row',
          justifyContent: 'space-between',
          backgroundColor: '#010A0D',
          paddingHorizontal: 28,
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
                style={{width: 18, height: 18}}
              />
              <Text style={{color: 'white'}}>Back</Text>
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
                justifyContent: 'flex-end',
                alignItems: 'center',
              }}
              onPress={() => {
                // handleSliderNavigation('SKIP');
                console.log('AAAAAAAA');
              }}>
              <Text style={{color: 'white'}}>Skip</Text>
              <Image
                source={require('../assets/skip.png')}
                style={{width: 18, height: 18}}
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
            flex: orientation == 'PORTRAIT' ? 0.925 : 0.8,
            justifyContent: 'flex-end',
            backgroundColor: '#010A0D',
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

  const handleSlider = (action, scrollIndex) => {
    console.log('ScrollIndex:::::', scrollIndex);
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
        break;

      default:
        scrollViewRef.current.scrollTo({
          x: (scrollIndex || pageIndex) * width,
          animated: false,
        });
        break;
    }
  };

  return (
    <>
      <View
        style={{
          flex: 0.9375,
          backgroundColor: '#010A0D',
        }}>
        {renderBackSkipButtons()}
        {renderIntroSliders()}
        <View style={{paddingHorizontal: 20}}>
          <Button
            icon={require('../assets/b1.png')}
            mode="contained"
            textColor="#010A0D"
            labelStyle={{fontSize: 18, fontWeight: '400'}}
            contentStyle={{
              flexDirection: 'row-reverse',
              paddingHorizontal: 20,
              paddingVertical: 8,
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
    </>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  header: {
    fontSize: 37,
    fontWeight: '600',
    color: 'white',
    lineHeight: 45,
    paddingVertical: 10,
  },
  paragraph: {
    fontSize: 16,
    fontWeight: '400',
    color: 'white',
    lineHeight: 19,
  },
  paginationWrapper: {
    backgroundColor: '#010A0D',
    flex: 0.0625,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  paginationDots: {
    height: 10,
    width: 10,
    borderRadius: 10 / 2,
    backgroundColor: '#B4E13F',
    marginLeft: 10,
  },
});

export default App;
