import React from 'react';

export default function DeleteConfirmModal({ 
  show, 
  title = 'Confirm Delete', 
  message = 'Are you sure you want to delete this item? This action cannot be undone.', 
  onCancel, 
  onConfirm, 
  confirmText = 'Delete', 
  isLoading = false 
}) {
  if (!show) return null;

  return (
    <>
      <div className="modal fade show d-block" tabIndex="-1" role="dialog">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{title}</h5>
              <button 
                type="button" 
                className="btn-close" 
                onClick={onCancel}
                disabled={isLoading}
              />
            </div>
            <div className="modal-body">
              <p className="mb-0">{message}</p>
            </div>
            <div className="modal-footer">
              <button 
                className="btn btn-secondary" 
                onClick={onCancel}
                disabled={isLoading}
              >
                Cancel
              </button>
              <button 
                className="btn btn-danger" 
                onClick={onConfirm}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" />
                    Deleting...
                  </>
                ) : confirmText}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="modal-backdrop fade show" />
    </>
  );
}
