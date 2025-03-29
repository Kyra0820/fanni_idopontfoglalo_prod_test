from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('myapp', '0006_appointment_tattooed'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='appointment',
            name='reference_photo_1',
        ),
        migrations.RemoveField(
            model_name='appointment',
            name='reference_photo_2',
        ),
        migrations.RemoveField(
            model_name='appointment',
            name='reference_photo_3',
        ),
    ]
