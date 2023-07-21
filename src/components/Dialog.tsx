import React, { ReactNode } from 'react';
import { Dialog as HUIDialog } from '@headlessui/react';

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode | ReactNode[];
}

const Dialog = ({ isOpen, onClose, children }: DialogProps) => (
  <HUIDialog
    open={isOpen}
    onClose={onClose}
    className="fixed z-10 inset-0 overflow-y-auto"
  >
    <div className="flex items-center justify-center min-h-screen">
      <HUIDialog.Overlay className="fixed inset-0 bg-black opacity-30" />

      <div className="z-20 bg-neutral-800 rounded max-w-sm mx-auto">
        <div className="py-8 px-4 sm:px-6 lg:px-8">{children}</div>

        <div className="bg-neutral-700 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  </HUIDialog>
);

export default Dialog;
