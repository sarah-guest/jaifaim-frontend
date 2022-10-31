import { useState } from 'react';
import {
    View,
    Image,
    StyleSheet,
    TextInput
} from 'react-native';
//import reducer
import { useSelector } from 'react-redux';
//import FontAwesome
import FontAwesome from 'react-native-vector-icons/FontAwesome';
//imports de nos composants
import convertColor from '../modules/convertColor';
import MenuMore from './MenuMore';

export default function SearchBar(props) {
    const [menu, setMenu] = useState(false);
    const [search, setSearch] = useState('');

    const handleMenu = () => {
        setMenu(!menu)
    }
    const handleSearch = () => {
        props.searchMeal(search)
    }
    const handleDeleteSearch = () => {
        props.searchMeal('')
        setSearch('')
    }

    return (
        <View style={styles.background}>
            <FontAwesome style={[styles.icons, { zIndex: 2 }]} name={menu ? 'times' : 'bars'} onPress={() => handleMenu()} />
            <View placeholder='Rechercher' style={styles.searchBar}>
                <TextInput placeholder='Rechercher' style={styles.searchInput} onChangeText={(value) => setSearch(value)} value={search} />
                {search !== '' &&
                    <FontAwesome style={[styles.icons, styles.searchIcon]} name={'times'} onPress={() => handleDeleteSearch()} />
                }
                <FontAwesome style={styles.icons} name={'search'} onPress={() => handleSearch()} />
            </View>
            {menu && <MenuMore />}
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
        zIndex: 1,
    },
    icons: {
        color: 'white',
        width: '10%',
        marginLeft: 10,
        fontSize: 20,
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '85%',
        paddingTop: 3,
        paddingBottom: 3,
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 30,
        backgroundColor: convertColor('sable'),
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    searchIcon: {
        marginLeft: 'auto',
    },
    searchInput: {
        color: 'white',
        marginTop: 5,
        marginBottom: 5,
        marginRight: 'auto',
        fontSize: 18,
    },
});
