const express = require('express');
const fs = require('fs');  // مكتبة الكتابة في الملفات
const app = express();
const port = 5500;  // اختر البورت الذي تريده

// لتخزين عناوين الـ IP
const ipFile = 'ips.json';  // اسم الملف الذي سيتم تخزين البيانات فيه

app.get('/', (req, res) => {
    const userIP = req.ip;

    // قراءة البيانات السابقة من الملف
    fs.readFile(ipFile, (err, data) => {
        if (err) {
            console.log('خطأ في قراءة الملف:', err);
        } else {
            let ips = [];
            if (data.length > 0) {
                ips = JSON.parse(data);  // تحويل البيانات من JSON إلى مصفوفة
            }

            // إضافة عنوان الـ IP الجديد إلى المصفوفة
            ips.push(userIP);

            // كتابة العناوين المحدثة إلى الملف
            fs.writeFile(ipFile, JSON.stringify(ips, null, 2), (err) => {
                if (err) {
                    console.log('خطأ في كتابة البيانات:', err);
                } else {
                    console.log('تم حفظ عنوان الـ IP بنجاح:', userIP);
                }
            });
        }
    });

    res.send('مرحبًا! تم تسجيل عنوان الـ IP الخاص بك.');
});

app.listen(port, () => {
    console.log(`الخادم يعمل على http://localhost:${port}`);
});
