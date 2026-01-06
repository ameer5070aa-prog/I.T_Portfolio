import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from '../../shared/api';
import DeleteConfirmModal from '../../components/portfolio/DeleteConfirmModal';
import StatusBadge from '../../components/portfolio/StatusBadge';

function CertManagerContent() {
  const qc = useQueryClient();
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [form, setForm] = useState({ title: '', issuer: '', status: 'planned', description: '', study_topics: [] });

  const { data, isLoading } = useQuery({
    queryKey: ['admin-certs'],
    queryFn: () => api.certifications.list(),
  });

  const saveMutation = useMutation({
    mutationFn: (payload) => editing ? api.certifications.update(editing.id, payload) : api.certifications.create(payload),
    onSuccess: () => {
      toast.success(editing ? 'Updated!' : 'Created!');
      qc.invalidateQueries({ queryKey: ['admin-certs'] });
      setModalOpen(false);
      setEditing(null);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => api.certifications.remove(id),
    onSuccess: () => {
      toast.success('Deleted');
      qc.invalidateQueries({ queryKey: ['admin-certs'] });
      setDeleteId(null);
    },
  });

  const openModal = (cert) => {
    setEditing(cert);
    setForm(cert ? { title: cert.title, issuer: cert.issuer, status: cert.status, description: cert.description || '', study_topics: cert.study_topics || [] } : { title: '', issuer: '', status: 'planned', description: '', study_topics: [] });
    setModalOpen(true);
  };

  if (isLoading) return <div className="text-center py-5"><div className="spinner-border" /></div>;

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4>Certifications Manager</h4>
        <button className="btn btn-primary" onClick={() => openModal(null)}>+ Add Certification</button>
      </div>

      <div className="row g-3">
        {(data || []).map(cert => (
          <div key={cert.id} className="col-md-6 col-lg-4">
            <div className="card h-100">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <h5 className="card-title mb-0">{cert.title}</h5>
                  <StatusBadge status={cert.status} />
                </div>
                <h6 className="text-muted">{cert.issuer}</h6>
                <p className="card-text small">{cert.description}</p>
                {cert.study_topics && cert.study_topics.length > 0 && (
                  <div className="mb-2">
                    {cert.study_topics.map((t, i) => (
                      <span key={i} className="badge bg-light text-dark border me-1 mb-1">{t}</span>
                    ))}
                  </div>
                )}
              </div>
              <div className="card-footer">
                <div className="btn-group btn-group-sm w-100">
                  <button className="btn btn-outline-secondary" onClick={() => openModal(cert)}>Edit</button>
                  <button className="btn btn-outline-danger" onClick={() => setDeleteId(cert.id)}>Delete</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {modalOpen && (
        <>
          <div className="modal fade show d-block" tabIndex="-1">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5>{editing ? 'Edit' : 'Add'} Certification</h5>
                  <button className="btn-close" onClick={() => setModalOpen(false)} />
                </div>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">Title *</label>
                    <input className="form-control" value={form.title} onChange={e => setForm({...form, title: e.target.value})} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Issuer *</label>
                    <input className="form-control" value={form.issuer} onChange={e => setForm({...form, issuer: e.target.value})} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Status</label>
                    <select className="form-select" value={form.status} onChange={e => setForm({...form, status: e.target.value})}>
                      <option value="planned">Planned</option>
                      <option value="in_progress">In Progress</option>
                      <option value="completed">Completed</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Description</label>
                    <textarea className="form-control" rows="3" value={form.description} onChange={e => setForm({...form, description: e.target.value})} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Study Topics (comma separated)</label>
                    <input className="form-control" value={form.study_topics.join(', ')} onChange={e => setForm({...form, study_topics: e.target.value.split(',').map(s => s.trim()).filter(Boolean)})} />
                  </div>
                </div>
                <div className="modal-footer">
                  <button className="btn btn-secondary" onClick={() => setModalOpen(false)}>Cancel</button>
                  <button className="btn btn-primary" onClick={() => saveMutation.mutate(form)} disabled={saveMutation.isPending}>
                    {saveMutation.isPending ? 'Saving...' : 'Save'}
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-backdrop fade show" />
        </>
      )}

      <DeleteConfirmModal show={!!deleteId} onCancel={() => setDeleteId(null)} onConfirm={() => deleteId && deleteMutation.mutate(deleteId)} isLoading={deleteMutation.isPending} />
    </div>
  );
}

const qc = new QueryClient();
export default function CertificationsManager() {
  return <QueryClientProvider client={qc}><CertManagerContent /><ToastContainer position="bottom-right" /></QueryClientProvider>;
}
