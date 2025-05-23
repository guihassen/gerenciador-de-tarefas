// src/services/userService.js
const userRepo = require("../repositories/userRepository.js");

/* Regras de domínio atualizadas */
const DOMINIOS_PERMITIDOS = ["empresa.com.br", "exemplo.com"];
const NOMES_RESERVADOS = new Set(["admin", "root", "system"]);

function validarNome(full_name) {
  if (!full_name) {
    throw new Error("Nome completo é obrigatório.");
  }
  if (NOMES_RESERVADOS.has(full_name.toLowerCase())) {
    throw new Error("Nome de usuário reservado.");
  }
}

function validarDominioEmail(email) {
  if (!email) throw new Error("E-mail é obrigatório");
  const dominio = email.split("@")[1]?.toLowerCase();
  if (!DOMINIOS_PERMITIDOS.includes(dominio)) {
    throw new Error(`Domínio de e-mail não permitido: ${dominio}`);
  }
}

async function validarEmailUnico(email, ignorarId = null) {
  const usuarios = await userRepo.findAll();
  const existente = usuarios.find(
    (u) => u.email.toLowerCase() === email.toLowerCase() && u.id !== ignorarId
  );
  if (existente) throw new Error("E-mail já cadastrado.");
}

module.exports = {
  create: async (payload) => {
    validarNome(payload.full_name); // Alterado para full_name
    validarDominioEmail(payload.email);
    await validarEmailUnico(payload.email);
    return userRepo.create(payload);
  },

  list: async () => {
    return userRepo.findAll();
  },

  detail: async (id) => {
    return userRepo.findById(id);
  },

  update: async (id, payload) => {
    if (payload.full_name) validarNome(payload.full_name); // Alterado para full_name
    if (payload.email) {
      validarDominioEmail(payload.email);
      await validarEmailUnico(payload.email, id);
    }
    return userRepo.update(id, payload);
  },

  remove: async (id) => {
    const user = await userRepo.findById(id); // Corrigido: use userRepo diretamente
    if (!user) {
      throw new Error("Usuário não encontrado");
    }
    await userRepo.remove(id);
    return { message: `Usuário com ID ${id} removido` };
  },

  totals: async () => {
    return userRepo.withOrderTotals();
  },
};
