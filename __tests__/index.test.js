import getdiff from '../src';

test('getdiff', () => {
  expect(
    getdiff(
      './__tests__/__fixtures__/before.json',
      './__tests__/__fixtures__/after.json',
    ),
  ).toEqual(
    '{\n\t  host: hexlet.io\n\t+ timeout: 20\n\t- timeout: 50\n\t- proxy: 123.234.53.22\n\t- follow: false\n\t+ verbose: true\n}',
  );
  expect(
    getdiff(
      './__tests__/__fixtures__/after.json',
      './__tests__/__fixtures__/before.json',
    ),
  ).toEqual(
    '{\n\t+ timeout: 50\n\t- timeout: 20\n\t- verbose: true\n\t  host: hexlet.io\n\t+ proxy: 123.234.53.22\n\t+ follow: false\n}',
  );
});
