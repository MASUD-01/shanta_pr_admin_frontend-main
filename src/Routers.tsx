import { Navigate, createBrowserRouter } from 'react-router-dom';
import { AppLayout } from './common/applayout/AppLayout';
import Login from './common/auth/pages/Login';
import Productlist from './modules/Configuration/Products/pages/Productlist';
import Sourcelist from './modules/Configuration/Source/pages/Sourcelist';
import ExpenseHeadlist from './modules/Configuration/Expense/pages/ExpenseHeadlist';
import ExpenseSubHeadlist from './modules/Configuration/Expense/pages/ExpenseSubHeadlist';
import NotFound from './common/components/NotFound';
import CreateQuotation from './modules/Quotation/components/CreateQuotation';
import SingleQuotation from './modules/Quotation/pages/SingleQuotation';
import CreateMoneyReceipt from './modules/moneyReceipt/pages/CreateMoneyReceipt';
import RequireUser from './app/utils/requireUser';
import EmployeeList from './modules/Configuration/Employee/pages/Employeelist';
import DepartmentList from './modules/Configuration/Department/pages/Departmentlist';
import Profile from './modules/Profile/pages/Profile';
import Accountlist from './modules/accounts/pages/Accountlist';
import { Dashboard } from './modules/dashboard/pages/DashBoard';
import CostSheetPage from './modules/invoice/pages/CostSheetPage';
import PricingAndCostSheetList from './modules/invoice/pages/PricingAndCostSheetList';
import QuotationList from './modules/Quotation/pages/QuotationList';
import AdminList from './modules/admin/pages/AdminList';
import SingleAdmin from './modules/admin/pages/SingleAdmin';
import ExpenseList from './modules/expense/pages/ExpenseList';
import MoneyReceiptList from './modules/moneyReceipt/pages/MoneyReceiptList';
import MoneyReceiptDetails from './modules/moneyReceipt/pages/MoneyReceiptDetails';
import AddBalanceList from './modules/accounts/pages/AddBalanceList';
import BalanceTransfer from './modules/accounts/pages/BalanceTransfer';
import SingleEmployee from './modules/Configuration/Employee/pages/SingleEmployee';
import AccountStatement from './modules/accounts/pages/AccountStatement';
import TransactionsHistory from './modules/accounts/pages/TransactionsHistory';
import SalesReport from './modules/reports/pages/SalesReport';
import CollectionReport from './modules/reports/pages/CollectionReport';
import ExpenseReport from './modules/reports/pages/Expense/ExpenseReport';
import AccountReport from './modules/reports/pages/AccountReport';
import ForgetPassword from './common/auth/pages/ForgetPassword';
import SummaryReport from './modules/reports/pages/SummaryReport';
import ProfitLoss from './modules/reports/pages/ProfitLoss';
import EmployeeExpenseReport from './modules/reports/pages/Expense/EmployeeExpenseReport';
import RoleList from './modules/role&Permission/pages/RoleList';
import SingleRole from './modules/role&Permission/pages/SingleRole';
import AuditTrails from './modules/reports/pages/AuditTrails';
import InvesmentReport from './modules/reports/pages/InvesmentReport';
import LoanReport from './modules/reports/pages/LoanReport';

import Designationlist from './modules/Configuration/Designation/pages/DesignationList';

