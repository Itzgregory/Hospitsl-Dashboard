import { ReactNode } from 'react';
import { Table, SortingState } from "@tanstack/react-table";

export interface Patient {
    id: number;
    firstName: string;
    lastName: string;
    age: number;
    gender: string;
    diagnosis: string;
    admissionDate: string;
}

export interface PatientState {
    patients: Patient[];
}

export interface ButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    className?: string;
}

export interface PaginationViewProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    startItem: number;
    endItem: number;
    totalItems: number;
}

export interface TableActionsViewProps {
    patientId: number;
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    onEdit: () => void;
    onView: () => void;
}

export interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: ReactNode;
    footer?: ReactNode; 
    titleClassName?: string;
    className?: string;
}

export interface PatientTableViewProps {
    tableInstance: Table<Patient>;
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    totalItems: number;
    pageSize: number;
    searchQuery: string;
    onSearchChange: (query: string) => void;
    sorting: SortingState;
    setOpenDropdownId: (id: number | null) => void;
    openDropdownId: number | null;
    editModalId: number | null;
    viewModalId: number | null;
    patients: Patient[];
    onEditClose: () => void;
    onViewClose: () => void;
    onEditSave: (updatedPatient: Patient) => void;
}
