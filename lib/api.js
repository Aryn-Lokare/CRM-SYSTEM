// API utility functions for all CRM models

const API_BASE = '/api';

// Generic API functions
async function apiRequest(url, options = {}) {
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'API request failed');
  }

  return response.json();
}

// Leads API
export const leadsApi = {
  getAll: (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return apiRequest(`${API_BASE}/leads?${queryString}`);
  },
  getById: (id) => apiRequest(`${API_BASE}/leads/${id}`),
  create: (data) => apiRequest(`${API_BASE}/leads`, {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: (id, data) => apiRequest(`${API_BASE}/leads/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  delete: (id) => apiRequest(`${API_BASE}/leads/${id}`, {
    method: 'DELETE',
  }),
};

// Contacts API
export const contactsApi = {
  getAll: (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return apiRequest(`${API_BASE}/contacts?${queryString}`);
  },
  getById: (id) => apiRequest(`${API_BASE}/contacts/${id}`),
  create: (data) => apiRequest(`${API_BASE}/contacts`, {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: (id, data) => apiRequest(`${API_BASE}/contacts/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  delete: (id) => apiRequest(`${API_BASE}/contacts/${id}`, {
    method: 'DELETE',
  }),
};

// Accounts API
export const accountsApi = {
  getAll: (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return apiRequest(`${API_BASE}/accounts?${queryString}`);
  },
  getById: (id) => apiRequest(`${API_BASE}/accounts/${id}`),
  create: (data) => apiRequest(`${API_BASE}/accounts`, {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: (id, data) => apiRequest(`${API_BASE}/accounts/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  delete: (id) => apiRequest(`${API_BASE}/accounts/${id}`, {
    method: 'DELETE',
  }),
};

// Deals API
export const dealsApi = {
  getAll: (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return apiRequest(`${API_BASE}/deals?${queryString}`);
  },
  getById: (id) => apiRequest(`${API_BASE}/deals/${id}`),
  create: (data) => apiRequest(`${API_BASE}/deals`, {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: (id, data) => apiRequest(`${API_BASE}/deals/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  delete: (id) => apiRequest(`${API_BASE}/deals/${id}`, {
    method: 'DELETE',
  }),
};

// Emails API
export const emailsApi = {
  getAll: (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return apiRequest(`${API_BASE}/emails?${queryString}`);
  },
  getById: (id) => apiRequest(`${API_BASE}/emails/${id}`),
  create: (data) => apiRequest(`${API_BASE}/emails`, {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: (id, data) => apiRequest(`${API_BASE}/emails/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  delete: (id) => apiRequest(`${API_BASE}/emails/${id}`, {
    method: 'DELETE',
  }),
};

// Tasks API
export const tasksApi = {
  getAll: (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return apiRequest(`${API_BASE}/tasks?${queryString}`);
  },
  getById: (id) => apiRequest(`${API_BASE}/tasks/${id}`),
  create: (data) => apiRequest(`${API_BASE}/tasks`, {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: (id, data) => apiRequest(`${API_BASE}/tasks/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  delete: (id) => apiRequest(`${API_BASE}/tasks/${id}`, {
    method: 'DELETE',
  }),
};

// Projects API
export const projectsApi = {
  getAll: (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return apiRequest(`${API_BASE}/projects?${queryString}`);
  },
  getById: (id) => apiRequest(`${API_BASE}/projects/${id}`),
  create: (data) => apiRequest(`${API_BASE}/projects`, {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: (id, data) => apiRequest(`${API_BASE}/projects/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  delete: (id) => apiRequest(`${API_BASE}/projects/${id}`, {
    method: 'DELETE',
  }),
};

// Project Tasks API
export const projectTasksApi = {
  getAll: (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return apiRequest(`${API_BASE}/project-tasks?${queryString}`);
  },
  getById: (id) => apiRequest(`${API_BASE}/project-tasks/${id}`),
  create: (data) => apiRequest(`${API_BASE}/project-tasks`, {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: (id, data) => apiRequest(`${API_BASE}/project-tasks/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  delete: (id) => apiRequest(`${API_BASE}/project-tasks/${id}`, {
    method: 'DELETE',
  }),
};