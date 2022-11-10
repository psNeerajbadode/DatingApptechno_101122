import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  PermissionsAndroid,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Pagination from '../../../components/Pagination';
import HeaderImage_1 from '../../../components/HeaderImage_1';
import TextFormatted from '../../../components/TextFormatted';
import {theme} from '../../../utils/Constants';
import Button from '../../../components/Button';
import ButtonView from '../../../components/buttonView';
import {useDispatch, useSelector} from 'react-redux';
import Geolocation from 'react-native-geolocation-service';
import Geocoder from 'react-native-geocoding';
import axios from 'axios';
import {
  BluelightImage,
  GreenlightImage,
  PurplelightImage,
  RedlightImage,
  YellowlightImage,
} from '../../../utils/CustomImages';
import {STAP} from '../../../redux/actions/ActionType';
import Netinforsheet from '../../../components/Netinforsheet';

const Step5 = ({navigation}) => {
  const dispatch = useDispatch();
  const ThemeMode = useSelector(state => state.Theme);
  const Staps = useSelector(state => state.Stap);
  const [toggle, setToggle] = useState(false);
  const [Adress, setAdress] = useState();
  const [long, setLong] = useState();
  const [letu, setLetu] = useState();
  const [Loading, setLoading] = useState(false);

  async function requestLocationPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          /* title:
          'Allow “...” to olso access your location even when you are not using the app?',
          message: 'Location will be used always.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK', */
        },
      );
      if (granted === 'granted') {
        console.log('You can use the Location');
      } else {
        console.log('Location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  }
  const Loactionset = () => {
    const hasLocationPermission = requestLocationPermission();
    if (hasLocationPermission) {
      Geolocation.getCurrentPosition(
        position => {
          setToggle(true);
          setLetu(position.coords.latitude);
          setLong(position.coords.longitude);
          addGeo(position.coords.latitude, position.coords.longitude);
        },
        error => {
          setToggle(false);
          console.log(error.code, error.message);
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
    }
  };
  const addGeo = (lat, lon) => {
    Geocoder.init('AIzaSyCj_8-SZsoxYxZwN_Wi_7hU8kDSeQx_YVQ');
    Geocoder.from(lat, lon).then(data => {
      var addressName = data.results[0].formatted_address;
      setAdress(addressName);
    });
  };

  const LocationApi = async () => {
    try {
      setLoading(true);
      const body = new FormData();
      body.append('user_id', Staps.id);
      body.append('address', Adress);
      body.append('lat', letu);
      body.append('lon', long);

      axios({
        url: 'https://technorizen.com/Dating/webservice/sigup_address7',
        method: 'POST',
        data: body,
        headers: {
          'content-type': 'multipart/form-data',
        },
      })
        .then(function (response) {
          if (response.data.status == 1) {
            setLoading(false);
            console.log(response.data);
            dispatch({type: STAP, payload: response.data.result});
            navigation.navigate('step6');
          } else {
            setLoading(false);
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
    // requestLocationPermission();
    addGeo();
  }, []);

  console.log('Staps43 vvgd', Staps.id, Adress, letu, long);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: ThemeMode.selectedTheme
          ? theme.colors.primary
          : theme.colors.primaryBlack,
      }}>
      <HeaderImage_1 height={170} marginBottom={15}>
        <Pagination
          title={'Create account'}
          subTitle={'Location'}
          position={5}
        />
      </HeaderImage_1>
      <ScrollView contentContainerStyle={{flexGrow: 1, alignItems: 'center'}}>
        <View style={{flex: 1, justifyContent: 'center'}}>
          <Image
            source={require('../../../assets/icons/maps.png')}
            style={{
              height: 144,
              width: 144,
              resizeMode: 'contain',
              alignSelf: 'center',
            }}
          />
          <TextFormatted
            style={{
              fontSize: 14,
              color: ThemeMode.selectedTheme
                ? theme.colors.primaryBlack
                : theme.colors.primary,
              fontWeight: '300',
              marginHorizontal: 45,
              textAlign: 'center',
              marginTop: 20,
            }}>
            Please allow location in order to proceed
          </TextFormatted>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginLeft: 20,
              marginTop: 50,
              marginRight: 20,
              marginBottom: 20,
            }}>
            <TextFormatted
              style={{
                fontSize: 14,
                fontWeight: '600',
                color: ThemeMode.selectedTheme
                  ? theme.colors.primaryBlack
                  : theme.colors.primary,
                flex: 1,
              }}>
              Allow location
            </TextFormatted>
            <View style={{width: 20}} />
            <TouchableOpacity
              style={{alignItems: 'center', alignSelf: 'center', padding: 2}}
              onPress={() => Loactionset()}>
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
        </View>
        <ButtonView>
          <Button
            marginTop={1}
            Loading={Loading}
            color={theme.colors.background}
            buttonName={'Next'}
            onPress={() => LocationApi()}
          />
        </ButtonView>
      </ScrollView>
      <Netinforsheet />
    </View>
  );
};

export default Step5;

const styles = StyleSheet.create({});
