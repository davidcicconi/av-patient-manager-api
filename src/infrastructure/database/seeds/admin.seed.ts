import "reflect-metadata";
import "dotenv/config";
import { AppDataSource } from "../datasource";
import { UserEntity } from "../entities/UserEntity";
import { RoleEntity } from "../entities/RoleEntity";
import { BcryptPasswordHasher } from "../../auth/BcryptPasswordHasher";

export async function seed(): Promise<void> {
  await AppDataSource.initialize();

  const roleRepository = AppDataSource.getRepository(RoleEntity);
  const userRepository = AppDataSource.getRepository(UserEntity);

  let adminRole = await roleRepository.findOneBy({ name: "Administrador" });

  if (!adminRole) {
    adminRole = new RoleEntity();
    adminRole.name = "Administrador";
    await roleRepository.save(adminRole);
    console.log("Rol 'administrador' creado para el usuario admin.");
  }

  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;
  const adminName = process.env.ADMIN_FIRST_NAME;
  const adminLastName = process.env.ADMIN_LAST_NAME;

  if (!adminEmail || !adminPassword || !adminName || !adminLastName) {
    throw new Error("Faltan las variables de entorno para email, contraseña, nombre y apellido");
  }

  const existingUser = await userRepository.findOneBy({ email: adminEmail });

  if (!existingUser) {
    const hasher = new BcryptPasswordHasher();
    const hashedPassword = await hasher.hash(adminPassword);


    const admin = new UserEntity();
    admin.name = adminName;
    admin.lastName = adminLastName;
    admin.email = adminEmail;
    admin.hashPassword = hashedPassword;
    admin.roleId = adminRole.id;

    await userRepository.save(admin);
    console.log("Usuario administrador creado correctamente.");
  } else {
    console.log("El usuario administrador ya existe.");
  }

  await AppDataSource.destroy();
}

if (require.main === module) {
  seed().catch((error) => {
    console.error("Error al ejecutar el seed de admin:", error);
    process.exit(1);
  });
}
