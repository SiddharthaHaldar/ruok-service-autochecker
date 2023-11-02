FROM python:3.11.6-bullseye

RUN apt-get update

WORKDIR /code

COPY requirements.txt /code/requirements.txt
RUN pip install -r requirements.txt

COPY ./src/ /code

CMD ["python", "main.py"]