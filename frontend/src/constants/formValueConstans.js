export const NUMBERS_AND_NATIONAL_LETTERS = /^[A-Za-z0-9ąćĆśŚęłŁńóżŻźŹ -.]+$/;
export const NIP_FORMAT = /^[0-9 -]+$/;
export const BANK_ACCOUNT_FORMAT = /^[A-Za-z0-9 ]+$/;
export const GPS_FORMAT = /^[0-9.]+$/;
export const ONLY_NUMBER = /^[0-9]+$/;
// export const FLOAT_NUMBER = /^\d+(?:\.\d+)?$/; to nie działa tzreba przesledzić wykorzystanie tego elementu
// np komponent FormInput
export const FLOAT_NUMBER = "^\\d.+$";
export const EMAIL_FORMAT = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
export const DESCRIPTION_PATTERN = "[A-Za-z0-9]{3,}";
export const NAME_PATTERN = "^[A-Za-ząĄćĆśŚęĘłŁńŃóÓżŻźŹ -.0-9&]{3,30}$";
export const LATITUDE_PATTERN = "^-?([1-8]\\d|90|[0-9])(\\.\\d+)?$";
export const LONGITUDE_PATTERN = "^-?(180|1[0-7]\\d|[1-9]\\d|[1-9])(\\.\\d+)?$";
export const POST_FORMAT = "^[0-9]{2}-[0-9]{3}$";
export const LONG_NAME_PATTERN = "^[A-Za-ząćęłńóśźżĄĆĘŁŃÓŚŹŻ -.0-9&]{3,50}$";
export const NUMBERS_PATTERN = /^[0-9]$/;
export const POST_NAME_PATTERN = "^[A-Za-ząćĆśŚęłŁńóżŻźŹ -.0-9]{3,30}$";
export const NO_BUILDING_PATTERN = "^(?!/|-|,)[0-9A-Za-z/,-]+(?<!/|,|-)$";
export const PL_BANKACCOUNT_PATTERN = "^PL[0-9]{2} [0-9]{4} [0-9]{4} [0-9]{4} [0-9]{4} [0-9]{4} [0-9]{4}$";
export const NIP_PATTERN = "^[0-9]{3}-[0-9]{3}-[0-9]{2}-[0-9]{2}$";
export const FIRST_NAME_PATTERN = "^[A-Za-ząćęłńóśźżĄĆĘŁŃÓŚŹŻ ]{3,20}$";
export const EMAIL_PATTERN = "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+[.][a-zA-Z]{2,3}";
export const PHONE_PATTERN = "^(?:(\\+\\d{2})\\s?)?\\d{3}\\s?\\d{3}\\s?\\d{3}$";
export const NUMBERS_AND_NATIONAL_LETTERS_50 = "^[A-Za-z0-9ąćĆśŚęłŁńóżŻźŹ -.]{0,50}$";
