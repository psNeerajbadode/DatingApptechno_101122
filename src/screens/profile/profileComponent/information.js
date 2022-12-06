import {
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import TextFormatted from '../../../components/TextFormatted';
import LinearGradient from 'react-native-linear-gradient';
import {theme} from '../../../utils/Constants';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import axios from 'axios';
import ActivityLoader from '../../../components/ActivityLoader';

const Information = () => {
  const navigation = useNavigation();
  const ThemeMode = useSelector(state => state.Theme);
  const Staps = useSelector(state => state.Stap);
  const [User, setUser] = useState();
  const [load, setLoad] = useState();

  const getUserData = () => {
    setLoad(true);
    axios({
      method: 'get',
      url:
        'https://technorizen.com/Dating/webservice/get_profile?user_id=' +
        Staps.id,
    }).then(response => {
      setLoad(false);
      setUser(response.data.result);
    });
  };
  useEffect(() => {
    getUserData();
  }, []);
  return (
    <View>
      <TextFormatted
        style={{
          fontSize: 16,
          fontWeight: '700',
          color: ThemeMode.selectedTheme
            ? theme.colors.primaryBlack
            : theme.colors.primary,
          marginLeft: 20,
          marginVertical: 20,
        }}>
        Passions
      </TextFormatted>
      {load ? (
        <ActivityLoader />
      ) : (
        <View style={{marginBottom: 60}}>
          <FlatList
            data={User?.category}
            horizontal
            style={{paddingHorizontal: 10, marginRight: 10}}
            showsHorizontalScrollIndicator={false}
            ListHeaderComponent={
              <TouchableOpacity
                onPress={() => navigation.navigate('editPassions')}
                style={{
                  height: 100,
                  width: 100,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: ThemeMode.selectedTheme
                    ? theme.colors.primary
                    : theme.colors.primaryBlack,
                  borderRadius: 20,
                  shadowColor: '#8490ae85',
                  shadowOffset: {
                    width: 0,
                    height: 1,
                  },
                  shadowOpacity: 0.22,
                  shadowRadius: 2.22,

                  elevation: 10,
                  marginVertical: 5,
                  marginRight: 8,
                }}>
                <LinearGradient
                  style={{
                    height: 44,
                    width: 44,
                    borderRadius: 40,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
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
                  }>
                  <Image
                    source={require('../../../assets/home_icons/edit.png')}
                    style={{height: 19, width: 16, resizeMode: 'contain'}}
                  />
                </LinearGradient>
                <TextFormatted
                  style={{
                    fontSize: 16,
                    fontWeight: '700',
                    color: ThemeMode.selectedTheme
                      ? theme.colors.primaryBlack
                      : theme.colors.primary,
                    marginTop: 10,
                  }}>
                  Edit
                </TextFormatted>
              </TouchableOpacity>
            }
            renderItem={({item}) => (
              <View
                style={{
                  // height: 100,
                  // width: 100,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginLeft: 20,
                }}>
                <Image
                  source={{uri: item.image}}
                  style={{height: 50, width: 50, resizeMode: 'contain'}}
                />
                <TextFormatted
                  style={{
                    fontSize: 16,
                    fontWeight: '700',
                    color: '#8490AE',
                    marginTop: 10,
                  }}>
                  {item.passion_name}
                </TextFormatted>
              </View>
            )}
          />
          <View style={{height: 20}}></View>
          <Header
            source={require('../../../assets/icons/account.png')}
            height={24}
            width={24}
            title={'About me'}
            text={User?.about}
          />
          <Header
            source={require('../../../assets/icons/equality.png')}
            title={'Sexual orientation'}
            text={User?.sexual_orientation}
          />
          <Header
            source={require('../../../assets/icons/search_2.png')}
            title={'Looking for'}
            text={User?.looking_for}
          />
          <Header
            source={require('../../../assets/icons/book.png')}
            title={'Education'}
            text={User?.education}
          />
          <Header
            source={require('../../../assets/icons/location.png')}
            title={'Ethnicity'}
            text={User?.ethnicity}
          />
          <Header
            source={require('../../../assets/icons/translation.png')}
            title={'Language'}
            text={'English'}
          />
          <Header
            source={require('../../../assets/icons/favourites.png')}
            title={'Zodiac'}
            text={User?.zodiac}
          />
          <Header
            source={require('../../../assets/icons/baby_carriage.png')}
            title={'Has kids'}
            text={User?.kids}
          />
          <Header
            source={require('../../../assets/icons/cocktail.png')}
            title={'Drinks'}
            text={User?.drink}
          />
          <Header
            source={require('../../../assets/icons/cigarrete.png')}
            title={'Smokes'}
            text={User?.smoke}
          />
        </View>
      )}
    </View>
  );
};
const Header = ({title, text, source}) => {
  const ThemeMode = useSelector(state => state.Theme);
  return (
    <View style={{marginHorizontal: 25, marginVertical: 10}}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Image
          source={source}
          style={{height: 24, width: 24, resizeMode: 'contain'}}
        />
        <TextFormatted
          style={{
            fontSize: 16,
            fontWeight: '700',
            color: ThemeMode.selectedTheme
              ? theme.colors.primaryBlack
              : theme.colors.primary,
            marginLeft: 10,
          }}>
          {title}
        </TextFormatted>
      </View>
      <TextFormatted
        style={{
          fontSize: 14,
          fontWeight: '400',
          color: '#8490AE',
          marginTop: 10,
        }}>
        {text}
      </TextFormatted>
    </View>
  );
};
export default Information;

const styles = StyleSheet.create({});
