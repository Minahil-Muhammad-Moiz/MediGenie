import { Keyboard, KeyboardAvoidingView, Platform, Pressable, ScrollView, TouchableWithoutFeedback } from 'react-native';

const KeyboardAvoidingContainer = (props) => {
    return (
        <KeyboardAvoidingView
            style={{ flex: 1, backgroundColor: 'transparent' }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} >
                {props.children}
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
};

export default KeyboardAvoidingContainer;
