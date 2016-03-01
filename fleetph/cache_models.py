from fleetph.models import Ship


class BusStatus():
    ship = None
    location = None
    status = None

    def __init__(self, ship, location, status='I'):
        if not ship:
            raise Exception('ship must be specified and valid.')
        try:
            Ship.objects.get(id=ship)
        except Ship.DoesNotExist:
            raise Exception('ship must be valid.')

        if not location:
            raise Exception('location must be specified in format long,lat')

        self.ship = ship
        self.location = location
        self.status = status
