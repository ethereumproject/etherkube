FROM ubuntu

RUN apt-get update && apt-get -y install wget unzip

RUN mkdir /opt/geth
RUN wget https://github.com/ethereumproject/go-ethereum/releases/download/v3.0.1/geth-classic-linux-x64-65f1fbc.1.zip -O /opt/geth/master.zip
RUN unzip /opt/geth/master.zip

COPY start.sh /opt/geth/start.sh
RUN chmod +x /opt/geth/start.sh

EXPOSE 8545
EXPOSE 30303

VOLUME /data

WORKDIR /opt/geth

CMD ["/start.sh"]