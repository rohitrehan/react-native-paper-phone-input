import {
  StyleSheet,
  Dimensions,
  ViewStyle,
  ImageStyle,
  TextStyle,
} from "react-native";
const { width: viewportWidth, height: viewportHeight } =
  Dimensions.get("window");
export function wp(percentage: number) {
  const value = (percentage * viewportWidth) / 100;
  return Math.round(value);
}
export function hp(percentage: number) {
  const value = (percentage * viewportHeight) / 100;
  return Math.round(value);
}
interface Styles {
  container: ViewStyle;
  flagContainer: ViewStyle;
  flagButtonView: ViewStyle;
  flagButtonExtraWidth: ViewStyle;
  shadow: ViewStyle;
  dropDownImage: ImageStyle;
  textContainer: ViewStyle;
  codeText: TextStyle;
  numberText: TextStyle;
}
const styles: Styles = StyleSheet.create<Styles>({
  container: {
    width: wp(80),
    // backgroundColor: "white",
    flexDirection: "row",
  },
  flagContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  flagButtonView: {
    width: wp(25),
    height: "100%",
    // minWidth: 32,
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
  },
  flagButtonExtraWidth: {
    // width: wp(23),
  },
  shadow: {
    // shadowColor: "rgba(0,0,0,0.4)",
    // shadowOffset: {
    //   width: 1,
    //   height: 5,
    // },
    // shadowOpacity: 0.34,
    // shadowRadius: 6.27,
    // elevation: 10,
  },
  dropDownImage: {
    height: 14,
    width: 12,
  },
  textContainer: {
    flex: 1,
    // backgroundColor: "#F8F9F9",
    // paddingHorizontal: wp(4),
    // paddingVertical: hp(2),
    flexDirection: "row",
    alignItems: "center",
  },
  codeText: {
    // fontSize: 16,
    // marginRight: 10,
    // fontWeight: "500",
    // color: "#000000",
    textAlign: "left",
  },
  numberText: {
    // fontSize: 16,
    // color: "#000000",
    flex: 1,
  },
});

export default styles;
