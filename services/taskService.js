const taskRepo = require("../repositories/taskRepository.js");

// CORREÇÃO DEFINITIVA: Prioridades válidas SEM acento
const PRIORIDADES_VALIDAS = new Set(["baixa", "media", "alta", "urgente"]);

function validarNomeTarefa(nome) {
  if (!nome || nome.trim().length === 0) {
    throw new Error("Nome da tarefa é obrigatório.");
  }
}

function validarDataVencimento(data) {
  // CORREÇÃO: Permitir data nula (opcional)
  if (!data) return; // Se não há data, não validar

  const hoje = new Date();
  const vencimento = new Date(data);
  if (isNaN(vencimento.getTime())) {
    throw new Error("Data de vencimento inválida.");
  }
  if (vencimento < hoje.setHours(0, 0, 0, 0)) {
    throw new Error("A data de vencimento não pode estar no passado.");
  }
}

function validarPrioridade(prioridade) {
  console.log("Validando prioridade:", prioridade); // DEBUG
  console.log("Prioridades válidas:", Array.from(PRIORIDADES_VALIDAS)); // DEBUG

  if (prioridade && !PRIORIDADES_VALIDAS.has(prioridade.toLowerCase())) {
    // MENSAGEM CORRIGIDA sem acento
    throw new Error("Prioridade inválida. Use: baixa, media, alta ou urgente.");
  }
}

module.exports = {
  create: async (payload) => {
    console.log("Payload recebido no service:", payload); // DEBUG

    validarNomeTarefa(payload.task_name);

    // CORREÇÃO: Só validar data se ela existir
    if (payload.due_date) {
      validarDataVencimento(payload.due_date);
    }

    validarPrioridade(payload.task_priority);

    return taskRepo.create(payload);
  },

  list: async () => {
    return taskRepo.findAll();
  },

  detail: async (id) => {
    const task = await taskRepo.findByID(id);
    if (!task) {
      throw new Error("Tarefa não encontrada.");
    }
    return task;
  },

  findByUserId: async (userId) => {
    return taskRepo.findByUserId(userId);
  },

  findByProjectId: async (projectId) => {
    return taskRepo.findByProjectId(projectId);
  },

  update: async (id, payload) => {
    if (payload.task_name) validarNomeTarefa(payload.task_name);
    if (payload.due_date) validarDataVencimento(payload.due_date);
    if (payload.task_priority) validarPrioridade(payload.task_priority);

    return taskRepo.update(id, payload);
  },

  remove: async (id) => {
    const task = await taskRepo.findByID(id);
    if (!task) {
      throw new Error("Tarefa não encontrada.");
    }
    await taskRepo.remove(id);
    return { message: `Tarefa com ID ${id} removida com sucesso.` };
  },

  markAsCompleted: async (id) => {
    const currentTask = await taskRepo.findByID(id);
    if (!currentTask) {
      throw new Error("Tarefa não encontrada.");
    }

    return taskRepo.update(id, {
      ...currentTask,
      is_completed: true,
    });
  },

  markAsIncomplete: async (id) => {
    const currentTask = await taskRepo.findByID(id);
    if (!currentTask) {
      throw new Error("Tarefa não encontrada.");
    }

    return taskRepo.update(id, {
      ...currentTask,
      is_completed: false,
    });
  },
};
