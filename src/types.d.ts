import { StyleProp, TextStyle, ViewStyle } from 'react-native';
import {
  CallingCode,
  Country,
  CountryCode,
} from '@rohitrehan/react-native-country-picker-modal';
import { CountryFilterProps } from '@rohitrehan/react-native-country-picker-modal/lib/CountryFilter';
import { TextInputProps } from 'react-native-paper';

export interface PhoneInputProps {
  withDarkTheme?: boolean;
  withShadow?: boolean;
  autoFocus?: boolean;
  defaultCode?: CountryCode;
  value?: string;
  defaultValue?: string;
  disabled?: boolean;
  disableArrowIcon?: boolean;
  placeholder?: string;
  onChangeCountry?: (country: Country) => void;
  onChangeText?: (text: string) => void;
  onChangeFormattedText?: (text: string) => void;
  renderDropdownImage?: JSX.Element;
  containerStyle?: StyleProp<ViewStyle>;
  textContainerStyle?: StyleProp<ViewStyle>;
  textInputProps?: TextInputProps;
  textInputStyle?: StyleProp<TextStyle>;
  codeTextStyle?: StyleProp<TextStyle>;
  flagButtonStyle?: StyleProp<ViewStyle>;
  countryPickerButtonStyle?: StyleProp<ViewStyle>;
  filterProps?: CountryFilterProps;
  countryPickerProps?: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  textSelectionColor?: string;
  flagSize?: number;
  showFlag?: boolean;
  showCountryCode?: boolean;
}
export interface PhoneInputState {
  code: CallingCode | undefined;
  number: string;
  modalVisible: boolean;
  countryCode: CountryCode;
  disabled: boolean;
}

export interface IPhoneInput {
  getCountryCode: () => CountryCode;
  getCallingCode: () => string | undefined;
  isValidNumber: (number: string) => boolean;
  getNumberAfterPossiblyEliminatingZero: () => {
    number: string;
    formattedNumber: string;
  };
}
