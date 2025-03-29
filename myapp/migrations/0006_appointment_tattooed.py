from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myapp', '0005_appointment_paid'),
    ]

    operations = [
        migrations.AddField(
            model_name='appointment',
            name='tattooed',
            field=models.BooleanField(default=False),
        ),
    ]
