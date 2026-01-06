import React, { useState, useMemo } from 'react';
import { useQuery, useMutation, useQueryClient, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from '../../shared/api';
import DeleteConfirmModal from '../../components/portfolio/DeleteConfirmModal';
import SkillForm from '../../components/portfolio/SkillForm';

function SkillsManagerContent() {
  const queryClient = useQueryClient();
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const { data: skills, isLoading, error } = useQuery({
    queryKey: ['admin-skills'],
    queryFn: () => api.skills.list(),
  });

  const categories = useMemo(() => {
    if (!skills) return [];
    const cats = new Set(skills.map(s => s.category));
    return Array.from(cats).sort();
  }, [skills]);

  const groupedSkills = useMemo(() => {
    if (!skills) return {};
    return skills.reduce((acc, skill) => {
      if (!acc[skill.category]) acc[skill.category] = [];
      acc[skill.category].push(skill);
      return acc;
    }, {});
  }, [skills]);

  const createMutation = useMutation({
    mutationFn: (data) => api.skills.create(data),
    onSuccess: () => {
      toast.success('Skill created successfully!');
      queryClient.invalidateQueries({ queryKey: ['admin-skills'] });
      setModalOpen(false);
    },
    onError: (err) => toast.error(err.message || 'Failed to create skill'),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => api.skills.update(id, data),
    onSuccess: () => {
      toast.success('Skill updated successfully!');
      queryClient.invalidateQueries({ queryKey: ['admin-skills'] });
      setModalOpen(false);
      setEditing(null);
    },
    onError: (err) => toast.error(err.message || 'Failed to update skill'),
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => api.skills.remove(id),
    onSuccess: () => {
      toast.success('Skill deleted');
      queryClient.invalidateQueries({ queryKey: ['admin-skills'] });
      setDeleteId(null);
    },
    onError: (err) => toast.error(err.message || 'Failed to delete skill'),
  });

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
        <div className="spinner-border text-primary" />
      </div>
    );
  }

  if (error) {
    return <div className="alert alert-danger">Failed to load skills: {error.message}</div>;
  }

  return (
    <div className="container-fluid">
      <div className="row mb-4">
        <div className="col">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h4 className="mb-1">Skills Manager</h4>
              <p className="text-muted mb-0">Manage your technical skills</p>
            </div>
            <button className="btn btn-primary" onClick={() => { setEditing(null); setModalOpen(true); }}>
              <i className="ti ti-plus me-2"></i>
              Add New Skill
            </button>
          </div>
        </div>
      </div>

      {!skills || skills.length === 0 ? (
        <div className="card">
          <div className="card-body text-center py-5">
            <i className="ti ti-tool display-4 text-muted mb-3"></i>
            <h5>No skills yet</h5>
            <p className="text-muted">Click "Add New Skill" to create your first skill</p>
          </div>
        </div>
      ) : (
        Object.entries(groupedSkills).map(([category, categorySkills]) => (
          <div key={category} className="card mb-3">
            <div className="card-header">
              <h5 className="mb-0">{category}</h5>
            </div>
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead>
                  <tr>
                    <th style={{ width: '50%' }}>Name</th>
                    <th>Proficiency</th>
                    <th className="text-end" style={{ width: '150px' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {categorySkills.map((skill) => (
                    <tr key={skill.id}>
                      <td>
                        <strong>{skill.name}</strong>
                        {skill.description && (
                          <>
                            <br />
                            <small className="text-muted">{skill.description}</small>
                          </>
                        )}
                      </td>
                      <td>
                        <div className="d-flex align-items-center gap-2" style={{ minWidth: '200px' }}>
                          <div className="progress flex-grow-1" style={{ height: '8px' }}>
                            <div 
                              className="progress-bar bg-primary" 
                              style={{ width: `${(skill.proficiency / 5) * 100}%` }}
                            />
                          </div>
                          <span className="badge bg-light text-dark border">
                            {skill.proficiency}/5
                          </span>
                        </div>
                      </td>
                      <td>
                        <div className="btn-group btn-group-sm">
                          <button 
                            className="btn btn-outline-secondary"
                            onClick={() => { setEditing(skill); setModalOpen(true); }}
                          >
                            <i className="ti ti-edit"></i> Edit
                          </button>
                          <button 
                            className="btn btn-outline-danger"
                            onClick={() => setDeleteId(skill.id)}
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
        ))
      )}

      {/* Add/Edit Modal */}
      {modalOpen && (
        <>
          <div className="modal fade show d-block" tabIndex="-1">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">{editing ? 'Edit Skill' : 'Add New Skill'}</h5>
                  <button 
                    type="button" 
                    className="btn-close" 
                    onClick={() => setModalOpen(false)}
                  />
                </div>
                <div className="modal-body">
                  <SkillForm
                    defaultValues={editing}
                    categories={categories}
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
        title="Delete Skill"
        message="Are you sure you want to delete this skill?"
        onCancel={() => setDeleteId(null)}
        onConfirm={() => deleteId && deleteMutation.mutate(deleteId)}
        isLoading={deleteMutation.isPending}
      />
    </div>
  );
}

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false, retry: 1 } },
});

export default function SkillsManager() {
  return (
    <QueryClientProvider client={queryClient}>
      <SkillsManagerContent />
      <ToastContainer position="bottom-right" autoClose={3000} />
    </QueryClientProvider>
  );
}
