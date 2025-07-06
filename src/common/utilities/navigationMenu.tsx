import { MenuProps } from "antd";
import { AiOutlineDashboard } from "react-icons/ai";
import { CiMenuBurger } from "react-icons/ci";
import { GoPlus } from "react-icons/go";
import { Link, NavLink } from "react-router-dom";
import { VscGitPullRequestCreate } from "react-icons/vsc";
import { MdOutlineSettings } from "react-icons/md";
import { FaRegMoneyBillAlt } from "react-icons/fa";
import { LiaProjectDiagramSolid } from "react-icons/lia";
import { FaFileInvoice } from "react-icons/fa6";
import { FaCircleDollarToSlot } from "react-icons/fa6";
import { TbReportAnalytics } from "react-icons/tb";
import { GiBank } from "react-icons/gi";
import { GiExpense } from "react-icons/gi";
import { SiSalesforce } from "react-icons/si";
import { RiUserReceived2Line, RiUserShared2Line } from "react-icons/ri";
export type NavigationItem = {
	key: string;
	label: string;
	to?: string;
	icon: string;
	children?: NavigationItem[];
};

export const navigationMenu: any = [
	{
		label: <Link to="/">Dashboard</Link>,
		key: "/",
		icon: (
			<AiOutlineDashboard
				size={20}
				style={{ color: "rgb(8 8 6)", width: "20px", height: "20px" }}
			/>
		),
	},
	{
		key: "crm",
		label: "CRM",
		icon: <FaFileInvoice />,
		children: [
			{
				label: <Link to={`/crm/sales-plan`}>Sales Plan</Link>,
				key: `/crm/sales-plan`,
				icon: <SiSalesforce size={18} style={{ color: "rgb(8 8 6)" }} />,
			},
			{
				label: <Link to={`/crm/create-lead`}>Create lead</Link>,
				key: `/crm/create-lead`,
				icon: <GoPlus size={18} style={{ color: "rgb(8 8 6)" }} />,
			},
			{
				label: (
					<Link to={`/crm/my-created-lead-lists`}>My Created Lead-List</Link>
				),
				key: `/crm/my-created-lead-lists`,
				icon: <CiMenuBurger size={18} style={{ color: "rgb(8 8 6)" }} />,
			},
			{
				label: <Link to={`/crm/received-lead`}>Received Lead</Link>,
				key: `/crm/received-lead`,
				icon: <RiUserReceived2Line size={18} style={{ color: "rgb(8 8 6)" }} />,
			},
			{
				label: <Link to={`/crm/transfer-lead`}>Transfer Lead</Link>,
				key: `/crm/transfer-lead`,
				icon: <RiUserShared2Line size={18} style={{ color: "rgb(8 8 6)" }} />,
			},
		],
	},
	{
		key: "pricing",
		icon: <VscGitPullRequestCreate />,
		label: "Pricing & Cost",
		children: [
			{
				label: (
					<Link to={`/pricing&costsheet/create`}>
						{"Create Pricing & Cost sheet"}
					</Link>
				),
				key: `/pricing&Costsheet/create`,
				icon: <GoPlus size={18} style={{ color: "rgb(8 8 6)" }} />,
			},

			{
				label: (
					<Link to={`/pricing&costsheet/list`}>View Pricing & Cost sheet</Link>
				),
				key: `/pricing&costsheet/list`,
				icon: (
					<CiMenuBurger
						size={18}
						style={{ color: "rgb(8 8 6)", fontWeight: "800" }}
					/>
				),
			},
		],
	},

	{
		key: "billing-invoices",
		label: <>Billing & Invoices</>,
		icon: <FaFileInvoice />,

		children: [
			{
				label: (
					<Link to={`/billing-invoices/create-invoice`}>
						Create Billing & Invoices
					</Link>
				),
				key: `/billing-invoices/create-invoice`,
				icon: <GoPlus size={18} style={{ color: "rgb(8 8 6)" }} />,
			},
			{
				label: (
					<Link to={`/billing-invoices/view-invoice`}>
						View Billing & Invoice List
					</Link>
				),
				key: `/billing-invoices/view-invoice`,
				icon: <CiMenuBurger size={18} style={{ color: "rgb(8 8 6)" }} />,
			},
		],
	},

	{
		key: "money-receipt",
		label: "Money Receipt",
		icon: <FaRegMoneyBillAlt />,

		children: [
			{
				label: <Link to="/money-receipt/create">Create Money Receipt</Link>,
				key: "/money-receipt/create",
				icon: <GoPlus size={18} style={{ color: "rgb(8 8 6)" }} />,
			},
			{
				label: <Link to={`/money-receipt/list`}>Money Receipt List</Link>,
				key: `/money-receipt/list`,
				icon: <CiMenuBurger size={18} style={{ color: "rgb(8 8 6)" }} />,
			},
		],
	},
	{
		key: "account",
		label: "Accounts",
		icon: <FaCircleDollarToSlot />,

		children: [
			{
				label: <Link to="/account/list">Account List</Link>,
				key: "/account/list",
				icon: <GoPlus size={18} style={{ color: "rgb(8 8 6)" }} />,
			},
		],
	},
	{
		key: "bank-reconciliation",
		label: "Bank Reconciliation & Payment",
		icon: <GiBank />,
		children: [
			{
				label: <Link to="/bank-reconciliation/list">Bank Reconciliation</Link>,
				key: "/bank-reconciliation/list",
				icon: <GoPlus size={18} style={{ color: "rgb(8 8 6)" }} />,
			},
		],
	},
	{
		key: "expense-vendor",
		label: "Expense & Vendor Payment",
		icon: <GiExpense />,
		children: [
			{
				label: <Link to="/expense-vendor/payment">Vendor Payment</Link>,
				key: "/expense-vendor/payment",
				icon: <GoPlus size={18} style={{ color: "rgb(8 8 6)" }} />,
			},
			{
				label: <Link to="/expense-vendor/list">Vendor Payment List</Link>,
				key: "/expense-vendor/list",
				icon: <CiMenuBurger size={18} style={{ color: "rgb(8 8 6)" }} />,
			},
			{
				label: (
					<Link to="/expense-vendor/tax">
						Vendor Payment Tax Reconciliation
					</Link>
				),
				key: "/expense-vendor/tax",
				icon: <CiMenuBurger size={18} style={{ color: "rgb(8 8 6)" }} />,
			},
		],
	},
	{
		key: "budget-performance",
		label: "Budget Performance Monitoring",
		icon: <GiExpense />,
		children: [
			{
				label: (
					<Link to="/budget-performance/create">
						Budget Performance Monitoring
					</Link>
				),
				key: "/budget-performance/create",
				icon: <GoPlus size={18} style={{ color: "rgb(8 8 6)" }} />,
			},
		],
	},
	{
		key: "purchase-pettycash",
		label: "Purchase Order/Petty Cash",
		icon: <GiExpense />,
		children: [
			{
				label: (
					<Link to="/purchase-pettycash/create">Create Purchase Order/Petty Cash</Link>
				),
				key: "/purchase-pettycash/create",
				icon: <GoPlus size={18} style={{ color: "rgb(8 8 6)" }} />,
			},

			{
				label: (
					<Link to="/purchase-pettycash/list">Purchase Order/Petty Cash List</Link>
				),
				key: "/purchase-pettycash/list",
				icon: <GoPlus size={18} style={{ color: "rgb(8 8 6)" }} />,
			},
		],
	},
	{
		key: "project-management",
		icon: <LiaProjectDiagramSolid />,
		label: "Project Management",
		children: [
			{
				label: (
					<Link to={`/project-management/create-project`}>
						Create Project/Building
					</Link>
				),
				key: `/project-management/create-project`,
				icon: <GoPlus size={18} style={{ color: "rgb(8 8 6)" }} />,
			},
			{
				label: (
					<Link to={`/project-management/add-flat-details`}>
						Add Flats Details
					</Link>
				),
				key: `/project-management/add-flat-details`,
				icon: <GoPlus size={18} style={{ color: "rgb(8 8 6)" }} />,
			},
			{
				label: (
					<Link to={`/project-management/add-user-details`}>
						Add User Details
					</Link>
				),
				key: `/project-management/add-user-details`,
				icon: <GoPlus size={18} style={{ color: "rgb(8 8 6)" }} />,
			},
		],
	},
	{
		key: "configuration",
		icon: <MdOutlineSettings />,
		label: "Configuration",
		children: [
			{
				label: <Link to={`/configuration/create-service`}>Create Service</Link>,
				key: `/configuration/create-service`,
				icon: <GoPlus size={18} style={{ color: "rgb(8 8 6)" }} />,
			},
			{
				label: (
					<Link to={`/configuration/costsheet_list_name`}>
						Create Costing Name
					</Link>
				),
				key: `/configuration/costsheet_list_name`,
				icon: <GoPlus size={18} style={{ color: "rgb(8 8 6)" }} />,
			},
		],
	},

	{
		key: "reports",
		icon: <TbReportAnalytics />,
		label: "Reports",
		children: [
			{
				label: <Link to={`/reports/collection-report`}>Collection Report</Link>,
				key: `/reports/collection-report`,
				icon: <GoPlus size={18} style={{ color: "rgb(8 8 6)" }} />,
			},
		],
	},
];

export const renderMenuItem = (
	item: NavigationItem
): Required<MenuProps>["items"][number] => ({
	key: item.key,
	label: item.children ? (
		item.label
	) : (
		<NavLink
			style={({ isActive }) => {
				return {
					fontWeight: isActive ? 600 : "normal",
				};
			}}
			to={String(item.to)}
		>
			{item.label}
		</NavLink>
	),
	icon: "",
	...(item.children && { children: item.children.map(renderMenuItem) }),
	type: "item",
});
export const getOpenKeys = (
	items: NavigationItem[],
	path: string
): string[] => {
	const openKeys: string[] = [];

	const traverse = (item: NavigationItem, parentKeys: string[] = []) => {
		const currentKeys = [...parentKeys, item.key];

		if (item.to && path.startsWith(item.to)) {
			openKeys.push(...currentKeys);
			return true;
		}

		if (item.children) {
			for (const child of item.children) {
				if (traverse(child, currentKeys)) {
					openKeys.push(...currentKeys);
					return true;
				}
			}
		}

		return false;
	};

	items.forEach((item) => traverse(item));
	return [...new Set(openKeys)];
};
