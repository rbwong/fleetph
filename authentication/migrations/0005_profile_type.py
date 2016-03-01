# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('authentication', '0004_auto_20150409_1553'),
    ]

    operations = [
        migrations.AddField(
            model_name='profile',
            name='type',
            field=models.TextField(default=b'C', choices=[(b'C', b'Commuter'), (b'O', b'Operator')]),
            preserve_default=True,
        ),
    ]
