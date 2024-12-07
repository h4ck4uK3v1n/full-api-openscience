Guide to Building and Running a Docker Image

1. # Build the Docker Image
Run the following command in the directory containing your Dockerfile:
        docker build -t api.open .

2. # Run the Docker Container
Once the image is built, start the container using:
    docker run --rm -p 3000:3000 -e NODE_ENV=development -e API_PORT=3000 -e API_MONGO_HOST=10.10.214.122 -e API_MONGO_PORT=27017 -e API_MONGO_USER=admin -e API_MONGO_PASS=admin -e API_MONGO_DB=db-open-science api.open

# Details for comand
docker run --rm -p 3000:3000 \
  -e NODE_ENV=development \
  -e API_PORT=3000 \
  -e API_MONGO_HOST=10.10.214.122 \  !important Change the ip address to that of your computer
  -e API_MONGO_PORT=27017 \
  -e API_MONGO_USER=admin \
  -e API_MONGO_PASS=admin \
  -e API_MONGO_DB=db-open-science \
  api.open

--rm: Automatically removes the container after it stops.
-p 3000:3000: Maps port 3000 of the container to port 3000 on the host.
-e: Defines environment variables needed by the application:
NODE_ENV=development: Sets the runtime environment.
API_PORT=3000: Port on which the API runs.
API_MONGO_HOST, API_MONGO_PORT, API_MONGO_USER, API_MONGO_PASS, API_MONGO_DB: MongoDB connection settings.
api.open: The name of the previously built image.