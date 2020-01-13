FROM  node
#Copy files
RUN mkdir /opt/IBM
RUN mkdir /opt/IBM/frontend
COPY ./ /opt/IBM/frontend
WORKDIR /opt/IBM/frontend
#Install node depedencencies
WORKDIR /opt/IBM/frontend/nodeapp
#Start
CMD [ "npm", "start" ]