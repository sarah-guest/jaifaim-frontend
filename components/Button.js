import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import convertColor from '../modules/convertColor';

// COMPOSANT BOUTON : 4 props
// text (string) OU icon (string, nom de l'icône fontawesome)
// onPress (variable, nom de la fonction à appeler onPress)
// color (string, couleur de fond) ; cannelle (#7F5539) par défaut

export default function Button(props) {
  const { icon, onPress, text, color } = props;
  const conditionalColor = {
    marginVertical: 10,
    backgroundColor: convertColor(color) || '#7F5539',
    borderRadius: 50,
  };

  // Si !props.text, bouton devient rond
  if (!text) {
    conditionalColor.width = 50;
  }

  // Si props.text, contenu sera texte ; sinon, icône
  const buttonContent = text ? (
    <Text style={styles.buttonText}>{text}</Text>
  ) : (
    <FontAwesome name={icon} size={20} color="#ffffff" />
  );

  return (
    <View style={conditionalColor}>
      <TouchableOpacity style={styles.button} onPress={() => onPress()}>
        {buttonContent}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 15,
    flex: 0,
    justifyContent: 'center', // centrer le texte dans le button
    alignItems: 'center', // centrer le texte dans le button
  },
  buttonText: {
    color: 'blanchedalmond',
  },
});
