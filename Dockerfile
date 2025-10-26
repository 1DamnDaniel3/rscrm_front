# сборка React
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./        
RUN yarn install
COPY src ./src          
COPY .env .env
COPY public ./public       
RUN yarn build

# финальный nginx
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html

# отдельно nginx конфиг
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
