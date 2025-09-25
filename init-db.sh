#!/usr/bin/bash
# after mongodb is started, run this script to initialize the database
mongoimport --uri="mongodb://127.0.0.1:27017/load-link" --collection="users" --file=<(echo '{ "_id": { "$oid": "67e6b1bf0c971334ae50ebf8" }, "username": "admin", "password": "240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9", "name": "admin", "photo": "https://avatars.githubusercontent.com/u/96001130?v=4", "createdAt": { "$date": "2025-03-28T14:27:11.026Z" }, "userAgent": "Thunder Client (https://www.thunderclient.com)", "ip": "::ffff:127.0.0.1" }')

