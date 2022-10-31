import * as React from 'react';
import { View, StyleSheet } from 'react-native';
//import FontAwesome
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
//imports de nos composants
import convertColor from '../modules/convertColor';
import OurText from './OurText';

export default function MenuMore({ navigation }) {

    return (
        <View style={styles.menu}>
            <View style={[styles.link, styles.notLastLink]}>
                <OurText body2
                    onPress={() => navigation.navigate('TabNavigation')}>
                    Paramètres
                </OurText>
                <FontAwesomeIcon name={'cog'} style={styles.icon} />
            </View>
            <View style={styles.link}>
                <OurText body2
                    onPress={() => navigation.navigate('TabNavigation')}>
                    Se déconnecter
                </OurText>
                <FontAwesomeIcon name={'sign-out'} style={styles.icon} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    menu: {
        position: 'absolute',
        top: 68,
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
        borderBottomLeftRadius: 20,
        padding: 15,
        width: 220,
        backgroundColor: convertColor('sable'),
    },
    link: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        paddingLeft: 5,
        paddingRight: 5,
        color: convertColor('marronfoncé'),
    },
    notLastLink: {
        borderBottomColor: convertColor('marronfoncé'),
        borderBottomWidth: 1,
        paddingBottom: 10,
        marginBottom: 10,
    },
    icon: {
        fontSize: 16,
        color: convertColor('marronfoncé'),
    }
})