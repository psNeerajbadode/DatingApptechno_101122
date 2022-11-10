import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  TextInput,
  useWindowDimensions,
  StatusBar,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import HeaderImage from '../../components/HeaderImage';
import TextFormatted from '../../components/TextFormatted';
import {theme} from '../../utils/Constants';
import TextInputFormat from '../../components/TextInputFormat';
import DropDown from '../../components/DropDown';
import moment from 'moment';
import RBSheet from 'react-native-raw-bottom-sheet';
import Button from '../../components/Button';
import {Calendar} from 'react-native-calendars';
import Dropdown1 from '../../components/dropdown1';
import {useSelector} from 'react-redux';
import {
  EducationList,
  EthnicityList,
  genderList,
  LookingList,
  SexualList,
  showMeList,
  ZodiacList,
} from '../../utils/dropDownData';
import ButtonView from '../../components/buttonView';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import BottomSheet from '../../components/bottomSheet';
import {
  BluelightImage,
  GreenlightImage,
  PurplelightImage,
  RedlightImage,
  YellowlightImage,
} from '../../utils/CustomImages';
import {STAP} from '../../redux/actions/ActionType';
import {useDispatch} from 'react-redux';
import Netinforsheet from '../../components/Netinforsheet';
const EditProfile = ({navigation}) => {
  const ThemeMode = useSelector(state => state.Theme);
  const Staps = useSelector(state => state.Stap);
  const dispatch = useDispatch();
  const [name, setName] = useState(Staps.user_name);
  const [surname, setSurname] = useState(Staps.surname);
  const [gender, setGender] = useState(Staps.gender);
  const [aboutMe, setAboutMe] = useState(Staps.about);
  const [showMe, setShowMe] = useState(Staps.show_me);
  const [selectedDate, setSelectedDate] = useState(Staps.dob);
  const [sexualOrientation, setSexualOrientation] = useState(
    Staps.sexual_orientatio,
  );
  const [lookingFor, setLookingFor] = useState(Staps.looking_for);
  const [education, setEducation] = useState(Staps.education);
  const [ethnicity, setEthnicity] = useState(Staps.ethnicity);
  const [zodiac, setZodiac] = useState(Staps.zodiac);
  const [toggle1, setToggle1] = useState(Staps.kids);
  const [toggle2, setToggle2] = useState(Staps.drink);
  const [toggle3, setToggle3] = useState(Staps.smoke);
  const [pic, setPic] = useState();
  const [Loading, setLoading] = useState(false);
  const refRBSheet = useRef();
  const refRBSheet1 = useRef();

  const pickImage = () => {
    launchImageLibrary({quality: 1}, response => {
      if (!response.didCancel) setPic(response.assets[0]);
    });
  };
  const picCamera = () => {
    launchCamera({}, response => {
      if (!response.didCancel) {
        setPic(response.assets[0]);
      }
    });
  };

  async function Update_profile() {
    try {
      const body = new FormData();
      body.append('user_id', Staps.id);
      body.append('user_name', name);
      body.append('surname', surname);
      pic != null &&
        body.append('image', {
          name: pic.fileName,
          type: pic.type,
          uri: pic.uri,
        });
      body.append('dob', selectedDate);
      body.append('looking_for', lookingFor);
      body.append('education', education);
      body.append('ethnicity', ethnicity);
      body.append('zodiac', zodiac);
      body.append('smoke', toggle3);
      body.append('kids', toggle1);
      body.append('drink', toggle2);
      body.append('gender', gender);
      body.append('about', aboutMe);
      body.append('show_me', showMe);
      body.append('sexual_orientation', sexualOrientation);
      setLoading(true);
      const res = await fetch(
        'https://technorizen.com/Dating/webservice/update_profile',
        {
          method: 'post',
          headers: {
            'content-type': 'multipart/form-data',
          },
          body: body,
        },
      );
      const rslt = await res.json();
      console.log('Update Data =>', rslt);
      if (rslt.status == 1) {
        setLoading(false);
        dispatch({type: STAP, payload: {user: rslt.result}});
        navigation.navigate('myProfile');
        console.log(rslt.result);
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
      <View>
        <HeaderImage height={240} marginBottom={20}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginHorizontal: 20,
            }}>
            <View style={{flex: 1, marginLeft: 40}}>
              <TextFormatted
                style={{
                  fontSize: 22,
                  fontWeight: '700',
                  color: theme.colors.primary,
                  textAlign: 'center',
                  marginTop: 17,
                }}>
                My profile
              </TextFormatted>
              <TextFormatted
                style={{
                  fontSize: 16,
                  fontWeight: '400',
                  color: theme.colors.primary,
                  textAlign: 'center',
                  marginTop: 3,
                }}>
                Edit account
              </TextFormatted>
            </View>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image
                source={
                  ThemeMode.selectedTheme
                    ? require('../../assets/icons/close.png')
                    : require('../../assets/icons/close_dark.png')
                }
                style={{height: 40, width: 40, resizeMode: 'contain'}}
              />
            </TouchableOpacity>
          </View>
        </HeaderImage>
        <View
          style={{
            height: 140,
            width: 140,
            backgroundColor: theme.colors.primary,
            borderRadius: 40,
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            position: 'absolute',
            bottom: 0,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.2,
            shadowRadius: 1.41,
            elevation: 2,
          }}>
          <Image
            source={
              Staps.image == null
                ? require('../../assets/images/image.png')
                : {uri: Staps.image}
            }
            style={{
              height: 147,
              width: 147,
              resizeMode: 'contain',
              borderRadius: 40,
            }}
          />

          <TouchableOpacity
            style={{
              position: 'absolute',
              right: 0,
              bottom: 0,
              height: 30,
              width: 30,
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
            onPress={() => refRBSheet1.current.open()}>
            <Image
              source={require('../../assets/icons/edit_pen.png')}
              style={{height: 20, width: 20, resizeMode: 'contain'}}
            />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView>
        <TextInputFormat
          label={'Name'}
          value={name}
          onChangeText={setName}
          containerStyle={{marginTop: 20}}
          labelColor={
            ThemeMode.selectedTheme
              ? theme.colors.primaryBlack
              : theme.colors.primary
          }
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
            refRBSheet.current.open();
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
            elevation: 2,
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
            source={require('../../assets/icons/calendar.png')}
            style={{height: 20, width: 18, resizeMode: 'contain'}}
          />
        </TouchableOpacity>
        <Dropdown1
          data={genderList}
          value={gender}
          onChange={item => setGender(item.value)}
          title={'Gender'}
          height={150}
        />
        <Dropdown1
          data={showMeList}
          value={showMe}
          onChange={item => setShowMe(item.value)}
          title={'Show Me'}
          height={150}
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
            height: Staps.about?.length < 38 || Staps.about == null ? 50 : 130,
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
          }}>
          <TextInput
            placeholderTextColor={
              ThemeMode.selectedTheme
                ? theme.colors.primaryBlack
                : theme.colors.primary
            }
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
        <Dropdown1
          data={SexualList}
          value={sexualOrientation}
          onChange={item => setSexualOrientation(item.value)}
          title={'Sexual orientation'}
        />
        <Dropdown1
          data={LookingList}
          value={lookingFor}
          onChange={item => setLookingFor(item.value)}
          title={'Looking for'}
          height={160}
        />
        <Dropdown1
          data={EducationList}
          value={education}
          onChange={item => setEducation(item.value)}
          title={'Education'}
        />
        <Dropdown1
          data={EthnicityList}
          value={ethnicity}
          onChange={item => setEthnicity(item.value)}
          title={'Ethnicity'}
        />
        <Dropdown1
          data={ZodiacList}
          value={zodiac}
          onChange={item => setZodiac(item.value)}
          title={'Zodiac'}
        />
        <SwitchBox
          Name={'Has Kids'}
          onPress={() => setToggle1(!toggle1)}
          toggle={toggle1}
        />
        <SwitchBox
          Name={'Drinks'}
          onPress={() => setToggle2(!toggle2)}
          toggle={toggle2}
        />
        <SwitchBox
          Name={'Smokes'}
          onPress={() => setToggle3(!toggle3)}
          toggle={toggle3}
        />

        <View style={{height: 30}} />
      </ScrollView>

      <ButtonView>
        <Button
          // opacity={
          //   user.name != name ||
          //   user.surname != surname ||
          //   user.selectedDate != selectedDate ||
          //   user.gender != gender ||
          //   user.showMe != showMe ||
          //   user.aboutMe != aboutMe ||
          //   user.sexualOrientation != sexualOrientation ||
          //   user.lookingFor != lookingFor ||
          //   user.education != education ||
          //   user.ethnicity != ethnicity ||
          //   user.zodiac != zodiac ||
          //   user.has != has ||
          //   user.drink != drink ||
          //   user.smoke != smoke
          //     ? // user.toggle1 != toggle1 ||
          //       // user.toggle2 != toggle2 ||
          //       // user.toggle3 != toggle3
          //       1
          //     : 0.5
          // }
          onPress={() => Update_profile() /* navigation.goBack() */}
          buttonName={'Save'}
          Loading={Loading}
          marginTop={1}
          // disabled={
          //   user.name != name ||
          //   user.surname != surname ||
          //   user.selectedDate != selectedDate ||
          //   user.gender != gender ||
          //   user.showMe != showMe ||
          //   user.aboutMe != aboutMe ||
          //   user.sexualOrientation != sexualOrientation ||
          //   user.lookingFor != lookingFor ||
          //   user.education != education ||
          //   user.ethnicity != ethnicity ||
          //   user.zodiac != zodiac
          //     ? // user.toggle1 != toggle1 ||
          //       // user.toggle2 != toggle2 ||
          //       // user.toggle3 != toggle3
          //       false
          //     : true
          // }
        />
      </ButtonView>
      <Bottom
        refRBSheet={refRBSheet}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
      <Option
        refRBSheet1={refRBSheet1}
        onPress={() => {
          picCamera();
          refRBSheet1.current.close();
        }}
        onPress1={() => {
          pickImage();
          refRBSheet1.current.close();
        }}
      />
      <Netinforsheet />
    </View>
  );
};

