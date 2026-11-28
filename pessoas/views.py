from django.shortcuts import render

from .models import Pessoa


def lista_pessoas(request):
    pessoas = Pessoa.objects.filter(ativo=True).only("id", "nome")
    return render(
        request,
        "pessoas/lista_pessoas.html",
        {"pessoas": pessoas},
    )
