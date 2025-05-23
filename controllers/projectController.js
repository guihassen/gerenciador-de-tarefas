const projectRepository = require("../repositories/projectRepository.js");

module.exports = {
  // Criar novo projeto
  async create(req, res) {
    try {
      const project = await projectRepository.create(req.body);
      res.status(201).json({
        success: true,
        message: "Project created successfully",
        data: project,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  },

  // Buscar todos os projetos
  async findAll(req, res) {
    try {
      const projects = await projectRepository.findAll();
      res.status(200).json({
        success: true,
        data: projects,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },

  // Buscar projeto por ID
  async findByID(req, res) {
    try {
      const { id } = req.params;
      const project = await projectRepository.findByID(id);

      if (!project) {
        return res.status(404).json({
          success: false,
          message: "Project not found",
        });
      }

      res.status(200).json({
        success: true,
        data: project,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },

  // Buscar projetos por usuário
  async findByUserId(req, res) {
    try {
      const { userId } = req.params;
      const projects = await projectRepository.findByUserId(userId);

      res.status(200).json({
        success: true,
        data: projects,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },

  // Atualizar projeto
  async update(req, res) {
    try {
      const { id } = req.params;
      const project = await projectRepository.update(id, req.body);

      if (!project) {
        return res.status(404).json({
          success: false,
          message: "Project not found",
        });
      }

      res.status(200).json({
        success: true,
        message: "Project updated successfully",
        data: project,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  },

  // Remover projeto
  async remove(req, res) {
    try {
      const { id } = req.params;

      // Verificar se o projeto existe antes de remover
      const existingProject = await projectRepository.findByID(id);
      if (!existingProject) {
        return res.status(404).json({
          success: false,
          message: "Project not found",
        });
      }

      await projectRepository.remove(id);

      res.status(200).json({
        success: true,
        message: "Project removed successfully",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },
};
