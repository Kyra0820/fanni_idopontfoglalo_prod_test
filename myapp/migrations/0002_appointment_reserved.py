from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myapp', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='appointment',
            name='reserved',
            field=models.DateTimeField(blank=True, null=True),
        ),
    ]
