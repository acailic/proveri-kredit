
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
  const [creditAmount, setCreditAmount] = useState<string>('92663.85');
  const [annuity, setAnnuity] = useState<string>('786.25');
  const [nominalRate, setNominalRate] = useState<string>('3.39');
  const [effectiveRate, setEffectiveRate] = useState<string>('3.76');
  const [numberOfPayments, setNumberOfPayments] = useState<string>('144');
  const [calculationResult, setCalculationResult] = useState<any>(null);

  // Credit details
  const creditDetails = {
    currency: "EUR",
    startDate: "20.01.2022",
    endDate: "20.01.2034"
  };

  const handleCalculate = () => {
    const amount = parseFloat(unsettledAmount);
    const annuityValue = parseFloat(annuity);
    const nominalRateValue = parseFloat(nominalRate);
    if (amount && amount > 0 && annuityValue && annuityValue > 0) {
      const result = calculateRemainingPayments(amount, annuityValue, nominalRateValue);
      setCalculationResult(result);
      // Set unsettled amount equal to total payment amount
      setUnsettledAmount(result.totalToPay.toString());
    }
  };

  const handleReset = () => {
    setUnsettledAmount('');
    setCreditAmount('92663.85');
    setAnnuity('786.25');
    setNominalRate('3.39');
    setEffectiveRate('3.76');
    setNumberOfPayments('144');
    setCalculationResult(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Title Header */}
        <Card className="bg-gradient-to-r from-blue-900 to-blue-800 text-white">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold">PROVERI KREDIT</CardTitle>
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
                <Label htmlFor="credit-amount" className="text-sm font-semibold">Iznos kredita:</Label>
                <Input
                  id="credit-amount"
                  type="number"
                  step="0.01"
                  value={creditAmount}
                  onChange={(e) => setCreditAmount(e.target.value)}
                  className="text-lg font-bold text-green-700"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="annuity" className="text-sm font-semibold">Anuitet:</Label>
                <Input
                  id="annuity"
                  type="number"
                  step="0.01"
                  value={annuity}
                  onChange={(e) => setAnnuity(e.target.value)}
                  className="text-lg font-bold text-purple-700"
                />
              </div>
            </div>
            
            <Separator />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="nominal-rate" className="text-sm font-semibold">Nominalna kamatna stopa:</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="nominal-rate"
                    type="number"
                    step="0.01"
                    value={nominalRate}
                    onChange={(e) => setNominalRate(e.target.value)}
                    className="text-base font-semibold text-orange-600"
                  />
                  <span className="text-base font-semibold text-orange-600">% FIKSNA</span>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="effective-rate" className="text-sm font-semibold">Efektivna kamatna stopa:</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="effective-rate"
                    type="number"
                    step="0.01"
                    value={effectiveRate}
                    onChange={(e) => setEffectiveRate(e.target.value)}
                    className="text-base font-semibold text-red-600"
                  />
                  <span className="text-base font-semibold text-red-600">%</span>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="number-of-payments" className="text-sm font-semibold">Broj rata:</Label>
                <Input
                  id="number-of-payments"
                  type="number"
                  value={numberOfPayments}
                  onChange={(e) => setNumberOfPayments(e.target.value)}
                  className="text-base font-semibold text-blue-600"
                />
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
              <Button onClick={handleCalculate} className="flex items-center gap-2" disabled={!unsettledAmount || !annuity}>
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
                annuity={parseFloat(annuity)}
                interestRate={parseFloat(nominalRate)}
              />
            </CardContent>
          </Card>
        )}

        {/* Footer */}
        <Card>
          <CardContent className="text-center text-sm text-gray-600 py-4">
            <p>NAPOMENA: Iskazana EKS važi na datum izrade plana otplate kredita</p>
            <Separator className="my-2" />
            <p>© 2025 Kalkulator otplate kredita</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
