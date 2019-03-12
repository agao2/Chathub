FROM microsoft/dotnet:2.2-sdk
WORKDIR /src
COPY . . 
CMD dotnet run
