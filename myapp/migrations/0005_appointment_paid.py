
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myapp', '0004_remove_appointment_appointment_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='appointment',
            name='paid',
            field=models.BooleanField(default=False),
        ),
    ]
