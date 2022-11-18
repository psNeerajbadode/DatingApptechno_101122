import {
  FlatList,
  Image,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  View,
  SafeAreaView,
  AppState,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Swiper from 'react-native-swiper';
import TextFormatted from '../../components/TextFormatted';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import Notification from './notification';
import MoreOptions from './moreOptions';
import SelectCategory from './selectCategory';
import {useSelector} from 'react-redux';
import {theme} from '../../utils/Constants';
import * as Animatable from 'react-native-animatable';
import Pulse from 'react-native-pulse';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';
import ActivityLoader from '../../components/ActivityLoader';
import FastImage from 'react-native-fast-image';
import {ShowToast} from '../../utils/Baseurl';
import Statusbar from '../../components/Statusbar';
import Netinforsheet from '../../components/Netinforsheet';
// import VideoPlayer from 'react-native-video-controls';
import Video from 'react-native-video';
import VideoPlayer from 'react-native-video-player';
const HomePage = () => {
  const ThemeMode = useSelector(state => state.Theme);
  const Staps = useSelector(state => state.Stap);
  const navigation = useNavigation();
  const refRBSheet = useRef();
  const refRBSheet1 = useRef();
  const refRBSheet2 = useRef();
  const refliky_amy = useRef();
  const userRef = useRef();
  const PluseRef = useRef();
  const refRBSheetB = useRef();
  const dimension = useWindowDimensions();
  const [plu_button, setplu_button] = useState(false);
  const [Videoplay, setVideoplay] = useState(false);
  const [Loading, setLoading] = useState(false);
  const [Userpost, setUserpost] = useState();
  const [Uindex, setUindex] = useState();
  const [ChangeIndex, setChangeIndex] = useState();
  const [appStatus, setappStatus] = useState(AppState.currentState);
  const [plandata, setPlandata] = useState();
  const [profile, setProfile] = useState();
  const focus = useIsFocused();
  const [swiperIndex, setSwiperIndex] = useState();

  const videoRef = useRef(null);
  const onBuffer = (e)=>{
console.log("onBuffer",e);
  }

  const onError = (e)=>{
    console.log("onError",e);
      }
  const Userimage = [
    {
      img: require('../../assets/images/unsplash_1.png'),
    },
    {
      img: require('../../assets/images/unsplash_2.png'),
    },
    {
      img: require('../../assets/images/unsplash_1.png'),
    },
  ];
  const data = [
    {
      username: 'Sofia Dickens',
      timing: '28 years old',
      userprofile: require('../../assets/images/profile.png'),
      image: [
        {
          img: require('../../assets/images/unsplash_1.png'),
        },
        {
          img: require('../../assets/images/unsplash_2.png'),
        },
        {
          img: require('../../assets/images/unsplash_1.png'),
        },
      ],
    },
    {
      username: 'Emma Hatchan',
      timing: '23 years old',
      userprofile: require('../../assets/images/profile2.png'),
      image: [
        {
          img: require('../../assets/images/unsplash_2.png'),
        },
        {
          img: require('../../assets/images/unsplash_1.png'),
        },
      ],
    },
    {
      username: 'Emma Hatchan',
      timing: '25 years old',
      userprofile: require('../../assets/images/profile.png'),
      image: [
        {
          img: require('../../assets/images/unsplash_1.png'),
        },
        {
          img: require('../../assets/images/unsplash_2.png'),
        },
      ],
    },
    {
      username: 'Emma Hatchan',
      timing: '26 years old',
      userprofile: require('../../assets/images/profile2.png'),
      image: [
        {
          img: require('../../assets/images/unsplash_2.png'),
        },
        {
          img: require('../../assets/images/unsplash_1.png'),
        },
      ],
    },
    {
      username: 'Sofia Dickens',
      timing: '28 years old',
      userprofile: require('../../assets/images/profile.png'),
      image: [
        {
          img: require('../../assets/images/unsplash_1.png'),
        },
        {
          img: require('../../assets/images/unsplash_2.png'),
        },
        {
          img: require('../../assets/images/unsplash_1.png'),
        },
      ],
    },
    {
      username: 'Sofia Dickens',
      timing: '28 years old',
      userprofile: require('../../assets/images/profile.png'),
      image: [
        {
          img: require('../../assets/images/unsplash_1.png'),
        },
        {
          img: require('../../assets/images/unsplash_2.png'),
        },
        {
          img: require('../../assets/images/unsplash_1.png'),
        },
      ],
    },
  ];
  function UserScroll() {
    if (Userpost.length == ChangeIndex + 1) {
      setplu_button(false);
      ShowToast('User List End');
    } else {
      setplu_button(true);
      setTimeout(() => {
      setChangeIndex(ChangeIndex + 1);
      userRef.current.scrollToIndex({index: ChangeIndex + 1});
       }, 800);
    }
  }
  const onViewableItemsChanged = React.useRef(item => {
    //console.log('item.viewableItems', item.viewableItems[0]);
    setChangeIndex(item?.viewableItems[0]?.index);
    setUindex(item?.viewableItems[0]?.key);
  }, []);

  const getUserPost = () => {
    axios({
      method: 'post',
      url:
        'https://technorizen.com/Dating/webservice/getallUserPostData?user_id=' +
        Staps.id,
    }).then(response => {
      setUserpost(response.data.result);
      //  console.log(response.data.result[0]);
    });
  };

  const likeApi = () => {
    try {
      axios({
        url:
          'https://technorizen.com/Dating/webservice/user_like?user_id=' +
          Staps.id +
          '&&' +
          'other_user_id=' +
          Uindex,
        method: 'POST',
      })
        .then(function (response) {
          if (response.data.status == 0) {
            ShowToast(response.data.message /* + ' ' + 'successfully' */);
          }
        })
        .catch(function (error) {
          console.log('catch', error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  async function status(status) {
    try {
      const url =
        'https://technorizen.com/Dating/webservice/update_online_status';

      const body = new FormData();
      body.append('user_id', Staps.id);
      body.append('status', status);

      const res = await fetch(url, {
        method: 'POST',
        body: body,
        headers: {
          'content-type': 'multipart/form-data',
        },
      });
      const rslt = await res.json();
      if (rslt.status == 1) {
        // console.log('status', status);
        setappStatus(status);
      }

      // alert(status);
    } catch (e) {}
  }

  const handlePutAppToBackground = state => {
    status('ONLINE');
    if (
      (Platform.OS == 'android' && state == 'background') ||
      (Platform.OS == 'ios' && state == 'inactive')
    )
      status('OFFLINE');
    else if (state == 'active') status('ONLINE');
  };

  const calculate_age = dob1 => {
    var today = new Date();
    var birthDate = new Date(dob1); // create a date object directly from `dob1` argument
    var age_now = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age_now--;
    }
    // console.log(age_now);
    return age_now;
  };
  const getPlanData = () => {
    axios({
      method: 'get',
      url: `https://technorizen.com/Dating/webservice/get_plans`,
    }).then(response => {
      //console.log('setPlandata=>', response.data.result);
      setPlandata(response.data.result);
    });
  };

  const getUserProfile = () => {
    axios({
      method: 'post',
      url:
        `https://technorizen.com/Dating/webservice/get_profile?user_id=` +
        Staps.id,
    }).then(response => {
      console.log('setProfile=>', response.data.result);
      setProfile(response.data.result);
    });
  };

  function UserCondition() {
    if (Staps.Plan_Name == 'Basic' && profile.like_unlike_count <= '300') {
      likeApi(Uindex);
      UserScroll();
    } else if (
      Staps.Plan_Name == 'Pro' &&
      profile.like_unlike_count <= '1000'
    ) {
      likeApi(Uindex);
      UserScroll();
    } else if (
      Staps.Plan_Name == 'Elite' &&
      profile.like_unlike_count <= '5000'
    ) {
      likeApi(Uindex);
      UserScroll();
    } else {
      ShowToast('Upgrade Your Plan');
    }
  }
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
          Uindex,
        method: 'POST',
      })
        .then(function (response) {
         // console.log('Block API=>', JSON.stringify(response.data.message));
          if (response.data.status == 1) {
            refRBSheet2.current.close();
            refRBSheet.current.close();  
            getUserPost();       
            ShowToast(response.data.message);           
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
   
    getUserPost();
    getPlanData();
    getUserProfile();
    status('ONLINE');
    const appStateListener = AppState.addEventListener(
      'change',
      handlePutAppToBackground,
    );
    return () => {
      appStateListener?.remove();
      return status('OFFLINE');
    };
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: ThemeMode.selectedTheme
          ? theme.colors.primary
          : theme.colors.primaryBlack,
      }}>
      <SafeAreaView>
        <Statusbar
          translucent={true}
          backgroundColor="transparent"
          barStyle={'light-content'}
          hidden={true}
        />
      </SafeAreaView>

      {Loading ? (
        <View
          style={{
            flex: 1,
            backgroundColor: ThemeMode.selectedTheme
              ? theme.colors.primary
              : theme.colors.primaryBlack,
            justifyContent: 'center',
          }}>
          <ActivityLoader />
        </View>
      ) : (
        <View
          style={{
            flex: 1,
            backgroundColor: ThemeMode.selectedTheme
              ? theme.colors.primary
              : theme.colors.primaryBlack,
          }}>
            <View  style={{width:dimension.width,height:dimension.height}}>
              <FlatList
                data={Userpost} 
                //style={{width:dimension.width,height:dimension.height}}
                initialScrollIndex={ChangeIndex}
                onScroll={() => setplu_button(false)}
                onViewableItemsChanged={onViewableItemsChanged.current}
                pagingEnabled={true}
                ref={userRef}
                renderItem={({item, i}) => (
                  <View>
                    {item.block_user == 'unblock' && (
                      <View
                        style={{
                          flex: 1,
                          height: dimension.height,
                        
                        }}>
                        <Swiper
                          loop={false}
                          showsButtons={true}
                          showsPagination={false}
                          onIndexChanged={index=>setSwiperIndex(index)}
                          buttonWrapperStyle={{paddingHorizontal: 0}}
                          nextButton={
                            <Image
                              source={
                                ThemeMode.selectedTheme
                                  ? require('../../assets/icons/P_sidebar.png')
                                  : require('../../assets/icons/next_dark.png')
                              }
                              style={{
                                height: 145,
                                width: 25,
                                resizeMode: 'contain',
                              }}
                            />
                          }
                          prevButton={
                            <Image
                              source={
                                ThemeMode.selectedTheme
                                  ? require('../../assets/icons/N_sidebar.png')
                                  : require('../../assets/icons/prev_dark.png')
                              }
                              style={{
                                height: 145,
                                width: 25,
                                resizeMode: 'contain',
                              }}
                            />
                          }>
                          {item.details?.map(
                            (v, i) =>
                              v.type == 'Image' ? (
                                <View
                                  // style={{                              
                                  //   height:
                                  //     dimension.height /*  + StatusBar.currentHeight */,
                                  //   width: dimension.width,
                                  // }}
                                  >
                                  <FastImage
                                    onProgress={() => <ActivityLoader />}
                                    source={{
                                      uri: v?.image,
                                      priority: FastImage.priority.normal,
                                    }}
                                    resizeMode={FastImage.resizeMode.cover}
                                    style={{
                                      height: dimension.height /*  + StatusBar.currentHeight */,
                                      width: dimension.width,
                                    }}
                                  />
                                </View>
                              ): (
                                v.type == 'Video'  &&
                              //   <VideoPlayer   
                              //   onPlay={()=> setVideoplay(true)}           
                                          
                              //   disableFullscreen={false}                            
                              //   disableBack={true}
                              //   disableVolume={true}
                              //   tapAnywhereToPause={true}
                              //    disableSeekbar={true}
                              //   source={{uri: v?.image}}
                              //   onShowControls={true}
                              //   disableTimer={true}
                              //   disablePlayPause={true}                        
                              // />
                          //     <VideoPlayer
                          //     video={{ uri: v?.image }}
                          //     pause={true}               
                          //     resizeMode={'cover'}
                          //     thumbnail={{ uri: v?.image}}
                          //     style={{ height: dimension.height ,
                          //     width: dimension.width,}}
                          //     disableSeek={true}
                          //     bufferConfig={{minBufferMs:1000,maxBufferMs:2000}}
                          //     pauseOnPress
                          // />
                          <Video source={{uri: v?.image}}   
                          playInBackground={false}                        
                          ref={videoRef}    
                          bufferConfig={{
                            minBufferMs: 15000,
                            maxBufferMs: 50000,
                            bufferForPlaybackMs: 2500,
                            bufferForPlaybackAfterRebufferMs: 5000
                          }}                                 
                          onBuffer={onBuffer}               
                          onError={onError}    
                          repeat
                          
                          paused={ /* swiperIndex == i ? false :  */true}
                          style={{ height: dimension.height ,
                                width: dimension.width,}}
                          /> ),
                          <TextFormatted style={{backgroundColor:'#f00',fontSize:30,position:'absolute',width:'100%',top:'50%'}}>{swiperIndex + " " + i}</TextFormatted>
                          )}
                        </Swiper>
                        <View
                          style={{
                            position: 'absolute',
                            top: 44,
                            marginHorizontal: 20,
                            flexDirection: 'row',
                            alignItems: 'center',
                          }}>
                          <TouchableOpacity
                            onPress={() =>
                              navigation.navigate('userProfile', item?.id)
                            }>
                            <Image
                              source={{
                                uri: item?.image,
                              }}
                              style={{
                                height: 56,
                                width: 56,
                                resizeMode: 'cover',
                                borderRadius: 50,
                                borderWidth: 3,
                                // backgroundColor: '#ff0',
                                borderColor: theme.colors.darkGrey,
                              }}
                            />
                          </TouchableOpacity>
                          <View style={{marginLeft: 8, flex: 1}}>
                            <TextFormatted
                              style={{
                                fontSize: 16,
                                fontWeight: '700',
                                color: '#fff',
                              }}>
                              {item?.user_name + ' ' + item?.surname}
                            </TextFormatted>
                            <TextFormatted
                              style={{
                                fontSize: 12,
                                fontWeight: '400',
                                color: '#fff',
                              }}>
                              {calculate_age(item.dob)} years old
                            </TextFormatted>
                          </View>
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
                              marginRight: 10,
                            }}
                            onPress={() => refRBSheet1.current.open()}>
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
                              /*  opacity:0 */
                              }}
                            />
                            <Image
                              source={require('../../assets/icons/Notifyy.png')}
                              style={{height: 25, width: 25, resizeMode: 'contain'}}
                            />
                          </TouchableOpacity>
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
                        </View>
                      </View>
                    )}
                  </View>
                )}
              />
            </View>
        </View>
      )}

      <ImageBackground
        resizeMode="contain"
        source={
          ThemeMode.selectedTheme
            ? require('../../assets/images/Tab_bg1.png')
            : require('../../assets/images/dar_home.png')
        }
        style={{
          height: 65,
          width: '100%',
          position: 'absolute',
          bottom: 0,
          borderTopLeftRadius: 40,
          borderTopRightRadius: 40,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-around',
        }}>
        <Tab
          currentTab={true}
          source={require('../../assets/home_icons/home.png')}
        />
        <Tab source={require('../../assets/home_icons/focus.png')} />
        <Tab
          onPress={() => {
            UserCondition();
          }}
          Animatable={
            <View>
              {plu_button == true && (
                <Pulse
                  ref={PluseRef}
                  color={
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
                      : theme.colors.red
                  }
                  diameter={80}
                />
              )}
              <Animatable.Image
                source={
                  ThemeMode.selectedTheme
                    ? require('../../assets/icons/like_dark2.png')
                    : require('../../assets/icons/like_dark.png')
                }
                // animation="fadeInUp"
                ref={refliky_amy}
                //duration={2000}
                // iterationCount={1}
                style={{
                  height: ThemeMode.selectedTheme ? 70 : 105,
                  width: ThemeMode.selectedTheme ? 70 : 105,
                  resizeMode: 'contain',
                }}
                // easing={'ease-in-circ'}
              ></Animatable.Image>
            </View>
          }
        />

        <Tab
          source={require('../../assets/icons/colormssg.png')}
          onPress={() => navigation.navigate('chatList')}></Tab>

        <Tab
          source={require('../../assets/home_icons/profile.png')}
          onPress={() => navigation.navigate('myProfile')}
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
          width: '34%',
          position: 'absolute',
          bottom: 0,
        }}></View>

      <Notification  refRBSheet={refRBSheet1} />
      <MoreOptions
        Block_onPress={() => block_user_Api()}
        refRBSheet2={refRBSheetB}
        BlockID={Uindex}
        UserID={Staps.id}
        refRBSheet={refRBSheet}
        Block_Loading={Loading}
      />
      <SelectCategory refRBSheet={refRBSheet2} />
      <Netinforsheet />
    </View>
  );
};

