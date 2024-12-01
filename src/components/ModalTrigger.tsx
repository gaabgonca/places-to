"use client";

import React, { useState } from "react";
import SuggestPlaceModal from "@/components/SuggestPlaceModal";

export default function ModalTrigger() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <p className="text-center mt-4 z-30">
        No tenemos muchos lugares todavía,{" "}<br/>
        <span
          className="underline cursor-pointer pointer-events-auto z-40"
          onClick={() => setModalOpen(true)}
        >
          ¿quieres sugerir uno?
        </span>
      </p>
      <SuggestPlaceModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
}
