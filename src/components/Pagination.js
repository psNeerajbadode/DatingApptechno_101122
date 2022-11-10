import {StyleSheet, View} from 'react-native';
import React from 'react';
import TextFormatted from './TextFormatted';

const Pagination = ({position, title, subTitle}) => {
  return (
    <View>
      <TextFormatted
        style={{
          fontSize: 16,
          fontWeight: '700',
          color: '#fff',
          textAlign: 'center',
          marginTop: 20,
        }}>
        {title}
      </TextFormatted>
      <TextFormatted
        style={{
          fontSize: 14,
          fontWeight: '400',
          color: '#fff',
          textAlign: 'center',
          marginTop: 5,
        }}>
        {subTitle}
      </TextFormatted>
      <View style={{flexDirection: 'row', alignSelf: 'center', marginTop: 18}}>
        {Array(8)
          .fill('')
          .map((_, i) => (
            <View
              style={{
                height: 10,
                width: position == i + 1 ? 25 : 10,
                backgroundColor: '#fff',
                margin: 5,
                borderRadius: 15,
                opacity: position == i + 1 ? 1 : 0.3,
              }}
            />
          ))}
      </View>
    </View>
  );
};

export default Pagination;

const styles = StyleSheet.create({});
