import { X } from "lucide-react";
import { ReactNode } from "react";
import { tv, VariantProps } from "tailwind-variants";

const modalVariants = tv({
  base: "rounded-xl py-5 px-6 bg-zinc-900 shadow-shape space-y-5",
  variants: {
    size: {
      large: "w-[640px]",
      small: "w-auto",
    },
  },
  defaultVariants: {
    size: "large",
  },
});

interface ModalProps extends VariantProps<typeof modalVariants> {
  children: ReactNode;
  closeModal: () => void;
  title: string;
  description?: ReactNode;
}

export function Modal({
  children,
  closeModal,
  description,
  title,
  size,
}: ModalProps) {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center max-lg:px-6">
      <div className={modalVariants({ size })}>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-lg">{title}</h2>

            <button type="button" onClick={closeModal}>
              <X className="size-4" />
            </button>
          </div>

          <p className="text-sm text-zinc-400 text-left">{description}</p>
        </div>

        {children}
      </div>
    </div>
  );
}
