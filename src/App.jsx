import { useEffect, useMemo, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import AppLayout from './components/AppLayout.jsx';
import { AppContext } from './components/AppContext.jsx';
import {
  mockCompanyCategories,
  mockCompanies,
  mockCompleted,
  mockFiscalFiles,
  mockInProgress,
  mockPendingFiles,
  mockResults,
  mockSettings,
  mockUser
} from './data/mockData.js';
import LandingPage from './pages/LandingPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import SignupPage from './pages/SignupPage.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import FiscalFilesPage from './pages/FiscalFilesPage.jsx';
import PendingFilesPage from './pages/PendingFilesPage.jsx';
import InProgressPage from './pages/InProgressPage.jsx';
import CompletedPage from './pages/CompletedPage.jsx';
import ResultsPage from './pages/ResultsPage.jsx';
import ResultsDetailPage from './pages/ResultsDetailPage.jsx';
import SettingsPage from './pages/SettingsPage.jsx';
import UserManagementPage from './pages/UserManagementPage.jsx';
import CompaniesMgmtPage from './pages/CompaniesMgmtPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import ItemListPage from './pages/ItemListPage.jsx';
import InvitationMailPage from './pages/InvitationMailPage.jsx';
import BidsPage from './pages/BidsPage.jsx';
import ContractPage from './pages/ContractPage.jsx';
import ContractMailPage from './pages/ContractMailPage.jsx';
import ContractSignPage from './pages/ContractSignPage.jsx';

const getToday = () => new Date().toISOString().split('T')[0];

const getNextPendingNumber = (records) => {
  const year = new Date().getFullYear().toString().slice(-2);
  const max = records.reduce((acc, item) => {
    const value = Number(item.pendingNo?.slice(3));
    return Number.isNaN(value) ? acc : Math.max(acc, value);
  }, 0);
  const next = String(max + 1).padStart(4, '0');
  return `P${year}${next}`;
};

const getNextPurchaseOrderNumber = (records, type) => {
  const year = new Date().getFullYear().toString().slice(-2);
  const prefix = `${year}TUR`;
  const max = records.reduce((acc, item) => {
    if (!item.purchaseOrderNo) return acc;
    const value = Number(item.purchaseOrderNo.slice(5, 9));
    return Number.isNaN(value) ? acc : Math.max(acc, value);
  }, 0);
  const next = String(max + 1).padStart(4, '0');
  return `${prefix}${next}${type === 'C' ? 'CON' : 'PUR'}`;
};

const addBusinessDays = (startDate, days) => {
  const date = new Date(startDate);
  let added = 0;
  while (added < days) {
    date.setDate(date.getDate() + 1);
    const day = date.getDay();
    if (day !== 0 && day !== 6) {
      added += 1;
    }
  }
  return date.toISOString().split('T')[0];
};

const App = () => {
  const [user] = useState(mockUser);
  const [settings, setSettings] = useState(mockSettings);
  const [companies] = useState(mockCompanies);
  const [companyCategories] = useState(mockCompanyCategories);
  const [fiscalFiles, setFiscalFiles] = useState(mockFiscalFiles);
  const [pendingFiles, setPendingFiles] = useState(mockPendingFiles);
  const [inProgress, setInProgress] = useState(mockInProgress);
  const [completed, setCompleted] = useState(mockCompleted);
  const [results, setResults] = useState(mockResults);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  const addFiscalFile = (data) => {
    const pendingNo = getNextPendingNumber([...fiscalFiles, ...pendingFiles]);
    const newFile = {
      id: `ff-${Date.now()}`,
      pendingNo,
      ...data
    };
    setFiscalFiles((prev) => [...prev, newFile]);
    setPendingFiles((prev) => [
      ...prev,
      {
        id: `pf-${Date.now()}`,
        pendingNo,
        requestNumber: data.requestNumber,
        description: data.description,
        amount: data.amount,
        currency: data.currency,
        status: 'awaiting review',
        createdDate: data.createdDate,
        createdBy: data.createdBy
      }
    ]);
  };

  const moveToInProgress = (file, reviewData) => {
    setPendingFiles((prev) => prev.filter((item) => item.id !== file.id));
    setInProgress((prev) => [
      ...prev,
      {
        id: `ip-${Date.now()}`,
        pendingNo: file.pendingNo,
        description: file.description,
        status: 'awaiting item list',
        updatedBy: file.createdBy,
        updatedAt: getToday(),
        ...reviewData,
        items: []
      }
    ]);
  };

  const saveItemList = (id, items) => {
    setInProgress((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              items,
              itemsTotal: null,
              status: 'awaiting invitation mail',
              updatedAt: getToday(),
              updatedBy: user.email
            }
          : item
      )
    );
  };

  const saveInvitationMail = (id, mail) => {
    setInProgress((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              invitationMail: mail,
              invitationCreated: true,
              updatedAt: getToday(),
              updatedBy: user.email,
              status: 'awaiting invitation mail'
            }
          : item
      )
    );
  };

  const saveBids = (id, bids) => {
    const parsedBids = bids
      .filter((bid) => bid.offer)
      .map((bid) => ({
        ...bid,
        offerValue: Number(bid.offer)
      }));
    const lowestBid = parsedBids.reduce((lowest, bid) => {
      if (!lowest) return bid;
      return bid.offerValue < lowest.offerValue ? bid : lowest;
    }, null);

    setInProgress((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              bids: parsedBids,
              lowestBid,
              status: 'awaiting contract',
              updatedAt: getToday(),
              updatedBy: user.email
            }
          : item
      )
    );
  };

  const createPurchaseOrder = (id, type) => {
    setInProgress((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              contractType: type,
              purchaseOrderNo: getNextPurchaseOrderNumber(prev, type),
              status: 'awaiting contract mail',
              updatedAt: getToday(),
              updatedBy: user.email
            }
          : item
      )
    );
  };

  const saveContractMail = (id, mail) => {
    setInProgress((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              contractMail: mail,
              contractMailCreated: true,
              status: 'awaiting contract mail',
              updatedAt: getToday(),
              updatedBy: user.email
            }
          : item
      )
    );
  };

  const saveContractSign = (id, data) => {
    const record = inProgress.find((item) => item.id === id);
    if (!record) return;

    const deliveryDate = data.deliveryType === 'business'
      ? addBusinessDays(data.signDate, Number(data.deliveryDays))
      : new Date(new Date(data.signDate).getTime() + Number(data.deliveryDays) * 86400000)
          .toISOString()
          .split('T')[0];

    setInProgress((prev) => prev.filter((item) => item.id !== id));
    setCompleted((prev) => [
      ...prev,
      {
        id: `cp-${Date.now()}`,
        pendingNo: record.pendingNo,
        description: record.description,
        status: 'awaiting delivery',
        updatedBy: user.email,
        updatedAt: getToday(),
        deliveryDate,
        paymentDate: null
      }
    ]);
  };

  const markDelivered = (id) => {
    setCompleted((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              status: 'awaiting payment',
              deliveryDate: getToday(),
              updatedAt: getToday(),
              updatedBy: user.email
            }
          : item
      )
    );
  };

  const markPaid = (id) => {
    const record = completed.find((item) => item.id === id);
    if (!record) return;

    setCompleted((prev) => prev.filter((item) => item.id !== id));
    setResults((prev) => [
      ...prev,
      {
        id: `rs-${Date.now()}`,
        pendingNo: record.pendingNo,
        description: record.description,
        status: 'completed finish',
        timeline: [
          { label: 'Delivery Completed', date: record.deliveryDate, by: record.updatedBy },
          { label: 'Payment Completed', date: getToday(), by: user.email }
        ]
      }
    ]);
  };

  const addSettingItem = (tab, data) => {
    setSettings((prev) => {
      if (tab === 'cisi') {
        return { ...prev, cisiCodes: [...prev.cisiCodes, data] };
      }
      if (tab === 'fund') {
        return { ...prev, fundManagers: [...prev.fundManagers, data] };
      }
      if (tab === 'currency') {
        return { ...prev, currencies: [...prev.currencies, data] };
      }
      if (tab === 'rank') {
        return { ...prev, ranks: [...prev.ranks, data] };
      }
      return prev;
    });
  };

  const contextValue = useMemo(
    () => ({
      user,
      settings,
      companies,
      companyCategories,
      fiscalFiles,
      pendingFiles,
      inProgress,
      completed,
      results,
      sidebarOpen,
      darkMode,
      toggleSidebar: () => setSidebarOpen((prev) => !prev),
      toggleDarkMode: () => setDarkMode((prev) => !prev),
      addFiscalFile,
      moveToInProgress,
      saveItemList,
      saveInvitationMail,
      saveBids,
      createPurchaseOrder,
      saveContractMail,
      saveContractSign,
      markDelivered,
      markPaid,
      addSettingItem
    }),
    [
      user,
      settings,
      companies,
      companyCategories,
      fiscalFiles,
      pendingFiles,
      inProgress,
      completed,
      results,
      sidebarOpen,
      darkMode
    ]
  );

  return (
    <AppContext.Provider value={contextValue}>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/app" element={<AppLayout />}>
          <Route index element={<Navigate to="/app/dashboard" replace />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="fiscal-files" element={<FiscalFilesPage />} />
          <Route path="pending-files" element={<PendingFilesPage />} />
          <Route path="in-progress" element={<InProgressPage />} />
          <Route path="in-progress/:id/items" element={<ItemListPage />} />
          <Route path="in-progress/:id/invitation" element={<InvitationMailPage />} />
          <Route path="in-progress/:id/bids" element={<BidsPage />} />
          <Route path="in-progress/:id/contract" element={<ContractPage />} />
          <Route path="in-progress/:id/contract-mail" element={<ContractMailPage />} />
          <Route path="in-progress/:id/contract-sign" element={<ContractSignPage />} />
          <Route path="completed" element={<CompletedPage />} />
          <Route path="results" element={<ResultsPage />} />
          <Route path="results/:id" element={<ResultsDetailPage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="user-management" element={<UserManagementPage />} />
          <Route path="companies-management" element={<CompaniesMgmtPage />} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AppContext.Provider>
  );
};

export default App;
