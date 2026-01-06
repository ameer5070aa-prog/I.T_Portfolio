import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from '../../shared/api';
import DeleteConfirmModal from '../../components/portfolio/DeleteConfirmModal';
import ProjectForm from '../../components/portfolio/ProjectForm';
import StatusBadge from '../../components/portfolio/StatusBadge';

function ProjectsManagerContent() {
  const queryClient = useQueryClient();
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const { data: projects, isLoading, error } = useQuery({
    queryKey: ['admin-projects'],
    queryFn: () => api.projects.list(),
  });

  const createMutation = useMutation({
    mutationFn: (data) => api.projects.create(data),
    onSuccess: () => {
      toast.success('Project created successfully!');
      queryClient.invalidateQueries({ queryKey: ['admin-projects'] });
      setModalOpen(false);
    },
    onError: (err) => {
      toast.error(err.message || 'Failed to create project');
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => api.projects.update(id, data),
    onSuccess: () => {
      toast.success('Project updated successfully!');
      queryClient.invalidateQueries({ queryKey: ['admin-projects'] });
      setModalOpen(false);
      setEditing(null);
    },
    onError: (err) => {
      toast.error(err.message || 'Failed to update project');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => api.projects.remove(id),
    onSuccess: () => {
      toast.success('Project deleted');
      queryClient.invalidateQueries({ queryKey: ['admin-projects'] });
      setDeleteId(null);
    },
    onError: (err) => {
      toast.error(err.message || 'Failed to delete project');
    },
  });

  const handleEdit = (project) => {
    setEditing(project);
    setModalOpen(true);
  };

  const handleAdd = () => {
    setEditing(null);
    setModalOpen(true);
  };

  const handleSubmit = (data) => {
    if (editing) {
      updateMutation.mutate({ id: editing.id, data });
    } else {
      createMutation.mutate(data);
    }
  };

  if (isLoading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger">
        Failed to load projects: {error.message}
      </div>
    );
  }

  return (
    <div className="container-fluid">
      <div className="row mb-4">
        <div className="col">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h4 className="mb-1">Projects Manager</h4>
              <p className="text-muted mb-0">Manage your portfolio projects</p>
            </div>
            <button className="btn btn-primary" onClick={handleAdd}>
              <i className="ti ti-plus me-2"></i>
              Add New Project
            </button>
          </div>
        </div>
      </div>

      {!projects || projects.length === 0 ? (
        <div className="card">
          <div className="card-body text-center py-5">
            <i className="ti ti-folder-open display-4 text-muted mb-3"></i>
            <h5>No projects yet</h5>
            <p className="text-muted">Click "Add New Project" to create your first project</p>
          </div>
        </div>
      ) : (
        <div className="card">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead>
                <tr>
                  <th style={{ width: '40px' }}></th>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Technologies</th>
                  <th>Status</th>
                  <th>Featured</th>
                  <th className="text-end" style={{ width: '150px' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((project) => (
                  <tr key={project.id}>
                    <td>
                      <div 
                        className="rounded-circle" 
                        style={{ 
                          width: '24px', 
                          height: '24px', 
                          backgroundColor: project.color 
                        }}
                      />
                    </td>
                    <td>
                      <strong>{project.title}</strong>
                      <br />
                      <small className="text-muted">{project.summary}</small>
                    </td>
                    <td>{project.category}</td>
                    <td>
                      <div className="d-flex flex-wrap gap-1">
                        {(project.technologies || []).slice(0, 3).map((tech, idx) => (
                          <span key={idx} className="badge bg-light text-dark border">
                            {tech}
                          </span>
                        ))}
                        {project.technologies && project.technologies.length > 3 && (
                          <span className="badge bg-light text-dark border">
                            +{project.technologies.length - 3}
                          </span>
                        )}
                      </div>
                    </td>
                    <td>
                      <StatusBadge status={project.status} />
                    </td>
                    <td>
                      {project.featured && (
                        <span className="badge bg-warning text-dark">
                          <i className="ti ti-star-filled"></i> Featured
                        </span>
                      )}
                    </td>
                    <td>
                      <div className="btn-group btn-group-sm">
                        <button 
                          className="btn btn-outline-secondary"
                          onClick={() => handleEdit(project)}
                        >
                          <i className="ti ti-edit"></i> Edit
                        </button>
                        <button 
                          className="btn btn-outline-danger"
                          onClick={() => setDeleteId(project.id)}
                        >
                          <i className="ti ti-trash"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add/Edit Modal */}
      {modalOpen && (
        <>
          <div className="modal fade show d-block" tabIndex="-1">
            <div className="modal-dialog modal-lg modal-dialog-scrollable">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">
                    {editing ? 'Edit Project' : 'Add New Project'}
                  </h5>
                  <button 
                    type="button" 
                    className="btn-close" 
                    onClick={() => setModalOpen(false)}
                  />
                </div>
                <div className="modal-body">
                  <ProjectForm
                    defaultValues={editing}
                    onSubmit={handleSubmit}
                    onCancel={() => setModalOpen(false)}
                    isSubmitting={createMutation.isPending || updateMutation.isPending}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="modal-backdrop fade show" />
        </>
      )}

      {/* Delete Confirmation */}
      <DeleteConfirmModal
        show={!!deleteId}
        title="Delete Project"
        message="Are you sure you want to delete this project? This action cannot be undone."
        onCancel={() => setDeleteId(null)}
        onConfirm={() => deleteId && deleteMutation.mutate(deleteId)}
        isLoading={deleteMutation.isPending}
      />
    </div>
  );
}

// Wrap with providers
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

export default function ProjectsManager() {
  return (
    <QueryClientProvider client={queryClient}>
      <ProjectsManagerContent />
      <ToastContainer position="bottom-right" autoClose={3000} />
    </QueryClientProvider>
  );
}
