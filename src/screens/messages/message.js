import {
  FlatList,
  Image,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {theme} from '../../utils/Constants';
import HeaderImage_1 from '../../components/HeaderImage_1';
import Header from '../../components/Header';
import SearchBar from '../../components/SearchBar';
import TextFormatted from '../../components/TextFormatted';
import Notification from '../home/notification';
import {useDispatch, useSelector} from 'react-redux';
import {
  BluelightImage,
  GreenlightImage,
  PurplelightImage,
  RedlightImage,
  YellowlightImage,
} from '../../utils/CustomImages';
import LinearGradient from 'react-native-linear-gradient';
import MoreOptions from '../home/moreOptions';
import Netinforsheet from '../../components/Netinforsheet';

import {STAP} from '../../redux/actions/ActionType';

const Message = ({navigation}) => {
  const ThemeMode = useSelector(state => state.Theme);
  const Staps = useSelector(state => state.Stap);

  const [search, setSearch] = useState('');
  const dimension = useWindowDimensions();
  const refRBSheet = useRef();
  const refRBSheet_N = useRef();

  const homeTab = [
    {
      icon: require('../../assets/home_icons/home.png'),
      link: 'homePage',
    },
    {
      icon: require('../../assets/home_icons/focus.png'),
    },
    {
      icon: require('../../assets/home_icons/love.png'),
    },
    {
      icon: require('../../assets/home_icons/messages.png'),
    },
    {
      icon: require('../../assets/home_icons/profile.png'),
      link: 'myProfile',
    },
  ];
  const matchesData = [
    {img: require('../../assets/images/unsplash_1.png'), name: 'Emma Hatchan'},
    {img: require('../../assets/images/unsplash_1.png'), name: 'Sarah Parker'},
    {img: require('../../assets/images/unsplash_1.png'), name: 'Emma Hatchan'},
    {
      img: require('../../assets/images/unsplash_1.png'),
      name: 'Charlotte Brown',
    },
    {img: require('../../assets/images/unsplash_1.png'), name: 'Emma Hatchan'},
    {img: require('../../assets/images/unsplash_1.png'), name: 'Emma Hatchan'},
  ];

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: ThemeMode.selectedTheme
          ? theme.colors.primary
          : theme.colors.primaryBlack,
      }}>
      <View>
        <HeaderImage_1 height={165} marginBottom={30}>
          <Header
            left={
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Image
                  source={
                    ThemeMode.selectedTheme
                      ? require('../../assets/icons/back.png')
                      : require('../../assets/icons/back_dark.png')
                  }
                  style={{height: 40, width: 40, resizeMode: 'contain'}}
                />
              </TouchableOpacity>
            }
            title={'Matches'}
            marginTop={30}
            right={
              <TouchableOpacity
                style={{
                  height: 40,
                  width: 40,
                  backgroundColor: ThemeMode.selectedTheme
                    ? '#FFFFFF33'
                    : '#1A1D254D',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 10,
                }}
                onPress={() => refRBSheet_N.current.open()}>
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
                    height: 10,
                    width: 10,
                    borderRadius: 50,
                    position: 'absolute',
                    top: 5,
                    right: 10,
                    zIndex: 1,
                  }}
                />
                <Image
                  source={require('../../assets/icons/Notifyy.png')}
                  style={{height: 25, width: 25, resizeMode: 'contain'}}
                />
              </TouchableOpacity>
            }
          />
        </HeaderImage_1>
        <SearchBar
          borderRadius={50}
          value={search}
          onChangeText={setSearch}
          onPress={() => setSearch('')}
          placeholder={'Search match'}
        />
      </View>
      <View style={{marginVertical: 10}} />

      <FlatList
        contentContainerStyle={{paddingBottom: 75, paddingTop: 10}}
        data={matchesData.filter(item => {
          return item.name.toLowerCase().includes(search.toLowerCase());
        })}
        renderItem={({item}) => (
          <TouchableOpacity
            style={{
              marginVertical: 20,
              marginHorizontal: 35,
              flexDirection: 'row',
              justifyContent: 'flex-end',
            }}>
            <Image
              style={{
                width: dimension.width / 4,
                height: 118,
                position: 'absolute',
                zIndex: 1,
                borderRadius: 20,
                bottom: 25,
                left: -15,
              }}
              source={item.img}
              resizeMode="cover"
            />
            <ImageBackground
              source={
                ThemeMode.selectedTheme
                  ? require('../../assets/images/card_light.png')
                  : require('../../assets/images/card_darkk.png')
              }
              resizeMode="contain"
              imageStyle={{borderRadius: 20}}
              style={{
                width: dimension.width / 1.4,
                height: 116,
                zIndex: 0,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <View style={{width: 25}}></View>
              <View
                style={{
                  justifyContent: 'space-evenly',
                  alignItems: 'flex-start',
                }}>
                <View>
                  <TextFormatted
                    style={{
                      fontSize: 16,
                      fontWeight: '700',
                      color: ThemeMode.selectedTheme
                        ? theme.colors.primaryBlack
                        : theme.colors.primary,
                    }}>
                    {item.name}
                  </TextFormatted>
                  <TextFormatted
                    style={{
                      fontSize: 12,
                      fontWeight: '400',
                      color: ThemeMode.selectedTheme
                        ? theme.colors.darkGrey
                        : theme.colors.primary,
                    }}>
                    22 years old
                  </TextFormatted>
                </View>

                <View style={{flexDirection: 'row'}}>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('userProfile')}>
                    <Image
                      source={
                        ThemeMode.selectedTheme
                          ? require('../../assets/icons/m_user_light.png')
                          : require('../../assets/icons/match_u_dark.png')
                      }
                      style={{
                        height: 40,
                        width: 40,
                        resizeMode: 'contain',
                        borderRadius: 15,
                      }}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      width: 40,
                      height: 40,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                    onPress={() =>
                      navigation.navigate('chats', {params: null})
                    }>
                    <Image
                      source={
                        ThemeMode.themecolr == 'Red'
                          ? RedlightImage.chat_Red
                          : ThemeMode.themecolr == 'Blue'
                          ? BluelightImage.chat_blue
                          : ThemeMode.themecolr == 'Green'
                          ? GreenlightImage.chat_green
                          : ThemeMode.themecolr == 'Purple'
                          ? PurplelightImage.chat_purple
                          : ThemeMode.themecolr == 'Yellow'
                          ? YellowlightImage.chat_yellow
                          : RedlightImage.chat_Red
                      }
                      style={{
                        height: 40,
                        width: 40,
                        resizeMode: 'contain',
                        marginLeft: 9,
                      }}
                    />
                  </TouchableOpacity>
                </View>
              </View>

              <TouchableOpacity
                style={{
                  height: 20,
                  width: 20,
                  alignSelf: 'flex-start',
                  alignItems: 'center',
                  marginRight: 10,
                  marginTop: 20,
                }}
                onPress={() => refRBSheet.current.open()}>
                <Image
                  source={require('../../assets/icons/m_more.png')}
                  style={{
                    height: 12,
                    width: 3,
                    resizeMode: 'contain',
                    tintColor: ThemeMode.selectedTheme ? '#8490AE' : '#FFFFFF',
                  }}
                />
              </TouchableOpacity>
            </ImageBackground>
          </TouchableOpacity>
        )}
      />

      <ImageBackground
        resizeMode="contain"
        style={{
          height: 65,
          width: '100%',
          backgroundColor: ThemeMode.selectedTheme ? '#FFFFFFE5' : '#22242BB2',
          position: 'absolute',
          bottom: 0,
          borderTopLeftRadius: 40,
          borderTopRightRadius: 40,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-around',
        }}>
        <Tab
          source={require('../../assets/home_icons/home.png')}
          onPress={() => navigation.navigate('homePage')}
        />
        <Tab source={require('../../assets/home_icons/focus.png')} />

        <Tab
          currentTab={true}
          source={require('../../assets/icons/colormssg.png')}
        />

        <Tab
          onPress={() => navigation.navigate('myProfile')}
          source={require('../../assets/home_icons/profile.png')}
        />
      </ImageBackground>
      <View
        style={{
          borderRadius: 50,
          borderBottomWidth: 2,
          borderBottomColor:
            ThemeMode.themecolr == 'Red'
              ? theme.colors.red
              : ThemeMode.themecolr == 'Blue'
              ? theme.colors.Blue
              : ThemeMode.themecolr == 'Green'
              ? theme.colors.Green
              : ThemeMode.themecolr == 'Purple'
              ? theme.colors.Purple
              : ThemeMode.themecolr == 'Yellow'
              ? theme.colors.Yellow
              : theme.colors.red,
          width: '32%',
          position: 'absolute',
          bottom: 0,
        }}></View>

      <Notification refRBSheet={refRBSheet_N} />
      <MoreOptions refRBSheet={refRBSheet} />
      <Netinforsheet />
    </View>
  );
};
const Tab = ({disabled, onPress, source, currentTab, style}) => {
  const dimension = useWindowDimensions();
  const ThemeMode = useSelector(state => state.Theme);
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={{
        marginBottom: 6,
      }}>
      <View
        style={{
          width: (dimension.width - 118) / 5,
          justifyContent: 'center',
          alignItems: 'center',
          height: 50,
        }}>
        <Image
          source={source}
          style={
            style || {
              height: 25,
              width: 25,
              resizeMode: 'contain',
              margin: 10,
              opacity: currentTab ? 1 : 0.5,
              tintColor: ThemeMode.selectedTheme
                ? theme.colors.primaryBlack
                : theme.colors.primary,
            }
          }
        />
        {currentTab == true && (
          <View
            style={{
              width: '50%',
              borderRadius: 5,
              borderWidth: currentTab ? 1.5 : 0,
              borderColor:
                ThemeMode.themecolr == 'Red'
                  ? theme.colors.red
                  : ThemeMode.themecolr == 'Blue'
                  ? theme.colors.Blue
                  : ThemeMode.themecolr == 'Green'
                  ? theme.colors.Green
                  : ThemeMode.themecolr == 'Purple'
                  ? theme.colors.Purple
                  : ThemeMode.themecolr == 'Yellow'
                  ? theme.colors.Yellow
                  : theme.colors.red,
            }}></View>
        )}
      </View>
    </TouchableOpacity>
  );
};
export default Message;

const styles = StyleSheet.create({
  set_boxy: {
    shadowColor: '#8490ae85',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 10,
  },
});
