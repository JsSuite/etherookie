import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  TextInput,
  Button,
} from "react-native";
import Card from "./components/Card";
import { getBalanceOfAddr, getCurrentBlkHeight } from "./utils/AxiosActions";

const defaultAddr = "0xaEdd8BC2c9AbC2F7887fF4bbb33cA00874dB05A5";

export default function App() {
  const [currentBlkHeight, setCurrentBlkHeight] = React.useState();
  const [balanceOfAddr, setBalanceOfAddr] = React.useState();
  const [addr, setAddr] = React.useState(defaultAddr);

  React.useEffect(() => {
    const fetchCurrentBlkHeight = async () => {
      try {
        const currentTime = Math.floor(Date.now() / 1000);
        const data = await getCurrentBlkHeight({ currentTime });
        setCurrentBlkHeight(data.result);
      } catch (ex) {
        setCurrentBlkHeight(ex?.message);
      }
    };

    fetchCurrentBlkHeight();

    const blkHeightTimer = setInterval(() => fetchCurrentBlkHeight(), 1000);
    return () => clearInterval(blkHeightTimer);
  }, []);

  const fetchBalanceOfAddr = async () => {
    try {
      setBalanceOfAddr();
      const data = await getBalanceOfAddr({ addr });
      setBalanceOfAddr(data.result);
    } catch (ex) {
      setBalanceOfAddr(ex?.message);
    }
  };

  React.useEffect(() => {
    fetchBalanceOfAddr();
  }, []);

  const handleChangeAddr = (value) => {
    setAddr(value);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.textLogo}>ETHEROOKIE</Text>
      <Card>
        <Text style={styles.textTitle}>Ether Current Block Height</Text>
        <Text style={styles.textNumber}>
          {currentBlkHeight ?? (
            <ActivityIndicator size="large" color="#00ff00" />
          )}
        </Text>
      </Card>
      <Card>
        <Text style={styles.textTitle}>Ether Balance of Address</Text>
        <TextInput
          style={styles.input}
          value={addr}
          onChangeText={handleChangeAddr}
        />
        <Text style={styles.textNumber}>
          {balanceOfAddr ?? <ActivityIndicator size="large" color="#00ff00" />}
        </Text>
        <Button
          title="Click to View"
          color="#3fb63f"
          onPress={fetchBalanceOfAddr}
        />
      </Card>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121316",
    alignItems: "center",
    justifyContent: "center",
  },
  textLogo: {
    backgroundColor: "#000000",
    padding: 10,
    color: "#4eff4e",
    fontSize: 38,
  },
  textTitle: {
    color: "white",
    fontSize: 18,
  },
  textNumber: {
    color: "#33cc33",
    fontSize: 32,
  },
  input: {
    color: "white",
    backgroundColor: "gray",
    fontSize: 18,
    padding: 5,
    borderColor: "gray",
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 10,
  },
});
