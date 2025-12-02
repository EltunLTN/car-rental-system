import { UserRoundX } from "lucide-react";

function EmptyClientsTable() {
  return (
    <div className="flex flex-col items-center text-center gap-5">
      <UserRoundX
        data-testid="no-clients-icon"
        aria-hidden="true"
        className="h-10 w-10"
      />
      <p className="font-semibold text-fluid-lg max-w-md">
        <span className="block font-bold">
          Oops...No clients in the database.
        </span>
        Click add a client to add one
      </p>
    </div>
  );
}

export default EmptyClientsTable;
