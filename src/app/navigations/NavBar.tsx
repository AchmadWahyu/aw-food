'use client';

import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import { ShareButton } from './ShareButton';

export const NavBar = () => {
  return (
    <div className="flex justify-between w-full absolute top-0 left-0 p-4">
      <Button
        type="button"
        variant="outline"
        className="rounded-full px-3 py-5"
        size="default"
        onClick={() => window.history.back()}
      >
        <ChevronLeft />
      </Button>
      <ShareButton className="rounded-full px-3 py-5" />
    </div>
  );
};
