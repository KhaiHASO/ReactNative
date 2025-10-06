import { View } from "react-native";
import PercentageDimensionsExample from "./12";
export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* <FixedDimensionsExample /> */}
      <PercentageDimensionsExample />
    </View>
  );
}
