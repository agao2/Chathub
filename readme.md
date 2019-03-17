Db seems to persist ? , data might not be in repo
docker run -p 5432:5432 -v ./data:/var/lib/postgresql/data postgres ,
but i donnt see any data in folder