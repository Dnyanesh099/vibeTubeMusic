FROM openjdk:17-jdk-slim

WORKDIR /app

# Copy gradlew and grant execute permission
COPY gradlew .
RUN chmod +x gradlew

# Copy Gradle wrapper files (gradle directory and wrapper jar)
COPY gradle gradle
COPY gradle/wrapper/gradle-wrapper.jar gradle/wrapper/

# Copy all source files
COPY . .

# Run the Gradle build
RUN ./gradlew build --no-daemon

# Expose port 8080
EXPOSE 8080

# Run the built jar (adjust jar name as needed)
CMD ["java", "-jar", "build/libs/musicapp-0.0.1-SNAPSHOT.jar"]
