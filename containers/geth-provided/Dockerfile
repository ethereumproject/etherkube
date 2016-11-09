FROM ubuntu

RUN mkdir /opt/geth
ADD geth /opt/geth/

COPY start.sh /
RUN chmod +x /start.sh

EXPOSE 8545
EXPOSE 30303

VOLUME /data

WORKDIR /opt/geth

CMD ["/start.sh"]