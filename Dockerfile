FROM node:16-alpine as build
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
COPY . ./

RUN npm install -f

RUN npm run build

FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 443
CMD ["nginx", "-g", "daemon off;"]