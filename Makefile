install:
	npm install

start:
	npx babel-node src/bin/gendiff ./__tests__/__fixtures__/inputFile/before.json ./__tests__/__fixtures__/inputFile/after.json

publish:
	npm publish --dry-run

lint:
	npx eslint .

test:
	npm run test

test-coverage:
	npm test -- --coverage