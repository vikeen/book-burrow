# book-burrow

## Development Environment Setup

- Nodejs. Refer to package.json for current
- Postgres
```sql
CREATE DATABASE book_burrow;
CREATE DATABASE book_burrow_test;
CREATE ROLE book_burrow_user WITH PASSWORD 'password' LOGIN;
GRANT ALL ON DATABASE book_burrow to book_burrow_user;
GRANT ALL ON DATABASE book_burrow_test to book_burrow_user;
```
```shell
npm install
NODE_ENV=development npm start
```

## Testing
```shell
npm test
```
