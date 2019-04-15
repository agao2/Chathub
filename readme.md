
## How to start locally
The application is built using react, .net core, and postgres. To start the application locally for development you will need start each of these 3 core parts. 

1. In the core_server directory, execute `dotnet run` in a terminal. You may need to install all the despendencies, do this with the `dotnet restore` command.   
To set the environment, use the environment variable `ASPNETCORE_ENVIRONMENT`.   
`set ASPNETCORE_ENVIRONMENT=Development`   
`echo %ASPNETCORE_ENVIRONMENT%`    
Note that the environment defaults to production if no environment is set. 
Swagger if available for this api, go to `localhost:5000/swagger` to see the ui. 

2. In the web_app directory, use the `npm start` command. Again you may need to install all the node modules, to do that do `npm install` in the same directory.   
The web app is then accessible at localhost:3000
3. You can download postgres for your os and run that server locally. If you do that look into the appsettings.json files and update the connection string for default connection accordingly. 
You can also run utilizing docker with the command:   
 `docker run -p 5432:5432 -v ./data:/var/lib/postgresql/data postgres `

 To run the migrations for the database, use `dotnet ef database update --environment <environment>`


## How to start in docker
In the same directory of the docker-compose.yaml file, do
1. `docker-compose build .` 
2. `docker-compose up`    
3. Watch the magic happen , access the application on `localhost:3000`

## How to start in kubernetes
1. Setup ingress nginx, follow the steps at https://kubernetes.github.io/ingress-nginx/deploy/
2. Navigate to the kubernetes directory and do `kubectl apply -f ./`

This creates a set of kubernetes objects in our cluster including pods, clusterip, ingress, persistent volume claim, and probably more in the future. 


## Starting jenkins 
1. `docker build -t jenkins -f jenkins/Dockerfile`
2. `docker run --name -p 8080:8080 jenkins jenkins`

The first instruction contructs a image with jenkins and all the necessary tools and plugins added to it at image build time. 
The second instructions runs a container from that image and maps port 8080, the default port for jenkins

Please note that the plugins are listed in a plugins.txt folder. When editing this file on windows, make sure the line endings are converted back for linux as this could cause errors. 
If you see a lot of illegal characters and 404s and building the  jenkins image, try using `dos2unix plugins.txt` . 



