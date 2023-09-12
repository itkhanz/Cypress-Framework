# This line specifies the base image for your Docker container. It uses an image named cypress/browsers with specific browser versions.
FROM cypress/browsers:node-20.5.0-chrome-114.0.5735.133-1-ff-114.0.2-edge-114.0.1823.51-1

# Create the folder where our project will be stored inside the contanier.
# RUN mkdir /cypress_chrome


# We make it our work-directory inside the container. All subsequent commands will be executed in this directory.
WORKDIR /cypress_docker

# Let's copy the essential files that we must use to run our scripts from your local machine into the container's /cypress_docker directory
COPY ./reporter-config.json .
COPY ./package.json .
COPY ./package-lock.json .
COPY ./cypress.config.js .
COPY ./cypress.env.json .
COPY ./cypress ./cypress
COPY ./settings ./settings


# Install the Cypress dependencies in the work directory
RUN npm install

# Executable commands the container will use[Exec Form]
# This sets the entry point for your Docker container to run the npm run command. 
# It means that when you start the container, it will execute the npm run command defined in the CMD instruction.
ENTRYPOINT ["npm", "run"] 

# This is an optional command that specifies the default command to run when the container starts
# In this case, it's an empty string, so it will use whatever command is specified in the npm run script when you start the container.
CMD [""]