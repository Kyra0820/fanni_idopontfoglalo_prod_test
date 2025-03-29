from django.db import models

class Appointment(models.Model):
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    email = models.EmailField()
    phone = models.CharField(max_length=20)
    date = models.DateField(blank=True, null=True)
    time = models.TimeField(blank=True, null=True)
    reserved = models.DateTimeField(blank=True, null=True)
    instagram = models.CharField(max_length=255, blank=True, null=True)
    city = models.CharField(max_length=255, blank=True, null=True)
    age = models.IntegerField(blank=True, null=True)
    design = models.CharField(max_length=255, blank=True, null=True)
    idea_details = models.TextField(blank=True, null=True)
    size = models.CharField(max_length=255, blank=True, null=True)
    body_part = models.CharField(max_length=255, blank=True, null=True)
    color = models.CharField(max_length=255, blank=True, null=True)
    previous = models.CharField(max_length=255, blank=True, null=True)
    consent = models.BooleanField(default=False)
    terms = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    paid = models.BooleanField(default=False)
    tattooed = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.first_name} {self.last_name} - {self.date} {self.time}"

class TimeSlot(models.Model):
    date = models.DateField()
    time = models.TimeField()
    is_booked = models.BooleanField(default=False)
    booked_by = models.CharField(max_length=255, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.date} {self.time}"
