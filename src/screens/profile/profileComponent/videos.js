import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
  ScrollView,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import TextFormatted from '../../../components/TextFormatted';
import {theme} from '../../../utils/Constants';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import BottomSheet from '../../../components/bottomSheet';
import {createThumbnail} from 'react-native-create-thumbnail';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';
import ActivityLoader from '../../../components/ActivityLoader';
import {
  BluelightImage,
  GreenlightImage,
  PurplelightImage,
  RedlightImage,
  YellowlightImage,
} from '../../../utils/CustomImages';
import VideoPlayer from 'react-native-video-player';
import {ShowToast} from '../../../utils/Baseurl';

const Videos = () => {
  const ThemeMode = useSelector(state => state.Theme);
  const Staps = useSelector(state => state.Stap);
  const navigation = useNavigation();
  const dimension = useWindowDimensions();
  const [uri, setUri] = useState();
  const [thumb, setThumb] = useState();
  const [User, setUser] = useState();
  const [Loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const refRBSheet = useRef();
  var RNFS = require('react-native-fs');
  const videoData = [
    {vid: require('../../../assets/images/big_buck_bunny_720p_1mb.mp4')},
  ];
  const pickVideo = () => {
    launchImageLibrary(
      {mediaType: 'video', videoQuality: 'medium'},
      response => {
        if (!response.didCancel) {
          console.log('response.assets=======>', response.assets);
          setUri(response.assets);
          VideoApi();
        }
      },
    );
  };
  const picCamera = () => {
    launchCamera({mediaType: 'video', videoQuality: 'medium'}, response => {
      if (!response.didCancel) {
        console.log('response.assets=======>', response.assets);
        setUri(response.assets);
        VideoApi();
      }
    });
  };

  const getUserData = () => {
    setLoading(true);
    axios({
      method: 'get',
      url:
        'https://technorizen.com/Dating/webservice/getUserPostData?user_id=' +
        Staps.id +
        '&&' +
        'type=Video',
    }).then(response => {
      setLoading(false);
      setUser(response.data.result);
    });
  };

  function generateThumbnail() {
    try {
      const response = createThumbnail({
        url: 'https://technorizen.com/Dating/uploads/images/Video_20221029054356.video:1579558',
      });
      console.log('response');
      setThumb(response.path);
    } catch (err) {
      console.error(err);
    } finally {
    }
    setRefresh(true);
    setTimeout(() => {
      setRefresh(false);
    }, 1000);
  }

  async function VideoApi() {
    if (uri[0]?.duration <= 15) {
      try {
        setLoading(true);
        const body = new FormData();
        body.append('user_id', Staps.id);
        const urlComponents = uri[0]?.uri.split('/');
        const fileNameAndExtension = urlComponents[urlComponents?.length - 1];
        const destPath = `${RNFS?.TemporaryDirectoryPath}/${fileNameAndExtension}`;
        await RNFS.copyFile(uri[0]?.uri, destPath);
        console.log('file://' + destPath.length);
        body.append('video', {
          uri: 'file://' + destPath,
          type: uri[0]?.type,
          name: uri[0]?.fileName,
        });
        axios({
          url: 'https://technorizen.com/Dating/webservice/add_video_post',
          method: 'POST',
          data: body,
          headers: {
            'content-type': 'multipart/form-data',
          },
        })
          .then(function (response) {
            //console.log('Video Api', response);
            if (response.data.status == 1) {
              setLoading(false);
              getUserData();
              ShowToast('Video add successfully');
              console.log(response);
            } else {
              setLoading(false);
              ShowToast('Video add Unsuccessfully');
            }
          })
          .catch(function (error) {
            console.log('catch', error);
            setLoading(false);
          });
      } catch (error) {
        console.log(error);
      }
      return;
    }
  }

  useEffect(() => {
    getUserData();
    generateThumbnail();
  }, []);

  return (
    <ScrollView>
      {Loading ? (
        <View style={{marginTop: dimension.width * 0.15}}>
          <ActivityLoader />
        </View>
      ) : (
        <View>
          <View style={{flexDirection: 'row'}}>
            <View style={{width: dimension.width / 2}}>
              <TouchableOpacity
                onPress={() => {
                  refRBSheet.current.open();
                  // generateThumbnail();
                }}
                style={{
                  width: (dimension.width - 50) / 2,
                  height: (dimension.width - 50) / 2,
                  backgroundColor: ThemeMode.selectedTheme
                    ? theme.colors.primary
                    : theme.colors.primaryBlack,
                  alignSelf: 'center',
                  borderRadius: 20,
                  shadowColor: '#8490ae85',
                  shadowOffset: {
                    width: 0,
                    height: 1,
                  },
                  shadowOpacity: 0.22,
                  shadowRadius: 2.22,
                  elevation: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: 20,
                }}>
                <ImageBackground
                  source={require('../../../assets/icons/youtube.png')}
                  style={{height: 60, width: 60}}
                  resizeMode="contain">
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
                      height: 29,
                      width: 29,
                      resizeMode: 'contain',
                      position: 'absolute',
                      zIndex: 1,
                      top: '-25%',
                      right: '-20%',
                    }}
                    resizeMode="contain"
                  />
                </ImageBackground>
                <TextFormatted
                  style={{
                    fontSize: 12,
                    fontWeight: '600',
                    color: ThemeMode.selectedTheme
                      ? theme.colors.primaryBlack
                      : theme.colors.primary,
                    marginTop: 5,
                  }}>
                  Add video
                </TextFormatted>
              </TouchableOpacity>
            </View>
            {User?.map(
              (it, i) =>
                i == 0 && (
                  <TouchableOpacity
                    style={{
                      width: dimension.width / 2 - 10,
                      alignSelf: 'center',
                      marginTop: 20,
                    }}
                    onPress={() => {
                      navigation.navigate('playVideo', {data: it?.video});
                    }}>
                    <Image
                      source={require('../../../assets/icons/play_video.png')}
                      style={{
                        height: 64,
                        width: 64,
                        resizeMode: 'contain',
                        position: 'absolute',
                        alignSelf: 'center',
                        top: 70,
                        zIndex: 1,
                      }}
                    />

                    <VideoPlayer
                      style={{
                        zIndex: 0,
                        alignSelf: 'center',
                        borderRadius: 20,
                        overflow: 'hidden',
                        height: 202,
                      }}
                      thumbnail={{uri: it?.video}}
                      pause={true}
                      video={{uri: it?.video}}
                      resizeMode={'cover'}
                      playIcon={false}
                    />
                  </TouchableOpacity>
                ),
            )}
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignSelf: 'center',
              justifyContent: 'space-evenly',
              width: '100%',
            }}>
            {User?.map(
              (it, i) =>
                i == 1 && (
                  <TouchableOpacity
                    style={{
                      width: dimension.width / 2.1 - 10,
                      alignSelf: 'center',
                      marginTop: 20,
                    }}
                    onPress={() => {
                      navigation.navigate('playVideo', {data: it?.video});
                    }}>
                    <Image
                      source={require('../../../assets/icons/play_video.png')}
                      style={{
                        height: 64,
                        width: 64,
                        resizeMode: 'contain',
                        position: 'absolute',
                        alignSelf: 'center',
                        top: 70,
                        zIndex: 1,
                      }}
                    />
                    <VideoPlayer
                      style={{
                        zIndex: 0,
                        alignSelf: 'center',
                        borderRadius: 20,
                        overflow: 'hidden',
                        height: 202,
                      }}
                      thumbnail={{uri: it?.video}}
                      pause={true}
                      video={{uri: it?.video}}
                      resizeMode={'cover'}
                      playIcon={false}
                    />
                  </TouchableOpacity>
                ),
            )}
            {User?.map(
              (it, i) =>
                i == 2 && (
                  <TouchableOpacity
                    style={{
                      width: dimension.width / 2.1 - 10,
                      alignSelf: 'center',
                      marginTop: 20,
                    }}
                    onPress={() => {
                      navigation.navigate('playVideo', {data: it?.video});
                    }}>
                    <Image
                      source={require('../../../assets/icons/play_video.png')}
                      style={{
                        height: 64,
                        width: 64,
                        resizeMode: 'contain',
                        position: 'absolute',
                        alignSelf: 'center',
                        top: 70,
                        zIndex: 1,
                      }}
                    />

                    <VideoPlayer
                      style={{
                        zIndex: 0,
                        alignSelf: 'center',
                        borderRadius: 20,
                        overflow: 'hidden',
                        height: 202,
                      }}
                      thumbnail={{uri: it?.video}}
                      pause={true}
                      video={{uri: it?.video}}
                      resizeMode={'cover'}
                      playIcon={false}
                    />
                  </TouchableOpacity>
                ),
            )}
          </View>
          {User?.map(
            (it, i) =>
              i >= 3 && (
                <TouchableOpacity
                  style={{
                    width: dimension.width - 40,
                    alignSelf: 'center',
                    marginTop: 20,
                  }}
                  onPress={() => {
                    navigation.navigate('playVideo', {data: it?.video});
                  }}>
                  <Image
                    source={require('../../../assets/icons/play_video.png')}
                    style={{
                      height: 64,
                      width: 64,
                      resizeMode: 'contain',
                      position: 'absolute',
                      alignSelf: 'center',
                      top: 80,
                      zIndex: 1,
                    }}
                  />

                  <VideoPlayer
                    style={{
                      zIndex: 0,
                      alignSelf: 'center',
                      borderRadius: 20,
                      overflow: 'hidden',
                      height: 223,
                    }}
                    thumbnail={{uri: it?.video}}
                    pause={true}
                    video={{uri: it?.video}}
                    resizeMode={'cover'}
                    playIcon={false}
                  />
                </TouchableOpacity>
              ),
          )}
          <View style={{marginBottom: 100}} />
        </View>
      )}
      <Option
        refRBSheet={refRBSheet}
        onPress={() => {
          picCamera();
          refRBSheet.current.close();
        }}
        onPress1={() => {
          pickVideo();
          refRBSheet.current.close();
        }}
      />
    </ScrollView>
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
        <TouchableOpacity onPress={onPress1}>
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

export default Videos;

const styles = StyleSheet.create({});
