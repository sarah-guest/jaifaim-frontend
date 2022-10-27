import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import convertColor from '../modules/convertColor';

export default function OurButton(props) {
  const { isPressed, onPress, text } = props;

  const isPressedStyle = isPressed && {
    backgroundColor: convertColor('cannelle'),
    color: convertColor('sable'),
  };

  return (
    <TouchableOpacity>
      <Text style={[styles.tag, isPressedStyle]} onPress={onPress}>
        {text}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  tag: {
    marginRight: 6,
    marginBottom: 6,
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 100,
    backgroundColor: convertColor('caféaulaitfroid'),
    color: convertColor('marronfoncé'),
  },
});
