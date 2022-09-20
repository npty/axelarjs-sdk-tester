build:
	docker build -t sdk-tester .

run:
	docker run --env-file .env sdk-tester
