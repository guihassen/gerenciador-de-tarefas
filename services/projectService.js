const projectRepo = require("../repositories/projectRepository.js");

const STATUS_VALIDOS = new Set(["ativo", "pausado", "concluído", "cancelado"]);

function validarNomeProjeto(nome) {
  if (!nome || nome.trim().length === 0) {
    throw new Error("Nome do projeto é obrigatório.");
  }
}

function validarStatus(status) {
  if (status && !STATUS_VALIDOS.has(status.toLowerCase())) {
    throw new Error(
      "Status inválido. Use: ativo, pausado, concluído ou cancelado."
    );
  }
}

module.exports = {
  create: async (payload) => {
    validarNomeProjeto(payload.project_name);
    validarStatus(payload.project_status);

    return projectRepo.create(payload);
  },

  list: async () => {
    return projectRepo.findAll();
  },

  detail: async (id) => {
    const project = await projectRepo.findByID(id);
    if (!project) {
      throw new Error("Projeto não encontrado.");
    }
    return project;
  },

  findByUserId: async (userId) => {
    return projectRepo.findByUserId(userId);
  },

  update: async (id, payload) => {
    if (payload.project_name) validarNomeProjeto(payload.project_name);
    if (payload.project_status) validarStatus(payload.project_status);

    return projectRepo.update(id, payload);
  },

  remove: async (id) => {
    const project = await projectRepo.findByID(id);
    if (!project) {
      throw new Error("Projeto não encontrado.");
    }
    await projectRepo.remove(id);
    return { message: `Projeto com ID ${id} removido com sucesso.` };
  },
};
