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
| npm run pm2:start | Start production server with PM2 |
| npm run pm2:stop | Stop production server with PM2 |
| npm run pm2:kill | Kill PM2 process|
| npm run pm2:list | List PM2 process |

## Production Commands with Docker
| command | description |
| ------- | ----------- |
| docker build . -t <your-user/your-project> | Build the image |
| docker run -p 8080:8080 -d <your-user/your-project> | Run a container for the image |
| docker stop <container-id> | Stop and Down the container and server |

```
When you use docker the app is running on http://localhost:8080
```

## Production Commands with Docker Compose
You can run docker-compose with `docker compose up` on the root directory of the project.
```
When you use docker-compose this runs an Nginx on port 80, the node app on port 8080 and mongo on port 27017, and this is because the config was planned to use the Nginx as a reverse proxy.
If you want to use all the config you need to do the requests at http://localhost/api/*
```


