FROM openjdk:8-jre
MAINTAINER Evgeniy Cheban <mister.cheban@gmail.com>

ADD ./target/user-service.jar /app/
CMD ["java", "-Xmx200m", "-jar", "/app/user-service.jar"]

EXPOSE 6000
