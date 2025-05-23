const userRepo = require("../repositories/userRepository.js");

module.exports = {
  create: async (payload) => {
    if (!payload.name || payload.name.trim().length === 0) {
      throw new Error("Nome do usuário é obrigatório.");
    }
    if (!payload.email || !payload.email.includes("@")) {
      throw new Error("Email inválido.");
    }
    return userRepo.create(payload);
  },

  list: async () => {
    return userRepo.findAll();
  },

  detail: async (id) => {
    const user = await userRepo.findById(id); // Alterado para findById
    if (!user) {
      throw new Error("Usuário não encontrado.");
    }
    return user;
  },

  update: async (id, payload) => {
    if (payload.name && payload.name.trim().length === 0) {
      throw new Error("Nome do usuário não pode ser vazio.");
    }
    if (payload.email && !payload.email.includes("@")) {
      throw new Error("Email inválido.");
    }
    return userRepo.update(id, payload);
  },

  remove: async (id) => {
    const user = await userRepo.findById(id); // Alterado para findById
    if (!user) {
      throw new Error("Usuário não encontrado.");
    }
    await userRepo.remove(id);
    return { message: `Usuário com ID ${id} removido com sucesso.` };
  },

  totals: async () => {
    // Implemente esta função no userRepository se necessário
    return userRepo.getTotals();
  },
};
