from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from .models import Appointment, TimeSlot
from datetime import datetime
from django.core.mail import send_mail
from threading import Thread
import os
import hashlib

@csrf_exempt
def login_view(request):
    if request.method == "POST":
        try:
            body = json.loads(request.body)
            username_input = body.get("username", "")
            password_input = body.get("password", "")

            hashed_input = hashlib.sha256(password_input.encode()).hexdigest()

            if username_input == os.getenv("LOGIN_USERNAME"):
                if hashed_input == os.getenv("LOGIN_PASSWORD_HASH"):
                    request.session["is_logged_in"] = True
                    return JsonResponse({"message": "Sikeres bejelentkezés!"})
                else:
                    return JsonResponse({"error": "Hibás felhasználónév vagy jelszó!"}, status=401)
            else:
                return JsonResponse({"error": "Hibás felhasználónév vagy jelszó!"}, status=401)

        except Exception as e:
            return JsonResponse({"error": str(e)}, status=400)
    else:
        return JsonResponse({"error": "Csak POST metódus engedélyezett"}, status=405)
 
@csrf_exempt
def create_appointment(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            print("Received Data:", data)

            if "date" not in data or not data["date"] or "time" not in data or not data["time"]:
                return JsonResponse({"error": "Missing required fields: date and time"}, status=400)

            try:
                appointment_date = datetime.strptime(data["date"], "%Y-%m-%d").date()
                appointment_time = datetime.strptime(data["time"], "%H:%M").time()
                reserved_datetime = datetime.combine(appointment_date, appointment_time)
            except ValueError:
                return JsonResponse({"error": "Invalid date or time format"}, status=400)

            appointment = Appointment.objects.create(
                first_name=data.get("first_name", ""),
                last_name=data.get("last_name", ""),
                email=data.get("email", ""),
                phone=data.get("phone", ""),
                date=appointment_date,
                time=appointment_time,
                reserved=reserved_datetime,
                instagram=data.get("instagram", ""),
                city=data.get("city", ""),
                age=data.get("age", None),
                design=data.get("design", ""),
                idea_details=data.get("ideaDetails", ""),
                size=data.get("size", ""),
                body_part=data.get("body_Part", ""),
                color=data.get("color", ""),
                previous=data.get("previous", ""),
                consent=bool(data.get("consent", False)),
                terms=bool(data.get("terms", False)),
            )
            print(f" Appointment Saved: {appointment.id}, Reserved: {appointment.reserved}")

            
            deleted_count, _ = TimeSlot.objects.filter(date=appointment_date, time=appointment_time).delete()
            if deleted_count > 0:
                print(f"TimeSlot deleted: {appointment_date} {appointment_time}")
            else:
                print(f"TimeSlot not found {appointment_date} {appointment_time}")

            client_subject = f"Foglalás visszaigazolása | {appointment.reserved}"
            client_message = os.getenv("CLIENT_MESSAGE")
            print(client_message)

            client_email = appointment.email  

            tattoo_subject = f"Új foglalás érkezett | {appointment.last_name} {appointment.first_name} | {appointment.reserved}"
            tattoo_message = f"Foglalás adatai:\n\tEmail cím: {appointment.email}\n\tinstagram: {appointment.instagram}\n\ttelefonszám:{appointment.phone}\n\tváros: {appointment.city}\n\tkor: {appointment.age} év\n\ttetoválás minta: {appointment.design}\n\tötlet részletesen: {appointment.idea_details}\n\tméret: {appointment.size} cm\n\ttestrész: {appointment.body_part}\n\tszín: {appointment.color}\n\tjárt már nálad? {appointment.previous}"

            def send_email(subject, message, recipient):
                send_mail(subject=subject, message=message, from_email=os.getenv("ADMIN_EMAIL"), recipient_list=[recipient], fail_silently=False)

            client_email_thread = Thread(target=send_email, args=(client_subject, client_message, client_email),)
            tattoo_email_thread = Thread(target=send_email, args=(tattoo_subject, tattoo_message, os.getenv("ADMIN_EMAIL")),)

            client_email_thread.start()
            tattoo_email_thread.start()
            client_email_thread.join()
            tattoo_email_thread.join()
                     
            return JsonResponse({"message": "Appointment created!", "id": appointment.id}, status=201)

        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON format"}, status=400)
        except Exception as e:
            print("Error:", str(e))
            return JsonResponse({"error": str(e)}, status=400)

    return JsonResponse({"error": "Only POST requests are allowed"}, status=405)



@csrf_exempt
def get_time_slots(request):
    if request.method == "GET":
        time_slots = TimeSlot.objects.all().order_by("date", "time")
        slots = [
            {
                "date": slot.date.strftime("%Y-%m-%d"),
                "time": slot.time.strftime("%H:%M"),
                "is_booked": slot.is_booked
            }
            for slot in time_slots
        ]
        return JsonResponse({"time_slots": slots})
    return JsonResponse({"error": "Invalid request method"}, status=400)
 
@csrf_exempt
def save_time_slots(request): 
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            date = data.get("date")
            time_slots = data.get("time_slots", [])

            if not date or not time_slots:
                return JsonResponse({"error": "Dátum és időpontok megadása szükséges!"}, status=400)

            created_slots = []
            for time in time_slots:
                obj, created = TimeSlot.objects.get_or_create(date=date, time=time)
                if created:
                    created_slots.append(time)

            return JsonResponse({"message": "Időpontok sikeresen elmentve!", "saved_slots": created_slots})

        except json.JSONDecodeError:
            return JsonResponse({"error": "Hibás JSON formátum!"}, status=400)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=400)

    return JsonResponse({"error": "Csak POST kérések engedélyezettek."}, status=405)

