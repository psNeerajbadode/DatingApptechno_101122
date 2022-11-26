import {
  Image,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {theme} from '../../../utils/Constants';
import {useDispatch, useSelector} from 'react-redux';
import Video from 'react-native-video';
import Statusbar from '../../../components/Statusbar';

const PlayVideo = () => {
  const navigation = useNavigation();
  const dimension = useWindowDimensions();
  const ThemeMode = useSelector(state => state.Theme);
  const {params = {}} = useRoute();
  const [nextvideo, setnextvideo] = useState(false);
  const [naviVideo, setNaviVideo] = useState(false);
  const [videof, setVideof] = useState(false);
  useEffect(() => {
    navigation.addListener('focus', () => setNaviVideo(true));
  }, []);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: ThemeMode.selectedTheme
          ? theme.colors.primary
          : theme.colors.primaryBlack,
      }}>
      <Statusbar hidden={true} />
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            setVideof(!videof);
          }}
          style={{
            alignSelf: 'center',
            justifyContent: 'center',
          }}>
          {!videof && (
            <Image
              source={require('../../../assets/icons/Video_play_d.png')}
              resizeMode="contain"
              style={{
                width: 85,
                height: 85,
                zIndex: 1,
                position: 'absolute',
                top: '50%',
                alignSelf: 'center',
              }}
            />
          )}
          <Video
            source={{uri: params?.data}}
            playInBackground={false}
            playWhenInactive={false}
            onLoadStart={() => {
              setnextvideo(params?.data);
              setNaviVideo(true);
              setVideof(true);
            }}
            poster={
              'https://technorizen.com/Dating/uploads/images/video_loader344.png'
            }
            posterResizeMode="cover"
            repeat={true}
            resizeMode="cover"
            paused={
              nextvideo == params?.data && naviVideo && videof ? false : true
            }
            style={{
              height: dimension.height,
              width: dimension.width,
              zIndex: 0,
            }}
          />
        </TouchableOpacity>
      </View>

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
        {params.data == null && (
          <TouchableOpacity style={{alignSelf: 'flex-start'}}>
            <Image
              source={
                ThemeMode.selectedTheme
                  ? require('../../../assets/icons/menus.png')
                  : require('../../../assets/icons/menù_dark.png')
              }
              style={{height: 40, width: 40, resizeMode: 'contain'}}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default PlayVideo;

const styles = StyleSheet.create({});
