FROM python:3
ENV PYTHONUNBUFFERED 1
RUN mkdir /code
WORKDIR /code
RUN apt-get -y update 
RUN apt-get install  -y binutils libproj-dev gdal-bin 

COPY entrypoint.sh /entrypoint.sh
COPY wait-for-it.sh /wait-for-it.sh

RUN chmod +x /wait-for-it.sh
RUN chmod +x /entrypoint.sh

ENTRYPOINT [ "/entrypoint.sh" ]
COPY requirements.txt /code/
RUN pip install -r requirements.txt
COPY . /code/
