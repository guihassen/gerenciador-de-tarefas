// src/services/userService.js
const userRepo = require("../repositories/userRepositories.js");

/* Regras de domínio
   ------------------
   1. O nome não pode ser um reservado do sistema.
   2. O e-mail deve pertencer a um domínio permitido.
   3. Não pode haver dois usuários com o mesmo e-mail.
*/
const DOMINIOS_PERMITIDOS = ["empresa.com.br", "exemplo.com"];
const NOMES_RESERVADOS = new Set(["admin", "root", "system"]);

function validarNome(nome) {
  if (NOMES_RESERVADOS.has(nome.toLowerCase())) {
    throw new Error("Nome de usuário reservado.");
  }
}

function validarDominioEmail(email) {
  const dominio = email.split("@")[1]?.toLowerCase();
  if (!DOMINIOS_PERMITIDOS.includes(dominio)) {
    throw new Error(`Domínio de e-mail não permitido: ${dominio}`);
  }
}

function validarEmailUnico(email, ignorarId = null) {
  const existente = userRepo
    .findAll()
    .find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.id !== ignorarId
    );
  if (existente) throw new Error("E-mail já cadastrado.");
}

module.exports = {
  /* CRUD + join agregado */
  create(payload) {
    validarNome(payload.name);
    validarDominioEmail(payload.email);
    validarEmailUnico(payload.email);
    return userRepo.create(payload);
  },

  list() {
    return userRepo.findAll();
  },

  detail(id) {
    return userRepo.findById(id);
  },

  update(id, payload) {
    if (payload.name) validarNome(payload.name);
    if (payload.email) {
      validarDominioEmail(payload.email);
      validarEmailUnico(payload.email, id);
    }
    return userRepo.update(id, payload);
  },

  remove(id) {
    return userRepo.remove(id);
  },

  totals() {
    /* join entre users e orders – soma total por usuário */
    return userRepo.withOrderTotals();
  },
};
