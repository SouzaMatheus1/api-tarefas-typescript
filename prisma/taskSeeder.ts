// prisma/seed.ts
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
// Importa o faker, usando a localização pt_BR
import { fakerPT_BR as faker } from '@faker-js/faker';

const prisma = new PrismaClient();

// --- CONFIGURAÇÃO ---
// Defina aqui a quantidade de dados que você quer gerar
const USERS_TO_CREATE = 50;
const TASKS_PER_USER_MIN = 1;
const TASKS_PER_USER_MAX = 5;
// --------------------

async function main() {
  console.log(`Iniciando o seeding...`);

  // 1. Limpa o banco de dados (na ordem correta para não quebrar as chaves estrangeiras)
  console.log('Limpando o banco de dados...');
  await prisma.task.deleteMany({});
  await prisma.user.deleteMany({});

  // 2. Criptografa a senha padrão "password"
  const hashedPassword = await bcrypt.hash("password", 10);

  // 3. Cria um array de usuários
  console.log(`Criando ${USERS_TO_CREATE} usuários...`);
  const users = [];

  for (let i = 0; i < USERS_TO_CREATE; i++) {
    const user = await prisma.user.create({
      data: {
        name: faker.person.fullName(),
        email: faker.internet.email().toLowerCase(), // Emails aleatórios
        password: hashedPassword,
      },
    });
    users.push(user);
  }

  // 4. Cria tarefas para cada usuário
  console.log(`Criando tarefas para os usuários...`);
  for (const user of users) {
    // Gera um número aleatório de tarefas para cada usuário
    const tasksToCreate = faker.number.int({
      min: TASKS_PER_USER_MIN,
      max: TASKS_PER_USER_MAX,
    });

    for (let j = 0; j < tasksToCreate; j++) {
      await prisma.task.create({
        data: {
          title: faker.lorem.sentence(5), // Gera uma frase de 5 palavras
          completed: faker.datatype.boolean(), // Define aleatoriamente como completo ou não
          authorId: user.id, // Conecta com o usuário criado
        },
      });
    }
  }

  console.log(`Seeding finalizado com sucesso.`);
}

// Executa a função main e garante que o script
// saia corretamente, fechando a conexão com o banco.
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });