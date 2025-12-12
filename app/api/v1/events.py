from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import select
from app.db.session import get_session
from app.models.event import Event
from sqlalchemy.ext.asyncio import AsyncSession

router = APIRouter()

@router.get("/events")
async def list_events(session: AsyncSession = Depends(get_session)):
    result = await session.execute(select(Event))
    return result.scalars().all()

@router.post("/events")
async def create_event(event: Event, session: AsyncSession = Depends(get_session)):
    session.add(event)
    await session.commit()
    await session.refresh(event)
    return event
