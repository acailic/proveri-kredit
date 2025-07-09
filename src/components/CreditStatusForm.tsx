
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
  const [unsettledAmount, setUnsettledAmount] = useState<string>('70162');
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
    }
  };

  const handleReset = () => {
    setUnsettledAmount('70162');
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

        {/* Explanation Text */}
        <Card>
          <CardHeader>
            <CardTitle>Objašnjenje Iznosa za Likvidaciju Kredita</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Kada banka navede "iznos za likvidaciju" od 70.162 EUR, to nije ukupan iznos koji biste otplatili ako nastavite da plaćate kredit do kraja. To je iznos koji biste platili banci ako želite da odmah zatvorite ceo kredit, tj. da ga ranije otplatite u celosti u tom trenutku (npr. u julu 2025).
            </p>
            <p>
              <strong>Dakle:</strong> Ako nastavite da plaćate po planu, ukupno ćete banci platiti još oko <strong>81.784 EUR</strong>. Ako sada likvidirate ceo kredit, platili biste oko <strong>70.162 EUR</strong>, jer izbegavate buduće kamate.
            </p>
          </CardContent>
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
                <Label htmlFor="unsettled-amount" className="text-sm font-semibold">Iznos za likvidaciju (EUR):</Label>
                <Input id="unsettled-amount" value={unsettledAmount} onChange={(e) => setUnsettledAmount(e.target.value)} placeholder="Unesite iznos" />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-semibold">Početak otplate:</Label>
                <p className="text-lg font-bold text-blue-800">{creditDetails.startDate}</p>
              </div>
            </div>
            <Separator />
            <div className="flex justify-center space-x-4">
              <Button onClick={handleCalculate} className="bg-blue-600 hover:bg-blue-700">
                <Calculator className="mr-2 h-4 w-4" />
                Izračunaj
              </Button>
              <Button onClick={handleReset} variant="outline">
                Resetuj
              </Button>
            </div>
          </CardContent>
        </Card>

        {calculationResult && (
          <PaymentScheduleDisplay 
            unsettledAmount={parseFloat(unsettledAmount)}
            annuity={parseFloat(annuity)}
            interestRate={parseFloat(nominalRate)}
          />
        )}
      </div>
    </div>
  );
};
