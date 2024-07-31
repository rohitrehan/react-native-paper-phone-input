import React, { useEffect, useState } from "react";
import CountryPicker, {
  getCallingCode,
  DARK_THEME,
  DEFAULT_THEME,
  CountryModalProvider,
  Flag,
  CallingCode,
  Country,
  CountryCode,
} from "@rohitrehan/react-native-country-picker-modal";
import { PhoneNumberUtil } from "google-libphonenumber";
import styles from "./styles";
import { PhoneInputProps } from "./types";
import { Text, TextInput } from "react-native-paper";
import { Image, TouchableOpacity, View } from "react-native";

const dropDown =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAi0lEQVRYR+3WuQ6AIBRE0eHL1T83FBqU5S1szdiY2NyTKcCAzU/Y3AcBXIALcIF0gRPAsehgugDEXnYQrUC88RIgfpuJ+MRrgFmILN4CjEYU4xJgFKIa1wB6Ec24FuBFiHELwIpQxa0ALUId9wAkhCnuBdQQ5ngP4I9wxXsBDyJ9m+8y/g9wAS7ABW4giBshQZji3AAAAABJRU5ErkJggg==";
const phoneUtil = PhoneNumberUtil.getInstance();

const PhoneInput = ({
  withShadow,
  withDarkTheme,
  codeTextStyle,
  textInputProps,
  textInputStyle,
  autoFocus,
  placeholder,
  disableArrowIcon,
  flagButtonStyle,
  containerStyle,
  textContainerStyle,
  renderDropdownImage: renderDropdownImageFromProps,
  countryPickerProps = {},
  filterProps = {},
  countryPickerButtonStyle,
  layout = "first",
  flagSize,
  defaultCode,
  disabled: disabledFromProps,
  value,
  defaultValue,
  onChangeFormattedText,
  onChangeCountry,
}: PhoneInputProps) => {
  const [code, setCode] = useState<CallingCode>(defaultCode ?? "91");
  const [countryCode, setCountryCode] = useState<CountryCode>(
    defaultCode ?? "IN"
  );
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [number, setNumber] = useState<string>(value ?? defaultValue ?? "");

  useEffect(() => {
    if (defaultCode) {
      getCallingCode(defaultCode).then((code) => {
        setCode(code);
      });
    }
  }, [defaultCode]);

  const onSelect = (country: Country) => {
    setCode(country.callingCode[0]);
    setCountryCode(country.cca2);
    if (onChangeFormattedText) {
      if (country.callingCode[0]) {
        onChangeFormattedText(`+${country.callingCode[0]}${number}`);
      } else {
        onChangeFormattedText(number);
      }
    }
    if (onChangeCountry) {
      onChangeCountry(country);
    }
  };

  const onChangeText = (text: string) => {
    setNumber(text);
    // const { onChangeText, onChangeFormattedText } = this.props;
    if (onChangeText) {
      onChangeText(text);
    }
    if (onChangeFormattedText) {
      if (code) {
        onChangeFormattedText(text.length > 0 ? `+${code}${text}` : text);
      } else {
        onChangeFormattedText(text);
      }
    }
  };

  const renderDropdownImage = () => {
    return (
      <Image
        source={{ uri: dropDown }}
        resizeMode="contain"
        style={styles.dropDownImage}
      />
    );
  };

  const renderFlagButton = () => {
    if (layout === "first") {
      return (
        <Flag
          countryCode={countryCode}
          flagSize={flagSize ? flagSize : DEFAULT_THEME.flagSize}
        />
      );
    }
    return <View />;
  };

  return (
    <CountryModalProvider>
      <View
        style={[
          styles.container,
          withShadow ? styles.shadow : {},
          containerStyle ? containerStyle : {},
        ]}
      >
        <TouchableOpacity
          style={[
            styles.flagButtonView,
            layout === "second" ? styles.flagButtonExtraWidth : {},
            flagButtonStyle ? flagButtonStyle : {},
            countryPickerButtonStyle ? countryPickerButtonStyle : {},
          ]}
          disabled={disabledFromProps ?? false}
          onPress={() => setModalVisible(true)}
        >
          <CountryPicker
            onSelect={onSelect}
            withEmoji
            withFilter
            withFlag
            filterProps={filterProps}
            countryCode={countryCode}
            withCallingCode
            disableNativeModal={disabledFromProps ?? false}
            visible={modalVisible}
            theme={withDarkTheme ? DARK_THEME : DEFAULT_THEME}
            renderFlagButton={renderFlagButton}
            onClose={() => setModalVisible(false)}
            {...countryPickerProps}
          />
          {code && layout === "second" && (
            <Text
              style={[styles.codeText, codeTextStyle ? codeTextStyle : {}]}
            >{`+${code}`}</Text>
          )}
          {!disableArrowIcon && (
            <React.Fragment>
              {renderDropdownImageFromProps
                ? renderDropdownImageFromProps
                : renderDropdownImage()}
            </React.Fragment>
          )}
        </TouchableOpacity>
        <View
          style={[
            styles.textContainer,
            textContainerStyle ? textContainerStyle : {},
          ]}
        >
          {code && layout === "first" && (
            <Text
              style={[styles.codeText, codeTextStyle ? codeTextStyle : {}]}
            >{`+${code}`}</Text>
          )}
          <TextInput
            style={[styles.numberText, textInputStyle ? textInputStyle : {}]}
            placeholder={placeholder ? placeholder : "Phone Number"}
            onChangeText={onChangeText}
            value={number}
            editable={disabledFromProps ? false : true}
            selectionColor="black"
            keyboardAppearance={withDarkTheme ? "dark" : "default"}
            keyboardType="number-pad"
            autoFocus={autoFocus}
            {...textInputProps}
          />
        </View>
      </View>
    </CountryModalProvider>
  );
};
export default PhoneInput;

export const isValidNumber = (number: string, countryCode: CountryCode) => {
  try {
    const parsedNumber = phoneUtil.parse(number, countryCode);
    return phoneUtil.isValidNumber(parsedNumber);
  } catch (err) {
    return false;
  }
};
