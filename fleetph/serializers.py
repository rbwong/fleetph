from rest_framework import serializers

from authentication.serializers import UserSerializer
from .models import Request, Ship, Trip


class ShipSerializer(serializers.ModelSerializer):
    owner = UserSerializer(read_only=True, required=False)

    class Meta:
        model = Ship

        fields = ('id', 'owner', 'name', 'body_text', 'plate_no')
        read_only_fields = ('id', )

    def get_validation_exclusions(self, *args, **kwargs):
        exclusions = super(ShipSerializer, self).get_validation_exclusions()

        return exclusions + ['owner']


class RequestSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True, required=False)

    class Meta:
        model = Request

        fields = ('id', 'user', 'origin', 'destination', 'datetime', 'status')
        read_only_fields = ('id', 'datetime')

    def get_validation_exclusions(self, *args, **kwargs):
        exclusions = super(RequestSerializer, self).get_validation_exclusions()

        return exclusions + ['user',]


class TripSerializer(serializers.ModelSerializer):
    ship = ShipSerializer(read_only=True, required=False)

    class Meta:
        model = Trip

        fields = (
            'id',
            'ship',
            'origin',
            'destination',
            'status',
            'created',
            'closed')
        read_only_fields = ('id', 'created')

    def get_validation_exclusions(self, *args, **kwargs):
        exclusions = super(TripSerializer, self).get_validation_exclusions()

        return exclusions + ['ship']
