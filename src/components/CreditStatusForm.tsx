
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Calculator, Euro, Calendar, TrendingDown } from 'lucide-react';
import { PaymentScheduleDisplay } from './PaymentScheduleDisplay';
import { calculateRemainingPayments } from '../utils/creditCalculator';

export const CreditStatusForm = () => {
  const [unsettledAmount, setUnsettledAmount] = useState<string>('');
  const [calculationResult, setCalculationResult] = useState<any>(null);

  // Credit details from the document
  const creditDetails = {
    bankName: "Banca Intesa ad Beograd",
    phone: "011/310-8888",
    date: "09.07.2025.",
    currency: "EUR",
    originalAmount: 92663.85,
    annuity: 786.25,
    nominalRate: 3.39,
    effectiveRate: 3.76,
    startDate: "20.01.2022",
    endDate: "20.01.2034"
  };

  const handleCalculate = () => {
    const amount = parseFloat(unsettledAmount);
    if (amount && amount > 0) {
      const result = calculateRemainingPayments(amount, creditDetails.annuity, creditDetails.nominalRate);
      setCalculationResult(result);
    }
  };

  const handleReset = () => {
    setUnsettledAmount('');
    setCalculationResult(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Bank Header */}
        <Card className="bg-gradient-to-r from-blue-900 to-blue-800 text-white">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">{creditDetails.bankName}</CardTitle>
            <p className="text-blue-100">Tel/Fax: {creditDetails.phone}</p>
            <p className="text-blue-100">Datum: {creditDetails.date}</p>
          </CardHeader>
        </Card>

        {/* Credit Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Euro className="h-5 w-5" />
              PLAN OTPLATE KREDITA
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-semibold">Valuta:</Label>
                <p className="text-lg font-bold text-blue-800">{creditDetails.currency}</p>
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-semibold">Iznos kredita:</Label>
                <p className="text-lg font-bold text-green-700">
                  {creditDetails.originalAmount.toLocaleString('sr-RS', { minimumFractionDigits: 2 })} EUR
                </p>
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-semibold">Anuitet:</Label>
                <p className="text-lg font-bold text-purple-700">
                  {creditDetails.annuity.toLocaleString('sr-RS', { minimumFractionDigits: 2 })} EUR
                </p>
              </div>
            </div>
            
            <Separator />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-semibold">Nominalna kamatna stopa:</Label>
                <p className="text-base font-semibold text-orange-600">{creditDetails.nominalRate}% FIKSNA</p>
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-semibold">Efektivna kamatna stopa:</Label>
                <p className="text-base font-semibold text-red-600">{creditDetails.effectiveRate}%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Input Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="h-5 w-5" />
              Unesite preostali dug
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="unsettled-amount">Preostali iznos duga (EUR)</Label>
              <Input
                id="unsettled-amount"
                type="number"
                step="0.01"
                placeholder="Unesite preostali iznos..."
                value={unsettledAmount}
                onChange={(e) => setUnsettledAmount(e.target.value)}
                className="text-lg"
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={handleCalculate} className="flex items-center gap-2" disabled={!unsettledAmount}>
                <TrendingDown className="h-4 w-4" />
                Izračunaj preostale rate
              </Button>
              <Button variant="outline" onClick={handleReset}>
                Resetuj
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Calculation Results */}
        {calculationResult && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Rezultat kalkulacije
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-blue-800 mb-2">Preostali broj rata</h3>
                  <p className="text-2xl font-bold text-blue-900">{calculationResult.remainingPayments}</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-green-800 mb-2">Ukupno za plaćanje</h3>
                  <p className="text-2xl font-bold text-green-900">
                    {calculationResult.totalToPay.toLocaleString('sr-RS', { minimumFractionDigits: 2 })} EUR
                  </p>
                </div>
                <div className="bg-orange-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-orange-800 mb-2">Ukupna kamata</h3>
                  <p className="text-2xl font-bold text-orange-900">
                    {calculationResult.totalInterest.toLocaleString('sr-RS', { minimumFractionDigits: 2 })} EUR
                  </p>
                </div>
              </div>
              
              <PaymentScheduleDisplay 
                unsettledAmount={parseFloat(unsettledAmount)}
                annuity={creditDetails.annuity}
                interestRate={creditDetails.nominalRate}
              />
            </CardContent>
          </Card>
        )}

        {/* Footer */}
        <Card>
          <CardContent className="text-center text-sm text-gray-600 py-4">
            <p>NAPOMENA: Iskazana EKS važi na datum izrade plana otplate kredita</p>
            <Separator className="my-2" />
            <p>© 2025 Banca Intesa ad Beograd - Kalkulator otplate kredita</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
