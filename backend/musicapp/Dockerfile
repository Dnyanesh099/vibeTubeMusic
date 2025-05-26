# Use official OpenJDK 17 image
FROM openjdk:17-jdk-slim

# Set work directory
WORKDIR /app

# Copy gradle wrapper and build files
COPY gradlew .
COPY gradle gradle
COPY build.gradle .
COPY settings.gradle .

# Copy source code
COPY src src

# Make gradlew executable
RUN chmod +x gradlew

# Build the app
RUN ./gradlew build --no-daemon

# Expose port your app runs on (default 8080)
EXPOSE 8080

# Run the app
CMD ["java", "-jar", "build/libs/musicapp-0.0.1-SNAPSHOT.jar"]
