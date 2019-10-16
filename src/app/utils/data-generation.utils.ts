import { RandomNumberUtils } from './random-numbers.utils';
import { NumberCardModel, CardStatus } from '@app/models';

export namespace DataGenerationUtils {

  export const getRandomNumbers = (
    minValue: number,
    maxValue: number,
    size: number
  ): Array<number> => {
    const randomNumbers: Set<number> = new Set();
    while (randomNumbers.size < size) {
      randomNumbers.add(RandomNumberUtils.getRandomIntInclusive(minValue, maxValue));
    }
    return [ ...randomNumbers ];
  };

  export const getNumberCards = (
    ids: Array<number>,
    randomValues: Array<number>
  ): Array<NumberCardModel> => {
    return [ ...randomValues, ...randomValues ]
    // make card object and fill default values
    .map((value: number, index: number) => ({
      value,
      status: CardStatus.Close,
      casing: '#',
      id: [ ...ids ][ index ]
    }))
    // sort by id
    .sort((item1: NumberCardModel, item2: NumberCardModel) => {
      if (item1.id < item2.id) {
        return -1;
      }
      if (item1.id > item2.id) {
        return 1;
      }
      return 0;
    });
  };
}
