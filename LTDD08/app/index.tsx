import { View } from "react-native";
import ButtonDemo from "./1-view";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ButtonDemo />
    </View>
  );
}
