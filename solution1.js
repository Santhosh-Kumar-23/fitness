import {useEffect, useRef, useState} from 'react';
import {
  Image,
  PixelRatio,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import {Button} from 'react-native-paper';
import useOrientation from '../common/hooks/Orientation';
// import * as commonStyles from '../common/styles'
import {buttonStyles, cardStyles} from '../common/styles';

const App = props => {
  // Props Variables
  const {} = props;

  // UseState Variables
  const [sliderState, setSliderState] = useState({currentPage: 0});

  // Hooks Variables
  const scrollViewRef = useRef(null);
  const {width} = useWindowDimensions();

  // Other Variables
  const orientation = useOrientation();
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
    handleSliderNavigation();
  }, [width]);

  // Functions
  const renderBackSkipButtons = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 28,
          paddingVertical: 14,
        }}>
        <View
          style={{
            flex: 0.5,
            justifyContent: 'center',
          }}>
          {pageIndex != 0 && (
            <Pressable
              onPress={() => {
                handleSliderNavigation('DEC');
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
            justifyContent: 'center',
          }}>
          {onboardingData.length - 1 != pageIndex && (
            <Pressable
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-end',
                alignItems: 'center',
              }}
              onPress={() => {
                handleSliderNavigation('SKIP');
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

  const handleSliderNavigation = (action, scrollIndex) => {
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
          flex: 1,
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
              handleSliderNavigation('INC'); // Change 200 to the desired position
            }}>
            Next
          </Button>
        </View>
      </View>
      <View style={[styles.paginationWrapper]}>
        {Array.from(Array(4).keys()).map((_key, index) => (
          <Pressable
            onPress={() => {
              handleSliderNavigation(null, index);
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
  imageStyle: {
    height: PixelRatio.getPixelSizeForLayoutSize(135),
    width: '100%',
  },
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
});

export default App;
