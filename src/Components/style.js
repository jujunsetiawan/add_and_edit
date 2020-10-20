import {StyleSheet} from "react-native"

const styles = StyleSheet.create({
       view1: {
        backgroundColor: "dodgerblue",
        width: "100%",
        height: 40,
        justifyContent: "center"
      },
      view2: {
        backgroundColor: "#77acd1",
        height: "100%",
      },
      view3: {
        backgroundColor: "#f1f1f1",
        height: 40,
        width: 260,
        alignSelf: "center",
        marginTop: 5,
        borderRadius: 20,
        flexDirection: "row",
        justifyContent: "center",
        justifyContent: "space-between",
        
      },
      view4: {
        borderColor: "#f1f1f1",
        borderWidth: 1,
        width: 250,
        height: 40,
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        borderRadius: 20
      },
      text1: {
        color: "white",
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center"
      },
      text2: {
        color: "white",
        alignSelf: "center",
        marginTop: 5
      },
      image1: {
        height: 100,
        width: 100,
        alignSelf: "center",
        borderRadius: 50,
        marginTop: 40,
        borderWidth: 1,
        borderColor: "#f1f1f1",
      }
})

export default styles;