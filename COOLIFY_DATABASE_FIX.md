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

#### القيمة الحالية (خطأ):
```
DATABASE_URL=postgresql://postgres:xKpLObgvO7EMmHLi3EPngicq30X3Wv6Z90iCTgqKhqddYHNgyphEhtU36tCv8pjc@postgres-service:5432/postgres
```

#### القيمة الصحيحة لـ DATABASE_URL:
```
DATABASE_URL=postgresql://postgres:xKpLObgvO7EMmHLi3EPngicq30X3Wv6Z90iCTgqKhqddYHNgyphEhtU36tCv8pjc@postgresql-database-ngwsgkgk4ko4gsog48kwowc0:5432/postgres
```

**ملاحظة مهمة:** استخدم اسم الخدمة الداخلي لقاعدة البيانات في Coolify وهو:
`postgresql-database-ngwsgkgk4ko4gsog48kwowc0`

### 2. بيانات الاتصال الصحيحة

بيانات قاعدة البيانات:
- **Username:** postgres
- **Password:** xKpLObgvO7EMmHLi3EPngicq30X3Wv6Z90iCTgqKhqddYHNgyphEhtU36tCv8pjc
- **Database Name:** postgres
- **Internal Host:** postgresql-database-ngwsgkgk4ko4gsog48kwowc0
- **Port:** 5432

### 3. جميع متغيرات البيئة المطلوبة

تأكد من وجود هذه المتغيرات في Coolify:

```env
# Admin Configuration
ADMIN_EMAIL=admin@novafab.com
ADMIN_PASSWORD=admin123

# Database Connection (الصحيح)
DATABASE_URL=postgresql://postgres:xKpLObgvO7EMmHLi3EPngicq30X3Wv6Z90iCTgqKhqddYHNgyphEhtU36tCv8pjc@postgresql-database-ngwsgkgk4ko4gsog48kwowc0:5432/postgres

# Server Configuration
HOSTNAME=0.0.0.0
PORT=3000

# NextAuth Configuration
NEXTAUTH_SECRET=2DjQpM6CP8QJT/Tjf5CCCFfvSlMKRi6cWVMGDKtNfvw=
NEXTAUTH_URL=http://kgoc40so00cs4w6kscBo04kg.31.220.83.214.sslip.io

# App Configuration
NEXT_PUBLIC_APP_URL=http://kgoc40so00cs4w6kscBo04kg.31.220.83.214.sslip.io
NEXT_TELEMETRY_DISABLED=1
NODE_ENV=production
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