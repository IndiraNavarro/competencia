import { sequelize } from "../database/db";
import { Blog } from "../models/Blog";
import { Article } from "../models/Article";

type Faker = typeof import("@faker-js/faker")["faker"];

const importModule = new Function(
  "specifier",
  "return import(specifier)"
) as (specifier: string) => Promise<{ faker: Faker }>;

async function createFakeData() {
  const { faker } = await importModule("@faker-js/faker");

  await sequelize.authenticate();
  await sequelize.sync({ force: false });

  const executionId = faker.string.alphanumeric(8).toLowerCase();
  const blogs: Blog[] = [];

  // Crear blogs falsos
  for (let i = 0; i < 10; i++) {
    const blog = await Blog.create({
      name: `${faker.lorem.words({ min: 2, max: 5 })} ${executionId}-${i + 1}`,
      creationDate: faker.date.past({ years: 2 }),
      status: "ACTIVE",
    });

    blogs.push(blog);
  }

  const existingBlogs = await Blog.findAll();
  const availableBlogs = existingBlogs.length > 0 ? existingBlogs : blogs;

  // Crear articulos falsos
  for (let i = 0; i < 50; i++) {
    const blog = faker.helpers.arrayElement(availableBlogs);

    await Article.create({
      blogId: blog.id,
      title: faker.lorem.sentence({ min: 4, max: 10 }).slice(0, 200),
      content: faker.lorem.paragraphs({ min: 2, max: 5 }, "\n\n"),
      publicationDate: faker.date.past({ years: 1 }),
      views: faker.number.int({ min: 0, max: 10000 }),
      status: faker.helpers.arrayElement(["ACTIVE", "INACTIVE"] as const),
    });
  }
}

createFakeData()
  .then(async () => {
    console.log("Datos falsos creados exitosamente");
    await sequelize.close();
  })
  .catch(async (error) => {
    console.error("Error al crear datos falsos:", error);
    await sequelize.close();
    process.exit(1);
  });