const Tab = ({
  disabled,
  onPress,
  source,
  currentTab,
  style,
  Animatable,
  onLongPress,
  activePoint,
}) => {
  const dimension = useWindowDimensions();
  const ThemeMode = useSelector(state => state.Theme);
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      onLongPress={onLongPress}
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
        {Animatable}
        {activePoint}
        <Image
          source={source}
          style={
            style || {
              height: 27,
              width: 27,
              resizeMode: 'contain',
              opacity: currentTab ? 1 : 0.5,
              marginTop: 15,
              marginBottom: 5,
            }
          }
        />
        <View
          style={{
            width: '50%',
            borderRadius: 5,
            borderWidth: 1.5,
            borderColor:
              currentTab == true
                ? ThemeMode.themecolr == 'Red'
                  ? theme.colors.red
                  : ThemeMode.themecolr == 'Blue'
                  ? theme.colors.Blue
                  : ThemeMode.themecolr == 'Green'
                  ? theme.colors.Green
                  : ThemeMode.themecolr == 'Purple'
                  ? theme.colors.Purple
                  : ThemeMode.themecolr == 'Yellow'
                  ? theme.colors.Yellow
                  : theme.colors.red
                : 'transparent',
          }}></View>
      </View>
    </TouchableOpacity>
  );
};
export default HomePage;

const styles = StyleSheet.create({});
