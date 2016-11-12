FROM ubuntu

RUN mkdir /opt/parity
ADD parity /opt/parity/

COPY start.sh /
RUN chmod +x /start.sh

EXPOSE 8545
EXPOSE 30303

VOLUME /data

WORKDIR /opt/parity

CMD ["/start.sh"]