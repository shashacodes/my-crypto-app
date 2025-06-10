'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

type TradeDialogProps = {
  coinName: string;
  type: 'buy' | 'sell';
};

export function TradeDialog({ coinName, type }: TradeDialogProps) {
  const [open, setOpen] = useState(false);

  const isBuy = type === 'buy';

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        className={isBuy ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'}
      >
        {isBuy ? 'Buy' : 'Sell'}
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          className={`${isBuy ? 'bg-green-50' : 'bg-red-50'} p-6`}
        >
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">
              {isBuy ? 'Buy' : 'Sell'} {coinName}
            </DialogTitle>
          </DialogHeader>

          <p className="mt-4">
            You are about to {type} <strong>{coinName}</strong>. Confirm to proceed.
          </p>

          <DialogFooter className="mt-6 flex justify-end space-x-4">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => setOpen(false)}
              className={isBuy ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'}
            >
              Confirm {isBuy ? 'Buy' : 'Sell'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
