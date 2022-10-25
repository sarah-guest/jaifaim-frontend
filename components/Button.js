import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import convertColor from '../modules/convertColor';

export default function OurButton(props) {
  const { icon, onPress, text, color } = props;
  const containerStyle = {
    marginVertical: 10,
    backgroundColor: convertColor(color) || '#7F5539',
    borderRadius: 50,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 1,
  };

  // Si !props.text, bouton rond
  if (!text) {
    containerStyle.width = 50;
  }

  // Si props.text, contenu sera texte ; sinon, icône
  const buttonContent = text ? (
    <Text style={styles.buttonText}>{text}</Text>
  ) : (
    <FontAwesome name={icon} size={20} color='#ffffff' />
  );

  return (
    <View style={containerStyle}>
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'blanchedalmond',
  },
});

// COMPOSANT BOUTON : 4 props
// text (string) OU icon (string, nom de l'icône fontawesome)
// onPress (variable, nom de la fonction à appeler onPress)
// color (string, couleur de fond) ; cannelle (#7F5539) par défaut

// Si pas de texte, devient un bouton rond avec une icône !
