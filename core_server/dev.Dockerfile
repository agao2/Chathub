FROM microsoft/dotnet:2.2-sdk
WORKDIR /src
COPY . . 
ENV ASPNETCORE_URLS http://*:5000
ENTRYPOINT ["dotnet", "run", "--server.urls", "http://*:5000"]
