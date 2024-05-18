import React from 'react';
import {View} from 'react-native';
import Icon from 'react-native-vector-icons/Fontisto';

import CustomText from '../../../CustomText';
import {ICONS} from '../../../../constants/assets';
import {COLORS} from '../../../../constants/styles';
import styles from './CustomModalHeader.styles';

export interface ICustomModalHeaderProps {
  title: string;
  closeModal: () => void;
}

const CustomModalHeader: React.FC<ICustomModalHeaderProps> = ({
  title,
  closeModal,
}) => (
  <View style={styles.modalHeaderContainer}>
    <View style={styles.closeButtonContainer}>
      <Icon
        name={ICONS.FONTISTO.CLOSE}
        size={13}
        color={COLORS.SECONDARY_LIGHT}
        onPress={closeModal}
      />
    </View>
    <CustomText
      text={title}
      color={COLORS.GRAY_DEFAULT_DARKER}
      bodyType="medium-paragraph"
    />
  </View>
);

export default CustomModalHeader;
