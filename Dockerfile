FROM node
ENV MONGO_INITDB_ROOT_USERNAME=admin \
MONGO_INITDB_ROOT_PASSWORD=password 
RUN mkdir -p /home/node-app
COPY ./app /home/node-app
CMD ["node", "/home/app/server.js"]
