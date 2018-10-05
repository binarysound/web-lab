FROM node:8.11.4
RUN curl -o- -L https://yarnpkg.com/install.sh | bash -s -- --version 1.9.4

ENV PORT=5000

RUN mkdir /build
WORKDIR /build
COPY package.json yarn.lock docker-entry.sh ./

RUN /root/.yarn/bin/yarn install
RUN chmod 744 docker-entry.sh

CMD ./docker-entry.sh
