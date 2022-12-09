import {
  Image,
  ImageBackground,
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import HeaderImage_1 from '../../components/HeaderImage_1';
import Header from '../../components/Header';
import TextFormatted from '../../components/TextFormatted';
import {theme} from '../../utils/Constants';
import TextInputFormat from '../../components/TextInputFormat';
import ButtonView from '../../components/buttonView';
import Button from '../../components/Button';
// import Carousel from 'react-native-snap-carousel';
import Carousel from 'react-native-snap-carousel-v4';
import AddNewCard from './profileComponent/addNewCard';
import EditCard from './profileComponent/editCard';
import RBSheet from 'react-native-raw-bottom-sheet';
import {useSelector} from 'react-redux';
import {
  BluelightImage,
  GreenlightImage,
  PurplelightImage,
  RedlightImage,
  YellowlightImage,
} from '../../utils/CustomImages';
import Netinforsheet from '../../components/Netinforsheet';
import {STAP} from '../../redux/actions/ActionType';
const Security = () => {
  const ThemeMode = useSelector(state => state.Theme);
  const Staps = useSelector(state => state.Stap);
  const [biometric, setBiometric] = useState(false);
  const refRBSheet = useRef();
  const refRBSheet1 = useRef();
  const refRBSheet2 = useRef();
  const refRBSheet3 = useRef();

  const [oldPassword, setOldPassword] = useState();
  const [newPassword, setNewPassword] = useState();
  const [repeatPassword, setRepeatPassword] = useState();
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const dimension = useWindowDimensions();
  const [autoMonthlyPayment, setAutoMonthlyPayment] = useState(false);

  const validPass = pass => {
    return String(pass).match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/);
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: ThemeMode.selectedTheme
          ? theme.colors.primary
          : theme.colors.primaryBlack,
      }}>
      <HeaderImage_1 height={155}>
        <Header marginTop={20} title={'Security'} />
      </HeaderImage_1>
      <ScrollView>
        <ButtonRow
          title={'Change passcode'}
          onPress={() => refRBSheet.current.open()}
        />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginLeft: 20,
            marginTop: 10,
            marginRight: 20,
            marginBottom: 10,
          }}>
          <TextFormatted
            style={{
              fontSize: 14,
              fontWeight: '600',
              color: ThemeMode.selectedTheme
                ? theme.colors.primaryBlack
                : theme.colors.primary,
              flex: 1,
            }}>
            Sign in with biometrics
          </TextFormatted>
          <View style={{width: 20}} />
          <TouchableOpacity
            style={{
              alignItems: 'center',
              alignSelf: 'center',
              padding: 2,
            }}
            onPress={() => setBiometric(!biometric)}>
            <Image
              resizeMode="contain"
              style={{width: 58, height: 33}}
              source={
                ThemeMode.themecolr == 'Red'
                  ? biometric
                    ? RedlightImage.On_switchs
                    : RedlightImage.Off_switchs
                  : ThemeMode.themecolr == 'Blue'
                  ? biometric
                    ? BluelightImage.On_switchs_blue
                    : BluelightImage.Off_switchs_blue
                  : ThemeMode.themecolr == 'Green'
                  ? biometric
                    ? GreenlightImage.On_switchs_green
                    : GreenlightImage.Off_switchs_green
                  : ThemeMode.themecolr == 'Purple'
                  ? biometric
                    ? PurplelightImage.On_switchs_purplle
                    : PurplelightImage.Off_switchs_purplle
                  : ThemeMode.themecolr == 'Yellow'
                  ? biometric
                    ? YellowlightImage.On_switchs_yellow
                    : YellowlightImage.Off_switchs_yellow
                  : biometric
                  ? RedlightImage.On_switchs
                  : RedlightImage.Off_switchs
              }
            />
          </TouchableOpacity>
        </View>
        <ButtonRow
          title={'Manage payments account'}
          onPress={() => refRBSheet1.current.open()}
        />

        <RBSheet
          ref={refRBSheet}
          closeOnDragDown={true}
          height={450}
          closeOnPressBack={true}
          dragFromTopOnly
          customStyles={{
            wrapper: {},
            draggableIcon: {backgroundColor: '#8490AE'},
            container: {
              borderTopLeftRadius: 40,
              borderTopRightRadius: 40,
              backgroundColor: ThemeMode.selectedTheme
                ? theme.colors.primary
                : theme.colors.primaryBlack,
            },
          }}>
          <StatusBar backgroundColor={'#00000077'} />
          <ScrollView keyboardShouldPersistTaps="handled">
            <TextInputFormat
              label={'Old password'}
              onChangeText={setOldPassword}
              value={oldPassword}
              labelColor={
                // oldPassword == '' || (oldPassword != null && !validPass(oldPassword))
                //   ? '#EA4A5A'
                ThemeMode.selectedTheme
                  ? theme.colors.primaryBlack
                  : theme.colors.primary
              }
              borderWidth={
                oldPassword == '' ||
                (oldPassword != null && !validPass(oldPassword))
                  ? 1
                  : 0
              }
              placeholder={'Insert your old password'}
              right={
                <TouchableOpacity onPress={() => setShow(!show)}>
                  <Image
                    resizeMode="contain"
                    source={
                      show
                        ? require('../../assets/icons/eyehide.png')
                        : require('../../assets/icons/eyeshow.png')
                    }
                    style={{
                      height: 22,
                      width: 22,
                      tintColor: theme.colors.darkGrey,
                      marginLeft: 10,
                    }}
                  />
                </TouchableOpacity>
              }
              secureTextEntry={show ? false : true}
              showMess={
                oldPassword == '' ||
                (oldPassword != null && !validPass(oldPassword))
                  ? true
                  : false
              }
              mess={
                'Password should be minimum 8 digits length with 1 Uppercase and 1 number'
              }
              containerStyle={{marginTop: 20}}
            />
            <TextInputFormat
              label={'New password'}
              onChangeText={setNewPassword}
              value={newPassword}
              placeholder={'Insert your new password'}
              labelColor={
                // oldPassword == '' || (oldPassword != null && !validPass(oldPassword))
                //   ? '#EA4A5A'
                ThemeMode.selectedTheme
                  ? theme.colors.primaryBlack
                  : theme.colors.primary
              }
              borderWidth={
                newPassword == '' ||
                (newPassword != null && !validPass(newPassword))
                  ? 1
                  : 0
              }
              right={
                <TouchableOpacity onPress={() => setShow1(!show1)}>
                  <Image
                    resizeMode="contain"
                    source={
                      show1
                        ? require('../../assets/icons/eyehide.png')
                        : require('../../assets/icons/eyeshow.png')
                    }
                    style={{
                      height: 22,
                      width: 22,
                      tintColor: theme.colors.darkGrey,
                      marginLeft: 10,
                    }}
                  />
                </TouchableOpacity>
              }
              secureTextEntry={show1 ? false : true}
              containerStyle={{marginTop: 20}}
              showMess={
                newPassword == '' ||
                (newPassword != null && !validPass(newPassword))
                  ? true
                  : false
              }
              mess={
                'Password should be minimum 8 digits length with 1 Uppercase and 1 number'
              }
            />
            <TextInputFormat
              label={'Repeat password'}
              onChangeText={setRepeatPassword}
              value={repeatPassword}
              placeholder={'Repeat your new password'}
              labelColor={
                // repeatPassword == '' || (repeatPassword != null && !validPass(repeatPassword))
                //   ? '#EA4A5A'
                ThemeMode.selectedTheme
                  ? theme.colors.primaryBlack
                  : theme.colors.primary
              }
              borderWidth={newPassword == repeatPassword ? 0 : 1}
              right={
                <TouchableOpacity onPress={() => setShow2(!show2)}>
                  <Image
                    resizeMode="contain"
                    source={
                      show2
                        ? require('../../assets/icons/eyehide.png')
                        : require('../../assets/icons/eyeshow.png')
                    }
                    style={{
                      height: 22,
                      width: 22,
                      tintColor: theme.colors.darkGrey,
                      marginLeft: 10,
                    }}
                  />
                </TouchableOpacity>
              }
              secureTextEntry={show2 ? false : true}
              containerStyle={{marginTop: 20}}
              showMess={newPassword == repeatPassword ? false : true}
              // mess={'Password should be minimum 8 digits length with 1 Uppercase and 1 number'}
              mess={
                'password is matching the expectation but its not the same as the above password'
              }
            />
            <View style={{height: 20}} />
          </ScrollView>
          <ButtonView>
            <TextFormatted
              style={{
                fontSize: 18,
                fontWeight: '700',
                color: '#8490AE',
                width: dimension.width / 2 - 20,
                textAlign: 'center',
                paddingVertical: 5,
              }}
              onPress={() => {
                refRBSheet.current.close();
                setOldPassword();
                setOldPassword();
                setRepeatPassword();
              }}>
              Cancel
            </TextFormatted>
            <Button
              opacity={
                validPass(oldPassword) &&
                validPass(newPassword) &&
                validPass(repeatPassword)
                  ? 1
                  : 0.5
              }
              buttonName={'Save'}
              color={theme.colors.primary}
              marginTop={1}
              marginBottom={1}
              width={dimension.width / 2 - 20}
              onPress={() => refRBSheet.current.close()}
              disabled={
                validPass(oldPassword) &&
                validPass(newPassword) &&
                validPass(repeatPassword)
                  ? false
                  : true
              }
            />
          </ButtonView>
        </RBSheet>
        {/* </BottomSheet> */}

        <CreditCard
          refRBSheet1={refRBSheet1}
          autoMonthlyPayment={autoMonthlyPayment}
          setAutoMonthlyPayment={setAutoMonthlyPayment}
          refRBSheet2={refRBSheet2}
          refRBSheet3={refRBSheet3}
        />

        <AddNewCard refRBSheet={refRBSheet2} />

        <EditCard refRBSheet3={refRBSheet3} />
      </ScrollView>
      <Netinforsheet />
    </View>
  );
};

