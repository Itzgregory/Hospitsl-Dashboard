import { Header } from "@tanstack/react-table"; 
import { Patient } from "../../../types/user"; 

interface TableHeaderViewProps {
  header: Header<Patient, unknown>; 
}

export default function TableHeaderView({ header }: TableHeaderViewProps) {
  return (
    <th className="border border-gray-300 p-2 bg-gray-100">
      {header.isPlaceholder 
        ? null 
        : typeof header.column.columnDef.header === 'string'
          ? header.column.columnDef.header
          : null}
    </th>
  );
}