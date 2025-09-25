#!/usr/bin/bash
uri="mongodb://127.0.0.1:27017/load-link"
# after mongodb is started, run this script to initialize the database
mongoimport --uri=$uri \
--collection="users" \
--file=<(echo '{ "_id": { "$oid": "67e6b1bf0c971334ae50ebf8" }, "username": "admin", "password": "240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9", "name": "admin", "photo": "https://avatars.githubusercontent.com/u/96001130?v=4", "createdAt": { "$date": "2025-03-28T14:27:11.026Z" }, "userAgent": "Thunder Client (https://www.thunderclient.com)", "ip": "::ffff:127.0.0.1" }')

mongoimport --uri=$uri \
--collection="invite" \
--file=<(echo '{"_id":{"$oid":"68d50b8ad3897f5005673a49"},"code":"b663856b8b955616bcb394559d389f161fc114bd832a841c69b5a40ed3eb6a4f","inviter":{"$oid":"67e6b1bf0c971334ae50ebf8"}} {"_id":{"$oid":"68d50b8ad3897f5005673a4a"},"code":"d492be6033769dbeeb4c2a8cc6f74c109d9866147681a605a46e60de8418b945","inviter":{"$oid":"67e6b1bf0c971334ae50ebf8"}} {"_id":{"$oid":"68d50b8ad3897f5005673a4b"},"code":"b40c3e27cbd1c18eb805379adb4e2878b57e8704a32fbd41c35351e85d17f870","inviter":{"$oid":"67e6b1bf0c971334ae50ebf8"}}')