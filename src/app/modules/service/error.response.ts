
import {ConditionsUtil} from "../utils/ConditionsUtil";

export class ErrorResponse {
  errorCode: number;
  errorDetails: string;
  errorMessage: string;

  get isEmpty() {
    return !ConditionsUtil.isNotNullNorEmpty(this.errorMessage) && !ConditionsUtil.isNotNullNorEmpty(this.errorDetails);
  }
}
