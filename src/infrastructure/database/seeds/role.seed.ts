import "reflect-metadata";
import "dotenv/config";
import { AppDataSource } from "../datasource";
import { RoleEntity } from "../entities/RoleEntity";

export async function seed(): Promise<void> {
  await AppDataSource.initialize();

  const roleRepository = AppDataSource.getRepository(RoleEntity);

  const existingRole = await roleRepository.findOneBy({ name: "Administrador" });

  if (!existingRole) {
    const role = new RoleEntity();
    role.name = "Administrador";
    await roleRepository.save(role);
    console.log("Rol 'Administrador' creado correctamente.");
  } else {
    console.log("Rol 'Administrador' ya existe.");
  }

  await AppDataSource.destroy();
}

if (require.main === module) {
  seed().catch((error) => {
    console.error("Error al ejecutar el seed de roles:", error);
    process.exit(1);
  });
}
