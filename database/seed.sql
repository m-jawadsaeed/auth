INSERT INTO users
(
id,
name,
email,
password,
role
)
VALUES
(
gen_random_uuid(),
'Admin',
'admin@example.com',
'$2b$10$examplehash',
'ADMIN'
);