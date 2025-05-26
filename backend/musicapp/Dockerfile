FROM openjdk:17-jdk-slim

WORKDIR /app

COPY gradlew .
COPY gradle gradle
COPY build.gradle .
COPY settings.gradle .
COPY src src

RUN chmod +x gradlew
RUN ./gradlew clean build --no-daemon --stacktrace --info

EXPOSE 8080

CMD ["java", "-jar", "build/libs/musicapp-0.0.1-SNAPSHOT.jar"]
