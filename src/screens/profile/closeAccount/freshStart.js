import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';
import {theme} from '../../../utils/Constants';
import TextFormatted from '../../../components/TextFormatted';
import Button from '../../../components/Button';
import {
  BluelightImage,
  GreenlightImage,
  PurplelightImage,
  RedlightImage,
  YellowlightImage,
} from '../../../utils/CustomImages';
import {useDispatch, useSelector} from 'react-redux';
import { useNavigation } from '@react-navigation/native';

const FreshStart = ({refRBSheet}) => {
  const [select, setSelect] = useState();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const ThemeMode = useSelector(state => state.Theme);
  const Staps = useSelector(state => state.Stap);
  const [Loading, setLoading] = useState(false);
  const [resion, setResion] = useState('');
  const data = [
    'My profile info is not syncing',
    'I’m not getting any matches',
    'There’s no one to swipe on',
    'I want to reset my matches',
  ];

  
 

  const delete_account_api = () => {
    setLoading(true);
    fetch(
      'https://technorizen.com/Dating/webservice/delete_account?user_id=' +
        Staps.id +
        '&' +
        'reason=' +
        resion,
        {  method: 'post',   headers: {
          'content-type': 'multipart/form-data',
        }},
    )
      .then(response => response.json())
      .then(response => {
        console.log(response);
        if (response.status == 1) {
          navigation.replace('authNavigation');
          dispatch({type: LOGOUT, payload: null});
          setLoading(false);
        } else {
          setLoading(false);
        }
      })
      .catch(() => {
        console.log('ERROR GETTING DATA FROM API');
      });
  };

  console.log('select', resion);
  return (
    <RBSheet
      ref={refRBSheet}
      closeOnDragDown={true}
      height={550}
      closeOnPressBack={true}
      customStyles={{
        wrapper: {},
        draggableIcon: {backgroundColor: '#8490AE'},
        container: {borderTopLeftRadius: 40, borderTopRightRadius: 40},
      }}>
      <StatusBar backgroundColor={'#00000077'} />

      <TouchableOpacity
        onPress={() => {
          refRBSheet.current.close();
        }}
        style={{
          alignSelf: 'flex-start',
          marginLeft: 30,
          marginTop: 5,
        }}>
        <Image
          source={require('../../../assets/icons/sheet_arrow.png')}
          style={{
            height: 5,
            width: 5,
            resizeMode: 'contain',
            alignSelf: 'flex-end',
            padding: 8,
            tintColor: theme.colors.primaryBlack,
          }}
        />
      </TouchableOpacity>
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
          Fresh Start
        </TextFormatted>
        <TextFormatted
          style={{
            fontSize: 14,
            fontWeight: '400',
            color: theme.colors.darkGrey,
            textAlign: 'center',
            marginHorizontal: 30,
            marginVertical: 20,
          }}>
          Help us to improve your experience. Why do you want fresh start?
        </TextFormatted>
        {data.map((v, i) => (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginHorizontal: 22,
              marginVertical: 8,
            }}>
            <TextFormatted
              style={{
                fontSize: 14,
                fontWeight: '600',
                color: theme.colors.primaryBlack,
                flex: 1,
              }}>
              {v}
            </TextFormatted>
            <TouchableOpacity
              onPress={() => {
                setSelect(select == i ? null : i);
                setResion(v);
              }}>
              <Image
                source={
                  resion == v
                    ? ThemeMode.themecolr == 'Red'
                      ? RedlightImage.check_red
                      : ThemeMode.themecolr == 'Blue'
                      ? BluelightImage.check_blue
                      : ThemeMode.themecolr == 'Green'
                      ? GreenlightImage.check_green
                      : ThemeMode.themecolr == 'Purple'
                      ? PurplelightImage.check_purple
                      : ThemeMode.themecolr == 'Yellow'
                      ? YellowlightImage.check_yellow
                      : RedlightImage.check_red
                    : require('../../../assets/icons/check.png')
                }
                style={{height: 29, width: 29, resizeMode: 'contain'}}
              />
            </TouchableOpacity>
          </View>
        ))}
        <TextFormatted
          style={{
            fontSize: 14,
            fontWeight: '600',
            color: theme.colors.primaryBlack,
            marginLeft: 20,
            marginTop: 15,
          }}>
          Tell us more
        </TextFormatted>
        <TextInput
          placeholder="Insert text"
          placeholderTextColor={theme.colors.darkGrey}
          style={{
            backgroundColor: theme.colors.primary,
            marginHorizontal: 20,
            height: 50,
            paddingHorizontal: 15,
            borderRadius: 5,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.2,
            shadowRadius: 1.41,
            elevation: 2,
            marginVertical: 5,
            fontSize: 14,
            fontFamily: 'Rubik-Light',
            color: theme.colors.primaryBlack,
          }}
        />
      </ScrollView>
      <Button
        Loading={Loading}
        disabled={!resion ? true : false}
        opacity={!resion ? 0.5 : 1}
        onPress={() => delete_account_api()}
        buttonName={'Delete account'}
        marginBottom={20}
      />
    </RBSheet>
  );
};

export default FreshStart;

const styles = StyleSheet.create({});
