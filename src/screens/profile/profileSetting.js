import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import React, {useRef, useState} from 'react';
import {theme} from '../../utils/Constants';
import HeaderImage_1 from '../../components/HeaderImage_1';
import Header from '../../components/Header';
import TextFormatted from '../../components/TextFormatted';
import {useNavigation} from '@react-navigation/native';
import CloseAccount from './closeAccount/closeAccount';
import {useDispatch, useSelector} from 'react-redux';
import {
  BluelightImage,
  GreenlightImage,
  PurplelightImage,
  RedlightImage,
  YellowlightImage,
} from '../../utils/CustomImages';
import Netinforsheet from '../../components/Netinforsheet';
import {LOGOUT, STAP} from '../../redux/actions/ActionType';
import { ShowToast } from '../../utils/Baseurl';
const ProfileSetting = () => {
  const dispatch = useDispatch();
  const ThemeMode = useSelector(state => state.Theme);
  const Staps = useSelector(state => state.Stap);
  const navigation = useNavigation();
  const [notification, setNotification] = useState(false);
  const [location, setLocation] = useState(false);
  const refRBSheet = useRef();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: ThemeMode.selectedTheme
          ? theme.colors.primary
          : theme.colors.primaryBlack,
      }}>
      <HeaderImage_1 height={140} marginBottom={1}>
        <Header title={'Profile settings'} marginTop={20} />
      </HeaderImage_1>
      <ScrollView>
        <View
          style={{
            flexDirection: 'row',
            marginHorizontal: 22,
            alignItems: 'center',
            marginTop: 20,
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
            Push notifications
          </TextFormatted>

          <TouchableOpacity
            style={{
              alignItems: 'center',
              alignSelf: 'center',
              padding: 2,
            }}
            onPress={() => setNotification(!notification)}>
            <Image
              resizeMode="contain"
              style={{width: 58, height: 33}}
              source={
                ThemeMode.themecolr == 'Red'
                  ? notification
                    ? RedlightImage.On_switchs
                    : RedlightImage.Off_switchs
                  : ThemeMode.themecolr == 'Blue'
                  ? notification
                    ? BluelightImage.On_switchs_blue
                    : BluelightImage.Off_switchs_blue
                  : ThemeMode.themecolr == 'Green'
                  ? notification
                    ? GreenlightImage.On_switchs_green
                    : GreenlightImage.Off_switchs_green
                  : ThemeMode.themecolr == 'Purple'
                  ? notification
                    ? PurplelightImage.On_switchs_purplle
                    : PurplelightImage.Off_switchs_purplle
                  : ThemeMode.themecolr == 'Yellow'
                  ? notification
                    ? YellowlightImage.On_switchs_yellow
                    : YellowlightImage.Off_switchs_yellow
                  : notification
                  ? RedlightImage.On_switchs
                  : RedlightImage.Off_switchs
              }
            />
          </TouchableOpacity>
        </View>
        <ButtonRow
          title={'Select your type'}
          onPress={() => navigation.navigate('selectYourType')}
        />
        <ButtonRow
          title={'Filter location'}
          onPress={() => navigation.navigate('filterLocation')}
        />
        <ButtonRow
          title={'Language'}
          onPress={() => navigation.navigate('ChangeLanguage')}
        />
        <ButtonRow
          onPress={() => {
            ShowToast('Logout Successfully');
            navigation.replace('authNavigation');
            dispatch({type: LOGOUT, payload: null});
            dispatch({type: STAP,  payload: {Leng: Staps.Leng}});
          }}
          title={'Logout'}
        />
      </ScrollView>
      <ButtonRow
        title={'Close account'}
        coloricon={theme.colors.darkGrey}
        color={theme.colors.darkGrey}
        onPress={() => refRBSheet.current.open()}
      />

      <CloseAccount refRBSheet={refRBSheet} />
      <View style={{height: 20}} />

      <Netinforsheet />
    </View>
  );
};

const ButtonRow = ({title, onPress, color, coloricon}) => {
  const ThemeMode = useSelector(state => state.Theme);
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 22,
        paddingVertical: 5,
        marginVertical: 5,
      }}>
      <TextFormatted
        style={{
          fontSize: 14,
          fontWeight: '600',
          color:
            color ||
            (ThemeMode.selectedTheme
              ? theme.colors.primaryBlack
              : theme.colors.primary),
          flex: 1,
        }}>
        {title}
      </TextFormatted>
      <Image
        resizeMode="contain"
        source={require('../../assets/icons/chevron_down_ico.png')}
        style={{
          marginTop: 0,
          height: 12,
          width: 10,
          transform: [{rotate: '-90deg'}],
          tintColor:
            coloricon ||
            (ThemeMode.selectedTheme
              ? theme.colors.primaryBlack
              : theme.colors.primary),
        }}
      />
    </TouchableOpacity>
  );
};
export default ProfileSetting;

const styles = StyleSheet.create({});
