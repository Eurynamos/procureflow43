export const mockUser = {
  name: 'Alex',
  surname: 'Morgan',
  title: 'Procurement Analyst',
  rank: 'Major',
  startDate: '2022-05-14',
  email: 'alex.morgan@procureflow.com'
};

export const mockSettings = {
  cisiCodes: [
    { code: 'CISI-102', name: 'IT Equipment', description: 'Servers and networking gear' },
    { code: 'CISI-231', name: 'Office Supplies', description: 'Daily operational items' }
  ],
  fundManagers: [
    { code: 'FM-84', division: 'Operations', name: 'Sienna Reed', description: 'North division' },
    { code: 'FM-92', division: 'Finance', name: 'Jordan Lee', description: 'Capital expenditure' }
  ],
  currencies: [
    { symbol: '$', name: 'USD', description: 'United States Dollar' },
    { symbol: '₺', name: 'TRY', description: 'Turkish Lira' },
    { symbol: '€', name: 'EUR', description: 'Euro' }
  ],
  ranks: [
    { symbol: 'COL', rank: 'Colonel' },
    { symbol: 'MAJ', rank: 'Major' },
    { symbol: 'SGM', rank: 'Sergeant Major' },
    { symbol: 'SSG', rank: 'Staff Sergeant' }
  ],
  contractingMail: {
    subjectTemplate: 'Invitation to Bid - {{pendingNo}}',
    bodyTemplate:
      'Hello team,\n\nPlease review the attached procurement request for {{description}}. Kindly submit your bid by {{deadline}}.\n\nRegards,\nProcureFlow Contracting Office'
  }
};

export const mockCompanies = [
  {
    id: 'comp-1',
    name: 'Apex Electrical',
    city: 'Ankara',
    email: 'contact@apexelectrical.com',
    status: 'Active'
  },
  {
    id: 'comp-2',
    name: 'Nimbus Cleaning',
    city: 'Istanbul',
    email: 'sales@nimbuscleaning.com',
    status: 'Active'
  },
  {
    id: 'comp-3',
    name: 'Vertex Supplies',
    city: 'Izmir',
    email: 'info@vertexsupplies.com',
    status: 'Inactive'
  }
];

export const mockCompanyCategories = [
  {
    id: 'cat-1',
    name: 'Electrical Supplies',
    companies: ['comp-1']
  },
  {
    id: 'cat-2',
    name: 'Cleaning Supplies',
    companies: ['comp-2']
  }
];

export const mockFiscalFiles = [
  {
    id: 'ff-1',
    pendingNo: 'P260001',
    requestNumber: 'REQ-Alpha-84',
    description: 'Security camera replacement',
    amount: 12800,
    currency: 'USD',
    cisiCode: 'CISI-102',
    fundManager: 'FM-84',
    createdDate: '2024-06-14',
    createdBy: 'alex.morgan@procureflow.com'
  },
  {
    id: 'ff-2',
    pendingNo: 'P260002',
    requestNumber: 'REQ-Beta-21',
    description: 'Office refresh supplies',
    amount: 4200,
    currency: 'TRY',
    cisiCode: 'CISI-231',
    fundManager: 'FM-92',
    createdDate: '2024-06-18',
    createdBy: 'alex.morgan@procureflow.com'
  }
];

export const mockPendingFiles = [
  {
    id: 'pf-1',
    pendingNo: 'P260001',
    requestNumber: 'REQ-Alpha-84',
    description: 'Security camera replacement',
    amount: 12800,
    currency: 'USD',
    status: 'awaiting review',
    createdDate: '2024-06-14',
    createdBy: 'alex.morgan@procureflow.com'
  }
];

export const mockInProgress = [
  {
    id: 'ip-1',
    pendingNo: 'P260002',
    description: 'Office refresh supplies',
    status: 'awaiting item list',
    updatedBy: 'alex.morgan@procureflow.com',
    updatedAt: '2024-06-18',
    items: []
  }
];

export const mockCompleted = [
  {
    id: 'cp-1',
    pendingNo: 'P250887',
    description: 'Fleet maintenance tools',
    status: 'awaiting payment',
    updatedBy: 'sienna.reed@procureflow.com',
    updatedAt: '2024-04-04',
    deliveryDate: '2024-04-12',
    paymentDate: null
  }
];

export const mockResults = [
  {
    id: 'rs-1',
    pendingNo: 'P250654',
    description: 'Warehouse shelving',
    status: 'completed finish',
    timeline: [
      { label: 'Created', date: '2024-02-02', by: 'alex.morgan@procureflow.com' },
      { label: 'Item List Completed', date: '2024-02-05', by: 'alex.morgan@procureflow.com' },
      { label: 'Invitation Sent', date: '2024-02-07', by: 'sienna.reed@procureflow.com' },
      { label: 'Contract Signed', date: '2024-02-14', by: 'jordan.lee@procureflow.com' },
      { label: 'Delivered', date: '2024-03-01', by: 'alex.morgan@procureflow.com' },
      { label: 'Paid', date: '2024-03-05', by: 'alex.morgan@procureflow.com' }
    ]
  }
];
