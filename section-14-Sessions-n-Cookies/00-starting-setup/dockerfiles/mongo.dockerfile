# Use an official MongoDB image from the Docker Hub
FROM mongo:latest

# Copy your custom configuration file
COPY mongod.conf /etc/mongod.conf

# Expose MongoDB default port (27017)
EXPOSE 27017

# Define a default command to run MongoDB with the custom config file
CMD ["mongod", "--config", "/etc/mongod.conf"]
