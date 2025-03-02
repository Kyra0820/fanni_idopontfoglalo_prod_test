from django.urls import path
from .views import (
    get_time_slots, create_appointment, save_time_slots,
    list_appointments, update_appointment, login_view, delete_time_slot,
)

urlpatterns = [
    path("time-slots/", get_time_slots, name="get_time_slots"),
    path("appointment/create/", create_appointment, name="create_appointment"),
    path("save-time-slots/", save_time_slots, name="save_time_slots"),
    path("appointments/", list_appointments, name="list_appointments"),
    path("appointments/<int:pk>/update/", update_appointment, name="update_appointment"),
    path("login/", login_view, name="login_view"),
    path("delete-time-slot/", delete_time_slot, name="delete_time_slot"),
]
