'use client';
import { useEffect, useRef, useState } from "react";
import { flexRender, Table } from "@tanstack/react-table";
import { Patient, PatientTableViewProps } from "../../../types/user";
import PaginationView from "../ui/paginationView";
import Modal from "../ui/modal";
import { 
  User, 
  Calendar, 
  Stethoscope, 
  Users,
  Hash,
  CheckCircle,
  XCircle 
} from "lucide-react";

export default function PatientTableView({
    tableInstance,
    currentPage,
    totalPages,
    onPageChange,
    totalItems,
    pageSize,
    searchQuery,
    onSearchChange,
    setOpenDropdownId,
    editModalId,
    viewModalId,
    patients,
    onEditClose,
    onViewClose,
    onEditSave,
  }: PatientTableViewProps & { tableInstance: Table<Patient> }) {
    const startItem = (currentPage - 1) * pageSize + 1;
    const endItem = Math.min(currentPage * pageSize, totalItems);
    const tableRef = useRef<HTMLDivElement>(null);
    const [editFormData, setEditFormData] = useState<Patient | null>(null);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
  
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (tableRef.current && !tableRef.current.contains(event.target as Node)) {
          setOpenDropdownId(null);
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [setOpenDropdownId]);
  
    useEffect(() => {
      if (editModalId !== null) {
        const patient = patients.find((p) => p.id === editModalId);
        if (patient) setEditFormData({ ...patient });
      } else {
        setEditFormData(null);
      }
    }, [editModalId, patients]);
  
    const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (editFormData) {
        setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
      }
    };
  
    const handleEditSubmit = () => {
      setShowConfirmModal(true);
    };
  
    const confirmEditSave = () => {
      if (editFormData) {
        onEditSave(editFormData);
        setShowConfirmModal(false);
        onEditClose();
      }
    };
  
    return (
      <div className="bg-[#f7f8fc] p-6 rounded-lg">
        <div className="mb-6 relative">
          <input
            type="text"
            placeholder="Search patients..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-[70%] p-3 pl-10 rounded-lg border border-[#e3e5f2]"
          />
          <svg
            className="w-5 h-5 absolute left-3 top-3.5 text-[#8685ac]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
  
        <div ref={tableRef} className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="min-w-full border-collapse">
            <thead>
              {tableInstance.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id} className="border-b border-[#e3e5f2]">
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="p-4 text-left text-sm font-semibold text-[#8685ac] bg-white"
                      colSpan={header.colSpan}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {tableInstance.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className="hover:bg-[#e3e5f2] transition-colors border-b border-[#e3e5f2] last:border-0"
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="p-4 text-sm text-[#a9acaf] align-middle">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
  
        <PaginationView
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
          startItem={startItem}
          endItem={endItem}
          totalItems={totalItems}
        />
  
        {viewModalId !== null && (
          <Modal
            isOpen={viewModalId !== null}
            onClose={onViewClose}
            title="View Patient" 
            titleClassName="text-black"
            footer={
              <button
                onClick={onViewClose}
                className="px-4 py-2 bg-[#3f488d] text-white rounded hover:bg-[#2e3570] transition-colors"
              >
                Close
              </button>
            }
          >
            {patients.find((p) => p.id === viewModalId) && (
              <div className="space-y-3 bg-gradient-to-br from-[#e3e5f2] via-[#f7f8fc] to-[#d1d5eb] p-4 rounded relative overflow-hidden">
                <div className="absolute inset-0 opacity-20 pointer-events-none" style={{
                  backgroundImage: `radial-gradient(circle at 2px 2px, #3f488d 1px, transparent 0)`,
                  backgroundSize: '20px 20px'
                }}></div>
                {(() => {
                  const patient = patients.find((p) => p.id === viewModalId)!;
                  return (
                    <>
                      <div className="flex items-center space-x-2 hover:bg-[#e3e5f2] p-2 rounded transition-colors">
                        <Hash className="w-5 h-5 text-[#3f488d]" />
                        <p className="text-[#2e3570]">
                          <strong>ID:</strong> {patient.id}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2 hover:bg-[#e3e5f2] p-2 rounded transition-colors">
                        <User className="w-5 h-5 text-[#3f488d]" />
                        <p className="text-[#2e3570]">
                          <strong>First Name:</strong> {patient.firstName}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2 hover:bg-[#e3e5f2] p-2 rounded transition-colors">
                        <User className="w-5 h-5 text-[#3f488d]" />
                        <p className="text-[#2e3570]">
                          <strong>Last Name:</strong> {patient.lastName}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2 hover:bg-[#e3e5f2] p-2 rounded transition-colors">
                        <User className="w-5 h-5 text-[#3f488d]" />
                        <p className="text-[#2e3570]">
                          <strong>Age:</strong> {patient.age}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2 hover:bg-[#e3e5f2] p-2 rounded transition-colors">
                        <Users className="w-5 h-5 text-[#3f488d]" />
                        <p className="text-[#2e3570]">
                          <strong>Gender:</strong> {patient.gender}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2 hover:bg-[#e3e5f2] p-2 rounded transition-colors">
                        <Stethoscope className="w-5 h-5 text-[#3f488d]" />
                        <p className="text-[#2e3570]">
                          <strong>Diagnosis:</strong> {patient.diagnosis}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2 hover:bg-[#e3e5f2] p-2 rounded transition-colors">
                        <Calendar className="w-5 h-5 text-[#3f488d]" />
                        <p className="text-[#2e3570]">
                          <strong>Admission Date:</strong> {patient.admissionDate}
                        </p>
                      </div>
                    </>
                  );
                })()}
              </div>
            )}
          </Modal>
        )}
  
        {editModalId !== null && (
          <Modal
            isOpen={editModalId !== null}
            onClose={onEditClose}
            title="Edit Patient" 
            titleClassName="text-black"
            footer={
              <div className="flex space-x-2">
                <button
                  onClick={onEditClose}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleEditSubmit}
                  className="px-4 py-2 bg-[#3f488d] text-white rounded hover:bg-[#2e3570] transition-colors"
                >
                  Save
                </button>
              </div>
            }
          >
            {editFormData && (
              <div className="space-y-4 bg-gradient-to-br from-[#e3e5f2] via-[#f7f8fc] to-[#d1d5eb] p-4 rounded relative overflow-hidden">
                <div className="absolute inset-0 opacity-20 pointer-events-none" style={{
                  backgroundImage: `radial-gradient(circle at 2px 2px, #3f488d 1px, transparent 0)`,
                  backgroundSize: '20px 20px'
                }}></div>
                <div className="flex items-center space-x-2">
                  <User className="w-5 h-5 text-[#3f488d]" />
                  <input
                    name="firstName"
                    value={editFormData.firstName}
                    onChange={handleEditChange}
                    className="w-full p-2 border rounded text-[#2e3570]"
                    placeholder="First Name"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <User className="w-5 h-5 text-[#3f488d]" />
                  <input
                    name="lastName"
                    value={editFormData.lastName}
                    onChange={handleEditChange}
                    className="w-full p-2 border rounded text-[#2e3570]"
                    placeholder="Last Name"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <User className="w-5 h-5 text-[#3f488d]" />
                  <input
                    name="age"
                    value={editFormData.age}
                    onChange={handleEditChange}
                    className="w-full p-2 border rounded text-[#2e3570]"
                    placeholder="Age"
                    type="number"
                  />
                </div>
              </div>
            )}
          </Modal>
        )}
        {showConfirmModal && (
          <Modal
            isOpen={showConfirmModal}
            onClose={() => setShowConfirmModal(false)}
            title="Confirm Changes"
            footer={
              <div className="flex space-x-2">
                <button
                  onClick={() => setShowConfirmModal(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors flex items-center"
                >
                  <XCircle className="w-5 h-5 mr-2" />
                  Cancel
                </button>
                <button
                  onClick={confirmEditSave}
                  className="px-4 py-2 bg-[#3f488d] text-white rounded hover:bg-[#2e3570] transition-colors flex items-center"
                >
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Confirm
                </button>
              </div>
            }
          >
            <div className="text-[#2e3570] p-4">
              <p>Are you sure you want to save these changes?</p>
            </div>
          </Modal>
        )}
      </div>
    );
}