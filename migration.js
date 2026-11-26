const db = require("./db")

// DROP na ordem inversa das FKs: itens -> compra -> imagem -> produto -> cliente
const ESTRUTURA_CLIENTE = `
    DROP TABLE IF EXISTS item_compra;
    DROP TABLE IF EXISTS compra;
    DROP TABLE IF EXISTS produto;
    DROP TABLE IF EXISTS cliente;

    CREATE TABLE cliente (
        id int(11) NOT NULL AUTO_INCREMENT,
        nome varchar(100) NOT NULL,
        cpf char(14) NOT NULL,
        celular char(14) NOT NULL,
        email varchar(100) NOT NULL,
        senha varchar(512) NOT NULL,
        PRIMARY KEY (id),
        UNIQUE KEY cpf (cpf),
        UNIQUE KEY email (email)
    ) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
`

const DADOS_CLIENTE = `
    INSERT INTO cliente VALUES 
        (12,'Nicolas Galvão','123.456.789-00','(42)99966-4444','galvao@gmail.com','$2b$10$N8b2YuzXWdMJVAAd670qG.ScLlmdFsuTJ7C6/GWtMKWhj8O0pU6Pu'),(13,'Nicolas Galvão','123.456.789-02','(42)99966-4444','galvao2@gmail.com','$2b$10$rNwWgUx8kezhoZXXuVG7NeBXqPFAzpkc37Sg4P.ETVtiSaWWqBHxy'),
        (14,'Patrick','123.123.123-12','(42)999669966','patrick123@gmail.com','$2b$10$MZMnDj10f7JnV6ArP.5hm.TAHDZ5NwECYSw6i5kbNowwhPuqbC/W.'),(19,'Richard','148.211.069-57','(42) 99931-865','bellusci.richard@escola.pr.gov.br','$2b$10$v3aTKV7iVqrcBJozlOZwie8I7yO2CyQIfuVk4uxR2RSDPELZSeyxS'),
        (28,'Patrick','111.222.333-49','(42)99999-4444','patrick67@gmail.com','$2b$10$QRU70xwZs0JYccsQcf/BFe7IIGYaqlS0xb.TIkGsv7UKviM2A26pq'),(29,'Kauã silva de lima','152.915.999-79','(42)99999-4444','kaua.lima11@escola.pr.gov.br','$2b$10$Ax80a.N/1RUsBU48IO1hX.d4hyiNt/15aV8.8VJuPziVuzTwGe8ly'),
        (30,'Bruno','120.897.429-76','(42)99830-3607','derbli@gmail.com','$2b$10$t8fYQCnQRXxvbLczF6YJNu31UvNT1qWhZ1r9GiftnFLy1rABdFKfG'),(31,'Guilherme','111.333.444-78','(42)55555-9999','poisler456@gmail.com','$2b$10$r9QmvPFklIeeoCoHfISzGeJNnjScdYm4JZiNBmffsblVzk48uyHXa'),
        (32,'Rhuan','137.604.709-80','(42)99999-4444','rhuan@gmail.com','$2b$10$QA3mNPH90POZijUIri.hKO5pQQH223KGKyYOYycQA0GtPuKGhPrkS');
`

const ESTRUTURA_PRODUTO = `
    CREATE TABLE produto (
        id int(11) NOT NULL AUTO_INCREMENT,
        nome varchar(200) NOT NULL,
        descricao text NOT NULL,
        categoria varchar(50) NOT NULL,
        preco decimal(10,2) NOT NULL,
        caminho_img varchar(50) NOT NULL,
        quantidade_img int(11) NOT NULL,
        PRIMARY KEY (id)
    ) ENGINE=InnoDB AUTO_INCREMENT=50 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
`

