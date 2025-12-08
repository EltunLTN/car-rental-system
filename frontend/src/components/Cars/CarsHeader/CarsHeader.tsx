import { useState, type Dispatch, type SetStateAction } from "react";
import { Button } from "@/components/ui/button";
import ToggleButtons from "@/components/ui/custom/ToggleButtons/ToggleButtons";
import AddCarDropdown from "../AddCarDropdown/AddCarDropdown";

interface CarsHeaderProps {
  showDeleted: boolean;
  setShowDeleted: Dispatch<SetStateAction<boolean>>;
}

const availabilityCategories = ["all", "available", "rented"];

function CarsHeader({ showDeleted, setShowDeleted }: CarsHeaderProps) {
  const [availability, setAvailability] = useState(availabilityCategories[0]);
  return (
    <header className="flex flex-col justify-between items-start mb-2">
      <h1 className="font-open text-fluid-2xl text-center md:text-start pt-4 mb-5">
        {showDeleted ? "Deleted Cars" : "Cars Overview"}
      </h1>
      <div className="flex items-start gap-2 sm:items-center flex-col sm:flex-row justify-between w-full">
        <ToggleButtons
          values={availabilityCategories}
          value={availability}
          setValue={setAvailability}
        />

        <div role="group" className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => setShowDeleted(!showDeleted)}
            className="cursor-pointer"
            aria-label={
              showDeleted ? "Go back to cars overview" : "View deleted cars"
            }
          >
            {showDeleted ? "Go Back" : "Show Deleted"}
          </Button>
          <AddCarDropdown />
        </div>
      </div>
    </header>
  );
}

export default CarsHeader;
