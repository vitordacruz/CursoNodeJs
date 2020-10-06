Scripts - DB - Escolinha

CREATE TABLE clientes (
id varchar(250) PRIMARY KEY,
nome VARCHAR ( 250 ) NOT NULL,
email VARCHAR ( 255 ) UNIQUE NOT NULL
);

CREATE TABLE produtos (
id varchar(250) PRIMARY KEY,
nome VARCHAR ( 250 ) NOT NULL,
preco DECIMAL(15,2) NOT NULL,
quantidade Integer NOT NULL
);
