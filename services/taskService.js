const taskRepo = require("../repositories/taskRepository.js");

const PRIORIDADES_VALIDAS = new Set(["baixa", "média", "alta"]);

function validarNomeTarefa(nome) {
  if (!nome || nome.trim().length === 0) {
    throw new Error("Nome da tarefa é obrigatório.");
  }
}

function validarDataVencimento(data) {
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
  if (prioridade && !PRIORIDADES_VALIDAS.has(prioridade.toLowerCase())) {
    throw new Error("Prioridade inválida. Use: baixa, média ou alta.");
  }
}

module.exports = {
  create: async (payload) => {
    validarNomeTarefa(payload.task_name);
    validarDataVencimento(payload.due_date);
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
