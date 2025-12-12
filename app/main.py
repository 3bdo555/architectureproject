import uvicorn
from fastapi import FastAPI
from app.api.v1.events import router as events_router
from app.api.v1.reservations import router as reservation_router

app = FastAPI()

app.include_router(events_router, prefix="/api/v1")
app.include_router(reservation_router, prefix="/api/v1")

if __name__ == "__main__":
    uvicorn.run("website.main:app", host="127.0.0.1", port=8000, reload=True)
