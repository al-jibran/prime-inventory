import React from 'react';
import { Modal as NativeModal, KeyboardAvoidingView, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    overlay: {
        backgroundColor: 'rgba(0,0,0,0.3)',
        flex: 1,
        justifyContent: 'flex-end',
    },
});

const Modal = ({ visible, children }) => {
    return (
        <NativeModal animated animationType={"fade"} transparent={true} visible={visible}>
            <KeyboardAvoidingView behavior='position' style={styles.overlay}>
                {children}
            </KeyboardAvoidingView>
        </NativeModal>
    );
};

export default Modal;