import {
  Image,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  View,
  Dimensions,
} from 'react-native';
import React, {useRef, useState, useEffect} from 'react';
import {theme} from '../../../utils/Constants';
import HeaderImageShadow from '../../../components/HeaderImageShadow';
import TextFormatted from '../../../components/TextFormatted';
import TextInputFormat from '../../../components/TextInputFormat';
import DropDown from '../../../components/DropDown';
import Button from '../../../components/Button';
import {Calendar} from 'react-native-calendars';
import Pagination from '../../../components/Pagination';
import RBSheet from 'react-native-raw-bottom-sheet';
import moment from 'moment';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import ImagePicker from 'react-native-image-crop-picker';
import ButtonView from '../../../components/buttonView';
import BottomSheet from '../../../components/bottomSheet';
import {useDispatch, useSelector} from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import {
  Brightness,
  Contrast,
  Saturate,
} from 'react-native-color-matrix-image-filters';
import {Slider} from '@miblanchard/react-native-slider';
import ViewShot from 'react-native-view-shot';
import {STAP} from '../../../redux/actions/ActionType';
import {Baseurl} from '../../../utils/Baseurl';
import {
  BluelightImage,
  GreenlightImage,
  PurplelightImage,
  RedlightImage,
  YellowlightImage,
} from '../../../utils/CustomImages';
import Netinforsheet from '../../../components/Netinforsheet';

