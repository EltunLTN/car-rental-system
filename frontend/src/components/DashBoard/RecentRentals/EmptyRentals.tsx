import { CalendarOff } from "lucide-react";

function EmptyRentals() {
  return (
    <div className="flex flex-col items-center text-center gap-5">
      <CalendarOff
        data-testid="no-clients-icon"
        aria-hidden="true"
        className="h-10 w-10"
      />
      <p className="font-semibold text-fluid-lg max-w-md">
        Oops...No rentals in the database.
      </p>
    </div>
  );
}

export default EmptyRentals;
