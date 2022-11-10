import {
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import HeaderImage_1 from '../../../components/HeaderImage_1';
import Pagination from '../../../components/Pagination';
import DropDown from '../../../components/DropDown';
import TextFormatted from '../../../components/TextFormatted';
import {theme} from '../../../utils/Constants';
import Button from '../../../components/Button';
import {useDispatch, useSelector} from 'react-redux';
import {Baseurl} from '../../../utils/Baseurl';
import {STAP} from '../../../redux/actions/ActionType';
import {
  BluelightImage,
  GreenlightImage,
  PurplelightImage,
  RedlightImage,
  YellowlightImage,
} from '../../../utils/CustomImages';
import Netinforsheet from '../../../components/Netinforsheet';

const Step2 = ({navigation}) => {
  const dispatch = useDispatch();
  const ThemeMode = useSelector(state => state.Theme);
  const Staps = useSelector(state => state.Stap);
  const [sexual, setSexual] = useState('');
  const [looking, setLooking] = useState('');
  const [education, setEducation] = useState('');
  const [ethnicity, setEthnicity] = useState('');
  const [zodiac, setZodiac] = useState('');
  const [toggle1, setToggle1] = useState(false);
  const [toggle2, setToggle2] = useState(false);
  const [toggle3, setToggle3] = useState(false);
  const [Loading, setLoading] = useState(false);

  async function Signup_step2() {
    try {
      const url = Baseurl + 'signup3';
      const body = new FormData();
      body.append('user_id', Staps.id);
      body.append('sexual_orientation', sexual);
      body.append('looking_for', looking);
      body.append('education', education);
      body.append('ethnicity', ethnicity);
      body.append('zodiac', zodiac);
      body.append('smoke', toggle1);
      body.append('kids', toggle2);
      body.append('drink', toggle3);

      setLoading(true);
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
        navigation.navigate('step3');
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
  console.log('Staps', Staps);
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
          subTitle={'Insights'}
          position={2}
        />
      </HeaderImage_1>
      <ScrollView>
        <DropDown
          label={'Sexual orientation'}
          placeholder={'Select your sexual orientation'}
          items={[
            'Staight',
            'Gay',
            'Lesbian',
            'Bisexual',
            'Asexual',
            'Demisexual',
            'Pansexual',
            'Queer',
            'Questioning',
          ]}
          onSelect={(selectedItem, index) => {
            setSexual(selectedItem);
          }}
          selected={sexual ? true : false}
        />
        <DropDown
          label={'Looking for'}
          placeholder={'Select what you are looking for'}
          items={['Causal encounter', 'Friends', 'Long term relationship']}
          onSelect={(selectedItem, index) => {
            setLooking(selectedItem);
          }}
          selected={looking ? true : false}
        />
        <DropDown
          label={'Education'}
          placeholder={'Select your education'}
          items={['Primary', 'College', 'Bachelor', 'Master']}
          onSelect={(selectedItem, index) => {
            setEducation(selectedItem);
          }}
          selected={education ? true : false}
        />
        <DropDown
          label={'Ethnicity'}
          placeholder={'Select your ethnicity'}
          items={[
            'American Indian or Alaska Native',
            'Asian',
            'Black or African American',
            'Hispanic or Latino',
            'Native Hawaiian or Other Pacific Islander',
            'White',
          ]}
          onSelect={(selectedItem, index) => {
            setEthnicity(selectedItem);
          }}
          selected={ethnicity ? true : false}
        />
        <DropDown
          label={'Zodiac'}
          placeholder={'Select your zodiac'}
          items={[
            'Aries',
            'Taurus',
            'Gemini',
            'Cancer',
            'Leo',
            'Virgo',
            'Libra',
            'Scorpius',
            'Sagittarius',
            'Capricornus',
            'Aquarius',
            'Pisces',
          ]}
          onSelect={(selectedItem, index) => {
            setZodiac(selectedItem);
          }}
          selected={zodiac ? true : false}
        />
        <View style={{marginVertical: 7}} />
        <SwitchBox
          Name={'Do you smoke?'}
          onPress={() => setToggle1(!toggle1)}
          toggle={toggle1}
        />
        <SwitchBox
          Name={'Do you have kids?'}
          onPress={() => setToggle2(!toggle2)}
          toggle={toggle2}
        />
        <SwitchBox
          Name={'Do you drink?'}
          onPress={() => setToggle3(!toggle3)}
          toggle={toggle3}
        />
      </ScrollView>
      <View
        style={{
          height: 90,
          width: '100%',
          backgroundColor: ThemeMode.selectedTheme
            ? theme.colors.primary
            : theme.colors.primaryBlack,
          justifyContent: 'center',
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
        }}>
        <Button
          buttonName={'Next'}
          marginBottom={15}
          Loading={Loading}
          marginTop={15}
          onPress={() => Signup_step2()}
        />
      </View>
    </View>
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
        marginHorizontal: 20,
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
      <Netinforsheet />
    </View>
  );
};
export default Step2;

const styles = StyleSheet.create({});