const Step1 = ({navigation}) => {
  const dispatch = useDispatch();
  const dimension = useWindowDimensions();
  const ThemeMode = useSelector(state => state.Theme);
  const Staps = useSelector(state => state.Stap);
  const refRBSheet = useRef();
  const refRBSheet3 = useRef();
  const refRBSheet4 = useRef();
  const Shotref = useRef();
  const [name, setName] = useState();
  const [show, setShow] = useState(false);
  const [surname, setSurname] = useState();
  const [gender, setGender] = useState();
  const [aboutMe, setAboutMe] = useState();
  const [showMe, setShowMe] = useState();
  const [visible, setVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState();
  const [uri, setUri] = useState('');
  const [cropImg, setCropImg] = useState('');
  const [filerimg, setFilerimg] = useState();
  const [brightness, setBrightness] = useState(1);
  const [saturate, setSaturate] = useState(1);
  const [contrast, setContrast] = useState(1);
  const bight = parseFloat(brightness);
  const Satr = parseFloat(saturate);
  const contra = parseFloat(contrast);
  const [filterstate, setFilterstate] = useState(0);
  const [Loading, setLoading] = useState(false);
  const Gander_data = ['Male', 'Female', 'Other'];
  const pickImage = () => {
    launchImageLibrary({quality: 0.5}, response => {
      if (!response.didCancel) {
        setUri(response.assets[0]);
        setCropImg('');
        refRBSheet4.current.open();
      }
    });
  };
  const picCamera = () => {
    launchCamera({quality: 0.5, cameraType: 'back'}, response => {
      console.log('response', response);
      if (!response.didCancel) {
        setUri(response.assets[0]);
        setCropImg('');
        refRBSheet4.current.open();
      }
    });
  };
  const Crop_img = () => {
    ImagePicker.openCropper({
      path: uri.uri,
      width: 240,
      height: 240,
      maxFiles: 1,
      showCropFrame: false,
    }).then(image => {
      setCropImg(image.path);
    });
  };
  const Snapshot = () => {
    Shotref.current?.capture().then(uri => {
      setFilerimg(uri);
    });
  };
  async function Signup_step1() {
    try {
      setLoading(true);
      const url = Baseurl + 'signup2';
      const body = new FormData();
      body.append('user_id', Staps.id);
      body.append('image', {
        name: filerimg?.substring(
          filerimg?.lastIndexOf('/') + 1,
          filerimg?.length,
        ),
        type: uri.type,
        uri: filerimg,
      });
      body.append('user_name', name);
      body.append('surname', surname);
      body.append('dob', selectedDate);
      body.append('gender', gender);
      body.append('show_me', showMe);
      body.append('about', aboutMe);

      const res = await fetch(url, {
        method: 'post',
        headers: {
          'content-type': 'multipart/form-data',
        },
        body: body,
      });

      const rslt = await res.json();
      console.log('Api Data =>', rslt);
      if (rslt.status == 1) {
        setLoading(false);
        dispatch({type: STAP, payload: rslt.result});
        navigation.navigate('step2');
        console.log(rslt);
      } else {
        setLoading(false);
        console.log(rslt.message);
      }
    } catch (e) {
      alert('An error occured.');
      console.log(e);
    }
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: ThemeMode.selectedTheme
          ? theme.colors.primary
          : theme.colors.primaryBlack,
      }}>
      <View style={{zIndex: 0}}>
        <HeaderImageShadow>
          <Pagination
            title={'Create account'}
            subTitle={'Personal detail'}
            position={1}
          />

          <View
            style={{
              position: 'absolute',
              bottom: '10%',
              alignSelf: 'center',
            }}>
            {uri == '' ? (
              <View
                style={{
                  height: 135,
                  width: 135,
                  borderRadius: 40,
                  justifyContent: 'center',
                  alignItems: 'center',
                  alignSelf: 'center',
                  backgroundColor: '#fff',
                  marginTop: 20,
                }}>
                <TouchableOpacity onPress={() => refRBSheet3.current.open()}>
                  <Image
                    source={
                      ThemeMode.themecolr == 'Red'
                        ? RedlightImage.addPic
                        : ThemeMode.themecolr == 'Blue'
                        ? BluelightImage.addPic_blue
                        : ThemeMode.themecolr == 'Green'
                        ? GreenlightImage.addPic_green
                        : ThemeMode.themecolr == 'Purple'
                        ? PurplelightImage.addPic_purple
                        : ThemeMode.themecolr == 'Yellow'
                        ? YellowlightImage.addPic_yellow
                        : RedlightImage.addPic
                    }
                    style={{
                      height: 65,
                      width: 65,
                      resizeMode: 'contain',
                      marginLeft: 10,
                    }}
                  />
                </TouchableOpacity>
                <TextFormatted
                  style={{
                    fontSize: 12,
                    fontWeight: '600',
                    color: theme.colors.primaryBlack,
                    textAlign: 'center',
                    marginHorizontal: 20,
                    marginTop: 9,
                  }}>
                  Add profile picture
                </TextFormatted>
              </View>
            ) : (
              <View
                style={{
                  height: 147,
                  width: 147,
                  alignSelf: 'center',
                  marginTop: 20,
                }}>
                <Image
                  resizeMode="cover"
                  source={filerimg == '' ? {uri: uri.uri} : {uri: filerimg}}
                  style={{
                    height: 147,
                    width: 147,
                    alignSelf: 'center',
                    borderRadius: 40,
                  }}
                />

                <TouchableOpacity
                  style={{
                    position: 'absolute',
                    right: 0,
                    bottom: -5,
                    height: 32,
                    width: 32,
                    borderRadius: 10,
                    alignItems: 'center',
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
                    paddingVertical: 5,
                  }}
                  onPress={() => refRBSheet3.current.open()}>
                  <Image
                    source={require('../../../assets/icons/edit_pen.png')}
                    style={{height: 20, width: 20, resizeMode: 'contain'}}
                  />
                </TouchableOpacity>
              </View>
            )}
          </View>
          <BottomSheet
            //onClose={() => Snapshot()}
            closeOnPressBack={false}
            closeOnPressMask={false}
            closeOnDragDown={false}
            refRBSheet={refRBSheet4}
            height={dimension.width * 1.7}>
            {filterstate === 0 && (
              <ViewShot
                ref={Shotref}
                style={{
                  /* height: 240, width: 240, */ alignSelf: 'center',
                  marginTop: 30,
                }}
                options={{
                  fileName: 'UserProfile',
                  format: 'jpg',
                  quality: 0.9,
                }}>
                <Brightness amount={bight}>
                  <Contrast amount={contra}>
                    <Saturate amount={Satr}>
                      <Image
                        resizeMode="cover"
                        source={cropImg == '' ? {uri: uri.uri} : {uri: cropImg}}
                        style={{
                          height: 240,
                          width: 240,
                          alignSelf: 'center',
                          borderRadius: 40,
                        }}
                      />
                    </Saturate>
                  </Contrast>
                </Brightness>
              </ViewShot>
            )}

            {filterstate === 1 && (
              <View style={{marginVertical: 10, marginHorizontal: 20}}>
                <Brightness amount={bight}>
                  <Contrast amount={contra}>
                    <Saturate amount={Satr}>
                      <Image
                        resizeMode="cover"
                        source={cropImg == '' ? {uri: uri.uri} : {uri: cropImg}}
                        style={{
                          alignSelf: 'center',
                          width: 240,
                          height: 240,
                          marginVertical: 20,
                          borderRadius: 40,
                        }}
                      />
                    </Saturate>
                  </Contrast>
                </Brightness>

                <Imgfilter
                  Filtername={'Brightness'}
                  RangeValue={brightness}
                  onPress={() => setFilterstate(0)}
                  value={bight}
                  onValueChange={v => setBrightness(v)}
                />
              </View>
            )}

            {filterstate === 2 && (
              <View style={{marginVertical: 10, marginHorizontal: 20}}>
                <Brightness amount={bight}>
                  <Contrast amount={contra}>
                    <Saturate amount={Satr}>
                      <Image
                        resizeMode="cover"
                        source={cropImg == '' ? {uri: uri.uri} : {uri: cropImg}}
                        style={{
                          alignSelf: 'center',
                          width: 240,
                          height: 240,
                          marginVertical: 20,
                          borderRadius: 40,
                        }}
                      />
                    </Saturate>
                  </Contrast>
                </Brightness>

                <Imgfilter
                  Filtername={'Contrast'}
                  RangeValue={contrast}
                  onPress={() => setFilterstate(0)}
                  value={contra}
                  onValueChange={v => setContrast(v)}
                />
              </View>
            )}

            {filterstate === 3 && (
              <View style={{marginVertical: 10, marginHorizontal: 20}}>
                <Brightness amount={bight}>
                  <Contrast amount={contra}>
                    <Saturate amount={Satr}>
                      <Image
                        resizeMode="cover"
                        source={cropImg == '' ? {uri: uri.uri} : {uri: cropImg}}
                        style={{
                          alignSelf: 'center',
                          width: 240,
                          height: 240,
                          marginVertical: 20,
                          borderRadius: 40,
                        }}
                      />
                    </Saturate>
                  </Contrast>
                </Brightness>

                <Imgfilter
                  Filtername={'Saturation'}
                  RangeValue={saturate}
                  onPress={() => setFilterstate(0)}
                  value={Satr}
                  onValueChange={v => setSaturate(v)}
                />
              </View>
            )}
            {filterstate === 0 && (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                  marginTop: 40,
                }}>
                <TouchableOpacity
                  onPress={() => {
                    setFilterstate(1);
                  }}>
                  <Image
                    source={require('../../../assets/icons/brightness.png')}
                    style={{
                      height: 24,
                      width: 24,
                      resizeMode: 'contain',
                      alignSelf: 'center',
                      tintColor: ThemeMode.selectedTheme
                        ? theme.colors.darkGrey
                        : theme.colors.primary,
                    }}
                  />
                  <TextFormatted
                    style={{
                      fontSize: 14,
                      fontWeight: '600',
                      color: ThemeMode.selectedTheme
                        ? theme.colors.darkGrey
                        : theme.colors.primary,
                      marginTop: 11,
                    }}>
                    Brightness
                  </TextFormatted>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    setFilterstate(2);
                  }}>
                  <Image
                    source={require('../../../assets/icons/contrast.png')}
                    style={{
                      height: 24,
                      width: 24,
                      resizeMode: 'contain',
                      alignSelf: 'center',
                      tintColor: ThemeMode.selectedTheme
                        ? theme.colors.darkGrey
                        : theme.colors.primary,
                    }}
                  />
                  <TextFormatted
                    style={{
                      fontSize: 14,
                      fontWeight: '600',
                      color: ThemeMode.selectedTheme
                        ? theme.colors.darkGrey
                        : theme.colors.primary,
                      marginTop: 11,
                    }}>
                    Contrast
                  </TextFormatted>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setFilterstate(3);
                  }}>
                  <Image
                    source={require('../../../assets/icons/saturationIco.png')}
                    style={{
                      height: 24,
                      width: 24,
                      resizeMode: 'contain',
                      alignSelf: 'center',
                      tintColor: ThemeMode.selectedTheme
                        ? theme.colors.darkGrey
                        : theme.colors.primary,
                    }}
                  />
                  <TextFormatted
                    style={{
                      fontSize: 14,
                      fontWeight: '600',
                      color: ThemeMode.selectedTheme
                        ? theme.colors.darkGrey
                        : theme.colors.primary,
                      marginTop: 10,
                    }}>
                    Saturation
                  </TextFormatted>
                </TouchableOpacity>
              </View>
            )}

            <View
              style={{
                backgroundColor: '#8490AE',
                height: 1,
                width: dimension.width - 22,
                alignSelf: 'center',
                marginVertical: !filterstate ? 25 : 0,
              }}
            />
            <View style={{position: 'absolute', bottom: 0, width: '100%'}}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  alignSelf: 'center',
                  marginVertical: 20,
                }}>
                <TouchableOpacity
                  style={{width: dimension.width / 2 - 20, alignSelf: 'center'}}
                  onPress={() => {
                    Crop_img();
                  }}>
                  <LinearGradient
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      width: dimension.width / 2 - 20,
                      justifyContent: 'center',
                      height: 50,
                      borderRadius: 50,
                    }}
                    colors={
                      ThemeMode.selectedTheme
                        ? theme.colors.primaryOff
                        : theme.colors.blackOn
                    }>
                    <Image
                      source={require('../../../assets/icons/cropico.png')}
                      resizeMode="contain"
                      style={{
                        width: 22,
                        height: 22,
                        marginRight: 10,
                        tintColor: ThemeMode.selectedTheme
                          ? theme.colors.darkGrey
                          : theme.colors.primary,
                      }}
                    />
                    <TextFormatted
                      style={{
                        fontSize: 18,
                        fontWeight: '700',
                        color: ThemeMode.selectedTheme
                          ? theme.colors.darkGrey
                          : theme.colors.primary,
                      }}>
                      Crop
                    </TextFormatted>
                  </LinearGradient>
                </TouchableOpacity>
                <View style={{width: 10}}></View>
                <TouchableOpacity
                  onPress={() => {
                    setBstate(false);
                  }}
                  style={{
                    width: dimension.width / 2 - 20,
                    alignSelf: 'center',
                  }}>
                  <LinearGradient
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      width: dimension.width / 2 - 20,
                      justifyContent: 'center',
                      height: 50,
                      borderRadius: 50,
                    }}
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
                    }>
                    <Image
                      source={require('../../../assets/icons/edit_cio.png')}
                      resizeMode="contain"
                      style={{
                        width: 22,
                        height: 20,
                        marginRight: 10,
                        tintColor: theme.colors.primary,
                      }}
                    />
                    <TextFormatted
                      style={{
                        fontSize: 18,
                        fontWeight: '700',
                        color: theme.colors.primary,
                      }}>
                      Edit
                    </TextFormatted>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
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
                    refRBSheet4.current.close(); //refRBSheet2.current.close();
                    setFilerimg('');
                  }}>
                  Cancel
                </TextFormatted>
                <Button
                  buttonName={'Save '}
                  color={theme.colors.primary}
                  marginTop={1}
                  marginBottom={1}
                  width={dimension.width / 2 - 20}
                  onPress={() => {
                    Snapshot();
                    refRBSheet4.current.close();
                  }}
                />
              </ButtonView>
            </View>
          </BottomSheet>
        </HeaderImageShadow>
      </View>

      <ScrollView
        style={{
          zIndex: 1,
          backgroundColor: ThemeMode.selectedTheme
            ? theme.colors.primary
            : theme.colors.primaryBlack,
          position: 'absolute',
          width: dimension.width,
          alignSelf: 'center',
          height: Dimensions.get('screen').height * 0.35,
          top: '49.8%',
        }}>
        <TextInputFormat
          label={'Name'}
          labelColor={
            ThemeMode.selectedTheme
              ? theme.colors.primaryBlack
              : theme.colors.primary
          }
          placeholder={'Insert your name'}
          value={name}
          onChangeText={setName}
          containerStyle={{marginTop: 20}}
        />
        <TextInputFormat
          label={'Surname'}
          labelColor={
            ThemeMode.selectedTheme
              ? theme.colors.primaryBlack
              : theme.colors.primary
          }
          placeholder={'Insert your surname'}
          value={surname}
          onChangeText={setSurname}
          containerStyle={{marginTop: 20}}
        />
        <TextFormatted
          style={{
            fontSize: 14,
            fontWeight: '600',
            color: ThemeMode.selectedTheme
              ? theme.colors.primaryBlack
              : theme.colors.primary,
            flex: 1,
            marginLeft: 40,
            marginTop: 20,
          }}>
          Birthday date
        </TextFormatted>
        <TouchableOpacity
          onPress={() => {
            setShow(true), refRBSheet.current.open();
          }}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: ThemeMode.selectedTheme
              ? theme.colors.primary
              : theme.colors.primaryBlack,
            marginHorizontal: 20,
            borderRadius: 20,
            paddingHorizontal: 20,
            borderColor: '#EA4A5A',
            marginTop: 5,

            height: 50,
            shadowColor: '#8490ae85',
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.22,
            shadowRadius: 2.22,
            elevation: 10,
          }}>
          <TextFormatted
            style={{
              fontSize: 14,
              fontWeight: '400',
              color:
                selectedDate == null
                  ? '#8490AE'
                  : ThemeMode.selectedTheme
                  ? theme.colors.primaryBlack
                  : theme.colors.primary,
              flex: 1,
            }}>
            {selectedDate == null
              ? 'Select your birthday date'
              : moment(selectedDate).format('DD-MM-yyyy')}
          </TextFormatted>
          <Image
            source={require('../../../assets/icons/calendar.png')}
            style={{height: 20, width: 18, resizeMode: 'contain'}}
          />
        </TouchableOpacity>
        <DropDown
          label={'Gender'}
          placeholder={'Select your gender'}
          items={Gander_data}
          onSelect={(selectedItem, index) => {
            setGender(selectedItem);
          }}
          selected={gender == null ? false : true}
        />
        <DropDown
          label={'Show me'}
          placeholder={'Select what to show'}
          items={['Women', 'Men', 'Everyone']}
          onSelect={(selectedItem, index) => {
            setShowMe(selectedItem);
          }}
          selected={showMe == null ? false : true}
        />
        <TextFormatted
          style={{
            fontSize: 14,
            fontWeight: '600',
            color: ThemeMode.selectedTheme
              ? theme.colors.primaryBlack
              : theme.colors.primary,
            marginLeft: 40,
            marginTop: 20,
          }}>
          About me
        </TextFormatted>
        <View
          style={{
            height: aboutMe?.length < 38 || aboutMe == null ? 50 : 130,
            backgroundColor: ThemeMode.selectedTheme
              ? theme.colors.primary
              : theme.colors.primaryBlack,
            borderRadius: 20,
            paddingHorizontal: 20,
            marginTop: 5,
            shadowColor: '#8490ae85',
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.22,
            shadowRadius: 2.22,
            elevation: 10,
            marginHorizontal: 20,
            marginBottom: 20,
          }}>
          <TextInput
            placeholder="Briefly describe yourself"
            placeholderTextColor={'#8490AE'}
            value={aboutMe}
            onChangeText={setAboutMe}
            multiline={aboutMe?.length < 38 ? false : true}
            style={{
              flex: 1,
              fontSize: 14,
              fontFamily: 'Rubik-Regular',
              color: ThemeMode.selectedTheme
                ? theme.colors.primaryBlack
                : theme.colors.primary,
              textAlignVertical: 'top',
              paddingVertical: 16,
            }}
          />
        </View>
      </ScrollView>
      <View style={{position: 'absolute', bottom: 0, width: '100%'}}>
        <ButtonView>
          <Bottom
            visible={visible}
            setVisible={setVisible}
            refRBSheet={refRBSheet}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          />

          <Button
            opacity={
              !uri ||
              !name ||
              !surname ||
              !selectedDate ||
              !gender ||
              !showMe ||
              !aboutMe
                ? 0.5
                : 1
            }
            buttonName={'Next'}
            color={'#fff'}
            onPress={() => Signup_step1()}
            loading={Loading}
            marginBottom={1}
            disabled={
              !uri ||
              !name ||
              !surname ||
              !selectedDate ||
              !gender ||
              !showMe ||
              !aboutMe
                ? true
                : false
            }
            marginTop={1}
          />

          <Option
            refRBSheet={refRBSheet3}
            onPress={() => {
              picCamera();
              refRBSheet3.current.close();
            }}
            onPress1={() => {
              pickImage();
              refRBSheet3.current.close();
            }}
          />
        </ButtonView>
      </View>
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

