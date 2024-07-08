## Notes

$ docker-compose up -d
$ docker ps
$ docker-compose exec postgres-container psql -U postgres -d nestjs-tenant-lab
$ docker-compose down

nestjs-tenant-lab=# \dn -- List all schemas
nestjs-tenant-lab=# \dt -- List all tables in the current schema
nestjs-tenant-lab=# \dt public.* -- List all tables in the public schema
nestjs-tenant-lab=# \dt *.* -- List all tables with schema names
nestjs-tenant-lab=# \df public.* -- List all functions in the public schema
nestjs-tenant-lab=# \dv public.* -- List all views in the public schema
nestjs-tenant-lab=# \q -- Exit psql


##

http://localhost:3000/?tenantId=public
http://localhost:3000/?tenantId=hello-1