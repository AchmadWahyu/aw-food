'use client';
import { Link } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { ToastAction } from '@/components/ui/toast';

export const ShareButton = ({ className }: { className?: string }) => {
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
      className={className}
      type="button"
      variant="outline"
      size="default"
    >
      <Link />
    </Button>
  );
};
