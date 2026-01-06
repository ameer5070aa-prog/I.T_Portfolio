import React from 'react';
import { useForm } from 'react-hook-form';

export default function SkillForm({ defaultValues, onSubmit, onCancel, isSubmitting, categories = [] }) {
  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    defaultValues: {
      name: '',
      category: categories[0] || '',
      proficiency: 3,
      icon: '',
      description: '',
      ...defaultValues,
    },
  });

  const proficiency = watch('proficiency');

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="row g-3">
        <div className="col-md-8">
          <label className="form-label">Skill Name *</label>
          <input 
            className={`form-control ${errors.name ? 'is-invalid' : ''}`}
            {...register('name', { required: 'Name is required' })}
            placeholder="e.g., JavaScript, Networking"
          />
          {errors.name && <div className="invalid-feedback">{errors.name.message}</div>}
        </div>
        <div className="col-md-4">
          <label className="form-label">Icon (Lucide)</label>
          <input 
            className="form-control"
            {...register('icon')}
            placeholder="e.g., Code2, Cpu"
          />
          <small className="text-muted">Lucide React icon name</small>
        </div>
      </div>

      <div className="row g-3 mt-1">
        <div className="col-md-6">
          <label className="form-label">Category *</label>
          {categories.length > 0 ? (
            <select 
              className={`form-select ${errors.category ? 'is-invalid' : ''}`}
              {...register('category', { required: 'Category required' })}
            >
              {categories.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          ) : (
            <input 
              className={`form-control ${errors.category ? 'is-invalid' : ''}`}
              {...register('category', { required: 'Category required' })}
              placeholder="New category name"
            />
          )}
          {errors.category && <div className="invalid-feedback">{errors.category.message}</div>}
        </div>
        <div className="col-md-6">
          <label className="form-label">Proficiency: {proficiency}/5</label>
          <input 
            type="range"
            min="1"
            max="5"
            className="form-range"
            {...register('proficiency', { valueAsNumber: true })}
          />
          <div className="d-flex justify-content-between">
            <small className="text-muted">Beginner</small>
            <small className="text-muted">Expert</small>
          </div>
        </div>
      </div>

      <div className="mt-3">
        <label className="form-label">Description (optional)</label>
        <textarea 
          className="form-control"
          rows="2"
          {...register('description')}
          placeholder="Brief description of your experience with this skill"
        />
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
          {isSubmitting ? 'Saving...' : 'Save Skill'}
        </button>
      </div>
    </form>
  );
}
