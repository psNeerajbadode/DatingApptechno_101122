import {StyleSheet} from 'react-native';
import React from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';
import {useSelector} from 'react-redux';
import {theme} from '../utils/Constants';
import Statusbar from './Statusbar';

const BottomSheet = ({
  children,
  refRBSheet,
  height,
  closeOnDragDown,
  closeOnPressBack,
  closeOnPressMask,
  onClose,
}) => {
  const ThemeMode = useSelector(state => state.Theme);
  return (
    <RBSheet
      ref={refRBSheet}
      height={height}
      closeOnDragDown={closeOnDragDown || true}
      //   openDuration={250}
      closeOnPressMask={closeOnPressMask}
      closeOnPressBack={closeOnPressBack}
      onClose={onClose}
      customStyles={{
        draggableIcon: {backgroundColor: '#8490AE', height: 4, width: 36},
        container: {
          borderTopRightRadius: 40,
          borderTopLeftRadius: 40,
          backgroundColor: ThemeMode.selectedTheme
            ? theme.colors.primary
            : theme.colors.primaryBlack,
        },
      }}>
      <Statusbar backgroundColor={'#00000077'} />
      {children}
    </RBSheet>
  );
};

export default BottomSheet;

const styles = StyleSheet.create({});
