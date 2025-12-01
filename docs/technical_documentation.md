# Car Rental Management System – Technical Documentation

## Overview

This document describes the Car Rental Management System, covering both Sprint 1 (OOP Implementation) and Sprint 2 (Refinement, Completion, and Polish) deliverables.

---

## Sprint 1 – OOP Implementation

### Project Structure

car_rental_project/
├── src/
│ ├── models/ # Domain models
│ ├── repositories/ # Data access layer
│ ├── services/ # Business logic layer
│ └── main.py # Entry point
├── tests/ # Unit tests
├── docs/ # Documentation
└── data/ # JSON data files

---

### OOP Principles

#### 1. Abstraction

- The **Vehicle** class is used as an abstract base class.
- Abstract method: `calculate_rental_cost()`.

#### 2. Inheritance

- The **Car** class inherits from **Vehicle**.
- The `super()` method is used to call the parent class constructor.

#### 3. Encapsulation

- All attributes are private (prefixed with `_`).
- Public access is provided via `@property` decorators.
- Setter methods are used to control restricted access.

#### 4. Polymorphism

- The `calculate_rental_cost()` method is overridden in the `Car` class.
- Additional fees are applied for SUV-type cars.

#### 5. Composition

- The **Rental** class uses **Car** and **Client** classes as components (composition).

---

### Classes

#### Vehicle (Abstract Base Class)

- `vehicle_id`: Unique ID of the vehicle
- `brand`: Brand name
- `model`: Model name
- `daily_rate`: Daily rental rate
- `is_available`: Availability status

#### Car (Concrete Class)

- Inherits from Vehicle
- `car_type`: Type of car (SUV, Sedan, etc.)
- `seats`: Number of seats
- `calculate_rental_cost()`: Calculates rental cost

#### Client

- `client_id`: Unique ID of the client
- `name`: Name
- `email`: Email address
- `phone`: Phone number

#### Rental

- `rental_id`: Unique rental ID
- `car`: Car object (composition)
- `client`: Client object (composition)
- `start_date`: Rental start date
- `end_date`: Rental end date
- `total_cost`: Total cost
- `is_active`: Active status

#### Repository

- Provides CRUD operations (Create, Read, Update, Delete)
- Works with JSON files
- Supports logging

#### RentalService

- Business logic layer
- Manages Cars, Clients, and Rentals
- Uses the Repository pattern

---

### Data Storage

- JSON files are used for persistence.
- `data/cars.json`: Stores car data
- `data/clients.json`: Stores client data
- `data/rentals.json`: Stores rental records

---

### Testing

- Unit tests are located in the `tests/` folder
- `pytest` framework is used
- Tests cover inheritance, polymorphism, encapsulation, and composition behaviors

---

### Logging

- Python `logging` module is used
- Logs are recorded at the INFO level
- Tracks repository operations and important events

---

## Sprint 2 – Refinement, Completion, and Polish

### Enhanced Architecture

The system has been enhanced with a complete layered architecture:

```
┌─────────────────────────────────────┐
│      CLI Interface (cli.py)         │  ← User Interaction Layer
├─────────────────────────────────────┤
│      Service Layer                   │  ← Business Logic Layer
│   (RentalService)                   │
├─────────────────────────────────────┤
│      Repository Layer                │  ← Data Access Layer
│   (JsonRepository)                  │
├─────────────────────────────────────┤
│      Models Layer                    │  ← Domain Models
│   (Car, Client, Rental)             │
└─────────────────────────────────────┘
```

### Complete CRUD Operations

#### Car Management
- ✅ **Create**: `add_car(car: Car) -> bool`
- ✅ **Read**: `get_car(vehicle_id)`, `get_all_cars()`, `get_available_cars()`
- ✅ **Update**: `update_car(vehicle_id, **kwargs) -> bool`
- ✅ **Delete**: `delete_car(vehicle_id) -> bool` (with business rule validation)

#### Client Management
- ✅ **Create**: `add_client(client: Client) -> bool`
- ✅ **Read**: `get_client(client_id)`, `get_all_clients()`
- ✅ **Update**: `update_client(client_id, **kwargs) -> bool`
- ✅ **Delete**: `delete_client(client_id) -> bool` (prevents deletion if active rentals exist)

#### Rental Management
- ✅ **Create**: `create_rental(rental_id, car_id, client_id) -> Optional[Rental]`
- ✅ **Read**: `get_rental(rental_id)`, `get_all_rentals()`, `get_active_rentals()`
- ✅ **Update**: `complete_rental(rental_id) -> bool` (completes rental and calculates cost)
- ✅ **Delete**: `delete_rental(rental_id) -> bool` (only for completed rentals)

### Design Patterns

#### 1. Repository Pattern
- **Abstract Repository** (`base_repository.py`): Defines CRUD interface
- **Concrete Repository** (`concrete_repository.py`): JSON-based implementation
- **Benefits**: Separates data access from business logic, enables easy testing and future database migration

#### 2. Strategy Pattern
- **RentalCostStrategy**: Interface for cost calculation algorithms
- **Implementations**:
  - `StandardCarCost`: Base calculation
  - `SUVRentalCost`: Applies 1.2x multiplier for SUVs
