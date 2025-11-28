"""
Car Rental Management System - Main Entry Point
Sprint 1 - OOP Implementation
"""

from datetime import datetime
import sys
import os

# Fix import path
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from src.models.car import Car
from src.models.client import Client
from src.repositories.repository import Repository
from src.services.rental_service import RentalService

from src.repositories.car_repository import CarRepository
import logging

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s"
)
logger = logging.getLogger("src.main")


def seed_data(service: RentalService, cars_repo, clients_repo, rentals_repo):
    """Insert sample data only if JSON files are empty."""
    
    # ---------------- CARS -------------------
    if not cars_repo.read_all():
        logger.info("Seeding sample cars...")
        service.add_car(Car("C001", "Toyota", "Camry", 50.0, "Sedan", 5))
        service.add_car(Car("C002", "Honda", "CR-V", 70.0, "SUV", 7))
        service.add_car(Car("C003", "BMW", "320i", 100.0, "Sedan", 5))

    # ---------------- CLIENTS ----------------
    if not clients_repo.read_all():
        logger.info("Seeding sample clients...")
        service.add_client(Client("CL001", "John Doe", "john@example.com", "+1234567890"))
        service.add_client(Client("CL002", "Jane Smith", "jane@example.com", "+0987654321"))

    # ---------------- RENTALS ----------------
    if not rentals_repo.read_all():
        logger.info("Creating initial rental...")
        service.create_rental("R001", "C001", "CL001")  # Rents car C001


def main():
    logger.info("Starting Car Rental Management System...")

    # Initialize repositories
    cars_repo = CarRepository("data/cars.json")
    clients_repo = Repository("data/clients.json")
    rentals_repo = Repository("data/rentals.json")

    # Initialize service layer
    service = RentalService(cars_repo, clients_repo, rentals_repo)


    #### to tet (temporary)
    new_car = Car("C004", "Mazda", "CX-5", 80.0, "SUV", 5)
    service.add_car(new_car)

    cars_repo.update("C004", {
        "daily_rate": 90,
        "seats": 6
    })

    cars_repo.delete("C004")  
    logger.info(f"Deleted cars history: {cars_repo.get_deleted_history()}")
    ####

    # Seed initial data only once
    seed_data(service, cars_repo, clients_repo, rentals_repo)

    # Display available cars
    logger.info("Available cars:")
    for car in service.get_available_cars():
        logger.info(f" - {car.brand} {car.model} ({car.car_type}) - ${car.daily_rate}/day")

    logger.info("System demonstration completed!")


if __name__ == "__main__":
    main()
