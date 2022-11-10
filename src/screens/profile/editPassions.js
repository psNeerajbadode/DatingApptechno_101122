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
import Header from '../../components/Header';
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

  const [selected, setSelected] = useState([
    'Restaurant',
    'Club',
    'Museum',
    'Art',
    'Coffee',
    'Beach',
  ]);
  // const data = [
  //   { img: require('../../assets/icons/icecream.png'), title: 'Ice cream' },
  //   { img: require('../../assets/icons/table.png'), title: 'Restaurant' },
  //   { img: require('../../assets/icons/hot_coffee.png'), title: 'Coffee' },
  //   { img: require('../../assets/icons/beach_chair.png'), title: 'Beach' },
  //   { img: require('../../assets/icons/pina_colada.png'), title: 'Bar' },
  //   { img: require('../../assets/icons/mirror_ball.png'), title: 'Club' },
  //   { img: require('../../assets/icons/pizza.png'), title: 'Pizza' },
  //   { img: require('../../assets/icons/museum.png'), title: 'Museum' },
  //   { img: require('../../assets/icons/theater.png'), title: 'Theater' },
  //   { img: require('../../assets/icons/micro.png'), title: 'karaoke' },
  //   { img: require('../../assets/icons/wine_glass.png'), title: 'Wine' },
  //   { img: require('../../assets/icons/beer.png'), title: 'Beer' },
  //   { img: require('../../assets/icons/zoo.png'), title: 'Zoo' },
  //   { img: require('../../assets/icons/art_and_design.png'), title: 'Art' },
  //   { img: require('../../assets/icons/clapperboard.png'), title: 'Movies' },
  //   { img: require('../../assets/icons/sports.png'), title: 'Sports' },
  //   { img: require('../../assets/icons/teddy_bear.png'), title: 'Bear' },
  //   { img: require('../../assets/icons/lectern.png'), title: 'Politics' },
  //   { img: require('../../assets/icons/picnic_basket.png'), title: 'Picnic' },
  //   { img: require('../../assets/icons/cooking.png'), title: 'Cooking' },
  //   { img: require('../../assets/icons/books.png'), title: 'Reading' },
  //   { img: require('../../assets/icons/diy.png'), title: 'DIY' },
  //   { img: require('../../assets/icons/dog.png'), title: 'Animals' },
  //   { img: require('../../assets/icons/dice.png'), title: 'Board Games' },
  //   { img: require('../../assets/icons/aeroplane.png'), title: 'Travel' },
  //   { img: require('../../assets/icons/polo.png'), title: 'Fashion' },
  //   { img: require('../../assets/icons/herbal_tea.png'), title: 'Tea' },
  //   { img: require('../../assets/icons/photography.png'), title: 'Photography' },
  //   { img: require('../../assets/icons/shopping_bags.png'), title: 'Shopping' },
  //   { img: require('../../assets/icons/console.png'), title: 'Gaming' },
  //   { img: require('../../assets/icons/manuscript.png'), title: 'Writing' },
  //   { img: require('../../assets/icons/nature.png'), title: 'Outdoors' },
  //   { img: require('../../assets/icons/rumba.png'), title: 'Dancing' },
  //   { img: require('../../assets/icons/walking.png'), title: 'Walking' },
  //   { img: require('../../assets/icons/ecology.png'), title: 'Environment' },
  //   { img: require('../../assets/icons/love.png'), title: 'Volunteering' },
  //   { img: require('../../assets/icons/instagram.png'), title: 'Instagram' },
  //   { img: require('../../assets/icons/architecture.png'), title: 'Architecture' },
  // ];
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
      url: `https://technorizen.com/Dating/webservice/passion_search?passion_name=${s}`,
    }).then(response => {
      console.log('Search Api', response.data.result);
    });
  };

  useEffect(() => {
    getPassion();
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
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() =>
                  setSelected(prevState =>
                    prevState.find(v => item.passion_name == v)
                      ? prevState.filter(v => item.passion_name != v)
                      : [...prevState, item.passion_name],
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
                    opacity: selected.find(v => item.passion_name == v)
                      ? 1
                      : 0.3,
                  }}
                />
                <TextFormatted
                  style={{
                    fontSize: 16,
                    fontWeight: '400',
                    color: selected.find(v => item.passion_name == v)
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
                    selected.find(v => item.passion_name == v)
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
          onPress={() => navigation.navigate('myProfile')}
        />
      </View>
      <Netinforsheet />
    </View>
  );
};

export default EditPassions;

const styles = StyleSheet.create({});
