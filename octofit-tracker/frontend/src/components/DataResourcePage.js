import React, { useEffect, useMemo, useState } from 'react';

const getItemsFromResponse = (data) => {
  if (Array.isArray(data)) {
    return data;
  }

  if (Array.isArray(data?.results)) {
    return data.results;
  }

  return [];
};

const getPrimaryValue = (item) => (
  item?.name
  || item?.title
  || item?.username
  || item?.team_name
  || item?.activity_type
  || item?.workout_type
  || item?.id
  || 'Record'
);

const getSecondaryValue = (item) => (
  item?.email
  || item?.description
  || item?.category
  || item?.status
  || item?.team
  || item?.score
  || item?.duration
  || item?.date
  || item?.created_at
  || 'No secondary data'
);

const getBadgeValue = (item) => (
  item?.score
  || item?.points
  || item?.rank
  || item?.duration
  || item?.distance
  || item?.members_count
  || item?.role
  || 'N/A'
);

const toDisplayValue = (value) => {
  if (value === null || value === undefined || value === '') {
    return 'N/A';
  }

  if (typeof value === 'object') {
    return JSON.stringify(value);
  }

  return String(value);
};

function DataResourcePage({ title, description, endpoint, emptyMessage, accentClass }) {
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let ignore = false;

    const fetchItems = async () => {
      setLoading(true);
      setError('');
      console.log(`${title} endpoint:`, endpoint);

      try {
        const response = await fetch(endpoint);

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const data = await response.json();
        const normalizedItems = getItemsFromResponse(data);
        console.log(`${title} fetched data:`, data);

        if (!ignore) {
          setItems(normalizedItems);
        }
      } catch (fetchError) {
        console.error(`Error fetching ${title.toLowerCase()}:`, fetchError);

        if (!ignore) {
          setItems([]);
          setError(fetchError.message || 'Unable to fetch data.');
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    };

    fetchItems();

    return () => {
      ignore = true;
    };
  }, [endpoint, title]);

  const filteredItems = useMemo(() => {
    const loweredSearchTerm = searchTerm.trim().toLowerCase();

    if (!loweredSearchTerm) {
      return items;
    }

    return items.filter((item) => JSON.stringify(item).toLowerCase().includes(loweredSearchTerm));
  }, [items, searchTerm]);

  const sampleKeys = useMemo(() => {
    const keys = new Set();

    filteredItems.slice(0, 5).forEach((item) => {
      Object.keys(item || {}).forEach((key) => {
        if (keys.size < 4) {
          keys.add(key);
        }
      });
    });

    return Array.from(keys);
  }, [filteredItems]);

  return (
    <section className="resource-page pb-5">
      <div className="card border-0 shadow-sm resource-hero mb-4">
        <div className="card-body p-4 p-lg-5">
          <div className="d-flex flex-column flex-lg-row align-items-lg-center justify-content-between gap-3">
            <div>
              <span className={`badge rounded-pill ${accentClass} mb-3`}>{title}</span>
              <h1 className="display-6 fw-bold mb-2">{title}</h1>
              <p className="lead text-secondary mb-0">{description}</p>
            </div>
            <div className="d-flex gap-2 flex-wrap justify-content-lg-end">
              <a
                className="btn btn-outline-dark"
                href={endpoint}
                target="_blank"
                rel="noreferrer"
              >
                Open API Link
              </a>
              <button
                type="button"
                className="btn btn-dark"
                onClick={() => window.location.reload()}
              >
                Refresh Page
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="row g-3 mb-4">
        <div className="col-md-4">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <h2 className="h5 text-uppercase text-secondary">Total Records</h2>
              <p className="display-6 fw-semibold mb-0">{items.length}</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <h2 className="h5 text-uppercase text-secondary">Filtered View</h2>
              <p className="display-6 fw-semibold mb-0">{filteredItems.length}</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <h2 className="h5 text-uppercase text-secondary">Response Type</h2>
              <p className="fs-4 fw-semibold mb-0">Array or Paginated</p>
            </div>
          </div>
        </div>
      </div>

      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body">
          <form className="row g-3 align-items-end">
            <div className="col-md-9">
              <label htmlFor={`${title}-search`} className="form-label fw-semibold">Filter Data</label>
              <input
                id={`${title}-search`}
                type="search"
                className="form-control"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search across all fields"
              />
            </div>
            <div className="col-md-3 d-grid">
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => setSearchTerm('')}
              >
                Clear Filter
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="card border-0 shadow-sm">
        <div className="card-body">
          <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-3">
            <h2 className="h4 mb-0">{title} Data Table</h2>
            <a
              className="link-primary fw-semibold text-decoration-none"
              href={endpoint}
              target="_blank"
              rel="noreferrer"
            >
              View endpoint response
            </a>
          </div>

          {loading && <div className="alert alert-info mb-0">Loading data from the REST API.</div>}
          {!loading && error && <div className="alert alert-danger mb-0">{error}</div>}
          {!loading && !error && filteredItems.length === 0 && (
            <div className="alert alert-warning mb-0">{emptyMessage}</div>
          )}

          {!loading && !error && filteredItems.length > 0 && (
            <div className="table-responsive">
              <table className="table table-hover align-middle octofit-table mb-0">
                <thead className="table-light">
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Primary</th>
                    <th scope="col">Secondary</th>
                    <th scope="col">Metrics</th>
                    <th scope="col">Preview</th>
                    <th scope="col" className="text-end">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredItems.map((item, index) => (
                    <tr key={item.id || `${title}-${index}`}>
                      <th scope="row">{index + 1}</th>
                      <td>
                        <div className="fw-semibold">{getPrimaryValue(item)}</div>
                        <div className="small text-secondary">ID: {toDisplayValue(item.id)}</div>
                      </td>
                      <td>{getSecondaryValue(item)}</td>
                      <td>
                        <span className={`badge rounded-pill ${accentClass}`}>{getBadgeValue(item)}</span>
                      </td>
                      <td>
                        {sampleKeys.length > 0 ? (
                          <div className="small text-secondary">
                            {sampleKeys.map((key) => (
                              <div key={`${title}-${index}-${key}`}>
                                <span className="fw-semibold text-dark">{key}:</span> {toDisplayValue(item[key])}
                              </div>
                            ))}
                          </div>
                        ) : 'N/A'}
                      </td>
                      <td className="text-end">
                        <button
                          type="button"
                          className="btn btn-sm btn-dark"
                          onClick={() => setSelectedItem(item)}
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {selectedItem && (
        <div className="modal fade show d-block octofit-modal" tabIndex="-1" role="dialog" aria-modal="true">
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content border-0 shadow-lg">
              <div className="modal-header">
                <h2 className="modal-title h5 mb-0">{title} Details</h2>
                <button
                  type="button"
                  className="btn-close"
                  aria-label="Close"
                  onClick={() => setSelectedItem(null)}
                />
              </div>
              <div className="modal-body">
                <div className="card bg-light border-0">
                  <div className="card-body">
                    <pre className="mb-0 small octofit-pretty-json">
                      {JSON.stringify(selectedItem, null, 2)}
                    </pre>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() => setSelectedItem(null)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {selectedItem && <div className="modal-backdrop fade show" onClick={() => setSelectedItem(null)} />}
    </section>
  );
}

export default DataResourcePage;