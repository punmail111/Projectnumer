"# NumerProjectwithDocker"

docker pull cattysann/numer_docker:app

docker pull cattysann/numer_docker:api

docker pull mongo

เพื่อเปิดโปรเจคใช้คำสั่ง

docker run -p 80:3000 -d cattysann/numer_docker:app

docker run -p 8080:8080 -d cattysann/numer_docker:api

docker run -p 27017:27017 -d mongo

โปรเจคจะรันอยู่ที่ 192.168.99.100

เมื่อต้องการหยุด container ที่ run อยู่

docker stop $(docker ps -aq)

เมื่อต้องการลบimageทั้งหมดในเครื่อง

docker system prune -a --volumes
