
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
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
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  
  const totalPages = Math.ceil(schedule.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentSchedule = schedule.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Plan otplate preostalih rata</CardTitle>
        <p className="text-sm text-gray-600">
          Prikazano {startIndex + 1}-{Math.min(endIndex, schedule.length)} od {schedule.length} rata
        </p>
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
              {currentSchedule.map((payment, index) => (
                <TableRow key={startIndex + index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <TableCell className="text-center font-medium">
                    <Badge variant={startIndex + index === 0 ? 'default' : 'outline'}>
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
        
        {totalPages > 1 && (
          <div className="mt-6 flex justify-center">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious 
                    onClick={handlePrevious}
                    className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                  />
                </PaginationItem>
                
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <PaginationItem key={page}>
                    <PaginationLink
                      onClick={() => handlePageChange(page)}
                      isActive={currentPage === page}
                      className="cursor-pointer"
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                
                <PaginationItem>
                  <PaginationNext 
                    onClick={handleNext}
                    className={currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
