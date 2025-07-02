import React, { useState } from 'react';

const Table = React.forwardRef(({ className = '', ...props }, ref) => (
  <>
    <style>
      {`
        .table-container {
          position: relative;
          width: 100%;
          overflow: auto;
        }
        
        .table {
          width: 100%;
          caption-side: bottom;
          font-size: 14px;
          border-collapse: collapse;
        }
        
        .table-header {
          /* No specific styles needed - handled by table-row */
        }
        
        .table-header .table-row {
          border-bottom: 1px solid #e2e8f0;
        }
        
        .table-body {
          /* No specific styles needed - handled by table-row */
        }
        
        .table-body .table-row:last-child {
          border-bottom: none;
        }
        
        .table-footer {
          border-top: 1px solid #e2e8f0;
          background-color: rgba(241, 245, 249, 0.5);
          font-weight: 500;
        }
        
        .table-footer .table-row:last-child {
          border-bottom: none;
        }
        
        .table-row {
          border-bottom: 1px solid #e2e8f0;
          transition: colors 0.2s ease;
        }
        
        .table-row:hover {
          background-color: rgba(241, 245, 249, 0.5);
        }
        
        .table-row.selected {
          background-color: #f1f5f9;
        }
        
        .table-head {
          height: 48px;
          padding: 0 16px;
          text-align: left;
          vertical-align: middle;
          font-weight: 500;
          color: #6b7280;
        }
        
        .table-head.has-checkbox {
          padding-right: 0;
        }
        
        .table-cell {
          padding: 16px;
          vertical-align: middle;
        }
        
        .table-cell.has-checkbox {
          padding-right: 0;
        }
        
        .table-caption {
          margin-top: 16px;
          font-size: 14px;
          color: #6b7280;
        }
        
        /* Dark mode support */
        @media (prefers-color-scheme: dark) {
          .table-header .table-row {
            border-bottom-color: #374151;
          }
          
          .table-body .table-row {
            border-bottom-color: #374151;
          }
          
          .table-footer {
            border-top-color: #374151;
            background-color: rgba(55, 65, 81, 0.5);
          }
          
          .table-row:hover {
            background-color: rgba(55, 65, 81, 0.5);
          }
          
          .table-row.selected {
            background-color: #374151;
          }
          
          .table-head {
            color: #d1d5db;
          }
          
          .table-caption {
            color: #d1d5db;
          }
        }
        
        /* Responsive design */
        @media (max-width: 640px) {
          .table-container {
            font-size: 12px;
          }
          
          .table-head,
          .table-cell {
            padding: 8px 12px;
          }
          
          .table-head {
            height: 40px;
          }
        }
        
        /* Striped rows variant */
        .table-striped .table-row:nth-child(even) {
          background-color: rgba(248, 250, 252, 0.5);
        }
        
        .table-striped .table-row:nth-child(even):hover {
          background-color: rgba(241, 245, 249, 0.8);
        }
        
        /* Bordered variant */
        .table-bordered {
          border: 1px solid #e2e8f0;
        }
        
        .table-bordered .table-head,
        .table-bordered .table-cell {
          border-right: 1px solid #e2e8f0;
        }
        
        .table-bordered .table-head:last-child,
        .table-bordered .table-cell:last-child {
          border-right: none;
        }
        
        /* Compact variant */
        .table-compact .table-head,
        .table-compact .table-cell {
          padding: 8px 12px;
        }
        
        .table-compact .table-head {
          height: 36px;
        }
      `}
    </style>
    <div className="table-container">
      <table
        ref={ref}
        className={`table ${className}`}
        {...props}
      />
    </div>
  </>
));

const TableHeader = React.forwardRef(({ className = '', ...props }, ref) => (
  <thead ref={ref} className={`table-header ${className}`} {...props} />
));

const TableBody = React.forwardRef(({ className = '', ...props }, ref) => (
  <tbody ref={ref} className={`table-body ${className}`} {...props} />
));

const TableFooter = React.forwardRef(({ className = '', ...props }, ref) => (
  <tfoot ref={ref} className={`table-footer ${className}`} {...props} />
));

const TableRow = React.forwardRef(({ className = '', selected, ...props }, ref) => (
  <tr
    ref={ref}
    className={`table-row ${selected ? 'selected' : ''} ${className}`}
    {...props}
  />
));

const TableHead = React.forwardRef(({ className = '', hasCheckbox, ...props }, ref) => (
  <th
    ref={ref}
    className={`table-head ${hasCheckbox ? 'has-checkbox' : ''} ${className}`}
    {...props}
  />
));

const TableCell = React.forwardRef(({ className = '', hasCheckbox, ...props }, ref) => (
  <td
    ref={ref}
    className={`table-cell ${hasCheckbox ? 'has-checkbox' : ''} ${className}`}
    {...props}
  />
));

const TableCaption = React.forwardRef(({ className = '', ...props }, ref) => (
  <caption
    ref={ref}
    className={`table-caption ${className}`}
    {...props}
  />
));

// Set display names
Table.displayName = 'Table';
TableHeader.displayName = 'TableHeader';
TableBody.displayName = 'TableBody';
TableFooter.displayName = 'TableFooter';
TableRow.displayName = 'TableRow';
TableHead.displayName = 'TableHead';
TableCell.displayName = 'TableCell';
TableCaption.displayName = 'TableCaption';

