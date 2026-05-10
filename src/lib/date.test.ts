import { describe, expect, it } from '@jest/globals';
import { formatDate } from './date';

describe('formatDate', () => {
  it('should return valid date string when the input value is valid', () => {
    expect(formatDate(20220101)).toEqual('2022年1月1日');
    expect(formatDate(20220131)).toEqual('2022年1月31日');

    expect(formatDate(20220201)).toEqual('2022年2月1日');
    expect(formatDate(20220228)).toEqual('2022年2月28日');

    expect(formatDate(20220301)).toEqual('2022年3月1日');
    expect(formatDate(20220331)).toEqual('2022年3月31日');

    expect(formatDate(20220401)).toEqual('2022年4月1日');
    expect(formatDate(20220430)).toEqual('2022年4月30日');

    expect(formatDate(20220501)).toEqual('2022年5月1日');
    expect(formatDate(20220531)).toEqual('2022年5月31日');

    expect(formatDate(20220601)).toEqual('2022年6月1日');
    expect(formatDate(20220630)).toEqual('2022年6月30日');

    expect(formatDate(20220701)).toEqual('2022年7月1日');
    expect(formatDate(20220731)).toEqual('2022年7月31日');

    expect(formatDate(20220801)).toEqual('2022年8月1日');
    expect(formatDate(20220831)).toEqual('2022年8月31日');

    expect(formatDate(20220901)).toEqual('2022年9月1日');
    expect(formatDate(20220930)).toEqual('2022年9月30日');

    expect(formatDate(20221001)).toEqual('2022年10月1日');
    expect(formatDate(20221031)).toEqual('2022年10月31日');

    expect(formatDate(20221101)).toEqual('2022年11月1日');
    expect(formatDate(20221130)).toEqual('2022年11月30日');

    expect(formatDate(20221201)).toEqual('2022年12月1日');
    expect(formatDate(20221231)).toEqual('2022年12月31日');
  });

  it('should return valid date string when the input year is leap year', () => {
    expect(formatDate(20200229)).toEqual('2020年2月29日');
  });

  it('should return valid date string when the input value is wrong', () => {
    expect(formatDate(20220229)).toEqual('2022年3月1日');
  });
});
