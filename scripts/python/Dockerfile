FROM python:3.12-rc-slim

COPY requirements.txt requirements.txt

RUN pip3 install -r requirements.txt

COPY . .

COPY ./bash ./bash

RUN chmod +x ./bash/wait-for-it.sh

# Wait for the server to be up before running script.
CMD ./bash/wait-for-it.sh --host="$SERVER_HOST" --port="$SERVER_PORT" --strict --timeout=30 -- python3 api.py