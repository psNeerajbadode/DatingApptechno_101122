import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {theme} from '../../utils/Constants';
import HeaderImageShadow from '../../components/HeaderImageShadow';
import Header from '../../components/Header';
import TextFormatted from '../../components/TextFormatted';
import {PASSCODE, STAP} from '../../redux/actions/ActionType';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {ShowToast} from '../../utils/Baseurl';
import Netinforsheet from '../../components/Netinforsheet';
import TouchID from 'react-native-touch-id';

const PassCode = () => {
  const ThemeMode = useSelector(state => state.Theme);
  const Staps = useSelector(state => state.Stap);
  const navigation = useNavigation();
  const dimension = useWindowDimensions();
  const dispatch = useDispatch();
  const [passcode, setPasscode] = useState([]);
  const Removeval = () => {
    const Val_array = [...passcode];
    Val_array.pop();
    setPasscode(Val_array);
    console.log('Val_array',Val_array);
  };
  function App_passcode() {
    if (Staps.app_dashboard_pass == passcode.join('')) {
      dispatch({type: STAP, payload: {Plan_Name: 'Basic'}});
      navigation.replace('HomeNavigation');
    } else {
      if (passcode.length == 4) {
        ShowToast('Invalid Passcode');
      }
    }
  }
  function TouchID_support() {
    TouchID.isSupported()
      .then(biometryType => {
        // Success code
        if (biometryType === 'FaceID') {   
          ShowToast("Your device doesn't have a fingerprint"); 
          console.log('FaceID is supported.');
        } else { 
          navigation.replace('FingerPrint');
          console.log('TouchID is supported.');
         
        }
      })
      .catch(error => {
        console.log('error Fingur', error);
      });
  }
  useEffect(() => {}, [App_passcode()]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: ThemeMode.selectedTheme
          ? theme.colors.primary
          : theme.colors.primaryBlack,
      }}>
      <View style={{paddingBottom: 18}}>
        <HeaderImageShadow height={360}>
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
        <View
          style={{
            backgroundColor: ThemeMode.selectedTheme
              ? theme.colors.primary
              : theme.colors.primaryBlack,
            height: 60,
            position: 'absolute',
            bottom: 0,
            width: dimension.width - 40,
            alignSelf: 'center',
            borderRadius: 20,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.2,
            shadowRadius: 1.41,
            elevation: 2,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {Array(4)
            .fill('')
            .map((_, i) => (
              <View
                style={{
                  height: 25,
                  width: 25,
                  backgroundColor: ThemeMode.selectedTheme
                    ? 'FAFAFA'
                    : theme.colors.darkGrey,
                  borderRadius: 20,
                  margin: 12.5,
                }}>
                <TextFormatted
                  style={{
                    fontSize: 26,
                    fontWeight: '600',
                    color: ThemeMode.selectedTheme
                      ? theme.colors.Black
                      : theme.colors.primary,
                    textAlign: 'center',
                    textAlignVertical: 'center',
                    lineHeight: 26,
                  }}>
                  {passcode[i]}
                </TextFormatted>
              </View>
            ))}
        </View>
      </View>
      <ScrollView>
        <View
          style={{
            flexDirection: 'row',
            width: 300,
            flexWrap: 'wrap',
            alignSelf: 'center',
            marginTop: 10,
          }}>
          {Array(11)
            .fill('')
            .map((_, i) => (
              <TouchableOpacity
                disabled={passcode.length == 4  ? true : false}
                onPress={() =>
                  setPasscode(prevState => [...prevState,  i == 10 ? 0 : (i != 9 && i + 1)])
                }
                style={{width: 40, marginHorizontal: 30, marginVertical: 10}}>
                <TextFormatted
                  style={{
                    textAlign: 'center',
                    color: ThemeMode.selectedTheme
                      ? theme.colors.Black
                      : theme.colors.primary,
                    fontSize: 26,
                    fontWeight: '400',
                  }}>
                  {i == 9 ? (
                    <TouchableOpacity  onPress={() => Removeval()}>
                      <Image
                        resizeMode="contain"
                        source={require('../../assets/icons/sheet_arrow.png')}
                        style={{
                          height: 24,
                          width: 24,
                          tintColor: theme.colors.darkGrey,
                        }}
                      />
                    </TouchableOpacity>
                  ) : i == 10 ? (
                    0
                  ) : (
                    i + 1 
                  )}
                </TextFormatted>
              </TouchableOpacity>
            ))}

     <TouchableOpacity
            style={{marginLeft: 24}}
            onPress={() => {TouchID_support();}}>
            <Image
              source={require('../../assets/icons/fingerprint_1.png')}
              style={{
                resizeMode: 'contain',
                height: 50,
                width: 50,
                tintColor: '#000',
              }}
            />
          </TouchableOpacity> 
          {/* )} */}
        </View>
      </ScrollView>
      <TextFormatted
        style={{
          fontSize: 14,
          fontWeight: '600',
          color: ThemeMode.selectedTheme
            ? theme.colors.Black
            : theme.colors.primary,
          alignSelf: 'center',
          marginTop: 20,
          padding: 5,
          position: 'absolute',
          bottom: 10,
        }}
        onPress={() => {
          navigation.replace('PasswordRecovery');
          dispatch({type: PASSCODE, payload: {isPasscode: true}});
        }}>
        Forgot your passcode?
      </TextFormatted>
      <Netinforsheet />
    </View>
  );
};

export default PassCode;

const styles = StyleSheet.create({});
