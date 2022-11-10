import {FlatList, Image, StyleSheet, View} from 'react-native';
import React from 'react';
import TextFormatted from '../../../components/TextFormatted';
import {useSelector} from 'react-redux';
import {theme} from '../../../utils/Constants';

const UserInformation = () => {
  const ThemeMode = useSelector(state => state.Theme);
  const passion = [
    {img: require('../../../assets/icons/pizza.png'), name: 'Pizza'},
    {img: require('../../../assets/icons/museum.png'), name: 'Museum'},
    {img: require('../../../assets/icons/theater.png'), name: 'Theater'},
    {img: require('../../../assets/icons/micro.png'), name: 'karaoke'},
    {img: require('../../../assets/icons/wine_glass.png'), name: 'Wine'},
    {img: require('../../../assets/icons/beer.png'), name: 'Beer'},
    {img: require('../../../assets/icons/zoo.png'), name: 'Zoo'},
  ];
  return (
    <View>
      <TextFormatted
        style={{
          fontSize: 16,
          fontWeight: '700',
          color: ThemeMode.selectedTheme
            ? theme.colors.primaryBlack
            : theme.colors.primary,
          marginLeft: 40,
        }}>
        Passions
      </TextFormatted>
      <FlatList
        data={passion}
        horizontal
        style={{paddingHorizontal: 10}}
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => (
          <View
            style={{
              height: 100,
              width: 100,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              source={item.img}
              style={{height: 50, width: 50, resizeMode: 'contain'}}
            />
            <TextFormatted
              style={{fontSize: 16, fontWeight: '700', color: '#8490AE'}}>
              {item.name}
            </TextFormatted>
          </View>
        )}
      />
      <View style={{height: 20}}></View>
      <Header
        source={require('../../../assets/icons/account.png')}
        height={24}
        width={24}
        title={'About me'}
        text={
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem integer quis tincidunt sem. Egestas arcu sit imperdiet nibh morbi. Quisque suspendisse pellentesque diam malesuada. Mi felis ultrices ipsum tincidunt. Netus ultrices diam feugiat pellentesque at'
        }
      />
      <Header
        source={require('../../../assets/icons/equality.png')}
        title={'Sexual orientation'}
        text={'Eterosexual'}
      />
      <Header
        source={require('../../../assets/icons/search_2.png')}
        title={'Looking for'}
        text={'Long term relationship'}
      />
      <Header
        source={require('../../../assets/icons/book.png')}
        title={'Education'}
        text={'Bachelor'}
      />
      <Header
        source={require('../../../assets/icons/location.png')}
        title={'Ethnicity'}
        text={'Caucasian'}
      />
      <Header
        source={require('../../../assets/icons/translation.png')}
        title={'Language'}
        text={'English'}
      />
      <Header
        source={require('../../../assets/icons/favourites.png')}
        title={'Zodiac'}
        text={'Leo'}
      />
      <Header
        source={require('../../../assets/icons/baby_carriage.png')}
        title={'Has kids'}
        text={'No'}
      />
      <Header
        source={require('../../../assets/icons/cocktail.png')}
        title={'Drinks'}
        text={'Yes'}
      />
      <Header
        source={require('../../../assets/icons/cigarrete.png')}
        title={'Smokes'}
        text={'Yes'}
      />
    </View>
  );
};
const Header = ({title, text, source}) => {
  const ThemeMode = useSelector(state => state.Theme);
  return (
    <View style={{marginHorizontal: 25, marginVertical: 10}}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Image
          source={source}
          style={{height: 24, width: 24, resizeMode: 'contain'}}
        />
        <TextFormatted
          style={{
            fontSize: 16,
            fontWeight: '700',
            color: ThemeMode.selectedTheme
              ? theme.colors.primaryBlack
              : theme.colors.primary,
            marginLeft: 10,
          }}>
          {title}
        </TextFormatted>
      </View>
      <TextFormatted
        style={{
          fontSize: 14,
          fontWeight: '400',
          color: '#8490AE',
          marginTop: 10,
        }}>
        {text}
      </TextFormatted>
    </View>
  );
};
export default UserInformation;

const styles = StyleSheet.create({});
