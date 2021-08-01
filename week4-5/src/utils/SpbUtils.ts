import _ from "lodash";

export const StringUtils = {
  convertFirstLetterToUpperCase: (str: string) => {
    return str.charAt(0).toUpperCase() + str.substr(1, str.length);
  },
  isWithinRangeLength: (str: string, min: number, max: number) => {
    const length = str.length;
    return min <= length && length <= max;
  }
};

// TODO (tsnoh): 정규식 yellow error 해결해야함. \. 빠지면 작동 안됌  ex. tsnoh@superb   만 쳐도 이메일로 인식됨
export const RegexUtils = {
  isEmail: (email: string) => {
    const emailRule: any = /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    return emailRule.test(email) ? true : false;
  },
  hasSpecialLetter: (letter: string) => {
    const specialLetters: any = /[\x21-\x2F\x3A-\x40\x5B-\x60\x7B-\x7E]/g;
    return letter.match(specialLetters);
  },
  isLowercaseLetter: (letter: string) => {
    const lowercaseLetter: any = /^[a-z]/;
    return lowercaseLetter.test(letter);
  },
  hasLowercaseLetter: (letter: string) => {
    const lowercaseLetter: any = /[a-z]/g;
    return !!letter.match(lowercaseLetter);
  },
  hasUppercaseLetter: (letter: string) => {
    const uppercaseLetter: any = /[A-Z]/g;
    return !!letter.match(uppercaseLetter);
  },
  hasNumericDigit: (letter: string) => {
    const numericDigit: any = /[0-9]/g;
    return !!letter.match(numericDigit);
  },
  isInAscii: (letter: string) => {
    const ascii = /^[\x20-\x7F]+$/;
    return !!letter.match(ascii);
  },
  isNotValidPassword: (password: string) => {
    const hasUppercase: any = RegexUtils.hasUppercaseLetter(password);
    const hasLowercase: any = RegexUtils.hasLowercaseLetter(password);
    const hasNumber: any = RegexUtils.hasNumericDigit(password);
    return password.length < 8 || !hasUppercase || !hasLowercase || !hasNumber;
  },
  hasAlphaNumericAllowSpace: (letter: string) => {
    const alphaNumericAllowSpace: any = /[a-zA-Z0-9]/;
    return !!letter.match(alphaNumericAllowSpace);
  },
  hasAlphaNumericAndDash: (letter: string) => {
    const alphaNumericAndDash: any = /[a-z\d\x45]/g;
    const match: any = letter.match(alphaNumericAndDash);
    if (!match) return false;
    if (match[0] === "-") return false;
    if (match[match.length - 1] === "-") return false;
    if (match.length < letter.length) return false;

    return true;
  },
  addComma: (number: number) => {
    const regexp: any = /\B(?=(\d{3})+(?!\d))/g;
    return number.toString().replace(regexp, ",");
  },
  isGeneralNaming: (value: any) => {
    const isFirstLetterLowercase: any = RegexUtils.isLowercaseLetter(
      value.charAt(0)
    );
    const hasUppercaseLetter: any = RegexUtils.hasUppercaseLetter(value);
    const hasOtherSpecialLetters: any = !_.isEmpty(
      _.without(RegexUtils.hasSpecialLetter(value), "-")
    );
    const isAllInAsciiRange: any = RegexUtils.isInAscii(value);

    return (
      !isAllInAsciiRange ||
      !isFirstLetterLowercase ||
      hasUppercaseLetter ||
      hasOtherSpecialLetters
    );
  },
  isOnlyNumericDigit: (value: any) => {
    const numericDigit = /^[0-9]*$/g;
    return !!value.match(numericDigit);
  }
};
const padZero = (str: string, len: number) => {
  // tslint:disable-next-line: no-parameter-reassignment
  len = len || 2;
  // tslint:disable-next-line: prefer-array-literal
  const zeros = new Array(len).join("0");
  return (zeros + str).slice(-len);
};

// tslint:disable-next-line: variable-name
export const ColorUtils = {
  invertColor: (hex: any, bw: any) => {
    if (hex.indexOf("#") === 0) {
      // tslint:disable-next-line: no-parameter-reassignment
      hex = hex.slice(1);
    }
    // convert 3-digit hex to 6-digits.
    if (hex.length === 3) {
      hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    if (hex.length !== 6) {
      throw new Error("Invalid HEX color.");
    }
    // tslint:disable-next-line: one-variable-per-declaration
    let r: any = parseInt(hex.slice(0, 2), 16),
      g: any = parseInt(hex.slice(2, 4), 16),
      b: any = parseInt(hex.slice(4, 6), 16);
    if (bw) {
      // http://stackoverflow.com/a/3943023/112731
      return r * 0.299 + g * 0.587 + b * 0.114 > 186 ? "#000000" : "#FFFFFF";
    }
    // invert color components
    r = (255 - r).toString(16);
    g = (255 - g).toString(16);
    b = (255 - b).toString(16);
    // pad each with zeros and return
    // tslint:disable-next-line: prefer-template
    return "#" + padZero(r, 0) + padZero(g, 0) + padZero(b, 0);
  }
};

export const sleep = async (time = 1000) => {
  return await new Promise(resolve => setTimeout(resolve, time));
};

export const convertHashToObject = (hash: any) => {
  if (typeof hash !== "string") return;

  let str: any = hash;
  if (str[0] === "#") str = str.slice(1, hash.length);
  str = str.split("&");

  const object: any = {};
  for (let i = 0; i < str.length; i++) {
    const [key, value] = str[i].split("=");
    object[_.camelCase(key)] = value;
  }
  return object;
};
