import {
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {theme} from '../../utils/Constants';
import HeaderImage_1 from '../../components/HeaderImage_1';
import TextFormatted from '../../components/TextFormatted';
import SearchBar from '../../components/SearchBar';
import Button from '../../components/Button';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {
  BluelightImage,
  GreenlightImage,
  PurplelightImage,
  RedlightImage,
  YellowlightImage,
} from '../../utils/CustomImages';
import axios from 'axios';
import ActivityLoader from '../../components/ActivityLoader';
import Netinforsheet from '../../components/Netinforsheet';
import {STAP} from '../../redux/actions/ActionType';

const EditPassions = () => {
  const ThemeMode = useSelector(state => state.Theme);
  const Staps = useSelector(state => state.Stap);
  const navigation = useNavigation();
  const [search, setSearch] = useState('');
  const [data, setData] = useState([]);
  const [load, setload] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState([]);
  const [User, setUser] = useState();
  //console.log('selected', selected);
  const oldPass = User?.category_id.split(',');
  const getPassion = () => {
    setload(true);
    axios({
      method: 'get',
      url: `https://technorizen.com/Dating/webservice/get_passion`,
    }).then(response => {
      setload(false);
      setData(response.data.result);
    });
  };
  const searchPassion = s => {
    axios({
      method: 'get',
      url: `https://technorizen.com/Dating/webservice/passion_search?id=${s}`,
    }).then(response => {
      console.log('Search Api', response.data.result);
    });
  };
  const UpdateCategory = () => {
    setLoading(true);
    const body = new FormData();
    body.append('user_id', Staps.id);
    body.append('category_id', selected.join(','));
    axios({
      url: 'https://technorizen.com/Dating/webservice/update_passion',
      method: 'POST',
      data: body,
      headers: {
        'content-type': 'multipart/form-data',
      },
    })
      .then(function (response) {
        console.log('response', response.data);
        if (response.data.status == 1) {
          setLoading(false);
          navigation.navigate('myProfile');
        } else {
          setLoading(false);
        }
      })
      .catch(function (error) {
        console.log(error);
        setLoading(false);
      });
  };
  const getUser = () => {
    setload(true);
    axios({
      method: 'get',
      url:
        'https://technorizen.com/Dating/webservice/get_profile?user_id=' +
        Staps.id,
    }).then(response => {
      setUser(response.data.result);
      setload(false);
    });
  };
  useEffect(() => {
    getPassion();
    getUser();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: ThemeMode.selectedTheme
          ? theme.colors.primary
          : theme.colors.primaryBlack,
      }}>
      <View>
        <HeaderImage_1>
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
                Edit passions
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
        </HeaderImage_1>
        <SearchBar
          value={search}
          onChangeText={v => {
            searchPassion(v), setSearch(v);
          }}
          placeholder={'Search passion'}
          onPress={v => setSearch('')}
        />
      </View>
      <View style={{justifyContent: 'center', flex: 1, marginBottom: 40}}>
        {load ? (
          <ActivityLoader />
        ) : (
          <FlatList
            data={data.filter(item => {
              return item.passion_name
                .toLocaleLowerCase()
                .includes(search.toLocaleLowerCase());
            })}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={<View style={{height: 20}} />}
            renderItem={({item, i}) => (
              <TouchableOpacity
                onPress={() =>
                  setSelected(prevState =>
                    prevState.find(v => item.id == v)
                      ? prevState.filter(v => item.id != v)
                      : [...prevState, item.id],
                  )
                }
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginHorizontal: 20,
                  paddingHorizontal: 30,
                  paddingVertical: 8,
                  marginVertical: 2,
                }}>
                <Image
                  source={{uri: item.image}}
                  style={{
                    height: 32,
                    width: 32,
                    resizeMode: 'contain',
                    opacity: selected.find(v => item.id == v) ? 1 : 0.3,
                  }}
                />
                <TextFormatted
                  style={{
                    fontSize: 16,
                    fontWeight: '400',
                    color: selected.find(v => item.id == v)
                      ? ThemeMode.selectedTheme
                        ? theme.colors.primaryBlack
                        : theme.colors.primary
                      : '#8490AE',
                    flex: 1,
                    marginLeft: 10,
                  }}>
                  {item.passion_name}
                </TextFormatted>
                <Image
                  source={
                    selected.find(v => item.id == v)
                      ? ThemeMode.themecolr == 'Red'
                        ? RedlightImage.check_red
                        : ThemeMode.themecolr == 'Blue'
                        ? BluelightImage.check_blue
                        : ThemeMode.themecolr == 'Green'
                        ? GreenlightImage.check_green
                        : ThemeMode.themecolr == 'Purple'
                        ? PurplelightImage.check_purple
                        : ThemeMode.themecolr == 'Yellow'
                        ? YellowlightImage.check_yellow
                        : RedlightImage.check_red
                      : require('../../assets/icons/check.png')
                  }
                  style={{height: 29, width: 29, resizeMode: 'contain'}}
                />
              </TouchableOpacity>
            )}
          />
        )}
      </View>
      <View
        style={{
          position: 'absolute',
          bottom: 0,
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
          opacity={selected.length >= 5 && selected.length <= 10 ? 1 : 0.5}
          buttonName={'Save'}
          marginBottom={15}
          disabled={
            selected.length >= 5 && selected.length <= 10 ? false : true
          }
          marginTop={10}
          onPress={() => UpdateCategory()}
        />
      </View>
      <Netinforsheet />
    </View>
  );
};

export default EditPassions;

const styles = StyleSheet.create({});
