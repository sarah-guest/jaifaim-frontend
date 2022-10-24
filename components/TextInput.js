import { StyleSheet, TextInput } from 'react-native';

export default function OurTextInput(props) {
  const { onChangeText, placeholder, inputAndButton } = props;
  const propsStyle = inputAndButton && {
    flex: 1,
    marginRight: 10,
  };

  return (
    <TextInput
      style={[styles.input, propsStyle]}
      placeholder={placeholder}
      onChangeText={(value) => onChangeText(value)}
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
  },
});
