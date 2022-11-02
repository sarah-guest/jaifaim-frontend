import { useState } from 'react';
import {
    View,
    Image,
    StyleSheet
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
//import FontAwesome
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
//imports de nos composants
import convertColor from '../modules/convertColor';
import OurText from '../components/OurText';
import Title from '../components/Title';
//imports du reducer
import { likeMeal, unLikeMeal } from '../reducers/likedMeals';

export default function Meal(props) {
    const { isScaledDown } = props;
    const scale = isScaledDown && {
        width: 240,
    }

    //Import du reducer
    const dispatch = useDispatch();

    //on récupère le tableau des like pour les tests : vérification de son contenu
    const liked = useSelector(state => state.user.value.liked)
    const handleLikeClick = () => {
        if (props.isLiked) {
            //si l'élément est dans le reducer, isLiked === true ; donc on l'enlève au clic
            dispatch(unLikeMeal(props.meal))
        } else {
            //sinon isLiked === false ; donc on l'ajoute au clic
            dispatch(likeMeal(props))
        }
    }
    const handlePageChangeOnClick = () => {
        props.selectMeal('CLICK OH');
    }

    return (
        <View style={[styles.background, scale]} isScaledDown>
            <Image source={{ uri: props.src }} style={styles.images} />
            <View style={styles.names}>
                <View style={styles.mealName} onPress={() => handlePageChangeOnClick()}>
                    <Title h5 isLight={true}>
                        {props.meal}
                    </Title>
                    <OurText body2 isLight={true}>
                        Par {props.restaurant}
                    </OurText>
                </View>
                <View style={styles.like}>
                    <FontAwesomeIcon style={styles.heart} name={props.isLiked ? "heart" : "heart-o"} onPress={() => handleLikeClick()} />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    background: {
        width: 300,
        marginRight: 30,
        padding: 10,
        backgroundColor: '#rgba(60, 35 ,18, .75)',
        // borderTopLeftRadius: 30,
        // borderBottomRightRadius: 30,
        borderRadius: 20,
    },
    images: {
        width: '100%',
        height: 120,
        // borderTopLeftRadius: 30,
        // borderBottomRightRadius: 30,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        marginBottom: 10,
    },
    names: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    mealName: {
        flex: 1,
    },
    like: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 34,
        height: 34,
        padding: 8,
        backgroundColor: convertColor('sucreroux'),
        borderRadius: 100,
    },
    heart: {
        fontSize: 18,
        color: 'white',
        fontWeight: 'regular',
    }
});
