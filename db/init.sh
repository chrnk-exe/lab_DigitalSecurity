
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
	CREATE DATABASE awesomeblog;
	GRANT ALL PRIVILEGES ON DATABASE awesomeblog TO postgres;
EOSQL