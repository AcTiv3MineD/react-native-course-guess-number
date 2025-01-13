import { StyleSheet, View } from "react-native";
import Colors from "../../constants/colors";

function Card({children}) {
    return (<View style={styles.card}>{children}</View>);
}

export default Card;

const styles = StyleSheet.create({
    card: {
        alignItems: 'center',
        backgroundColor: Colors.primary800,
        borderRadius: 8,
        marginTop: 100,
        marginHorizontal: 24,
        padding: 16,

        // ANDROID
        elevation: 4,

        //IOS
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 6,
        shadowOpacity: 0.25,
    },
});