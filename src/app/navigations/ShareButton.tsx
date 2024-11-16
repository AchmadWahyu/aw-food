'use client';
import { Link } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { ToastAction } from '@/components/ui/toast';

export const ShareButton = () => {
  const { toast, dismiss } = useToast();

  const copyLink = () => {
    const origin = window.location.origin;
    const pathname = window.location.pathname;
    const shareUrl = new URL(
      `${origin}${pathname}?utm_source=share-button&utm_medium=web`
    );

    window.navigator?.clipboard?.writeText(shareUrl?.toString());

    toast({
      title: 'Link web tersalin!',
      action: (
        <ToastAction onClick={() => dismiss()} altText="Tutup">
          Tutup
        </ToastAction>
      ),
    });
  };

  return (
    <Button
      onClick={copyLink}
      className="fixed top-3 right-3 z-50"
      variant="outline"
    >
      <Link />
    </Button>
  );
};
