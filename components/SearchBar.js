import { useState } from 'react';
import {
    View,
    Image,
    StyleSheet,
    TextInput
} from 'react-native';
//import FontAwesome
import FontAwesome from 'react-native-vector-icons/FontAwesome';
//imports de nos composants
import convertColor from '../modules/convertColor';

export default function SearchBar() {
    const handleMenu = () => { }
    const handleSearch = () => { }

    return (
        <View style={styles.background}>
            <FontAwesome style={styles.icons} name={'bars'} onPress={() => handleMenu()} />
            <View placeholder='Rechercher' style={styles.searchBar}>
                <FontAwesome style={[styles.icons, styles.searchIcon]} name={'search'} onPress={() => handleSearch()} />
                <TextInput placeholder='Rechercher' style={styles.search} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    background: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        marginBottom: 50,
        padding: 10,
        backgroundColor: convertColor('sucreroux'),
        borderRadius: 30,
    },
    icons: {
        color: 'white',
        marginLeft: 10,
        marginRight: 15,
        fontSize: 20,
    },
    searchBar: {
        width: '85%',
        paddingTop: 3,
        paddingBottom: 3,
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 30,
        flexDirection: 'row',
        backgroundColor: convertColor('sable'),
        textAlign: 'center',
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    searchIcon: {
        margin: 5,
    },
    search: {
        color: 'white',
        marginTop: 5,
        marginBottom: 5,
        fontSize: 18,
    },
});
