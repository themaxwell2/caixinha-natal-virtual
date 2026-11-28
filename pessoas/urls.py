from django.urls import path

from .views import lista_pessoas


urlpatterns = [
    path("", lista_pessoas, name="lista_pessoas"),
]