import ClientBillAdjustment from './modules/accounts/pages/ClientBillAdjustment/Page/ClientBillAdjustment';
import ProtectedRoute from './app/utils/ProtectedRoute';
import ClientDiscountTable from './modules/reports/pages/ClientDiscountTable';
import BalanceStatus from './modules/accounts/pages/BalanceStatus';
import { IsAvailablePermission } from './common/applayout/utils/IsAvailablePermission';
import CreateSubscription from './modules/subscription/pages/CreateSubscription';
import ListSubscription from './modules/subscription/pages/ListSubscription';
import SubscriptionReport from './modules/reports/pages/SubscriptionReport';
import SubscriptionTrackingReportPage from './modules/subscription/component/SubscriptionTrackingReportPage';
import AccountLedger from './modules/reports/pages/AccountLedger';
import CreateService from './modules/Configuration/CreateService/pages/CreateService';
import DefineCostListName from './modules/Configuration/DefineCostListName/pages/DefineCostListName';
import ViewCostSheetPage from './modules/invoice/pages/ViewCostSheetPage';
import BillingAndInvoices from './modules/BillingAndInvoices/pages/BillingAndInvoices';
import CreateBuilding from './modules/BuildingCategory/pages/CreateBuilding';
import CreateFlatDetailsPage from './modules/FlatCategory/pages/CreateFLatDetailsPage';
import CreateUserDetailsPage from './modules/UserInformation/pages/CreateUserDetailsPage';
const Routers = () => {
  const router = createBrowserRouter([
    { path: '*', element: <NotFound /> },
    {
      path: '/login',
      element: <ProtectedRoute children={<Login />} />,
    },
    {
      path: '/forget-password',
      element: <ProtectedRoute children={<ForgetPassword />} />,
    },
    {
      path: '/',
      element: (
        <RequireUser>
          <AppLayout />
        </RequireUser>
      ),
      children: [
        {
          path: '/',
          element: <Dashboard />,
        },
        {
          path: '/pricing&Costsheet',
          children: [
            {
              path: '/pricing&Costsheet',
              element: <Navigate to='list' replace />,
            },
            {
              path: 'create',
              element: <CostSheetPage />,
            },

            {
              path: 'list',
              element: <PricingAndCostSheetList />,
            },

            {
              path: 'list/:id',
              element: <ViewCostSheetPage />,
            },
          ],
        },
        {
          path: '/subscription',
          children: [
            {
              path: '/subscription',
              element: <Navigate to='list' replace />,
            },

            ...(IsAvailablePermission({
              module_name: 'Subscription',
              sub_module_name: 'Create Subscription',
            })
              ? [
                  {
                    path: 'create',
                    element: <CreateSubscription />,
                  },
                ]
              : [
                  {
                    path: 'create',
                    element: <NotFound />,
                  },
                ]),
            ...(IsAvailablePermission({
              module_name: 'Subscription',
              sub_module_name: 'View Subscription',
            })
              ? [
                  {
                    path: 'list',
                    element: <ListSubscription />,
                  },
                ]
              : [
                  {
                    path: 'list',
                    element: <NotFound />,
                  },
                ]),
          ],
        },
        {
          path: '/quotation',
          children: [
            {
              path: '/quotation',
              element: <Navigate to='list' replace />,
            },

            ...(IsAvailablePermission({
              module_name: 'Quotation',
              sub_module_name: 'Create Quotation',
            })
              ? [
                  {
                    path: 'create',
                    element: <CreateQuotation />,
                  },
                ]
              : [
                  {
                    path: 'create',
                    element: <NotFound />,
                  },
                ]),
            ...(IsAvailablePermission({
              module_name: 'Quotation',
              sub_module_name: 'View Quotations',
            })
              ? [
                  {
                    path: 'list',
                    element: <QuotationList />,
                  },
                ]
              : [
                  {
                    path: 'list',
                    element: <NotFound />,
                  },
                ]),
            ...(IsAvailablePermission({
              module_name: 'Quotation',
              sub_module_name: 'View Quotations',
            })
              ? [
                  {
                    path: 'list/:id',
                    element: <SingleQuotation />,
                  },
                ]
              : [
                  {
                    path: 'list/:id',
                    element: <NotFound />,
                  },
                ]),
          ],
        },
        {
          path: '/money-receipt',
          children: [
            {
              path: '/money-receipt',
              element: <Navigate to='list' replace />,
            },
            ...(IsAvailablePermission({
              module_name: 'Money Receipt',
              sub_module_name: 'Create Money Receipt',
            })
              ? [
                  {
                    path: 'create',
                    element: <CreateMoneyReceipt />,
                  },
                ]
              : [
                  {
                    path: 'create',
                    element: <NotFound />,
                  },
                ]),
            ...(IsAvailablePermission({
              module_name: 'Money Receipt',
              sub_module_name: 'View Money Receipts',
            })
              ? [
                  {
                    path: 'list',
                    element: <MoneyReceiptList />,
                  },
                ]
              : [
                  {
                    path: 'list',
                    element: <NotFound />,
                  },
                ]),
            ...(IsAvailablePermission({
              module_name: 'Money Receipt',
              sub_module_name: 'View Money Receipts',
            })
              ? [
                  {
                    path: 'list/:id',
                    element: <MoneyReceiptDetails />,
                  },
                ]
              : [
                  {
                    path: 'list/:id',
                    element: <NotFound />,
                  },
                ]),
          ],
        },
        {
          path: '/account',
          children: [
            { path: '/account', element: <Navigate to='list' replace /> },

            ...(IsAvailablePermission({
              module_name: 'Accounts',
              sub_module_name: 'LIst/Create Accounts',
            })
              ? [
                  {
                    path: 'list',
                    element: <Accountlist />,
                  },
                ]
              : [
                  {
                    path: 'list',
                    element: <NotFound />,
                  },
                ]),
            ...(IsAvailablePermission({
              module_name: 'Accounts',
              sub_module_name: 'LIst/Create Accounts',
            })
              ? [
                  {
                    path: 'statement/:id',
                    element: <AccountStatement />,
                  },
                ]
              : [
                  {
                    path: 'statement/:id',
                    element: <NotFound />,
                  },
                ]),

            {
              path: 'transactions',
              element: <TransactionsHistory />,
            },
            ...(IsAvailablePermission({
              module_name: 'Accounts',
              sub_module_name: 'Balance Adjustment',
            })
              ? [
                  {
                    path: 'balance-list',
                    element: <AddBalanceList />,
                  },
                ]
              : [
                  {
                    path: 'balance-list',
                    element: <NotFound />,
                  },
                ]),
            ...(IsAvailablePermission({
              module_name: 'Accounts',
              sub_module_name: 'Balance Transfer',
            })
              ? [
                  {
                    path: 'balance-transfer',
                    element: <BalanceTransfer />,
                  },
                ]
              : [
                  {
                    path: 'balance-transfer',
                    element: <NotFound />,
                  },
                ]),
            ...(IsAvailablePermission({
              module_name: 'Accounts',
              sub_module_name: 'Client Balance Adjustment',
            })
              ? [
                  {
                    path: 'client-bill-adjustment',
                    element: <ClientBillAdjustment />,
                  },
                ]
              : [
                  {
                    path: 'client-bill-adjustment',
                    element: <NotFound />,
                  },
                ]),
          ],
        },

        {
          path: '/expense',
          children: [
            {
              path: '/expense',
              element: <Navigate to='list' replace />,
            },
            ...(IsAvailablePermission({
              module_name: 'Expense',
              sub_module_name: 'List/Create Expenses',
            })
              ? [
                  {
                    path: 'list',
                    element: <ExpenseList />,
                  },
                ]
              : [
                  {
                    path: 'list',
                    element: <NotFound />,
                  },
                ]),

            ...(IsAvailablePermission({
              module_name: 'Expense',
              sub_module_name: 'Expense Head',
            })
              ? [
                  {
                    path: 'expense-head-list',
                    element: <ExpenseHeadlist />,
                  },
                ]
              : [
                  {
                    path: 'expense-head-list',
                    element: <NotFound />,
                  },
                ]),
            ...(IsAvailablePermission({
              module_name: 'Expense',
              sub_module_name: 'Expense Sub Head',
            })
              ? [
                  {
                    path: 'expense-subhead-list',
                    element: <ExpenseSubHeadlist />,
                  },
                ]
              : [
                  {
                    path: 'expense-subhead-list',
                    element: <NotFound />,
                  },
                ]),
          ],
        },
        {
          path: '/billing-invoices',
          element: <BillingAndInvoices />,
        },
        {
          path: '/project-management',
          children: [
            {
              path: 'create-project',
              element: <CreateBuilding />,
            },
            {
              path: 'add-flat-details',
              element: <CreateFlatDetailsPage />,
            },
            {
              path: 'add-user-details',
              element: <CreateUserDetailsPage />,
            },
          ],
        },
        {
          path: '/configuration',
          children: [
            {
              path: 'create-service',
              element: <CreateService />,
            },
            {
              path: 'costsheet_list_name',
              element: <DefineCostListName />,
            },

            ...(IsAvailablePermission({
              module_name: 'Configuration',
              sub_module_name: 'Employee',
            })
              ? [
                  {
                    path: 'employee-list',
                    element: <EmployeeList />,
                  },
                ]
              : [
                  {
                    path: 'employee-list',
                    element: <NotFound />,
                  },
                ]),

            ...(IsAvailablePermission({
              module_name: 'Configuration',
              sub_module_name: 'Employee',
            })
              ? [
                  {
                    path: 'employee-list/:id',
                    element: <SingleEmployee />,
                  },
                ]
              : [
                  {
                    path: 'employee-list',
                    element: <NotFound />,
                  },
                ]),
            ...(IsAvailablePermission({
              module_name: 'Configuration',
              sub_module_name: 'Designation',
            })
              ? [
                  {
                    path: 'designation-list',
                    element: <Designationlist />,
                  },
                ]
              : [
                  {
                    path: 'designation-list',
                    element: <NotFound />,
                  },
                ]),
            ...(IsAvailablePermission({
              module_name: 'Configuration',
              sub_module_name: 'Department',
            })
              ? [
                  {
                    path: 'department-list',
                    element: <DepartmentList />,
                  },
                ]
              : [
                  {
                    path: 'department-list',
                    element: <NotFound />,
                  },
                ]),
            ...(IsAvailablePermission({
              module_name: 'Configuration',
              sub_module_name: 'Product',
            })
              ? [
                  {
                    path: 'product-list',
                    element: <Productlist />,
                  },
                ]
              : [
                  {
                    path: 'product-list',
                    element: <NotFound />,
                  },
                ]),

            {
              path: 'designation-list',
              element: <Designationlist />,
            },
            ...(IsAvailablePermission({
              module_name: 'Configuration',
              sub_module_name: 'Source',
            })
              ? [
                  {
                    path: 'source-list',
                    element: <Sourcelist />,
                  },
                ]
              : [
                  {
                    path: 'source-list',
                    element: <NotFound />,
                  },
                ]),
          ],
        },

        {
          path: '/settings',
          children: [
            {
              path: '/settings/profile',
              element: <Profile />,
            },
          ],
        },
        {
          path: '/administration',
          children: [
            {
              path: '/administration',
              element: <Navigate to='list' replace />,
            },

            ...(IsAvailablePermission({
              module_name: 'Administration',
              sub_module_name: 'Admin',
            })
              ? [
                  {
                    path: 'list',
                    element: <AdminList />,
                  },
                ]
              : [
                  {
                    path: 'list',
                    element: <NotFound />,
                  },
                ]),
            ...(IsAvailablePermission({
              module_name: 'Administration',
              sub_module_name: 'Admin',
            })
              ? [
                  {
                    path: 'list/:id',
                    element: <SingleAdmin />,
                  },
                ]
              : [
                  {
                    path: 'list/:id',
                    element: <NotFound />,
                  },
                ]),
            ...(IsAvailablePermission({
              module_name: 'Administration',
              sub_module_name: 'Role List',
            })
              ? [
                  {
                    path: 'role-list',
                    element: <RoleList />,
                  },
                ]
              : [
                  {
                    path: 'role-list',
                    element: <NotFound />,
                  },
                ]),
            ...(IsAvailablePermission({
              module_name: 'Administration',
              sub_module_name: 'Role List',
            })
              ? [
                  {
                    path: 'role-list/:id',
                    element: <SingleRole />,
                  },
                ]
              : [
                  {
                    path: 'role-list/:id',
                    element: <NotFound />,
                  },
                ]),
            ...(IsAvailablePermission({
              module_name: 'Administration',
              sub_module_name: 'Audit Trail',
            })
              ? [
                  {
                    path: 'audit-trail',
                    element: <AuditTrails />,
                  },
                ]
              : [
                  {
                    path: 'audit-trail',
                    element: <NotFound />,
                  },
                ]),
          ],
        },
        {
          path: 'reports',
          children: [
            { path: '/reports', element: <Navigate to='list' replace /> },

            ...(IsAvailablePermission({
              module_name: 'Report',
              sub_module_name: 'Sales Report',
            })
              ? [
                  {
                    path: 'sales-report',
                    element: <SalesReport />,
                  },
                ]
              : [
                  {
                    path: 'sales-report',
                    element: <NotFound />,
                  },
                ]),
            ...(IsAvailablePermission({
              module_name: 'Report',
              sub_module_name: 'Subscription Report',
            })
              ? [
                  {
                    path: 'subscription-report',
                    element: <SubscriptionReport />,
                  },
                ]
              : [
                  {
                    path: 'subscription-report',
                    element: <NotFound />,
                  },
                ]),
            ...(IsAvailablePermission({
              module_name: 'Report',
              sub_module_name: 'Subscription Report',
            })
              ? [
                  {
                    path: 'subscription_tracking/:id',
                    element: <SubscriptionTrackingReportPage />,
                  },
                ]
              : [
                  {
                    path: 'subscription_tracking/:id',
                    element: <NotFound />,
                  },
                ]),
            ...(IsAvailablePermission({
              module_name: 'Report',
              sub_module_name: 'Collection Report',
            })
              ? [
                  {
                    path: 'collection-report',
                    element: <CollectionReport />,
                  },
                ]
              : [
                  {
                    path: 'collection-report',
                    element: <NotFound />,
                  },
                ]),
            ...(IsAvailablePermission({
              module_name: 'Report',
              sub_module_name: 'Profit/Loss',
            })
              ? [
                  {
                    path: 'profit-loss-report',
                    element: <ProfitLoss />,
                  },
                ]
              : [
                  {
                    path: 'profit-loss-report',
                    element: <NotFound />,
                  },
                ]),
            ...(IsAvailablePermission({
              module_name: 'Report',
              sub_module_name: 'Expense Report',
            })
              ? [{ path: 'expense', element: <ExpenseReport /> }]
              : [
                  {
                    path: 'expense',
                    element: <NotFound />,
                  },
                ]),
            ...(IsAvailablePermission({
              module_name: 'Report',
              sub_module_name: 'Account Report',
            })
              ? [
                  {
                    path: 'account-report',
                    element: <AccountReport />,
                  },
                ]
              : [
                  {
                    path: 'account-report',
                    element: <NotFound />,
                  },
                ]),
            ...(IsAvailablePermission({
              module_name: 'Report',
              sub_module_name: 'Account Ledger',
            })
              ? [
                  {
                    path: 'account-ledger',
                    element: <AccountLedger />,
                  },
                ]
              : [
                  {
                    path: 'account-ledger',
                    element: <NotFound />,
                  },
                ]),
            ...(IsAvailablePermission({
              module_name: 'Report',
              sub_module_name: 'Balance Status',
            })
              ? [
                  {
                    path: 'balance-status',
                    element: <BalanceStatus />,
                  },
                ]
              : [
                  {
                    path: 'balance-status',
                    element: <NotFound />,
                  },
                ]),
            ...(IsAvailablePermission({
              module_name: 'Report',
              sub_module_name: 'Discount Report',
            })
              ? [
                  {
                    path: '/reports/client-discount',
                    element: <ClientDiscountTable />,
                  },
                ]
              : [
                  {
                    path: '/reports/client-discount',
                    element: <NotFound />,
                  },
                ]),

            {
              path: 'summary-report',
              element: <SummaryReport />,
            },

            { path: 'employee-expense', element: <EmployeeExpenseReport /> },
            { path: 'investment-report', element: <InvesmentReport /> },
            { path: 'loan-report', element: <LoanReport /> },
          ],
        },
      ],
    },
  ]);

  return router;
};

export default Routers;
