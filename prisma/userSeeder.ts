// prisma/seed.ts
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
// Importa o faker, usando a localização pt_BR
import { fakerPT_BR as faker } from '@faker-js/faker';

const prisma = new PrismaClient();

// --- CONFIGURAÇÃO ---
// Defina aqui a quantidade de dados que você quer gerar
const USERS_TO_CREATE = 10;
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