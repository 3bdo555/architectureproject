from sqlmodel import SQLModel, Field
from typing import Optional
from datetime import datetime

class Reservation(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    event_id: int = Field(foreign_key="event.id")
    user_email: str
    reserved_at: datetime = Field(default_factory=datetime.utcnow)
