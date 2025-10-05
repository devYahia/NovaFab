# حل مشكلة الاتصال بقاعدة البيانات PostgreSQL في Coolify

## المشكلة الحالية
التطبيق يحاول الاتصال بـ `postgres-service:5432` لكن هذا الاسم غير صحيح في بيئة Coolify.

## الحل المطلوب

### 1. تحديث متغير البيئة DATABASE_URL في Coolify

يجب تحديث متغير البيئة `DATABASE_URL` في إعدادات Coolify ليشير إلى قاعدة البيانات الصحيحة.

#### الخطوات:
1. اذهب إلى لوحة تحكم Coolify
2. اختر مشروع NovaFab
3. اذهب إلى قسم "Environment Variables"
4. ابحث عن متغير `DATABASE_URL`
5. قم بتحديثه بالقيمة الصحيحة

#### القيمة الصحيحة لـ DATABASE_URL:
```
DATABASE_URL="postgresql://username:password@postgresql-database-ngwsgkgk4ko4gsog48kwowc0:5432/database_name"
```

**ملاحظة مهمة:** استخدم اسم الخدمة الداخلي لقاعدة البيانات في Coolify وهو:
`postgresql-database-ngwsgkgk4ko4gsog48kwowc0`

### 2. الحصول على بيانات الاتصال الصحيحة

من لوحة تحكم Coolify:
1. اذهب إلى قسم "Databases"
2. اختر قاعدة البيانات `postgresql-database-ngwsgkgk4ko4gsog48kwowc0`
3. انسخ بيانات الاتصال:
   - Username
   - Password  
   - Database Name
   - Internal Host (يجب أن يكون: postgresql-database-ngwsgkgk4ko4gsog48kwowc0)

### 3. تحديث متغيرات البيئة المطلوبة

تأكد من وجود هذه المتغيرات في Coolify:

```env
# Database Connection
DATABASE_URL="postgresql://[username]:[password]@postgresql-database-ngwsgkgk4ko4gsog48kwowc0:5432/[database_name]"

# NextAuth Configuration
NEXTAUTH_SECRET="your-secure-secret-key"
NEXTAUTH_URL="http://kgoc40so00cs4w8ksc8o04kg.31.220.83.214.sslip.io"

# Production Environment
NODE_ENV="production"
```

### 4. إعادة النشر

بعد تحديث متغيرات البيئة:
1. احفظ التغييرات في Coolify
2. اضغط على "Redeploy" لإعادة نشر التطبيق
3. راقب الـ logs للتأكد من نجاح الاتصال

### 5. تشغيل Migration (إذا لزم الأمر)

بعد نجاح الاتصال، قد تحتاج لتشغيل:
```bash
npx prisma migrate deploy
npx prisma db seed
```

## التحقق من نجاح الحل

1. تحقق من الـ logs - يجب ألا ترى خطأ "Can't reach database server"
2. جرب الوصول للتطبيق على: http://kgoc40so00cs4w8ksc8o04kg.31.220.83.214.sslip.io
3. جرب التسجيل أو تسجيل الدخول

## ملاحظات إضافية

- تأكد من أن قاعدة البيانات PostgreSQL تعمل في Coolify
- تحقق من أن الشبكة الداخلية تسمح بالاتصال بين الخدمات
- في حالة استمرار المشكلة، تحقق من logs قاعدة البيانات أيضاً