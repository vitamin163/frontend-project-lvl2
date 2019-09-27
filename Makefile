install:
	npm install

start:
	npx babel-node src/bin/gendiff ./__tests__/__fixtures__/inputFile/INI/deepBefore.ini ./__tests__/__fixtures__/inputFile/INI/deepAfter.ini

render:
	npx babel-node ./src/render.js

publish:
	npm publish --dry-run

lint:
	npx eslint .

test:
	npm run test

test-coverage:
	npm test -- --coverage