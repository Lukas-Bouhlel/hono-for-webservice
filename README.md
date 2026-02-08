```
npm install
npm run dev
```

```
open http://localhost:3000
```

# Nginx In docker 
> Navigateur → localhost:9999 → Nginx (Docker) → Node (localhost:3000)

## Update .env

```
NGINX_PORT=9999
NGINX_HOST=nginx-c
```

_in /nginx_
```
docker build -t webserver . 
docker run -it -d -p 9999:9999 --env-file ../.env webserver
```

