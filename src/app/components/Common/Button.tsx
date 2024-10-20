import React, { useCallback } from 'react';

export enum ButtonVariant {
  filled = "filled",
  outlined = "outlined",
}

interface ButtonProps {
  variant: ButtonVariant;
  label: string;
  onClick:()=> void;
}

const Button = ({ variant, label, onClick }: ButtonProps) => {
  const getButtonVariant = useCallback(() => {
    switch (variant) {
      case ButtonVariant.outlined:
        return "bg-backgroundAccent1 border-neutralLight";

      case ButtonVariant.filled:
        return "bg-primary text-white py-2 px-4";
    }
  }, [variant]);
  return (
    <button
      className={`${getButtonVariant()} w-max h-max text-xs font-semibold rounded-3xl`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Button