import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  TextInput,
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
import {useNavigation, useRoute} from '@react-navigation/native';
import axios from 'axios';
import Netinforsheet from '../../components/Netinforsheet';
import ActivityLoader from '../../components/ActivityLoader';
import {ShowToast} from '../../utils/Baseurl';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import BottomSheet from '../../components/bottomSheet';
import ButtonView from '../../components/buttonView';
import Button from '../../components/Button';

const Chats = () => {
  const navigation = useNavigation();
  const ThemeMode = useSelector(state => state.Theme);
  const Staps = useSelector(state => state.Stap);
  // const [multipleFile, setMultipleFile] = useState([]);
  const refRBSheet = useRef();
  const refRBSheetB = useRef();
  const refRBSheet2 = useRef();
  const [passion, setpassion] = useState([]);
  const {params} = useRoute();
  const [mess, setMess] = useState('');
  const [getmsg, setGetmsg] = useState([]);
  const [Loading, setLoading] = useState(true);
  const dimension = useWindowDimensions();
  const refRBSheet1 = useRef();
  const [chatImg, setChatImg] = useState([]);
  const Imgsheet = useRef();
  const pickImage = () => {
    launchImageLibrary({quality: 0.9}, response => {
      if (!response.didCancel) {
        setChatImg(response.assets);
        Imgsheet.current.open();
      }
    });
  };
  const picCamera = () => {
    launchCamera({}, response => {
      if (!response.didCancel) {
        setChatImg(response.assets);
        Imgsheet.current.open();
      }
    });
  };
  // const selectMultipleFile = async () => {
  //   try {
  //     const results = await DocumentPicker.pickMultiple({
  //       type: [DocumentPicker.types.images],
  //     });
  //     for (const res of results) {
  //       console.log('res : ' + JSON.stringify(res));
  //       console.log('URI : ' + res.uri);
  //       console.log('Type : ' + res.type);
  //       console.log('File Name : ' + res.name);
  //       console.log('File Size : ' + res.size);
  //     }
  //     setMultipleFile(results);
  //   } catch (err) {
  //     if (DocumentPicker.isCancel(err)) {
  //       // alert('Canceled from multiple doc picker');
  //     } else {
  //       // alert('Unknown Error: ' + JSON.stringify(err));
  //       throw err;
  //     }
  //   }
  // };
  const InsertChat = () => {
    try {
      const body = new FormData();
      body.append('receiver_id', params.SenderId);
      body.append('sender_id', Staps.id);
      body.append('chat_message', mess);
      {
        chatImg.forEach(val =>
          body.append('chat_image', {
            name: val?.fileName,
            type: val?.type,
            uri: val?.uri,
          }),
        );
      }
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
  const block_user_Api = () => {
    setLoading(true);
    try {
      axios({
        url:
          'https://technorizen.com/Dating/webservice/add_block_user?user_id=' +
          /*   'https://technorizen.com/Dating/webservice/unblock_user?user_id=' + */
          Staps.id +
          '&&' +
          'block_id=' +
          params.SenderId,
        method: 'POST',
      })
        .then(function (response) {
          // console.log('Block API=>', JSON.stringify(response.data.message));
          if (response.data.status == 1) {
            ShowToast(response.data.message);
            refRBSheet2.current.close();
            refRBSheet.current.close();
            refRBSheetB.current.close();
            navigation.navigate('chatList');
            setLoading(false);
          }
        })
        .catch(function (error) {
          console.log('catch', error);
        });
    } catch (error) {
      console.log(error);
    }
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
    <View
      style={{
        flex: 1,
        backgroundColor: ThemeMode.selectedTheme
          ? theme.colors.primary
          : theme.colors.primaryBlack,
      }}>
      <HeaderImage_1 height={150} marginBottom={1}>
        <Header
          marginTop={18}
          T_marginRight={'1%'}
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
                  source={require('../../assets/icons/men??_dark.png')}
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
                          marginRight: 10,
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
                      <Image
                        resizeMode="contain"
                        source={{uri: item?.chat_image}}
                        style={{
                          height: dimension.width / 2,
                          width: (dimension.width / 2) * 1,
                          alignSelf:
                            item.receiver_id == Staps.id
                              ? 'flex-start'
                              : 'flex-end',
                          display:
                            item?.chat_image ==
                            'https://technorizen.com/Dating/uploads/images/'
                              ? 'none'
                              : 'flex',
                          borderRadius: 10,
                        }}
                      />
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
            onPress={() => refRBSheet1.current.open()}>
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
      <Option
        refRBSheet={refRBSheet1}
        onPress={() => {
          picCamera();
          refRBSheet1.current.close();
        }}
        onPress1={() => {
          pickImage();
          refRBSheet1.current.close();
        }}
      />
      <MoreOptions
        Block_onPress={() => block_user_Api()}
        refRBSheet2={refRBSheetB}
        BlockID={params.SenderId}
        UserID={Staps.id}
        Block_Loading={Loading}
        refRBSheet={refRBSheet}
      />
      <Netinforsheet />
      <BottomSheet
        // closeOnPressBack={false}
        // closeOnPressMask={false}
        // closeOnDragDown={false}
        refRBSheet={Imgsheet}
        height={400}>
        <View
          style={{
            marginHorizontal: 20,
            marginVertical: 25,
            alignItems: 'center',
          }}>
          <Image
            resizeMode="cover"
            source={{uri: chatImg[0]?.uri}}
            style={{
              height: 240,
              width: 240,
              alignSelf: 'center',
              borderRadius: 40,
            }}
          />
          <View
            style={{
              position: 'absolute',
              top: '100%',
              width: '100%',
            }}>
            <ButtonView height={100}>
              <TextFormatted
                style={{
                  fontSize: 18,
                  fontWeight: '700',
                  color: '#8490AE',
                  width: dimension.width / 2 - 20,
                  textAlign: 'center',
                }}
                onPress={() => {
                  Imgsheet.current.close();
                }}>
                Cancel
              </TextFormatted>
              <Button
                buttonName={'Send'}
                color={theme.colors.primary}
                marginTop={1}
                marginBottom={1}
                width={dimension.width / 2 - 20}
                onPress={() => {
                  InsertChat();
                  Imgsheet.current.close();
                }}
              />
            </ButtonView>
          </View>
        </View>
      </BottomSheet>
    </View>
  );
};

const Option = ({refRBSheet, onPress, onPress1}) => {
  const ThemeMode = useSelector(state => state.Theme);
  return (
    <BottomSheet refRBSheet={refRBSheet} height={200}>
      <TextFormatted
        style={{
          fontSize: 18,
          fontWeight: '500',
          color: ThemeMode.selectedTheme
            ? theme.colors.primaryBlack
            : theme.colors.primary,
          marginHorizontal: 20,
          marginTop: 10,
        }}>
        Select an Option
      </TextFormatted>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          marginTop: 40,
        }}>
        <TouchableOpacity onPress={onPress}>
          <Image
            source={require('../../assets/icons/camera.png')}
            style={{height: 50, width: 50, resizeMode: 'contain'}}
          />
          <TextFormatted
            style={{
              fontSize: 14,
              fontWeight: '600',
              color: ThemeMode.selectedTheme
                ? theme.colors.primaryBlack
                : theme.colors.primary,
              marginTop: 5,
            }}>
            Camera
          </TextFormatted>
        </TouchableOpacity>
        <TouchableOpacity onPress={onPress1}>
          <Image
            source={require('../../assets/images/gallery.png')}
            style={{height: 50, width: 50, resizeMode: 'contain'}}
          />
          <TextFormatted
            style={{
              fontSize: 14,
              fontWeight: '600',
              color: ThemeMode.selectedTheme
                ? theme.colors.primaryBlack
                : theme.colors.primary,
              marginTop: 5,
            }}>
            Gallery
          </TextFormatted>
        </TouchableOpacity>
      </View>
    </BottomSheet>
  );
};
export default Chats;

const styles = StyleSheet.create({});
