import { getConnection } from "typeorm";

function getEntities() {
  const entities = [];
  const connection = getConnection();

  for (const entityInfo of connection.entityMetadatas) {
    entities.push({ name: entityInfo.name, tableName: entityInfo.tableName });
  }
  return entities;
}

export async function clearDatabase() {
  const entities = getEntities();
  const connection = getConnection();

  for (const entity of entities) {
    try {
      await connection.query(`TRUNCATE "${entity.tableName}" RESTART IDENTITY CASCADE`);
    } catch {
      entities.push(entity);
    }
  }
}
