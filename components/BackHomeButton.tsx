'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function BackHomeButton() {
  const router = useRouter();

  return (
    <Button onClick={() => router.push('/')} variant="outline" className="flex items-center gap-2">
      <ArrowLeft className="w-4 h-4" />
      Back Home
    </Button>
  );
}
