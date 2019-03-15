FROM microsoft/dotnet:2.2-sdk
WORKDIR /src
COPY . . 
ENV ASPNETCORE_ENVIRONMENT=Docker
ENTRYPOINT ["dotnet", "run"]
