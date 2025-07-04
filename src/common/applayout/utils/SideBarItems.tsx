import { Link } from "react-router-dom";
import { AiOutlineDashboard } from "react-icons/ai";
import {
  CiUser,
  CiMoneyBill,
  CiDollar,
  CiMenuBurger,
  CiReceipt,
} from "react-icons/ci";
import { SiExpensify } from "react-icons/si";
import { IoNewspaperOutline } from "react-icons/io5";
import { GrDocumentConfig } from "react-icons/gr";
import { GoPlus } from "react-icons/go";
import { TbBrandProducthunt } from "react-icons/tb";
import { MdOutlineSource } from "react-icons/md";
import { FcDepartment } from "react-icons/fc";
import { BiCategory, BiSolidUserAccount } from "react-icons/bi";
import { WalletOutlined } from "@ant-design/icons";
import { FaCircleUser } from "react-icons/fa6";
import { IUser } from "../../../auth/types/authTypes";
import { LuReceipt } from "react-icons/lu";
import { SiLibreofficewriter } from "react-icons/si";
import { FaFileInvoice } from "react-icons/fa6";
import { GrUserAdmin } from "react-icons/gr";
import { VscGitPullRequestCreate } from "react-icons/vsc";
const sideBarItems = (user: IUser | undefined) => {
  const menuData: any = [];

  //--------Dashboard--------
  const dashboardModule = user?.permissions?.modules?.find(
    (item) => item?.module_name === "Dashboard"
  );
  if (dashboardModule) {
    dashboardModule?.sub_modules?.forEach((subModule) => {
      const { permissions, sub_module_name } = subModule;
      if (permissions.read)
        menuData.push({
          label: <Link to="/">{sub_module_name}</Link>,
          key: "/",
          icon: (
            <AiOutlineDashboard
              size={20}
              style={{ color: "rgb(8 8 6)", width: "20px", height: "20px" }}
            />
          ),
        });
    });
  }
  //--------Invoice--------
  const invoiceModule = user?.permissions?.modules?.find(
    (item: any) => item?.module_name === "Pricing & Cost"
  );

  if (invoiceModule) {
    const children: any = [];
    invoiceModule?.sub_modules?.forEach((subModule) => {
      const { permissions } = subModule;
      if (permissions.write && subModule.sub_module_name === "Create Invoice") {
        children.push({
          label: (
            <Link to={`/pricing&Costsheet/create`}>
              {"Create Pricing & Cost sheet"}
            </Link>
          ),
          key: `/pricing&Costsheet/create`,
          icon: <GoPlus size={18} style={{ color: "rgb(8 8 6)" }} />,
        });
      }
      if (permissions.read && subModule.sub_module_name === "View Invoices") {
        children.push({
          label: (
            <Link to={`/pricing&Costsheet/list`}>
              View Pricing & Cost sheet
            </Link>
          ),
          key: `/pricing&Costsheet/list`,
          icon: (
            <CiMenuBurger
              size={18}
              style={{ color: "rgb(8 8 6)", fontWeight: "800" }}
            />
          ),
        });
      }
    });

    menuData.push({
      label: <span>Pricing & Cost</span>,
      key: "invoice",
      icon: (
        <VscGitPullRequestCreate
          style={{
            color: "rgb(8 8 6)",
            width: "20px",
            height: "20px",
          }}
          fontSize={"22px"}
        />
      ),
      children: children,
    });
  }
  /* -----------------subscription------------- */

  const subscriptionModule = user?.permissions?.modules?.find(
    (item: any) => item?.module_name === "Subscription"
  );

  if (subscriptionModule) {
    const children: any = [];
    subscriptionModule?.sub_modules?.forEach((subModule) => {
      const { permissions } = subModule;
      if (
        permissions.write &&
        subModule.sub_module_name === "Create Subscription"
      ) {
        children.push({
          label: (
            <Link to={`/subscription/create`}>{subModule.sub_module_name}</Link>
          ),
          key: `/subscription/create`,
          icon: <GoPlus size={18} style={{ color: "rgb(8 8 6)" }} />,
        });
      }
      if (
        permissions.read &&
        subModule.sub_module_name === "View Subscription"
      ) {
        children.push({
          label: (
            <Link to={`/subscription/list`}>{subModule.sub_module_name}</Link>
          ),
          key: `/subscription/list`,
          icon: <CiMenuBurger size={18} style={{ color: "rgb(8 8 6)" }} />,
        });
      }
    });

    menuData.push({
      label: <span>{subscriptionModule.module_name}</span>,
      key: "subscription",
      icon: (
        <FaFileInvoice
          style={{
            color: "rgb(8 8 6)",
            width: "20px",
            height: "20px",
          }}
          fontSize={"22px"}
        />
      ),
      children: children,
    });
  }
  // Quotation
  const quotationModule = user?.permissions?.modules?.find(
    (item) => item?.module_name === "Quotation"
  );

  if (quotationModule) {
    const children: any = [];
    quotationModule.sub_modules.forEach((subModule) => {
      const { permissions, sub_module_name } = subModule;

      if (
        permissions.write &&
        subModule.sub_module_name === "Create Quotation"
      ) {
        children.push({
          label: <Link to={`/quotation/create`}>{sub_module_name}</Link>,
          key: `/quotation/create`,
          icon: <GoPlus size={18} style={{ color: "rgb(8 8 6)" }} />,
        });
      }

      if (permissions.read && subModule.sub_module_name === "View Quotations") {
        children.push({
          label: <Link to={`/quotation/list`}>{sub_module_name}</Link>,
          key: `/quotation/list`,
          icon: <CiMenuBurger style={{ color: "rgb(8 8 6)" }} />,
        });
      }
    });

    menuData.push({
      label: <span>{quotationModule.module_name}</span>,
      key: "quotation",
      icon: (
        <WalletOutlined
          size={22}
          style={{
            color: "rgb(8 8 6)",
            width: "20px",
            height: "20px",
            fontSize: "17px",
          }}
        />
      ),
      children: children,
    });
  }

  // Money Receipt

  const moneyReceiptModule = user?.permissions?.modules?.find(
    (item) => item?.module_name === "Money Receipt"
  );

  if (moneyReceiptModule) {
    const children: any = [];

    moneyReceiptModule.sub_modules.forEach((subModule) => {
      const { sub_module_name } = subModule;
      if (
        subModule?.permissions.write &&
        subModule.sub_module_name === "Create Money Receipt"
      ) {
        children.push({
          label: <Link to="/money-receipt/create">{sub_module_name}</Link>,
          key: "/money-receipt/create",
          icon: <GoPlus size={18} style={{ color: "rgb(8 8 6)" }} />,
        });
      }
      if (
        subModule?.permissions.read &&
        subModule.sub_module_name === "View Money Receipts"
      ) {
        children.push({
          label: <Link to="/money-receipt/list">{sub_module_name}</Link>,
          key: "/money-receipt/list",
          icon: <CiMenuBurger size={18} style={{ color: "rgb(8 8 6)" }} />,
        });
      }

      if (
        subModule?.permissions.read &&
        subModule.sub_module_name === "Advance Return"
      ) {
        children.push({
          label: (
            <Link to="/money-receipt/advance-payment">{sub_module_name}</Link>
          ),
          key: "/money-receipt/advance-payment",
          icon: <CiMenuBurger size={18} style={{ color: "rgb(8 8 6)" }} />,
        });
      }
    });

    if (children.length > 0) {
      menuData.push({
        label: <span>{moneyReceiptModule.module_name}</span>,
        key: "money-receipt",
        icon: (
          <LuReceipt
            style={{ color: "rgb(8 8 6)", width: "20px", height: "20px" }}
          />
        ),
        children: children,
      });
    }
  }

  // Accounts

  const accountsModule = user?.permissions?.modules?.find(
    (item) => item?.module_name === "Accounts"
  );

  if (accountsModule) {
    // Initialize children array
    const children: any = [];

    // Iterate through sub-modules of "accounts" module
    accountsModule?.sub_modules.forEach((subModule) => {
      const { permissions, sub_module_name } = subModule;

      // Check if the user has permissions for the current sub-module
      if (permissions) {
        // Add menu item for "List/Add of Accounts"
        if (sub_module_name === "LIst/Create Accounts" && permissions.read) {
          children.push({
            label: <Link to="/account/list">{sub_module_name}</Link>,
            key: "/account/list",
            icon: (
              <BiSolidUserAccount size={18} style={{ color: "rgb(8 8 6)" }} />
            ),
          });
        }
        // Add menu item for "Balance Adjustment"
        if (sub_module_name === "Balance Adjustment" && permissions.read) {
          children.push({
            label: <Link to="/account/balance-list">{sub_module_name}</Link>,
            key: "/account/balance-list",
            icon: <CiMenuBurger size={18} style={{ color: "rgb(8 8 6)" }} />,
          });
        }
        // Add menu item for "Client Balance Adjustment"
        if (
          sub_module_name === "Client Balance Adjustment" &&
          permissions.read
        ) {
          children.push({
            label: (
              <Link to="/account/client-bill-adjustment">
                {sub_module_name}
              </Link>
            ),
            key: "/account/client-bill-adjustment",
            icon: <FaCircleUser size={18} style={{ color: "rgb(8 8 6)" }} />,
          });
        }

        // Add menu item for "Balance Transfer"
        if (sub_module_name === "Balance Transfer" && permissions.read) {
          children.push({
            label: (
              <Link to="/account/balance-transfer">{sub_module_name}</Link>
            ),
            key: "/account/balance-transfer",
            icon: <CiMenuBurger size={18} style={{ color: "rgb(8 8 6)" }} />,
          });
        }
      }
    });

    // Add the "Accounts" menu with its children
    if (children.length > 0) {
      menuData.push({
        label: <span>{accountsModule.module_name}</span>,
        key: "account",
        icon: (
          <WalletOutlined
            size={20}
            style={{
              color: "rgb(8 8 6)",
              width: "20px",
              height: "20px",
              fontSize: "17px",
            }}
          />
        ),
        children: children,
      });
    }
  }
  // client

  const clientsModule = user?.permissions?.modules?.find(
    (item) => item?.module_name === "Client"
  );

  if (clientsModule) {
    const children: any = [];

    clientsModule.sub_modules.forEach((subModule) => {
      const { sub_module_name } = subModule;
      if (
        subModule.permissions.read &&
        subModule.sub_module_name === "View Clients"
      ) {
        children.push({
          label: <Link to="/client/list">{sub_module_name}</Link>,
          key: "/client/list",
          icon: <CiMenuBurger size={18} style={{ color: "rgb(8 8 6)" }} />,
        });
      }
    });

    menuData.push({
      label: <span>{clientsModule?.module_name}</span>,
      key: "client",
      icon: (
        <CiUser
          style={{
            color: "rgb(8 8 6)",
            width: "20px",
            height: "20px",
          }}
        />
      ),
      children: children,
    });
  }

  const chequesModule = user?.permissions?.modules?.find(
    (item) => item?.module_name === "Cheque Management"
  );
  //Cheque Management
  if (chequesModule) {
    const children: any = [];

    chequesModule?.sub_modules?.forEach((subModule) => {
      const { sub_module_name } = subModule;
      if (
        subModule.sub_module_name === "View Cheques" &&
        subModule.permissions.read
      ) {
        children.push({
          label: <Link to="/cheque/list">{sub_module_name}</Link>,
          key: "/cheque/list",
          icon: <CiMenuBurger size={18} style={{ color: "rgb(8 8 6)" }} />,
        });
      }
    });

    menuData.push({
      label: <span>{chequesModule.module_name}</span>,
      key: "cheque",
      icon: <CiMoneyBill size={20} style={{ color: "rgb(8 8 6)" }} />,
      children: children,
    });
  }
  // loan & investment

  const loanInvestmentModule = user?.permissions?.modules?.find(
    (item) => item?.module_name === "Loan Investment"
  );

  if (loanInvestmentModule) {
    const tempChildren: any = [];

    loanInvestmentModule.sub_modules.forEach((subModule) => {
      const { permissions, sub_module_name } = subModule;

      if (sub_module_name === "Loan Information" && permissions.read) {
        tempChildren.push({
          name: "loan",
          component: {
            label: <Link to="/loan/loan-list">{sub_module_name}</Link>,
            key: "/loan/loan-list",
            icon: <CiMenuBurger size={18} style={{ color: "rgb(8 8 6)" }} />,
          },
        });
      } else if (sub_module_name === "Authority" && permissions.read) {
        tempChildren.push({
          name: "authority",
          component: {
            label: <Link to="/loan/authority">{sub_module_name}</Link>,
            key: "/loan/authority",
            icon: <CiMenuBurger size={18} style={{ color: "rgb(8 8 6)" }} />,
          },
        });
      } else if (sub_module_name === "Loan Instalment" && permissions.read) {
        tempChildren.push({
          name: "loan installment",
          component: {
            label: <Link to="/loan/installment-list">{sub_module_name}</Link>,
            key: "/loan/installment-list",
            icon: <CiMenuBurger size={18} style={{ color: "rgb(8 8 6)" }} />,
          },
        });
      } else if (sub_module_name === "Investment" && permissions.read) {
        tempChildren.push({
          name: "investment",
          component: {
            label: <Link to="/loan/invesment-list">{sub_module_name}</Link>,
            key: "/loan/invesment-list",
            icon: <CiMenuBurger size={18} style={{ color: "rgb(8 8 6)" }} />,
          },
        });
      }
    });

    // Define the desired order
    const orderedNames = [
      "authority",
      "loan",
      "loan installment",
      "investment",
    ];
    const children: any = [];

    // Push items to children in the desired order
    orderedNames.forEach((name) => {
      const item = tempChildren.find((child: any) => child.name === name);
      if (item) {
        children.push(item.component);
      }
    });

    menuData.push({
      label: <span>{loanInvestmentModule.module_name}</span>,
      key: "loan",
      icon: (
        <SiLibreofficewriter
          style={{ color: "rgb(8 8 6)", width: "20px", height: "20px" }}
        />
      ),
      children: children,
    });
  }

  // expense

  const expenseModule = user?.permissions?.modules?.find(
    (item) => item?.module_name === "Expense"
  );

  if (expenseModule) {
    const children: any = [];

    expenseModule.sub_modules.forEach((subModule) => {
      const { permissions, sub_module_name } = subModule;

      if (sub_module_name === "List/Create Expenses" && permissions.read) {
        children.push({
          label: <Link to="/expense/list">{sub_module_name}</Link>,
          key: "/expense/list",
          icon: <CiMenuBurger size={18} style={{ color: "rgb(8 8 6)" }} />,
        });
      } else if (sub_module_name === "Expense Head" && permissions.read) {
        children.push({
          label: <Link to="/expense/expense-head-list">{sub_module_name}</Link>,
          key: "/expense/expense-head-list",
          icon: <CiReceipt size={18} style={{ color: "rgb(8 8 6)" }} />,
        });
      } else if (sub_module_name === "Expense Sub Head" && permissions.read) {
        children.push({
          label: (
            <Link to="/expense/expense-subhead-list">{sub_module_name}</Link>
          ),
          key: "/expense/expense-subhead-list",
          icon: <CiReceipt size={18} style={{ color: "rgb(8 8 6)" }} />,
        });
      }
    });

    menuData.push({
      label: <span>{expenseModule.module_name}</span>,
      key: "expense",
      icon: (
        <SiExpensify
          style={{ color: "rgb(8 8 6)", width: "20px", height: "20px" }}
        />
      ),
      children: children,
    });
  }
  // payroll

  const payrollModule = user?.permissions?.modules?.find(
    (item) => item?.module_name === "Payroll"
  );

  if (payrollModule) {
    const children: any = [];

    payrollModule.sub_modules.forEach((subModule: any) => {
      const { permissions, sub_module_name } = subModule;
      if (sub_module_name === "List/Create Payroll" && permissions.read) {
        children.push({
          label: <Link to="/payroll/list">{sub_module_name}</Link>,
          key: "/payroll/list",
          icon: <CiMenuBurger size={18} style={{ color: "rgb(8 8 6)" }} />,
        });
      }
    });

    menuData.push({
      label: <span>{payrollModule.module_name}</span>,
      key: "payroll",
      icon: (
        <CiDollar
          style={{ color: "rgb(8 8 6)", width: "20px", height: "20px" }}
        />
      ),
      children: children,
    });
  }

  // configuration

  const configurationModule = user?.permissions?.modules?.find(
    (item) => item?.module_name === "Configuration"
  );

  if (configurationModule) {
    const children: any = [];

    configurationModule.sub_modules.forEach((subModule: any) => {
      const { permissions, sub_module_name } = subModule;

      switch (sub_module_name) {
        case "Employee":
          if (permissions.read) {
            children.push({
              label: (
                <Link to="/configuration/employee-list">{sub_module_name}</Link>
              ),
              key: "/configuration/employee-list",
              icon: <CiUser style={{ color: "rgb(8 8 6)" }} />,
            });
          }

          break;
        case "Department":
          if (permissions.read) {
            children.push({
              label: (
                <Link to="/configuration/department-list">
                  {sub_module_name}
                </Link>
              ),
              key: "/configuration/department-list",
              icon: <FcDepartment style={{ color: "rgb(8 8 6)" }} />,
            });
          }
          break;
        case "Designation":
          if (permissions.read) {
            children.push({
              label: (
                <Link to="/configuration/designation-list">
                  {sub_module_name}
                </Link>
              ),
              key: "/configuration/designation-list",
              icon: <FcDepartment style={{ color: "rgb(8 8 6)" }} />,
            });
          }
          break;
        case "Client Category":
          if (permissions.read) {
            children.push({
              label: (
                <Link to="/configuration/client-category">
                  {sub_module_name}
                </Link>
              ),
              key: "/configuration/client-category",
              icon: <BiCategory style={{ color: "rgb(8 8 6)" }} />,
            });
          }
          break;
        case "Product":
          if (permissions.read) {
            children.push({
              label: (
                <Link to="/configuration/product-list">{sub_module_name}</Link>
              ),
              key: "/configuration/product-list",
              icon: <TbBrandProducthunt style={{ color: "rgb(8 8 6)" }} />,
            });
          }
          break;
        case "Source":
          if (permissions.read) {
            children.push({
              label: (
                <Link to="/configuration/source-list">{sub_module_name}</Link>
              ),
              key: "/configuration/source-list",
              icon: <MdOutlineSource style={{ color: "rgb(8 8 6)" }} />,
            });
          }
          break;
        default:
          break;
      }
    });

    menuData.push({
      label: <span>{configurationModule.module_name}</span>,
      key: "configurations",
      icon: (
        <GrDocumentConfig
          size={17}
          style={{ color: "rgb(8 8 6)", width: "20px", height: "20px" }}
        />
      ),
      children: children,
    });
  }

  // report
  const reportData = user?.permissions?.modules?.find(
    (item) => item?.module_name === "Report"
  );
  if (reportData) {
    const children: any = [];

    const subModules = [
      {
        name: "Client Ledger",
        link: "/reports/client-ledger",
        label: "Client Ledger",
      },
      {
        name: "client discount",
        link: "/reports/client-discount",
        label: "Client Discount",
      },
      {
        name: "Due/Advance",
        link: "/reports/due-advance",
        label: "Total Due/Advance (Client)",
      },
      {
        name: "Sales Report",
        link: "/reports/sales-report",
        label: "Sales Report",
      },
      {
        name: "Subscription Report",
        link: "/reports/subscription-report",
        label: "Subscription Report",
      },
      {
        name: "Collection Report",
        link: "/reports/collection-report",
        label: "Collection Report",
      },
      {
        name: "Profit/Loss",
        link: "/reports/profit-loss-report",
        label: "Profit/Loss",
      },
      {
        name: "Expense Report",
        link: "/reports/expense",
        label: "Expense Report",
      },
      {
        name: "Account Report",
        link: "/reports/account-report",
        label: "Account Report",
      },
      {
        name: "Account Ledger",
        link: "/reports/account-ledger",
        label: "Account Ledger",
      },
      {
        label: "Balance Status",
        link: "/reports/balance-status",
        name: "Balance Status",
      },
      {
        label: "Discount Report",
        link: "/reports/client-discount",
        name: "Discount Report",
      },
      {
        name: "investment report",
        link: "/reports/investment-report",
        label: "Investment report",
      },
      {
        name: "loan report",
        link: "/reports/loan-report",
        label: "Loan report",
      },
    ];

    // Iterate through sub-modules and add menu items if the user has permissions
    subModules.forEach((subModule) => {
      if (
        user?.permissions?.modules.some((invoice) =>
          invoice.sub_modules.find(
            (sub: any) => sub.sub_module_name === subModule.name
          )
        )
      ) {
        children.push({
          label: <Link to={subModule.link}>{subModule.label}</Link>,
          key: subModule.link,
          icon: <CiMenuBurger size={18} style={{ color: "rgb(8 8 6)" }} />,
        });
      }
    });

    // Add the "Reports" menu with its children
    menuData.push({
      label: <span>{reportData?.module_name}</span>,
      key: "reports",
      icon: (
        <IoNewspaperOutline
          size={17}
          style={{ color: "rgb(8 8 6)", width: "20px", height: "20px" }}
        />
      ),
      children: children,
    });
  }

  // administration

  const administrationModule = user?.permissions?.modules?.find(
    (item) => item?.module_name === "Administration"
  );

  if (administrationModule) {
    const children: any = [];

    administrationModule.sub_modules.forEach((subModule) => {
      const { permissions, sub_module_name } = subModule;

      if (sub_module_name === "Admin" && permissions.read) {
        children.push({
          label: <Link to="/administration/list">{sub_module_name}</Link>,
          key: "/administration/list",
          icon: <CiUser style={{ color: "rgb(8 8 6)" }} />,
        });
      } else if (sub_module_name === "Role List" && permissions.read) {
        children.push({
          label: <Link to="/administration/role-list">{sub_module_name}</Link>,
          key: "/administration/role-list",
          icon: <CiUser style={{ color: "rgb(8 8 6)" }} />,
        });
      } else if (sub_module_name === "Audit Trail" && permissions.read) {
        children.push({
          label: (
            <Link to="/administration/audit-trail">{sub_module_name}</Link>
          ),
          key: "/administration/audit-trail",
          icon: <CiUser style={{ color: "rgb(8 8 6)" }} />,
        });
      }
    });

    menuData.push({
      label: <span>{administrationModule.module_name}</span>,
      key: "administration",
      icon: (
        <GrUserAdmin
          style={{
            color: "rgb(8 8 6)",
            width: "20px",
            height: "20px",
            fontSize: "18px",
          }}
        />
      ),
      children: children,
    });
  }

  return menuData;
};

export default sideBarItems;
