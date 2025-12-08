import CarsHeader from "@/components/Cars/CarsHeader/CarsHeader";
import { useState } from "react";

function Cars() {
  const [showDeleted, setShowDeleted] = useState(false);
  return (
    <div className="min-h-screen px-5 md:px-8 py-2 max-w-md sm:max-w-xl md:max-w-7xl  mx-auto">
      <CarsHeader showDeleted={showDeleted} setShowDeleted={setShowDeleted} />
    </div>
  );
}

export default Cars;
