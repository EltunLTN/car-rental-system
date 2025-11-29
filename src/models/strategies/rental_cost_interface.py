from abc import ABC, abstractmethod

# type checking for proper hinting
from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from src.models.car import Car

class RentalCostStrategy(ABC):
    @abstractmethod
    def calculate_cost(self, car: "Car", days: int) -> float:
        pass