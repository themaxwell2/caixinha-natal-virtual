from django.db import models


class Pessoa(models.Model):
    class TipoChave(models.TextChoices):
        CPF = "CPF", "CPF"
        TELEFONE = "TELEFONE", "Telefone"
        EMAIL = "EMAIL", "E-mail"
        ALEATORIA = "ALEATORIA", "Chave aleatória"

    nome = models.CharField("nome", max_length=150)
    tipo_chave = models.CharField(
        "tipo de chave Pix",
        max_length=10,
        choices=TipoChave.choices,
    )
    chave_pix = models.CharField("chave Pix", max_length=255, unique=True)
    ativo = models.BooleanField("ativo", default=True)
    criado_em = models.DateTimeField("criado em", auto_now_add=True)
    atualizado_em = models.DateTimeField("atualizado em", auto_now=True)

    class Meta:
        ordering = ["nome"]
        verbose_name = "pessoa"
        verbose_name_plural = "pessoas"

    def __str__(self):
        return self.nome
