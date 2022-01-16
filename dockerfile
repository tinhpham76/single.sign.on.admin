FROM mcr.microsoft.com/dotnet/sdk:5.0 AS build
EXPOSE 80
EXPOSE 443

WORKDIR /app

COPY ["./src/", "src/"]

RUN dotnet restore "src/single.sign.on.dashboard.csproj"

WORKDIR "/app/src"
RUN dotnet build "single.sign.on.dashboard.csproj" -c Release -o /app/build
RUN apt-get update && \
    apt-get install -y wget && \
    apt-get install -y gnupg2 && \
    wget -qO- https://deb.nodesource.com/setup_14.x | bash - && \
    apt-get install -y build-essential nodejs

FROM build AS publish
RUN dotnet publish "single.sign.on.dashboard.csproj" -c Release -o /app/publish

FROM mcr.microsoft.com/dotnet/aspnet:5.0
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "single.sign.on.dashboard.dll"]