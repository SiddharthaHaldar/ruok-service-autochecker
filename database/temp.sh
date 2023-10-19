#  curl -u root:yourpassword -X POST --header 'accept: application/json' \
#     --data '{"name": "dataServices", "createCollection": true }' \
#     --dump - http://0.0.0.0:8529/_api/database


curl -X POST -d "{ \"field\": \"value\" }" --dump - https://localhost:8529/_db/myDatabase/_api/document?collection=cars
