FROM node
ENV MONGO_INITDB_ROOT_USERNAME=admin \
MONGO_INITDB_ROOT_PASSWORD=password 
RUN mkdir -p /home/app
COPY ./app /home/app
CMD ["node", "/home/app/server.js"]
