FROM ubuntu

RUN apt-get update && apt-get -y install wget

RUN mkdir /opt/parity
RUN wget http://d1h4xl4cr1h0mo.cloudfront.net/v1.4.3/x86_64-unknown-linux-gnu/parity_1.4.3_amd64.deb -O /opt/parity/parity_1.4.3_amd64.deb
RUN cp /opt/parity/parity_1.4.3_amd64.deb /var/cache/apt/archives/parity_1.4.3_amd64.deb
RUN dpkg -i /opt/parity/parity_1.4.3_amd64.deb

COPY start.sh /opt/parity/start.sh
RUN chmod +x /opt/parity/start.sh

EXPOSE 8545
EXPOSE 30303

VOLUME /data

WORKDIR /opt/parity

CMD ["/start.sh"]