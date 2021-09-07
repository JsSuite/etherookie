import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";

const Card = ({ children, ...props }) => {
  return <View style={styles.card}>{children}</View>;
};

const styles = StyleSheet.create({
  card: {
    margin: 15,
    width: Dimensions.get("window").width - 20,
    padding: 30,
    borderRadius: 4,
    shadowColor: "#585858",

    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5,
  },
});

export default Card;
