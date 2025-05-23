const taskRepository = require("../repositories/taskRepository.js");

module.exports = {
  // Criar nova tarefa
  async create(req, res) {
    try {
      const task = await taskRepository.create(req.body);
      res.status(201).json({
        success: true,
        message: "Task created successfully",
        data: task,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  },

  // Buscar todas as tarefas
  async findAll(req, res) {
    try {
      const tasks = await taskRepository.findAll();
      res.status(200).json({
        success: true,
        data: tasks,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },

  // Buscar tarefa por ID
  async findByID(req, res) {
    try {
      const { id } = req.params;
      const task = await taskRepository.findByID(id);

      if (!task) {
        return res.status(404).json({
          success: false,
          message: "Task not found",
        });
      }

      res.status(200).json({
        success: true,
        data: task,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },

  // Buscar tarefas por usuário
  async findByUserId(req, res) {
    try {
      const { userId } = req.params;
      const tasks = await taskRepository.findByUserId(userId);

      res.status(200).json({
        success: true,
        data: tasks,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },

  // Buscar tarefas por projeto
  async findByProjectId(req, res) {
    try {
      const { projectId } = req.params;
      const tasks = await taskRepository.findByProjectId(projectId);

      res.status(200).json({
        success: true,
        data: tasks,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },

  // Atualizar tarefa
  async update(req, res) {
    try {
      const { id } = req.params;
      const task = await taskRepository.update(id, req.body);

      if (!task) {
        return res.status(404).json({
          success: false,
          message: "Task not found",
        });
      }

      res.status(200).json({
        success: true,
        message: "Task updated successfully",
        data: task,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  },

  // Remover tarefa
  async remove(req, res) {
    try {
      const { id } = req.params;

      // Verificar se a tarefa existe antes de remover
      const existingTask = await taskRepository.findByID(id);
      if (!existingTask) {
        return res.status(404).json({
          success: false,
          message: "Task not found",
        });
      }

      await taskRepository.remove(id);

      res.status(200).json({
        success: true,
        message: "Task removed successfully",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },

  // Marcar tarefa como concluída
  async markAsCompleted(req, res) {
    try {
      const { id } = req.params;

      // Buscar tarefa atual
      const currentTask = await taskRepository.findByID(id);
      if (!currentTask) {
        return res.status(404).json({
          success: false,
          message: "Task not found",
        });
      }

      // Atualizar apenas o status de conclusão
      const updatedTask = await taskRepository.update(id, {
        ...currentTask,
        is_completed: true,
      });

      res.status(200).json({
        success: true,
        message: "Task marked as completed",
        data: updatedTask,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  },

  // Marcar tarefa como não concluída
  async markAsIncomplete(req, res) {
    try {
      const { id } = req.params;

      // Buscar tarefa atual
      const currentTask = await taskRepository.findByID(id);
      if (!currentTask) {
        return res.status(404).json({
          success: false,
          message: "Task not found",
        });
      }

      // Atualizar apenas o status de conclusão
      const updatedTask = await taskRepository.update(id, {
        ...currentTask,
        is_completed: false,
      });

      res.status(200).json({
        success: true,
        message: "Task marked as incomplete",
        data: updatedTask,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  },
};
