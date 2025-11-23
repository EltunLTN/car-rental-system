from abc import ABC, abstractmethod
from typing import List, Optional, Dict

class Repository(ABC):
    """Repository interface - Student B will implement CRUD operations."""

    @abstractmethod
    def create(self, item: Dict) -> bool:
        """Add a new record to the repository."""
        pass

    @abstractmethod
    def read_all(self) -> List[Dict]:
        """Return all records in the repository."""
        pass

    @abstractmethod
    def find_by_id(self, item_id: str) -> Optional[Dict]:
        """Return a record by its ID, or None if not found."""
        pass

    @abstractmethod
    def update(self, item_id: str, updated_item: Dict) -> bool:
        """Update an existing record by its ID."""
        pass

    @abstractmethod
    def delete(self, item_id: str) -> bool:
        """Delete a record by its ID."""
        pass
