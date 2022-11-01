import { StyleSheet, TextInput } from 'react-native';

export default function OurTextInput(props) {
  const {
    multiline,
    numberOfLines,
    onChangeText,
    placeholder,
    inputAndButton,
    secureTextEntry,
    customWidth,
  } = props;

  const propsStyle = inputAndButton && {
    flex: 1,
    marginRight: 10,
  };

  const widthStyle = customWidth && {
    width: customWidth,
  };

  return (
    <TextInput
      style={[styles.input, propsStyle, widthStyle]}
      placeholder={placeholder}
      onChangeText={(value) => onChangeText(value)}
      secureTextEntry={secureTextEntry}
      multiline={multiline}
      numberOfLines={numberOfLines}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    padding: 15,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 1,
    textAlignVertical: 'top',
  },
});
