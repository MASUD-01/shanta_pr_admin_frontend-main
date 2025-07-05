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
		icon: <FaCircleDollarToSlot />,
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
		icon: <FaCircleDollarToSlot />,
		children: [
			{
				label: <Link to="/expense-vendor/payment">Vendor Payment</Link>,
				key: "/expense-vendor/payment",
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
					<Link to={`/project-management/create-project`}>Create Project</Link>
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
