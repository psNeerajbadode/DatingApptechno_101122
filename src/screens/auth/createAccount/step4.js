import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  View,
  RefreshControl,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import HeaderImage_1 from '../../../components/HeaderImage_1';
import Pagination from '../../../components/Pagination';
import ButtonView from '../../../components/buttonView';
import Button from '../../../components/Button';
import {theme} from '../../../utils/Constants';
import TextFormatted from '../../../components/TextFormatted';
import * as ImagePicker from 'react-native-image-picker';
import {createThumbnail} from 'react-native-create-thumbnail';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';
import {ShowToast} from '../../../utils/Baseurl';
import {useNavigation} from '@react-navigation/native';
import BottomSheet from '../../../components/bottomSheet';
import {STAP} from '../../../redux/actions/ActionType';
import {
  BluelightImage,
  GreenlightImage,
  PurplelightImage,
  RedlightImage,
  YellowlightImage,
} from '../../../utils/CustomImages';
import Netinforsheet from '../../../components/Netinforsheet';
import Video from 'react-native-video';
import VideoPlayer from 'react-native-video-player';



const Step4 = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const refRBSheet3 = useRef();
  const ThemeMode = useSelector(state => state.Theme);
  const Staps = useSelector(state => state.Stap);
  const dimension = useWindowDimensions();
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [media, setMedia] = useState([]);
  const [vid, setVid] = useState(false);
  const [thumb, setThumb] = useState();
  const images = media.filter(v => v.type != 'video/mp4');
  const video = media.filter(v => v.type == 'video/mp4');
  var RNFS = require('react-native-fs');

  const selectImage = async type => {
    await (type == 'cemera'
      ? ImagePicker.launchCamera
      : ImagePicker.launchImageLibrary)(
      {
        mediaType: /* type == 'photos' ? 'photo' : */ 'mixed',
        videoQuality: 'high',
        selectionLimit: 10,
        quality: 1,
      },
      response => {
        if (!response.didCancel) {
          if (
            media
              .concat(...response.assets)
              .filter(v => v.type.includes('video')).length <= 1 &&
            media
              .concat(...response.assets)
              .filter(v => !v.type.includes('video')).length <= 5
          ) {
            setMedia(media.concat(...response.assets));
          } else {
            ShowToast(
              ' Upload at least 2 media to proceed and a maximum of 5 photo and 1 video',
            );
          }
          /* generateThumbnail() */
        }
      },
    );
  };

  // async function /* generateThumbnail() */ {
  //   try {
  //     const response = await createThumbnail({
  //       url: video[0].uri,
  //     });
  //     console.log('response', response.path);
  //     setThumb(response.path);
  //   } catch (err) {
  //     console.error(err);
  //   } finally {
  //   }
  //   setRefresh(true);
  //   setTimeout(() => {
  //     setRefresh(false);
  //   }, 1000);
  // }

  function remove_photos(index) {
    media.splice(index, 1);
    setMedia(media);
    setTimeout(() => {
      setRefresh(false);
    }, 1000);
  }
  const ImageApi = () => {
    try {
      setLoading(true);
      const body = new FormData();
      body.append('user_id', Staps.id);
      images.forEach(Val => {
        body.append('image[]', {
          uri: Val.uri,
          type: Val.type,
          name: Val.fileName,
        });
      });

      axios({
        url: 'https://technorizen.com/Dating/webservice/signup5',
        method: 'POST',
        data: body,
        headers: {
          'content-type': 'multipart/form-data',
        },
      })
        .then(function (response) {
          console.log('image Api', response.data);
          if (response.data.status == 1) {
            setLoading(false);
            dispatch({type: STAP, payload: response.data.result});
            navigation.navigate('step5');
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

  async function VideoApi() {
    try {
      setLoading(true);
      const body = new FormData();
      body.append('user_id', Staps.id);
      const urlComponents = video[0]?.uri.split('/');
      const fileNameAndExtension = urlComponents[urlComponents?.length - 1];
      const destPath = `${RNFS?.TemporaryDirectoryPath}/${fileNameAndExtension}`;
      await RNFS.copyFile(video[0]?.uri, destPath);
      console.log('file://' + destPath);

      body.append('image', {
        uri: 'file://' + destPath,
        type: video[0]?.type,
        name: video[0]?.fileName,
      });
      axios({
        url: 'https://technorizen.com/Dating/webservice/signup6',
        method: 'POST',
        data: body,
        headers: {
          'content-type': 'multipart/form-data',
        },
      })
        .then(function (response) {
          console.log('Video Api', response.data);
          if (response.data.status == 1) {
            setLoading(false);
            dispatch({type: STAP, payload: response.data.result});
            navigation.navigate('step5');
            console.log(response.data);
          }
        })
        .catch(function (error) {
          console.log('catch', error);
          setLoading(false);
        });
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    /* navigation.addListener('focus', () => generateThumbnail()); */
  }, []);


const [paush, setPaush] = useState(false);
console.log("pause",paush);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: ThemeMode.selectedTheme
          ? theme.colors.primary
          : theme.colors.primaryBlack,
      }}>
      <HeaderImage_1 height={170} marginBottom={1}>
        <Pagination
          title={'Create account'}
          subTitle={'Add media'}
          position={4}
        />
      </HeaderImage_1>

      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refresh}
          /*   onRefresh={() => /* generateThumbnail() */
          />
        }>
        <View
          style={{
            flexDirection: 'row',
            marginHorizontal: 20,
            alignItems: 'center',
            marginTop: 10,
          }}>
          <Image
            resizeMode="contain"
            source={require('../../../assets/icons/alert_ico.png')}
            style={{
              height: 20,
              width: 20,
              tintColor: theme.colors.darkGrey,
            }}
          />
          <TextFormatted
            style={{
              fontSize: 14,
              fontWeight: '600',
              color: '#8490AE',
              flex: 1,
              marginLeft: 10,
              marginTop: 10,
            }}>
            Upload at least 2 media to proceed and a maximum of 5 photo and 1
            video
          </TextFormatted>
        </View>
        <View style={{flexDirection: 'row', marginTop: 20}}>
          <View style={{width: '50%', alignItems: 'center'}}>
            <TouchableOpacity
              onPress={() => {
                refRBSheet3.current.open();
                /* selectImage(); */
                /* generateThumbnail() */
              }}
              style={{
                width: (dimension.width - 60) / 2,
                height: 158,
                backgroundColor: ThemeMode.selectedTheme
                  ? theme.colors.primary
                  : theme.colors.primaryBlack,
                borderRadius: 40,
                shadowColor: '#8490ae85',
                shadowOffset: {
                  width: 0,
                  height: 1,
                },
                shadowOpacity: 0.22,
                shadowRadius: 2.22,

                elevation: 10,
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 10,
              }}>
              <Image
                source={
                  ThemeMode.themecolr == 'Red'
                    ? RedlightImage.plusicon
                    : ThemeMode.themecolr == 'Blue'
                    ? BluelightImage.plusiconblue
                    : ThemeMode.themecolr == 'Green'
                    ? GreenlightImage.plusicongreen
                    : ThemeMode.themecolr == 'Purple'
                    ? PurplelightImage.plusiconpurple
                    : ThemeMode.themecolr == 'Yellow'
                    ? YellowlightImage.plusiconyellow
                    : RedlightImage.plusicon
                }
                style={{
                  position: 'absolute',
                  zIndex: 1,
                  top: '15%',
                  right: '22%',
                  height: 29,
                  width: 29,
                }}
              />

              <Image
                source={require('../../../assets/icons/add_media.png')}
                style={{width: '50%', height: '50%', resizeMode: 'contain'}}
              />

              <TextFormatted
                style={{
                  fontSize: 12,
                  color: ThemeMode.selectedTheme
                    ? theme.colors.primaryBlack
                    : theme.colors.primary,
                  fontWeight: '600',
                  marginTop: 10,
                }}>
                Add media
              </TextFormatted>
            </TouchableOpacity>

            <View>
              {media?.map(
                (it, i) =>
                  it.type != 'video/mp4' &&
                  i == 1 && (
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('viewSelfMedia', {
                          imgIndex: i,
                          Signup_User: images,
                        })
                      }>
                      <TouchableOpacity
                        onPress={() => {
                          remove_photos(i);
                          setRefresh(true);
                        }}
                        style={{
                          position: 'absolute',
                          top: 30,
                          right: 10,
                          zIndex: 1,
                          padding: 5,
                          borderRadius: 10,
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
                        <Image
                          source={require('../../../assets/icons/delete_icon.png')}
                          style={{
                            width: 18,
                            height: 18,
                            tintColor: ThemeMode.selectedTheme
                              ? theme.colors.primary
                              : theme.colors.primaryBlack,
                          }}
                        />
                      </TouchableOpacity>
                      <Image
                        source={{uri: it.uri}}
                        style={{
                          width: (dimension.width - 60) / 2,
                          height: 261,
                          resizeMode: 'cover',
                          borderRadius: 20,
                          marginTop: 10,
                        }}
                      />
                    </TouchableOpacity>
                  ),
              )}
            </View>
          </View>
          <View
            style={{
              alignSelf: 'center',
              width: '100%',
            }}>
            <View style={{width: '50%', alignItems: 'center'}}>
              {media?.map(
                (it, i) =>
                  it.type != 'video/mp4' &&
                  i == 0 && (
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('viewSelfMedia', {
                          imgIndex: i,
                          Signup_User: images,
                        })
                      }>
                      <TouchableOpacity
                        onPress={() => {
                          remove_photos(i);
                          setRefresh(true);
                        }}
                        style={{
                          position: 'absolute',
                          top: 30,
                          right: 10,
                          zIndex: 1,
                          padding: 5,
                          borderRadius: 10,
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
                        <Image
                          source={require('../../../assets/icons/delete_icon.png')}
                          style={{
                            width: 18,
                            height: 18,
                            tintColor: ThemeMode.selectedTheme
                              ? theme.colors.primary
                              : theme.colors.primaryBlack,
                          }}
                        />
                      </TouchableOpacity>
                      <Image
                        source={{uri: it.uri}}
                        style={{
                          width: (dimension.width - 60) / 2,
                          height: 281,
                          resizeMode: 'cover',
                          borderRadius: 20,
                          marginTop: 20,
                        }}
                      />
                    </TouchableOpacity>
                  ),
              )}
            </View>

            <View style={{width: '50%', alignItems: 'center'}}>
              {media?.map(
                (it, i) =>
                  it.type != 'video/mp4' &&
                  i == 2 && (
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('viewSelfMedia', {
                          imgIndex: i,
                          Signup_User: images,
                        })
                      }>
                      <TouchableOpacity
                        onPress={() => {
                          remove_photos(i);
                          setRefresh(true);
                        }}
                        style={{
                          position: 'absolute',
                          top: 30,
                          right: 10,
                          zIndex: 1,
                          padding: 5,
                          borderRadius: 10,
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
                        <Image
                          source={require('../../../assets/icons/delete_icon.png')}
                          style={{
                            width: 18,
                            height: 18,
                            tintColor: ThemeMode.selectedTheme
                              ? theme.colors.primary
                              : theme.colors.primaryBlack,
                          }}
                        />
                      </TouchableOpacity>
                      <Image
                        source={{uri: it.uri}}
                        style={{
                          width: (dimension.width - 60) / 2,
                          height: 130,
                          resizeMode: 'cover',
                          borderRadius: 20,
                          marginTop: 20,
                        }}
                      />
                    </TouchableOpacity>
                  ),
              )}
            </View>
            <View style={{width: '50%', alignItems: 'center'}}>
              {media?.map(
                (it, i) =>
                  it.type != 'video/mp4' &&
                  i == 3 && (
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('viewSelfMedia', {
                          imgIndex: i,
                          Signup_User: images,
                        })
                      }>
                      <TouchableOpacity
                        onPress={() => {
                          remove_photos(i);
                          setRefresh(true);
                        }}
                        style={{
                          position: 'absolute',
                          top: 30,
                          right: 10,
                          zIndex: 1,
                          padding: 5,
                          borderRadius: 10,
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
                        <Image
                          source={require('../../../assets/icons/delete_icon.png')}
                          style={{
                            width: 18,
                            height: 18,
                            tintColor: ThemeMode.selectedTheme
                              ? theme.colors.primary
                              : theme.colors.primaryBlack,
                          }}
                        />
                      </TouchableOpacity>
                      <Image
                        source={{uri: it.uri}}
                        style={{
                          width: (dimension.width - 60) / 2,
                          height: 281,
                          resizeMode: 'cover',
                          borderRadius: 20,
                          marginTop: 20,
                        }}
                      />
                    </TouchableOpacity>
                  ),
              )}
            </View>
          </View>
        </View>
        {video?.map(
          (it, i) =>
           
              <TouchableOpacity 
              style={{width:dimension.width-40,alignSelf:'center',marginTop:20}}
                onPress={() =>{ 
                  navigation.navigate('playVideo', {data: it?.uri})
                }}>
                     <TouchableOpacity
                        onPress={() => {
                          remove_photos(i);
                          setRefresh(true);
                        }}
                        style={{
                          position: 'absolute',
                          top: 10,
                          right: 10,
                          zIndex: 1,
                          padding: 5,
                          borderRadius: 10,
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
                        <Image
                          source={require('../../../assets/icons/delete_icon.png')}
                          style={{
                            width: 18,
                            height: 18,
                            tintColor: ThemeMode.selectedTheme
                              ? theme.colors.primary
                              : theme.colors.primaryBlack,
                          }}
                        />
                      </TouchableOpacity>
                      <Image
                      source={require('../../../assets/icons/play_video.png')}
                      style={{
                        height: 64,
                        width: 64,
                        resizeMode: 'contain',
                        position: 'absolute',
                        alignSelf: 'center',
                        top: 80,
                        zIndex:1
                      }}
                    />
                 
                      <VideoPlayer  
                      style={{zIndex:0,alignSelf:'center',borderRadius:20,overflow:'hidden',height:223}}
                thumbnail={{ uri: it?.uri }}
                pause={true}
                video={{ uri: it?.uri }}
                resizeMode={'cover'}
                playIcon={false}

/>         
              </TouchableOpacity>
            
        )}
        {media?.map(
          (it, i) =>
            it.type != 'video/mp4' &&
            i >= 4 && (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('viewSelfMedia', {
                    imgIndex: i,
                    Signup_User: images,
                  })
                }>
                <TouchableOpacity
                  onPress={() => {
                    remove_photos(i);
                    setRefresh(true);
                  }}
                  style={{
                    position: 'absolute',
                    top: 30,
                    right: 30,
                    zIndex: 1,
                    padding: 5,
                    borderRadius: 10,
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
                  <Image
                    source={require('../../../assets/icons/delete_icon.png')}
                    style={{
                      width: 18,
                      height: 18,
                      tintColor: ThemeMode.selectedTheme
                        ? theme.colors.primary
                        : theme.colors.primaryBlack,
                    }}
                  />
                </TouchableOpacity>
                <Image
                  source={{uri: it.uri}}
                  style={{
                    width: dimension.width - 40,
                    height: 223,
                    resizeMode: 'cover',
                    borderRadius: 20,
                    marginTop: 20,
                    alignSelf: 'center',
                  }}
                />
              </TouchableOpacity>
            ),
        )}
      </ScrollView>

      <ButtonView>
        <Button
          opacity={media?.length != 0 && media?.length <= 6 ? 1 : 0.5}
          buttonName={'Next'}
          marginTop={1}
          Loading={loading}
          disabled={media?.length != 0 && media?.length <= 6 ? false : true}
          color={'#fff'}
          onPress={
            () => {
              ImageApi();
              VideoApi();
            } /* navigation.navigate('step5') */
          }
        />

        <Option
          refRBSheet={refRBSheet3}
          onPress={() => {
            selectImage('cemera');
            refRBSheet3.current.close();
          }}
          onPress1={() => {
            selectImage('gallery');
            refRBSheet3.current.close();
          }}
        />
      </ButtonView>
      <Netinforsheet />
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
        <TouchableOpacity onPress={onPress} style={{alignItems: 'center'}}>
          <Image
            source={require('../../../assets/icons/camera.png')}
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
        <TouchableOpacity onPress={onPress1} style={{alignItems: 'center'}}>
          <Image
            source={require('../../../assets/images/gallery.png')}
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

export default Step4;

const styles = StyleSheet.create({});
