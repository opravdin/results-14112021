# FROM tiangolo/uwsgi-nginx-flask:python3.8
# RUN pip install torch==1.7.0+cpu torchvision==0.8.1+cpu torchaudio==0.7.0 -f https://download.pytorch.org/whl/torch_stable.html
# COPY ./app /app/
# RUN pip install -r ./requirements.txt
FROM ubuntu:latest
RUN apt-get update -y
RUN apt-get install -y python3-pip python3-dev build-essential
COPY ./app /app
WORKDIR /app
RUN pip3 install -r requirements.txt
# RUN pip3 install faiss-cpu torch transformers pyaspeller sklearn pandas 
RUN pip3 install faiss-cpu pyaspeller sklearn pandas 
WORKDIR /app/flask_app
CMD ["python3","/app/flask_app/main.py"]