import { formatDate } from './date';

describe('formatDate', () => {
  it('should return valid date string when the input value is valid', () => {
    expect(formatDate('2022-01-01')).toEqual('2022年1月1日');
    expect(formatDate('2022-01-31')).toEqual('2022年1月31日');

    expect(formatDate('2022-02-01')).toEqual('2022年2月1日');
    expect(formatDate('2022-02-28')).toEqual('2022年2月28日');

    expect(formatDate('2022-03-01')).toEqual('2022年3月1日');
    expect(formatDate('2022-03-31')).toEqual('2022年3月31日');

    expect(formatDate('2022-04-01')).toEqual('2022年4月1日');
    expect(formatDate('2022-04-30')).toEqual('2022年4月30日');

    expect(formatDate('2022-05-01')).toEqual('2022年5月1日');
    expect(formatDate('2022-05-31')).toEqual('2022年5月31日');

    expect(formatDate('2022-06-01')).toEqual('2022年6月1日');
    expect(formatDate('2022-06-30')).toEqual('2022年6月30日');

    expect(formatDate('2022-07-01')).toEqual('2022年7月1日');
    expect(formatDate('2022-07-31')).toEqual('2022年7月31日');

    expect(formatDate('2022-08-01')).toEqual('2022年8月1日');
    expect(formatDate('2022-08-31')).toEqual('2022年8月31日');

    expect(formatDate('2022-09-01')).toEqual('2022年9月1日');
    expect(formatDate('2022-09-30')).toEqual('2022年9月30日');

    expect(formatDate('2022-10-01')).toEqual('2022年10月1日');
    expect(formatDate('2022-10-31')).toEqual('2022年10月31日');

    expect(formatDate('2022-11-01')).toEqual('2022年11月1日');
    expect(formatDate('2022-11-30')).toEqual('2022年11月30日');

    expect(formatDate('2022-12-01')).toEqual('2022年12月1日');
    expect(formatDate('2022-12-31')).toEqual('2022年12月31日');
  });

  it('should return valid date string when the input year is leap year', () => {
    expect(formatDate('2020-02-29')).toEqual('2020年2月29日');
  });

  it('should return valid date string when the input value is wrong', () => {
    expect(formatDate('2022-02-29')).toEqual('2022年3月1日');
  });
});
