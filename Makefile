install:
	npm install

start:
	npx babel-node src/bin/gendiff ./src/input/before.json ./src/input/after.json

publish:
	npm publish --dry-run

lint:
	npx eslint .