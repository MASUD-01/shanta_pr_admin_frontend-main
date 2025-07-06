import { Navigate, createBrowserRouter } from "react-router-dom";
import { AppLayout } from "./common/applayout/AppLayout";
import Login from "./common/auth/pages/Login";
import NotFound from "./common/components/NotFound";
import RequireUser from "./app/utils/requireUser";
import Profile from "./modules/Profile/pages/Profile";
import { Dashboard } from "./modules/dashboard/pages/DashBoard";
import CostSheetPage from "./modules/invoice/pages/CostSheetPage";
import PricingAndCostSheetList from "./modules/invoice/pages/PricingAndCostSheetList";
import AdminList from "./modules/admin/pages/AdminList";
import SingleAdmin from "./modules/admin/pages/SingleAdmin";
import ForgetPassword from "./common/auth/pages/ForgetPassword";
import SummaryReport from "./modules/reports/pages/SummaryReport";
import EmployeeExpenseReport from "./modules/reports/pages/Expense/EmployeeExpenseReport";
import RoleList from "./modules/role&Permission/pages/RoleList";
import SingleRole from "./modules/role&Permission/pages/SingleRole";
import AuditTrails from "./modules/reports/pages/AuditTrails";
import InvesmentReport from "./modules/reports/pages/InvesmentReport";
import LoanReport from "./modules/reports/pages/LoanReport";
import ProtectedRoute from "./app/utils/ProtectedRoute";
import { IsAvailablePermission } from "./common/applayout/utils/IsAvailablePermission";
import CreateService from "./modules/Configuration/CreateService/pages/CreateService";
import DefineCostListName from "./modules/Configuration/DefineCostListName/pages/DefineCostListName";
import ViewCostSheetPage from "./modules/invoice/pages/ViewCostSheetPage";
import CreateBuilding from "./modules/BuildingCategory/pages/CreateBuilding";
import CreateFlatDetailsPage from "./modules/FlatCategory/pages/CreateFLatDetailsPage";
import CreateUserDetailsPage from "./modules/UserInformation/pages/CreateUserDetailsPage";
import ViewInvoiceList from "./modules/BillingAndInvoices/pages/ViewInvoiceList";
import BillingAndInvoices from "./modules/BillingAndInvoices/pages/BillingAndInvoices";
import SingleInvoiceView from "./modules/BillingAndInvoices/pages/SingleInvoiceView";
import SendInvoiceToOwner from "./modules/BillingAndInvoices/pages/SendInvoiceToOwner";
import CreateMoneyReceipt from "./modules/moneyReceipt/pages/CreateMoneyReceipt";
import MoneyReceiptList from "./modules/moneyReceipt/pages/MoneyReceiptList";
import MoneyReceiptDetails from "./modules/moneyReceipt/pages/MoneyReceiptDetails";
import Accountlist from "./modules/accounts/pages/Accountlist";
import CollectionReport from "./modules/reports/pages/CollectionReport";
import BankReconciliation from "./modules/BankReconciliation/pages/BankReconciliation";
import VendorPayment from "./modules/expenseAndvendorPayment/pages/VendorPayment";
import PurchaseAndPettyCash from "./modules/PurchaseAndPettyCash/pages/PurchaseAndPettyCash";
import PurchasePettyComponent from "./modules/PurchaseAndPettyCash/components/PurchasePettyComponent";
const Routers = () => {
	const router = createBrowserRouter([
		{ path: "*", element: <NotFound /> },
		{
			path: "/login",
			element: <ProtectedRoute children={<Login />} />,
		},
		{
			path: "/forget-password",
			element: <ProtectedRoute children={<ForgetPassword />} />,
		},
		{
			path: "/",
			element: (
				<RequireUser>
					<AppLayout />
				</RequireUser>
			),
			children: [
				{
					path: "/",
					element: <Dashboard />,
				},
				{
					path: "/pricing&Costsheet",
					children: [
						{
							path: "/pricing&Costsheet",
							element: <Navigate to="list" replace />,
						},
						{
							path: "create",
							element: <CostSheetPage />,
						},

						{
							path: "list",
							element: <PricingAndCostSheetList />,
						},

						{
							path: "list/:id",
							element: <ViewCostSheetPage />,
						},
					],
				},

				{
					path: "/billing-invoices",
					children: [
						{
							path: "create-invoice",
							element: <BillingAndInvoices />,
						},

						{
							path: "view-invoice",
							element: <ViewInvoiceList />,
						},

						{
							path: "view-invoice/:id",
							element: <SingleInvoiceView />,
						},

						{
							path: "send-invoice/:id",
							element: <SendInvoiceToOwner />,
						},
					],
				},

				{
					path: "/money-receipt",
					children: [
						{
							path: "create",
							element: <CreateMoneyReceipt />,
						},

						{
							path: "list",
							element: <MoneyReceiptList />,
						},

						{
							path: "list/:id",
							element: <MoneyReceiptDetails />,
						},
					],
				},

				{
					path: "/account",
					children: [
						{
							path: "list",
							element: <Accountlist />,
						},
					],
				},
				{
					path: "/bank-reconciliation",
					children: [
						{
							path: "list",
							element: <BankReconciliation />,
						},
					],
				},

				{
					path: "/expense-vendor",
					children: [
						{
							path: "payment",
							element: <VendorPayment />,
						},
					],
				},

					{
					path: "/purchase-pettycash",
					children: [
						{
							path: "create",
							element: < PurchasePettyComponent/>,
						},
							{
							path: "list",
							element: <PurchaseAndPettyCash />,
						},
					],
				},
				{
					path: "/project-management",
					children: [
						{
							path: "create-project",
							element: <CreateBuilding />,
						},
						{
							path: "add-flat-details",
							element: <CreateFlatDetailsPage />,
						},
						{
							path: "add-user-details",
							element: <CreateUserDetailsPage />,
						},
					],
				},
				{
					path: "/configuration",
					children: [
						{
							path: "create-service",
							element: <CreateService />,
						},
						{
							path: "costsheet_list_name",
							element: <DefineCostListName />,
						},
					],
				},
				{
					path: "reports",
					children: [
						{ path: "/reports", element: <Navigate to="list" replace /> },

						{
							path: "collection-report",
							element: <CollectionReport />,
						},
					],
				},
				{
					path: "/settings",
					children: [
						{
							path: "/settings/profile",
							element: <Profile />,
						},
					],
				},
				{
					path: "/administration",
					children: [
						{
							path: "/administration",
							element: <Navigate to="list" replace />,
						},

						...(IsAvailablePermission({
							module_name: "Administration",
							sub_module_name: "Admin",
						})
							? [
									{
										path: "list",
										element: <AdminList />,
									},
							  ]
							: [
									{
										path: "list",
										element: <NotFound />,
									},
							  ]),
						...(IsAvailablePermission({
							module_name: "Administration",
							sub_module_name: "Admin",
						})
							? [
									{
										path: "list/:id",
										element: <SingleAdmin />,
									},
							  ]
							: [
									{
										path: "list/:id",
										element: <NotFound />,
									},
							  ]),
						...(IsAvailablePermission({
							module_name: "Administration",
							sub_module_name: "Role List",
						})
							? [
									{
										path: "role-list",
										element: <RoleList />,
									},
							  ]
							: [
									{
										path: "role-list",
										element: <NotFound />,
									},
							  ]),
						...(IsAvailablePermission({
							module_name: "Administration",
							sub_module_name: "Role List",
						})
							? [
									{
										path: "role-list/:id",
										element: <SingleRole />,
									},
							  ]
							: [
									{
										path: "role-list/:id",
										element: <NotFound />,
									},
							  ]),
						...(IsAvailablePermission({
							module_name: "Administration",
							sub_module_name: "Audit Trail",
						})
							? [
									{
										path: "audit-trail",
										element: <AuditTrails />,
									},
							  ]
							: [
									{
										path: "audit-trail",
										element: <NotFound />,
									},
							  ]),
					],
				},
			],
		},
	]);

	return router;
};

export default Routers;