const DADOS_PRODUTO = `
    INSERT INTO produto VALUES 
        (1,'Bolo de Chocolate 1kg','Bolo de chocolate com recheio de brigadeiro cremoso e cobertura de ganache.','Bolos',89.90,'assets/img/bolo-chocolate.jpg',12),(2,'Bolo de Morango 1kg','Bolo de morango com recheio de creme e morangos frescos, cobertura de chantilly.','Bolos',99.90,'assets/img/bolo-morango.jpg',8),(3,'Bolo de Cenoura com Chocolate','Bolo de cenoura fofinho com cobertura generosa de chocolate.','Bolos',69.90,'assets/img/bolo-cenoura.jpg',15),(4,'Bolo Red Velvet','Bolo red velvet com recheio de cream cheese e cobertura especial.','Bolos',109.90,'assets/img/bolo-red-velvet.jpg',6),(5,'Bolo de Aniversário Decorado','Bolo decorado para aniversário, personalizado com tema à escolha.','Bolos',149.90,'assets/img/bolo-aniversario.jpg',5),
        (6,'Cupcake de Baunilha','Cupcake de baunilha com cobertura de buttercream colorido.','Cupcakes',12.90,'assets/img/cupcake-baunilha.jpg',30),(7,'Cupcake de Chocolate','Cupcake de chocolate com recheio de brigadeiro e granulado.','Cupcakes',14.90,'assets/img/cupcake-chocolate.jpg',30),(8,'Cupcake Red Velvet','Cupcake red velvet com cobertura de cream cheese.','Cupcakes',15.90,'assets/img/cupcake-red-velvet.jpg',25),(9,'Cupcake Decorado','Cupcake decorado com tema infantil, ideal para festas.','Cupcakes',16.90,'assets/img/cupcake-decorado.jpg',20),
        (10,'Brigadeiro Gourmet','Brigadeiro gourmet feito com chocolate belga e granulado nobre, unidade.','Doces Finos',6.90,'assets/img/brigadeiro-gourmet.jpg',50),(11,'Beijinho de Coco','Beijinho de coco com cravo, feito com leite condensado e coco fresco.','Doces Finos',5.90,'assets/img/beijinho.jpg',50),(12,'Cajuzinho','Cajuzinho de amendoim com chocolate e açúcar, unidade.','Doces Finos',5.90,'assets/img/cajuzinho.jpg',40),(13,'Trufa de Chocolate','Trufa recheada de chocolate ao leite com casquinha crocante.','Doces Finos',7.90,'assets/img/trufa-chocolate.jpg',35),(14,'Docinho de Morango','Docinho de morango com recheio cremoso e cobertura rosé.','Doces Finos',6.90,'assets/img/docinho-morango.jpg',30),
        (15,'Torta de Limão','Torta de limão com massa crocante e merengue torrado.','Tortas',59.90,'assets/img/torta-limao.jpg',10),(16,'Torta de Maracujá','Torta de maracujá com recheio cremoso e cobertura de ganache.','Tortas',59.90,'assets/img/torta-maracuja.jpg',10),(17,'Cheesecake de Frutas Vermelhas','Cheesecake cremoso com calda de frutas vermelhas.','Tortas',79.90,'assets/img/cheesecake.jpg',8),(18,'Torta Holandesa','Torta holandesa com camadas de creme e chocolate.','Tortas',69.90,'assets/img/torta-holandesa.jpg',9),
        (19,'Pudim de Leite Condensado','Pudim de leite condensado cremoso com calda de caramelo.','Sobremesas',29.90,'assets/img/pudim.jpg',15),(20,'Petit Gateau','Bolo quente de chocolate com recheio cremoso e sorvete de creme.','Sobremesas',32.90,'assets/img/petit-gateau.jpg',12),(21,'Mousse de Chocolate','Mousse de chocolate meio amargo com chantilly.','Sobremesas',24.90,'assets/img/mousse-chocolate.jpg',18),(22,'Açaí com Granola','Tigela de açaí cremoso com granola e banana.','Sobremesas',25.90,'assets/img/acai.jpg',20),
        (23,'Pão de Mel','Pão de mel artesanal com recheio de doce de leite e cobertura de chocolate.','Doces Caseiros',8.90,'assets/img/pao-de-mel.jpg',25),(24,'Bananada','Bananada caseira com açúcar e canela, unidade.','Doces Caseiros',6.90,'assets/img/bananada.jpg',30),(25,'Goiabada Cascão','Goiabada cascão artesanal, 500g.','Doces Caseiros',19.90,'assets/img/goiabada.jpg',15),(26,'Doce de Leite Caseiro','Doce de leite artesanal, 250g, textura cremosa.','Doces Caseiros',16.90,'assets/img/doce-leite.jpg',20),
        (27,'Cookie com Gotas de Chocolate','Cookie crocante com gotas de chocolate, unidade.','Biscoitos',7.90,'assets/img/cookie-chocolate.jpg',30),(28,'Biscoito Amanteigado','Biscoito amanteigado caseiro, pacote com 200g.','Biscoitos',14.90,'assets/img/biscoito-amanteigado.jpg',25),(29,'Brownie de Chocolate','Brownie de chocolate intenso com nozes, unidade.','Biscoitos',9.90,'assets/img/brownie.jpg',30),(30,'Alfajor','Alfajor recheado com doce de leite e coberto com chocolate.','Biscoitos',8.90,'assets/img/alfajor.jpg',25),
        (31,'Macaron Francês','Macaron francês em sabores variados, unidade.','Doces Finos',9.90,'assets/img/macaron.jpg',30),(32,'Éclair de Chocolate','Éclair recheado com creme e cobertura de chocolate.','Doces Finos',12.90,'assets/img/eclair.jpg',20),(33,'Mille-Feuille','Mille-feuille com creme de baunilha e massa folhada crocante.','Doces Finos',15.90,'assets/img/mille-feuille.jpg',15),
        (34,'Croissant de Manteiga','Croissant folhado de manteiga, assado na hora.','Padaria Doce',9.90,'assets/img/croissant.jpg',25),(35,'Pão Doce','Pão doce caseiro com cobertura de açúcar e canela.','Padaria Doce',8.90,'assets/img/pao-doce.jpg',30),(36,'Sonho de Creme','Sonho recheado com creme e açúcar de confeiteiro.','Padaria Doce',7.90,'assets/img/sonho.jpg',35),
        (37,'Caixa de Brigadeiros 12un','Caixa com 12 brigadeiros gourmet variados.','Kits e Caixas',69.90,'assets/img/caixa-brigadeiros.jpg',10),(38,'Kit Festa Doces 50un','Kit com 50 docinhos variados para festa, sabores sortidos.','Kits e Caixas',129.90,'assets/img/kit-festa.jpg',8),(39,'Caixa de Macarons 6un','Caixa com 6 macarons franceses em sabores variados.','Kits e Caixas',49.90,'assets/img/caixa-macarons.jpg',12),(40,'Cesta Café da Manhã Doce','Cesta com pães doces, bolos e biscoitos artesanais.','Kits e Caixas',89.90,'assets/img/cesta-cafe.jpg',7),
        (41,'Café Expresso','Café expresso encorpado, 50ml.','Bebidas',5.90,'assets/img/cafe-expresso.jpg',50),(42,'Cappuccino Cremoso','Cappuccino cremoso com chocolate e canela.','Bebidas',12.90,'assets/img/cappuccino.jpg',30),(43,'Chocolate Quente','Chocolate quente cremoso com marshmallows.','Bebidas',14.90,'assets/img/chocolate-quente.jpg',25),(44,'Milkshake de Chocolate','Milkshake cremoso de chocolate, 400ml.','Bebidas',19.90,'assets/img/milkshake.jpg',20),
        (45,'Bala de Coco','Bala de coco artesanal, pacote com 200g.','Doces Caseiros',12.90,'assets/img/bala-coco.jpg',25),(46,'Paçoca de Amendoim','Paçoca de amendoim artesanal, unidade.','Doces Caseiros',4.90,'assets/img/pacoca.jpg',40),
        (47,'Raspadinha Gourmet','Raspadinha gourmet com calda de frutas, 300ml.','Sobremesas',15.90,'assets/img/raspadinha.jpg',20),(48,'Açaí no Pote 500ml','Açaí cremoso no pote de 500ml com acompanhamentos.','Sobremesas',22.90,'assets/img/acai-pote.jpg',18),
        (49,'Bolo no Pote','Bolo no pote com camadas de bolo, recheio e cobertura, 250ml.','Bolos',15.90,'assets/img/bolo-pote.jpg',25);
`

