# Docker Notes

## What is a container

1. a way to package application with all the necessary dependencies and configurations
2. its Portable artifact and be easily shared and moved around
3. makes developments and deployment easy

### Where do containers live ?

- In a container repository (Special type of storage for containers )
- Private repos is where companies store their containers
- Public repository for docker (Docker Hub)

### Before containers

- Pre-containers: each one has their own environment/configurations where they have their libraries / frameworks / service on their OS

- Many steps to get this setup

### After Containers

- No need to install containers / service directly on your own OS
- its inside its own isolated environment
- containers will Package with all needed configurations
- one command to install the app
- same command for all

### Deployment process:

Team/Dev's produce artifacts + instructions on how to config ==> Operation team handles setting up the environment to deploy those applications
Problem: you will have to download everything on server (dependency version conflicts)
In case of misunderstanding: more details must be asked

with containers: both devs and operations work together to package the application in container
and no environmental configuration needed on server - except for docker runtime

### What is a container is technically

- its made of images
- layer of images
- on the base of those container you would have a linux base image because its small
- on top you have the application layer (e.g. postgres)

[ postgres:10.10 ] Layer - Application image

[ Intermediate layers ]

[ Intermediate layers ]

[ Intermediate layers ]

[ alphine:3.10 ] Layer - linux base image

## Commands:

- docker pull postgres(:9.6 <- specific version include) [to pull/install an image, unspecified version pulls latest]
- docker run <name> (creates a container) (adding -d will run it in detach mode (background))
- docker start/stop/exec <container> (start starts the container if stopped, stop stops it, and exec is used to run a new process or command inside an existing running docker container)
- for the docker exec there are options like -i (interactive standard input STDIN) and -t (a terminal screen emulator) combined -it
- [-i] -> provides input
- [-t] -> provide terminal interface
- [-it] -> provides both
- docker ps (lists all running containers and adding a -a flag shows all containers running and not running)
- for db e.g. docker exec -it pricewatch-db psql -U postgres -d pricewatch

## Image vs Container

- Image is the actual package with the configurations / service / start script basically the artifact
- Container is when you pull that image into your local machine and is actually running
- COntainer is the running environment for an Image

## Docker Vs Virtual Machine

- Docker runs on the host OS
    - Os (App <-> OS kernel <-> Hardware)
    - Docker virtualize the applications layers and uses the kernel of host <- Much faster
    - VM virtualize both OS kernel + applications (Entire OS) <- its size is much larger and must slower
    - You can run any VM of any OS on any Host OS but docker must run on their compatible os
- Different levels of abstractions
- Why linux based docker containers don't run windows

## Container Ports vs Host Ports

- Multiple containers can run on host machine
- your machine has only certain ports available
- Binding between a host machine and container occurs
- Port 5000 (on host machine) binds with Container running on port 5000
- port of host -> which container is bind to it? forward request to it
- Specifying binding port must be done on run command
- docker run -p6000:6379 [container]
-           host port : container port

## Debugging docker commands

- docker logs [container id or name]

- docker run vs docker start
- docker run creates a new container from an image
- docker start runs a container

## Docker network

- docker creates its own isolated docker network within host
- 2 containers can talk directly to each other with their container names
- docker network ls (lists docker networks)
- docker network create [name-of-network] (creates a network)
- oh also -e to set environmental variable
- --name in run command to specify name of container

    ```console
     docker run -d \ <- create container and run in detached mode
    -p 27017:27017 \ <- port
    -e MONGO_INITDB_ROOT_USERNAME=admin \ <- env var for container
    -e MONGO_INITDB_ROOT_PASSWORD=password \ <- env var for container
    --network mongo-network \ <- this container is in this docker network
    --name mongodb \ <- name of container set to
    mongo <- image to be used to create the container
    ```

## Docker compose

docker compose file allows us to automate starting containers

-start with the version of the docker compose file
-followed by the services:

- each service starts with the container name
- followed by their image, port, environmental variables

- you don't need to create a docker network for the container to communicate because thats automatically done for you by the docker compose file!

- when a container is stopped it loses all its data on next run , so you need a volume for persistence
- commands:
    - docker-compose -f [docker compose file] [up/down] <- up to run and down to stop
    - the down stops the containers and removes the network

## Packaging app to its own docker container (making a docker image) + Dockerfile

### What is a dockerfile ?

- Blue print for creating docker images
- syntax:
    - FROM [image name]
    - ENV variable=...
- RUN [linux command]
- COPY [dir] <- difference from the linux command is that the commands in run , run inside the linux container whilst the COPY executes on the HOST to the machine
- CMD ["node", "server.js"] <- basically executes an entry point linux command this commands translate to = "node server.js"
- CMD vs RUN , CMD is an entry level command only meant to be ran once

### Build the image using docker file

- docker build -t my-app:1.0 . [the dot at the end is basically saying use current directory as the build context / host location also it should have the Dockerfile]
- -t is the name of image
- then name:tag is the version
- the second required parameter is the allocation of the docker file (where it is)

### Image naming in docker registries

registerDomain/imageName:tag
In order to push image to a docker repository:
you need to tag it to let it know where to push (since its an external repo a short alias doesn't hit the domain)
Once you have the docker image inside a docker repo next step is running on the server
