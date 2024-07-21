export function getMongoDBConnectionString() {
  return FileReader.readAsText("src/secrets.txt");
}
