import {ScrollView, StyleSheet, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {theme} from '../../utils/Constants';
import HeaderImage from '../../components/HeaderImage';
import Header from '../../components/Header';
import Logo from '../../components/Logo';
import TextFormatted from '../../components/TextFormatted';
import TextInputFormat from '../../components/TextInputFormat';
import Button from '../../components/Button';
import {useSelector} from 'react-redux';
import axios from 'axios';
import {ShowToast} from '../../utils/Baseurl';
import Netinforsheet from '../../components/Netinforsheet';

const validateEmail = email => {
  return String(email)
    .toLowerCase()
    .match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/);
};
const PasswordRecovery = ({navigation}) => {
  const [email, setEmail] = useState();
  const ThemeMode = useSelector(state => state.Theme);
  const isPasscode = useSelector(state => state.isPasscode.isPasscode);
  const [Loading, setLoading] = useState(false);

  const ForgetpasswordApi = () => {
    try {
      setLoading(true);
      const body = new FormData();
      body.append('email', email);
      axios({
        url: 'https://technorizen.com/Dating/webservice/forgot_password',
        method: 'POST',
        data: body,
        headers: {
          'content-type': 'multipart/form-data',
        },
      })
        .then(function (response) {
          if (response.data.status == 1) {
            setLoading(false);
            navigation.navigate('EmailOtp', {isSignup: false});
          } else {
            setLoading(false);
            ShowToast(response.data.result);
            console.log('log else');
          }
        })
        .catch(function (error) {
          console.log('catch', error);
          setLoading(false);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const ForgetpasscodeApi = () => {
    try {
      setLoading(true);
      const body = new FormData();
      body.append('email', email);
      axios({
        url: 'https://technorizen.com/Dating/webservice/forgot_passcode',
        method: 'POST',
        data: body,
        headers: {
          'content-type': 'multipart/form-data',
        },
      })
        .then(function (response) {
          if (response.data.status == 1) {
            setLoading(false);
            navigation.navigate('EmailOtp', {passcode: true});
          } else {
            setLoading(false);
            ShowToast(response.data.result);
            console.log('log else');
          }
        })
        .catch(function (error) {
          console.log('catch', error);
          setLoading(false);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: ThemeMode.selectedTheme
          ? theme.colors.primary
          : theme.colors.primaryBlack,
      }}>
      <HeaderImage>
        <Header
          onPress={() =>
            isPasscode ? navigation.navigate('PassCode') : navigation.goBack()
          }
          title={isPasscode ? 'Passcode Recovery' : 'Password Recovery'}
        />
        <View style={{height: 20}} />
        <Logo />
      </HeaderImage>

      <ScrollView>
        <TextFormatted
          style={{
            fontSize: 14,
            fontWeight: '300',
            color: ThemeMode.selectedTheme
              ? theme.colors.primaryBlack
              : theme.colors.primary,
            textAlign: 'center',
            marginTop: 40,
          }}>
          Forgot {isPasscode ? 'Passcode?' : 'Password?'}
        </TextFormatted>
        <TextInputFormat
          label={'Email '}
          labelColor={
            email == '' || (email != null && !validateEmail(email))
              ? '#EA4A5A'
              : ThemeMode.selectedTheme
              ? theme.colors.primaryBlack
              : theme.colors.primary
          }
          placeholder={'Insert your email'}
          value={email}
          borderWidth={
            email == '' || (email != null && !validateEmail(email)) ? 1 : 0
          }
          onChangeText={setEmail}
          containerStyle={{marginTop: 30}}
          keyboardType="email-address"
          mess={'Not a valid email address'}
          showMess={
            email == '' || (email != null && !validateEmail(email))
              ? true
              : false
          }
        />
        <Button
          opacity={validateEmail(email) ? 1 : 0.5}
          onPress={() => {
            isPasscode ? ForgetpasscodeApi() : ForgetpasswordApi();
          }}
          buttonName={'Recover'}
          Loading={Loading}
          disabled={validateEmail(email) ? false : true}
          marginTop={50}
        />
      </ScrollView>
      <Netinforsheet />
    </View>
  );
};

export default PasswordRecovery;

const styles = StyleSheet.create({});
