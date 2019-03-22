FROM microsoft/dotnet:2.2-aspnetcore-runtime AS base
WORKDIR /app
EXPOSE 80

FROM microsoft/dotnet:2.2-sdk AS publish
WORKDIR /src
COPY . . 
RUN dotnet restore core_server.csproj
RUN dotnet publish core_server.csproj -c Release -o /app

FROM base AS final 
WORKDIR /app
COPY --from=publish /app .
ENV ASPNETCORE_ENVIRONMENT=Docker
ENTRYPOINT ["dotnet", "core_server.dll"]

# app listens on port 5000, might want to map that port to access it. 