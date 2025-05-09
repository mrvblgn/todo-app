# Todo App

Modern ve kullanıcı dostu bir Todo uygulaması. Laravel ve React kullanılarak geliştirilmiş, JWT tabanlı kimlik doğrulama sistemi ile güvenli bir şekilde çalışan web uygulaması.

## 🚀 Özellikler

- 🔐 JWT tabanlı kimlik doğrulama sistemi (Bonus)
- 📝 Todo oluşturma, düzenleme, silme ve tamamlama
- 📁 Kategori yönetimi (Bonus)
- 🎨 Modern ve responsive tasarım (Tailwind CSS)
- 🔄 Gerçek zamanlı durum yönetimi (Redux Toolkit)
- 📱 Mobil uyumlu arayüz
- ⚡ Hızlı ve optimize edilmiş performans

## 🛠️ Teknoloji Stack'i

### Backend
- Laravel 12.0
- PHP 8.4.1
- MySQL
- JWT Authentication
- Laravel Sanctum

### Frontend
- React 18
- Vite
- Redux Toolkit
- React Router DOM
- Tailwind CSS
- Headless UI
- React Hook Form
- Yup (Form validasyonu)
- React Toastify
- Axios

## 📋 Kurulum Adımları

### Backend Kurulumu

1. Projeyi klonlayın:
```bash
git clone [repo-url]
cd todo-app
```

2. Composer bağımlılıklarını yükleyin:
```bash
composer install
```

3. `.env` dosyasını oluşturun:
```bash
cp .env.example .env
```

4. Uygulama anahtarını oluşturun:
```bash
php artisan key:generate
```

5. JWT secret key'i oluşturun:
```bash
php artisan jwt:secret
```

6. Veritabanı ayarlarını yapılandırın:
- `.env` dosyasında veritabanı bilgilerinizi güncelleyin
- Veritabanını oluşturun
- Migrationları çalıştırın:
```bash
php artisan migrate
```

### Frontend Kurulumu

1. Node.js bağımlılıklarını yükleyin:
```bash
npm install
```

2. Geliştirme sunucusunu başlatın:
```bash
npm run dev
```

## 🚀 Çalıştırma Talimatları

1. Backend sunucusunu başlatın:
```bash
php artisan serve
```

2. Frontend geliştirme sunucusunu başlatın:
```bash
npm run dev
```

3. Tarayıcınızda `http://localhost:8000` adresine gidin

## 📚 API Dokümantasyonu

API endpoint'leri ve kullanımları için Postman koleksiyonunu inceleyebilirsiniz:
[Todo App Postman Collection](Todo%20App.postman_collection.json)

### API Endpoint'leri

#### Kimlik Doğrulama
- POST `/api/auth/register` - Yeni kullanıcı kaydı
- POST `/api/auth/login` - Kullanıcı girişi
- POST `/api/auth/logout` - Çıkış yapma (Korumalı)
- GET `/api/auth/refresh` - Token yenileme (Korumalı)

#### Todo İşlemleri (Korumalı)
- GET `/api/todos` - Tüm todoları listeleme
- GET `/api/todos/{id}` - ID'ye göre todo getirme
- GET `/api/todos/search` - Todo arama
- POST `/api/todos` - Yeni todo oluşturma
- PUT `/api/todos/{id}` - Todo güncelleme
- PATCH `/api/todos/{id}/status` - Todo durumunu güncelleme
- DELETE `/api/todos/{id}` - Todo silme

#### İstatistik Endpointleri (Korumalı)
- GET `/api/stats/todos` - Todo'ların durumlarına göre istatistikleri
- GET `/api/stats/priorities` - Todo'ların önceliklerine göre istatistikleri

#### Kategori İşlemleri
- GET `/api/categories` - Tüm kategorileri listeleme (Public)
- GET `/api/categories/{id}` - ID'ye göre kategori getirme (Public)
- GET `/api/categories/{id}/todos` - Kategoriye ait todoları getirme (Korumalı)
- POST `/api/categories` - Yeni kategori oluşturma (Korumalı)
- PUT `/api/categories/{id}` - Kategori güncelleme (Korumalı)
- DELETE `/api/categories/{id}` - Kategori silme (Korumalı)

## 💡 Örnek Kullanım Senaryoları

1. **Kullanıcı Kaydı ve Girişi**
   - Yeni bir hesap oluşturun
   - Giriş yapın ve JWT token alın
   - Token ile API isteklerini gerçekleştirin

2. **Todo Yönetimi**
   - Yeni bir todo oluşturun
   - Todo'yu bir kategoriye atayın
   - Todo'yu tamamlandı olarak işaretleyin
   - Todo'yu düzenleyin veya silin

3. **Kategori Yönetimi**
   - Yeni kategoriler oluşturun
   - Kategorileri düzenleyin veya silin
