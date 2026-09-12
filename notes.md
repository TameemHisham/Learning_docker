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
- docker run <name> (creates a container)
- docker start/stop/exec <container> (start starts the container if stopped, stop stops it, and exec is used to run a new process or command inside an existing running docker container)
- for the docker exec there are options like -i (interactive standard input STDIN) and -t (a terminal screen emulator) combined -it
- [-i] -> provides input
- [-t] -> provide terminal interface
- [-it] -> provides both

## Image vs Container

- Image is the actual package with the configurations / service / start script basically the artifact
- Container is when you pull that image into your local machine and is actually running
