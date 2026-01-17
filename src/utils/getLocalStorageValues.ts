import { LocalStorageValue } from '../types';

export function getValuesByRegex(regex: RegExp): LocalStorageValue[] {
  const matchedValues: LocalStorageValue[] = [];
  const keys = Object.keys(localStorage);

  keys.forEach((key) => {
    if (regex.test(key)) {
      const value = localStorage.getItem(key);
      if (value !== null) {
        matchedValues.push({ key, value });
      }
    }
  });

  return matchedValues;
}
