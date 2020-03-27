"# NumerProjectwithDocker"

เวลา pull project นะครับ ดึงได้เลยไม่ต้องโหลด

docker pull punmail111/project-numer:app

api นะครับ

docker pull punmail111/project-numer:api

อันนี้ pull มาก่อน

docker pull mongo

เพื่อเปิดโปรเจคใช้คำสั่ง
         
docker run -p 80:3000 -d punmail111/project-numer:app

docker run -p 8080:8080 -d punmail111/project-numer:api

docker run -p 27017:27017 -d mongo

โปรเจคจะรันอยู่ที่ 192.168.99.100 ห้ามเป็นเลขอื่น ถ้ามันเปลี่ยนให้ ลบ docker tool ลงใหม่ ลบ ในVM ด้วย

หยุด project อันนี้หยุดทั้งหมด

docker stop $(docker ps -aq)

ตรวจสอบ images ในเครื่อง

docker images

เมื่อต้องการลบimageทั้งหมดในเครื่อง

docker system prune -a --volumes
