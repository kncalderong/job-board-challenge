"use client";

import { ComponentRef, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

export function ParallelModal({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const dialogRef = useRef<ComponentRef<"dialog">>(null);

  useEffect(() => {
    if (!dialogRef.current?.open) {
      dialogRef.current?.showModal();
    }
  }, []);

  function onDismiss() {
    router.back();
  }

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <dialog
        open
        ref={dialogRef}
        className="w-4/5 max-w-[1024px] h-auto max-h-10/12 border-none rounded-lg bg-gray-900 p-4 md:p-6 relative space-y-4 md:space-y-6 overflow-auto "
        onClose={onDismiss}
      >
        <div className="flex w-full justify-end">
          <button
            className="grid place-items-center w-[35px] h-[35px] rounded-md bg-gray-700  cursor-pointer md:w-[40px] md:h-[40px] text-white"
            onClick={onDismiss}
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        {children}
      </dialog>
    </div>,
    document.getElementById("parallel-modal-root")!
  );
}
