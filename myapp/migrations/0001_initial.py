from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Appointment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('first_name', models.CharField(max_length=255)),
                ('last_name', models.CharField(max_length=255)),
                ('email', models.EmailField(max_length=254)),
                ('phone', models.CharField(max_length=20)),
                ('date', models.DateField(default='2025-01-01')),
                ('time', models.TimeField()),
                ('appointment', models.DateTimeField(blank=True, null=True)),
                ('instagram', models.CharField(blank=True, max_length=255, null=True)),
                ('city', models.CharField(blank=True, max_length=255, null=True)),
                ('age', models.IntegerField(blank=True, null=True)),
                ('design', models.CharField(blank=True, max_length=255, null=True)),
                ('idea_details', models.TextField(blank=True, null=True)),
                ('size', models.CharField(blank=True, max_length=255, null=True)),
                ('body_part', models.CharField(blank=True, max_length=255, null=True)),
                ('color', models.CharField(blank=True, max_length=255, null=True)),
                ('previous', models.CharField(blank=True, max_length=255, null=True)),
                ('consent', models.BooleanField(default=False)),
                ('terms', models.BooleanField(default=False)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('reference_photo_1', models.ImageField(blank=True, null=True, upload_to='uploads/')),
                ('reference_photo_2', models.ImageField(blank=True, null=True, upload_to='uploads/')),
                ('reference_photo_3', models.ImageField(blank=True, null=True, upload_to='uploads/')),
            ],
        ),
        migrations.CreateModel(
            name='TimeSlot',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateField()),
                ('time', models.TimeField()),
                ('is_booked', models.BooleanField(default=False)),
                ('booked_by', models.CharField(blank=True, max_length=255, null=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
            ],
        ),
    ]
