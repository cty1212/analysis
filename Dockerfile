FROM node:16.13.1-alpine AS f0
WORKDIR /code
ADD . /code
RUN npm install pnpm -g --registry=https://registry.npm.taobao.org && pnpm install --registry=https://registry.npm.taobao.org && pnpm build
FROM nginx:1.22.1
COPY --from=f0 ./code/src/conf/default.conf /etc/nginx/nginx.conf
COPY --from=f0 ./code/dist /usr/share/nginx/html/analysis
EXPOSE 80