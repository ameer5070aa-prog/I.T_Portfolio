import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import CreatableSelect from 'react-select/creatable';
import ImageUpload from './ImageUpload';

export default function ProjectForm({ defaultValues, onSubmit, onCancel, isSubmitting }) {
  const [imageUrl, setImageUrl] = useState(defaultValues?.image_url || '');
  const { register, control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      title: '',
      summary: '',
      description: '',
      color: '#3B82F6',
      technologies: [],
      features: [],
      category: '',
      featured: false,
      status: 'draft',
      github_url: '',
      live_url: '',
      video_url: '',
      image_url: '',
      ...defaultValues,
    },
  });

  const handleFormSubmit = (data) => {
    onSubmit({ ...data, image_url: imageUrl });
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <div className="row g-3">
        <div className="col-md-8">
          <label className="form-label">Title *</label>
          <input 
            className={`form-control ${errors.title ? 'is-invalid' : ''}`}
            {...register('title', { required: 'Title is required', minLength: { value: 3, message: 'Min 3 characters' } })}
            placeholder="Project name"
          />
          {errors.title && <div className="invalid-feedback">{errors.title.message}</div>}
        </div>
        <div className="col-md-4">
          <label className="form-label">Color</label>
          <input 
            type="color"
            className="form-control form-control-color w-100"
            {...register('color')}
          />
        </div>
      </div>

      <div className="mt-3">
        <label className="form-label">Summary *</label>
        <input 
          className={`form-control ${errors.summary ? 'is-invalid' : ''}`}
          {...register('summary', { required: 'Summary required' })}
          placeholder="Brief one-liner"
        />
        {errors.summary && <div className="invalid-feedback">{errors.summary.message}</div>}
      </div>

      <div className="mt-3">
        <label className="form-label">Description *</label>
        <textarea 
          className={`form-control ${errors.description ? 'is-invalid' : ''}`}
          rows="4"
          {...register('description', { required: 'Description required' })}
          placeholder="Detailed description"
        />
        {errors.description && <div className="invalid-feedback">{errors.description.message}</div>}
      </div>

      <div className="row g-3 mt-1">
        <div className="col-md-6">
          <label className="form-label">Category *</label>
          <input 
            className={`form-control ${errors.category ? 'is-invalid' : ''}`}
            {...register('category', { required: 'Category required' })}
            placeholder="e.g., Web Development"
          />
          {errors.category && <div className="invalid-feedback">{errors.category.message}</div>}
        </div>
        <div className="col-md-6">
          <label className="form-label">Status</label>
          <select className="form-select" {...register('status')}>
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </div>
      </div>

      <div className="row g-3 mt-1">
        <div className="col-md-6">
          <label className="form-label">Technologies *</label>
          <Controller
            control={control}
            name="technologies"
            rules={{ validate: v => (v && v.length > 0) || 'At least one technology required' }}
            render={({ field: { value, onChange } }) => (
              <CreatableSelect
                isMulti
                value={(value || []).map(v => ({ label: v, value: v }))}
                onChange={(opts) => onChange((opts || []).map(o => o.value))}
                placeholder="Add technologies..."
              />
            )}
          />
          {errors.technologies && <small className="text-danger">{errors.technologies.message}</small>}
        </div>
        <div className="col-md-6">
          <label className="form-label">Features (optional)</label>
          <Controller
            control={control}
            name="features"
            render={({ field: { value, onChange } }) => (
              <CreatableSelect
                isMulti
                value={(value || []).map(v => ({ label: v, value: v }))}
                onChange={(opts) => onChange((opts || []).map(o => o.value))}
                placeholder="Add key features..."
              />
            )}
          />
        </div>
      </div>

      <div className="mt-3">
        <ImageUpload
          currentImage={imageUrl}
          onUpload={setImageUrl}
          label="Project Image"
        />
      </div>

      <div className="row g-3 mt-1">
        <div className="col-md-4">
          <label className="form-label">GitHub URL</label>
          <input className="form-control" {...register('github_url')} placeholder="https://github.com/..." />
        </div>
        <div className="col-md-4">
          <label className="form-label">Live URL</label>
          <input className="form-control" {...register('live_url')} placeholder="https://..." />
        </div>
        <div className="col-md-4">
          <label className="form-label">Video URL</label>
          <input className="form-control" {...register('video_url')} placeholder="https://..." />
        </div>
      </div>

      <div className="form-check form-switch mt-3">
        <input 
          className="form-check-input" 
          type="checkbox" 
          id="featuredSwitch"
          {...register('featured')}
        />
        <label className="form-check-label" htmlFor="featuredSwitch">
          Featured Project (show on homepage)
        </label>
      </div>

      <div className="d-flex gap-2 justify-content-end mt-4 pt-3 border-top">
        <button 
          type="button" 
          className="btn btn-secondary" 
          onClick={onCancel}
          disabled={isSubmitting}
        >
          Cancel
        </button>
        <button 
          type="submit" 
          className="btn btn-primary"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Saving...' : 'Save Project'}
        </button>
      </div>
    </form>
  );
}
