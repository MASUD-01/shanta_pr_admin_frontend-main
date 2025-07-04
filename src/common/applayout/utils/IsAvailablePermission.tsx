import { useGetMeQuery } from '../../../app/api/userApi/userApi';

type ICheckAvailability = {
  module_name: ModuleName;
  sub_module_name?: SubModuleName;
};
export const IsAvailablePermission = ({
  module_name,
  sub_module_name,
}: ICheckAvailability) => {
  const { data: profile } = useGetMeQuery();
  const allPermission = profile?.data?.permissions?.modules;

  const module = allPermission?.find((module) => {
    if (module.module_name === module_name) {
      if (sub_module_name) {
        // Check if the sub_module exists
        return module.sub_modules.some(
          (sub_module) => sub_module.sub_module_name === sub_module_name
        );
      }
      return true; // If no sub_module_name is provided, return true for the module match
    }
    return false;
  });

  return Boolean(module);
};
type ModuleName =
  | 'Dashboard'
  | 'Invoice'
  | 'Subscription'
  | 'Quotation'
  | 'Money Receipt'
  | 'Accounts'
  | 'Client'
  | 'Cheque Management'
  | 'Loan Investment'
  | 'Expense'
  | 'Payroll'
  | 'Configuration'
  | 'Report'
  | 'Administration';
type SubModuleName =
  | 'Dashboard'
  | 'Create Invoice'
  | 'View Invoices'
  | 'Create Subscription'
  | 'View Subscription'
  | 'Create Quotation'
  | 'View Quotations'
  | 'Create Money Receipt'
  | 'View Money Receipts'
  | 'Advance Return'
  | 'LIst/Create Accounts'
  | 'Balance Adjustment'
  | 'Balance Transfer'
  | 'Client Balance Adjustment'
  | 'View Clients'
  | 'View Cheques'
  | 'Authority'
  | 'Loan Information'
  | 'Loan Instalment'
  | 'Investment'
  | 'List/Create Expenses'
  | 'Expense Head'
  | 'Expense Sub Head'
  | 'List/Create Payroll'
  | 'Employee'
  | 'Department'
  | 'Designation'
  | 'Client Category'
  | 'Product'
  | 'Source'
  | 'Client Ledger'
  | 'Due/Advance'
  | 'Sales Report'
  | 'Subscription Report'
  | 'Collection Report'
  | 'Profit/Loss'
  | 'Expense Report'
  | 'Account Report'
  | 'Account Ledger'
  | 'Balance Status'
  | 'Discount Report'
  | 'Admin'
  | 'Role List'
  | 'Audit Trail';
