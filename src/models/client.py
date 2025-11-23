class Client:
    """Represents a client in the rental system."""

    def __init__(self, client_id: str, name: str, email: str, phone: str):
        """
        Initialize a Client object.

        Args:
            client_id (str): Unique identifier for the client.
            name (str): Full name of the client.
            email (str): Email address of the client.
            phone (str): Phone number of the client.
        """
        self._client_id = client_id
        self._name = name
        self._email = email
        self._phone = phone

    @property
    def client_id(self) -> str:
        """Get the client's unique identifier."""
        return self._client_id

    @property
    def name(self) -> str:
        """Get the client's name."""
        return self._name

    @property
    def email(self) -> str:
        """Get the client's email address."""
        return self._email

    @property
    def phone(self) -> str:
        """Get the client's phone number."""
        return self._phone

    def to_dict(self) -> dict:
        """Convert Client object to a dictionary for JSON serialization."""
        return {
            'client_id': self._client_id,
            'name': self._name,
            'email': self._email,
            'phone': self._phone
        }

    @classmethod
    def from_dict(cls, data: dict) -> "Client":
        """Create a Client object from a dictionary (JSON deserialization)."""
        return cls(
            client_id=data['client_id'],
            name=data['name'],
            email=data['email'],
            phone=data['phone']
        )
