# EncurtadorURL

Máquina não suportou o Docker.

Documentação Postman:
https://web.postman.co/workspace/cd40b856-693c-41eb-8def-149d5e06d5f4/documentation/11882287-4aa08791-de7f-4696-a254-b8892fe0e17f

Aplicação rodando publicamente em https://encurtadorwiseup.herokuapp.com/
Para conexão com banco de dados do Heroku utilizei as credênciais e informações:
  - User: vsmtadhykyntoz
  - Password: e6b5dd5e64ec66d6dcceb6b97bf0bc6b45a5cc13222fd9e0410b3a36cbde94c6
  - Database: daj2uk9oqckq80
  - Host: ec2-34-194-215-27.compute-1.amazonaws.com
  - Port: 5432
  - URI: postgres://vsmtadhykyntoz:e6b5dd5e64ec66d6dcceb6b97bf0bc6b45a5cc13222fd9e0410b3a36cbde94c6@ec2-34-194-215-27.compute-1.amazonaws.com:5432/daj2uk9oqckq80

Para conexão com banco de dados localmente utilizei PgAdmin4, onde espera pelas seguintes credênciais e informações:
  - User: postgres
  - Password: 123456
  - Database: encurtador
  - Host: localhost
  - Port: 5432
  - URI: postgres://postgres:123456@localhost:5432/encurtador
  
Para executar localmente é necessário executar o banco de dados localmente com os dados das credênciais acima e executar os seguintes comandos:
  - npm install;
  - npm run-script build;
  - npm start;
  
Após o banco de dados estar rodando localmente, toda a aplicação funcionará localmente.
A aplicação roda em http://localhost:8081/

Obs: Tempo de vida útil da URL encurtada: 5 minutos.
A URL é salva juntamente com uma timestamp da data atual, e sempre que uma URL encurtada é chamada, verifica-se a timestamp e se tiver sido criada a mais de 5 minutos será inválida.
