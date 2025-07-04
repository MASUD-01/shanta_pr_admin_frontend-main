export interface IDashboardData {
  currentMonthEarning: number;
  currentDayEarning: number;
  totalClient: string;
  balanceStatus: string;
  activeClient: string;
  inActiveClient: string;
  monthlyExpense: number;
  todaysExpense: number;
  todaysCollection: number;
  totalReceivable: string;
  monthlyCollection: string;

  accountWithBalanceList: {
    id: number;
    name: string;
    branch: null | string;
    account_no: null | string;
    balance: string;
  }[];
  topProducts: {
    id: number;
    name: string;
    photo: null | string;
    total_sale: string;
  }[];
  topClients: {
    id: number;
    name: string;
    photo: null | string;
    sale_amount: string;
  }[];
  topSources: {
    id: number;
    name: string;
    total_client: null | number;
  }[];
}

export interface IViewProfitLossDashboard {
  Expense: number;
  Month: string;
  Payroll_Expense: number;
  ProfitLoss: string;
  Sales: number;
  Total_Expense: number;
}
export interface PayloadItem {
  fill: string;
  dataKey: string;
  name: string;
  color: string;
  value: number;
  payload: {
    Sales: number;
    Expense: number;
    Payroll_Expense: number;
    Total_Expense: number;
    ProfitLoss: string;
    Month: string;
  };
  hide: boolean;
}

export interface CustomTooltipProps {
  active?: boolean;
  payload?: PayloadItem[];
}
