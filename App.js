import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect} from 'react';
import {
  StatusBar,
  Text,
  TouchableOpacity,
  BackHandler,
  Alert,
} from 'react-native';
import {
  AnimatedTabBarNavigator,
  DotSize,
  TabElementDisplayOptions,
} from 'react-native-animated-nav-tab-bar';
import {PaperProvider} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Feather';
import styled from 'styled-components/native';
import GetStarted from './src/screens/GetStarted';
import HomeScreen from './src/screens/HomeScreen';
import SplashScreen from './src/screens/SplashScreen';
import SigninScreen from './src/screens/SignInScreen';
import SignupScreen from './src/screens/SignUpScreen';

function MyTabs() {
  const Tabs = AnimatedTabBarNavigator();
  const Screen = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: white;
  `;

  const TabBarIcon = props => {
    return (
      <Icon
        name={props.name}
        size={props.size ? props.size : 24}
        color={props.tintColor}
      />
    );
  };

  const Home = props => (
    <Screen>
      <Text>Home</Text>
      <TouchableOpacity onPress={() => props.navigation.navigate('Discover')}>
        <Text>Go to Discover</Text>
      </TouchableOpacity>
    </Screen>
  );

  const Discover = props => (
    <Screen>
      <Text>Discover</Text>
      <TouchableOpacity onPress={() => props.navigation.navigate('Home')}>
        <Text>Go to Home</Text>
      </TouchableOpacity>
    </Screen>
  );

  const Images = () => (
    <Screen>
      <Text>Images</Text>
    </Screen>
  );

  const Profile = () => (
    <Screen>
      <Text>Profile</Text>
    </Screen>
  );
  return (
    <Tabs.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        activeTintColor: '#010a0d',
        inactiveTintColor: 'white',
        activeBackgroundColor: '#B4E13F',
      }}
      appearance={{
        shadow: true,
        floating: true,
        whenActiveShow: TabElementDisplayOptions.BOTH,
        dotSize: DotSize.SMALL,
        tabBarBackground: '#010A0D',
      }}>
      <Tabs.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({focused, color}) => (
            <TabBarIcon focused={focused} tintColor={color} name="home" />
          ),
        }}
      />
      <Tabs.Screen
        name="Discover"
        component={Discover}
        options={{
          tabBarIcon: ({focused, color}) => (
            <TabBarIcon focused={focused} tintColor={color} name="search" />
          ),
        }}
      />
      <Tabs.Screen
        name="Images"
        component={Images}
        options={{
          tabBarIcon: ({focused, color}) => (
            <TabBarIcon focused={focused} tintColor={color} name="image" />
          ),
        }}
      />
      <Tabs.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({focused, color}) => (
            <TabBarIcon focused={focused} tintColor={color} name="user" />
          ),
        }}
      />
    </Tabs.Navigator>
  );
}

export default function App() {
  useEffect(() => {
    const backAction = () => {
      Alert.alert('Hold on!', 'Are you sure you want to go back?', [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        {text: 'YES', onPress: () => BackHandler.exitApp()},
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);
  const Stack = createNativeStackNavigator();
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#010A0D'}}>
      <StatusBar backgroundColor={'#010A0D'} barStyle="light-content" />
      <PaperProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{headerShown: false}}
            initialRouteName="SplashScreen">
            <Stack.Screen component={SplashScreen} name="SplashScreen" />
            <Stack.Screen component={HomeScreen} name="HomeScreen" />
            <Stack.Screen component={GetStarted} name="GetStarted" />
            <Stack.Screen component={SigninScreen} name="SigninScreen" />
            <Stack.Screen component={SignupScreen} name="SignupScreen" />
            <Stack.Screen component={MyTabs} name="myTab" />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </SafeAreaView>
  );
}
