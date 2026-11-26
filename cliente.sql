CREATE TABLE cliente 
( 
 id INT PRIMARY KEY AUTO_INCREMENT,  
 nome VARCHAR(100) NOT NULL,  
 cpf CHAR(14) NOT NULL UNIQUE,  
 celular CHAR(14) NOT NULL,  
 email VARCHAR(100) NOT NULL UNIQUE,  
 senha VARCHAR(512) NOT NULL
); 
DROP TABLE cliente;

INSERT INTO cliente (
    nome, cpf, celular, email, senha
) VALUES (
    "Patrick Staroin", "111.222.333-66", 
    "(42)99999-4444", "patrick@gmail.com",
    "EAUHEAUISHEUIEAIS"
);

INSERT INTO cliente (nome, cpf, celular, email, senha) VALUES 
('Lucas Almeida', '111.222.333-44', '(11)99888-1001', 'lucas.almeida@email.com', 'Lucas@2024'),
('Mariana Souza', '222.333.444-55', '(21)99777-2002', 'mariana.souza@email.com', 'Mari#1234'),
('Pedro Henrique Lima', '333.444.555-66', '(31)99666-3003', 'pedro.lima@email.com', 'PedroL123'),
('Ana Clara Ferreira', '444.555.666-77', '(41)99555-4004', 'ana.ferreira@email.com', 'AnaClara@1'),
('Rafael Costa', '555.666.777-88', '(51)99444-5005', 'rafael.costa@email.com', 'RafaCosta9'),
('Juliana Martins', '666.777.888-99', '(61)99333-6006', 'juliana.martins@email.com', 'JuMartins8'),
('Gabriel Rocha', '777.888.999-00', '(71)99222-7007', 'gabriel.rocha@email.com', 'GabRocha7'),
('Beatriz Nogueira', '888.999.000-11', '(81)99111-8008', 'beatriz.nogueira@email.com', 'BeaNog6'),
('Thiago Barbosa', '999.000.111-22', '(91)99000-9009', 'thiago.barbosa@email.com', 'ThiagoB5'),
('Camila Ribeiro', '000.111.222-33', '(12)98999-1010', 'camila.ribeiro@email.com', 'CamiRib4');

SELECT email, senha FROM cliente;

SELECT email, senha FROM cliente 
WHERE email = "rafael.costa@email.com";

SELECT * FROM cliente WHERE id <= 30 AND LENGTH(senha) > 20;

SELECT * FROM cliente;

DELETE FROM cliente WHERE id = 37;

UPDATE cliente 
SET nome = "Patrick Staroin", email = "p@gmail.com" 
WHERE id = 35;