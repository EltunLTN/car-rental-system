from abc import ABC, abstractmethod
from datetime import datetime

class Vehicle(ABC):

    def __init__(self, id: str, brand: str, model:str, daily_rate: float):
        self._vehicle_id = id
        self._brand = brand
        self._model = model
        self._daily_rate = daily_rate
        self._is_available = True

    @abstractmethod
    def calculate_rental_cost(self, days: int) -> float:
        pass

    @property
    def vehicle_id(self):
        return self._vehicle_id
    
    @property
    def brand(self):
        return self._brand

    @property
    def model(self):
        return self._model

    @property
    def daily_rate(self):
        return self._daily_rate

    @property
    def is_available(self):
        return self._is_available

    @is_available.setter
    def is_available(self, value: bool):
        self._is_available = value 