- **Benefits**: Allows flexible pricing strategies without modifying existing code (Open/Closed Principle)

#### 3. Decorator Pattern
- **CostDecorator**: Wraps cost strategies to add additional pricing rules
- **Implementations**:
  - `LongTermRentalCost`: 15% discount for rentals ≥ 7 days
  - `HolidayDiscount`: 10% discount on holidays
- **Benefits**: Composable pricing rules, follows Single Responsibility Principle

#### 4. Service Layer Pattern
- **RentalService**: Encapsulates business logic
- Coordinates between repositories and enforces business rules
- **Benefits**: Separation of concerns, centralized business logic

### Design Principles Applied

#### SOLID Principles

1. **Single Responsibility Principle (SRP)**
   - Each class has one reason to change
   - Models: data representation
   - Repositories: data persistence
   - Services: business logic
   - CLI: user interaction

2. **Open/Closed Principle (OCP)**
   - Strategy pattern allows adding new cost calculation strategies without modifying existing code
   - Decorator pattern enables adding new pricing rules without changing core classes

3. **Liskov Substitution Principle (LSP)**
   - `JsonRepository` can replace `Repository` abstract class
   - `Car` properly extends `Vehicle` behavior

4. **Interface Segregation Principle (ISP)**
   - `RentalCostStrategy` defines minimal interface needed
   - Clients only depend on methods they use

5. **Dependency Inversion Principle (DIP)**
   - Service layer depends on `Repository` abstraction, not concrete implementation
   - Enables easy swapping of storage backends

#### GRASP Principles

1. **Information Expert**: Models contain their own validation logic
2. **Creator**: Services create domain objects
3. **Controller**: CLI acts as system boundary controller
4. **Low Coupling**: Layers interact through well-defined interfaces
5. **High Cohesion**: Related functionality grouped together

#### CUPID Principles

1. **Composable**: Small, focused classes that work together
2. **Unix Philosophy**: Do one thing well
3. **Predictable**: Consistent naming and behavior
4. **Idiomatic**: Follows Python conventions
5. **Domain-Based**: Models reflect real-world entities

### Exception Handling

Custom exception hierarchy:

```python
CarRentalException (base)
├── EntityNotFoundError
├── EntityNotAvailableError
├── ValidationError
├── BusinessLogicError
└── DeletionError
```

- Provides specific, meaningful error messages
- Enables precise error handling
- Improves debugging and user experience

### Enhanced Logging

**Features:**
- File logging with rotation (max 10MB, 5 backups)
- Console logging with formatted output
- Configurable log levels (DEBUG, INFO, WARNING, ERROR)
- Detailed logging includes file names and line numbers
- Separate console and file formatters

**Configuration:**
- Located in `src/logging_config.py`
- Centralized setup
- Logs stored in `logs/car_rental.log`

### CLI Interface

**Features:**
- Interactive menu-driven interface
- Full CRUD operations for all entities
- Input validation and error handling
- User-friendly prompts and confirmations
- Report generation

**Menu Structure:**
1. **Car Management**: Add, View, Update, Delete cars
2. **Client Management**: Add, View, Update, Delete clients
3. **Rental Management**: Create, View, Complete, Delete rentals
4. **Reports**: View various reports and statistics

**Usage:**
```bash
python run.py              # Start CLI mode
python src/main.py --mode cli    # CLI mode
python src/main.py --mode demo   # Demo mode
```

### Testing

**Coverage:**
- ✅ Unit tests for all models (Car, Client, Rental)
- ✅ Repository tests (CRUD operations, edge cases)
- ✅ Service layer tests (business logic, error scenarios)
- ✅ Edge case tests (validation, boundary conditions)
- ✅ Integration tests (end-to-end workflows)

**Test Files:**
- `test_car.py`: Model tests (inheritance, polymorphism, serialization)
- `test_client.py`: Client model tests
- `test_rental.py`: Rental model and composition tests
- `test_repository.py`: Repository CRUD operations
- `test_service.py`: Service layer business logic
- `test_service_edge_cases.py`: Error scenarios and edge cases

**Running Tests:**
```bash
pytest                    # Run all tests
pytest -v                 # Verbose output
pytest --cov=src          # With coverage report (if pytest-cov installed)
```

### Data Persistence

**JSON File Structure:**
- `data/cars.json`: Array of car objects
- `data/clients.json`: Array of client objects
- `data/rentals.json`: Array of rental objects

**Features:**
- Automatic file creation if missing
- Deletion history tracking (configurable size)
- Atomic write operations
- JSON validation and error handling

### Class Diagrams

See `docs/UML.drawio.svg` for detailed class diagrams showing:
- Inheritance relationships
- Composition relationships
- Method signatures
- Design pattern implementations

### Future Enhancements

Potential improvements for future sprints:
- Database integration (PostgreSQL/MySQL)
- Web API (RESTful endpoints)
- GUI application (Tkinter/PyQt)
- Advanced reporting and analytics
- Multi-user support with authentication
- Rental history and statistics dashboard
