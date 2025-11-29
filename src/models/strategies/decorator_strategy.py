from src.models.strategies.rental_cost_interface import RentalCostStrategy

# type checking for proper hinting
from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from src.models.car import Car

# decorator design pattern
class CostDecorator(RentalCostStrategy):
    def __init__(self, wrapped: RentalCostStrategy):
        self._wrapped = wrapped
    
    def calculate_cost(self, car: "Car", days: int) -> float:
        return self._wrapped.calculate_cost(car, days)