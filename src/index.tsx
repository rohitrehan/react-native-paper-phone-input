import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';
import { PhoneNumberUtil } from 'google-libphonenumber';
import styles from './styles';
import { IPhoneInput, PhoneInputProps } from './types';
import { Text, TextInput } from 'react-native-paper';
import { Image, TouchableOpacity, View } from 'react-native';
import {
  CallingCode,
  Country,
  CountryCode,
  CountryModalProvider,
  CountryPicker,
  DARK_THEME,
  DEFAULT_THEME,
  Flag,
  getCallingCode,
} from '@rohitrehan/react-native-country-picker-modal';

const dropDown =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAi0lEQVRYR+3WuQ6AIBRE0eHL1T83FBqU5S1szdiY2NyTKcCAzU/Y3AcBXIALcIF0gRPAsehgugDEXnYQrUC88RIgfpuJ+MRrgFmILN4CjEYU4xJgFKIa1wB6Ec24FuBFiHELwIpQxa0ALUId9wAkhCnuBdQQ5ngP4I9wxXsBDyJ9m+8y/g9wAS7ABW4giBshQZji3AAAAABJRU5ErkJggg==';
const phoneUtil = PhoneNumberUtil.getInstance();

const PhoneInput = forwardRef<IPhoneInput, PhoneInputProps>(
  (
    {
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
      flagSize,
      showFlag,
      showCountryCode,
      defaultCode,
      disabled: disabledFromProps,
      value,
      defaultValue,
      onChangeText: onChangeTextProps,
      onChangeFormattedText,
      onChangeCountry,
    }: PhoneInputProps,
    ref,
  ) => {
    useImperativeHandle(ref, () => ({
      getCallingCode: () => code,
      getCountryCode: () => countryCode,
      isValidNumber: (number) => {
        try {
          const parsedNumber = phoneUtil.parse(number, countryCode);
          return phoneUtil.isValidNumber(parsedNumber);
        } catch (err) {
          console.warn(err);
          return false;
        }
      },
      getNumberAfterPossiblyEliminatingZero: () => {
        let num = number;
        if (num.length > 0 && num.startsWith('0')) {
          num = num.substr(1);
          return {
            number: num,
            formattedNumber: code ? `+${code}${num}` : num,
          };
        } else {
          return {
            number: num,
            formattedNumber: code ? `+${code}${num}` : num,
          };
        }
      },
    }));

    const [code, setCode] = useState<CallingCode>(defaultCode ?? '91');
    const [countryCode, setCountryCode] = useState<CountryCode>(
      defaultCode ?? 'IN',
    );
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [number, setNumber] = useState<string>(value ?? defaultValue ?? '');

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

    const onChangeText = useCallback(
      (text: string) => {
        setNumber(text);
        if (onChangeTextProps) {
          onChangeTextProps(text);
        }
        if (onChangeFormattedText) {
          if (code) {
            onChangeFormattedText(text.length > 0 ? `+${code}${text}` : text);
          } else {
            onChangeFormattedText(text);
          }
        }
      },
      [setNumber, onChangeFormattedText, code, onChangeTextProps],
    );

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
      return (
        <View style={styles.flagContainer}>
          {showFlag && (
            <Flag
              countryCode={countryCode}
              withFlagButton
              flagSize={flagSize || DEFAULT_THEME.flagSize}
            />
          )}
          {showCountryCode && code && (
            <Text style={[styles.codeText, codeTextStyle ? codeTextStyle : {}]}>
              ({`+${code}`})
            </Text>
          )}
        </View>
      );
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
              flagButtonStyle ? flagButtonStyle : {},
              countryPickerButtonStyle ? countryPickerButtonStyle : {},
            ]}
            disabled={disabledFromProps ?? false}
            onPress={() => setModalVisible(true)}
          >
            <CountryPicker
              onSelect={onSelect}
              withFilter
              withFlag
              withFlagButton
              withCallingCodeButton
              withCountryNameButton
              withModal
              withCallingCode
              filterProps={filterProps}
              countryCode={countryCode}
              visible={modalVisible}
              theme={withDarkTheme ? DARK_THEME : DEFAULT_THEME}
              renderFlagButton={renderFlagButton}
              onClose={() => setModalVisible(false)}
              {...countryPickerProps}
            />
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
            <TextInput
              style={[styles.numberText, textInputStyle ? textInputStyle : {}]}
              placeholder={placeholder ? placeholder : 'Phone Number'}
              onChangeText={onChangeText}
              value={number}
              editable={disabledFromProps ? false : true}
              selectionColor="black"
              keyboardAppearance={withDarkTheme ? 'dark' : 'default'}
              keyboardType="number-pad"
              autoFocus={autoFocus}
              {...textInputProps}
            />
          </View>
        </View>
      </CountryModalProvider>
    );
  },
);
PhoneInput.displayName = 'PhoneInput';

export default PhoneInput;

export const isValidNumber = (number: string, countryCode: CountryCode) => {
  try {
    const parsedNumber = phoneUtil.parse(number, countryCode);
    return phoneUtil.isValidNumber(parsedNumber);
  } catch (err) {
    console.warn(err);
    return false;
  }
};
