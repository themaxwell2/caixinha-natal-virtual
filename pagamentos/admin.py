from django.contrib import admin
from .models import Recebimento


@admin.register(Recebimento)
class RecebimentoAdmin(admin.ModelAdmin):
    list_display = ("pessoa", "valor", "data_recebimento", "criado_em")
    search_fields = ("pessoa__nome",)
    list_filter = ("data_recebimento",)
    ordering = ("-data_recebimento",)

    def has_delete_permission(self, request, obj=None):
        return False
