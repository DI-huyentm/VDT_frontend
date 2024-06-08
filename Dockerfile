# Đầu tiên chúng ta sẽ có một stage chỉ để build trước image
FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# Tiếp theo ở bước triển khai chỉ cần kế thừa lại những files được build ở bước trên và cài đặt một số dependencies cần thiết cho việc chạy app
FROM node:20-alpine

WORKDIR /app

COPY --from=build /app/dist ./dist

COPY package*.json ./
RUN npm install --only=production

EXPOSE 5173

CMD ["npm", "run", "start"]