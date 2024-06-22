# Сборка образа
docker build -t rozental .

# Запуск контейнера
docker run -p 3000:80 rozental
