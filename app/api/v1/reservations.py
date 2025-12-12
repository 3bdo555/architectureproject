from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import select
from app.db.session import get_session
from app.models.event import Event
from app.models.reservation import Reservation
from sqlalchemy.ext.asyncio import AsyncSession

router = APIRouter()

@router.post("/reserve")
async def reserve_ticket(
    reservation: Reservation,
    session: AsyncSession = Depends(get_session)
):
    event = await session.get(Event, reservation.event_id)
    if not event:
        raise HTTPException(404, "Event not found")

    if event.available_seats <= 0:
        raise HTTPException(400, "No seats available")

    event.available_seats -= 1
    session.add(reservation)
    await session.commit()
    await session.refresh(reservation)

    return reservation
