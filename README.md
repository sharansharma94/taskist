curl -X POST \                     
  http://localhost:3000/api/auth/login \
  -H 'Content-Type: application/json' \
  -d '{"email": "user1@example.com", "password": "password"}'


 curl -X POST \
  http://localhost:3000/api/auth/register \
  -H 'Content-Type: application/json' \
  -d '{"email": "user1@example.com", "password": "password"}'
  