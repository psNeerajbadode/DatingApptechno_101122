import {
  Image,
  PermissionsAndroid,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Swiper from 'react-native-swiper';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {Platform} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
import Netinforsheet from '../../components/Netinforsheet';
const ViewSelfMedia = () => {
  const navigation = useNavigation();
  const {params = {}} = useRoute();
  const ThemeMode = useSelector(state => state.Theme);
  const [index, setIndex] = useState(params?.imgIndex);

  const Staps = useSelector(state => state.Stap);
  console.log('params', params);

  const Storage_permission = async () => {
    if (Platform.OS === 'ios') {
      download_Img();
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission Required',
            message: 'App needs access to your Storage ',
          },
        );
        if (granted === 'granted') {
          console.log('granted Storage Permission');
          download_Img();
        } else {
          console.log('Storage permission denied');
        }
      } catch (err) {
        console.warn(err);
      }
    }
  };

  const download_Img = () => {
    let date = new Date();
    let ImageUrl = params?.User[index]?.image;
    const {config, fs} = RNFetchBlob;
    config({
      addAndroidDownloads: {
        useDownloadManager: true,
        description: 'File downloaded by download manager.',
        notification: true,
        path:
          fs.dirs.DCIMDir +
          '/image_' +
          Math.floor(date.getTime() + date.getSeconds() / 2),
      },
      fileCache: true,
    })
      .fetch('GET', ImageUrl, {
        //some headers ..
      })
      .then(res => {
        // the temp file path
        console.log('The file saved to ', JSON.stringify(res));
      });
  };

  return (
    <View style={{flex: 1}}>
      <Swiper
        loop={false}
        style={styles.wrapper}
        index={params?.imgIndex}
        showsButtons={true}
        showsPagination={false}
        onIndexChanged={index => setIndex(index)}
        buttonWrapperStyle={{paddingHorizontal: 0}}
        nextButton={
          <Image
            source={
              ThemeMode.selectedTheme
                ? require('../../assets/icons/P_sidebar.png')
                : require('../../assets/icons/next_dark.png')
            }
            style={{height: 145, width: 25, resizeMode: 'contain'}}
          />
        }
        prevButton={
          <Image
            source={
              ThemeMode.selectedTheme
                ? require('../../assets/icons/N_sidebar.png')
                : require('../../assets/icons/prev_dark.png')
            }
            style={{height: 145, width: 25, resizeMode: 'contain'}}
          />
        }>
        {params?.Signup_User == null
          ? params?.User?.map((it, i) => (
              /* params?.imgIndex == i && */ <Image
                source={{uri: it.image}}
                resizeMode="cover"
                style={{height: '100%', width: '100%'}}
              />
            ))
          : params?.Signup_User?.map((it, i) => (
              /* params?.imgIndex == i && */ <Image
                source={{uri: it.uri}}
                resizeMode="cover"
                style={{height: '100%', width: '100%'}}
              />
            ))}
      </Swiper>
      <View
        style={{
          position: 'absolute',
          flexDirection: 'row',
          marginHorizontal: 20,
          marginTop: 50,
        }}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{alignSelf: 'flex-start'}}>
          <Image
            source={
              ThemeMode.selectedTheme
                ? require('../../assets/icons/back.png')
                : require('../../assets/icons/back_dark.png')
            }
            style={{height: 40, width: 40, resizeMode: 'contain'}}
          />
        </TouchableOpacity>
        <View style={{flex: 1}} />
        {params.Signup_User == null && (
          <View>
            {ThemeMode.selectedTheme ? (
              <TouchableOpacity
                onPress={() => Storage_permission()}
                style={{alignSelf: 'flex-start'}}>
                <Image
                  source={require('../../assets/icons/download_light.png')}
                  style={{height: 40, width: 40, resizeMode: 'contain'}}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => Storage_permission()}
                style={{alignSelf: 'flex-start'}}>
                <Image
                  source={require('../../assets/icons/download_dark.png')}
                  style={{height: 40, width: 40, resizeMode: 'contain'}}
                />
              </TouchableOpacity>
            )}
          </View>
        )}
      </View>
      <Netinforsheet />
    </View>
  );
};

export default ViewSelfMedia;

const styles = StyleSheet.create({
  linear: {
    height: 50,
    width: 50,
    borderRadius: 50,

    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,

    elevation: 1,
  },
  bg: {
    height: 50,
    width: 50,
    borderRadius: 50,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,

    elevation: 1,
    marginRight: 12,
  },
});
