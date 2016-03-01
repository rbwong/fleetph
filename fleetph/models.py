from django.db import models
from django.contrib.auth.models import User


class Request(models.Model):
    user = models.ForeignKey(User)
    origin = models.TextField(null=True, blank=True)
    destination = models.TextField(null=True, blank=True)
    datetime = models.DateTimeField(auto_now_add=True)
    status = models.TextField(choices=(('O', 'Open'), ('C', 'Closed')),
                              default='O')

    def __unicode__(self):
        return "%s: %s -> %s"%(self.user.username, self.origin, self.destination)

class Ship(models.Model):
    owner = models.ForeignKey(User)
    name = models.TextField(unique=True)
    body_text = models.TextField(default='Bus Express')
    plate_no = models.TextField(unique=True)

    def __unicode__(self):
        return "(%s) %s"%(self.name, self.body_text)

    def start_new_trip(self, origin, destination):
        for past_trip in Trip.objects.filter(ship=self, status='O'):
            past_trip.status = 'D'
            past_trip.save()

        trip = Trip(ship=self, origin=origin, destination=destination,
                    status='O')
        return trip.save()

    def get_all_trips(self):
        return Trip.objects.filter(ship=self)

    def get_current_trip(self):
        return self.get_all_trips().get(status='O')

    def close_current_trip(self):
        trip = self.get_current_trip()
        trip.status = 'D'
        trip.save()

class Trip(models.Model):
    ship = models.ForeignKey(Ship)
    origin = models.TextField()
    destination = models.TextField()
    status = models.TextField(choices=(('O', 'Ongoing'), ('D', 'Done')),
                              default='O')
    created = models.DateTimeField(auto_now_add=True)
    closed = models.DateTimeField(null=True, blank=True)

    def __unicode__(self):
        return "%s: %s -> %s"%(self.ship, self.origin, self.destination)
