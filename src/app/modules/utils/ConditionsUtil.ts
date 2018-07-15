/**
 * Created by mrelatic on 5.9.2016..
 */
export class ConditionsUtil {
  public static isNull(value: any): boolean {
    return value === null || value === undefined;
  }

  public static isNotNull(value: any): boolean {
    return value !== null && value !== undefined;
  }

  public static isTrue(value): boolean {
    return value === true;
  }

  public static isFalse(value): boolean {
    return value === false;
  }

  public static isNullOrEmpty(value: any): boolean {
    return value === null
      || value === undefined
      || ((typeof value === 'string' || value instanceof String) && value.trim().length === 0);
  }

  public static isNotNullNorEmpty(...values: Array<any>): boolean {
    if (this.isNull(values)) {
      return false;
    }
    for (let i = 0; i < values.length; i++) {
      let value = values[i];
      if (value === null) { return false; }
      if (value === undefined) { return false; }
      if ((typeof value === 'string' || value instanceof String) && value.trim().length === 0) { return false; }
      if (Array.isArray(value) && value.length === 0) { return false; }
    }
    return true;
  }
}
