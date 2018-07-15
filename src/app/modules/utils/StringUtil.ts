import {ConditionsUtil} from "./ConditionsUtil";
export class StringUtil {
  /**
   * Replace substring at specified position with provided value
   * Replaces substring has same length as provided value
   */
  public static replaceSubstringWith(target: string, index: number, value: string): string {
    return target.substring(0, index) + value + target.substring(index + value.length);
  }

  /**
   *
   */
  public static buildString(length: number, character: string): string {
    let result = '';
    for (let _i = 0; _i < length; _i++) {
      result += character;
    }
    return result;
  }

  /**
   * Convert string to number
   */
  public static toNumber(value: string): number {
    let result: number = null;
    if (ConditionsUtil.isNotNull(value)) {
      result = Number(value);
    }
    return result;
  }

  /**
   * Pretty stringify JSON obj
   */
  public static stringifyPretty(value: any): string {
    let result: string = null;
    if (ConditionsUtil.isNotNull(value)) {
      // Add 4 spaces to each level
      result = JSON.stringify(value, null, 4);
    }
    return result;
  }
}
