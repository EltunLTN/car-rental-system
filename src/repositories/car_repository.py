from src.repositories.base_repository import Repository

from src.repositories.constants import CAR_HISTORY_SIZE
from typing import List, Optional
import logging
import json


logger = logging.getLogger(__name__)

class CarRepository(Repository):
    """
    Concrete repository for managing Car entities.
    Extends the abstract Repository and implements CRUD operations.
    Maintains a history of the last 10 deleted cars.
    """
    def __init__(self, car_file_path: str):
        """
        Initialize the car repository.

        Args:
            car_file_path (str): Path to the JSON file storing cars.
        """
        super().__init__(file_path=car_file_path)
        self.deleted_history: List[dict] = []
        self._deleted_history_size = CAR_HISTORY_SIZE

    def create(self, car: dict) -> bool:
        """Add a new car to the repository."""
        try:
            cars = self.read_all()
            cars.append(car)
            with open(self.file_path, "w", encoding="utf-8") as f:
                json.dump(cars, f, indent=2, ensure_ascii=False)
            logger.info(f"Car created: {car.get('vehicle_id')}")
            return True
        except Exception as e:
            logger.error(f"Create error: {e}")
            return False
        
    def read_all(self) -> List[dict]:
        """Return all cars in the repository."""
        try:
            with open(self.file_path, "r", encoding="utf-8") as f:
                return json.load(f)
        except json.JSONDecodeError:
            logger.warning(f"Invalid JSON in {self.file_path}, returning empty list")
            return []
        except Exception as e:
            logger.error(f"Read error {e}")
            return []
        
    def find_by_id(self, car_id: str) -> Optional[dict]:
        """Find a car by vehicle_id."""
        for car in self.read_all():
            if car.get('vehicle_id') == car_id:
                return car
        return None
    
    def update(self, car_id: str, updated_fields: dict) -> bool:
        """Update a car's fields except the vehicle_id."""
        try:
            cars = self.read_all()
            for car in cars:
                if car.get('vehicle_id') == car_id:
                    # Prevent changing the vehicle_id
                    if "vehicle_id" in updated_fields:
                        raise ValueError("Cannot update the vehicle_id")
                    
                    car.update(updated_fields)
                    with open(self.file_path, "w", encoding="utf-8") as f:
                        json.dump(cars, f, indent=2, ensure_ascii=False)
                    logger.info(f"Car with id {car_id} was successfully updated")
                    return True
            logger.warning(f"Car with id {car_id} not found.")
            return False
        except Exception as e:
            logger.error(f"Update error: {e}")
            return False

    def delete(self, car_id:str) -> bool:
        """Delete a car and store in deleted history."""
        try:
            cars = self.read_all()
            for index, car in enumerate(cars):
                if car.get("vehicle_id") == car_id:
                    deleted_car = cars.pop(index)
                    self.deleted_history.append(deleted_car)

                    # Keep the car number max deleted_history_size
                    if len(self.deleted_history) > self._deleted_history_size:
                        self.deleted_history.pop(0)
                    
                    with open(self.file_path, "w", encoding="utf-8") as f:
                        json.dump(cars, f, indent=2, ensure_ascii=False)
                    logger.info(f"Car with id {car_id} successfully deleted.")
                    return True
            logger.warning(f"Car with id {car_id} not found")
            return False
        except Exception as e:
            logger.error(f"Delete error: {e}")
            return False
    
    def get_deleted_history(self) -> List[dict]:
        """Return a list of the last deleted cars."""
        return self.deleted_history
