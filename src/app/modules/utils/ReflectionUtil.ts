/**
 * Created by mradmin on 30.11.2016..
 */
export class ReflectionUtil {

  public static fetchFromObject(obj: any, prop: string) {
    // If obj is undefined, valueExpression was invalid. Return string value 'undefined'
    if (typeof obj === 'undefined') {
      return 'undefined';
    }
    // If obj is null, don't try to get it's attribute, it will cause exception. Return null
    if (obj === null) {
      return null;
    }
    let _index = prop.indexOf('.');
    if (_index > -1) {
      return this.fetchFromObject(obj[prop.substring(0, _index)], prop.substr(_index + 1));
    }
    return obj[prop];
  }

  public static mergeObjects(...objs: Array<any>): any {
    let result = {};
    for (let i = 0; i < objs.length; i++) {
      for (let attr in objs[i]) {
        if (objs[i].hasOwnProperty(attr)) {
          result[attr] = objs[i][attr];
        }
      }
    }
    return result;
  }
}
