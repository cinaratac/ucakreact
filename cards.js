import { Background } from "@react-navigation/elements"

import { View, Text, StyleSheet } from "react-native";
function Cards({context}){
    return (
        <View style={styles.card}>
            <Text style={styles.text}>{context}</Text>
        </View>
    )
}
const styles= StyleSheet.create({
    card:{
        backgroundColor: "lightgrey",
        width: 300,
        height: 100,
        marginBottom: 10,
        justifyContent: "center",
        alignItems: "center",
        
    },
    text: {
        alignItems: 'center',
        justifyContent: 'center'
    }

})
export default Cards