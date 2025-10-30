const userProfileController = require("../../src/controllers/userProfileController");
const userProfileRepository = require("../../src/repositories/userProfileRepository");

// 🧩 Mock del repositorio
jest.mock("../../src/repositories/userProfileRepository", () => ({
  listar: jest.fn(),
  obtenerPorId: jest.fn(),
  obtenerPorUsuario: jest.fn(),
  crear: jest.fn(),
  actualizar: jest.fn(),
  eliminar: jest.fn(),
}));

describe("userProfileController", () => {
  let req, res;

  beforeEach(() => {
    req = { params: {}, body: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    jest.clearAllMocks();
  });

  // ---- GET ALL PROFILES ----
  it("getProfiles - debería devolver todos los perfiles", async () => {
    const profiles = [{ userid: "1", height: 180 }];
    userProfileRepository.listar.mockResolvedValue(profiles);

    await userProfileController.getProfiles(req, res);

    expect(res.json).toHaveBeenCalledWith(profiles);
  });

  it("getProfiles - debería manejar error interno", async () => {
    const error = new Error("DB error");
    userProfileRepository.listar.mockRejectedValue(error);

    await userProfileController.getProfiles(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "DB error" });
  });

  // ---- GET PROFILE BY ID ----
  it("getProfileById - debería devolver un perfil por id", async () => {
    const profile = { userid: "1" };
    req.params.id = "123";
    userProfileRepository.obtenerPorId.mockResolvedValue(profile);

    await userProfileController.getProfileById(req, res);

    expect(res.json).toHaveBeenCalledWith(profile);
  });

  it("getProfileById - debería devolver 404 si no se encuentra", async () => {
    req.params.id = "notfound";
    userProfileRepository.obtenerPorId.mockResolvedValue(null);

    await userProfileController.getProfileById(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: "Profile not found" });
  });

  it("getProfileById - debería manejar error interno", async () => {
    const error = new Error("DB fail");
    req.params.id = "id";
    userProfileRepository.obtenerPorId.mockRejectedValue(error);

    await userProfileController.getProfileById(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "DB fail" });
  });

  // ---- GET PROFILE BY USER ID ----
  it("getProfileByUserId - debería devolver perfil por usuario", async () => {
    const profile = { userid: "1", weight: 75 };
    req.params.userId = "1";
    userProfileRepository.obtenerPorUsuario.mockResolvedValue(profile);

    await userProfileController.getProfileByUserId(req, res);

    expect(res.json).toHaveBeenCalledWith(profile);
  });

  it("getProfileByUserId - debería devolver 404 si no se encuentra", async () => {
    req.params.userId = "2";
    userProfileRepository.obtenerPorUsuario.mockResolvedValue(null);

    await userProfileController.getProfileByUserId(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: "Profile not found" });
  });

  it("getProfileByUserId - debería manejar error interno", async () => {
    const error = new Error("Repo error");
    req.params.userId = "2";
    userProfileRepository.obtenerPorUsuario.mockRejectedValue(error);

    await userProfileController.getProfileByUserId(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Repo error" });
  });

  // ---- CREATE PROFILE ----
  it("createProfile - debería crear un perfil", async () => {
    const newProfile = { userid: "1" };
    req.body = newProfile;
    userProfileRepository.crear.mockResolvedValue(newProfile);

    await userProfileController.createProfile(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(newProfile);
  });

  it("createProfile - debería manejar error de validación", async () => {
    const error = new Error("Invalid data");
    userProfileRepository.crear.mockRejectedValue(error);

    await userProfileController.createProfile(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: "Invalid data" });
  });

  // ---- UPDATE PROFILE ----
  it("updateProfile - debería actualizar un perfil existente", async () => {
    const updated = { height: 175 };
    req.params.id = "1";
    req.body = updated;
    userProfileRepository.actualizar.mockResolvedValue(updated);

    await userProfileController.updateProfile(req, res);

    expect(res.json).toHaveBeenCalledWith(updated);
  });

  it("updateProfile - debería devolver 404 si no se encuentra", async () => {
    req.params.id = "1";
    userProfileRepository.actualizar.mockResolvedValue(null);

    await userProfileController.updateProfile(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: "Profile not found" });
  });

  it("updateProfile - debería manejar error interno", async () => {
    const error = new Error("DB error");
    req.params.id = "1";
    userProfileRepository.actualizar.mockRejectedValue(error);

    await userProfileController.updateProfile(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "DB error" });
  });

  // ---- DELETE PROFILE ----
  it("deleteProfile - debería eliminar un perfil", async () => {
    const deleted = { _id: "1" };
    req.params.id = "1";
    userProfileRepository.eliminar.mockResolvedValue(deleted);

    await userProfileController.deleteProfile(req, res);

    expect(res.json).toHaveBeenCalledWith(deleted);
  });

  it("deleteProfile - debería devolver 404 si no se encuentra", async () => {
    req.params.id = "2";
    userProfileRepository.eliminar.mockResolvedValue(null);

    await userProfileController.deleteProfile(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: "Profile not found" });
  });

  it("deleteProfile - debería manejar error interno", async () => {
    const error = new Error("Delete fail");
    req.params.id = "3";
    userProfileRepository.eliminar.mockRejectedValue(error);

    await userProfileController.deleteProfile(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Delete fail" });
  });
});
