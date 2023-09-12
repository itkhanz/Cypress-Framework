# Run Cypress Tests on Docker

## Docker Setup

* Download the Docker Desktop
* Before Installing the Docker Desktop, Your Windows machine must meet the following [requirements](https://docs.docker.com/desktop/install/windows-install/#system-requirements) to successfully install Docker Desktop.
  * Make sure the system RAM, windows version,processor and the [BIOS virtualization](https://docs.docker.com/desktop/troubleshoot/topics/#virtualization) is enabled.
  * [How to install Linux on Windows with WSL](https://learn.microsoft.com/en-us/windows/wsl/install)
  * Run `wsl --install` in PowerShell to install WSL that will download and install Ubuntu latest version. It may ask to restart the PC.
* Now install the Docker-Desktop. After Installation, check by running the following command to see if the Docker is successfully installed `docker -v`
* Optionally also Install Docker extension from Microsoft in VS Code.

## Dockerfile

* Create `Dockerfile` in your project root.
* We named our docker image as `cypress_docker` in Dockerfile so we use the same name later to build the image, and run containerized tests.

## Run Tests

### Without docker-compose

* Execute the following command to build the docker image `docker build -t <image_name> .`
* `docker run -i -v ${PWD}:/cypress_docker -t cypress_docker:latest test:all` is equivalent of running `npx cypress run` locally which will run all test specs inside the docker container.
* Run the `docker run -i -v ${PWD}:/cypress_docker -t cypress_docker:latest test:registration -- --env environmentName="local",grepTags="@smoke" --headed chrome` which will run the cypress tests inside docker container.
  * It mounts the current local directory to cypress_docker directory inside container so that videos and reports can be exported.
  * Since we gave the ENTRYPOINT as `npm run`, so we can call any script from our package.json
  * For example, the above command will run `test:registration` script with additional environment variables supplied to it for environment, tags, and browser.

### With docker-compose

* Add the following lines of code to `docker-compose.yml`
```yaml
version: '3'
services:
  cypress:
    image: cypress_docker:latest  # Replace with the name and tag of your Docker image
    volumes:
      - .:/cypress_docker
    working_dir: /cypress_docker
    command: test:all
```
* `docker-compose up` command will run all the cypress tests inside docker.
* Alternatively, if you wish to combine the build of your Docker image and the execution of Docker Compose in a single command by using the `docker-compose build` and `docker-compose up` commands together. Here's how you can do it
  * Update your `docker-compose.yml` file to include the Dockerfile build configuration. We name the new file as `docker-compose-build.yml`
  ```yaml
  version: '3'
  services:
    cypress:
      build:
        context: .
        dockerfile: Dockerfile  # Specify the path to your Dockerfile
      volumes:
        - .:/cypress_docker
      working_dir: /cypress_docker
      command: test:all
  ```
  * In this updated configuration:
    * `build` specifies that you want to build an image.
    * `context` specifies the build context, which is set to . to use the current directory.
  * `dockerfile` specifies the path to your Dockerfile, which should be in the same directory as your docker-compose.yml.
* Run both the build and the service using a single docker-compose command: `docker-compose -f docker-compose-build.yml up --build`
  * This command tells Docker Compose to use the `docker-compose-build.yml` file instead of the default `docker-compose.yml`
  * The `--build` flag tells Docker Compose to rebuild the service's image before starting it. This way, Docker Compose will first build the Docker image based on your Dockerfile, and then it will start the service, executing the specified command (`npm run test:all`) inside the container.
* To run cypress tests on multiple browsers, use `docker-compose -f docker-compose-browsers.yml up` command to spin separate containers that will run tests on chrome, firefox, and edge.
  * Inspect the container logs in `Docker Desktop` to see the output clearly
  * To save the report, and media seprately for each container, configure different WORKDIR for each service with a a different Dockerfile
  
## Resources

* [Cypress Docker](https://docs.cypress.io/examples/docker)
* [Cypress Docker GitHub](https://github.com/cypress-io/cypress-docker-images)
* [Cypress Docer hub](https://hub.docker.com/u/cypress)
* [How to Run Cypress in Docker With a Single Command](https://www.cypress.io/blog/2019/05/02/run-cypress-with-a-single-docker-command/)
* [Cypress Docker Tutorial: A Step-by-Step Guide With Examples](https://www.lambdatest.com/learning-hub/cypress-docker)
