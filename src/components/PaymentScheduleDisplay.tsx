
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { generatePaymentSchedule } from '../utils/creditCalculator';

interface PaymentScheduleDisplayProps {
  unsettledAmount: number;
  annuity: number;
  interestRate: number;
}

export const PaymentScheduleDisplay: React.FC<PaymentScheduleDisplayProps> = ({
  unsettledAmount,
  annuity,
  interestRate
}) => {
  const schedule = generatePaymentSchedule(unsettledAmount, annuity, interestRate);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Plan otplate preostalih rata</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="text-center">Rata br.</TableHead>
                <TableHead className="text-center">Datum</TableHead>
                <TableHead className="text-center">Anuitet (EUR)</TableHead>
                <TableHead className="text-center">Glavnica (EUR)</TableHead>
                <TableHead className="text-center">Kamata (EUR)</TableHead>
                <TableHead className="text-center">Stanje (EUR)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {schedule.map((payment, index) => (
                <TableRow key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <TableCell className="text-center font-medium">
                    <Badge variant={index === 0 ? 'default' : 'outline'}>
                      {payment.paymentNumber}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">{payment.date}</TableCell>
                  <TableCell className="text-center font-semibold text-blue-700">
                    {payment.annuity.toFixed(2)}
                  </TableCell>
                  <TableCell className="text-center text-green-700">
                    {payment.principal.toFixed(2)}
                  </TableCell>
                  <TableCell className="text-center text-orange-600">
                    {payment.interest.toFixed(2)}
                  </TableCell>
                  <TableCell className="text-center font-semibold">
                    {payment.remainingBalance.toFixed(2)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        
        {schedule.length > 10 && (
          <div className="mt-4 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Napomena:</strong> Prikazano je prvih 10 rata. Kompletan plan otplate sadrži {schedule.length} rata.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