const Option = ({refRBSheet1, onPress, onPress1}) => {
  const ThemeMode = useSelector(state => state.Theme);
  return (
    <BottomSheet refRBSheet={refRBSheet1} height={200}>
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
      <StatusBar backgroundColor={'#00000077'} />
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
            // selected={moment(selectedDate)}
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
            // placeholder={sele}
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

        {/* {console.log(moment(selectedDate).format('yyyy-MM-DD'))} */}
        {refresh && (
          <Calendar
            theme={{
              backgroundColor: ThemeMode.selectedTheme
                ? theme.colors.primary
                : theme.colors.primaryBlack,
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
                selectedTextColor: 'white',
              },
            }}
            style={{marginHorizontal: 20, marginVertical: 15}}
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

const SwitchBox = ({Name, onPress, toggle}) => {
  const ThemeMode = useSelector(state => state.Theme);
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        marginHorizontal: 30,
      }}>
      <TextFormatted
        style={{
          fontSize: 14,
          fontWeight: '600',
          color: ThemeMode.selectedTheme
            ? theme.colors.primaryBlack
            : theme.colors.primary,
          flex: 1,
          marginLeft: 10,
        }}>
        {Name}
      </TextFormatted>
      <View style={{width: 20}} />
      <TouchableOpacity
        style={{
          alignItems: 'center',
          alignSelf: 'center',
          padding: 2,
        }}
        onPress={onPress}>
        <Image
          resizeMode="contain"
          style={{width: 58, height: 33}}
          source={
            ThemeMode.themecolr == 'Red'
              ? toggle
                ? RedlightImage.On_switchs
                : RedlightImage.Off_switchs
              : ThemeMode.themecolr == 'Blue'
              ? toggle
                ? BluelightImage.On_switchs_blue
                : BluelightImage.Off_switchs_blue
              : ThemeMode.themecolr == 'Green'
              ? toggle
                ? GreenlightImage.On_switchs_green
                : GreenlightImage.Off_switchs_green
              : ThemeMode.themecolr == 'Purple'
              ? toggle
                ? PurplelightImage.On_switchs_purplle
                : PurplelightImage.Off_switchs_purplle
              : ThemeMode.themecolr == 'Yellow'
              ? toggle
                ? YellowlightImage.On_switchs_yellow
                : YellowlightImage.Off_switchs_yellow
              : toggle
              ? RedlightImage.On_switchs
              : RedlightImage.Off_switchs
          }
        />
      </TouchableOpacity>
    </View>
  );
};
export default EditProfile;

const styles = StyleSheet.create({});
