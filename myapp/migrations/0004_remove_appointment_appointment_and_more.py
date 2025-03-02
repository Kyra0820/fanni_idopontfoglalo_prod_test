from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myapp', '0003_alter_appointment_time'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='appointment',
            name='appointment',
        ),
        migrations.AlterField(
            model_name='appointment',
            name='date',
            field=models.DateField(blank=True, null=True),
        ),
    ]
