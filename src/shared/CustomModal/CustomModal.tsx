import React from 'react';
import { Modal, KeyboardAvoidingView, View } from 'react-native';

import CustomModalHeader from './components/CustomModalHeader';
import styles from './CustomModal.styles';

export interface ICustomModalProps {
  visible: boolean;
  title: string;
  children: React.ReactNode;
  onRequestClose: () => void;
}

const CustomModal: React.FC<ICustomModalProps> = ({
  visible,
  children,
  title,
  onRequestClose,
}) => (
  <Modal
    visible={visible}
    transparent
    statusBarTranslucent
    animationType="fade"
    onRequestClose={onRequestClose}
  >
    <KeyboardAvoidingView
      behavior="padding"
      style={styles.modalBackgroundContainer}
    >
      <View style={styles.modalContainer}>
        <CustomModalHeader title={title} closeModal={onRequestClose} />
        {children}
      </View>
    </KeyboardAvoidingView>
  </Modal>
);

export default CustomModal;
