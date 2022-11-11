import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  AppState,
} from 'react-native';
import React, {useState} from 'react';
import {theme} from '../../utils/Constants';
import HeaderImage from '../../components/HeaderImage';
import Logo from '../../components/Logo';
import Header from '../../components/Header';
import TextInputFormat from '../../components/TextInputFormat';
import TextFormatted from '../../components/TextFormatted';
import Button from '../../components/Button';
import {PASSCODE, STAP} from '../../redux/actions/ActionType';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import Netinforsheet from '../../components/Netinforsheet';
import {ShowToast} from '../../utils/Baseurl';


const validateEmail = email => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    );
};
const validPass = pass => {
  return String(pass).match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/);
};
const Login = ({navigation}) => {
  const dispatch = useDispatch();
  const ThemeMode = useSelector(state => state.Theme);
  const Staps = useSelector(state => state.Stap);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const Loginapi = () => {    
    try {
      setLoading(true);
      const body = new FormData();
      body.append('email', email);
      body.append('password', password);
      axios({
        url: 'https://technorizen.com/Dating/webservice/login',
        method: 'POST',
        data: body,
        headers: {
          'content-type': 'multipart/form-data',
        },
      })
        .then(function (response) {            
          if (response.data.status == 1) {          
            setLoading(false);          
            dispatch({type: STAP, payload: response.data.result});
            navigation.navigate(
              response.data.result.step == 0
                ? 'step1'
                : response.data.result.step == 1
                ? 'step1'
                : response.data.result.step == 2
                ? 'step2'
                : response.data.result.step == 3
                ? 'step3'
                : response.data.result.step == 4
                ? 'step4'
                : response.data.result.step == 5
                ? 'step5'
                : response.data.result.step == 6
                ? 'step5'
                : (response.data.result.step == 8
                ? (Staps.fingerPrint
                  ? 'FingerPrint'
                  : 'PassCode')
                : 'step7'),
            );
          } else {  
            setLoading(false);       
            ShowToast("account doesn't exist");
            //console.log('invalid account');
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
        <Header title={'Sign in'} onPress={() => navigation.goBack()} />
        <View style={{height: 15}} />
        <Logo />
      </HeaderImage>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{paddingBottom: 40}}>
        <TextInputFormat
          label={'Email'}
          labelColor={
            email == '' || (email != null && !validateEmail(email))
              ? '#EA4A5A'
              : ThemeMode.selectedTheme
              ? theme.colors.primaryBlack
              : theme.colors.primary
          }
          borderWidth={
            email == '' || (email != null && !validateEmail(email)) ? 1 : 0
          }
          placeholder={'Insert your email'}
          value={email}
          onChangeText={setEmail}
          containerStyle={{marginTop: 20}}
          mess="Not a valid email address"
          showMess={
            email == '' || (email != null && !validateEmail(email))
              ? true
              : false
          }
          keyboardType="email-address"
        />
        <TextInputFormat
          label={'Password'}
          labelColor={
            password == '' || (password != null && !validPass(password))
              ? '#EA4A5A'
              : ThemeMode.selectedTheme
              ? theme.colors.primaryBlack
              : theme.colors.primary
          }
          borderWidth={
            password == '' || (password != null && !validPass(password)) ? 1 : 0
          }
          placeholder={'Insert your password'}
          value={password}
          onChangeText={setPassword}
          containerStyle={{marginTop: 20}}
          right={
            <TouchableOpacity onPress={() => setShow(!show)}>
              <Image
                resizeMode="contain"
                source={
                  show
                    ? require('../../assets/icons/eyehide.png')
                    : require('../../assets/icons/eyeshow.png')
                }
                style={{
                  height: 22,
                  width: 22,
                  tintColor: theme.colors.darkGrey,
                  marginLeft: 10,
                }}
              />
            </TouchableOpacity>
          }
          secureTextEntry={show ? false : true}
          showMess={
            password == '' || (password != null && !validPass(password))
              ? true
              : false
          }
          mess={
            ' Password should be minimum 8 digits length with 1 Uppercase and 1 number'
          }
        />
        <TextFormatted
          style={{
            fontSize: 12,
            fontWeight: '300',
            color: ThemeMode.selectedTheme ? '#8490AE' : theme.colors.primary,
            alignSelf: 'flex-end',
            marginTop: 10,
            marginRight: 15,
            padding: 5,
          }}
          onPress={() => {
            navigation.navigate('PasswordRecovery');
            dispatch({type: PASSCODE, payload: {isPasscode: false}});
          }}>
          Forgot password?
        </TextFormatted>
        <Button
          opacity={validateEmail(email) && validPass(password) ? 1 : 0.5}
          onPress={() =>  {Loginapi();}}
          buttonName={'Login'}
          Loading={loading}
          disabled={validateEmail(email) && validPass(password) ? false : true}
        />
        <TextFormatted
          style={{
            fontSize: 14,
            fontWeight: '300',
            color: ThemeMode.selectedTheme
              ? theme.colors.primaryBlack
              : theme.colors.primary,
            marginTop: 15,
            textAlign: 'center',
          }}>
          or sign in with
        </TextFormatted>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            alignSelf: 'center',
            marginTop: 20,
          }}>
          <TouchableOpacity
            style={{
              ...styles.socialbg,
              backgroundColor: ThemeMode.selectedTheme
                ? theme.colors.primary
                : theme.colors.primaryBlack,
              shadowColor: ThemeMode.selectedTheme
                ? theme.colors.primary
                : theme.colors.Black,
            }}>
            <Image
              source={require('../../assets/icons/google.png')}
              style={{height: 25, width: 25, resizeMode: 'contain'}}
            />
          </TouchableOpacity>
          <View style={{width: 30}} />
          <TouchableOpacity
            style={{
              ...styles.socialbg,
              backgroundColor: ThemeMode.selectedTheme
                ? theme.colors.primary
                : theme.colors.primaryBlack,
              shadowColor: ThemeMode.selectedTheme
                ? theme.colors.primary
                : theme.colors.Black,
            }}>
            <Image
              source={require('../../assets/icons/facebook.png')}
              style={{height: 25, width: 25, resizeMode: 'contain'}}
            />
          </TouchableOpacity>
          <View style={{width: 30}} />
          <TouchableOpacity
            style={{
              ...styles.socialbg,
              backgroundColor: ThemeMode.selectedTheme
                ? theme.colors.primary
                : theme.colors.primaryBlack,
              shadowColor: ThemeMode.selectedTheme
                ? theme.colors.primary
                : theme.colors.Black,
            }}>
            <Image
              source={require('../../assets/icons/apple.png')}
              style={{
                height: 25,
                width: 25,
                resizeMode: 'contain',
                tintColor: ThemeMode.selectedTheme
                  ? theme.colors.Black
                  : theme.colors.primary,
              }}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignSelf: 'center',
            alignItems: 'center',
            position: 'absolute',
            bottom: 0,
          }}>
          <TextFormatted
            style={{
              fontSize: 14,
              fontWeight: '300',
              color: ThemeMode.selectedTheme
                ? theme.colors.primaryBlack
                : theme.colors.primary,
              marginRight: 5,
            }}>
            no account?
          </TextFormatted>
          <TextFormatted
            style={{
              fontSize: 14,
              fontWeight: '600',
              color: ThemeMode.selectedTheme
                ? theme.colors.primaryBlack
                : theme.colors.primary,
            }}
            onPress={() => navigation.navigate('Signup')}>
            Sign up
          </TextFormatted>
        </View>
      </ScrollView>
      <Netinforsheet />
    </View>
  );
};
export default Login;
const styles = StyleSheet.create({
  socialbg: {
    height: 50,
    width: 50,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#8490ae85',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 10,
  },
});
