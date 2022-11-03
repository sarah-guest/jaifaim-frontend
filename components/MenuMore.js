import * as React from 'react';
import { useDispatch } from 'react-redux';
import { View, StyleSheet } from 'react-native';
//import reducer
import { signOutUser } from '../reducers/user';
//import navigation
import { useNavigation } from '@react-navigation/native';
//import FontAwesome
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
//imports de nos composants
import convertColor from '../modules/convertColor';
import OurText from './OurText';
import OurButton from './Button';

export default function MenuMore() {
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const handleSignout = () => {
        dispatch(signOutUser());
        navigation.navigate('Landing');
    }

    return (
        <View style={styles.menu}>
            <View style={[styles.link, styles.notLastLink]}>
                <OurText body2
                    onPress={() => navigation.navigate('Faq')}>
                    FAQ
                </OurText>
                <FontAwesomeIcon name={'cog'} style={styles.icon} />
            </View>
            <View style={[styles.link, styles.notLastLink]}>
                <OurText body2
                    onPress={() => navigation.navigate('UserParameters')}>
                    Paramètres
                </OurText>
                <FontAwesomeIcon name={'cog'} style={styles.icon} />
            </View>
            <View style={styles.link}>
                <OurText body2
                    onPress={() => handleSignout()}>
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