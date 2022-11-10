import {StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AuthNavigation from './authNavigation';
import HomeNavigation from './homeNavigation';
import {useDispatch} from 'react-redux';
const Stack = createNativeStackNavigator();
const AppNavigation = () => {
  const dispatch = useDispatch();
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="authNavigation" component={AuthNavigation} />
      <Stack.Screen name="HomeNavigation" component={HomeNavigation} />
    </Stack.Navigator>
  );
};

export default AppNavigation;

const styles = StyleSheet.create({});
