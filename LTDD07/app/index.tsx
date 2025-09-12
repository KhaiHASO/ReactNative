import { View } from "react-native";
import FixedDimensionsExample from "./11";
export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <FixedDimensionsExample />
    </View>
  );
}