const Bottom = ({refRBSheet, selectedDate, setSelectedDate}) => {
  const [refresh, setRefresh] = useState(true);
  const dimension = useWindowDimensions();
  const ThemeMode = useSelector(state => state.Theme);
  useEffect(() => {
    if (!refresh) {
      setTimeout(() => {
        setRefresh(true);
      }, 10);
    }
  }, [refresh]);
  const months = moment.months(new Date());

  function getyears() {
    var currentYear = new Date().getFullYear() - 18,
      years = [];
    let startYear = new Date().getFullYear() - 70;
    while (startYear <= currentYear) {
      years.push(startYear++);
    }
    return years;
  }

  return (
    <RBSheet
      ref={refRBSheet}
      height={dimension.height - 100}
      openDuration={250}
      customStyles={{
        container: {
          borderTopRightRadius: 40,
          borderTopLeftRadius: 40,
          backgroundColor: ThemeMode.selectedTheme
            ? theme.colors.primary
            : theme.colors.primaryBlack,
        },
      }}>
      <ScrollView>
        <View
          style={{
            height: 4,
            width: 36,
            borderRadius: 20,
            backgroundColor: '#8490AE',
            alignSelf: 'center',
            marginTop: 10,
          }}
        />
        <TextFormatted
          style={{
            fontSize: 14,
            fontWeight: '300',
            color: ThemeMode.selectedTheme
              ? theme.colors.primaryBlack
              : theme.colors.primary,
            alignSelf: 'center',
            marginTop: 30,
          }}>
          Select your birthday date
        </TextFormatted>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            alignSelf: 'center',
            marginTop: 30,
          }}>
          <DropDown
            width={dimension.width / 2 - 30}
            label={'Month'}
            marginLeft={20}
            placeholder={months[moment(selectedDate).month()]}
            onSelect={(selectedItem, index) => {
              setSelectedDate(v =>
                moment(v).set('month', index).format('yyyy-MM-DD'),
              );
              setRefresh(false);
            }}
            top={1}
            items={months}
          />
          <View style={{width: 20}} />
          <DropDown
            width={dimension.width / 2 - 30}
            label={'Year'}
            marginLeft={20}
            placeholder={new Date().getFullYear() - 18}
            top={1}
            onSelect={(selectedItem, index) => {
              setSelectedDate(v =>
                moment(v)
                  .set('year', parseInt(selectedItem))
                  .format('yyyy-MM-DD'),
              );
              setRefresh(false);
            }}
            items={getyears()}
          />
        </View>

        {refresh && (
          <Calendar
            theme={{
              calendarBackground: ThemeMode.selectedTheme
                ? theme.colors.primary
                : theme.colors.primaryBlack,
            }}
            current={moment(selectedDate).format('yyyy-MM-DD')}
            minDate={'1900-01-01'}
            onDayPress={day => {
              setSelectedDate(
                moment(
                  day.timestamp + new Date().getTimezoneOffset() * 60 * 1000,
                ).format('yyyy-MM-DD'),
              );
            }}
            markedDates={{
              [moment(selectedDate).format('yyyy-MM-DD')]: {
                selected: true,
                disableTouchEvent: true,
                selectedColor:
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
              },
            }}
            style={{
              marginHorizontal: 20,
              marginVertical: 15,
            }}
            customHeaderTitle
            hideDayNames={true}
            disableMonthChange={true}
            hideArrows
          />
        )}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 20,
            height: 100,
            width: dimension.width,
            backgroundColor: ThemeMode.selectedTheme
              ? theme.colors.primary
              : theme.colors.primaryBlack,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
          }}>
          <TextFormatted
            style={{
              fontSize: 18,
              fontWeight: '700',
              color: '#8490AE',
              width: dimension.width / 2 - 20,
              textAlign: 'center',
            }}
            onPress={() => refRBSheet.current.close()}>
            Cancel
          </TextFormatted>
          <Button
            buttonName={'Select'}
            color={'#fff'}
            marginTop={1}
            width={dimension.width / 2 - 20}
            onPress={() => refRBSheet.current.close()}
          />
        </View>
      </ScrollView>
    </RBSheet>
  );
};

