import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from '../../shared/api';
import DeleteConfirmModal from '../../components/portfolio/DeleteConfirmModal';
import StatusBadge from '../../components/portfolio/StatusBadge';

function ContactViewerContent() {
  const qc = useQueryClient();
  const [deleteId, setDeleteId] = useState(null);
  const [viewMessage, setViewMessage] = useState(null);

  const { data, isLoading } = useQuery({
    queryKey: ['admin-contact'],
    queryFn: () => api.contact.list(),
  });

  const updateStatusMutation = useMutation({
    mutationFn: ({ id, status }) => api.contact.updateStatus(id, status),
    onSuccess: () => {
      toast.success('Status updated');
      qc.invalidateQueries({ queryKey: ['admin-contact'] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => api.contact.remove(id),
    onSuccess: () => {
      toast.success('Message deleted');
      qc.invalidateQueries({ queryKey: ['admin-contact'] });
      setDeleteId(null);
    },
  });

  if (isLoading) return <div className="text-center py-5"><div className="spinner-border" /></div>;

  return (
    <div className="container-fluid">
      <h4 className="mb-4">Contact Submissions</h4>

      {!data || data.length === 0 ? (
        <div className="alert alert-light border">No contact submissions yet</div>
      ) : (
        <div className="card">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Message</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th className="text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                {data.map(msg => (
                  <tr key={msg.id}>
                    <td><strong>{msg.name}</strong></td>
                    <td>{msg.email}</td>
                    <td>
                      <span className="text-truncate d-inline-block" style={{maxWidth: '300px'}}>
                        {msg.message}
                      </span>
                      <button className="btn btn-link btn-sm p-0 ms-2" onClick={() => setViewMessage(msg)}>View</button>
                    </td>
                    <td>
                      <select 
                        className="form-select form-select-sm" 
                        value={msg.status}
                        onChange={(e) => updateStatusMutation.mutate({ id: msg.id, status: e.target.value })}
                        style={{width: 'auto'}}
                      >
                        <option value="new">New</option>
                        <option value="read">Read</option>
                        <option value="replied">Replied</option>
                        <option value="archived">Archived</option>
                      </select>
                    </td>
                    <td><small>{new Date(msg.created_at).toLocaleDateString()}</small></td>
                    <td className="text-end">
                      <button className="btn btn-sm btn-outline-danger" onClick={() => setDeleteId(msg.id)}>
                        <i className="ti ti-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {viewMessage && (
        <>
          <div className="modal fade show d-block" tabIndex="-1">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5>Message from {viewMessage.name}</h5>
                  <button className="btn-close" onClick={() => setViewMessage(null)} />
                </div>
                <div className="modal-body">
                  <p><strong>Email:</strong> {viewMessage.email}</p>
                  {viewMessage.subject && <p><strong>Subject:</strong> {viewMessage.subject}</p>}
                  <p><strong>Message:</strong></p>
                  <p>{viewMessage.message}</p>
                  <small className="text-muted">Received: {new Date(viewMessage.created_at).toLocaleString()}</small>
                </div>
                <div className="modal-footer">
                  <button className="btn btn-secondary" onClick={() => setViewMessage(null)}>Close</button>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-backdrop fade show" />
        </>
      )}

      <DeleteConfirmModal show={!!deleteId} message="Delete this message?" onCancel={() => setDeleteId(null)} onConfirm={() => deleteId && deleteMutation.mutate(deleteId)} isLoading={deleteMutation.isPending} />
    </div>
  );
}

const qc = new QueryClient();
export default function ContactViewer() {
  return <QueryClientProvider client={qc}><ContactViewerContent /><ToastContainer position="bottom-right" /></QueryClientProvider>;
}
