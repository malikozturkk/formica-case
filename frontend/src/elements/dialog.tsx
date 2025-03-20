'use client';
import { useEffect } from 'react';

type DialogProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  closeIcon?: boolean;
  closeBackdrop?: boolean;
}

export default function Dialog({
  isOpen,
  onClose,
  title,
  children,
  closeIcon = true,
  closeBackdrop = true,
}: DialogProps) {

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex md:items-center items-end justify-center z-50">
      {closeBackdrop && (
        <div
          className="absolute inset-0 bg-black opacity-50"
          onClick={onClose}
        />
      )}

      <div className="bg-white rounded-2xl rounded-b-none md:rounded-b-2xl shadow-lg w-full max-w-lg p-6 relative transition-transform duration-300 md:translate-y-[-20px] translate-y-0">
        {closeIcon && (
          <button
            className="absolute cursor-pointer top-6 right-6 text-gray-500 hover:text-gray-700"
            onClick={onClose}
          >
            <svg viewBox="0 0 24 24" className='w-6 h-6 fill-blue-900' xmlns="http://www.w3.org/2000/svg"><g strokeWidth="0"></g><g strokeLinecap="round" strokeLinejoin="round"></g><g> <path fillRule="evenodd" clipRule="evenodd" d="M5.29289 5.29289C5.68342 4.90237 6.31658 4.90237 6.70711 5.29289L12 10.5858L17.2929 5.29289C17.6834 4.90237 18.3166 4.90237 18.7071 5.29289C19.0976 5.68342 19.0976 6.31658 18.7071 6.70711L13.4142 12L18.7071 17.2929C19.0976 17.6834 19.0976 18.3166 18.7071 18.7071C18.3166 19.0976 17.6834 19.0976 17.2929 18.7071L12 13.4142L6.70711 18.7071C6.31658 19.0976 5.68342 19.0976 5.29289 18.7071C4.90237 18.3166 4.90237 17.6834 5.29289 17.2929L10.5858 12L5.29289 6.70711C4.90237 6.31658 4.90237 5.68342 5.29289 5.29289Z"></path> </g></svg>
          </button>
        )}
        {title && <h2 className="text-lg font-semibold mb-4">{title}</h2>}
        <div>{children}</div>
      </div>
    </div>
  );
}