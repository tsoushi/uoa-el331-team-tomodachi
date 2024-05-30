FROM python:3

WORKDIR /usr/src/app

COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt
RUN python -m spacy download en_core_web_sm

COPY . .
RUN mkdir data

ENV HOST=0.0.0.0
ENV PORT=8080
ENV DATABASE_PATH=data/database.db

EXPOSE 8080

CMD [ "python", "./main.py" ]
