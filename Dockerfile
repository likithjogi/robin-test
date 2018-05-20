FROM node:latest

MAINTAINER likithjogi@gmail.com

WORKDIR /opt

# Install NPM
RUN apt-get update && apt-get install -y sudo curl && \
#gcc g++ make  
	curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash - && \
#	curl -sL https://dl.yarnpkg.com/debian/pubkey.gpg && \
#	sudo apt-key add - && \
#   echo "deb https://dl.yarnpkg.com/debian/ stable main" && \
#	sudo tee /etc/apt/sources.list.d/yarn.list && \
	sudo apt-get install -y nodejs #&& \
#	sudo apt-get update && \
#	sudo apt-get update && sudo apt-get install yarn 

# Copy app to /opt
COPY . /opt

# Install app and dependencies into /src
RUN npm install

EXPOSE 8080 27017

CMD npm start