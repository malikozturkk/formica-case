# Formica Case

Bu proje, verilen case çalışması kapsamında geliştirilmiştir.

## Proje Bağlantıları

- **GitHub Repo:** [Formica Case](https://github.com/malikozturkk/formica-case)
- **Prod Ortamı:**
  - **Frontend:** [http://167.99.47.70](http://167.99.47.70)
  - **Swagger:** [http://167.99.47.70:4000/swagger](http://167.99.47.70:4000/swagger)

## Test Kullanıcıları

| Email | Şifre |
|--------|--------|
| malik@malik.com | 123123a |
| test@malik.com | 123123b |
| ataturk@ata.com | 1881a |

## Kurulum ve Çalıştırma

Proje Dockerize edilmiştir. Ortam değişkenlerini içeren `.env` dosyalarını ekledikten sonra aşağıdaki komut ile projeyi çalıştırabilirsiniz:

```sh
docker-compose -f docker-compose.dev.yml up -d
```

Veritabanı bilgileri `.env` dosyalarında tanımlıdır. Database’i doldurmak için aşağıdaki seed komutunu çalıştırabilirsiniz:

```sh
yarn ts-node prisma/seed.ts
```

## Ortam Değişkenleri (.env) İçerikleri

### **formica-case/.env**
```env
POSTGRES_DB=formica
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_USER=malik
POSTGRES_PASSWORD=123123
DATABASE_URL=postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:${POSTGRES_PORT}/${POSTGRES_DB}?schema=public
```

### **formica-case/backend/.env**
```env
POSTGRES_DB=formica
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_USER=malik
POSTGRES_PASSWORD=123123
DATABASE_URL=postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:${POSTGRES_PORT}/${POSTGRES_DB}?schema=public

JWT_SECRET=1e1e5efdf1f2e335ee9fbf6cbaf8a5c7
JWT_REFRESH_SECRET=b8bb98651e7d120be075b26914f98ab1
CLIENT_BASE_URL=http://localhost:3000
```

### **formica-case/frontend/.env**
```env
NEXT_PUBLIC_API_URL=http://localhost:4000
API_URL=http://backend:4000
```
