FROM ubuntu

RUN apt-get update && apt-get -y install wget unzip

RUN mkdir /opt/geth
RUN wget https://github.com/ethereumproject/go-ethereum/releases/download/v3.2.3/geth-classic-linux-x64-2b51918.zip -O /opt/geth/master.zip
RUN cd /opt/geth && \
    unzip master.zip

COPY start.sh /opt/geth/start.sh
RUN chmod +x /opt/geth/start.sh

EXPOSE 8545
EXPOSE 30303
EXPOSE 30303/udp

VOLUME /data

WORKDIR /opt/geth

CMD ["/opt/geth/start.sh"]