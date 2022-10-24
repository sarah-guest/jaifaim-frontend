import { StyleSheet, View } from 'react-native';
import Button from './Button';
import TextInput from './TextInput';

export default function OurInputAndButton(props) {
  const { onChangeText, placeholder, onPress, icon, color } = props;

  return (
    <View style={styles.inputAndButton}>
      <TextInput
        onChangeText={(value) => onChangeText(value)}
        placeholder={placeholder}
        inputAndButton={true}
      />
      <Button icon={icon} color={color} onPress={onPress} />
    </View>
  );
}

const styles = StyleSheet.create({
  inputAndButton: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

// COMPOSANT INPUTANDBUTTON : 5 props
// onChangeText: variable, fonction qui récupère la valeur de l'input
// placeholder: string, placeholder de l'input
// onPress: variable, fonction qui exploite la valeur de l'input
// icon: string, nom de l'icône fontawesome du bouton
// color: string, couleur du bouton
