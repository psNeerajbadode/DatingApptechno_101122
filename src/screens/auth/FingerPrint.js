import {
  Image,
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {theme} from '../../utils/Constants';
import HeaderImageShadow from '../../components/HeaderImageShadow';
import Header from '../../components/Header';
import TextFormatted from '../../components/TextFormatted';
import TouchID from 'react-native-touch-id';
import {useDispatch, useSelector} from 'react-redux';
import Netinforsheet from '../../components/Netinforsheet';
import {STAP} from '../../redux/actions/ActionType';
import { useNavigation } from '@react-navigation/native';

const FingerPrint = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const ThemeMode = useSelector(state => state.Theme);
  const Staps = useSelector(state => state.Stap);
  const [touch, setTouch] = useState(false);

  const [Authentication, setAuthentication] = useState();
  const optionalConfigObject = {
    title: 'Authentication Required', // Android
    imageColor: '#e00606', // Android
    imageErrorColor: '#ff0000', // Android
    sensorDescription: 'Touch sensor', // Android
    sensorErrorDescription: 'Failed', // Android
    cancelText: 'Cancel', // Android
    fallbackLabel: 'Show Passcode', // iOS (if empty, then label is hidden)
    unifiedErrors: false, // use unified error messages (default false)
    passcodeFallback: false, // iOS - allows the device to fall back to using the passcode, if faceid/touch is not available. this does not mean that if touchid/faceid fails the first few times it will revert to passcode, rather that if the former are not enrolled, then it will use the passcode.
  };
  function FingerScan() {
    TouchID.authenticate('', optionalConfigObject)
      .then(success => {
        console.log('success', success);
        dispatch({type: STAP, payload: {Plan_Name: 'Basic'}});
        navigation.replace('HomeNavigation');
        setTouch(true);
        setAuthentication(success);
      })
      .catch(error => {
        setTouch(false);
        console.log('error', error);
      });
  }

  useEffect(() => {
    FingerScan();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: ThemeMode.selectedTheme
          ? theme.colors.primary
          : theme.colors.primaryBlack,
      }}>
      <HeaderImageShadow>
        <Header left title={'Sign in'} />
        <View
          style={{
            height: 130,
            width: 130,
            backgroundColor: '#fff',
            borderRadius: 40,
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            marginTop: 28,
          }}>
          <Image
            source={require('../../assets/images/image.png')}
            style={{height: 135, width: 135, resizeMode: 'contain'}}
          />
        </View>
        <TextFormatted
          style={{
            fontSize: 16,
            fontWeight: '400',
            color: '#FFFFFF',
            textAlign: 'center',
            marginTop: 15,
          }}>
          Good evening,
        </TextFormatted>
        <TextFormatted
          style={{
            fontSize: 32,
            fontWeight: '700',
            color: '#FFFFFF',
            textAlign: 'center',
          }}>
          Alexander
        </TextFormatted>
      </HeaderImageShadow>
      <ScrollView
        style={{marginVertical: 20}}
        contentContainerStyle={{flexGrow: 1, justifyContent: 'space-between'}}>
        <TextFormatted
          style={{
            fontSize: 14,
            fontWeight: '300',
            color: ThemeMode.selectedTheme
              ? theme.colors.Black
              : theme.colors.primary,
            textAlign: 'center',
          }}>
          Unlock with your fingerprint
        </TextFormatted>

        <TouchableOpacity>
          <Image
            source={
              touch
                ? require('../../assets/icons/fingerprint_2.png')
                : require('../../assets/icons/fingerprint_1.png')
            }
            style={{
              height: 104,
              width: 104,
              resizeMode: 'contain',
              alignSelf: 'center',
              marginTop: 20,
            }}
          />
        </TouchableOpacity>

        <TextFormatted
          style={{
            fontSize: 14,
            fontWeight: '600',
            color: ThemeMode.selectedTheme
              ? theme.colors.Black
              : theme.colors.primary,
            alignSelf: 'center',
            padding: 5,
          }}
          onPress={() => navigation.replace('PassCode')}>
          Use passcode instead
        </TextFormatted>
      </ScrollView>
      <Netinforsheet  />
    </View>
  );
};

export default FingerPrint;

const styles = StyleSheet.create({});
