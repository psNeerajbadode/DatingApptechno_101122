import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  TextInput,
  ScrollView,
  useWindowDimensions,
  FlatList,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {theme} from '../../utils/Constants';
import HeaderImage_1 from '../../components/HeaderImage_1';
import Header from '../../components/Header';
import TextFormatted from '../../components/TextFormatted';
import LinearGradient from 'react-native-linear-gradient';
import MoreOptions from '../home/moreOptions';
import {useDispatch, useSelector} from 'react-redux';
import DocumentPicker from 'react-native-document-picker';
import {useRoute} from '@react-navigation/native';
import axios from 'axios';
import Netinforsheet from '../../components/Netinforsheet';
import ActivityLoader from '../../components/ActivityLoader';

const Chats = () => {
  const dispatch = useDispatch();
  const ThemeMode = useSelector(state => state.Theme);
  const Staps = useSelector(state => state.Stap);
  const [multipleFile, setMultipleFile] = useState([]);
  const refRBSheet = useRef();
  const [passion, setpassion] = useState([]);
  const {params} = useRoute();
  const [mess, setMess] = useState('');
  const [show, setShow] = useState(false);
  const [getmsg, setGetmsg] = useState([]);
  const [Loading, setLoading] = useState(true);
  const dimension = useWindowDimensions();

  const chatData = [
    {
      reciverId: 1,
      img: require('../../assets/images/unsplash_1.png'),
      msg1: 'Alex, let’s meet this weekend. I’ll check with Dave too 😎',
      time: '8:27 PM',
    },
    {
      sernderId: 0,
      img: require('../../assets/images/unsplash_1.png'),
      msg1: 'Sure. Let’s aim for saturday',
      msg2: 'I’m visiting mom this sunday 👻',
      time: '8:56 PM',
    },
    {
      reciverId: 1,
      img: require('../../assets/images/unsplash_1.png'),
      msg1: 'Alrighty! Will give you a call shortly 🤗',
      time: '9:01 PM',
    },
    {
      sernderId: 0,
      img: require('../../assets/images/unsplash_1.png'),
      msg1: '❤️',
      time: '9:04 PM',
    },
    {
      reciverId: 1,
      img: require('../../assets/images/unsplash_1.png'),
      msg1: 'Hey you! Are you there?',
      time: '11:53 AM',
    },
    {
      sernderId: 0,
      img: require('../../assets/images/unsplash_1.png'),
      msg1: '👋 Hi Jess! What’s up?',
      time: '12:14 PM',
    },
  ];
  const selectMultipleFile = async () => {
    try {
      const results = await DocumentPicker.pickMultiple({
        type: [DocumentPicker.types.images],
      });
      for (const res of results) {
        console.log('res : ' + JSON.stringify(res));
        console.log('URI : ' + res.uri);
        console.log('Type : ' + res.type);
        console.log('File Name : ' + res.name);
        console.log('File Size : ' + res.size);
      }
      setMultipleFile(results);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // alert('Canceled from multiple doc picker');
      } else {
        // alert('Unknown Error: ' + JSON.stringify(err));
        throw err;
      }
    }
  };

  const InsertChat = () => {
    try {
      const body = new FormData();
      body.append('receiver_id', params.SenderId);
      body.append('sender_id', Staps.id);
      body.append('chat_message', mess);
      axios({
        url: 'https://technorizen.com/Dating/webservice/insert_chat',
        method: 'POST',
        data: body,
        headers: {
          'content-type': 'multipart/form-data',
        },
      })
        .then(function (response) {
          if (response.data.result == 'successful') {
            Getchat_api();
            setMess('');
          } else {
            setMess('');
          }
        })
        .catch(function (error) {
          console.log('catch', error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const Getchat_api = () => {
    fetch(
      'https://technorizen.com/Dating/webservice/get_chat?sender_id=' +
        params.SenderId +
        '&' +
        'receiver_id=' +
        Staps.id,
      {method: 'post'},
    )
      .then(response => response.json())
      .then(response => {
        if (response.status == 1) {
          setGetmsg(response.result);
          setLoading(false);
        } else {
          setLoading(false);
        }
      })
      .catch(() => {
        console.log('ERROR GETTING DATA FROM API');
      });
  };

  const getPassion = () => {
    axios({
      method: 'get',
      url: `https://technorizen.com/Dating/webservice/get_passion`,
    }).then(response => {
      // console.log('response=>', response.data.result);
      setpassion(response.data.result);
    });
  };

  useEffect(() => {
    setInterval(() => {
      Getchat_api();
    }, 5000);
    getPassion();
  }, []);

  const calculate_age = dob1 => {
    var today = new Date();
    var birthDate = new Date(Staps.dob); // create a date object directly from `dob1` argument
    var age_now = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age_now--;
    }

    return age_now;
  };
 
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <HeaderImage_1 height={150} marginBottom={1}>
        <Header 
          marginTop={18}
          title={Staps.user_name + ', ' + calculate_age()}
          right={
            <TouchableOpacity
              onPress={() => refRBSheet.current.open()}
              style={{
                height: 40,
                width: 40,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 10,
              }}>
              {ThemeMode.selectedTheme ? (
                <Image
                  source={require('../../assets/icons/menus.png')}
                  style={{
                    height: 40,
                    width: 40,
                    resizeMode: 'contain',
                    marginRight: 10,
                  }}
                />
              ) : (
                <Image
                  source={require('../../assets/icons/menù_dark.png')}
                  style={{
                    height: 40,
                    width: 40,
                    resizeMode: 'contain',
                    marginRight: 10,
                  }}
                />
              )}
            </TouchableOpacity>
          }
        />
      </HeaderImage_1>
      <View style={{flex: 1}}>
        {Loading ? (
          <View style={{flex: 1, justifyContent: 'center'}}>
            <ActivityLoader />
          </View>
        ) : (
          <View>
            {params.params != null && (
              <View
                style={{
                  padding: 15,
                  borderBottomRightRadius: 50,
                  borderTopLeftRadius: 50,
                  borderBottomLeftRadius: 50,
                  // marginLeft: 50,
                  marginTop: 20,
                  marginRight: 10,
                  marginBottom: 15,
                  alignSelf: 'flex-end',
                  flex: 1,
                  backgroundColor:
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
                }}>
                <TextFormatted
                  style={{
                    fontSize: 13,
                    fontWeight: '400',
                    color: theme.colors.primary,
                  }}>
                  Hi, these are the date types I prefer
                  <TextFormatted
                    style={{
                      fontSize: 12,
                      fontWeight: '300',
                      color: theme.colors.primary,
                    }}>
                    12:56
                  </TextFormatted>
                </TextFormatted>
              </View>
            )}
            {params.params != null && (
              <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                {passion.map(
                  (v, i) =>
                    params.params[i] == v.id && (
                      <View
                        style={{
                          width: dimension.width / 3,
                          alignItems: 'center',
                          alignSelf: 'center',
                          marginBottom: 15,
                        }}>
                        <Image
                          source={{uri: v.image}}
                          resizeMode="contain"
                          style={{width: 45, height: 45}}
                        />
                        <TextFormatted
                          style={{
                            fontSize: 15,
                            fontWeight: '700',
                            color: theme.colors.darkGrey,
                            marginTop: 10,
                          }}>
                          {v.passion_name}
                        </TextFormatted>
                      </View>
                    ),
                )}
              </View>
            )}

            <FlatList
              data={getmsg}
              inverted
              renderItem={({item, i}) => (
                <View
                  style={{
                    marginLeft: 20,
                    marginTop: 22,
                    marginHorizontal: 15,
                    alignItems:
                      item.receiver_id == Staps.id ? 'flex-start' : 'flex-end',
                  }}>
                  {/* <TextFormatted> {item.chat_message}</TextFormatted> */}
                  <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                    {item.receiver_id == Staps.id && (
                      <Image
                        source={{uri: item?.sender_detail?.sender_image}}
                        style={{
                          height: 64,
                          width: 64,
                          resizeMode: 'cover',
                          borderRadius: 50,
                        }}
                      />
                    )}
                    <LinearGradient
                      start={{x: 0, y: 0}}
                      end={{x: 1, y: 0}}
                      colors={
                        item.receiver_id == Staps.id
                          ? ThemeMode.selectedTheme
                            ? ['#FAFAFA', '#FAFAFA']
                            : ['#FFFFFF0D', '#FFFFFF0D']
                          : ThemeMode.themecolr == 'Red'
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
                        paddingVertical: 15,
                        paddingRight: 20,
                        flexWrap: 'wrap',
                        flexDirection: 'row',
                        borderBottomRightRadius: 50,
                        borderTopLeftRadius:
                          item.receiver_id != Staps.id ? 50 : 0,
                        borderTopRightRadius:
                          item.receiver_id == Staps.id ? 50 : 0,
                        borderBottomLeftRadius: 50,
                        justifyContent: 'flex-start',
                      }}>
                      <TextFormatted
                        style={{
                          fontSize: 12,
                          fontWeight: '300',
                          color:
                            item.receiver_id == Staps.id
                              ? ThemeMode.selectedTheme
                                ? theme.colors.primaryBlack
                                : theme.colors.primary
                              : theme.colors.primary,
                          marginLeft: 15,
                        }}>
                        {item.chat_message}
                      </TextFormatted>
                      <TextFormatted
                        style={{
                          fontSize: 12,
                          fontWeight: '300',
                          color:
                            item.receiver_id == Staps.id
                              ? ThemeMode.selectedTheme
                                ? theme.colors.primaryBlack
                                : theme.colors.primary
                              : theme.colors.primary,
                          marginLeft: 15,
                        }}>
                        {item.time_ago}
                      </TextFormatted>
                    </LinearGradient>
                  </View>
                </View>
              )}
            />
          </View>
        )}
      </View>
      <View
        style={{
          marginHorizontal: 20,
          marginVertical: 15,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: ThemeMode.selectedTheme
              ? theme.colors.primary
              : theme.colors.primaryBlack,
            padding: 0,
            borderRadius: 50,
            paddingHorizontal: 10,
            shadowColor: '#8490ae85',
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.22,
            shadowRadius: 2.22,
            elevation: 10,
            flex: 1,
          }}>
          <TextInput
            placeholder="Type your message"
            value={mess}
            onChangeText={setMess}
            style={{
              flex: 1,
              padding: 10,
              fontFamily: 'Rubik-Regular',
              fontSize: 14,
              color: ThemeMode.selectedTheme
                ? theme.colors.primaryBlack
                : theme.colors.primary,
            }}
            placeholderTextColor={'#8490AE'}
          />

          <TouchableOpacity
            style={{
              alignSelf: 'center',
              width: 22,
              height: 22,
            }}
            /*  onPress={selectMultipleFile} */
          >
            <Image
              style={{
                width: 22,
                height: 22,
                tintColor: ThemeMode.selectedTheme
                  ? theme.colors.Black
                  : theme.colors.primary,
              }}
              resizeMode="contain"
              source={require('../../assets/icons/pin_chat.png')}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={{marginLeft: 15}}
          onPress={() => {
            InsertChat();
            setMess('');
          }}>
          <LinearGradient
            colors={
              mess == ''
                ? ['#8490AE', '#ADB9D7']
                : ThemeMode.themecolr == 'Red'
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
              height: 38,
              width: 38,
              borderRadius: 40,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              style={{
                width: 19,
                height: 19,
                tintColor: '#fff',
              }}
              resizeMode="contain"
              source={require('../../assets/icons/send_arrow.png')}
            />
          </LinearGradient>
        </TouchableOpacity>
      </View>
      <MoreOptions refRBSheet={refRBSheet} />
      <Netinforsheet />
    </View>
  );
};

export default Chats;

const styles = StyleSheet.create({});