const Imgfilter = ({onValueChange, value, RangeValue, onPress, Filtername}) => {
  const ThemeMode = useSelector(state => state.Theme);
  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginVertical: 10,
        }}>
        <TouchableOpacity
          onPress={onPress}
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
          }}>
          <Image
            resizeMode="contain"
            source={require('../../../assets/icons/sheet_arrow.png')}
            style={{
              height: 12,
              width: 12,
              tintColor: ThemeMode.selectedTheme
                ? theme.colors.Black
                : theme.colors.primary,
              marginRight: 8,
            }}
          />
          <TextFormatted
            style={{
              fontSize: 14,
              fontWeight: '600',
              color: ThemeMode.selectedTheme
                ? theme.colors.Black
                : theme.colors.primary,
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            {Filtername}
          </TextFormatted>
        </TouchableOpacity>
        <TextFormatted
          style={{
            color:
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
            fontSize: 14,
            fontWeight: '600',
          }}>
          +{parseFloat(RangeValue).toFixed(0)}
        </TextFormatted>
      </View>
      <Slider
        value={value}
        onValueChange={onValueChange}
        minimumValue={0}
        maximumValue={10}
        containerStyle={{height: 50}}
        trackStyle={{height: 6, borderRadius: 10}}
        minimumTrackTintColor={
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
        maximumTrackTintColor={theme.colors.softGrey}
        renderThumbComponent={() => (
          <Image
            source={
              ThemeMode.themecolr == 'Red'
                ? RedlightImage.sliderImager
                : ThemeMode.themecolr == 'Blue'
                ? BluelightImage.sliderImage_bluer
                : ThemeMode.themecolr == 'Green'
                ? GreenlightImage.sliderImage_green
                : ThemeMode.themecolr == 'Purple'
                ? PurplelightImage.sliderImage_purple
                : ThemeMode.themecolr == 'Yellow'
                ? YellowlightImage.sliderImage_yellow
                : RedlightImage.sliderImager
            }
            style={{height: 34, width: 34, resizeMode: 'contain'}}
          />
        )}
      />
    </View>
  );
};
export default Step1;
const styles = StyleSheet.create({});
