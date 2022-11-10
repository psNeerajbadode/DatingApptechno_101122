import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useRef, useState} from 'react';
import {useRoute} from '@react-navigation/native';
import {theme} from '../../../utils/Constants';
import VideoPlayer from 'react-native-video-controls';
import {useDispatch, useSelector} from 'react-redux';

const PlayVideo = ({navigation}) => {
  const dispatch = useDispatch();
  const ThemeMode = useSelector(state => state.Theme);
  const {params = {}} = useRoute();
  const videoRef = useRef();
  const [push, setPuse] = useState();
  const [play, setPlay] = useState(false);
  const [show, setShow] = useState(false);
  const [judge, setJudge] = useState(false);
  console.log(params.data);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: ThemeMode.selectedTheme
          ? theme.colors.primary
          : theme.colors.primaryBlack,
      }}>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <VideoPlayer
          ref={videoRef}
          disableFullscreen={false}
          disableSeekbar={false}
          disableBack={true}
          disableVolume={true}
          tapAnywhereToPause={() => setPuse((v = !v))}
          // onPause={true}
          // onPlay={true}
          source={{uri: params.data}}
          onShowControls={true}
          seekColor={'#F27380'}
          toggleResizeModeOnFullscreen={true}
        />
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
