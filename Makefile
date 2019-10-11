install:
	npm install

start:
	npx babel-node src/bin/gendiff ./__tests__/__fixtures__/deepBefore.ini ./__tests__/__fixtures__/deepAfter.ini


publish:
	npm publish --dry-run

lint:
	npx eslint .

test:
	npm test

test-coverage:
	npm test -- --coverage