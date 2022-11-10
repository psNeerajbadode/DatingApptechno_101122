import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {theme} from '../../utils/Constants';
import HeaderImage from '../../components/HeaderImage';
import Header from '../../components/Header';
import Logo from '../../components/Logo';
import TextFormatted from '../../components/TextFormatted';
import Button from '../../components/Button';
import {useDispatch, useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/Feather';
import {Baseurl, ShowToast} from '../../utils/Baseurl';

const RecoveryPassCode = ({navigation}) => {
  const dimension = useWindowDimensions();
  const [passcode, setPasscode] = useState([]);
  const pass = [];
  const dispatch = useDispatch();
  const ThemeMode = useSelector(state => state.Theme);
  const Staps = useSelector(state => state.Stap);
  const [loading, setLoading] = useState(false);
  const Removeval = () => {
    const Val_array = [...passcode];
    Val_array.pop();
    setPasscode(Val_array);
  };

  async function change_passcode() {
    try {
      const url = Baseurl + 'change_passcode';
      const body = new FormData();
      body.append('app_dashboard_pass', passcode.join(''));
      body.append('user_id', Staps.id);
      setLoading(true);
      const res = await fetch(url, {
        method: 'Post',
        headers: {
          'content-type': 'multipart/form-data',
        },
        body: body,
      });
      const rslt = await res.json();
      if (rslt.status == 1) {
        setLoading(false);
        // dispatch({type: STAP, payload: rslt.result});
        navigation.navigate('PassCode');
        ShowToast('Valid OTP');
      } else {
        setLoading(false);
        // alert(rslt.result || rslt.message || 'Unknown error');
        ShowToast('Invalid OTP');
      }
    } catch (e) {
      alert('An error occured.');
      console.log(e);
    }
  }
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: ThemeMode.selectedTheme
          ? theme.colors.primary
          : ThemeMode.selectedTheme
          ? theme.colors.primaryBlack
          : theme.colors.primary,
      }}>
      <View style={{paddingBottom: 18}}>
        <HeaderImage height={310}>
          <Header title={'Passcode Recovery'} />
          <Logo bottom={50} />
        </HeaderImage>
        <View
          style={{
            backgroundColor: ThemeMode.selectedTheme
              ? theme.colors.primary
              : theme.colors.primaryBlack,
            height: 60,
            position: 'absolute',
            bottom: -8,
            width: dimension.width - 40,
            alignSelf: 'center',
            borderRadius: 20,
            shadowColor: '#8490ae85',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 10,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {Array(4)
            .fill('')
            .map((_, i) => (
              <View
                style={{
                  height: 24,
                  width: 24,
                  backgroundColor: ThemeMode.selectedTheme
                    ? 'FAFAFA'
                    : theme.colors.darkGrey,
                  borderRadius: 20,
                  margin: 12.5,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <TextFormatted
                  style={{
                    fontSize: 26,
                    fontWeight: '600',
                    color: ThemeMode.selectedTheme
                      ? theme.colors.primaryBlack
                      : theme.colors.primary,
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
            marginTop: 40,
          }}>
          {Array(11)
            .fill('')
            .map((_, i) => (
              <TouchableOpacity
                disabled={passcode.length == 4 ? true : false}
                onPress={() =>
                  setPasscode(prevState => [...prevState, i == 10 ? 0 : i + 1])
                }
                style={{width: 50, marginHorizontal: 25, marginVertical: 2}}>
                <TextFormatted
                  style={{
                    textAlign: 'center',
                    color: ThemeMode.selectedTheme
                      ? theme.colors.primaryBlack
                      : theme.colors.primary,
                    fontSize: 26,
                    fontWeight: '400',
                    padding: 8,
                  }}>
                  {i == 9 ? (
                    <TouchableOpacity onPress={() => Removeval()}>
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
        </View>
        <Button
          opacity={passcode.length == 4 ? 1 : 0.5}
          buttonName={'Save passcode'}
          Loading={loading}
          onPress={() => {
            change_passcode();
          }}
          disabled={passcode.length == 4 ? false : true}
          marginTop={25}
        />
        <TextFormatted
          onPress={() => navigation.replace('PassCode')}
          style={{
            fontSize: 14,
            fontWeight: '400',
            color: ThemeMode.selectedTheme
              ? theme.colors.primaryBlack
              : theme.colors.primary,
            alignSelf: 'center',
            marginTop: 20,
            padding: 5,
          }}>
          Cancel
        </TextFormatted>
      </ScrollView>
    </View>
  );
};

export default RecoveryPassCode;

const styles = StyleSheet.create({});
