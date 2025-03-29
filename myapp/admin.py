from django.contrib import admin
from .models import Appointment, TimeSlot

@admin.register(Appointment)
class AppointmentAdmin(admin.ModelAdmin):
    list_display = (
        "last_name",
        "first_name",
        "email",
        "instagram",
        "phone",
        "city",
        "age",
        "design",
        "idea_details",
        "size",
        "body_part",
        "color",
        "previous",
        "date",
        "consent",
        "terms",
        "created_at", 
        'reserved',
        "paid",
    )
    search_fields = ("last_name", "first_name", "email")

@admin.register(TimeSlot)
class TimeSlotAdmin(admin.ModelAdmin):
    list_display = ['date', 'time', 'id']
