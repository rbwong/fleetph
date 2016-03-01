from datetime import datetime, timedelta
from django.views.decorators.csrf import ensure_csrf_cookie
from django.views.generic.base import TemplateView
from django.utils.decorators import method_decorator

from rest_framework import permissions, viewsets
from rest_framework.response import Response
from rest_framework import generics
from oauth2_provider.ext.rest_framework import (TokenHasReadWriteScope,
                                                TokenHasScope)
from .models import Ship, Trip, Request
from .permissions import IsOwnerOfPost
from .serializers import (ShipSerializer, TripSerializer, RequestSerializer)

class IndexView(TemplateView):
    template_name = 'index.html'

    @method_decorator(ensure_csrf_cookie)
    def dispatch(self, *args, **kwargs):
        return super(IndexView, self).dispatch(*args, **kwargs)


class ShipViewSet(viewsets.ModelViewSet):
    serializer_class = ShipSerializer
    queryset = Ship.objects.all()
    paginate_by = 10
    paginate_by_param = 'page_size'
    max_paginate_by = 50

    def get_permissions(self):
        if self.request.method in permissions.SAFE_METHODS:
            return (permissions.AllowAny(),)

        if self.request.method == 'POST':
            return (permissions.IsAuthenticated(),)

        return (IsOwnerOfPost(), )

    def perform_create(self, serializer):
        instance = serializer.save(owner=self.request.user)

        return super(ShipViewSet, self).perform_create(serializer)


class TripViewSet(viewsets.ModelViewSet):
    serializer_class = TripSerializer
    queryset = Trip.objects.all()


class RequestViewSet(viewsets.ModelViewSet):
    serializer_class = RequestSerializer
    queryset = Request.objects.all()

    def perform_create(self, serializer):
        instance = serializer.save(user=self.request.user)

        return super(RequestViewSet, self).perform_create(serializer)