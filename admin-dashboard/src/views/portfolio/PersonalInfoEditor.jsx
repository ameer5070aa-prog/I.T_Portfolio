import React, { useEffect } from 'react';
import { useQuery, useMutation, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastContainer, toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import 'react-toastify/dist/ReactToastify.css';
import api from '../../shared/api';

function PersonalInfoContent() {
  const { data, isLoading } = useQuery({
    queryKey: ['admin-personal'],
    queryFn: () => api.personal.get(),
  });

  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  useEffect(() => {
    if (data) reset(data);
  }, [data, reset]);

  const saveMutation = useMutation({
    mutationFn: (payload) => api.personal.update(payload),
    onSuccess: () => toast.success('Personal info updated!'),
    onError: (err) => toast.error(err.message || 'Failed to update'),
  });

  if (isLoading) return <div className="text-center py-5"><div className="spinner-border" /></div>;

  return (
    <div className="container-fluid">
      <h4 className="mb-4">Personal Information</h4>

      <div className="card">
        <div className="card-body">
          <form onSubmit={handleSubmit((data) => saveMutation.mutate(data))}>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">Full Name *</label>
                <input className={`form-control ${errors.full_name ? 'is-invalid' : ''}`} {...register('full_name', { required: 'Required' })} />
                {errors.full_name && <div className="invalid-feedback">{errors.full_name.message}</div>}
              </div>
              <div className="col-md-6">
                <label className="form-label">Professional Title *</label>
                <input className={`form-control ${errors.title ? 'is-invalid' : ''}`} {...register('title', { required: 'Required' })} placeholder="e.g., IT Support Specialist" />
                {errors.title && <div className="invalid-feedback">{errors.title.message}</div>}
              </div>
            </div>

            <div className="mt-3">
              <label className="form-label">Tagline</label>
              <input className="form-control" {...register('tagline')} placeholder="Short catchy phrase" />
            </div>

            <div className="mt-3">
              <label className="form-label">Bio / About</label>
              <textarea className="form-control" rows="4" {...register('bio')} placeholder="Tell your story..." />
            </div>

            <div className="row g-3 mt-1">
              <div className="col-md-6">
                <label className="form-label">Email *</label>
                <input type="email" className={`form-control ${errors.email ? 'is-invalid' : ''}`} {...register('email', { required: 'Required' })} />
                {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
              </div>
              <div className="col-md-6">
                <label className="form-label">Phone</label>
                <input className="form-control" {...register('phone')} />
              </div>
            </div>

            <div className="mt-3">
              <label className="form-label">Location</label>
              <input className="form-control" {...register('location')} placeholder="City, Country" />
            </div>

            <hr className="my-4" />
            <h5 className="mb-3">Social Links</h5>

            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">GitHub</label>
                <input className="form-control" {...register('social_links.github')} placeholder="https://github.com/username" />
              </div>
              <div className="col-md-6">
                <label className="form-label">LinkedIn</label>
                <input className="form-control" {...register('social_links.linkedin')} placeholder="https://linkedin.com/in/username" />
              </div>
              <div className="col-md-6">
                <label className="form-label">Twitter</label>
                <input className="form-control" {...register('social_links.twitter')} placeholder="https://twitter.com/username" />
              </div>
              <div className="col-md-6">
                <label className="form-label">YouTube</label>
                <input className="form-control" {...register('social_links.youtube')} placeholder="https://youtube.com/@username" />
              </div>
            </div>

            <div className="mt-4 pt-3 border-top">
              <button type="submit" className="btn btn-primary" disabled={saveMutation.isPending}>
                {saveMutation.isPending ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

const qc = new QueryClient();
export default function PersonalInfoEditor() {
  return <QueryClientProvider client={qc}><PersonalInfoContent /><ToastContainer position="bottom-right" /></QueryClientProvider>;
}
