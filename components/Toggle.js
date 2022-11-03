import * as React from 'react';
//import icons de FontAwesome
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { View, StyleSheet } from 'react-native';
import { useState } from 'react';
//Import de nos composants
import OurText from '../components/OurText';
import convertColor from '../modules/convertColor';

export default function Toggle(props) {
    const { question, answer } = props
    const [isHidden, setIsHidden] = useState(false);
    const handleToggle = () => {
        setIsHidden(!isHidden);
      };

    return (

        <View style={styles.questionAnswer}>
            <View style={styles.question}>
                <FontAwesomeIcon style={styles.plus}
                    name={isHidden ? 'minus' : 'plus'}
                    size={30}
                    onPress={() => handleToggle()} />
                <OurText body1>
                {question}
                </OurText>
            </View>
            {isHidden === true &&
                <View style={styles.answer}><OurText body1>Reponse: </OurText>
                    <OurText body2>{answer}</OurText>
                </View>
            }
        </View>

    );
};

const styles = StyleSheet.create({
    questionAnswer: {
        justifyContent: 'center',
        backgroundColor: convertColor('sable'),
        borderRadius: 20,
        overflow: 'hidden',
        marginBottom: 30,
      },
      question: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 10,
      },
      plus: {
        paddingRight: 15,
        justifyContent: 'center',
      },
      answer: {
        paddingLeft: 36,
        paddingTop: 10,
        paddingBottom: 15,
        backgroundColor: convertColor('caféaulaitchaud'),
      },
});