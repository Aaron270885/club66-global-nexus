
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CreditCard, Smartphone, DollarSign } from 'lucide-react';

interface PaymentFormProps {
  selectedPlan: {
    name: string;
    price: string;
    monthly: string;
  };
  onPaymentComplete: () => void;
}

const PaymentForm = ({ selectedPlan, onPaymentComplete }: PaymentFormProps) => {
  const [paymentMethod, setPaymentMethod] = useState<string>('');
  const [formData, setFormData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    phoneNumber: '',
    email: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate payment processing
    setTimeout(() => {
      onPaymentComplete();
    }, 2000);
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-center">Complete Payment</CardTitle>
        <div className="text-center">
          <p className="text-lg font-semibold">{selectedPlan.name} Plan</p>
          <p className="text-2xl font-bold text-club66-purple">
            CFA {selectedPlan.price} + {selectedPlan.monthly}/month
          </p>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="payment-method">Payment Method</Label>
            <Select value={paymentMethod} onValueChange={setPaymentMethod} required>
              <SelectTrigger>
                <SelectValue placeholder="Select payment method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="card">
                  <div className="flex items-center">
                    <CreditCard className="h-4 w-4 mr-2" />
                    Credit/Debit Card
                  </div>
                </SelectItem>
                <SelectItem value="orange">
                  <div className="flex items-center">
                    <Smartphone className="h-4 w-4 mr-2" />
                    Orange Money
                  </div>
                </SelectItem>
                <SelectItem value="moov">
                  <div className="flex items-center">
                    <Smartphone className="h-4 w-4 mr-2" />
                    Moov Money
                  </div>
                </SelectItem>
                <SelectItem value="wave">
                  <div className="flex items-center">
                    <DollarSign className="h-4 w-4 mr-2" />
                    Wave
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {paymentMethod === 'card' && (
            <>
              <div>
                <Label htmlFor="card-number">Card Number</Label>
                <Input
                  id="card-number"
                  placeholder="1234 5678 9012 3456"
                  value={formData.cardNumber}
                  onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="expiry">Expiry Date</Label>
                  <Input
                    id="expiry"
                    placeholder="MM/YY"
                    value={formData.expiryDate}
                    onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="cvv">CVV</Label>
                  <Input
                    id="cvv"
                    placeholder="123"
                    value={formData.cvv}
                    onChange={(e) => setFormData({ ...formData, cvv: e.target.value })}
                    required
                  />
                </div>
              </div>
            </>
          )}

          {(paymentMethod === 'orange' || paymentMethod === 'moov' || paymentMethod === 'wave') && (
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                placeholder="+223 XX XX XX XX"
                value={formData.phoneNumber}
                onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                required
              />
            </div>
          )}

          <div>
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>

          <Button 
            type="submit" 
            className="w-full bg-club66-purple hover:bg-club66-darkpurple"
            disabled={!paymentMethod}
          >
            Pay CFA {selectedPlan.price}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default PaymentForm;
