import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {theme} from '../../utils/Constants';
import HeaderImage from '../../components/HeaderImage';
import Header from '../../components/Header';
import Logo from '../../components/Logo';
import TextInputFormat from '../../components/TextInputFormat';
import TextFormatted from '../../components/TextFormatted';
import Button from '../../components/Button';
import {useDispatch, useSelector} from 'react-redux';
import {Baseurl, ShowToast} from '../../utils/Baseurl';
import {STAP} from '../../redux/actions/ActionType';
import {
  BluelightImage,
  GreenlightImage,
  PurplelightImage,
  RedlightImage,
  YellowlightImage,
} from '../../utils/CustomImages';
import Netinforsheet from '../../components/Netinforsheet';
import {AccessToken, LoginManager} from 'react-native-fbsdk-next';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

const Signup = ({navigation}) => {
  const dispatch = useDispatch();
  const ThemeMode = useSelector(state => state.Theme);
  const Staps = useSelector(state => state.Stap);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [rePassword, setRePassword] = useState();
  const [show, setShow] = useState(false);
  const [showr, setShowr] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [Loading, setLoading] = useState(false);

  const validPass = pass => {
    return String(pass).match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/);
  };

  const validateEmail = email => {
    return String(email)
      .toLowerCase()
      .match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/);
  };

  async function Signup() {
    try {
      const url = Baseurl + 'signup_one';
      const body = new FormData();
      body.append('email', email);
      body.append('password', password);
      setLoading(true);
      const res = await fetch(url, {
        method: 'post',
        headers: {
          'content-type': 'multipart/form-data',
        },
        body: body,
      });

      const rslt = await res.json();
      console.log('Api Data =>', rslt.result);
      if (rslt.status == 1) {
        dispatch({type: STAP, payload: rslt.result});
        setLoading(false);
        navigation.navigate('EmailOtp', {Step1: true});
        console.log(rslt.status);
      } else {
        setLoading(false);
        ShowToast('Email already exist');
        console.log(rslt.message);
      }
    } catch (e) {
      alert('An error occured.');
      console.log(e);
    }
  }

  async function onFacebookButtonPress() {
    const result = await LoginManager.logInWithPermissions([
      'public_profile',
      'email',
      'user_friends',
    ]);
    console.log(JSON.stringify(result));
    if (result.isCancelled) {
      console.log('User cancelled the login process');
    }
    const data = await AccessToken.getCurrentAccessToken();
    console.log(JSON.stringify(data));
    if (!data) {
      console.log('Something went wrong obtaining access token');
    }
    fetch(
      'https://graph.facebook.com/v2.5/me?fields=email,name,friends&access_token=' +
        data.accessToken,
    )
      .then(response => response.json())
      .then(json => {
        // Some user object has been set up somewhere, build that user here
        console.log('onFacebookButtonPress user==>', json);
        //setSocialUser(null);
        SocialloginAPI(json.email, json.id);
      })
      .catch(() => {
        reject('ERROR GETTING DATA FROM FACEBOOK');
      });
  }

  const signOut = async () => {
    try {
      const userInfo = await GoogleSignin.signOut();
      console.log('userInfo', userInfo);
    } catch (error) {
      console.error(error);
    }
  };

  const GooglesignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();

      console.log('GoogleSignin userInfo  ===>', userInfo);
      SocialloginAPI(userInfo.user.email, userInfo.user.id);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('error', error);
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('error', error);
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('error', error);
        // play services not available or outdateds
      } else {
        // some other error happened
      }
    }
  };

  const SocialloginAPI = (email, id) => {
    try {
      const body = new FormData();
      body.append('email', email);
      body.append('social_id', id);
      axios({
        url: 'https://technorizen.com/Dating/webservice/social_login',
        method: 'POST',
        data: body,
        headers: {
          'content-type': 'multipart/form-data',
        },
      })
        .then(function (response) {
          if (response.data.status == 1) {
            ShowToast('successfull');
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
                : response.data.result.step == 8
                ? Staps.fingerPrint
                  ? 'FingerPrint'
                  : 'PassCode'
                : 'step7',
            );
          } else {
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

  useEffect(() => {
    GoogleSignin.configure();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: ThemeMode.selectedTheme
          ? theme.colors.primary
          : theme.colors.primaryBlack,
      }}>
      <HeaderImage>
        <Header title={'Sign up'} />
        <View style={{height: 20}} />
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
          placeholder={'Insert your Email'}
          value={email}
          onChangeText={setEmail}
          containerStyle={{marginTop: 20}}
          keyboardType="email-address"
          mess={'Not a valid Email Address'}
          showMess={
            email == '' || (email != null && !validateEmail(email))
              ? true
              : false
          }
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
            'Password should be minimum 8 digits length with 1 Uppercase and 1 number'
          }
        />

        <TextInputFormat
          label={'Repeat password'}
          labelColor={
            rePassword == '' || !(password == rePassword)
              ? theme.colors.red
              : ThemeMode.selectedTheme
              ? theme.colors.primaryBlack
              : theme.colors.primary
          }
          borderWidth={rePassword == '' || !(password == rePassword) ? 1 : 0}
          placeholder={'Repeat your password'}
          value={rePassword}
          onChangeText={setRePassword}
          containerStyle={{marginTop: 20}}
          right={
            <TouchableOpacity onPress={() => setShowr(!showr)}>
              <Image
                resizeMode="contain"
                source={
                  showr
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
          secureTextEntry={showr ? false : true}
          showMess={
            rePassword == '' ||
            (rePassword != null && !(password == rePassword))
              ? true
              : false
          }
          mess={
            'Repeat password is not matching the password, please enter the correct password'
          }
        />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginHorizontal: 20,
            marginTop: 30,
          }}>
          <TextFormatted
            style={{
              fontSize: 14,
              fontWeight: '400',
              color: ThemeMode.selectedTheme
                ? theme.colors.primaryBlack
                : theme.colors.primary,
              flex: 1,
              paddingVertical: 5,
            }}>
            Please confirm you accept our
            <TextFormatted
              style={{
                textDecorationLine: 'underline',
                color: ThemeMode.selectedTheme
                  ? theme.colors.primaryBlack
                  : theme.colors.primary,
              }}
              onPress={() => navigation.navigate('TermCondition')}>
              Terms of Services, Privacy Policies and cookies
            </TextFormatted>
          </TextFormatted>
          <View style={{width: 20}} />
          <TouchableOpacity
            style={{
              alignItems: 'center',
              alignSelf: 'center',
              padding: 2,
            }}
            onPress={() => setToggle(!toggle)}>
            <Image
              resizeMode="contain"
              style={{width: 58, height: 33}}
              source={
                ThemeMode.themecolr == 'Red'
                  ? toggle
                    ? RedlightImage.On_switchs
                    : RedlightImage.Off_switchs
                  : ThemeMode.themecolr == 'Blue'
                  ? toggle
                    ? BluelightImage.On_switchs_blue
                    : BluelightImage.Off_switchs_blue
                  : ThemeMode.themecolr == 'Green'
                  ? toggle
                    ? GreenlightImage.On_switchs_green
                    : GreenlightImage.Off_switchs_green
                  : ThemeMode.themecolr == 'Purple'
                  ? toggle
                    ? PurplelightImage.On_switchs_purplle
                    : PurplelightImage.Off_switchs_purplle
                  : ThemeMode.themecolr == 'Yellow'
                  ? toggle
                    ? YellowlightImage.On_switchs_yellow
                    : YellowlightImage.Off_switchs_yellow
                  : toggle
                  ? RedlightImage.On_switchs
                  : RedlightImage.Off_switchs
              }
            />
          </TouchableOpacity>
        </View>
        <Button
          opacity={
            validateEmail(email) &&
            password != '' &&
            validPass(password) == rePassword &&
            toggle
              ? 1
              : 0.5
          }
          onPress={() => Signup()}
          Loading={Loading}
          buttonName="Create Account"
          color={'#fff'}
          disabled={
            validateEmail(email) &&
            password != '' &&
            validPass(password) == rePassword &&
            toggle
              ? false
              : true
          }
          marginTop={36}
        />

        <TextFormatted
          style={{
            fontSize: 14,
            fontWeight: '300',
            color: ThemeMode.selectedTheme
              ? theme.colors.primaryBlack
              : theme.colors.primary,
            textAlign: 'center',
            marginTop: 30,
          }}>
          or sign up with
        </TextFormatted>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            alignSelf: 'center',
            marginTop: 30,
          }}>
          <TouchableOpacity
            onPress={() => /* signOut() */ GooglesignIn()}
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
            onPress={() => onFacebookButtonPress()}
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
            bottom: 10,
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
            already have an account?
          </TextFormatted>
          <TextFormatted
            style={{
              fontSize: 14,
              fontWeight: '600',
              color: ThemeMode.selectedTheme
                ? theme.colors.primaryBlack
                : theme.colors.primary,
            }}
            onPress={() => navigation.navigate('Login')}>
            Login
          </TextFormatted>
        </View>
      </ScrollView>
      <Netinforsheet />
    </View>
  );
};

export default Signup;

const styles = StyleSheet.create({
  socialbg: {
    height: 50,
    width: 50,
    borderRadius: 40,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
});
