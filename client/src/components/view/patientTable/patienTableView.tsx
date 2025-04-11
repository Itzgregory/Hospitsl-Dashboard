'use client';
import { useEffect, useRef, useState } from "react";
import { flexRender, Table, ColumnSort } from "@tanstack/react-table";
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
  XCircle,
  ChevronUp,
  ChevronDown
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

    const toggleSort = (columnId: string) => {
      const column = tableInstance.getColumn(columnId);
      if (column) {
        column.toggleSorting(column.getIsSorted() === 'asc');
      }
    };
  
    return (
      <div className="bg-[#f7f8fc] p-6 rounded-lg">
        <div className="mb-6 relative group">
          <input
            type="text"
            placeholder="Search patients..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-[70%] p-3 pl-10 rounded-lg border border-[#e3e5f2] transition-all duration-300 focus:w-[80%] focus:ring-2 focus:ring-[#3f488d] focus:border-transparent outline-none"
          />
          <svg
            className="w-5 h-5 absolute left-3 top-3.5 text-[#8685ac] transition-transform duration-300 group-focus-within:scale-110"
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
                      className="p-4 text-left text-sm font-semibold text-[#8685ac] bg-white transition-colors duration-200 hover:bg-[#f7f8fc] cursor-pointer"
                      colSpan={header.colSpan}
                      onClick={() => header.column.getCanSort() && toggleSort(header.column.id)}
                    >
                      <div className="flex items-center space-x-2">
                        {header.isPlaceholder
                          ? null
                          : flexRender(header.column.columnDef.header, header.getContext())}
                        {header.column.getCanSort() && (
                          <span className="flex flex-col">
                            <ChevronUp 
                              className={`w-4 h-4 ${header.column.getIsSorted() === 'asc' ? 'text-[#3f488d]' : 'text-gray-400'}`} 
                            />
                            <ChevronDown 
                              className={`w-4 h-4 -mt-1 ${header.column.getIsSorted() === 'desc' ? 'text-[#3f488d]' : 'text-gray-400'}`} 
                            />
                          </span>
                        )}
                      </div>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {tableInstance.getRowModel().rows.map((row, index) => (
                <tr
                  key={row.id}
                  className="border-b border-[#e3e5f2] last:border-0 hover:bg-[#e3e5f2] transition-colors duration-200 animate-slide-in"
                  style={{ animationDelay: `${index * 50}ms` }}
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
            className="animate-fade-in"
            footer={
              <button
                onClick={onViewClose}
                className="px-4 py-2 bg-[#3f488d] text-white rounded hover:bg-[#2e3570] transition-transform duration-200 hover:scale-105"
              >
                Close
              </button>
            }
          >
            {patients.find((p) => p.id === viewModalId) && (
              <div className="space-y-3 bg-gradient-to-br from-[#e3e5f2] via-[#f7f8fc] to-[#d1d5eb] p-4 rounded relative overflow-hidden">
                <div
                  className="absolute inset-0 opacity-20 pointer-events-none"
                  style={{
                    backgroundImage: `radial-gradient(circle at 2px 2px, #3f488d 1px, transparent 0)`,
                    backgroundSize: "20px 20px",
                  }}
                ></div>
                {(() => {
                  const patient = patients.find((p) => p.id === viewModalId)!;
                  return (
                    <>
                      <div className="flex items-center space-x-2 p-2 rounded transition-all duration-200 hover:bg-[#e3e5f2] hover:pl-4">
                        <Hash className="w-5 h-5 text-[#3f488d] transition-transform duration-200 hover:scale-110" />
                        <p className="text-[#2e3570]">
                          <strong>ID:</strong> {patient.id}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2 p-2 rounded transition-all duration-200 hover:bg-[#e3e5f2] hover:pl-4">
                        <User className="w-5 h-5 text-[#3f488d] transition-transform duration-200 hover:scale-110" />
                        <p className="text-[#2e3570]">
                          <strong>First Name:</strong> {patient.firstName}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2 p-2 rounded transition-all duration-200 hover:bg-[#e3e5f2] hover:pl-4">
                        <User className="w-5 h-5 text-[#3f488d] transition-transform duration-200 hover:scale-110" />
                        <p className="text-[#2e3570]">
                          <strong>Last Name:</strong> {patient.lastName}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2 p-2 rounded transition-all duration-200 hover:bg-[#e3e5f2] hover:pl-4">
                        <User className="w-5 h-5 text-[#3f488d] transition-transform duration-200 hover:scale-110" />
                        <p className="text-[#2e3570]">
                          <strong>Age:</strong> {patient.age}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2 p-2 rounded transition-all duration-200 hover:bg-[#e3e5f2] hover:pl-4">
                        <Users className="w-5 h-5 text-[#3f488d] transition-transform duration-200 hover:scale-110" />
                        <p className="text-[#2e3570]">
                          <strong>Gender:</strong> {patient.gender}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2 p-2 rounded transition-all duration-200 hover:bg-[#e3e5f2] hover:pl-4">
                        <Stethoscope className="w-5 h-5 text-[#3f488d] transition-transform duration-200 hover:scale-110" />
                        <p className="text-[#2e3570]">
                          <strong>Diagnosis:</strong> {patient.diagnosis}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2 p-2 rounded transition-all duration-200 hover:bg-[#e3e5f2] hover:pl-4">
                        <Calendar className="w-5 h-5 text-[#3f488d] transition-transform duration-200 hover:scale-110" />
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
            className="animate-fade-in"
            footer={
              <div className="flex space-x-2">
                <button
                  onClick={onEditClose}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-transform duration-200 hover:scale-105"
                >
                  Cancel
                </button>
                <button
                  onClick={handleEditSubmit}
                  className="px-4 py-2 bg-[#3f488d] text-white rounded hover:bg-[#2e3570] transition-transform duration-200 hover:scale-105"
                >
                  Save
                </button>
              </div>
            }
          >
            {editFormData && (
              <div className="space-y-4 bg-gradient-to-br from-[#e3e5f2] via-[#f7f8fc] to-[#d1d5eb] p-4 rounded relative overflow-hidden">
                <div
                  className="absolute inset-0 opacity-20 pointer-events-none"
                  style={{
                    backgroundImage: `radial-gradient(circle at 2px 2px, #3f488d 1px, transparent 0)`,
                    backgroundSize: "20px 20px",
                  }}
                ></div>
                <div className="flex items-center space-x-2 transition-all duration-200 hover:pl-4">
                  <User className="w-5 h-5 text-[#3f488d] transition-transform duration-200 hover:scale-110" />
                  <input
                    name="firstName"
                    value={editFormData.firstName}
                    onChange={handleEditChange}
                    className="w-full p-2 border rounded text-[#2e3570] focus:ring-2 focus:ring-[#3f488d] focus:border-transparent outline-none transition-all duration-200"
                    placeholder="First Name"
                  />
                </div>
                <div className="flex items-center space-x-2 transition-all duration-200 hover:pl-4">
                  <User className="w-5 h-5 text-[#3f488d] transition-transform duration-200 hover:scale-110" />
                  <input
                    name="lastName"
                    value={editFormData.lastName}
                    onChange={handleEditChange}
                    className="w-full p-2 border rounded text-[#2e3570] focus:ring-2 focus:ring-[#3f488d] focus:border-transparent outline-none transition-all duration-200"
                    placeholder="Last Name"
                  />
                </div>
                <div className="flex items-center space-x-2 transition-all duration-200 hover:pl-4">
                  <User className="w-5 h-5 text-[#3f488d] transition-transform duration-200 hover:scale-110" />
                  <input
                    name="age"
                    value={editFormData.age}
                    onChange={handleEditChange}
                    className="w-full p-2 border rounded text-[#2e3570] focus:ring-2 focus:ring-[#3f488d] focus:border-transparent outline-none transition-all duration-200"
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
            className="animate-fade-in"
            footer={
              <div className="flex space-x-2">
                <button
                  onClick={() => setShowConfirmModal(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-transform duration-200 hover:scale-105 flex items-center"
                >
                  <XCircle className="w-5 h-5 mr-2 transition-transform duration-200 group-hover:rotate-90" />
                  Cancel
                </button>
                <button
                  onClick={confirmEditSave}
                  className="px-4 py-2 bg-[#3f488d] text-white rounded hover:bg-[#2e3570] transition-transform duration-200 hover:scale-105 flex items-center"
                >
                  <CheckCircle className="w-5 h-5 mr-2 transition-transform duration-200 group-hover:scale-110" />
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