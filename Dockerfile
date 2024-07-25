FROM node:21.7.1-slim

RUN npm install -g @nestjs/cli@10.3.2

USER node

WORKDIR /home/node/app

CMD [ "tail", "-f", "/dev/null" ]