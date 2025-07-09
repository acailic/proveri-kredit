
export interface PaymentScheduleItem {
  paymentNumber: number;
  date: string;
  annuity: number;
  principal: number;
  interest: number;
  remainingBalance: number;
}

export interface CalculationResult {
  remainingPayments: number;
  totalToPay: number;
  totalInterest: number;
  monthlyPayment: number;
}

export const calculateRemainingPayments = (
  unsettledAmount: number,
  annuity: number,
  nominalRate: number
): CalculationResult => {
  const monthlyRate = nominalRate / 100 / 12;
  let remainingBalance = unsettledAmount;
  let paymentCount = 0;
  let totalInterest = 0;

  // Calculate how many payments are needed
  while (remainingBalance > 0.01 && paymentCount < 1000) { // Safety limit
    const interestPayment = remainingBalance * monthlyRate;
    const principalPayment = Math.min(annuity - interestPayment, remainingBalance);
    
    if (principalPayment <= 0) break; // Safety check
    
    remainingBalance -= principalPayment;
    totalInterest += interestPayment;
    paymentCount++;
  }

  return {
    remainingPayments: paymentCount,
    totalToPay: paymentCount * annuity,
    totalInterest,
    monthlyPayment: annuity
  };
};

export const generatePaymentSchedule = (
  unsettledAmount: number,
  annuity: number,
  interestRate: number,
  maxPayments: number = 10
): PaymentScheduleItem[] => {
  const monthlyRate = interestRate / 100 / 12;
  const schedule: PaymentScheduleItem[] = [];
  let remainingBalance = unsettledAmount;
  const currentDate = new Date();

  for (let i = 0; i < maxPayments && remainingBalance > 0.01; i++) {
    const paymentDate = new Date(currentDate);
    paymentDate.setMonth(paymentDate.getMonth() + i + 1);
    paymentDate.setDate(20); // Set to 20th of each month as per the original schedule

    const interestPayment = remainingBalance * monthlyRate;
    const principalPayment = Math.min(annuity - interestPayment, remainingBalance);
    
    if (principalPayment <= 0) break;

    remainingBalance -= principalPayment;

    schedule.push({
      paymentNumber: i + 1,
      date: paymentDate.toLocaleDateString('sr-RS'),
      annuity: annuity,
      principal: principalPayment,
      interest: interestPayment,
      remainingBalance: Math.max(0, remainingBalance)
    });
  }

  return schedule;
};

export const formatCurrency = (amount: number): string => {
  return amount.toLocaleString('sr-RS', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
};
