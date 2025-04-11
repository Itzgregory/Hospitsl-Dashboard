import PatientTableContainer from "../components/container/patientTable/tableContainer";

export default function Home() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-black text-center">Patient Records</h1>
      <PatientTableContainer />
    </div>
  );
}