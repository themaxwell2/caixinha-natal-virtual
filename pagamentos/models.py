from decimal import Decimal

from django.core.validators import MinValueValidator
from django.db import models


class Recebimento(models.Model):
    pessoa = models.ForeignKey(
        "pessoas.Pessoa",
        on_delete=models.PROTECT,
        verbose_name="pessoa",
    )
    valor = models.DecimalField(
        "valor",
        max_digits=10,
        decimal_places=2,
        validators=[MinValueValidator(Decimal("0.01"))],
    )
    data_recebimento = models.DateTimeField("data do recebimento")
    observacao = models.TextField("observação", blank=True, null=True)
    criado_em = models.DateTimeField("criado em", auto_now_add=True)

    class Meta:
        ordering = ["-data_recebimento"]
        verbose_name = "recebimento"
        verbose_name_plural = "recebimentos"

    def __str__(self):
        data_formatada = self.data_recebimento.strftime("%d/%m/%Y %H:%M")
        return f"{self.pessoa} - R$ {self.valor:.2f} em {data_formatada}"
