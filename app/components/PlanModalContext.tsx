"use client";

import React, { createContext, useContext, useState } from "react";
import HousingPlanModal from "./HousingPlanModal";

interface PlanModalContextType {
  openPlanModal: (options?: { city?: string; semester?: string; students?: number }) => void;
  closePlanModal: () => void;
}

const PlanModalContext = createContext<PlanModalContextType>({
  openPlanModal: () => {},
  closePlanModal: () => {},
});

export function PlanModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [modalOptions, setModalOptions] = useState<{
    city?: string;
    semester?: string;
    students?: number;
  }>({});

  const openPlanModal = (options?: { city?: string; semester?: string; students?: number }) => {
    if (options) setModalOptions(options);
    setIsOpen(true);
  };

  const closePlanModal = () => {
    setIsOpen(false);
  };

  return (
    <PlanModalContext.Provider value={{ openPlanModal, closePlanModal }}>
      {children}
      <HousingPlanModal
        isOpen={isOpen}
        onClose={closePlanModal}
        defaultCity={modalOptions.city || "Florence, Italy"}
        defaultSemester={modalOptions.semester || "Spring 2027"}
        defaultStudents={modalOptions.students || 4}
      />
    </PlanModalContext.Provider>
  );
}

export const usePlanModal = () => useContext(PlanModalContext);
