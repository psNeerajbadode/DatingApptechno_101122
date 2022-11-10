import {
  Image,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

const UserMedia = ({}) => {
  const navigation = useNavigation();
  const dimension = useWindowDimensions();
  const potos = [
    {img: require('../../../assets/images/unsplash_1.png')},
    {img: require('../../../assets/images/unsplash_2.png')},
    {img: require('../../../assets/images/unsplash_3.png')},
    {img: require('../../../assets/images/unsplash_4.png')},
    {img: require('../../../assets/images/unsplash_5.png')},
    {img: require('../../../assets/images/unsplash_6.png')},
  ];
  return (
    <View>
      <View style={{flexDirection: 'row'}}>
        <View style={{width: dimension.width / 2}}>
          {potos.map(
            (v, i) =>
              (i != 0 && i != 2) || (
                <TouchableOpacity
                  style={{
                    marginTop: 20,
                    marginHorizontal: 10,
                    alignSelf: 'flex-end',
                  }}
                  onPress={() =>
                    navigation.navigate('viewImage', {imgIndex: i})
                  }>
                  <Image
                    source={v.img}
                    style={{
                      width: (dimension.width - 50) / 2,
                      height: i == 0 ? 230 : 337,
                      resizeMode: 'cover',
                      borderRadius: 20,
                    }}
                  />
                </TouchableOpacity>
              ),
          )}
        </View>
        <View style={{width: dimension.width / 2}}>
          {potos.map(
            (v, i) =>
              (i != 1 && i != 3 && i != 4) || (
                <TouchableOpacity
                  style={{marginTop: 20, marginHorizontal: 10}}
                  onPress={() =>
                    navigation.navigate('viewImage', {imgIndex: i})
                  }>
                  <Image
                    source={v.img}
                    style={{
                      width: (dimension.width - 50) / 2,
                      height: i == 1 ? 166 : i == 3 ? 238 : 143,
                      resizeMode: 'cover',
                      borderRadius: 20,
                    }}
                  />
                </TouchableOpacity>
              ),
          )}
        </View>
      </View>
      {potos.map(
        (v, i) =>
          i != 5 || (
            <TouchableOpacity
              style={{marginTop: 20, alignSelf: 'center'}}
              onPress={() => navigation.navigate('viewImage', {imgIndex: i})}>
              <Image
                source={v.img}
                style={{
                  width: dimension.width - 40,
                  height: 143,
                  resizeMode: 'cover',
                  borderRadius: 20,
                }}
              />
            </TouchableOpacity>
          ),
      )}
    </View>
  );
};

export default UserMedia;

const styles = StyleSheet.create({});
