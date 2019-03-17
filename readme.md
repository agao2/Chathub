
## How to start locally
The application is built using react, .net core, and postgres. To start the application locally for development you will need start each of these 3 core parts. 

1. In the core_server directory, execute `dotnet run` in a terminal. You may need to install all the despendencies, do this with the `dotnet restore` command. 

2. In the web_app directory, use the `npm start` command. Again you may need to install all the node modules, to do that do `npm install` in the same directory. 

3. You can download postgres for your os and run that server locally. If you do that look into the appsettings.json files and update the connection string for default connection accordingly. 
You can also run utilizing docker with the command:   
 `docker run -p 5432:5432 -v ./data:/var/lib/postgresql/data postgres `


## How to start in docker
In the same directory of the docker-compose.yaml file, do
1. docker-compose build . 
2. docker-compose up    
3. Watch the magic happen

## How to run in minikube
- Comming soon

