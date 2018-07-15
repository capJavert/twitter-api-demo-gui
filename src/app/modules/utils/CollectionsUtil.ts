/**
 * Created by mrelatic on 5.9.2016..
 */
export class CollectionsUtil {
  public static numOfItems(array: Array<any>): number {
    return (array === null || array === undefined) ? 0 : array.length;
  }
}