const ButtonRow = ({title, onPress}) => {
  const ThemeMode = useSelector(state => state.Theme);
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 20,
        paddingVertical: 5,
        marginVertical: 5,
      }}>
      <TextFormatted
        style={{
          fontSize: 14,
          fontWeight: '600',
          color: ThemeMode.selectedTheme
            ? theme.colors.primaryBlack
            : theme.colors.primary,
          flex: 1,
        }}>
        {title}
      </TextFormatted>

      <Image
        resizeMode="contain"
        source={require('../../assets/icons/chevron_down_ico.png')}
        style={{
          marginTop: 0,
          height: 12,
          width: 10,
          transform: [{rotate: '-90deg'}],
          tintColor: ThemeMode.selectedTheme
            ? theme.colors.primaryBlack
            : theme.colors.primary,
        }}
      />
    </TouchableOpacity>
  );
};
const CreditCard = ({
  refRBSheet1,
  autoMonthlyPayment,
  setAutoMonthlyPayment,
  refRBSheet2,
  refRBSheet3,
}) => {
  const ThemeMode = useSelector(state => state.Theme);
  const dimension = useWindowDimensions();
  const [active, setActive] = useState(0);
  const [show, setShow] = useState(false);
  const cards = [
    {
      img:
        ThemeMode.themecolr == 'Red'
          ? RedlightImage.card
          : ThemeMode.themecolr == 'Blue'
          ? BluelightImage.card_blue
          : ThemeMode.themecolr == 'Green'
          ? GreenlightImage.card_green
          : ThemeMode.themecolr == 'Purple'
          ? PurplelightImage.card_purple
          : ThemeMode.themecolr == 'Yellow'
          ? YellowlightImage.card_yellow
          : YellowlightImage.card,
    },
    {img: require('../../assets/images/card_2.png')},
  ];
  const menuref = useRef();

  return (
    <RBSheet
      ref={refRBSheet1}
      closeOnDragDown={true}
      height={540}
      closeOnPressBack={true}
      dragFromTopOnly
      customStyles={{
        wrapper: {},
        draggableIcon: {backgroundColor: '#8490AE'},
        container: {
          borderTopLeftRadius: 40,
          borderTopRightRadius: 40,
          backgroundColor: ThemeMode.selectedTheme
            ? theme.colors.primary
            : theme.colors.primaryBlack,
        },
      }}>
      <StatusBar backgroundColor={'#00000077'} />
      <ScrollView>
        <TouchableOpacity
          onPress={() => refRBSheet1.current.close()}
          style={{
            alignSelf: 'flex-end',
            marginRight: 30,
            marginTop: 5,
          }}>
          <Image
            source={require('../../assets/icons/close_immg.png')}
            style={{
              height: 5,
              width: 5,
              resizeMode: 'contain',
              alignSelf: 'flex-end',
              padding: 8,
              tintColor: ThemeMode.selectedTheme
                ? theme.colors.primaryBlack
                : theme.colors.primary,
            }}
          />
        </TouchableOpacity>

        <TextFormatted
          style={{
            fontSize: 18,
            fontWeight: '600',
            color: ThemeMode.selectedTheme
              ? theme.colors.primaryBlack
              : theme.colors.primary,
            marginLeft: 20,
          }}>
          Your credit cards
        </TextFormatted>
        <Carousel
          data={cards}
          sliderWidth={dimension.width}
          itemWidth={dimension.width - 40}
          renderItem={({item, index}) => (
            <View style={{}}>
              <TouchableOpacity
                onLongPress={() => setShow(true)}
                style={{justifyContent: 'center', alignItems: 'center'}}
                onPress={() => setShow(false)}>
                <ImageBackground
                  source={item.img}
                  style={{
                    height: 200,
                    width: dimension.width - 45,
                    alignSelf: 'center',
                    marginLeft: 20,
                    marginRight: 20,
                    marginTop: 20,
                  }}
                  imageStyle={{borderRadius: 40}}
                  resizeMode="cover">
                  <View style={{height: 110}} />
                  <View style={{marginHorizontal: 25}}>
                    <TextFormatted
                      style={{
                        fontSize: 21,
                        fontWeight: '700',
                        color: theme.colors.primary,
                      }}>
                      1234 5678 9123 4567
                    </TextFormatted>
                    <View style={{flexDirection: 'row', marginTop: 10}}>
                      <TextFormatted
                        style={{
                          fontSize: 14,
                          fontWeight: '400',
                          color: theme.colors.primary,
                          flex: 1,
                        }}>
                        Alexander Doe
                      </TextFormatted>
                      <TextFormatted
                        style={{
                          fontSize: 14,
                          fontWeight: '400',
                          color: theme.colors.primary,
                        }}>
                        01/29
                      </TextFormatted>
                    </View>
                  </View>

                  <TouchableOpacity
                    onPress={() => refRBSheet3.current.open()}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      /*   height: 40,
                        width: 114, */
                      justifyContent: 'center',
                      borderRadius: 12,
                      borderWidth: 1,
                      borderColor: '#fff',
                      position: 'absolute',
                      right: 60,
                      top: 20,
                      padding: 5,
                    }}>
                    <Image
                      source={require('../../assets/icons/edit_pen.png')}
                      style={{height: 24, width: 24, resizeMode: 'contain'}}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    /*    onPress={() => refRBSheet3.current.open()} */
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      /*   height: 40,
                        width: 114, */
                      justifyContent: 'center',
                      borderRadius: 12,
                      borderWidth: 1,
                      borderColor: '#fff',
                      position: 'absolute',
                      right: 15,
                      top: 20,
                      padding: 5,
                    }}>
                    <Image
                      source={require('../../assets/icons/delete_icon.png')}
                      style={{height: 24, width: 24, resizeMode: 'contain'}}
                    />
                    {/*  <TextFormatted
                        style={{
                          fontSize: 14,
                          fontWeight: '600',
                          color: theme.colors.primary,
                          marginLeft: 5,
                        }}>
                        Edit card
                      </TextFormatted> */}
                  </TouchableOpacity>
                </ImageBackground>
                {show && (
                  <View style={{position: 'absolute'}}>
                    <TouchableOpacity
                      style={{
                        height: 64,
                        width: 150,
                        backgroundColor: 'red',
                        backgroundColor: '#fff',
                        borderRadius: 10,
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'row',
                      }}>
                      <Image
                        source={require('../../assets/icons/trash.png')}
                        style={{height: 24, width: 24, resizeMode: 'contain'}}
                      />
                      <TextFormatted
                        style={{
                          fontSize: 14,
                          fontWeight: '600',
                          color: theme.colors.primaryBlack,
                        }}>
                        Delete
                      </TextFormatted>
                    </TouchableOpacity>
                    <View style={styles.triangle} />
                  </View>
                )}
              </TouchableOpacity>
            </View>
          )}
          onSnapToItem={index => setActive(index)}
        />

        <View
          style={{flexDirection: 'row', alignSelf: 'center', marginTop: 20}}>
          {Array(2)
            .fill('')
            .map((v, i) => (
              <View
                style={{
                  height: 10,
                  width: active == i ? 25 : 10,
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
                  opacity: active == i ? 1 : 0.3,
                  borderRadius: 20,
                  margin: 3,
                }}
              />
            ))}
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginLeft: 20,
            marginTop: 10,
            marginRight: 20,
            marginBottom: 10,
          }}>
          <TextFormatted
            style={{
              fontSize: 14,
              fontWeight: '600',
              color: ThemeMode.selectedTheme
                ? theme.colors.primaryBlack
                : theme.colors.primary,
              flex: 1,
            }}>
            Enable automatic monthly payment
          </TextFormatted>
          <View style={{width: 20}} />

          <TouchableOpacity
            style={{
              alignItems: 'center',
              alignSelf: 'center',
              padding: 2,
            }}
            onPress={() => setAutoMonthlyPayment(!autoMonthlyPayment)}>
            <Image
              resizeMode="contain"
              style={{width: 58, height: 33}}
              source={
                ThemeMode.themecolr == 'Red'
                  ? autoMonthlyPayment
                    ? RedlightImage.On_switchs
                    : RedlightImage.Off_switchs
                  : ThemeMode.themecolr == 'Blue'
                  ? autoMonthlyPayment
                    ? BluelightImage.On_switchs_blue
                    : BluelightImage.Off_switchs_blue
                  : ThemeMode.themecolr == 'Green'
                  ? autoMonthlyPayment
                    ? GreenlightImage.On_switchs_green
                    : GreenlightImage.Off_switchs_green
                  : ThemeMode.themecolr == 'Purple'
                  ? autoMonthlyPayment
                    ? PurplelightImage.On_switchs_purplle
                    : PurplelightImage.Off_switchs_purplle
                  : ThemeMode.themecolr == 'Yellow'
                  ? autoMonthlyPayment
                    ? YellowlightImage.On_switchs_yellow
                    : YellowlightImage.Off_switchs_yellow
                  : autoMonthlyPayment
                  ? RedlightImage.On_switchs
                  : RedlightImage.Off_switchs
              }
            />
          </TouchableOpacity>
        </View>
        {/* <View style={styles.triangle} /> */}
        {/* <View style={styles.box} /> */}
        <View style={{height: 20}} />
        <ButtonRow
          title={'Add new card'}
          onPress={() => refRBSheet2.current.open()}
        />
        <ButtonRow title={'Add a PayPal account'} />
      </ScrollView>
    </RBSheet>
  );
};
export default Security;

const styles = StyleSheet.create({
  menuTrigger: {
    padding: 5,
  },
  triggerText: {
    fontSize: 20,
  },
  contentText: {
    fontSize: 18,
  },
  triangle: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderTopWidth: 20,
    borderRightWidth: 10,
    borderBottomWidth: 0,
    borderLeftWidth: 10,
    borderTopColor: '#fff',
    borderRightColor: 'transparent',
    borderBottomColor: 'transparent',
    borderLeftColor: 'transparent',
    alignSelf: 'center',
  },
  box: {
    height: 50,
    width: 50,
    borderTopWidth: 10,
    borderRightWidth: 10,
    borderBottomWidth: 10,
    borderLeftWidth: 10,
    borderTopColor: 'green',
    borderRightColor: 'red',
    borderBottomColor: 'Yellow',
    borderLeftColor: 'blue',
  },
});
