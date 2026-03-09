FROM node:18-alpine

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm install

COPY . .

# Vite'ın tüm arayüzleri dinlemesi için build argümanı eklenebilir
# ancak development modunda hızlı ayağa kaldırmak için doğrudan dev komutu
EXPOSE 3000

CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "3000"]
