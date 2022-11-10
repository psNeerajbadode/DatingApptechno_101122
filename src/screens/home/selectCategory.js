import {
  FlatList,
  Image,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import React, {useRef, useState} from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';
import TextFormatted from '../../components/TextFormatted';
import {theme} from '../../utils/Constants';
import ButtonView from '../../components/buttonView';
import Button from '../../components/Button';

const SelectCategory = ({refRBSheet}) => {
  const data = [
    {
      img: require('../../assets/icons/clapperboard.png'),
      title: 'Movies',
      subtitle: 'Tell me what to watch tonight',
    },
    {
      img: require('../../assets/icons/hot_coffee.png'),
      title: 'Coffee',
      subtitle: 'Take me to your favorite cafe',
    },
    {
      img: require('../../assets/icons/mirror_ball.png'),
      title: 'Club',
      subtitle: 'Let’s have some fun',
    },
    {
      img: require('../../assets/icons/console.png'),
      title: 'Games',
      subtitle: 'Lorem ipsum',
    },
    {
      img: require('../../assets/icons/aeroplane.png'),
      title: 'Travels',
      subtitle: 'Lorem ipsum',
    },
    {
      img: require('../../assets/icons/sports.png'),
      title: 'Sports',
      subtitle: 'Lorem ipsum',
    },
    {
      img: require('../../assets/icons/nature.png'),
      title: 'Nature',
      subtitle: 'Lorem ipsum',
    },
    {
      img: require('../../assets/icons/headphones.png'),
      title: 'Music',
      subtitle: 'Lorem ipsum',
    },
    {
      img: require('../../assets/icons/increase.png'),
      title: 'Entrepreneurs',
      subtitle: 'Lorem ipsum',
    },
    {
      img: require('../../assets/icons/art_and_design.png'),
      title: 'Art',
      subtitle: 'Lorem ipsum',
    },
    {
      img: require('../../assets/icons/love.png'),
      title: 'Social Couse',
      subtitle: 'Lorem ipsum',
    },
  ];
  const [select, setSelect] = useState('');
  const refRBSheet1 = useRef();
  const [current, setCurrent] = useState('');
  return (
    <RBSheet
      ref={refRBSheet}
      closeOnDragDown={true}
      height={550}
      closeOnPressBack={true}
      dragFromTopOnly
      customStyles={{
        wrapper: {},
        draggableIcon: {backgroundColor: '#8490AE'},
        container: {
          borderTopLeftRadius: 40,
          borderTopRightRadius: 40,
          overflow: 'visible',
        },
      }}>
      <StatusBar backgroundColor={'#00000077'} />
      {/* <View style={{ position: 'absolute', top: -75, marginHorizontal: 20 }}>
        <TextFormatted style={{ fontSize: 28, fontWeight: '700', color: theme.colors.primary }}>Select category</TextFormatted>
        <TextFormatted style={{ fontSize: 14, fontWeight: '400', color: theme.colors.primary }}>
          Select the date type you want and find a match that is looking for the same date
        </TextFormatted>
      </View> */}
      <View
        style={{
          marginHorizontal: 20,
          backgroundColor: '#fff',
          borderRadius: 20,
          padding: 15,
          flexDirection: 'row',
          alignItems: 'center',
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.22,
          shadowRadius: 2.22,
          elevation: 3,
          marginTop: 10,
        }}>
        <Image
          source={require('../../assets/icons/category.png')}
          style={{height: 40, width: 40, resizeMode: 'contain'}}
        />
        <View style={{marginLeft: 10}}>
          <TextFormatted
            style={{
              fontSize: 20,
              fontWeight: '700',
              color: theme.colors.primaryBlack,
            }}>
            See everyone
          </TextFormatted>
          <TextFormatted
            style={{fontSize: 14, fontWeight: '400', color: '#8490AE'}}>
            Search for all the people
          </TextFormatted>
        </View>
      </View>
      <View
        style={{
          marginHorizontal: 20,
          backgroundColor: '#fff',
          borderRadius: 20,
          padding: 15,
          flexDirection: 'row',
          alignItems: 'center',
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.22,
          shadowRadius: 2.22,
          elevation: 3,
          marginTop: 20,
        }}>
        <Image
          source={require('../../assets/icons/search_3.png')}
          style={{height: 40, width: 40, resizeMode: 'contain'}}
        />
        <View style={{marginLeft: 10}}>
          <TextFormatted
            style={{
              fontSize: 20,
              fontWeight: '700',
              color: theme.colors.primaryBlack,
            }}>
            Spot search
          </TextFormatted>
          <TextFormatted
            style={{fontSize: 14, fontWeight: '400', color: '#8490AE'}}>
            Lorem ipsum
          </TextFormatted>
        </View>
      </View>

      <FlatList
        style={{marginTop: 10}}
        data={data}
        renderItem={({item, index}) => (
          <View>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                marginHorizontal: 20,
                marginVertical: 10,
                alignItems: 'center',
              }}
              onPress={() => {
                setCurrent(index);
                refRBSheet1.current.open();
              }}>
              <Image
                source={item.img}
                style={{height: 40, width: 40, resizeMode: 'contain'}}
              />
              <View style={{flex: 1, marginLeft: 10, marginRight: 15}}>
                <TextFormatted
                  style={{
                    fontSize: 20,
                    fontWeight: '700',
                    color: theme.colors.primaryBlack,
                  }}>
                  {item.title}
                </TextFormatted>
                <TextFormatted
                  style={{
                    fontSize: 14,
                    fontWeight: '400',
                    color: '#8490AE',
                    marginTop: 3,
                  }}>
                  {item.subtitle}
                </TextFormatted>
              </View>

              <Image
                source={
                  select == index
                    ? require('../../assets/icons/link_red.png')
                    : require('../../assets/icons/link.png')
                }
                style={{height: 29, width: 29, resizeMode: 'contain'}}
              />
            </TouchableOpacity>
          </View>
        )}
      />
      <ViewCategory
        refRBSheet1={refRBSheet1}
        select={select}
        setSelect={setSelect}
        data={data}
        current={current}
      />
    </RBSheet>
  );
};
const ViewCategory = ({refRBSheet1, data, current, setSelect}) => {
  const dimension = useWindowDimensions();
  return (
    <RBSheet
      ref={refRBSheet1}
      closeOnDragDown={true}
      height={450}
      closeOnPressBack={true}
      customStyles={{
        wrapper: {},
        draggableIcon: {backgroundColor: '#8490AE'},
        container: {
          borderTopLeftRadius: 40,
          borderTopRightRadius: 40,
          overflow: 'visible',
        },
      }}>
      {/* <StatusBar backgroundColor={'#00000077'} /> */}
      {/* <View style={{ position: 'absolute', top: -75, marginHorizontal: 20 }}>
        <TextFormatted style={{ fontSize: 28, fontWeight: '700', color: theme.colors.primary }}>Select category</TextFormatted>
        <TextFormatted style={{ fontSize: 14, fontWeight: '400', color: theme.colors.primary }}>
          Select the date type you want and find a match that is looking for the same date
        </TextFormatted>
      </View> */}
      <TextFormatted
        style={{
          fontSize: 26,
          fontWeight: '700',
          color: theme.colors.primaryBlack,
          marginHorizontal: 50,
          textAlign: 'center',
          marginTop: 20,
        }}>
        Do you wanna join this category?
      </TextFormatted>
      <View style={{flex: 1, justifyContent: 'center'}}>
        {data.map((v, i) => (
          <View style={{}}>
            {current == i && (
              <View>
                <Image
                  source={v.img}
                  style={{
                    height: 100,
                    width: 100,
                    resizeMode: 'contain',
                    alignSelf: 'center',
                  }}
                />
                <TextFormatted
                  style={{
                    fontSize: 26,
                    fontWeight: '700',
                    color: theme.colors.primaryBlack,
                    alignSelf: 'center',
                    marginTop: 15,
                  }}>
                  {v.title}
                </TextFormatted>
                <TextFormatted
                  style={{
                    fontSize: 14,
                    fontWeight: '400',
                    color: '#8490AE',
                    marginTop: 3,
                    alignSelf: 'center',
                  }}>
                  {v.subtitle}
                </TextFormatted>
              </View>
            )}
          </View>
        ))}
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
            refRBSheet1.current.close();
            setSelect();
          }}>
          Cancel
        </TextFormatted>
        <Button
          onPress={() => {
            setSelect(current);
            refRBSheet1.current.close();
          }}
          buttonColor={theme.colors.primaryOn}
          buttonName={'Join'}
          color={theme.colors.primary}
          marginTop={1}
          marginBottom={1}
          width={dimension.width / 2 - 20}
        />
      </ButtonView>
    </RBSheet>
  );
};

export default SelectCategory;

const styles = StyleSheet.create({});
