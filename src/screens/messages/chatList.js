import {
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  View,
  ImageBackground,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {theme} from '../../utils/Constants';
import HeaderImage_1 from '../../components/HeaderImage_1';
import Header from '../../components/Header';
import SearchBar from '../../components/SearchBar';
import TextFormatted from '../../components/TextFormatted';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import Notification from '../home/notification';
import {useDispatch, useSelector} from 'react-redux';
import * as Animatable from 'react-native-animatable';
import Netinforsheet from '../../components/Netinforsheet';
import ActivityLoader from '../../components/ActivityLoader';

const ChatList = () => {
  const dispatch = useDispatch();
  const ThemeMode = useSelector(state => state.Theme);
  const Staps = useSelector(state => state.Stap);
  const [search, setSearch] = useState('');
  const [Chatuser, setChatuser] = useState([]);
  const [Loading, setLoading] = useState(false);
  const dimension = useWindowDimensions();
  const navigation = useNavigation();
  const refRBSheet = useRef();

  const recentData = [
    {img: require('../../assets/images/unsplash_1.png')},
    {img: require('../../assets/images/unsplash_2.png')},
    {img: require('../../assets/images/unsplash_3.png')},
    {img: require('../../assets/images/unsplash_4.png')},
    {img: require('../../assets/images/unsplash_3.png')},
    {img: require('../../assets/images/unsplash_2.png')},
    {img: require('../../assets/images/unsplash_1.png')},
  ];
  const messageData = [
    {
      pic: require('../../assets/images/unsplash_1.png'),
      name: 'Emma Hatchan, 22',
      mess: 'Hi, how are you? 😄 are you...',
      timing: '12:34',
    },
    {
      pic: require('../../assets/images/unsplash_1.png'),
      name: 'Emma Hatchan, 22',
      mess: 'Hi, how are you? 😄 are you...',
      timing: '12:34',
    },
    {
      pic: require('../../assets/images/unsplash_1.png'),
      name: 'Emma Hatchan, 22',
      mess: 'Hi, how are you? 😄 are you...',
      timing: '12:34',
    },
    {
      pic: require('../../assets/images/unsplash_1.png'),
      name: 'Emma Hatchan, 22',
      mess: 'Hi, how are you? 😄 are you...',
      timing: '12:34',
    },
  ];
  const homeTab = [
    {
      icon: require('../../assets/home_icons/home.png'),
      link: 'homePage',
    },
    {
      icon: require('../../assets/home_icons/focus.png'),
      // link: 'myProfile',
    },
    {
      icon: require('../../assets/home_icons/love.png'),
      // link: 'myProfile',
    },
    {
      icon: require('../../assets/home_icons/messages.png'),
      // link: 'message',
    },
    {
      icon: require('../../assets/home_icons/profile.png'),
      link: 'myProfile',
    },
  ];

  const ChatUser = () => {
    setLoading(true);
    fetch(
      'https://technorizen.com/Dating/webservice/get_conversation?receiver_id=' +
        Staps.id,
    )
      .then(response => response.json())
      .then(response => {
        if (response.status == 1) {
          setChatuser(response.result);
          setLoading(false);
        } else {
          setLoading(false);
        }
      })
      .catch(() => {
        console.log('ERROR GETTING DATA FROM API');
      });
  };

  useEffect(() => {
    ChatUser();
  }, []);
  console.log('Chatuserbxcbcb==========>',Chatuser == null);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: ThemeMode.selectedTheme
          ? theme.colors.primary
          : theme.colors.primaryBlack,
      }}>
      <View>
        <HeaderImage_1 marginBottom={30} height={150}>
          <Header
            marginTop={16}
            left={
              <TouchableOpacity onPress={() => navigation.navigate('message')}>
                <Image
                  source={
                    ThemeMode.selectedTheme
                      ? require('../../assets/icons/matches_light.png')
                      : require('../../assets/icons/matche_dark.png')
                  }
                  style={{height: 40, width: 40, resizeMode: 'contain'}}
                />
              </TouchableOpacity>
            }
            title={'Chats'}
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
                onPress={() => refRBSheet.current.open()}>
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
          placeholder={'Search chat'}
        />
      </View>

      {Loading ? (
        <View style={{flex: 1, justifyContent: 'center'}}>
          <ActivityLoader />
        </View>
      ) : Chatuser == null ? (
        <View>
          <TextFormatted
            style={{
              fontSize: 18,
              fontWeight: '700',
              color: ThemeMode.selectedTheme
                ? theme.colors.primaryBlack
                : theme.colors.primary,
              marginHorizontal: 20,
              marginTop: 30,
              alignSelf:'center'
            }}>
            There are no Recent Data
          </TextFormatted>
        </View>
      ) : (
        <FlatList
          contentContainerStyle={{paddingBottom: 60}}
          data={Chatuser?.filter(item => {
            return item.user_name.toLowerCase().includes(search.toLowerCase());
          })}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <View style={{marginTop: 30}}>
              <TextFormatted
                style={{
                  fontSize: 16,
                  fontWeight: '700',
                  color: ThemeMode.selectedTheme
                    ? theme.colors.primaryBlack
                    : theme.colors.primary,
                  marginHorizontal: 20,
                }}>
                Recent matches
              </TextFormatted>
              <FlatList
                data={Chatuser}
                horizontal
                style={{marginHorizontal: 0}}
                contentContainerStyle={{paddingLeft: 20}}
                showsHorizontalScrollIndicator={false}
                renderItem={({item}) => (
                  <TouchableOpacity
                    style={{marginRight: 9}}
                    onPress={() =>
                      navigation.navigate('userProfile', item?.id)
                    }>
                    <Image
                      source={{uri: item?.image}}
                      style={{
                        height: 70,
                        width: 70,
                        resizeMode: 'cover',
                        borderRadius: 50,
                        marginTop: 20,
                      }}
                    />
                  </TouchableOpacity>
                )}
              />
              <TextFormatted
                style={{
                  fontSize: 16,
                  fontWeight: '700',
                  color: ThemeMode.selectedTheme
                    ? theme.colors.primaryBlack
                    : theme.colors.primary,
                  marginTop: 20,
                  marginHorizontal: 20,
                }}>
                Messages
              </TextFormatted>
            </View>
          }
          renderItem={({item, index}) => (
            <TouchableOpacity
              style={{
                marginHorizontal: 20,
                flexDirection: 'row',
                alignItems: 'center',
                marginVertical: 10,
              }}
              onPress={() =>
                navigation.navigate('chats', {
                  params: null,
                  SenderId: item?.sender_id,
                })
              }>
              <View>
                {/* {index <= 1 && (
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
                    style={{
                      width: 21,
                      justifyContent: 'center',
                      alignItems: 'center',
                      height: 21,
                      borderRadius: 5,
                      position: 'absolute',
                      zIndex: 1,
                      right: 0,
                    }}>
                    <TextFormatted
                      style={{
                        color: theme.colors.primary,
                        fontSize: 13,
                        fontWeight: '400',
                      }}>
                      {index + 1}
                    </TextFormatted>
                  </LinearGradient>
                )} */}
                <Image
                  source={{uri: item?.image}}
                  style={{
                    height: 70,
                    width: 70,
                    resizeMode: 'cover',
                    borderRadius: 50,
                    position: 'relative',
                    zIndex: 0,
                  }}
                />
              </View>
              <View style={{marginHorizontal: 10, flex: 1}}>
                <TextFormatted
                  style={{
                    fontSize: 16,
                    fontWeight: '700',
                    color: ThemeMode.selectedTheme
                      ? theme.colors.primaryBlack
                      : theme.colors.primary,
                  }}>
                  {item?.user_name + item?.surname}
                </TextFormatted>
                <TextFormatted
                  numberOfLines={1}
                  style={{
                    fontSize: 14,
                    fontWeight: '400',
                    color: '#8490AE',
                    marginTop: 9,
                  }}>
                  {item?.last_message}
                </TextFormatted>
              </View>
              <TextFormatted
                style={{
                  fontSize: 12,
                  fontWeight: '300',
                  color: '#8490AE',
                  height: 40,
                }}>
                {item?.time_ago}
              </TextFormatted>
            </TouchableOpacity>
          )}
        />
      )}

      <ImageBackground
        resizeMode="contain"
        style={{
          height: 65,
          width: '100%',

          backgroundColor: ThemeMode.selectedTheme ? '#FFFFFFE5' : '#22242BB2',
          //backgroundColor: 'rgba(255, 255, 255, 0.1)',
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
      <Notification refRBSheet={refRBSheet} />
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
          width: dimension.width / 5,
          justifyContent: 'center',
          alignItems: 'center',
          height: 50,
        }}>
        <Animatable.View
          animation={'fadeIn'}
          duration={1500}
          // iterationCount={1}

          easing={'ease-in'}>
          <Image
            source={source}
            style={
              style || {
                height: 27,
                width: 27,
                resizeMode: 'contain',
                marginTop: 15,
                marginBottom: 5,

                opacity: currentTab ? 1 : 0.5,
                tintColor: ThemeMode.selectedTheme
                  ? theme.colors.primaryBlack
                  : theme.colors.primary,
              }
            }
          />
        </Animatable.View>
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
export default ChatList;

const styles = StyleSheet.create({});
