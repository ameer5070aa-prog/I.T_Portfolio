// Admin Dashboard API Client
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

class APIClient {
  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Request failed' }));
      throw new Error(error.error || `HTTP ${response.status}`);
    }

    return response.json();
  }

  get(endpoint) {
    return this.request(endpoint);
  }

  post(endpoint, data) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  put(endpoint, data) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  patch(endpoint, data) {
    return this.request(endpoint, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }

  delete(endpoint) {
    return this.request(endpoint, { method: 'DELETE' });
  }
}

const client = new APIClient();

const api = {
  projects: {
    list: () => client.get('/projects'),
    get: (id) => client.get(`/projects/${id}`),
    create: (data) => client.post('/projects', data),
    update: (id, data) => client.put(`/projects/${id}`, data),
    remove: (id) => client.delete(`/projects/${id}`),
    reorder: (ids) => client.patch('/projects/reorder', { projectIds: ids }),
  },
  skills: {
    list: () => client.get('/skills'),
    create: (data) => client.post('/skills', data),
    update: (id, data) => client.put(`/skills/${id}`, data),
    remove: (id) => client.delete(`/skills/${id}`),
  },
  certifications: {
    list: () => client.get('/certifications'),
    get: (id) => client.get(`/certifications/${id}`),
    create: (data) => client.post('/certifications', data),
    update: (id, data) => client.put(`/certifications/${id}`, data),
    remove: (id) => client.delete(`/certifications/${id}`),
  },
  labs: {
    list: () => client.get('/labs'),
    create: (data) => client.post('/labs', data),
    update: (id, data) => client.put(`/labs/${id}`, data),
    remove: (id) => client.delete(`/labs/${id}`),
  },
  contact: {
    list: () => client.get('/contact'),
    updateStatus: (id, status) => client.patch(`/contact/${id}/status`, { status }),
    remove: (id) => client.delete(`/contact/${id}`),
  },
  personal: {
    get: () => client.get('/personal'),
    update: (data) => client.put('/personal', data),
  },
};

export default api;