@csrf_exempt
def list_appointments(request):
    if request.method == "GET":
        appointments = Appointment.objects.all().order_by("-reserved")
        data = []
        for a in appointments:
            data.append({
                "id": a.id,
                "last_name": a.last_name,
                "first_name": a.first_name,
                "email": a.email,
                "phone": a.phone,
                "reserved": a.reserved.isoformat() if a.reserved else None,
                "paid": a.paid,
            })
        return JsonResponse({"appointments": data})
    return JsonResponse({"error": "Only GET allowed"}, status=405)

@csrf_exempt
def update_appointment_paid(request, pk):
    if request.method == "PATCH":
        try:
            appointment = Appointment.objects.get(pk=pk)
        except Appointment.DoesNotExist:
            return JsonResponse({"error": "Appointment not found"}, status=404)

        try:
            body = json.loads(request.body)
            new_paid_value = bool(body.get("paid", False))
            appointment.paid = new_paid_value
            appointment.save()
            return JsonResponse({"message": "Paid status updated"})
        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON"}, status=400)
    else:
        return JsonResponse({"error": "Only PATCH method allowed"}, status=405)
    

@csrf_exempt
def update_appointment(request, pk):
    if request.method == "PATCH":
        try:
            appointment = Appointment.objects.get(pk=pk)
        except Appointment.DoesNotExist:
            return JsonResponse({"error": "Appointment not found"}, status=404)

        try:
            body = json.loads(request.body)

            if body.get("tattooed") is True:
                appointment.delete()
                return JsonResponse({"message": "Appointment deleted because 'tetovált' was checked."})


            if "paid" in body:
                appointment.paid = bool(body["paid"])

            appointment.save()
            return JsonResponse({"message": "Appointment updated"})
        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON"}, status=400)
    else:
        return JsonResponse({"error": "Only PATCH method allowed"}, status=405)
    
@csrf_exempt 
def delete_time_slot(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            date = data.get("date")
            time = data.get("time")

            if not date or not time:
                return JsonResponse({"error": "Hiányzó adat!"}, status=400)

            # Törlés az adatbázisból
            deleted_count, _ = TimeSlot.objects.filter(date=date, time=time).delete()
            if deleted_count > 0:
                return JsonResponse({"message": "Időpont sikeresen törölve!"}, status=200)
            else:
                return JsonResponse({"error": "Nem található ilyen időpont!"}, status=404)
        except json.JSONDecodeError:
            return JsonResponse({"error": "Hibás JSON formátum!"}, status=400)

    return JsonResponse({"error": "Csak POST kérés engedélyezett!"}, status=405)