// Demo component
function TableDemo() {
  const [selectedRows, setSelectedRows] = useState(new Set());
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');

  const sampleData = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'Active' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Editor', status: 'Inactive' },
    { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'User', status: 'Active' },
    { id: 5, name: 'Charlie Wilson', email: 'charlie@example.com', role: 'Admin', status: 'Active' },
  ];

  const toggleRowSelection = (id) => {
    const newSelected = new Set(selectedRows);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedRows(newSelected);
  };

  const toggleAllSelection = () => {
    if (selectedRows.size === sampleData.length) {
      setSelectedRows(new Set());
    } else {
      setSelectedRows(new Set(sampleData.map(item => item.id)));
    }
  };

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const sortedData = [...sampleData].sort((a, b) => {
    if (!sortColumn) return 0;
    const aVal = a[sortColumn];
    const bVal = b[sortColumn];
    const modifier = sortDirection === 'asc' ? 1 : -1;
    return aVal < bVal ? -1 * modifier : aVal > bVal ? 1 * modifier : 0;
  });

  const getStatusBadge = (status) => ({
    padding: '4px 8px',
    borderRadius: '4px',
    fontSize: '12px',
    fontWeight: '500',
    backgroundColor: status === 'Active' ? '#dcfce7' : '#fee2e2',
    color: status === 'Active' ? '#166534' : '#dc2626'
  });

  return (
    <div style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto' }}>
      <h3 style={{ marginBottom: '30px', fontSize: '24px', fontWeight: 'bold' }}>Table Examples</h3>
      
      {/* Basic Table */}
      <div style={{ marginBottom: '40px' }}>
        <h4 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: '600' }}>Basic Table</h4>
        <Table>
          <TableCaption>A list of recent users and their information.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sampleData.map((user) => (
              <TableRow key={user.id}>
                <TableCell style={{ fontWeight: '500' }}>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  <span style={getStatusBadge(user.status)}>
                    {user.status}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Table with Selection */}
      <div style={{ marginBottom: '40px' }}>
        <h4 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: '600' }}>
          Table with Selection ({selectedRows.size} selected)
        </h4>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead hasCheckbox>
                <input
                  type="checkbox"
                  checked={selectedRows.size === sampleData.length}
                  onChange={toggleAllSelection}
                  style={{ margin: 0 }}
                />
              </TableHead>
              <TableHead 
                style={{ cursor: 'pointer' }}
                onClick={() => handleSort('name')}
              >
                Name {sortColumn === 'name' && (sortDirection === 'asc' ? '↑' : '↓')}
              </TableHead>
              <TableHead 
                style={{ cursor: 'pointer' }}
                onClick={() => handleSort('email')}
              >
                Email {sortColumn === 'email' && (sortDirection === 'asc' ? '↑' : '↓')}
              </TableHead>
              <TableHead 
                style={{ cursor: 'pointer' }}
                onClick={() => handleSort('role')}
              >
                Role {sortColumn === 'role' && (sortDirection === 'asc' ? '↑' : '↓')}
              </TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedData.map((user) => (
              <TableRow key={user.id} selected={selectedRows.has(user.id)}>
                <TableCell hasCheckbox>
                  <input
                    type="checkbox"
                    checked={selectedRows.has(user.id)}
                    onChange={() => toggleRowSelection(user.id)}
                    style={{ margin: 0 }}
                  />
                </TableCell>
                <TableCell style={{ fontWeight: '500' }}>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button 
                      style={{ 
                        padding: '4px 8px', 
                        fontSize: '12px', 
                        border: '1px solid #d1d5db', 
                        borderRadius: '4px',
                        backgroundColor: 'white',
                        cursor: 'pointer'
                      }}
                    >
                      Edit
                    </button>
                    <button 
                      style={{ 
                        padding: '4px 8px', 
                        fontSize: '12px', 
                        border: '1px solid #ef4444', 
                        borderRadius: '4px',
                        backgroundColor: '#fee2e2',
                        color: '#dc2626',
                        cursor: 'pointer'
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell hasCheckbox></TableCell>
              <TableCell colSpan={3} style={{ fontWeight: '600' }}>
                Total Users
              </TableCell>
              <TableCell style={{ fontWeight: '600' }}>
                {sampleData.length}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>

      {/* Table Variants */}
      <div style={{ display: 'grid', gap: '24px', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
        
        {/* Striped Table */}
        <div>
          <h4 style={{ marginBottom: '12px', fontSize: '16px', fontWeight: '600' }}>Striped Table</h4>
          <Table className="table-striped">
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Role</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sampleData.slice(0, 3).map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.role}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Bordered Table */}
        <div>
          <h4 style={{ marginBottom: '12px', fontSize: '16px', fontWeight: '600' }}>Bordered Table</h4>
          <Table className="table-bordered">
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sampleData.slice(0, 3).map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>
                    <span style={getStatusBadge(user.status)}>
                      {user.status}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Compact Table */}
        <div>
          <h4 style={{ marginBottom: '12px', fontSize: '16px', fontWeight: '600' }}>Compact Table</h4>
          <Table className="table-compact">
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sampleData.slice(0, 3).map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}

export default TableDemo;
export { 
  Table, 
  TableHeader, 
  TableBody, 
  TableFooter, 
  TableRow, 
  TableHead, 
  TableCell, 
  TableCaption 
};