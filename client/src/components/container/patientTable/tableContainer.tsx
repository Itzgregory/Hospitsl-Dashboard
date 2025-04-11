'use client';
import { useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { 
  createColumnHelper, 
  useReactTable, 
  getCoreRowModel, 
  getPaginationRowModel, 
  getSortedRowModel,
  SortingState
} from "@tanstack/react-table";
import { RootState } from "../../../redux/store/store";
import PatientTableView from "../../view/patientTable/patienTableView";
import TableActionsView from "../../view/patientTable/tableActionView";
import { Patient } from "../../../types/user";
import { updatePatient } from "../../../redux/slices/userSlice";

const columnHelper = createColumnHelper<Patient>();

export default function PatientTableContainer() {
  const dispatch = useDispatch();
  const patients = useSelector((state: RootState) => state.patients.patients);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);
  const [editModalId, setEditModalId] = useState<number | null>(null);
  const [viewModalId, setViewModalId] = useState<number | null>(null);

  const filteredPatients = useMemo(() => {
    if (!searchQuery) return patients;
    
    return patients.filter(patient => 
      Object.values(patient).some(value =>
        String(value).toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [patients, searchQuery]);

  const columns = useMemo(
    () => [
      columnHelper.accessor("id", { 
        header: "ID",
        enableSorting: true
      }),
      columnHelper.accessor("firstName", { 
        header: "First Name",
        enableSorting: true
      }),
      columnHelper.accessor("lastName", { 
        header: "Last Name",
        enableSorting: true
      }),
      columnHelper.accessor("age", { 
        header: "Age",
        enableSorting: true
      }),
      columnHelper.accessor("gender", { 
        header: "Gender",
        enableSorting: true
      }),
      columnHelper.accessor("diagnosis", { 
        header: "Diagnosis",
        enableSorting: true
      }),
      columnHelper.accessor("admissionDate", { 
        header: "Admission Date",
        enableSorting: true
      }),
      columnHelper.display({
        id: "actions",
        header: "Actions",
        cell: ({ row }) => (
          <div className="action-cell">
            <TableActionsView 
              patientId={row.original.id}
              isOpen={openDropdownId === row.original.id}
              setIsOpen={(isOpen) => setOpenDropdownId(isOpen ? row.original.id : null)}
              onEdit={() => setEditModalId(row.original.id)}
              onView={() => setViewModalId(row.original.id)}
            />
          </div>
        ),
      }),
    ],
    [openDropdownId]
  );

  const tableInstance = useReactTable({
    data: filteredPatients,
    columns,
    state: {
      pagination,
      sorting,
    },
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    manualPagination: false,
  });

  const totalPages = Math.ceil(filteredPatients.length / pagination.pageSize);
  const currentPage = pagination.pageIndex + 1;
  const totalItems = filteredPatients.length;

  const handlePageChange = (newPage: number) => {
    tableInstance.setPageIndex(newPage - 1);
  };

  const handleEditSave = (updatedPatient: Patient) => {
    dispatch(updatePatient(updatedPatient));
    setEditModalId(null);
  };

  return (
    <PatientTableView
      tableInstance={tableInstance}
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={handlePageChange}
      totalItems={totalItems}
      pageSize={pagination.pageSize}
      searchQuery={searchQuery}
      onSearchChange={setSearchQuery}
      sorting={sorting}
      setOpenDropdownId={setOpenDropdownId}
      openDropdownId={openDropdownId}
      editModalId={editModalId}
      viewModalId={viewModalId}
      patients={patients}
      onEditClose={() => setEditModalId(null)}
      onViewClose={() => setViewModalId(null)}
      onEditSave={handleEditSave}
    />
  );
}