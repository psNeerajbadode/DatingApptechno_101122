import {
  Image,
  PermissionsAndroid,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useRef, useState} from 'react';
import Swiper from 'react-native-swiper';
import {useNavigation, useRoute} from '@react-navigation/native';

import MoreOptions from '../moreOptions';
import {useDispatch, useSelector} from 'react-redux';
import Netinforsheet from '../../../components/Netinforsheet';
import RNFetchBlob from 'rn-fetch-blob';

const ViewImage = () => {
  const navigation = useNavigation();
  const {params = {}} = useRoute();
  const [judge, setJudge] = useState(false);
  const [index, setIndex] = useState(params?.imgIndex);
  const ThemeMode = useSelector(state => state.Theme);
  const photos = [
    {img: require('../../../assets/images/unsplash_1.png')},
    {img: require('../../../assets/images/unsplash_2.png')},
    {img: require('../../../assets/images/unsplash_3.png')},
    {img: require('../../../assets/images/unsplash_4.png')},
    {img: require('../../../assets/images/unsplash_5.png')},
    {img: require('../../../assets/images/unsplash_6.png')},
  ];
  const refRBSheet = useRef();
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
    let ImageUrl = params?.Userphoto[index]?.image;
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
        index={params.imgIndex}
        showsButtons={true}
        showsPagination={false}
        onIndexChanged={index => setIndex(index)}
        buttonWrapperStyle={{paddingHorizontal: 0}}
        nextButton={
          <Image
            source={
              ThemeMode.selectedTheme
                ? require('../../../assets/icons/P_sidebar.png')
                : require('../../../assets/icons/next_dark.png')
            }
            style={{height: 145, width: 25, resizeMode: 'contain'}}
          />
        }
        prevButton={
          <Image
            source={
              ThemeMode.selectedTheme
                ? require('../../../assets/icons/N_sidebar.png')
                : require('../../../assets/icons/prev_dark.png')
            }
            style={{height: 145, width: 25, resizeMode: 'contain'}}
          />
        }>
        {params.Userphoto?.map((it, i) => (
          <Image
            source={{uri: it.image}}
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
                ? require('../../../assets/icons/back.png')
                : require('../../../assets/icons/back_dark.png')
            }
            style={{height: 40, width: 40, resizeMode: 'contain'}}
          />
        </TouchableOpacity>
        <View style={{flex: 1}} />

        <View>
          {ThemeMode.selectedTheme ? (
            <TouchableOpacity
              onPress={() => {
                Storage_permission(); /* refRBSheet.current.open(); */
              }}
              style={{alignSelf: 'flex-start'}}>
              <Image
                source={require('../../../assets/icons/download_light.png')}
                style={{height: 40, width: 40, resizeMode: 'contain'}}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => Storage_permission()}
              style={{alignSelf: 'flex-start'}}>
              <Image
                source={require('../../../assets/icons/download_dark.png')}
                style={{height: 40, width: 40, resizeMode: 'contain'}}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
      {/* <View
        style={{
          height: 80,
          width: '100%',
          backgroundColor: ThemeMode.selectedTheme ? '#fcfcfc' : '#1A1D25D9',
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          // paddingHorizontal: 20,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.18,
          shadowRadius: 1.0,

          elevation: 1,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'absolute',
          bottom: 0,
        }}
      > */}
      {/* <View style={{ marginLeft: 20 }}> */}
      {/* <TextFormatted style={{ fontSize: 14, fontWeight: '600', color: theme.colors.primaryBlack }}>Add your judgment</TextFormatted> */}
      {/* <TextFormatted style={{ fontSize: 14, fontWeight: '400', color: theme.colors.placeholder }}>85% compatibility</TextFormatted> */}
      {/* </View> */}
      {/* <View style={{ flexDirection: 'row' }}> */}
      {/* <TouchableOpacity
          style={{ marginRight: 12 }}
          onPress={() => {
            setJudge(!judge);
          }}
        >
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.linear}
            colors={
              ThemeMode.selectedTheme ? (judge ? ['#F4D968', '#E5AE6F'] : ['#fff', '#fff']) : judge ? ['#F4D968', '#E5AE6F'] : ['#1A1D25', '#1A1D25']
            }
          >
            <Image
              source={require('../../../assets/home_icons/flower.png')}
              style={{ height: 32, width: 32, resizeMode: 'contain', tintColor: judge ? '#fff' : '#8490AE' }}
            />
          </LinearGradient>
        </TouchableOpacity> */}

      {/* <TouchableOpacity
            style={{ marginRight: 12 }}
            onPress={() => {
              refRBSheet.current.open();
              setLike(true);
            }}
          >
            <LinearGradient
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.linear}
              colors={true ? ['#6ED79E', '#43B678', '#6CEB97'] : ['#fff', '#fff']}
            >
              <Image
                source={require('../../../assets/home_icons/like.png')}
                style={{ height: 26, width: 26, resizeMode: 'contain', tintColor: true ? '#fff' : '#8490AE' }}
              />
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity style={styles.bg}>
            <Image
              source={require('../../../assets/home_icons/dislike.png')}
              style={{ height: 26, width: 26, resizeMode: 'contain', tintColor: '#8490AE' }}
            />
          </TouchableOpacity> */}
      {/* </View> */}
      {/* </View> */}
      <MoreOptions refRBSheet={refRBSheet} />
      <Netinforsheet />
    </View>
  );
};

export default ViewImage;

const styles = StyleSheet.create({
  linear: {
    height: 64,
    width: 64,
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
    height: 64,
    width: 64,
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
