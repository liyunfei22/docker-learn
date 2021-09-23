# FROM ubuntu:latest
# EXPOSE 80
# RUN apt-get update && \
#     apt-get install nginx -y && \
#     apt-get clean && rm -rf /var/lib/apt/lists/*
# CMD ["nginx", "-g", "daemon off;"]
FROM node:node:lts-alpine
EXPOSE 3000
USER node
RUN mkdir -p /home/node/app
WORKDIR /home/node/app
COPY ./package.json .
RUN npm install
COPY . .
CMD ["npm", "run", "dev" ]
