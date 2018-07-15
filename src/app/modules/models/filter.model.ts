import { ConditionsUtil } from "../utils/ConditionsUtil";

export abstract class FilterModel {
  toParams() {
    let params = {};

    for (let key of Object.keys(this)) {
      if (ConditionsUtil.isNotNullNorEmpty(this[key].toString())) {
        params[key] = this[key];
      }
    }

    return params;
  }
}
