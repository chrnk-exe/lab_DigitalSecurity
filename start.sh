docker rm nginx server_app postgres
docker rmi dslabprod_api
docker-compose build
docker-compose up