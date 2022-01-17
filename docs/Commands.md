# Commands

## Basic commands

| command | description | 
| ------- | ----------- |
| npm run dev | Development server |
| npm run build | Production build |
| npm start | Running node in production mode (is required run build command first) |
| npm run test | Run Jest Test's |
| npm run test:coverage | Run Jest Test's with coverage report |

## Production Commands with PM2
This project was configured with PM2 out of the bow, to run this project with PM2 you can use:

| command | description |
| ------- | ----------- |
| npm run prod:start | Start production server with PM2 |
| npm run prod:stop | Stop production server with PM2 |
| npm run prod:kill | Kill PM2 process|
| npm run prod:list | List PM2 process |

## Production Commands with Docker
| command | description |
| ------- | ----------- |
| docker build . -t <your-user/your-project> | Build the image |
| docker run -p 8080:8080 -d <your-user/your-project> | Run a container for the image |
| docker stop <container-id> | Stop and Down the container and server |

## Production Commands with Docker Compose
You can run docker-compose with `docker compose up` on the root directory of the project.