// Tabela de compras e itens (AV3)
const ESTRUTURA_COMPRA = `
    CREATE TABLE compra (
        id int(11) NOT NULL AUTO_INCREMENT,
        cliente_id int(11) NOT NULL,
        data_compra datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
        valor_total decimal(10,2) NOT NULL,
        status varchar(30) NOT NULL DEFAULT 'pendente',
        PRIMARY KEY (id),
        KEY fk_compra_cliente (cliente_id),
        CONSTRAINT fk_compra_cliente FOREIGN KEY (cliente_id) REFERENCES cliente (id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

    CREATE TABLE item_compra (
        id int(11) NOT NULL AUTO_INCREMENT,
        compra_id int(11) NOT NULL,
        produto_id int(11) NOT NULL,
        quantidade int(11) NOT NULL,
        preco_unitario decimal(10,2) NOT NULL,
        subtotal decimal(10,2) NOT NULL,
        PRIMARY KEY (id),
        KEY fk_item_compra (compra_id),
        KEY fk_item_produto (produto_id),
        CONSTRAINT fk_item_compra FOREIGN KEY (compra_id) REFERENCES compra (id) ON DELETE CASCADE,
        CONSTRAINT fk_item_produto FOREIGN KEY (produto_id) REFERENCES produto (id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
`

async function criar_tabelas() {
    const connection = await db.pool.getConnection();
    try {
        await connection.beginTransaction();

        console.log("Criando tabela 'cliente'...");
        await connection.query(ESTRUTURA_CLIENTE);
        await connection.query(DADOS_CLIENTE);

        console.log("Criando tabela 'produto'...");
        await connection.query(ESTRUTURA_PRODUTO);
        await connection.query(DADOS_PRODUTO);

        console.log("Criando tabelas 'compra' e 'item_compra'...");
        await connection.query(ESTRUTURA_COMPRA);

        await connection.commit();
        console.log("Migration executada com sucesso!");
        process.exit(0);
    } catch (error) {
        await connection.rollback();
        console.log(error)
        process.exit(1);
    } finally {
        connection.release();
    }
}
criar_tabelas()
