const request = require("supertest");
const server = require("../index");

describe("Operaciones CRUD de cafes", () => {
  test("GET /cafes debería devolver un status code 200 y un array con al menos un objeto", async () => {
    const response = await request(server).get("/cafes");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
  });

  test("DELETE /cafes/:id debería devolver un status code 404 si el id no existe", async () => {
    const nonExistentId = 9999; // Id que no existe
    const response = await request(server)
      .delete(`/cafes/${nonExistentId}`)
      .set('Authorization', 'fake-token'); 
    expect(response.status).toBe(404);
  });

  test("POST /cafes debería agregar un nuevo cafe y devolver un status code 201", async () => {
    const newCafe = {
      id: 5,
      nombre: "Nuevo Café"
    };
    const response = await request(server).post("/cafes").send(newCafe);
    expect(response.status).toBe(201);
    expect(response.body).toEqual(expect.arrayContaining([expect.objectContaining(newCafe)]));
  });

  test("PUT /cafes/:id debería devolver un status code 400 si el id del parámetro es diferente del id del payload", async () => {
    const idInParams = 1;
    const payload = {
      id: 2, // Id diferente
      nombre: "Café Actualizado"
    };
    const response = await request(server).put(`/cafes/${idInParams}`).send(payload);
    expect(response.status).toBe(400);
  });
});
