import React from "react"
import { StyleSheet, Image, View } from "react-native"
import Button from "./components/Button"
import { useFonts } from "expo-font"
import { setScene } from "./api/index.mjs"

export default function App() {
  const [fontsLoaded] = useFonts({
    Grotesque: require("./assets/basis-grotesque-regular-pro.ttf"),
  })

  if (!fontsLoaded) {
    return null
  }

  return (
    <View style={styles.container}>
      <View style={styles.behind}>
        <Image
          style={styles.logo}
          source={require("./assets/cloud-menu.jpg")}
        />
      </View>
      <View style={styles.front}>
        <View style={styles.spacer}></View>
        <View style={styles.buttonBar}>
          <Button
            title="Home"
            style={styles.button}
            onPress={() => setScene("home")}
          />
          <div style={styles.hspacer}>&nbsp;</div>
          <Button
            title="Bedtime"
            style={styles.button}
            onPress={() => setScene("bedtime")}
          />
          <div style={styles.hspacer}>&nbsp;</div>
          <Button
            title="Hibernate"
            style={styles.button}
            onPress={() => setScene("hibernate")}
          />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  behind: {
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    left: 0,
    top: 0,
    width: "100%",
    height: "100%",
    zIndex: -1,
  },
  front: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
  },
  spacer: {
    flex: 1,
    flexGrow: 1.25,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  hspacer: {
    width: "3vw",
  },
  buttonBar: {
    flex: 1,
    flexGrow: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    // columnGap: '3vw',
  },
  button: {
    marginLeft: "5rem",
    marginRight: "5rem",
  },
  overlay: {
    postion: "absolute",
    top: 0,
    left: 0,
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#000",
    alignItems: "stretch",
    flexGrow: 1,
    justifyContent: "stretch",
  },
  vertical: {
    padding: "10vh",
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#000",
    alignItems: "stretch",
    flexGrow: 1,
    justifyContent: "center",
  },
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#000",
    alignItems: "stretch",
    flexGrow: 1,
    justifyContent: "stretch",
  },
  horizontal: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#000",
    alignItems: "stretch",
    flexGrow: 1,
    justifyContent: "center",
  },
  left: {
    flex: 1,
    alignItems: "center",
    flexGrow: 1,
    justifyContent: "flex-start",
  },
  right: {
    flex: 1,
    flexGrow: 1,
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
  center: {
    flex: 1,
    flexGrow: 1,
    justifyContent: "center",
  },
  logo: {
    width: "100vw",
    height: "100vh",
    resizeMode: "cover",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "start",
  },
  message: {
    flex: 1,
    alignItems: "center",
    // justifyContent: 'center',
  },
})
