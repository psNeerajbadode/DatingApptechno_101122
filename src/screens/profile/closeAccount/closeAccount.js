import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useRef, useState} from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';
import TextFormatted from '../../../components/TextFormatted';
import {theme} from '../../../utils/Constants';
import NeedBreack from './needBreack';
import SubmitFeedback from './submitFeedback';
import SomethingBroken from './somethingBroken';
import MetSomeone from './metSomeone';
import FreshStart from './freshStart';
import Other from './other';
import LinearGradient from 'react-native-linear-gradient';
import {useDispatch, useSelector} from 'react-redux';
import { useNavigation } from '@react-navigation/native';

const CloseAccount = ({refRBSheet}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const ThemeMode = useSelector(state => state.Theme);
  const Staps = useSelector(state => state.Stap);
  const refRBSheet1 = useRef();
  const refRBSheet2 = useRef();
  const refRBSheet3 = useRef();
  const refRBSheet4 = useRef();
  const refRBSheet5 = useRef();
  const refRBSheet6 = useRef();
  const [Loading, setLoading] = useState(false);

  const delete_account_api = () => {
    setLoading(true);
    fetch(
      'https://technorizen.com/Dating/webservice/delete_account?user_id=' +
        Staps.id +
        '&' +
        'reason=I need a break',

      {method: 'post',   headers: {
        'content-type': 'multipart/form-data',
      }},
    )
      .then(response => response.json())
      .then(response => {
        console.log("response=>",response);
        if (response.status == 1) {
          navigation.replace('authNavigation');
          dispatch({type: LOGOUT, payload: null});
          setLoading(false);
        } else {
          setLoading(false);
        }
      });
  };

  return (
    <RBSheet
      ref={refRBSheet}
      closeOnDragDown={true}
      height={610}
      closeOnPressBack={true}
      customStyles={{
        wrapper: {},
        draggableIcon: {backgroundColor: '#8490AE'},
        container: {borderTopLeftRadius: 40, borderTopRightRadius: 40},
      }}>
      <StatusBar backgroundColor={'#00000077'} />

      <TouchableOpacity
        onPress={() => refRBSheet.current.close()}
        style={{
          alignSelf: 'flex-end',
          marginRight: 30,
          marginTop: 5,
        }}>
        <Image
          source={require('../../../assets/icons/close_immg.png')}
          style={{
            height: 5,
            width: 5,
            resizeMode: 'contain',
            alignSelf: 'flex-end',
            padding: 8,
            tintColor:
              /* ThemeMode.selectedTheme
              ?  */ theme.colors.primaryBlack,
            /*   : theme.colors.primary, */
          }}
        />
      </TouchableOpacity>
      <LinearGradient
        colors={['#EEF4FF', '#CFE7FD']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        style={{
          height: 144,
          width: 144,
          borderRadius: 20,
          justifyContent: 'center',
          alignItems: 'center',
          alignSelf: 'center',
          marginVertical: 20,
        }}>
        <LinearGradient
          colors={
            ThemeMode.themecolr == 'Red'
              ? theme.colors.primaryOn
              : ThemeMode.themecolr == 'Blue'
              ? theme.colors.primaryBlue
              : ThemeMode.themecolr == 'Green'
              ? theme.colors.primaryGreen
              : ThemeMode.themecolr == 'Purple'
              ? theme.colors.primaryPurple
              : ThemeMode.themecolr == 'Yellow'
              ? theme.colors.primaryYellow
              : theme.colors.primaryOn
          }
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          style={{
            height: 124,
            width: 124,
            borderRadius: 20,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            source={require('../../../assets/icons/delete_icon.png')}
            style={{height: 63, width: 63, resizeMode: 'contain'}}
          />
        </LinearGradient>
      </LinearGradient>

      <ScrollView>
        <TextFormatted
          style={{
            fontSize: 18,
            fontWeight: '600',
            color: theme.colors.primaryBlack,
            textAlign: 'center',
            marginHorizontal: 34,
            marginTop: 20,
          }}>
          Are you sure you want to delete your account?
        </TextFormatted>
        <TextFormatted
          style={{
            fontSize: 14,
            fontWeight: '400',
            color: theme.colors.primaryBlack,
            textAlign: 'center',
            marginHorizontal: 30,
            marginTop: 20,
          }}>
          Please let us know the reason you are leaving.
        </TextFormatted>
        <View style={{height: 20}} />
        <ButtonRow
          title={'I need a break from ...'}
          onPress={() => {
            refRBSheet1.current.open();
          }}
        />
        <ButtonRow
          title={'I don’t like ...'}
          onPress={() => {
            refRBSheet2.current.open();
          }}
        />
        <ButtonRow
          title={'Something is broken'}
          onPress={() => {
            refRBSheet3.current.open();
          }}
        />
        <ButtonRow
          title={'I met someone'}
          onPress={() => {
            refRBSheet4.current.open();
          }}
        />
        <ButtonRow
          title={'I want a fresh start'}
          onPress={() => {
            refRBSheet5.current.open();
          }}
        />
        <ButtonRow
          title={'Other'}
          onPress={() => {
            refRBSheet6.current.open();
          }}
        />
      </ScrollView>
      <NeedBreack
        Loading={Loading}
        onPress={() => delete_account_api()}
        refRBSheet={refRBSheet1}
      />
      <SubmitFeedback refRBSheet={refRBSheet2} />
      <SomethingBroken refRBSheet={refRBSheet3} />
      <MetSomeone refRBSheet={refRBSheet4} />
      <FreshStart refRBSheet={refRBSheet5} />
      <Other refRBSheet={refRBSheet6} />
    </RBSheet>
  );
};
const ButtonRow = ({title, onPress}) => {
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
          color: theme.colors.primaryBlack,
          flex: 1,
        }}>
        {title}
      </TextFormatted>
      <Image
        resizeMode="contain"
        source={require('../../../assets/icons/chevron_down_ico.png')}
        style={{
          marginTop: 0,
          height: 12,
          width: 10,
          transform: [{rotate: '-90deg'}],
          tintColor: ThemeMode.selectedTheme
            ? theme.colors.primaryBlack
            : theme.colors.primary,
        }}
      />
    </TouchableOpacity>
  );
};
export default CloseAccount;

const styles = StyleSheet.create({});
